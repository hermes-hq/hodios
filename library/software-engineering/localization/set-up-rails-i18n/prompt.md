---
schema: 1
id: set-up-rails-i18n
kind: prompt
title: Set up Rails I18n
description: Sets up Rails I18n with organised locale YAML, lazy lookups, per-request locale from URL or header, CLDR plural rules, model and error translations, and i18n-tasks checks.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [rails]
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
depth: specific
tags: [rails-i18n, i18n-tasks, locale-yaml, lazy-lookup, with-locale]
pairs_with:
  prompts: [extract-ui-strings, localize-server-sent-messages, validate-translation-files-in-ci]
args:
  - name: project
    description: Rails version, views (ERB, ViewComponent, Hotwire) or API-only, background job system, and any i18n already present.
    type: text
    required: true
  - name: locales
    description: Locales to support, default first, for example "en, de, pl".
    type: string
    required: true
  - name: locale_source
    description: Where the request locale comes from.
    type: enum
    enum: [url-param, subdomain, user-setting, accept-language]
    default: url-param
output_contract:
  format: markdown
  sections: [Baseline, Configuration, Locale per request, Locale files and lookups, Pluralisation and formats, Checks, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rails I18n works out of the box for English and misleads teams from there. Out of the box it knows only `one` and `other` plural keys, so Polish, Russian or Arabic need CLDR plural rules and date and number formats, normally from the rails-i18n gem. Setting `I18n.locale =` in a `before_action` leaves the value on the thread after the request, where the next request served by that Puma thread or a job can inherit it; `around_action` with `I18n.with_locale` scopes it. Missing translations render as a "translation missing" span in development and fall back silently in production depending on `config.i18n.fallbacks`, so gaps ship unnoticed unless `raise_on_missing_translations` is on in development and test. Lazy lookups (`t(".title")` in `users/show` resolves to `users.show.title`) keep keys organised but only work in views and, in recent versions, controllers. Keys ending in `_html` are treated as safe HTML while interpolated values are still escaped; `raw` or `html_safe` on translations is an XSS hole. Mailers and jobs run outside the request and must set the recipient's locale explicitly. Model names, attribute names and validation errors come from `activerecord.models`, `activerecord.attributes` and `errors` keys. i18n-tasks finds missing, unused and inconsistent keys.
</context>

<task>
Set up I18n in this Rails project:

{{project}}

Locales: {{locales}}. Locale source: {{locale_source}}.

1. Run the test suite and record the baseline. Stop and report if it fails.
2. Read `config/application.rb`, environment configs, `config/locales`, `ApplicationController`, routes, mailers and jobs.
3. Configuration: `available_locales`, `default_locale`, `load_path` including nested folders, `fallbacks` set deliberately, and `raise_on_missing_translations` in development and test. Add the rails-i18n gem if any locale in {{locales}} needs plural rules or formats beyond English.
4. Locale per request: an `around_action` that resolves the locale from {{locale_source}}, validates it against `available_locales` and runs the action inside `I18n.with_locale`. For a URL param, add an optional `(:locale)` scope with a constraint in routes and `default_url_options` so links keep it; keep API and webhook routes outside if they should not be localized.
5. Locale files: split by area (`config/locales/<area>/<locale>.yml`), use lazy lookups in views, `_html` keys for messages with markup, named interpolation, and `activerecord` keys for models, attributes and errors.
6. Plurals and formats: `count:` with every plural key each locale needs, and `l` for dates and times with named formats.
7. Mailers and jobs: wrap delivery in `I18n.with_locale(recipient.locale)`, and store the locale on the recipient rather than passing the requester's locale.
8. Checks: add i18n-tasks with a config, run `missing` and `unused`, and add its spec (or a CI step) so missing keys fail the build.
9. Convert a representative slice (one view with a plural and a date, one model's validation errors, one mailer) and list the rest.
10. Run tests and i18n-tasks again and render the slice in two locales; report results.
</task>

<constraints>
- No `I18n.locale =` in request code; use `with_locale`.
- No `raw` or `html_safe` on translated text.
- Do not invent translations; non-default locale files carry the keys with source text marked for translation, or rely on fallback.
- Do not remove keys that i18n-tasks reports as unused without checking for dynamic keys first.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Tests before changes.

## Configuration
Application and environment config changes, gems added.

## Locale per request
The `around_action`, routes and URL options.

## Locale files and lookups
Folder layout and examples of lazy, `_html` and model keys.

## Pluralisation and formats
Plural keys per locale and date formats.

## Checks
i18n-tasks config and CI step.

## Verification
Commands and rendered output with real results.

## Follow-ups
Remaining strings and decisions.
</output_format>
