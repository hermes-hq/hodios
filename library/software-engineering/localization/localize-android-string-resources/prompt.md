---
schema: 1
id: localize-android-string-resources
kind: prompt
title: Localize Android string resources
description: Localizes an Android app's resources properly, with strings.xml and plurals, formatting arguments, locale qualifiers, per-app language settings, Compose and View usage, and lint checks.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer]
stack: [android]
requires: [repo-read, file-write]
inputs: [repo, file]
output: [diff, code, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [strings-xml, per-app-language, jetpack-compose]
pairs_with:
  prompts: [extract-ui-strings, plan-rtl-support]
args:
  - name: project
    description: The modules to change, minSdk and targetSdk, UI toolkit (Compose, Views or both) and the current state of string resources.
    type: text
    required: true
  - name: locales
    description: Languages to add, with any regional variants, for example "de, pt-BR, zh-Hans, ar".
    type: string
    required: true
  - name: in_app_language_picker
    description: Whether users should be able to choose the app language separately from the device language.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Current state, Resource changes, Code changes, Per-app language, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Android localization breaks in specific, known ways. `getString(R.string.x) + count` and `if (n == 1)` bypass the `<plurals>` resource and its CLDR quantities. Several `%s` in one string cannot be reordered by translators; they need `%1$s`, `%2$d`. Apostrophes and `@`/`?` at the start need escaping, and an unescaped `'` fails the build. Regional and script variants need BCP 47 qualifiers (`values-b+zh+Hans`, `values-b+sr+Latn`) because the old `values-zh-rCN` form cannot express scripts. Without `android:localeConfig` and the AppCompat or platform per-app language APIs (Android 13 and later, back-ported by AppCompat), users cannot pick a language different from the device one. Strings read once into a ViewModel or a singleton do not change when the locale changes. Context-free code (`Resources.getSystem()`, application context cached before a locale change) shows the wrong language.
</context>

<task>
Localize this Android project:

{{project}}

Languages: {{locales}}. In-app language picker: {{in_app_language_picker}}.

1. Inspect: modules and their `res/values*/strings.xml`, hard-coded text in layouts and Compose, use of `getString` with concatenation, `plurals`, `translatable="false"` strings, and lint configuration.
2. Resources: move remaining hard-coded text into `strings.xml` with descriptive names; convert count logic to `<plurals>` with the quantities the target languages need and `pluralStringResource` / `getQuantityString` (pass the count twice when it is also an argument); number every format argument; escape apostrophes, quotes, `@` and `?`; mark non-translatable strings; add `xliff:g` tags around placeholders and brand names translators must not change, plus comments.
3. Folders: create `values-<qualifier>` folders with correct BCP 47 qualifiers for each locale, including script and region where needed, and explain the resource fallback for each.
4. Code: use `stringResource` in Compose and `getString` with a current Context in Views; never cache translated strings in long-lived objects; format numbers, dates and currencies with locale-aware APIs from the current configuration.
5. Per-app language (if requested): add `locales_config.xml` and `android:localeConfig`, use `AppCompatDelegate.setApplicationLocales` (with the AppCompat locale service for older versions) or `LocaleManager`, and show each language name in its own language in the picker.
6. Layout: enable `supportsRtl`, use start/end instead of left/right, and mirror directional icons with `autoMirrored` when any locale is right-to-left.
7. Checks: run lint for `MissingTranslation`, `ExtraTranslation`, `StringFormatInvalid`, `StringFormatCount` and `HardcodedText`; run with the pseudolocales `en-XA` and `ar-XB` (enable `pseudoLocalesEnabled` in a debug build) and list what to check.
</task>

<constraints>
- Do not write translations unless asked; leave target files for translators or mark machine drafts for review.
- Keep source-language behaviour unchanged.
- State the minSdk assumptions for every API you use and give the fallback below it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Current state
Findings with file references.

## Resource changes
The diff for resource files.

## Code changes
The diff for Kotlin or Java files.

## Per-app language
Configuration and picker code, or "not requested".

## Checks
Lint and pseudolocale checklist.
</output_format>
