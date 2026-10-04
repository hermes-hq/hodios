# Releasing a catalog

Until the release workflow's publishing steps are enabled, a maintainer cuts each catalog release by hand from a clean, green `main`. Every step below is required; skipping the hodios-dist sync leaves the `hodios` CLI on the previous catalog.

## 1. Version and README

```sh
git pull --rebase && npm ci && npm run check
VERSION=$(node tools/release/calver.mjs $(git tag --list 'v20*'))   # e.g. 2026.1003.0
SEQ=$(node tools/release/calver.mjs --seq $(git tag --list 'v20*')) # one step per release
node tools/release/curate.mjs                                        # curated tier: review the curated.txt diff
node tools/release/readme-catalog.mjs                                # README numbers, tool list, status counts, catalog
git commit -s -am "Update the README catalog section for $VERSION" && git push
```

## 2. Build and release assets

```sh
npm run hodios -- build --seq "$SEQ" --catalog "$VERSION"
HODIOS_MANIFEST_SIGNING_KEY_FILE=<path to the signing key> node tools/release/manifest-signing.mjs sign dist/catalog/v1
R=dist/release && mkdir -p $R && cp dist/bundles/all.hermes-prompts "$R/all-$VERSION.hermes-prompts"
tar -czf "$R/hodios-catalog-v1-$VERSION.tar.gz" -C dist catalog/v1
cp dist/catalog/v1/manifest.json dist/catalog/v1/manifest.json.minisig $R/
(cd $R && shasum -a 256 all-* hodios-catalog-* manifest.json manifest.json.minisig > SHA256SUMS)
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

`sync-dist.mjs` refuses a catalog whose `manifest.json.minisig` does not verify with `keys/manifest-signing.pub`, then replaces every generated path (`.claude-plugin`, `plugins`, `skills`, `native`, `paste`, `bundles`, `catalog/v1/manifest.json` and its `.minisig`), adds the new catalog objects next to the earlier ones so a CDN-cached manifest still resolves, keeps `README.md` and `LICENSE`, updates the README's catalog line, and checks the caps before it copies anything: at most 2,000 skills, at most 100 plugins, one plugin per domain, fewer than 60,000 files and folders in the tree.

## 4. Verify

With a temporary `HOME` and no `CLAUDECODE` or `CLAUDE_CODE_*` variables:

```sh
claude plugin marketplace add hermes-hq/hodios-dist && claude plugin install hodios-travel@hodios && claude plugin list
npx skills add hermes-hq/hodios-dist --list                         # the curated tier
npx -y @hermes-hq/hodios search <word>                              # finds curated and verified entries
curl -s https://cdn.jsdelivr.net/gh/hermes-hq/hodios-dist@latest/catalog/v1/manifest.json   # "catalog": "$VERSION"
```

If jsDelivr still serves the old manifest, purge the manifest and its signature together (Hermes refuses a manifest paired with an older signature) and check again:

```sh
curl https://purge.jsdelivr.net/gh/hermes-hq/hodios-dist@latest/catalog/v1/manifest.json
curl https://purge.jsdelivr.net/gh/hermes-hq/hodios-dist@latest/catalog/v1/manifest.json.minisig
```

## npm packages

The CLI (`@hermes-hq/hodios`) and its libraries are published to npm by the maintainer, whose account needs a passkey, so no release script publishes them. Publish in dependency order (`packages/schema`, `packages/core`, `packages/cli`) after `npm run build`, and only the packages whose version changed.

**Pending publish:** `@hermes-hq/hodios-core` 0.1.1 and `@hermes-hq/hodios` 0.1.1 (npm has 0.1.0). In a project folder, `hodios search` with no query now lists entries for the project's stack first; 0.1.0 listed the alphabetically first entries (`academic`, …) because the candidate cap ran before the project boost. Until they are published, `npx -y @hermes-hq/hodios` runs 0.1.0 with that bug. `@hermes-hq/hodios-schema` is unchanged at 0.1.0.

```sh
npm run build && (cd packages/core && npm publish) && (cd packages/cli && npm publish)
```

Remove this note once both are on npm.

## Signing key

Hermes IDE applies a runtime catalog update only when `catalog/v1/manifest.json.minisig` verifies with a public key compiled into the app. Every other catalog file is named by its sha256 and reached from the manifest, so this one signature covers the whole catalog.

- **Format:** [minisign](https://jedisct1.github.io/minisign/), prehashed Ed25519 (Ed25519 over the BLAKE2b-512 of the exact `manifest.json` bytes), detached as `manifest.json.minisig`. The signature names the 8-byte key id, so clients can trust more than one key during a rotation. `minisign -Vm manifest.json -p keys/manifest-signing.pub` checks a signature by hand.
- **Public key:** `keys/manifest-signing.pub`. Its base64 line is what Hermes IDE trusts (`src-tauri/src/library/verify.rs`, `TRUSTED_KEYS`).
- **Secret key:** a minisign secret key file without a password, kept by the maintainer outside every repository. `tools/release/manifest-signing.mjs sign` reads it from `HODIOS_MANIFEST_SIGNING_KEY` (the file's text, in CI) or from the file named by `HODIOS_MANIFEST_SIGNING_KEY_FILE` (by hand), and fails rather than publish unsigned. `minisign -S -s <file> -m manifest.json` reads the same file.
- **CI secret:** `HODIOS_MANIFEST_SIGNING_KEY` in the `release` environment, read from the key file so it is never pasted:

  ```sh
  gh secret set HODIOS_MANIFEST_SIGNING_KEY --repo hermes-hq/hodios --env release < <path to the signing key>
  ```

  The release workflow fails at "Sign manifest" while the secret is missing, and at "Verify the manifest signature" if the secret does not match `keys/manifest-signing.pub`.

### Rotating the key

A client trusts only the keys it was built with, so a new key must ship in clients before it signs.

1. Generate the next key: `node tools/release/manifest-signing.mjs keygen <new secret key file> keys/manifest-signing.next.pub`, and commit the `.pub`.
2. Add its base64 line to Hermes IDE's `TRUSTED_KEYS` next to the current one (and to every other client that verifies), and ship that release.
3. Once those releases have been out for a few weeks: move `keys/manifest-signing.next.pub` to `keys/manifest-signing.pub`, replace the secret with the same `gh secret set` command and the new file, and cut a catalog release. Clients that only know the old key keep their current catalog and say that the update was signed with a key they do not know.
4. A release later, remove the old key from the clients.

If the secret key leaks, do steps 1 to 3 at once and remove the leaked key from the clients in the same release: a leaked key can sign a catalog that every client trusts.
