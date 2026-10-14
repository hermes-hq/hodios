---
schema: 1
id: set-up-docs-site-translation
kind: prompt
title: Set up translation for a docs site
description: Sets up a docs-as-code site in several languages, with locale folders, untranslated-page fallback, stale-page detection, localized search and URLs, and a sync with translators.
category: localization
version: 1.0.0
status: incubating
stage: [plan, build]
role: [technical-writer, frontend-engineer, developer-advocate]
requires: [repo-read]
inputs: [repo, config, text]
output: [plan, config, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [docs-as-code, static-site, stale-content]
pairs_with:
  prompts: [review-docs-for-localization, automate-translation-file-sync]
args:
  - name: site
    description: The docs generator and version (for example Docusaurus, MkDocs Material, Starlight, Sphinx, Hugo), repo layout, page count and how often docs change.
    type: text
    required: true
  - name: locales
    description: Languages to add and which sections each should cover first.
    type: string
    required: true
  - name: translators
    description: Who translates (community, vendor, staff, machine drafts with review) and with which tool, if known.
    type: text
output_contract:
  format: markdown
  sections: [Scope per locale, Site configuration, Translation flow, Stale and missing pages, URLs and search, Checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Translated docs rot faster than translated UI strings, because pages are long and change often. Without a plan the German site shows a version of the API from two releases ago with no warning, links point at English anchors that no longer exist, search only indexes English, and the team stops updating translations. Each generator has its own i18n model (Docusaurus `i18n/<locale>/` plus `write-translations`, MkDocs plugins with suffix or folder layouts, Sphinx gettext `.pot` and `sphinx-intl`, Hugo content directories per language, Starlight locale folders with automatic fallback), and the right setup works with it rather than around it. The key decisions are which pages get translated at all (getting started and concepts first; API reference rarely), what a reader sees when a page has no translation, and how a page is marked out of date.
</context>

<task>
Plan translation for this docs site:

{{site}}

Locales: {{locales}}.
{{#translators}}Translators: {{translators}}{{/translators}}

1. Scope: per locale, which sections to translate first and which stay English (API reference, changelogs, generated pages), based on traffic or user need when known.
2. Site configuration for the stated generator and version: locale list and default, folder or file layout, UI strings of the theme, `lang` and `dir` per locale, and the language switcher. Write the config changes.
3. Translation flow: for Sphinx or MkDocs-gettext style sites, extraction to POT and per-locale PO; for Markdown-file sites, the source file and its translated copy, with a sync to the translation tool or a pull-request workflow for community translators. Keep code blocks, front-matter keys, admonition syntax and shortcodes out of translation.
4. Missing pages: decide between falling back to the English page with a notice in the reader's language, or hiding the page from that locale's navigation, and configure it.
5. Stale pages: record the source commit or content hash each translation is based on, compute staleness in CI, and show an "outdated translation" banner with a link to the English page when the source has changed beyond typo fixes.
6. URLs and search: locale path prefixes, `hreflang` alternates, stable heading anchors (explicit ids so translated headings do not break links), localized search indexes or a search tool that supports the languages (CJK tokenization in particular), and redirects.
7. Checklist for launch per locale: build passes, links and anchors checked, search tested with local terms, banner tested, ownership named.
</task>

<constraints>
- Configure only features the stated generator supports; if a plugin is needed, name it as a candidate to verify, not as fact.
- Never machine-translate pages straight to publication; drafts need a reviewer.
- Do not translate code, CLI flags, config keys or API names.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope per locale
| Locale | Translate now | Keep in English |

## Site configuration
Config diffs.

## Translation flow
Steps from source change to published translation.

## Stale and missing pages
Rules, CI check and banner text.

## URLs and search
Decisions and config.

## Checklist
Per-locale launch checklist.
</output_format>
