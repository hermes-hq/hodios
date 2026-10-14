---
schema: 1
id: set-up-vue-i18n
kind: prompt
title: Set up vue-i18n or Nuxt i18n
description: Sets up vue-i18n in a Vue app or the Nuxt i18n module, with locale routes, lazy-loaded and precompiled messages, Composition API usage, correct pluralisation and SEO tags.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [vue]
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
tags: [vue-i18n, nuxt-i18n, composition-api, plural-rules, message-compilation]
pairs_with:
  prompts: [extract-ui-strings, design-locale-detection-and-routing, write-icu-plural-messages]
args:
  - name: project
    description: Vue or Nuxt version, SPA or SSR, build tool, router, Content Security Policy if any, and any i18n code already present.
    type: text
    required: true
  - name: locales
    description: Locales to support, default first, for example "en, fr, cs, he".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Setup, Messages and loading, Pluralisation and formatting, Routing and SEO, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
vue-i18n v9 and later supports the Composition API only with `legacy: false`; projects that keep legacy mode mix `this.$t` and `useI18n` and get confusing scoping. Its plural syntax is pipe-separated (`no apples | one apple | {n} apples`), which maps to English but not to Czech, Polish, Russian or Arabic; those need a `pluralRules` function per locale, or the counts come out wrong. Messages are compiled at runtime unless they are precompiled at build time (the intlify bundler plugin); runtime compilation needs `new Function`, which a strict Content Security Policy blocks, and the full build is larger. The message compiler treats `@`, `{`, `}`, `|` and `$` as syntax, so an email address or a price in a message breaks compilation unless written as a literal interpolation such as `{'@'}`. Rendering translations with `v-html` invites XSS; markup belongs in the `i18n-t` component with slots. In SSR, an i18n instance created once at module scope is shared between requests and leaks one user's locale to another. In Nuxt, the i18n module handles routes, detection, lazy loading and head tags, but its `strategy`, `detectBrowserLanguage` and `lazy` options decide whether crawlers see every locale and whether users are redirected away from links they followed.
</context>

<task>
Set up internationalisation in this project:

{{project}}

Locales: {{locales}}.

1. Run the build, type check and tests and record the baseline. Stop and report if they fail.
2. Read the app's entry, router or Nuxt config, layouts and any existing i18n code. If this is Nuxt, use the Nuxt i18n module; if plain Vue, use vue-i18n directly. Do not add a second i18n library.
3. Configure with `legacy: false`, `locale` and `fallbackLocale` from {{locales}} (the available locales follow from the loaded messages). In Nuxt, set `strategy` (usually `prefix_except_default`), `defaultLocale`, the `locales` list with `language` codes for hreflang, lazy-loaded locale files (the `lazy` and `langDir` options changed across Nuxt i18n majors; check the installed version). In SSR without Nuxt, create the i18n instance per request inside the app factory.
4. Messages: one file per locale (and per feature if large), loaded lazily for non-default locales. Enable build-time precompilation with the intlify bundler plugin and use the runtime-only build, especially if a CSP forbids `unsafe-eval`.
5. Pluralisation: add `pluralRules` for every locale in {{locales}} whose CLDR plural categories differ from English, built on `Intl.PluralRules`, and write pipe-separated messages in that locale's category order. Use `datetimeFormats` and `numberFormats` (or `Intl`) for dates, numbers and currency.
6. Usage: `useI18n()` in `<script setup>`, `$t` in templates, `i18n-t` with named slots for messages containing links or emphasis, and literal interpolation for `@`, `{`, `}`, `|` and `$` in message text.
7. Routing and SEO: in Nuxt use `useLocalePath`, `NuxtLinkLocale` or `switchLocalePath` for links and the language switcher, and `useLocaleHead` to set `html lang`, `dir`, hreflang alternates and canonical links. Configure `detectBrowserLanguage` to redirect on the root only and remember the choice in a cookie, so deep links are never redirected. In plain Vue, add a `:locale` route param with a guard that loads messages before navigation and sets `html lang`.
8. Convert a small representative set of components (one plural, one with a link inside a sentence) to prove the setup; list the remaining hard-coded strings for later.
9. Run build, type check and tests again; load one page per locale, including a locale with non-English plural rules and, if present, a right-to-left locale, and report what rendered.
</task>

<constraints>
- No `v-html` with translated content.
- Do not rely on pipe plurals for locales with more than two plural categories without `pluralRules`.
- Do not create a module-scoped i18n instance in a server-rendered app outside Nuxt.
- Do not invent translations; other locales start as untranslated copies or fall back.
- Check the installed versions' documentation for exact option names; they changed between Nuxt i18n major versions.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Build, type check and tests before changes.

## Setup
Library and versions, configuration with reasons.

## Messages and loading
File layout, lazy loading and precompilation.

## Pluralisation and formatting
`pluralRules` per locale and formatter configuration.

## Routing and SEO
Locale routes, links, switcher, detection and head tags.

## Verification
Commands and pages checked with real results.

## Follow-ups
Remaining strings and decisions for the team.
</output_format>
