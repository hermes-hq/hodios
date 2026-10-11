---
schema: 1
id: migrate-i18n-library
kind: prompt
title: Migrate to another i18n library
description: Migrates from one i18n library or message format to another incrementally, converting catalogs and call sites with codemods behind an adapter, and proving parity by rendering every message in both.
category: localization
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, fullstack-engineer, tech-lead]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [plan, diff, code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [codemod, message-format-conversion, parity-check, incremental-migration, adapter-layer]
pairs_with:
  prompts: [convert-translation-file-format, choose-i18n-library, generate-typed-translation-keys]
args:
  - name: from_library
    description: The current library and version, its message syntax and catalog format.
    type: string
    required: true
  - name: to_library
    description: The target library and version, its message syntax and catalog format.
    type: string
    required: true
  - name: project
    description: Framework, size (number of call sites and keys), locales, the translation tool or vendor, and why the migration is happening.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Mapping, Migration plan, Adapter, Conversion, Parity check, Verification, Remaining work]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
i18n migrations fail in two ways: a big-bang rewrite that breaks hundreds of strings in languages nobody on the team reads, and a conversion that changes keys, so the translation tool sees every message as new and translators are asked to redo work. The safe path keeps keys stable, converts message syntax mechanically with a real parser on both sides (i18next double-brace interpolation and `_one`/`_other` suffix keys become one ICU `{count, plural, ...}` message; gettext source-text keys need a key map), routes all call sites through a thin adapter so old and new libraries can run side by side during the transition, rewrites call sites with a codemod based on the syntax tree rather than search and replace, and proves parity by rendering every message in every locale with representative arguments through both libraries and diffing the output. Differences are expected in a few places (whitespace, number formatting defaults, escaping) and must be reviewed, not ignored.
</context>

<task>
Plan and start migrating from {{from_library}} to {{to_library}} in:

{{project}}

1. Run build, type check and tests and record the baseline. Stop and report if they fail.
2. Inventory: count call sites by API (translate function, component, hook, server helper), catalogs and keys per locale, message features in use (plurals, selects, nesting, references between messages, formatting, rich text), configuration (fallbacks, detection, loading), and integrations (extraction scripts, the translation tool's file format, CI checks).
3. Mapping: a table from each source feature to the target equivalent, and features with no direct equivalent that need a decision. Keys stay the same unless the target forbids their shape; if so, define a deterministic key map and confirm with the translation tool's owner that history can be kept.
4. Migration plan: an ordered, incremental plan (adapter first, catalogs converted by script, call sites migrated per area, old library removed last), with a checkpoint after each step. Present it and wait for confirmation before changing code.
5. Adapter: after confirmation, add a thin module exposing the API the app needs, backed by the old library, and route call sites through it where that is cheap.
6. Conversion: write a script that parses each source message with the source syntax's parser and emits the target syntax, never with regular expressions; convert catalogs for every locale, keeping comments and metadata the target format supports. Write the codemod for call sites using a syntax-tree tool, and run it on one area first.
7. Parity check: a script that renders every key in every locale with representative arguments (counts that hit each plural category, each select case, a date and a number) through both libraries and reports differences. Review each difference and classify it as expected or a bug.
8. Switch the first area to the new library behind the adapter, run build, type check, tests and parity, and report.
</task>

<constraints>
- No key renames without a deterministic map and confirmation.
- Do not remove the old library until parity is clean and every area is migrated.
- Do not hand-edit converted translations; fix the converter and rerun.
- Stop after the plan for confirmation, and after the first area for review.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Build, type check, tests and the inventory counts.

## Mapping
| Source feature | Target equivalent | Decision needed |

## Migration plan
Ordered steps with checkpoints.

## Adapter
The adapter module.

## Conversion
Catalog converter and codemod, with the first area's results.

## Parity check
The script and differences found, classified.

## Verification
Commands and results after the first area.

## Remaining work
Areas left, open decisions and removal criteria for the old library.
</output_format>
