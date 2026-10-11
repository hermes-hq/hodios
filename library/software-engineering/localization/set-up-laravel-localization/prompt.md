---
schema: 1
id: set-up-laravel-localization
kind: prompt
title: Set up Laravel localisation
description: Sets up Laravel localisation with lang files or JSON strings, pluralisation, per-request locale middleware, translated validation messages, and correct locales for queued mail and notifications.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [laravel]
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
tags: [lang-files, trans-choice, locale-middleware, validation-messages, has-locale-preference]
pairs_with:
  prompts: [extract-ui-strings, localize-server-sent-messages, validate-translation-files-in-ci]
args:
  - name: project
    description: Laravel version, Blade, Livewire or an Inertia front end, whether it runs on Octane, queues used, and any localisation already present.
    type: text
    required: true
  - name: locales
    description: Locales to support, default first, for example "en, de, uk".
    type: string
    required: true
  - name: locale_source
    description: Where the request locale comes from.
    type: enum
    enum: [url-prefix, session, user-setting, accept-language]
    default: url-prefix
output_contract:
  format: markdown
  sections: [Baseline, Configuration, Translation files, Locale per request, Validation and framework strings, "Mail, notifications and queues", Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recent Laravel versions no longer ship a `lang` directory; it appears only after `lang:publish`, so teams create files in the wrong place. Translations live either in PHP array files per group (`lang/de/orders.php`, used with keys such as `orders.title`) or in JSON files keyed by the source sentence (`lang/de.json`); mixing both without a rule produces duplicates. Placeholders are `:name`, with `:Name` and `:NAME` changing case, which surprises translators. `trans_choice` supports simple `apple|apples` and explicit ranges, and selects the form with per-language rules, but the forms in the file must match that language's plural rules. Framework strings (validation, auth, passwords, pagination) need their own translated files, and attribute names in validation messages need the `attributes` array or the user sees "The email field" in English. `App::setLocale` set in middleware affects only that request, but on Octane the application instance lives across requests, so the locale must be set on every request and never assumed. Queued mail and notifications render later, in the worker's default locale, unless the mailable is given `->locale()` or the notifiable implements `HasLocalePreference`. Blade's escaped echo is safe for translations; the unescaped form is not.
</context>

<task>
Set up localisation in this Laravel project:

{{project}}

Locales: {{locales}}. Locale source: {{locale_source}}.

1. Run the tests and record the baseline. Stop and report if they fail.
2. Read `config/app.php` (locale, fallback locale, faker locale), any `lang` directory, middleware registration, routes, mailables and notifications.
3. Configuration: publish the `lang` directory if missing, set `locale` and `fallback_locale`, and keep the supported list in one config value that middleware and the switcher read.
4. Translation files: choose one convention and state it (grouped PHP keys for application UI, JSON only for short shared phrases, or the reverse), with named `:placeholders` and translator comments where meaning is unclear. Use `trans_choice` with forms that match each locale's plural rules.
5. Locale per request: middleware that resolves the locale from {{locale_source}}, validates it against the supported list, calls `App::setLocale` on every request, and makes sure date formatting follows it (check Carbon's locale). For URL prefixes, add a route group with a locale parameter and a URL helper that keeps it.
6. Validation and framework strings: add translated validation, auth, passwords and pagination files for each locale (a maintained community package is an option; say which and why), and fill the `attributes` array so field names are translated.
7. Mail, notifications and queues: implement `HasLocalePreference` on the user model or set `->locale()` on mailables and notifications, so queued messages render in the recipient's language.
8. If the front end is Inertia or another JS app, decide how translations reach it (shared props for the current page's group, or a generated JSON per locale), and do not ship every locale to the browser.
9. Convert a representative slice (one page with a plural, one form request's validation errors, one queued notification) and list the rest.
10. Run tests again, including one test that sends a queued notification to a user with a non-default locale and asserts its language.
</task>

<constraints>
- Never output translations with Blade's unescaped echo.
- Do not invent translations; non-default files hold source text marked for translation, or rely on fallback.
- Do not assume the locale persists between requests, especially on Octane.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Tests before changes.

## Configuration
Config changes and the supported-locale list.

## Translation files
Convention, layout, placeholders and plural examples.

## Locale per request
Middleware, routes and date locale.

## Validation and framework strings
Files added and the attributes array.

## Mail, notifications and queues
Locale preference and the queued-message test.

## Verification
Commands and results.

## Follow-ups
Remaining strings and decisions.
</output_format>
