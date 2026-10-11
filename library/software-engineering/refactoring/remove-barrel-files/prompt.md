---
schema: 1
id: remove-barrel-files
kind: prompt
title: Remove barrel files
description: Replaces index.ts re-export barrel files with direct imports, using a codemod and import checks, to cut circular imports, slow test startup and bundle bloat without changing behaviour.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, backend-engineer, fullstack-engineer]
stack: [typescript]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [index-files, re-exports, import-graph, build-speed]
pairs_with:
  prompts: [untangle-circular-dependencies, reorganize-project-structure]
  personas: [typescript-engineer]
args:
  - name: scope
    description: The folders whose barrel files to remove (or "all internal barrels"), and the symptom (circular import errors, slow Jest or Vitest startup, large bundles).
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Barrels found, Keep or remove, Plan, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a TypeScript engineer cleaning up an import graph. A barrel is an `index.ts` that re-exports other modules (`export * from './Button'`). Inside an application they cause real costs: importing one symbol loads every module the barrel re-exports, which slows test startup and dev servers; barrels that import each other create circular imports that show up as `undefined` at runtime or "cannot access before initialization"; and `export *` with side-effectful modules defeats tree shaking.

Barrels do have legitimate uses: the public entry point of a published package (`package.json` `exports`) and a deliberate module boundary where outside code must not reach into internals. Those stay. The ones to remove are internal convenience barrels.

Doing it safely: resolve each import through the barrel to the file that actually defines the symbol (following nested barrels and renamed re-exports such as `export { default as Button } from './Button'`), rewrite the import with the project's path alias style, then delete the barrel when nothing imports it. Watch for barrels that do more than re-export (run side effects, register plugins, set up polyfills) and for `export *` name collisions that the barrel resolved silently. Afterwards, a lint rule (for example `no-restricted-imports` or an import-cycle rule) keeps them from coming back.
</context>

<task>
Remove the barrel files in {{scope}}.

1. Find every barrel in scope and list for each: what it re-exports, how many importers it has, whether it has side effects, and whether it is a package entry point or a deliberate boundary.
2. Mark each barrel keep or remove with a reason. Wait for approval.
3. Write or use a codemod that rewrites imports through removable barrels to the defining file, handling default and renamed re-exports, type-only exports (`export type`) and path aliases. Run it per folder.
4. Delete barrels that have no importers left. Run the type check, the linter, the tests{{#test_command}} with `{{test_command}}`{{/test_command}} and the build after each folder.
5. Report the before and after numbers that motivated the change if they can be measured (test startup time, cycles found by the project's cycle checker), and propose a lint rule to stop new internal barrels.
</task>

<constraints>
- Keep package entry points and deliberate public boundaries.
- A barrel with side effects is not deleted until those side effects have an explicit home.
- Only import statements change; no symbol renames or moves in the same change.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Barrels found
Table: path, re-exports, importers, side effects, role.
## Keep or remove
Decision and reason per barrel.
## Plan
Codemod approach and folder order.
## Diff
The change (summarised for mechanical import rewrites).
## Check
Type check, lint, tests, build and measurements.
</output_format>
