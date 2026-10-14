---
schema: 1
id: set-up-python-babel-translations
kind: prompt
title: Set up Babel translations in a Python web app
description: Sets up Babel and gettext for a Flask or FastAPI app, with extraction config, PO and MO files, lazy strings, a per-request locale that is safe under async, Jinja usage and Babel formatting.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [flask, fastapi]
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
tags: [babel, flask-babel, pybabel, gettext, contextvars]
pairs_with:
  prompts: [set-up-django-translations, localize-server-sent-messages, design-localized-api-errors]
args:
  - name: project
    description: Framework (Flask, FastAPI or another), Python version, templates or API-only, how it is deployed, and any i18n already present.
    type: text
    required: true
  - name: locales
    description: Locales to support, default first, for example "en, de, pt_BR".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Extraction setup, Locale per request, Marking strings, Message files and deployment, Formatting, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Outside Django, Python apps use Babel's `pybabel` tool and the gettext model: a `babel.cfg` maps file patterns to extractors (Python, Jinja), `pybabel extract` writes a `.pot` template (it must be told about extra keywords such as `lazy_gettext` and `_l`, or those strings are missed), `pybabel init` and `update` maintain one `.po` per locale, and `pybabel compile` builds the `.mo` files the app reads at runtime; fuzzy entries are skipped unless forced. Strings evaluated at import time (WTForms labels, constants, enum labels) need lazy strings, or they freeze in the default language. Flask-Babel provides request-scoped locale selection; its API changed in version 3 from a decorator to a `locale_selector` argument, so old snippets fail. FastAPI has no i18n layer: the usual pattern loads `babel.support.Translations` per locale once at startup, picks the locale per request in middleware or a dependency, and keeps it in a `contextvars.ContextVar`; a module-level "current translations" variable is shared by concurrent async requests and leaks languages between users. f-strings around `_()` cannot be extracted or reordered; use named `%(name)s` placeholders or `.format` on the translated string. Babel's `format_date`, `format_decimal` and `format_currency` give CLDR formatting for the same locale.
</context>

<task>
Set up translations in this Python project:

{{project}}

Locales: {{locales}}.

1. Run the tests and record the baseline. Stop and report if they fail.
2. Read the app factory or main module, templates, forms, any existing `translations/` or `locales/` folder and dependency files.
3. Extraction setup: add Babel (and Flask-Babel for Flask), write `babel.cfg` for Python files and Jinja templates (with the Jinja i18n extension enabled), and record the exact `pybabel extract` command with keywords for every alias in use (`_`, `gettext`, `ngettext`, `lazy_gettext`, `_l`, `pgettext`) and translator comment tags.
4. Locale per request: for Flask, use Flask-Babel's `locale_selector` (version 3 style) choosing a stored user setting, then a URL or cookie choice, then `request.accept_languages.best_match` over {{locales}}. For FastAPI or another async framework, load `Translations` for each locale at startup with a fallback chain, resolve the locale in middleware or a dependency, store it in a `ContextVar`, and expose `_`, `ngettext` and lazy helpers that read it. Never keep the current locale in a module global.
5. Marking strings: lazy strings for anything evaluated at import, `ngettext` for counts, `pgettext` for ambiguous words, named placeholders, translator comments, and Jinja `trans` blocks with `pluralize` in templates.
6. Message files and deployment: run `init` for each locale and `update` thereafter, commit `.po` files, and either compile `.mo` files in the build or commit them; state which and add the step. Note that fuzzy entries are not used until reviewed.
7. Formatting: use Babel's date, number and currency formatters with the request locale and the user's time zone.
8. Convert a representative slice (one endpoint's error message, one count, one template or email) and list the rest.
9. Run extraction, compile and tests again, including a test that makes two concurrent requests in different locales and asserts each response's language.
</task>

<constraints>
- No module-level mutable locale or translations object chosen per request.
- No f-strings or concatenation around translatable text.
- Do not invent translations; `msgstr` stays empty for review.
- Check Flask-Babel and Babel versions before using their APIs.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Tests before changes.

## Extraction setup
`babel.cfg`, keywords and commands.

## Locale per request
Selector or middleware and context variable code.

## Marking strings
Examples: lazy, plural, context, placeholders, Jinja.

## Message files and deployment
Commands, committed files and the compile step.

## Formatting
Babel formatting calls.

## Verification
Commands and the concurrency test with real results.

## Follow-ups
Remaining strings and decisions.
</output_format>
