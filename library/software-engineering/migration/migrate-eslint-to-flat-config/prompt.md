---
schema: 1
id: migrate-eslint-to-flat-config
kind: prompt
title: Migrate ESLint to flat config
description: Moves ESLint from .eslintrc to the flat config file used by ESLint 9 and later, mapping extends, plugins, overrides, ignores, globals and TypeScript setup without changing the rule set.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer, maintainer]
stack: [javascript]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [config, diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [eslint, flat-config, linting, tooling-config]
pairs_with:
  prompts: [fix-lint-violations-repo-wide, upgrade-major-dependency]
args:
  - name: notes
    description: Current ESLint version, config files present (including package.json eslintConfig and .eslintignore), monorepo or not, TypeScript, editor and CI integration.
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Mapping, Changes made, Rule parity, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Flat config (`eslint.config.js` or `.mjs`/`.ts`) is the only format ESLint 9 reads by default (later majors drop `.eslintrc` support altogether), and the move is easy to get subtly wrong. What changes: `extends` strings become imported config objects spread into an array; plugins are imported objects keyed by namespace instead of name strings; `overrides` become separate array entries with `files` globs; `.eslintignore` and `ignorePatterns` become a config object with only `ignores` (global ignores) and the default ignores differ; `env` becomes `languageOptions.globals` from the `globals` package; `parser` and `parserOptions` move under `languageOptions`; configs no longer cascade and merge per directory, so nested `.eslintrc` files in a monorepo must become file-glob entries in one config (or complete, self-contained configs per package where the ESLint version looks configs up from each linted file's directory); and some shareable configs and plugins do not export flat configs yet, which is what the `FlatCompat` utility exists for. TypeScript projects usually move to the `typescript-eslint` package's config helpers. The trap is ending up with a different rule set: a glob that misses `.tsx` or a plugin config no longer applied produces a quieter lint that looks like success.
</context>

<task>
Migrate this project's ESLint setup to flat config.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Find every ESLint config source: `.eslintrc*` files at any depth, `eslintConfig` in `package.json`, `.eslintignore`, `ignorePatterns`, lint scripts, CI steps, editor settings and lint-staged config.
2. Record the baseline: run the linter as CI does and save the full output (error and warning counts by rule). Also dump the effective rule configuration for a few representative files (one JS, one TS, one test, one config file) with ESLint's print-config option.
3. Check the official ESLint migration guide and the docs of each shareable config and plugin for its flat export. Fetch them if you can; otherwise ask. Use the official config migrator if helpful, then review its output by hand.
4. Write the mapping: each extends, plugin, override, env, parser setting and ignore to its flat equivalent. Use `FlatCompat` only for packages with no flat export and list them.
5. Create the flat config, merging nested configs into file-glob entries, and delete the old files only after parity is shown.
6. Compare the effective rule configuration for the same representative files, then run the linter and compare results by rule with the baseline. Explain every difference.
7. Upgrade ESLint and plugins if that is part of the job, separately from the config change, and update scripts, CI and editor settings that pass removed CLI flags.
</task>

<constraints>
- The rule set and severities must stay the same unless the user agrees to a change. No new disabled rules, no lowered severities.
- Do not fix lint violations as part of this change; new violations caused by upgraded plugins are listed, not silently suppressed.
- Do not delete the old config files until parity is demonstrated.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Config sources found, ESLint and plugin versions, baseline counts.
## Mapping
Table: old setting, flat equivalent, notes (FlatCompat, renamed, removed).
## Changes made
New config file summary, files deleted, scripts and CI updated.
## Rule parity
Effective config comparison for representative files; differences explained.
## Verification
Lint results before and after by rule, editor integration checked.
</output_format>
