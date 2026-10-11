---
schema: 1
id: publish-npm-package
kind: prompt
title: Publish a package to npm
description: Gets a JavaScript or TypeScript package ready for its first npm release, fixing exports, types, the files list and engines, checking the tarball, and planning 2FA, dist-tags and provenance.
category: open-source
version: 1.0.0
status: incubating
stage: [ship]
role: [software-engineer, maintainer, frontend-engineer]
stack: [typescript, nodejs]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, checklist]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [npm, package-exports, esm, type-declarations, dist-tags, package-publishing]
pairs_with:
  prompts: [publish-package-from-ci, automate-release-versioning, write-changelog]
args:
  - name: package
    description: The package name you want (scoped or not), what it is (library, CLI, React component), whether it is ESM, CommonJS or both, how it is built, and the Node and browser versions it should support.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Name and access, package.json changes, Tarball check, Consumer test, Publishing steps, Verified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A published npm version can never be republished under the same number, so first releases should be checked before they go out. The usual first-release bugs: the `exports` map does not match the built files, or lists `import` and `require` conditions pointing at the same ESM file, so CommonJS users crash; `types` points to a file that is not in the tarball, or the `types` condition is not listed first inside each `exports` entry; no `files` list or `.npmignore`, so tests, source maps of private code, or a local `.env` ship; a `bin` script without a shebang or executable mode; build output missing because `prepublishOnly` or `prepare` was not set; and `peerDependencies` duplicated as `dependencies`, so users get two copies of React. Scoped packages are private by default and need public access on the first publish. A pre-release published without an explicit dist-tag can end up as `latest`, depending on the npm version, so always pass `--tag`. Accounts should use two-factor authentication, and trusted publishing from CI with provenance removes long-lived tokens.

{{> guardrails/investigate-before-answering}}

Package:
<package>
{{package}}
</package>
</context>

<task>
1. Name and access: check that the intended name is free or is a scope you control (say how to check with `npm view`), and whether it is confusingly close to an existing popular package. Note public access for scoped packages.
2. Read package.json, the build config and the output folder. Fix: `name`, `version` (start at 0.1.0 or 1.0.0 deliberately), `description`, `license` (SPDX), `repository`, `keywords`, `type`, `exports` with correct conditions and `types` first, `main` and `types` fallbacks for older tools, `files`, `bin` with a shebang, `engines`, `sideEffects` if relevant, and peer versus regular dependencies.
3. Make sure the build runs before publishing (`prepublishOnly` or the release pipeline) and that a LICENSE and README exist.
4. Tarball check: run the build and `npm pack --dry-run`, list what would ship, and remove anything that should not be there. If available, run a package checker such as `publint` or a types resolution check, and fix what it reports.
5. Consumer test: install the packed tarball into a scratch project (ESM and CommonJS, and TypeScript if types ship) and import it the way users will.
6. Publishing steps: the exact commands for the first publish (`npm publish --access public` for scoped packages, `--tag next` for pre-releases), enabling 2FA on the account, and moving to trusted publishing with provenance from CI for later releases.
</task>

<constraints>
- Do not run `npm publish`, `npm unpublish` or `npm deprecate`; give the commands for the user to run.
- Do not change the package's runtime code except where the packaging fix requires it, and say why.
- Never put npm tokens in files in the repository.
- Do not claim a name is available without checking; if you cannot run `npm view`, say so.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
Use the contract's section headings in order. package.json changes as a diff. Tarball check as the list of files that will ship. Publishing steps as exact commands in a fenced block. Verified lists commands run and their results.
</output_format>
