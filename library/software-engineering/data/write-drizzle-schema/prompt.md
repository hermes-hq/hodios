---
schema: 1
id: write-drizzle-schema
kind: prompt
title: Write a Drizzle ORM schema
description: Writes a Drizzle ORM schema with tables, relations, indexes and constraints for Postgres, MySQL or SQLite, generates and reviews migrations with drizzle-kit, and writes typed queries.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [typescript]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [drizzle, orm, schema-migrations, relations, indexes]
pairs_with:
  prompts: [design-database-schema, review-database-migration, write-prisma-schema, fix-n-plus-one-queries]
args:
  - name: data_model
    description: The tables and rules in plain words, or the change to an existing schema, including unique, optional and required fields and delete behaviour.
    type: text
    required: true
  - name: database
    description: Database dialect and driver and where it runs, for example "Postgres with node-postgres behind a pooler" or "SQLite (libSQL) at the edge".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Schema, Design notes, Migration workflow, Queries, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Drizzle is a thin, typed layer over SQL, so the schema is the database design and nothing fills gaps for you. Each dialect has its own table builder and column types (`pgTable`, `mysqlTable`, `sqliteTable`); mixing imports compiles but produces wrong SQL. Two kinds of relation exist and people confuse them: `.references()` on a column creates a real foreign key with `onDelete`, while `relations()` only tells the relational query API (`db.query...with`) how to join and creates nothing in the database. Foreign key columns are not indexed automatically on Postgres, so indexes go in the table's extra config. Money as `real` or `doublePrecision` loses cents; `numeric` returns strings by default (`mode: "number"` trades precision) and integer minor units avoid both. Timestamps need `withTimezone` on Postgres or values drift. `drizzle-kit push` applies the schema directly without migration files, which suits prototyping and local work, while `drizzle-kit generate` writes SQL migrations that should be reviewed (renames prompt interactively and can become drop and add) and applied with `drizzle-kit migrate` or the migrator at deploy. The `sql` template tag parameterises values, but `sql.raw` does not.
</context>

<task>
Data model or change: {{data_model}}
Database: {{database}}

1. Read the existing schema files, `drizzle.config`, migrations folder, and the queries that use the affected tables. Follow the project's naming (snake_case columns via `casing` or explicit names) and id strategy.
2. Write the tables with the right dialect builder: explicit types and lengths, `notNull`, defaults, `numeric` or integer minor units for money, timezone-aware timestamps, enums, unique constraints, and indexes on foreign keys and on columns used in filters and sorts.
3. Add `.references()` with explicit `onDelete` for real foreign keys, and `relations()` definitions for the relational query API where the code uses `db.query`.
4. Generate the migration with `drizzle-kit generate`, read the SQL, and fix renames, backfills and new non-null columns on existing tables before applying.
5. Write the typed queries the feature needs (select builder or relational queries), using `sql` with parameters for anything raw, and infer row types with `$inferSelect` and `$inferInsert`.
6. Describe the workflow: `push` only for local prototyping, generated migrations committed, applied in the deploy step with a direct (non-pooled) connection if a pooler is used.
7. Apply the migration to a local database, run the type check and tests, and report the results.
</task>

<constraints>
- Never use `drizzle-kit push` against a shared or production database, and do not run migrations against one yourself.
- Do not accept a migration that drops a column holding data without the user confirming.
- Never pass user input to `sql.raw`.
- Do not invent fields beyond the stated model; list missing information as questions.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Schema
The schema files in fenced blocks with their paths.
## Design notes
Bullets on types, indexes, foreign keys versus relations(), and delete behaviour.
## Migration workflow
Commands for local and deploy, and any edited migration SQL.
## Queries
The typed queries for the main reads and writes.
## Check
Commands run with real results.
## Open questions
Numbered, or "None".
</output_format>
