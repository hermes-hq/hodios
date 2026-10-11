---
schema: 1
id: set-up-symfony-translations
kind: prompt
title: Set up Symfony translations
description: Sets up Symfony Translation with ICU XLIFF or YAML catalogs, domains, a locale from the route plus a sticky session listener, translation extraction and debug checks, and Twig and form usage.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [symfony]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, code, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [symfony-translation, intl-icu, translation-domains, twig, locale-listener]
pairs_with:
  prompts: [extract-ui-strings, write-icu-plural-messages, localize-server-sent-messages]
args:
  - name: project
    description: Symfony version, Twig or API-only, forms and validation use, Messenger or other async processing, and any translations already present.
    type: text
    required: true
  - name: locales
    description: Locales to support, default first, for example "en, fr, pl".
    type: string
    required: true
  - name: catalog_format
    description: File format for catalogs. XLIFF carries notes and states for translators; YAML is easier to hand-edit.
    type: enum
    enum: [xliff, yaml]
    default: xliff
output_contract:
  format: markdown
  sections: [Baseline, Configuration, Catalogs and domains, Locale per request, Usage in code, Twig and forms, Extraction and checks, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Symfony's Translation component decides the message syntax from the file name: only catalogs named with the `+intl-icu` suffix (`messages+intl-icu.fr.xlf`) are read as ICU MessageFormat; others use the legacy `%placeholder%` syntax and the older pipe-based plural form, so a correct ICU plural in a plain-named file renders as raw text. Messages are grouped in domains: `messages` by default, `validators` for constraint messages and `security` for authentication errors, and a validation message placed in `messages` is never used. The request locale comes from the `_locale` route attribute; Symfony does not remember it between requests, so a sticky locale needs a request listener that runs before the built-in locale listener and reads the session. `enabled_locales` limits which locales are built and accepted. `translation:extract` scans Twig, PHP and form labels and writes catalogs; `debug:translation` lists missing, unused and fallback messages. Adding a new catalog file can require a cache clear before it is picked up. Code that builds a message for later rendering (flash messages, form errors, emails sent from Messenger handlers) should pass a `TranslatableMessage` or use the locale switcher so it renders in the recipient's locale, not the worker's default.
</context>

<task>
Set up translations in this Symfony project:

{{project}}

Locales: {{locales}}. Catalog format: {{catalog_format}}.

1. Run the tests and `lint:container`, and record the baseline. Stop and report if they fail.
2. Read `config/packages/translation.yaml`, `framework.yaml`, routes, existing `translations/` files, Twig base layout, forms and Messenger handlers that send user-facing text.
3. Configuration: `default_locale`, `enabled_locales` from {{locales}}, `translator.default_path` and fallbacks. Install the intl extension requirement if ICU messages are used.
4. Catalogs and domains: ICU catalogs named `<domain>+intl-icu.<locale>.<ext>` in {{catalog_format}}, with `messages`, `validators` and `security` domains as needed. Use keys (`order.confirm.title`) or source sentences consistently and state which. Write plurals and selects in ICU syntax with each locale's CLDR categories and named arguments.
5. Locale per request: prefix localized routes with `{_locale}` and a requirement listing the enabled locales, keep API and webhook routes unprefixed if they should be, and add a request subscriber that stores an explicit choice in the session and applies it when no `_locale` is present, registered with a priority above the built-in locale listener. Redirect the bare root by `Accept-Language` through `Request::getPreferredLanguage` with the enabled locales.
6. Usage in code: inject `TranslatorInterface` for immediate translation, use `TranslatableMessage` or the `t()` function for messages rendered later, and use the locale switcher (or pass the locale explicitly) in Messenger handlers and console commands that send user-facing text.
7. Twig and forms: the `trans` filter with named parameters and domains, `html lang` from `app.request.locale`, form labels and help translated via the form's translation domain, and constraint messages in the `validators` domain.
8. Extraction and checks: run `translation:extract --force` for the default locale with the chosen format and `--dump-messages` for review, and add `debug:translation` per locale (or `lint:xliff` and `lint:yaml translations`) to CI so missing or broken messages fail.
9. Convert a representative slice (one page with a plural, one form with a constraint, one async email) and list the rest.
10. Run tests, the extraction and the debug check again; render the slice in two locales and report results.
</task>

<constraints>
- ICU syntax only in `+intl-icu` catalogs; never mix syntaxes in one file.
- Do not put validation messages outside the `validators` domain.
- Do not invent translations; target catalogs carry source text marked as needing translation, or rely on fallback.
- Check exact command and option names against the installed Symfony version.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Tests and container lint before changes.

## Configuration
Translation and framework config changes.

## Catalogs and domains
File naming, domains, key convention and plural examples.

## Locale per request
Routes, the session subscriber and root redirect.

## Usage in code
Translator, `TranslatableMessage` and locale switcher examples.

## Twig and forms
Template, label and constraint examples.

## Extraction and checks
Commands and CI steps.

## Verification
Commands and results.

## Follow-ups
Remaining strings and decisions.
</output_format>
