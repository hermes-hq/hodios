---
schema: 1
id: switch-javascript-package-manager
kind: prompt
title: Switch JavaScript package manager
description: Switches a project or monorepo between npm, Yarn, pnpm and Bun, converting the lockfile without changing resolved versions and fixing workspaces, hoisting, scripts, Docker and CI.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, backend-engineer, fullstack-engineer, devops-engineer]
stack: [nodejs]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, config, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [pnpm, yarn, npm, lockfile, workspaces, monorepo]
pairs_with:
  prompts: [switch-build-tool, resolve-lockfile-merge-conflict, plan-monorepo-migration]
args:
  - name: target
    description: The package manager to move to (npm, Yarn, pnpm or Bun), with a version if one is required.
    type: string
    required: true
  - name: notes
    description: "Current package manager and version, monorepo or single package, Dockerfiles, CI system, deploy platform, any postinstall scripts or native modules."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Differences that matter, Changes made, Version parity, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A package manager switch looks like swapping one command for another, but the real risks are an accidental upgrade of hundreds of transitive dependencies and code that only worked because of npm-style hoisting. What experienced people know: regenerating a lockfile from scratch re-resolves every range, so convert the existing lockfile instead (pnpm and Yarn can import an npm lockfile; Bun reads existing lockfiles on first install) and diff resolved versions afterwards. pnpm's strict `node_modules` exposes phantom dependencies (packages imported but not declared), which then fail at runtime or build; the fix is declaring them, with `public-hoist-pattern` or a hoisted linker as a temporary escape hatch. Yarn Berry defaults to Plug'n'Play, which many tools do not support, so `nodeLinker: node-modules` is the usual first step. Workspaces are declared differently (`pnpm-workspace.yaml` vs the `workspaces` field), the `workspace:` protocol changes publishing, and overrides use different keys (`overrides`, `resolutions`, `pnpm.overrides`). Recent pnpm versions do not run dependency install scripts unless the package is allowed, and Bun runs them only for trusted packages (its own default list plus those you add), which can break native modules quietly. The `packageManager` field pins the tool for Corepack and some hosts. Frozen-lockfile install commands differ per tool, and CI caches, Dockerfiles and deploy platforms each detect the package manager their own way.
</context>

<task>
Switch this project to {{target}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Inventory every place the current tool is assumed: lockfiles, `packageManager`, `.npmrc` or `.yarnrc*`, workspace config, overrides or resolutions, scripts calling the tool by name (`npm run`, `npx`, `yarn`), Dockerfiles, CI workflows and caches, deploy platform settings, docs and git hooks.
2. Record the baseline: install with the current frozen-lockfile command, run build and tests, and save a list of resolved package versions.
3. Convert the lockfile with the target tool's import or migration path rather than deleting it. Set `packageManager` and any required settings (linker mode, allowed build scripts, registry and auth).
4. Map workspaces, overrides and peer dependency settings to the target format. Translate scripts that call the old tool.
5. Install, then compare resolved versions with the baseline. Explain every change in a direct dependency, and any large transitive drift; pin back where needed.
6. Fix phantom dependency failures by declaring the missing packages in the right workspace. Use hoisting settings only as a documented temporary measure.
7. Update Dockerfiles, CI install commands and caches, deploy settings and contributor docs. Remove the old lockfile and config only after builds and tests pass.
8. Run build, tests and a production-like start, in CI as well as locally.
</task>

<constraints>
- Do not delete the old lockfile and resolve from scratch unless the user accepts the version drift that causes.
- Do not paper over strict-mode failures with blanket hoisting without listing what it hides.
- Do not run install scripts from packages the project did not run before without saying so.
- Never print or commit registry tokens from `.npmrc` files.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Current tool and version, workspace layout, every place it is referenced.
## Differences that matter
Hoisting, install scripts, workspace protocol, overrides: what applies here.
## Changes made
Files added, changed and removed; commands mapped.
## Version parity
Direct dependency changes and notable transitive drift, with reasons.
## Verification
Install, build, test and CI results; Docker image build.
</output_format>
