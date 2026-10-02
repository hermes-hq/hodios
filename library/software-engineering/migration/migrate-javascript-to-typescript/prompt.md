---
schema: 1
id: migrate-javascript-to-typescript
kind: prompt
title: Migrate JavaScript to TypeScript
description: Plans and carries out an incremental JavaScript-to-TypeScript migration with config, file order, typed boundaries and a strictness ratchet. Use to move a JS codebase without a freeze.
category: migration
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [frontend-engineer, backend-engineer, fullstack-engineer, tech-lead]
stack: [typescript, javascript]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [plan, config, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [type-safety, incremental-migration, tsconfig, strictness-ratchet]
args:
  - name: repo_area
    description: The package, folder or app to migrate, and any constraints (release dates, files owned by other teams, code that must not change).
    type: text
    required: true
  - name: strictness_target
    description: Where the type checker should end up - loose (strict off, catch obvious errors) or strict (the full strict family of flags).
    type: enum
    enum: [loose, strict]
    default: strict
output_contract:
  format: markdown
  sections: [Current state, Config, Conversion order, Strictness ratchet, First batch, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Big-bang TypeScript migrations stall: hundreds of files renamed at once, `any` sprinkled everywhere to get the build green, behaviour changes hidden in "type fixes", and a strict mode that is never turned on. Migrations that finish are incremental. JavaScript and TypeScript coexist, the most valuable boundaries are typed first, each batch is small and reviewable, and a CI guard makes the type safety only ever go up.
</context>

<task>
Migrate {{repo_area}} to TypeScript, targeting {{strictness_target}} type checking.

Phase 1, plan (no file changes yet):
1. Inspect the build: bundler or compiler, Babel or SWC usage, test runner, linter, module system (ESM or CommonJS), Node version, path aliases, and any existing JSDoc types or `.d.ts` files.
2. Propose the `tsconfig.json`: `allowJs` on and `checkJs` off to start, `noEmit` if a bundler compiles, `module` and `moduleResolution` matching the runtime (`NodeNext` for Node, `Bundler` for bundled apps), `isolatedModules`, `skipLibCheck`, and the target. Wire type checking into CI and the test runner.
3. Order the conversion: shared types and module boundaries first (API clients, data models, configuration, the most-imported utilities), then leaf modules up the dependency graph. Group files into batches of about 10 to 20 that can each merge on their own.
4. Define the strictness ratchet. For strict: turn on `strict` early and track each suppression (`any`, `@ts-expect-error`) with a count that CI only allows to go down. For loose: turn on `noImplicitAny` and `strictNullChecks` per directory as batches finish, and stop there.
5. List untyped dependencies and whether `@types` packages exist; plan small local declaration files for the rest.

Stop after Phase 1 and wait for approval.

Phase 2, after approval:
6. Convert the first batch: rename with git so history follows, add types, use `unknown` rather than `any` at external inputs and narrow it with runtime validation, and change no runtime behaviour.
7. Run the type checker, the tests and the linter, and report the real results.
</task>

<constraints>
- Never mix behaviour changes into a conversion batch. If you find a bug, note it and leave it.
- Do not silence errors with `any` or `@ts-ignore` without counting it in the ratchet and adding a comment that says why.
- Prefer inferred types over annotations that repeat what the compiler already knows.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current state
Build, modules, test runner, file counts, and existing types.
## Config
The `tsconfig.json` and the build, test and CI changes, as diffs.
## Conversion order
A table: batch, files, why this order, estimated effort.
## Strictness ratchet
Flags by stage, the suppression budget, and the CI guard.
## First batch
(Phase 2 only) the diff summary and the type-check, test and lint results.
## Risks
Bullets: build tooling, runtime differences, and team habits to watch.
</output_format>
