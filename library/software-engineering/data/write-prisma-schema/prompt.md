---
schema: 1
id: write-prisma-schema
kind: prompt
title: Write a Prisma schema
description: Writes or extends a Prisma schema with models, relations, indexes, enums and native types, then runs the right migrate workflow for development and for production deploys.
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
depth: specific
tags: [prisma, orm, schema-migrations, relations, indexes]
pairs_with:
  prompts: [design-database-schema, review-database-migration, fix-n-plus-one-queries]
args:
  - name: data_model
    description: The entities and rules in plain words, or the change to an existing schema, including which fields are unique, optional or required.
    type: text
    required: true
  - name: database
    description: Database provider and where it runs, for example "Postgres on a managed service with a connection pooler" or "MySQL 8".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Schema, Design notes, Migration workflow, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Prisma makes schemas quick to write and easy to get subtly wrong. Foreign key columns are not indexed automatically on every database, so relation fields often need an explicit `@@index` (and with `relationMode = "prisma"` there are no database foreign keys at all). The default `onDelete` behaviour differs by relation and may not be what the domain needs. `String` maps to a generic text type unless you add native types such as `@db.VarChar(255)`, money stored as `Float` loses cents (use `Decimal` or integer minor units), and `DateTime` is stored in UTC. Renaming a field in the schema generates a drop and add, losing data, unless the migration SQL is edited or `@map` keeps the old column name. `prisma db push` is for prototyping and skips migration history; teams that use it against shared databases end up with drift. The development workflow is `prisma migrate dev` (creates and applies migrations, may reset the dev database), and production uses `prisma migrate deploy` in the release pipeline, never `migrate dev` or `db push`. Behind a transaction-mode connection pooler, migrations need a direct connection URL.
</context>

<task>
Data model or change: {{data_model}}
Database: {{database}}

1. Read the existing `schema.prisma`, migrations folder, and code that queries the affected models. Follow the project's naming conventions (`@map` and `@@map` for snake_case tables, id strategy).
2. Write the models: ids, required and optional fields, native types where they matter, `Decimal` or integer minor units for money, enums, `@unique` and `@@unique`, `@@index` on foreign keys and on fields used in filters and sorts, and relations with explicit `onDelete` and `onUpdate` choices.
3. Explain each non-obvious choice in a short note: why that index, why that delete behaviour, what is enforced in the database and what only in the app.
4. For a change to an existing schema, create the migration with `prisma migrate dev --create-only`, read the SQL, and edit it for renames (or use `@map`), backfills and non-null columns on existing tables before applying.
5. Describe the workflow: `migrate dev` locally, migrations committed, `migrate deploy` in the release pipeline, a `directUrl` if a pooler is used, and `prisma generate` in the build.
6. Run `prisma format`, `prisma validate`, apply the migration to a local database, and run the type check and tests. Report results.
</task>

<constraints>
- Never use `db push` or `migrate reset` against a shared or production database, and do not run any migrate command against one yourself.
- Do not accept a generated migration that drops a column holding data without the user confirming.
- Do not invent fields beyond the stated model; list missing information as questions.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Schema
The schema in a fenced block with its path.
## Design notes
Bullets on indexes, relations, types and what the database enforces.
## Migration workflow
Commands for dev and production, and any edited migration SQL.
## Check
Commands run with real results.
## Open questions
Numbered, or "None".
</output_format>
