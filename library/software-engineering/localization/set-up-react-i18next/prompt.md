---
schema: 1
id: set-up-react-i18next
kind: prompt
title: Set up react-i18next in a React app
description: Sets up react-i18next in a React app with namespaces, lazy-loaded resources, correct plural keys, Suspense, language detection, typed keys and extraction tooling.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer]
stack: [react]
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
depth: specific
tags: [i18next, react-i18next, namespaces, plural-suffixes, language-detection]
pairs_with:
  prompts: [extract-ui-strings, write-icu-plural-messages, generate-typed-translation-keys]
args:
  - name: project
    description: Build tool (Vite, webpack, CRA), React version, TypeScript or not, routing, whether there is server rendering, and any i18n code already present.
    type: text
    required: true
  - name: locales
    description: Languages to support, default first, for example "en, es, pl, ar".
    type: string
    required: true
  - name: message_syntax
    description: i18next's own interpolation and plural suffixes, or ICU MessageFormat through the i18next-icu plugin.
    type: enum
    enum: [i18next-native, icu]
    default: i18next-native
output_contract:
  format: markdown
  sections: [Baseline, Configuration, Resources and namespaces, Usage patterns, Tooling, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
react-i18next is easy to start and easy to get subtly wrong. Plurals in current i18next use CLDR suffixes (`key_one`, `key_few`, `key_many`, `key_other`) resolved through `Intl.PluralRules`; old tutorials show `key_plural`, which only works with the legacy JSON format and silently breaks Polish, Russian or Arabic. `interpolation.escapeValue` should be false in React because React already escapes, but then `dangerouslySetInnerHTML` with a translated string becomes an XSS hole; markup inside messages belongs in the `Trans` component. Calling `t` at module scope runs before init and freezes the raw key. Natural-language keys containing `.` or `:` collide with the key and namespace separators. With `useSuspense` on (the default) and lazily loaded resources, a missing `Suspense` boundary crashes the tree; with it off, components render keys until resources arrive. The language detector caches the choice in localStorage or a cookie, so `fallbackLng` and the detection order decide what returning users see. `i18n.changeLanguage` does not update `<html lang>` or `dir` by itself. ICU syntax through the plugin and native i18next syntax must not be mixed in one catalog.
</context>

<task>
Set up react-i18next in this project:

{{project}}

Languages: {{locales}}. Message syntax: {{message_syntax}}.

1. Run the build, type check and tests; record the baseline. Stop and report if they fail.
2. Read the app's entry point, routing, providers and any existing i18n code or catalogs. Reuse what exists; do not add a second i18n library.
3. Create one `i18n` module that initialises i18next with `initReactI18next`, `fallbackLng`, `supportedLngs` from {{locales}}, `nonExplicitSupportedLngs` or `load: 'languageOnly'` as appropriate, `ns` and `defaultNS`, `interpolation.escapeValue: false`, and `returnNull: false`. Import it once at the entry point, before the app renders.
4. Resources: one folder per language and one JSON file per namespace (for example `common`, plus one per feature or route). Load namespaces on demand with a backend or dynamic imports so each route fetches only what it needs, and bundle the default language's `common` namespace if the first paint must not wait.
5. Detection: configure the language detector with an explicit order (query string or path if the app has one, then stored choice, then navigator) and a cache. On `languageChanged`, set `document.documentElement.lang` and `dir`.
6. Plurals and interpolation: with i18next-native syntax use CLDR plural suffixes; with icu use `{count, plural, ...}` through the i18next-icu plugin. Never `_plural`. Use named interpolation values. Pass dates and numbers through `Intl` formatters or i18next's formatting functions with the current language.
7. Usage: `useTranslation(namespace)` in components, `Trans` for messages with links or emphasis, and `i18n.t` only inside functions called after init. Wrap lazily loaded routes in `Suspense` with a fallback, or set `useSuspense: false` and handle `ready` explicitly; pick one and apply it consistently.
8. TypeScript: if the project uses TypeScript, declare `CustomTypeOptions` with the default namespace's resources so unknown keys fail the type check.
9. Tooling: add an extraction tool (i18next-parser or the current i18next CLI) with a config that writes keys to the right namespace and keeps existing translations, and an npm script for it.
10. Convert a small, representative set of components (one with a plural, one with embedded markup) to prove the setup. List remaining hard-coded strings for later; do not convert everything now.
11. Run build, type check and tests again and render the converted components in at least the default language and one language with complex plurals.
</task>

<constraints>
- Never use the legacy `_plural` suffix or `compatibilityJSON: 'v3'` in new code.
- Never render translated strings with `dangerouslySetInnerHTML`; use `Trans`.
- Do not call `t` at module scope or store translated strings in constants.
- Do not write translations for the other languages; new catalogs start with the source keys marked untranslated or rely on fallback.
- Confirm exact option and API names against the installed versions; they changed across major releases.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Build, type check and test results before changes.

## Configuration
The i18n module, with each option and why.

## Resources and namespaces
Folder layout, namespace split and how each is loaded.

## Usage patterns
Examples for plain text, plurals, embedded markup, formatting and Suspense handling.

## Tooling
Extraction config, scripts and type declarations.

## Verification
Commands run and real results, including the plural check.

## Follow-ups
Remaining hard-coded strings and open decisions.
</output_format>
