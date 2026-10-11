---
schema: 1
id: write-upsert-query
kind: prompt
title: Write an upsert query
description: Writes a correct insert-or-update for Postgres, MySQL, SQLite or SQL Server with the unique key it relies on, the engine's exact syntax and how it behaves under concurrent writes.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, data-engineer, fullstack-engineer]
stack: [sql]
requires: [none]
inputs: [schema, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [upsert, on-conflict, merge-statement, unique-constraints, race-conditions, idempotent-writes]
pairs_with:
  prompts: [design-database-schema, implement-idempotency-keys, fix-double-submit-duplicates]
args:
  - name: goal
    description: What the write should do, for example "insert the product, or update price and stock if the SKU already exists, but never overwrite created_at".
    type: text
    required: true
  - name: database
    description: The engine and version (PostgreSQL 16, MySQL 8.0, SQLite 3.45, SQL Server 2022 and so on).
    type: string
    required: true
  - name: table_ddl
    description: The table definition including primary key, unique constraints and indexes.
    type: text
    required: true
  - name: batch
    description: Optional. Whether this runs one row at a time or for a batch of rows, and roughly how many.
    type: string
output_contract:
  format: markdown
  sections: [Conflict key, Query, Behaviour under concurrency, Edge cases, Test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A developer needs an insert-or-update on {{database}}. Upserts look simple and go wrong in predictable ways. They only work against a unique constraint or unique index that actually exists; without one, `ON CONFLICT` errors and a "select then insert" pattern creates duplicates under concurrency. The syntax and semantics differ by engine: Postgres and SQLite use `INSERT ... ON CONFLICT (cols) DO UPDATE SET col = EXCLUDED.col`; MySQL uses `INSERT ... ON DUPLICATE KEY UPDATE`, which fires on any unique key on the table (not just the one you meant), and newer versions prefer a row alias over the deprecated `VALUES()` function; SQL Server's `MERGE` is not race-safe by default and needs `HOLDLOCK` (serializable) or an update-then-insert pattern with the right locks. Other traps: updating columns that should never change (created_at, owner), auto-increment gaps in MySQL, a Postgres batch that touches the same key twice failing with "cannot affect row a second time", nullable columns in the unique key (NULLs are distinct unless the engine supports NULLS NOT DISTINCT), and needing to know whether a row was inserted or updated.
</context>

<task>
Goal: {{goal}}

<table_ddl>
{{table_ddl}}
</table_ddl>
{{#batch}}Volume: {{batch}}{{/batch}}

1. Name the conflict target: the unique constraint or index the upsert relies on. If the DDL has none that matches the goal, say so and give the DDL to add it (and how to clean existing duplicates first, read-only query only).
2. Write the upsert in the exact syntax for {{database}}: which columns are inserted, which are updated on conflict, which are left untouched, and any condition on the update (for example only when the incoming version or timestamp is newer, so old messages do not overwrite new data).
3. Return what the caller needs: the row id, and inserted-versus-updated if useful (for example `RETURNING` with `xmax = 0` in Postgres, affected-rows counts in MySQL, `OUTPUT $action` in SQL Server), with the caveats of each.
4. For batches, give the multi-row form, deduplicate keys within the batch first, sort rows by the conflict key so concurrent batches lock in the same order (fewer deadlocks), and give a sensible batch size.
5. Explain concurrency: what happens when two sessions upsert the same key at once on this engine, whether it can deadlock or raise a unique violation, and what to retry if so.
6. Give a short test: insert new, upsert existing, upsert with an older version (if conditional), and two concurrent sessions on the same key.
</task>

<constraints>
- Use only syntax that exists in the stated engine and version; if a feature depends on the version (row aliases in MySQL 8.0.19+, NULLS NOT DISTINCT in Postgres 15+, MERGE in Postgres 15+), say so.
- Never suggest select-then-insert in application code as the upsert.
- Do not update primary keys, creation timestamps or ownership columns on conflict unless the goal asks for it.
- Parameterise values; no string-built SQL.
{{> output/uncertainty}}
</constraints>

<output_format>
## Conflict key
The constraint used, or the DDL to add it.

## Query
SQL in one code block, with a line on each non-obvious clause.

## Behaviour under concurrency
Three to six lines.

## Edge cases
Bullets: NULLs in the key, duplicate keys in a batch, conditional updates, side effects (auto-increment gaps, triggers).

## Test
SQL or steps for the four checks.
</output_format>
