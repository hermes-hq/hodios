---
schema: 1
id: localize-react-native-app
kind: prompt
title: Localize a React Native or Expo app
description: Localizes a React Native or Expo app with device locale detection, message catalogs, Intl polyfills for Hermes, RTL handling, and native app names and permission strings per language.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer]
stack: [react-native]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [hermes, intl-polyfills, rtl, permission-strings]
pairs_with:
  prompts: [plan-rtl-support, extract-ui-strings, localize-app-store-listing]
args:
  - name: project
    description: Expo managed, Expo prebuild or bare React Native; versions; JS engine; navigation library; any i18n already present.
    type: text
    required: true
  - name: locales
    description: Languages to support, default first, for example "en, es, de, ar".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Locale detection, Messages and formatting, Intl support, RTL, Native strings, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A React Native app has two layers to localize: JavaScript UI text, and native strings the OS shows before or outside the JS runtime (the app name under the icon, iOS permission prompts such as camera and location usage descriptions, Android notification channel names). Teams translate the first and forget the second, so the permission dialog appears in English. The device gives an ordered list of preferred locales (from expo-localization or react-native-localize), which should be matched against supported languages rather than taking the first entry. Hermes ships only part of `Intl`; depending on the version, `Intl.PluralRules`, `NumberFormat` options or `DisplayNames` may be missing or incomplete, so plurals silently fall back to the `other` form unless the FormatJS polyfills are loaded in the right order before the i18n library initialises. Right-to-left layout is controlled natively through `I18nManager`; changing it at runtime only takes effect after an app reload. iOS also needs the supported languages declared in the app's localization list, or the OS settings will not offer a per-app language. Users change device language while the app is in the background, so the locale must be re-read when the app returns to the foreground.
</context>

<task>
Localize this React Native app:

{{project}}

Languages: {{locales}}.

1. Run type check, lint and tests and record the baseline; if the project builds natively in CI, note the command. Stop and report if they fail.
2. Read the app entry, providers, navigation, any i18n code, `app.json` or `app.config` (Expo) and native project files (bare).
3. Locale detection: read the device's ordered preferred locales, match them against {{locales}} with language and region fallback, allow a user override stored in persistent storage, and re-check on returning to the foreground.
4. Messages: use the installed i18n library or i18next with react-i18next (or FormatJS) with one catalog per language, CLDR plural categories, named placeholders and a fallback language. Format dates, numbers and currency through `Intl` with the resolved locale.
5. Intl support: check which `Intl` APIs the app's engine version provides. Where gaps exist, add the needed FormatJS polyfills and locale data for {{locales}} only, imported in dependency order at the very top of the entry file, and verify plural output on device or in a test running the same engine.
6. RTL: for right-to-left languages, call `I18nManager.allowRTL` and `forceRTL` when the direction changes and reload the app (Expo `reloadAsync` or a restart library), use `start`/`end` style properties instead of `left`/`right`, and flip directional icons. For Expo, set the RTL support flag in the app config.
7. Native strings: app display name and every iOS permission usage description per language (Expo `locales` in the app config, or `InfoPlist.strings` files in bare iOS), Android `app_name` in `values-<lang>/strings.xml`, and the iOS supported-languages declaration. On Android 13 and later, declare supported locales for the per-app language setting.
8. Convert a small representative slice (one screen with a plural, one permission prompt) to prove the setup, and list the remaining hard-coded strings.
9. Run type check, lint and tests again. Report which checks need a device or simulator (permission prompts, RTL reload, app name) and give a manual check list for those instead of claiming they were verified.
</task>

<constraints>
- Do not include polyfill locale data for languages the app does not ship.
- Do not claim native behaviour was verified without running on a device or simulator.
- Do not invent translations; non-default catalogs and native string files start with the source text marked untranslated.
- Do not run native builds, `pod install` or prebuild without asking first if they would rewrite native folders.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Checks and tests before changes.

## Locale detection
Matching logic, override and foreground re-check.

## Messages and formatting
Library setup, catalog layout, plural example.

## Intl support
Engine gaps found and polyfills added, in order.

## RTL
Direction switching, reload and style changes.

## Native strings
App name, permission strings and supported-languages declarations per platform.

## Verification
What was run with real results, and the manual device check list.

## Follow-ups
Remaining strings and decisions.
</output_format>
