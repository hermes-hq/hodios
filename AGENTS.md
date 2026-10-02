# AGENTS.md

Instructions for AI agents (and humans) working **on** this repository. `CLAUDE.md` is a symlink to this file.

Hodios is an open library of prompts, personas, workflows, rules and styles, compiled to every AI coding tool's native format. This repo is the source; `hermes-hq/hodios-dist` is the generated install tree (never edit it by hand).

## Commands

Node 22 (`.nvmrc`), npm workspaces.

```sh
npm ci                     # install
npm run check              # everything CI runs: typecheck, lint, format, test, build, validate
npm run build              # tsc -b for packages/schema, packages/core, packages/cli
npm test                   # vitest
npm run validate           # node packages/cli/dist/bin.js validate (needs a build)
npm run hodios -- rules    # list lint rule ids (any CLI command: npm run hodios -- <cmd>)
npm run gen:schema         # rewrite schema/*.json from packages/schema/src/schemas.ts
```

## Layout

| Path | What | License |
|---|---|---|
| `library/<domain>/<category>/<id>/<kind>.md` | One entry per folder. File name = kind, folder = id, parent = category, grandparent = the category's domain. See [TAXONOMY.md](TAXONOMY.md) | CC0-1.0 |
| `library/.../evals.yaml` | Evals; required for `experimental` and `stable` | CC0-1.0 |
| `library/.../examples/*.md`, `references/*.md`, `variants/*.md`, `steps/NN-*.md` | Optional entry files (`steps/` for workflows only) | CC0-1.0 |
| `partials/**/*.md` | Shared snippets, included with `{{> guardrails/scope-discipline}}` | CC0-1.0 |
| `vocab/*.yml` | Controlled vocabularies (domain, category, subcategory, stage, role, stack, subject, requires, inputs, output, advice-risk, tags) plus the facet registry `facets.yml`. Rules in [TAXONOMY.md](TAXONOMY.md) | CC0-1.0 |
| `schema/*.json` | Generated JSON Schemas. Edit `packages/schema/src/schemas.ts`, then `npm run gen:schema` | Apache-2.0 |
| `packages/schema` | `@hermes-hq/hodios-schema`: types, schemas, ajv validators | Apache-2.0 |
| `packages/core` | `@hermes-hq/hodios-core`: isomorphic (no `fs`) parse, lint, and later compile | Apache-2.0 |
| `packages/cli` | `hodios` CLI | Apache-2.0 |
| `tools/` | Repo tooling (DCO check, CalVer, release steps). Not published | Apache-2.0 |
| `ids.lock` | Released ids. Written by the release workflow only | - |

## Rules for changes

- **Entry format:** see `CONTRIBUTING.md` and the three examples under `library/`. Run `npm run build && npm run validate` after every content change; fix every error by its rule id (`PS0NN`).
- **Never author computed fields:** `works_in`, `packs`, `quality`, `tested_on`, `hash`, `created`, `updated`, `license`.
- **Text only:** no `scripts/`, no `allowed-tools`, no `` !`cmd` `` shell injection, no download-and-run commands, no hidden Unicode.
- **No positional placeholders** (`$1`, `$ARGUMENTS`). Use named `{{arg}}` declared in `args`.
- **Fill the facets honestly** (`stack`, `stage`, `requires`, `inputs`, `output`, `tags`). They decide who sees an entry first; a wrong stack hides it from the people it is for.
- **Ids are forever.** Never rename or delete a released id; add the old id to the successor's `aliases`.
- **`packages/core` stays isomorphic:** no `node:` imports there; file access belongs in the CLI.
- **Public repo:** never commit personal data, local paths, emails, tokens or internal URLs. Set `git config user.email <login>@users.noreply.github.com` in your clone so rebases and amends keep it too. GitHub writes the squash commit itself, so merge with the noreply address as its author once checks are green: `gh pr checks --watch && gh pr merge --squash --delete-branch --author-email <id>+<login>@users.noreply.github.com` (auto-merge rejects a noreply author; the merge fails safely until the account keeps its email private).
- **Commits and PRs:** work on a branch, open a PR, wait for `check` and `dco` to pass. Squash merge only. Every commit needs a DCO `Signed-off-by` from the accountable human; an agent only adds it when that human has told it to commit under their identity.
- Keep diffs small and on-task. Do not reformat files you did not change.
