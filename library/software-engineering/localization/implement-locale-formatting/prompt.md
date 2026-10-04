---
schema: 1
id: implement-locale-formatting
kind: prompt
title: Implement locale-aware formatting
description: Replaces hand-built date, time, number, currency, percentage and list formatting with locale-aware platform APIs across a codebase, and adds tests that run in several locales.
category: localization
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, mobile-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [intl, date-formatting, number-formatting, currency, time-zones, cldr]
pairs_with:
  prompts: [extract-ui-strings, review-i18n-readiness]
args:
  - name: scope
    description: Files, directories or features to convert, for example "src/" or "the checkout and order history screens".
    type: text
    required: true
  - name: locales
    description: Locales to support and test, as BCP 47 tags, for example "en-US, de-DE, fr-FR, ja-JP, ar-EG, hi-IN". Include at least one right-to-left and one non-Latin-digit locale if the product ships to them.
    type: text
    required: true
  - name: platform
    description: Where the code runs. Determines which formatting APIs to use.
    type: enum
    enum: [web, ios, android, backend]
    default: web
output_contract:
  format: markdown
  sections: [Baseline, Inventory, Formatting layer, Changes, Tests, Needs a decision, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hand-built formatting looks right only in the developer's own locale. `month + "/" + day` is wrong for most of the world; `amount.toFixed(2) + " $"` breaks currencies with zero or three decimal places and puts the symbol on the wrong side; `n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")` ignores Indian digit grouping and locales that use a dot or a space as the separator; string-joined lists with "and" cannot be translated; and dates formatted on the server in its own time zone show the wrong day to users elsewhere. Platform APIs backed by CLDR data (`Intl` on the web and Node, `FormatStyle` and formatters on Apple platforms, `java.text`/`android.icu` on Android, ICU or Babel-style libraries on servers) solve all of this when used consistently.
</context>

<task>
Replace hand-built formatting in {{scope}} with locale-aware formatting for {{platform}}, supporting {{locales}}.

1. Run the build and tests and record the baseline. If they fail, stop and report.
2. Find where the app decides the current locale and time zone today (user settings, the request's language header, the device). If there is no single source, note it under Needs a decision and use the platform default for now; do not invent a locale-detection system.
3. Inventory hand-built formatting: string-concatenated dates and times, fixed date patterns, `toFixed` or manual separators for numbers, hard-coded currency symbols or positions, manual percentage maths, relative times ("3 days ago"), lists joined with commas and "and", units (km, kg) and file sizes. Also find parsing of user-entered numbers and dates that assumes one format.
4. Create or extend one small formatting module that wraps the platform APIs (on {{platform}}, use its standard CLDR-backed formatters) and takes the locale (and time zone, where relevant) explicitly. Reuse formatter instances where construction is expensive. Do not add a new dependency when the platform API covers the need.
5. Replace each instance with a call to that module:
   - Dates and times: format with style options (date style, time style or explicit fields), never fixed patterns, and always with an explicit time zone. Store and transmit timestamps in UTC; convert only for display.
   - Money: format from an amount and an ISO 4217 currency code, letting the API decide symbol, position and decimal places. Keep monetary amounts in integer minor units or a decimal type; never format a floating-point sum.
   - Numbers, percentages, compact numbers, units and relative times with their dedicated formatters.
   - Lists with the list formatter.
   - Parsing of user input: use locale-aware parsing, or a locale-neutral input control, and never assume a decimal separator.
6. Add tests that render representative values (a date near midnight in a non-UTC zone, a large number, a negative amount, a zero-decimal currency such as JPY, a three-decimal currency such as KWD, a list of three items) in every locale in {{locales}}. Assert on structure and key properties, or on outputs you have verified from the platform, not on strings you guessed; note that whitespace characters such as narrow no-break spaces can differ between runtime versions.
7. Run the build, type check and tests again, and compare with the baseline.
</task>

<constraints>
- Do not translate strings or move text into catalogs; that is separate work. Where a formatted value sits inside a concatenated sentence, flag it under Needs a decision.
- Output in the default locale may change only where the old output was wrong; list every such change.
- Never change stored data formats or API payloads to localised strings.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Baseline
Build and test results before changes.

## Inventory
| File:line | Kind (date, money, number, list...) | Problem | Replacement |

## Formatting layer
The formatting module as code.

## Changes
A unified diff of the call sites.

## Tests
The new tests, and the locales and edge values they cover.

## Needs a decision
Locale and time zone source issues, concatenated sentences, default-locale output changes.

## Verification
Commands run and their real results.
</output_format>
