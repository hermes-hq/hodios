---
schema: 1
id: migrate-mongodb-to-postgres
kind: prompt
title: Migrate an application from MongoDB to Postgres
description: Moves a MongoDB application to Postgres, profiling real documents, remodelling into tables or JSONB, porting queries and aggregations, and cutting over with change capture and checks.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build]
role: [backend-engineer, dba, data-engineer]
stack: [mongodb, postgres]
requires: [repo-read, file-write, shell]
inputs: [repo, schema, dataset]
output: [plan, code, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [document-to-relational, jsonb, aggregation-pipeline, change-streams, data-remodelling]
pairs_with:
  prompts: [migrate-database-engine, design-mongodb-schema, switch-orm-or-query-layer]
  workflows: [data-backfill-track]
  personas: [migration-engineer]
args:
  - name: app
    description: Collections, data size, the ODM or driver in use, the main queries and aggregations, and how much downtime is acceptable.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Document profile, Relational model, Query port, Data move and sync, Cutover, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The real schema of a MongoDB database is in the data, not in the ODM models. Old documents have missing fields, fields that changed type over time (numbers stored as strings, dates as strings), and arrays that grew without bounds; a migration designed from the model code fails on these. Profile every collection first. Then decide per collection: embedded one-to-many arrays usually become child tables with foreign keys, references become foreign keys after checking for dangling ids, and truly variable attributes can stay in a JSONB column with indexes on the paths that are queried. ObjectIds referenced outside the database (URLs, other systems, mobile caches) should be kept as a text or unique column even if a new primary key is introduced. Aggregation pipelines map to SQL with joins, CTEs and window functions, but semantics differ: Mongo sorts mixed types in a defined order, comparisons are type-sensitive, string collation and case sensitivity differ, and `Decimal128` should map to `numeric`, not float. For low downtime, backfill then keep Postgres in sync from change streams, compare counts and checksums, and switch reads before writes or behind a flag.
</context>

<task>
App: {{app}}

1. Read the ODM models and every query and aggregation in the code. Write a profiling script that reports field presence, types per field, array sizes and dangling references per collection; ask the user to run it on a copy if you cannot access the data.
2. Design the relational model from the profile and the queries, with the reasons for each table and JSONB choice, constraints, and indexes for each query.
3. Port each query and pipeline to SQL or the new ORM, noting semantic differences, and write tests that run the same cases against both databases.
4. Write the backfill as an idempotent, resumable job with type cleaning rules and a reject log for documents that do not fit.
5. Plan sync and verification: change capture into Postgres, per-table counts, checksums on key fields, and comparison of query results on sampled inputs.
6. Plan the cutover: dual-read comparison, switch reads, switch writes, keep MongoDB as a fallback for an agreed period, and the rollback at each step.
</task>

<constraints>
- Do not silently drop or coerce documents that do not fit the model; log them and report counts.
- Do not run scripts against production data; write them for the user to run on a copy first.
- Do not design from the ODM model alone; the profile decides.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Document profile
Per collection: count, size, field variety, mixed types, embedded arrays, references.
## Relational model
Tables, keys, relations and JSONB columns, with the reason for each choice.
## Query port
Table: Mongo query or pipeline | SQL equivalent | semantic notes.
## Data move and sync
Backfill, change capture, verification counts and checksums.
## Cutover
Steps, read and write switch order, rollback.
## Remaining risks
Bullets, or "None".
</output_format>
