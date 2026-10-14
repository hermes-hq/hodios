---
schema: 1
id: fix-jest-or-vitest-config-error
kind: prompt
title: Fix a Jest or Vitest configuration error
description: Fixes test runner errors that stop tests before they run, such as ESM and CommonJS conflicts, TypeScript transforms, path aliases, missing jsdom, and CSS, image or SVG imports in Jest or Vitest.
category: debugging
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer, software-engineer]
stack: [javascript]
requires: [repo-read, file-write, shell]
inputs: [logs, config, repo]
output: [explanation, diff, config]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [jest, vitest, esm, test-environment, path-aliases]
pairs_with:
  prompts: [mock-modules-in-jest-or-vitest, fix-module-import-error, set-up-testing-in-new-project]
  personas: [frontend-engineer, test-engineer]
args:
  - name: error
    description: The full error output of the test run and the command used.
    type: text
    required: true
  - name: config
    description: The runner config (jest.config, vitest.config or vite.config), package.json "type" and scripts, tsconfig, Babel or SWC config and setup files, or their paths.
    type: text
output_contract:
  format: markdown
  sections: [Error class, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who fixes test runner configuration by knowing how each runner loads code. Jest transforms files with Babel, ts-jest or SWC and runs CommonJS by default; its native ESM support is experimental and needs `--experimental-vm-modules`. Vitest reuses Vite's pipeline, so ESM, TypeScript, aliases and CSS work as they do in the app, if the Vite config is shared. Common failures:
- "SyntaxError: Cannot use import statement outside a module" or "Unexpected token 'export'" in Jest: a dependency in `node_modules` ships ESM only, and Jest does not transform `node_modules` by default. Add it to the exception in `transformIgnorePatterns`, use a CommonJS build of it, or move to Vitest. In Vitest the equivalent is `server.deps.inline`.
- "Cannot find module '@/components/...'": the tsconfig `paths` alias is not known to the runner. Jest needs `moduleNameMapper`; Vitest needs `resolve.alias` or `vite-tsconfig-paths`, and a separate `vitest.config` that does not merge the Vite config loses the app's aliases.
- "document is not defined" or "window is not defined": the test environment is `node`. Set `testEnvironment: "jsdom"` (Jest 28+ needs `jest-environment-jsdom` installed) or `environment: "jsdom"` or `happy-dom` in Vitest, globally or per file with a docblock comment.
- CSS, SCSS, images and SVG imports: Jest needs `moduleNameMapper` to `identity-obj-proxy` or a file stub; SVGs imported as React components need a mock component. Vitest handles CSS (with `css` options) and assets.
- "describe is not defined" or "expect is not defined" in Vitest: `globals: true` is off; import from `vitest` or enable it, and add `vitest/globals` to tsconfig types.
- TypeScript errors only in tests: test files excluded from the tsconfig used by the type checker, or missing `@types/jest` or Vitest types.
- `jest.mock` hoisting surprises, `ReferenceError: jest is not defined` in ESM mode, and `TextEncoder`, `fetch` or `structuredClone` missing in older jsdom versions.
</context>

<task>
Fix this test runner error.

Error:
{{error}}
{{#config}}

Config:
{{config}}
{{/config}}

1. Classify the error: module syntax, resolution or alias, environment, asset import, globals and types, or setup file. Quote the line that decides it.
2. Read the runner config, package.json, tsconfig, transform config and setup files, and the versions of the runner, transformer and environment packages.
3. Name the cause, including which file or dependency the runner failed on and why the app build works while tests do not.
4. Apply the smallest config fix that matches the project: share the app's alias and transform setup with the runner rather than duplicating it, add only the needed `transformIgnorePatterns` or inline exceptions, set the environment where it is needed, and add stubs for asset types.
5. Run the failing test file, then the whole suite, and report results. If tests now fail on assertions, say so; that is a separate problem.
</task>

<constraints>
- Do not migrate between Jest and Vitest as a fix unless asked; mention it as an option if the project fights Jest's ESM support.
- Do not disable type checking, delete failing test files or mark them skipped to make the run pass.
- Do not add broad `transformIgnorePatterns` that transform all of `node_modules`; list the packages.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Error class
The category and the deciding line of output.
## Cause
What the runner failed on and why.
## Fix
The config diff.
## Verification
Commands run and results.
</output_format>
