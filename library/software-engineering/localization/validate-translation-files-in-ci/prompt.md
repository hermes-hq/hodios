---
schema: 1
id: validate-translation-files-in-ci
kind: prompt
title: Validate translation files in CI
description: Adds CI checks that fail on broken ICU or gettext syntax, placeholder and plural mismatches, missing or duplicate keys, bad markup and bad encoding in translation files, with a debt baseline.
category: localization
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [frontend-engineer, devops-engineer, software-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, code, config, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [ci-gate, placeholder-checks, icu-messageformat, message-catalog, encoding]
pairs_with:
  prompts: [review-translated-strings, automate-translation-file-sync, audit-translation-keys]
args:
  - name: project
    description: Catalog formats and locations, message syntax (ICU, i18next, gettext, platform), CI system, and how translations arrive (pull requests from a translation tool, manual edits).
    type: text
    required: true
  - name: missing_key_policy
    description: What a missing translation should do in CI.
    type: enum
    enum: [fail, warn, fail-on-release-branches]
    default: fail-on-release-branches
output_contract:
  format: markdown
  sections: [Baseline, Checks, Implementation, CI wiring, Current findings, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Translations usually arrive as automated pull requests from a translation tool, and nobody reads them line by line, so the checks must be mechanical. The failures that reach production: an ICU message with an unbalanced brace that throws at render time; a placeholder renamed or dropped by a translator (`{userName}` became `{nombre}`); a plural message missing a category the target locale needs (Polish without `few`), or the `other` category missing entirely; HTML tags unbalanced or new tags added; duplicate keys in JSON, which parsers silently resolve by keeping the last one; files saved in the wrong encoding or with mojibake (`Ã©` where `é` should be); and keys missing in a locale. Each format has native validators worth using first (`msgfmt --check` for gettext format strings, the platform's own build step for ARB, Android or Apple strings, i18n-tasks for Rails), and the rest needs a small script using a real parser for the message syntax. Existing debt should not block every pull request: record a baseline and fail only on new problems, while reporting the total.
</context>

<task>
Add CI validation for translation files in this project:

{{project}}

Missing-key policy: {{missing_key_policy}}.

1. Run the existing CI checks locally where possible and record the baseline. Stop and report if they fail for unrelated reasons.
2. Inventory the catalog files, formats and message syntax, and any validation that already exists.
3. Checks: define the list, each with severity: file parses; encoding is valid UTF-8 (or the format's required encoding) with no mojibake patterns; no duplicate keys (use a parser that detects them); every message parses with the real message-syntax parser; placeholder names and types match the source message; plural and select messages include `other` and every CLDR category the target locale needs; markup tags match the source; length limits from metadata are respected where present; missing and extra keys compared with the source locale, handled by {{missing_key_policy}}.
4. Implementation: use native validators where they exist; write one script for the rest, in the repo's main language, using an existing parser library for the message syntax. Output machine-readable results and annotations that point to file and line.
5. Baseline: record current findings in a committed baseline file so only new findings fail, and print the remaining total on every run.
6. CI wiring: run the checks on pull requests that touch catalogs or the source locale, and on release branches. Keep the job fast.
7. Run the checks against the current catalogs and report what they found, grouped by check and locale.
8. Add tests for the script with small fixture files covering each check's pass and fail cases.
</task>

<constraints>
- Parse messages with a real parser, never regular expressions alone.
- Do not fix translations in this change; report findings.
- Do not make the job fail on existing debt without a baseline unless asked.
- Do not change the translation tool's configuration; recommend changes.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Existing CI and validation before changes.

## Checks
| Check | Formats | Severity | Tool |

## Implementation
The script and native validator commands.

## CI wiring
The job definition and triggers.

## Current findings
Counts by check and locale, with examples.

## Verification
Script tests and a run against the catalogs, with real results.
</output_format>
