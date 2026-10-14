---
schema: 1
id: parse-localized-user-input
kind: prompt
title: Parse localized user input
description: Makes forms accept numbers, amounts, dates and times as users type them in their locale, with locale-aware parsing, clear confirmation of what was understood and unambiguous storage.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, mobile-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [input-parsing, decimal-separator, date-input, form-validation, native-digits]
pairs_with:
  prompts: [implement-locale-formatting, design-international-address-and-name-fields, support-ime-text-input]
args:
  - name: scope
    description: Forms, fields or components to fix, and the platform (web, iOS, Android, desktop).
    type: text
    required: true
  - name: locales
    description: Locales users type in, as BCP 47 tags, for example "en-US, de-DE, fr-CH, hi-IN, ar-EG".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Inventory, Parsing layer, Field changes, Storage and API, Tests, Verification, Needs a decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Formatting output for a locale is well supported; parsing what users type is not, and naive parsing corrupts data silently. `parseFloat("1.234,56")` returns 1.234; `"1,234"` means one thousand two hundred thirty-four in en-US and one point two three four in de-DE; Swiss German uses an apostrophe or a narrow space for grouping; Indian grouping puts separators after two digits; users in Arabic-speaking or Hindi-speaking regions may type native digits; and mobile keyboards for `type="number"` vary by device and drop separators. The platform gives formatting data to build a parser from (separators via the formatter's parts, the locale's digits), but almost no built-in locale-aware number parser, so a small tested parser is needed. Dates typed as `03/04/2025` are ambiguous; a date picker or an unambiguous field order is safer, and a date-only value (a birthday, a due date) must be stored as a calendar date, not as midnight UTC, or it shifts by a day for users west of UTC. Echoing back the interpreted value ("3 April 2025", "1,234.56") on blur catches mistakes. The server should receive canonical values (numbers, ISO 8601 dates, minor units with currency), never locale-formatted strings.
</context>

<task>
Make the input fields in {{scope}} accept localized input for {{locales}}.

1. Run the build and tests and record the baseline. Stop and report if they fail.
2. Find how the current locale is known on the client, and reuse that source.
3. Inventory every numeric, money, percentage, date, time and date-time input in scope: the control type, how it is parsed today, how the value is sent to the server and stored, and which locales it fails for.
4. Parsing layer: create or extend one module that derives the locale's decimal and grouping separators and digits from the platform formatter, normalises native digits to ASCII, strips grouping only where it matches the locale's pattern, rejects ambiguous input instead of guessing, and returns a typed value or an error. For money, take the currency from the form context and validate decimal places against it. For dates and times, prefer a native or library picker; for typed dates, use the locale's field order and reject impossible dates.
5. Field changes: use `inputmode` (or the platform keyboard type) instead of `type="number"` where it drops separators, show the locale's format as a hint, echo the interpreted value on blur, and keep the user's text while it is invalid rather than clearing it.
6. Storage and API: send canonical values; store date-only values as dates without a time zone and timestamps in UTC with the user's zone kept where needed. List any API that accepts locale-formatted strings today and change only those in scope.
7. Tests: table tests per locale for the parser (grouped and ungrouped numbers, negative values, native digits, ambiguous input rejected, zero- and three-decimal currencies, a date near midnight and a date-only value in a zone west of UTC), plus a component test for the echo.
8. Run build and tests again and report results.
</task>

<constraints>
- Never guess on ambiguous input; ask the user through validation.
- Never send or store locale-formatted strings as data.
- Do not change what users see in other forms outside scope.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Baseline
Build and tests before changes.

## Inventory
| Field | Control | Parsing today | Sent and stored as | Fails for |

## Parsing layer
The module code.

## Field changes
The diff for the fields.

## Storage and API
Canonical formats and any API changes.

## Tests
Table tests and component tests.

## Verification
Commands and results.

## Needs a decision
Ambiguous cases, API changes outside scope, and data already stored wrongly.
</output_format>
