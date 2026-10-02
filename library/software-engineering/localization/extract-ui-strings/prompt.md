---
schema: 1
id: extract-ui-strings
kind: prompt
title: Extract hard-coded UI strings
description: Finds hard-coded user-facing strings and moves them into an i18n catalog with meaningful keys and translator comments, without changing behaviour. Use when preparing an app for translation.
category: localization
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, mobile-engineer, software-engineer]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, code]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [string-extraction, message-catalog, translation-keys]
pairs_with:
  prompts: [review-i18n-readiness, write-icu-plural-messages]
args:
  - name: files
    description: Files, folders or globs to process.
    type: text
    required: true
  - name: i18n_library
    description: i18n library or platform catalog, for example react-i18next, FormatJS, vue-i18n, Android strings.xml, Apple String Catalogs or gettext. Leave empty to detect it.
    type: string
  - name: key_style
    description: "dotted: nested keys such as checkout.payment.submit. flat: one level such as checkout_payment_submit."
    type: enum
    enum: [dotted, flat]
    default: dotted
output_contract:
  format: markdown
  sections: [Summary, Catalog additions, Source changes, Skipped, Needs a decision, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
String extraction looks mechanical, but most localisation bugs are created here. Concatenated fragments ("You have " + n + " items") cannot be translated, because word order and plurals differ by language. Keys named after the English text break as soon as the copy changes. The same English word in two contexts ("Open" the verb, "Open" the status) shares one key and gets one wrong translation. Log messages and analytics event names get extracted and break dashboards. Translators get a bare string with no idea where it appears or how long it may be.
</context>

<task>
Extract user-facing strings from {{files}}.

i18n library: {{i18n_library}} (if empty, detect it from dependencies and existing catalogs. If none exists, stop and recommend one suited to the stack in one paragraph).
Key style: {{key_style}}.

1. Study the existing setup: catalog location and format, how strings are looked up, the key naming already in use, the interpolation, plural and rich-text APIs, and where translator comments go.
2. Extract only text a user sees or hears: visible text, `aria-label`, `alt`, `title` and `placeholder` attributes, validation and error messages shown to users, notifications, page titles and email or push templates.
3. Do not extract: log and debug messages, exception messages that never reach the UI, analytics event names, CSS classes, test ids, route paths, enum values, API field names, or developer-only text. When in doubt, list the string under Needs a decision.
4. Convert, never copy, these patterns:
   - Concatenation and template literals become one message with named placeholders, in the library's own interpolation syntax.
   - Count-dependent text becomes the library's plural form (ICU `plural` or the platform plural resource), never `n === 1 ? ... : ...`.
   - Text with inline markup or links uses the library's rich-text or component interpolation instead of being split into pieces.
   - Dates, numbers and currency inside strings become placeholders formatted with the locale-aware formatter.
5. Name keys by feature, then screen or component, then purpose (`checkout.payment.submitButton`), never by the English text. Give identical English text in different contexts separate keys.
6. Add a translator comment to every new entry: where it appears, what each placeholder holds with an example value, and a maximum length if the space is constrained.
7. Behaviour must not change. Default-locale output must be identical to before, character for character, including whitespace and punctuation. Run the build, type check and tests.
</task>

<constraints>
- Do not translate anything; add only the source-language catalog entries.
- Do not reorganise or rename existing keys.
- Keep each file's change minimal: the lookup call plus any import the library needs.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Summary
Files touched, strings extracted, strings skipped.

## Catalog additions
The new entries in the catalog's own format, with their comments.

## Source changes
A unified diff.

## Skipped
| String | File:line | Reason |

## Needs a decision
Strings you could not classify, and messages that need product copy changes to translate well.

## Verification
Commands run and their actual results.
</output_format>
