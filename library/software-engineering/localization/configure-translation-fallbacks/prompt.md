---
schema: 1
id: configure-translation-fallbacks
kind: prompt
title: Configure translation fallbacks
description: Configures message fallback chains such as pt-BR to pt to en, partial-translation behaviour, correct lang marking of fallback text and missing-key reporting, so users never see raw keys.
category: localization
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, fullstack-engineer, mobile-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, config, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [fallback-chain, missing-keys, cldr-parent-locales, bcp-47, error-reporting]
pairs_with:
  prompts: [design-locale-detection-and-routing, validate-translation-files-in-ci, lazy-load-translation-bundles]
args:
  - name: project
    description: i18n library and version, platforms, catalog layout, locales and regional variants shipped, and what users see today when a key is missing.
    type: text
    required: true
  - name: locales
    description: Locales shipped, including regional and script variants, for example "en, en-GB, pt, pt-BR, zh-Hans, zh-Hant, es, es-419".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Fallback chains, Configuration, Missing-key handling, Mixed-language rendering, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Fallback is two separate decisions that are often conflated: which locale a user gets (negotiation) and, within that locale, what to show when one message is missing (message fallback). Message fallback should walk a chain from the most specific locale to the source language: `pt-BR` to `pt` to `en`, `es-MX` to `es-419` to `es` to `en`. Naive truncation produces wrong chains: CLDR defines parent locales (`en-IN` and `en-AU` inherit from `en-001`, not `en-US`; `es-MX` from `es-419`), Traditional Chinese must never fall back to Simplified (`zh-Hant-HK` to `zh-Hant`, never `zh`), and Serbian Latin and Cyrillic are different scripts. Norwegian `no`, `nb` and `nn` need explicit mapping. When a message falls back, it is in another language: screen readers pronounce it wrongly unless the fragment carries its own `lang` attribute, and plural selection must use the fallback message's locale rules. Raw keys are never acceptable output, and missing keys should be reported (deduplicated and sampled) so they get fixed, while development and test builds should fail loudly.
</context>

<task>
Configure translation fallbacks in this project:

{{project}}

Locales: {{locales}}.

1. Run the tests and record the baseline, and record what the app currently renders for a missing key in a non-default locale. Stop and report if tests fail.
2. Read the i18n configuration, catalog layout and any custom missing-key handler.
3. Fallback chains: write the chain for every locale in {{locales}} using CLDR parent locales and script rules, ending at the source language. Flag locales where the chain needs a product decision (for example whether `en-GB` users should see `en-US` spellings).
4. Configuration: express the chains in the library's fallback configuration (a map rather than a single fallback language if the library supports it); if it supports only one fallback, add a small resolver. Make sure plural rules for a fallback message come from the locale the message came from.
5. Missing-key handling: in development and test, throw or fail the test on a missing key; in production, render the fallback text, never the key, and report the key, locale and route to logs or monitoring, deduplicated per session and sampled.
6. Mixed-language rendering: where the library or framework allows it, wrap fallback text in an element with the fallback `lang` attribute; otherwise list it as a known limitation.
7. Partial translations: define a completeness threshold per locale below which the locale is hidden from the language picker, and how that is computed.
8. Tests: a missing key in a regional locale resolves to its parent, Traditional Chinese never resolves to Simplified, a missing key everywhere renders the source text and reports once, and a plural message falling back uses the right rules.
9. Run the tests again and report results.
</task>

<constraints>
- Never configure a fallback from one script to another (Hant to Hans, Latn to Cyrl).
- Never render raw keys in production.
- Do not invent translations to fill gaps.
- Do not log user content with missing-key reports.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Tests and current missing-key behaviour.

## Fallback chains
| Locale | Chain | Needs a decision |

## Configuration
The library configuration or resolver.

## Missing-key handling
Development, test and production behaviour and the reporting code.

## Mixed-language rendering
How fallback text is marked, or the limitation.

## Tests
The new tests.

## Verification
Commands and results.
</output_format>
