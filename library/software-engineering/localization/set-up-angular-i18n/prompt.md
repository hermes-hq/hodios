---
schema: 1
id: set-up-angular-i18n
kind: prompt
title: Set up Angular localisation
description: Sets up Angular's built-in i18n with stable message IDs, extract-i18n, XLIFF translation files and per-locale builds, or a runtime library when language switching without reload is required.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer]
stack: [angular]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, config, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [angular-localize, xliff, extract-i18n, per-locale-builds, message-ids]
pairs_with:
  prompts: [extract-ui-strings, write-icu-plural-messages, choose-i18n-library]
args:
  - name: project
    description: Angular version, standalone or NgModule, SSR or not, how the app is hosted, and any i18n already present.
    type: text
    required: true
  - name: locales
    description: Source locale first, then target locales, for example "en-US, de, ja".
    type: string
    required: true
  - name: runtime_switching
    description: Whether users must switch language without a page reload. Angular's built-in i18n compiles one bundle per locale and does not switch at runtime.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Baseline, Approach, Marking messages, Extraction and translation files, Build and serving, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Angular's built-in i18n (`@angular/localize`) works at build time: templates are marked with the `i18n` attribute and code with the `$localize` tagged template, `ng extract-i18n` writes a source file (XLIFF 1.2 by default, or XLIFF 2, XMB, JSON or ARB), and the build inlines each translation into its own bundle. That is fast at runtime but has consequences teams miss. Without a custom ID (`@@checkout.title`), a message's ID is a hash of its text and meaning, so fixing a typo in English orphans every translation. Meaning and description (`i18n="meaning|description@@id"`) are the only context translators get. Plurals and selects must be ICU expressions in the template, not `*ngIf` on the count. `localize: true` produces one output folder per locale, each needing the right `baseHref`, a server or CDN rule that serves `/de/` from the German build, and a fallback for deep links. `ng serve` serves one locale at a time through a build configuration. The `missingTranslation` build option defaults to a warning, so untranslated text ships silently. Language cannot change without loading another bundle; when that is a hard requirement, a runtime library (Transloco or ngx-translate) is the realistic alternative, with different trade-offs.
</context>

<task>
Set up localisation in this Angular project:

{{project}}

Locales: {{locales}}. Runtime switching required: {{runtime_switching}}.

1. Run the build and tests and record the baseline. Stop and report if they fail.
2. Read `angular.json`, the bootstrap code, routing, SSR setup if any, and any existing i18n. Choose the approach: built-in i18n when runtime switching is false; if it is true, explain the trade-off and propose a runtime library, and proceed with built-in only if the team accepts a reload on switch. Record the choice under Approach.
3. For built-in i18n: add `@angular/localize` with `ng add`, then set `i18n.sourceLocale` and `i18n.locales` (each with its translation file and `baseHref` if needed) in `angular.json`, and `localize` in the production build configuration. Add a development configuration per locale for `ng serve`.
4. Mark messages in a small representative slice (one page, one component with a plural, one service message): `i18n` attributes with meaning, description and a custom `@@id` following a naming scheme; `i18n-<attribute>` for `placeholder`, `title` and `aria-label`; ICU `plural` and `select` inside templates; `$localize` with `:meaning|description@@id:` in TypeScript.
5. Run `ng extract-i18n` with the chosen format and output path. Create one target file per locale from the source with targets marked as needing translation; do not write translations.
6. Set `i18nMissingTranslation` to `error` in CI builds so missing targets fail, or document why it stays a warning.
7. Dates, numbers and currency: use Angular's pipes, which take their locale data from the build; make sure `LOCALE_ID` is not hard-coded anywhere.
8. Serving: write the server or CDN rules for per-locale folders (root redirect by `Accept-Language` or a stored choice, deep links within each folder falling back to that locale's `index.html`), and for SSR describe how the server picks the right locale bundle.
9. Add a language switcher that navigates to the same path in the other locale's folder.
10. Run the localized build and tests, check that each locale folder renders, and report which messages still lack custom IDs.
</task>

<constraints>
- Every new message gets a custom `@@id`; do not rely on generated IDs.
- Do not translate content; target files contain the source text marked for translation.
- Do not promise runtime switching with built-in i18n.
- Do not change hosting or CDN configuration directly; deliver the rules for the team to apply.
- Check exact option names against the installed Angular version.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Build and tests before changes.

## Approach
Built-in or runtime library, and why.

## Marking messages
Examples for templates, attributes, ICU plurals and `$localize`, and the ID naming scheme.

## Extraction and translation files
Commands, format, file layout and missing-translation setting.

## Build and serving
`angular.json` changes, per-locale output, server or CDN rules, SSR and the switcher.

## Verification
Commands run and real results per locale.

## Follow-ups
Unmarked strings, messages without IDs, decisions needed.
</output_format>
