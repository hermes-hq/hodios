---
schema: 1
id: generate-typed-translation-keys
kind: prompt
title: Generate typed translation keys
description: Adds compile-time checked translation keys and message arguments in TypeScript, so a missing key, a misspelt placeholder or a missing plural count fails the build instead of shipping.
category: localization
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [typescript]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, code, config]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [type-safety, code-generator, message-arguments, translation-keys, ci-gate]
pairs_with:
  prompts: [audit-translation-keys, validate-translation-files-in-ci, set-up-react-i18next]
args:
  - name: project
    description: The i18n library and version, catalog format and location, approximate number of keys, framework and build tool.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Approach, Key types, Argument types, Dynamic keys, Build integration, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Untyped `t("checkout.titel")` compiles and ships a raw key. Most libraries now offer a typing hook: i18next's `CustomTypeOptions` resources, next-intl's messages type augmentation, vue-i18n's schema generics, while compiled-message libraries such as Paraglide generate one typed function per message. Typing keys is the easy half; the arguments are where bugs live: a message `{count, plural, ...}` called without `count`, or `{userName}` called with `name`. Keys can be typed from the default catalog with `resolveJsonModule`, but ICU arguments are only visible by parsing the message, so argument types need a small generator that parses messages with a real ICU parser and emits a declaration file (plural and number arguments as `number`, date arguments as `Date | number`, select arguments as a union of their cases). Deep recursive key-path types slow the type checker badly past a few thousand keys; a generated flat union or interface is faster. Template-literal dynamic keys (``t(`status.${s}`)``) defeat both typing and unused-key detection unless replaced with an exhaustive map. Other locales must have the same keys and arguments as the default, which is a separate check from typing call sites.
</context>

<task>
Add compile-time checked translation keys and arguments to this project:

{{project}}

1. Run the type check and tests and record the baseline, including type-check time. Stop and report if they fail.
2. Read the i18n setup, catalogs and a sample of call sites. Find the library's supported typing mechanism for the installed version.
3. Approach: use the library's built-in typing for keys if it exists and performs acceptably at this catalog size; otherwise generate a flat key type. For arguments, decide whether the library already infers them; if not, add a generator script that parses every default-locale message with an ICU parser (or the library's own syntax) and emits a declaration file mapping each key to its argument object type. State the choice and why.
4. Key types: wire the type so `t` (or the equivalent) accepts only existing keys, including namespace prefixes where the library uses them.
5. Argument types: plural, selectordinal and number arguments as `number`, date and time arguments as `Date | number`, select arguments as a union of their literal cases plus `other`, rich-text tags as render functions where the library supports them, and messages without arguments reject an argument object if the library allows that.
6. Dynamic keys: find template-literal and concatenated keys and replace them with an exhaustive `as const` map from the domain value to the key, typed so a new enum value without a key fails to compile. List any you cannot convert.
7. Build integration: run the generator before the type check in the build and CI, and either commit the generated file with a check that it is current or generate it on every build; say which.
8. Fix the type errors this surfaces only where the fix is obvious (a typo in a key, a renamed argument); list the rest rather than casting them away.
9. Run the type check and tests again and report the number of errors found and fixed, the remaining list, and the type-check time compared with the baseline.
</task>

<constraints>
- No `as any`, `@ts-ignore` or `@ts-expect-error` to silence translation type errors.
- Do not change message text or catalogs except to fix clear key typos, and list each one.
- Do not parse ICU messages with regular expressions.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Type check, tests and type-check time before changes.

## Approach
Built-in typing or generator, and why.

## Key types
The declaration or augmentation code.

## Argument types
Generator script and a sample of the emitted types.

## Dynamic keys
Converted maps and the ones left.

## Build integration
Scripts and CI steps.

## Verification
Errors found and fixed, remaining list, type-check time.
</output_format>
