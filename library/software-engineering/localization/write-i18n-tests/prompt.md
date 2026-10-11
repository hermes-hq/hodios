---
schema: 1
id: write-i18n-tests
kind: prompt
title: Write automated i18n tests
description: Writes automated i18n tests for rendering per locale, every plural branch, formatting in a fixed time zone, fallbacks, text direction and pseudo-locale coverage, robust to CLDR updates.
category: localization
version: 1.0.0
status: incubating
stage: [verify]
role: [frontend-engineer, qa-engineer, software-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [tests, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [plural-rules, pseudo-locale, snapshot-tests, cldr, time-zones]
pairs_with:
  prompts: [pseudo-localize-ui, validate-translation-files-in-ci, write-icu-plural-messages]
args:
  - name: scope
    description: Screens, components, services or message groups to cover.
    type: text
    required: true
  - name: locales
    description: Locales shipped, as BCP 47 tags.
    type: string
    required: true
  - name: test_stack
    description: Test runner and UI testing tools in use, for example Jest with Testing Library and Playwright.
    type: string
output_contract:
  format: markdown
  sections: [Baseline, Test plan, Tests, Stability measures, Gaps found, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most i18n bugs are behavioural, not textual: a plural branch nobody rendered, a date formatted in the server's time zone, a missing key that shows raw instead of falling back, a right-to-left page with `dir` unset, a string that never went through the catalog. Tests that assert whole translated sentences break whenever a translator edits copy, and full-string format snapshots break when the runtime's CLDR data changes (some runtimes now put a narrow no-break space before AM and PM, for example). Robust i18n tests pick test numbers that hit every plural category of each locale (for example 0, 1, 2, 5, 21, 22, 25, 101, 1.5 cover English, Russian, Polish, Arabic and decimal cases), run with a fixed time zone and clock, assert on structure or on the key and arguments used, normalise whitespace where full strings are compared, and use a pseudo-locale to catch text that bypasses the catalog. Test catalogs or a stub translator keep component tests independent of real translations.
</context>

<task>
Write i18n tests for {{scope}}, covering {{locales}}.
{{#test_stack}}Test tools: {{test_stack}}.{{/test_stack}}

1. Run the existing tests and record the baseline. Stop and report if they fail.
2. Read the i18n setup, how tests currently initialise it, and the messages used in {{scope}}. Reuse existing test helpers.
3. Test plan: list the behaviours to test per area: rendering per locale, each plural branch, select or gender branches, date, number and currency formatting, fallback for a missing key and a missing locale, `lang` and `dir` attributes, locale switching, and a pseudo-locale pass. Mark which are unit, component and end-to-end tests.
4. Plural branches: for every message with a count in scope, compute the CLDR categories of each locale in {{locales}} with `Intl.PluralRules` (or the platform equivalent) and choose sample numbers that hit each category, including a decimal where the locale distinguishes it. Assert that the right branch was chosen, not the full translated sentence.
5. Formatting: pin the time zone and clock, format a value near midnight, a negative amount, a zero-decimal and a three-decimal currency, and assert on parts (`formatToParts`) or normalised strings produced by the same runtime.
6. Fallbacks: remove a key from a test catalog and assert the fallback language text appears and a missing-key event is reported, never the raw key.
7. Direction: render a right-to-left locale, if shipped, and assert `dir="rtl"` on the root and that directional icons use the mirrored variant where the code supports it.
8. Pseudo-locale smoke test: render each screen in scope with a pseudo-locale and assert that no visible text lacks the pseudo markers, reporting the strings that bypass the catalog.
9. Run the new tests twice and in a different machine time zone (set `TZ`) to prove they are stable, then report results and any real bugs found.
</task>

<constraints>
- Do not assert on full translated sentences for non-source locales.
- Do not change product code to make tests pass; report bugs under Gaps found.
- Do not weaken assertions to hide flaky formatting; normalise or assert on parts.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Baseline
Tests before changes.

## Test plan
| Area | Behaviour | Test type | Locales and sample values |

## Tests
The test code.

## Stability measures
Time zone, clock, whitespace normalisation and catalog stubbing.

## Gaps found
Real bugs exposed, with file and line.

## Verification
Commands run, including the repeated and different-time-zone runs, with real results.
</output_format>
