---
schema: 1
id: upgrade-angular-major-version
kind: prompt
title: Upgrade Angular to a new major version
description: Upgrades an Angular app one major version at a time with ng update, handling Node and TypeScript requirements, RxJS, Angular Material, builders and third-party library compatibility.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [angular]
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
tags: [ng-update, breaking-changes, peer-dependencies, angular-material]
pairs_with:
  prompts: [upgrade-major-dependency, migrate-angular-to-standalone-and-signals]
args:
  - name: target_version
    description: The Angular major version to reach.
    type: string
    default: "the latest stable major"
  - name: notes
    description: "Current Angular version, Node version, Material or other UI libraries, state management, SSR, test runner, monorepo tooling such as Nx."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Upgrade path, Blockers, Changes per step, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Angular's update tooling is good, which is why the failures come from what surrounds it. What experienced people know: `ng update` is meant to move one major version at a time, running each version's automatic migrations; skipping versions skips migrations. Each major has a minimum Node.js and TypeScript range and an RxJS range, so the runtime may need to move first. Angular Material and the CDK update with their own `ng update` step, and some majors changed component internals and styling (the MDC-based components changed DOM and CSS, breaking custom overrides). The build system moved from the webpack-based browser builder to the esbuild-based application builder, which changes some behaviours (CommonJS warnings, global styles, environment file replacements). Third-party libraries pin peer dependencies to Angular majors; one unmaintained library can block the whole path, and libraries built for the old View Engine no longer work at all. Nx workspaces upgrade through Nx's own migrate command, not `ng update`. Using `--force` to get past peer conflicts hides exactly the problems you need to see.
</context>

<task>
Upgrade this Angular app to {{target_version}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read `package.json`, `angular.json` (or Nx project config), the Node version used in development and CI, and the lockfile. List every Angular-ecosystem dependency and third-party library with an Angular peer dependency.
2. Build the upgrade path: each major from current to target, with the Node, TypeScript and RxJS range each needs. Use the official update guide for the from-to pair and note its manual steps.
3. Check blockers: for each third-party library, the version that supports each step, or that none exists. Propose replacements or forks for blockers and stop for a decision on any library with no path.
4. Record the baseline: build, unit tests, end-to-end tests and bundle sizes.
5. For each major step: run `ng update` for core and CLI, then Material and CDK and other libraries with schematics, review the migration diff, apply the guide's manual steps, fix build and test failures, and commit before the next step.
6. Handle builder changes deliberately: if moving to the application builder, check styles, assets, environment replacements, SSR and bundle output.
7. After the final step, run the full test suite and end-to-end tests, compare bundle sizes, and smoke test the main user flows.
</task>

<constraints>
- One major version per step, each committed separately; no skipping versions.
- Do not use `--force` or legacy peer dependency flags to get past conflicts without listing what they hide.
- Do not adopt new optional patterns (signals, standalone, new control flow) in the same change unless the user asks; keep the upgrade reviewable.
- Do not guess version requirements; read them from the official compatibility table or the packages' metadata.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Versions of Angular, Node, TypeScript, RxJS, key libraries; baseline results.
## Upgrade path
Table: step, Angular version, Node, TypeScript, RxJS, manual steps.
## Blockers
Libraries without support and the decision for each.
## Changes per step
What the migrations did, manual fixes, commit per step.
## Verification
Tests, end-to-end, bundle sizes, flows checked.
</output_format>
