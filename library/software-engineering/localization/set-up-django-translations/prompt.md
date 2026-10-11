---
schema: 1
id: set-up-django-translations
kind: prompt
title: Set up Django translations
description: Sets up Django translations with gettext, makemessages and compilemessages, LocaleMiddleware, i18n URL patterns, lazy strings, JavaScript catalogs and a choice for translated model fields.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [django]
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
tags: [gettext, makemessages, locale-middleware, gettext-lazy, po-files]
pairs_with:
  prompts: [design-multilingual-content-schema, extract-ui-strings, localize-server-sent-messages]
args:
  - name: project
    description: Django version, apps, templates or API-only, front end, how it is deployed, and any i18n already present.
    type: text
    required: true
  - name: locales
    description: Languages to support, default first, for example "en, de, pt-br".
    type: string
    required: true
  - name: url_prefixes
    description: Whether page URLs carry a language prefix.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Baseline, Settings and middleware, Marking strings, Message files, URLs and language switching, JavaScript and model content, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Django ships full gettext-based i18n, and the mistakes are well known. `gettext` at import time (model `verbose_name`, form labels, `choices`, module constants) evaluates once in the default language; those need `gettext_lazy`. f-strings and `.format()` around `_()` either break extraction or produce untranslatable text; Django strings use named `%(name)s` placeholders so translators can reorder them. Plurals need `ngettext` or `blocktranslate count`, and words with several meanings need `pgettext` context. `LocaleMiddleware` must sit after `SessionMiddleware` and before `CommonMiddleware`, or language detection and redirects misbehave. `makemessages` needs GNU gettext installed, ignores `node_modules` and virtualenvs only when told, and marks changed strings `fuzzy`; fuzzy entries are not compiled, so they show in the source language until reviewed. `.mo` files must exist at runtime, so the deploy must either commit them or run `compilemessages`. Translated content in database fields is a separate problem from UI strings, usually solved with a package such as django-modeltranslation or django-parler, or a schema design.
</context>

<task>
Set up translations in this Django project:

{{project}}

Languages: {{locales}}. URL language prefixes: {{url_prefixes}}.

1. Run the test suite and `check`, and record the baseline. Stop and report if they fail.
2. Read settings, middleware, root URLconf, base templates, forms, models and any existing `locale/` folders.
3. Settings: `USE_I18N = True`, `LANGUAGE_CODE`, `LANGUAGES` from {{locales}} with names marked by `gettext_lazy`, `LOCALE_PATHS`, and `LocaleMiddleware` placed after `SessionMiddleware` and before `CommonMiddleware`.
4. Mark a representative slice of strings (one app's models, one form, one view message, one template): `gettext_lazy` for anything evaluated at import, `gettext` in request code, `ngettext` and `blocktranslate count` for counts, `pgettext` where a word is ambiguous, named `%(name)s` placeholders, translator comments where meaning is unclear, and `translate` and `blocktranslate` tags with `load i18n` in templates.
5. Message files: run `makemessages` for each locale with ignore patterns for virtualenvs, `node_modules` and build output; commit the `.po` files; decide whether `.mo` files are committed or built during deploy and add that step. Note that fuzzy entries are not used until reviewed.
6. URLs and switching: if {{url_prefixes}} is true, wrap page URL patterns in `i18n_patterns` (with `prefix_default_language` chosen deliberately), keep APIs, webhooks and health checks outside it, add the `set_language` view and a switcher form, and set `html lang` and `dir` from `get_current_language` and `get_language_info`.
7. JavaScript and model content: if templates or a front end need translated strings in JS, add `JavaScriptCatalog` and run `makemessages -d djangojs`. For translated database fields, recommend an approach and stop; do not migrate models in this change.
8. Run `makemessages`, `compilemessages`, the tests and `check`; render one page in two languages (with a test client using `Accept-Language` or the prefix) and report results.
</task>

<constraints>
- No `gettext` (non-lazy) in code evaluated at import time.
- No f-strings or string concatenation around translatable text.
- Do not invent translations; leave `msgstr` empty for review.
- Do not run model migrations or change database content.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Tests and checks before changes.

## Settings and middleware
The settings diff with middleware order.

## Marking strings
Examples per case: lazy, plural, context, placeholders, templates.

## Message files
Commands, ignore patterns and the `.mo` deploy decision.

## URLs and language switching
URLconf, switcher and html attributes.

## JavaScript and model content
JS catalog setup and the recommendation for translated fields.

## Verification
Commands and rendered pages with real results.

## Follow-ups
Remaining strings and decisions.
</output_format>
