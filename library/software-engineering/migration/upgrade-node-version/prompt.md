---
schema: 1
id: upgrade-node-version
kind: prompt
title: Upgrade a project to a newer Node.js LTS
description: Moves a project to a newer Node.js LTS, covering native addon rebuilds, OpenSSL 3 and DNS changes, global fetch, engines fields, Docker images and CI, with tests on both versions.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, fullstack-engineer, frontend-engineer]
stack: [nodejs]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [native-addons, openssl, engines, end-of-life, lts]
pairs_with:
  prompts: [runtime-upgrade-track, migrate-commonjs-to-esm, fix-breakage-after-dependency-upgrade]
args:
  - name: target_version
    description: The Node.js major version to move to, for example "22" or "24".
    type: string
    required: true
  - name: notes
    description: "Current Node version, package manager, build tools (webpack, Vite, tsc), native modules in use, Docker images, CI and hosting."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Breaking changes found, Changes made, Verification, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Check the Node.js release schedule for the target: so far only even-numbered majors have become LTS, odd majors are short-lived and should not reach production, and the project has discussed changing its release cadence, so confirm rather than assume. Most Node upgrades break in the same few places. Native addons (bcrypt, sharp, canvas, sqlite3, node-sass and others built with node-gyp) are compiled against one ABI version and fail with "was compiled against a different Node.js version" until reinstalled, and older releases may have no prebuilt binary for the new ABI, so the install falls back to a compiler that CI images lack. Node 17 moved to OpenSSL 3, so old webpack 4 builds fail with `ERR_OSSL_EVP_UNSUPPORTED`; `--openssl-legacy-provider` hides it but the fix is upgrading the bundler. Node 17 also stopped reordering DNS results, so `localhost` can resolve to `::1` first and connections to services listening only on `127.0.0.1` get `ECONNREFUSED` (Node 20 turned on automatic address family selection for `net` connections, which softens this for some clients but not all). Node 18 added a global `fetch` that can clash with polyfills and test mocks. Each major ships a newer npm, which may rewrite the lockfile format. Newer majors also move module loading forward (for example `require()` of ES modules), which changes behaviour for dual packages. Deprecations surface with `--trace-deprecation` and `--throw-deprecation`. The release notes and the deprecations list for every major you skip are the source of truth.
</context>

<task>
Upgrade this project to Node.js {{target_version}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Find every place the version is pinned: `engines` in `package.json`, `.nvmrc`, `.node-version`, Volta or asdf config, Dockerfiles, CI matrices, serverless runtime settings and hosting config. Confirm the target is an LTS line and list the majors skipped.
2. List native and binary dependencies (`node-gyp`, prebuilt binaries, postinstall downloads) and check each has a release supporting the target. Flag any that do not.
3. On the target version, do a clean install with the project's package manager, keeping the lockfile format change in its own commit. Record install warnings and failed builds.
4. Run the build and the full test suite with `--trace-deprecation`. Search for the known breakpoints: legacy OpenSSL hashes in build tools, `localhost` connections to IPv4-only services, fetch polyfills and mocks, removed or changed core APIs from each skipped major's notes.
5. Fix the causes in small commits: upgrade the bundler rather than adding `--openssl-legacy-provider`, use explicit addresses where IPv4 is required, remove polyfills the runtime now provides only when every supported version has the feature.
6. Run CI on both the current and the target version until production has moved.
7. Update `engines`, version files, Docker images and CI, and propose a rollout through staging with logs watched for deprecations and native module errors.
</task>

<constraints>
- Do not use legacy flags (`--openssl-legacy-provider`, `--no-experimental-fetch` and the like) as the fix; if one is needed as a stopgap, mark it with the reason and a follow-up.
- Do not recommend a non-LTS release for production.
- Do not delete and regenerate the lockfile with different dependency versions as a side effect; keep version bumps deliberate and listed.
- Only cite breaking changes you confirmed in the release notes or saw fail.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Current version, majors skipped, where the version is pinned, native dependencies.
## Breaking changes found
Table: area, symptom, cause, fix.
## Changes made
Dependency upgrades, code and config changes, lockfile change.
## Verification
Install, build and test results on both versions; deprecations remaining.
## Rollout
Environments in order, what to watch, rollback.
</output_format>
