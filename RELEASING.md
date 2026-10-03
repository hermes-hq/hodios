# Releasing a catalog

Until the release workflow's publishing steps are enabled, a maintainer cuts each catalog release by hand from a clean, green `main`. Every step below is required; skipping the hodios-dist sync leaves the `hodios` CLI on the previous catalog.

## 1. Version and README

```sh
git pull --rebase && npm ci && npm run check
VERSION=$(node tools/release/calver.mjs $(git tag --list 'v20*'))   # e.g. 2026.1003.0
SEQ=$(node tools/release/calver.mjs --seq $(git tag --list 'v20*')) # one step per release
node tools/release/curate.mjs                                        # curated tier: review the curated.txt diff
node tools/release/readme-catalog.mjs                                # README catalog section
# then set the catalog version, the entry count and the curated count in the README status line and the `--skill '*'` sentence
git commit -s -am "Update the README catalog section for $VERSION" && git push
```

## 2. Build and release assets

```sh
npm run hodios -- build --seq "$SEQ" --catalog "$VERSION"
R=dist/release && mkdir -p $R && cp dist/bundles/all.hermes-prompts "$R/all-$VERSION.hermes-prompts"
tar -czf "$R/hodios-catalog-v1-$VERSION.tar.gz" -C dist catalog/v1
cp dist/catalog/v1/manifest.json $R/
(cd $R && shasum -a 256 all-* hodios-catalog-* manifest.json > SHA256SUMS)
gh release create "v$VERSION" $R/* --target main --title "Catalog $VERSION" --notes-file NOTES.md
```

Notes are written for people: what is new, what was merged (old id and the entry it now resolves to), what is not in the release, and the files.

## 3. Update hermes-hq/hodios-dist

The install tree (curated tier only) and the v1 catalog (`catalog/v1/`: manifest, one shard list per tier, content-addressed objects, every entry) go to hodios-dist together. The published `hodios` CLI reads `https://cdn.jsdelivr.net/gh/hermes-hq/hodios-dist@latest/catalog/v1`, falling back to `https://raw.githubusercontent.com/hermes-hq/hodios-dist/main/catalog/v1`.

```sh
git clone https://github.com/hermes-hq/hodios-dist ../hodios-dist && cd ../hodios-dist
node ../hodios/tools/release/sync-dist.mjs ../hodios/dist .   # refuses a tree without catalog/v1 or over the caps
git add -A && git commit -s -m "Catalog $VERSION: <N> entries" && git push
git tag "v$VERSION" && git push origin "v$VERSION"
```

`sync-dist.mjs` replaces every generated path (`.claude-plugin`, `plugins`, `skills`, `native`, `paste`, `bundles`, `catalog/v1/manifest.json`), adds the new catalog objects next to the earlier ones so a CDN-cached manifest still resolves, keeps `README.md` and `LICENSE`, updates the README's catalog line, and checks the caps before it copies anything: at most 2,000 skills, at most 100 plugins, one plugin per domain, fewer than 60,000 files and folders in the tree.

## 4. Verify

With a temporary `HOME` and no `CLAUDECODE` or `CLAUDE_CODE_*` variables:

```sh
claude plugin marketplace add hermes-hq/hodios-dist && claude plugin install hodios-travel@hodios && claude plugin list
npx skills add hermes-hq/hodios-dist --list                         # the curated tier
npx -y @hermes-hq/hodios search <word>                              # finds curated and verified entries
curl -s https://cdn.jsdelivr.net/gh/hermes-hq/hodios-dist@latest/catalog/v1/manifest.json   # "catalog": "$VERSION"
```

If jsDelivr still serves the old manifest, purge it with `curl https://purge.jsdelivr.net/gh/hermes-hq/hodios-dist@latest/catalog/v1/manifest.json` and check again.
