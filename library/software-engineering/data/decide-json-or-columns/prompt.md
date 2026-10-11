---
schema: 1
id: decide-json-or-columns
kind: prompt
title: Decide between JSON and real columns
description: Decides which fields belong in a JSON or JSONB column and which need real columns, with validation, GIN or expression indexes, query examples and how to promote a JSON field to a column later.
category: data
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, fullstack-engineer, dba]
stack: [sql]
requires: [none]
inputs: [schema, text]
output: [code, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [jsonb, json-columns, semi-structured-data, gin-index, expression-index, schema-flexibility]
pairs_with:
  prompts: [design-database-schema, plan-zero-downtime-schema-change]
args:
  - name: data
    description: The fields or document being stored, a sample, how often its shape changes, and who defines it (your code, customers, a third-party API).
    type: text
    required: true
  - name: queries
    description: How the data is read, filtered, sorted, aggregated and updated, and the database engine and version.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Field-by-field decision, DDL, Indexes, Validation, Query examples, Promoting a field later]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
JSON columns are right for data whose shape you do not control or that varies per record: third-party webhook payloads, per-customer custom fields, settings blobs, sparse attributes. They are wrong for fields the app filters, joins, sorts or aggregates on all the time, fields with integrity rules (foreign keys, uniqueness, NOT NULL), and money or dates that need proper types. Planners have poor statistics for values inside JSON, so estimates go wrong. In Postgres, `jsonb` (not `json`) supports GIN indexes: `jsonb_path_ops` is smaller and fast for containment (`@>`), the default operator class supports key-existence too; a B-tree expression index on `(data->>'status')` serves equality and sorting on one key; generated columns can expose a key as a typed column. MySQL indexes JSON through generated columns or functional indexes and multi-valued indexes for arrays. In Postgres, updating one key rewrites the whole `jsonb` value, so large, frequently updated documents hurt. A CHECK constraint or JSON Schema validation in the app keeps the blob from becoming a junk drawer.
</context>

<task>
<data>
{{data}}
</data>
Queries and engine: {{queries}}

1. Go field by field (or group by group): column or JSON, with the reason tied to the stated queries, integrity needs and shape stability.
2. Write the DDL: typed columns, the JSON column with the right type (`jsonb` in Postgres), NOT NULL and defaults, and CHECK constraints for required keys or types where the engine supports them.
3. Indexes: GIN with the right operator class, expression or functional indexes for specific keys, generated columns, or multi-valued indexes, each matched to a query.
4. Validation: where the shape is enforced (database CHECK, app-side schema validation, both) and how versioning of the JSON shape works.
5. Query examples for the main reads, written so the indexes are used, and an example partial update.
6. Explain how to promote a JSON key to a real column later without downtime: add column, backfill in batches, dual-write, switch reads, drop the key.
</task>

<constraints>
- Do not put money, foreign keys or frequently filtered fields only in JSON without saying what is lost.
- Use only operators and index types that exist in the stated engine and version.
- Do not invent fields; work from the sample and say what is missing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Field-by-field decision
Table: field | column or JSON | type | reason.

## DDL
SQL.

## Indexes
SQL with the query each one serves.

## Validation
Bullets.

## Query examples
SQL.

## Promoting a field later
Numbered steps.
</output_format>
