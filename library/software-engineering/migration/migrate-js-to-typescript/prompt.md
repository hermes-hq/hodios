---
schema: 1
id: migrate-js-to-typescript
kind: prompt
title: Migrate JavaScript to TypeScript
description: Migrates a JavaScript codebase or folder to TypeScript incrementally, leaf modules first, with real types instead of any and no behaviour changes. Use when adopting TypeScript in an existing project.
category: migration
version: 1.0.0
status: experimental
stage: [maintain]
role: [frontend-engineer, backend-engineer, fullstack-engineer, software-engineer]
stack: [javascript, typescript]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [type-safety, incremental-migration, tsconfig]
args:
  - name: scope
    description: What to migrate, for example a folder, a package or the whole repository.
    type: text
    required: true
  - name: strictness
    description: gradual starts loose and tightens at the end; strict uses strict mode for every migrated file from the start.
    type: enum
    enum: [gradual, strict]
    default: gradual
output_contract:
  format: markdown
  sections: [Plan, Progress, Escape hatches, Bugs found, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A TypeScript migration pays off only if the types are real. Renaming files and adding `any` everywhere gives the cost of TypeScript without the safety. Migrating leaf modules first means each file can be typed against already-typed dependencies, and keeping behaviour identical means any test failure points at a typing mistake, not a feature change.
</context>

<task>
Migrate {{scope}} to TypeScript with {{strictness}} strictness.

1. Inspect the setup: build tool, bundler, test runner, linter, module format, and any existing `tsconfig.json`. Run the build and tests and record the baseline.
2. Set up TypeScript so JavaScript and TypeScript can coexist (for example `allowJs`), matching the existing module format and paths. With strict strictness, enable `strict` now; with gradual, start with `strict` off and note the flags to turn on later.
3. Build the import graph for the scope and order files leaf first: files that import nothing internal come first.
4. Migrate in batches of up to about 10 files. For each file, rename it with `git mv` to keep history, then add types derived from how the code is actually used: parameters, return types of exported functions, and shared shapes as named types. Use existing JSDoc as a starting point. For third-party packages, install their type packages or write a minimal local declaration.
5. After each batch, run the type check and the tests. Fix the types, not the behaviour.
6. With gradual strictness, turn on the strict flags one at a time once everything is migrated, and fix what each one finds.
</task>

<constraints>
- No behaviour changes. If typing reveals a bug, record it under Bugs found and leave the behaviour as it is, unless the user asks you to fix it.
- Avoid `any`. When it is unavoidable, add `// TODO(types): reason` next to it, and list every instance under Escape hatches.
- Use `@ts-expect-error` with a reason instead of `@ts-ignore`, and do not use non-null assertions only to silence errors.
- Keep module paths and the public exports stable so callers outside the scope keep working.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Plan
The setup changes and the batches in order.
## Progress
Table: batch, files, type check result, tests result.
## Escape hatches
Bullets: `path:line` — `any` or `@ts-expect-error` — reason. Or "None".
## Bugs found
Bullets: `path:line` — the bug — how it would surface. Not fixed. Or "None".
## Verification
Commands run with their real results, before and after.
</output_format>
