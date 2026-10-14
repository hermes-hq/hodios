---
schema: 1
id: design-multilingual-content-schema
kind: prompt
title: Design a database schema for translated content
description: Designs how user- or admin-authored content such as product names, articles and categories is stored in several languages, with fallbacks, slugs, search, workflow status and migrations.
category: localization
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, fullstack-engineer, architect, dba]
requires: [none]
inputs: [schema, spec, text]
output: [plan, code, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [data-modeling, translatable-content, content-fallback]
pairs_with:
  prompts: [implement-locale-aware-sorting-and-search, design-locale-detection-and-routing]
args:
  - name: content
    description: The entities whose fields need translations, with the current schema if one exists, read and write volumes, and who writes the translations.
    type: text
    required: true
  - name: database
    description: Database and ORM, for example "Postgres with Prisma" or "MySQL with Django ORM".
    type: string
    required: true
  - name: locales
    description: Current locales and how many more are expected.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Options compared, Recommended schema, Fallback and queries, Search and slugs, Workflow fields, Migration]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
UI strings live in catalogs; content that admins or users write (product titles, CMS pages, category names, FAQ answers) lives in the database and needs its own design. The usual shapes are: a column per language (`title_en`, `title_de`), which needs a migration for every new locale; a translation table per entity (`product_translations(product_id, locale, title, ...)`), which is relational and indexable; a JSON or hstore column keyed by locale, which is flexible but harder to constrain, index and search; and a generic key-value translation table for every entity, which turns every read into a pile of joins. The hidden requirements decide between them: falling back from `pt-BR` to `pt` to the default per field, sorting and full-text search with the right language analyser, unique slugs per locale, knowing which translations are stale after the source changes, and not translating fields that must stay the same in every language (SKU, price).
</context>

<task>
Design storage for translated content.

Content:
{{content}}

Database: {{database}}. Locales: {{locales}}.

1. Classify each field: translatable text, locale-specific but not a translation (a slug, an SEO title, a legal notice per market), or shared across locales (SKU, price, dates, ids). Prices and availability by market are a separate concern; flag them rather than storing them per language.
2. Compare the storage options above for this case on: adding a locale, query complexity, indexing and constraints, full-text search, ORM support, and write workflow. Use the stated volumes.
3. Recommend one and write the schema DDL or ORM models, with keys, constraints (one row per entity and locale; required source-locale row), and indexes.
4. Fallback: define the chain and whether it applies per field or per record, then write the read query (or ORM scope) that returns each field from the best available locale in one round trip, and say which locale each value came from so the UI can mark it.
5. Search and sorting: per-locale full-text configuration or analyser, collation for ordering, and how search falls back when a translation is missing.
6. Slugs and URLs: unique per locale, redirects when a slug changes, and what a URL does when the content has no translation in that locale.
7. Workflow: fields such as `status` (draft, needs translation, needs review, published), `source_version` or a source hash so a changed source marks translations stale, and who edited each translation.
8. Migration from the current schema, if any, with backfill steps that keep the app running.
</task>

<constraints>
- Do not choose an option before comparing it against the stated volumes and locales.
- Keep the source-locale content required and treat missing translations as normal, not as errors.
- Write DDL or models for the stated database only; mark any feature you are unsure the version supports.
{{> output/uncertainty}}
</constraints>

<output_format>
## Options compared
| Option | Adding a locale | Queries | Search | Constraints | Fit here |

## Recommended schema
DDL or model code.

## Fallback and queries
The chain and the read query.

## Search and slugs
Configuration and rules.

## Workflow fields
Fields and state transitions.

## Migration
Ordered steps.
</output_format>
