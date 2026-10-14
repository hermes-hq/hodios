---
schema: 1
id: write-alembic-migration
kind: prompt
title: Write an Alembic migration
description: Writes or fixes an Alembic migration by reviewing autogenerate output, turning drop-and-add into renames, setting server defaults, using batch mode on SQLite and merging branched heads.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer]
stack: [python]
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
tags: [alembic, sqlalchemy, schema-migrations, autogenerate, multiple-heads]
pairs_with:
  prompts: [review-database-migration, fix-failed-database-migration, write-sqlalchemy-models]
args:
  - name: change
    description: The model change or schema change needed, or the migration that is failing and its error.
    type: text
    required: true
  - name: database
    description: Target database engines (production and test, if different, for example Postgres in production and SQLite in tests).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What autogenerate gets wrong here, Migration, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
`alembic revision --autogenerate` compares models to the database and writes a draft, not a finished migration. It cannot detect renames (it emits drop plus add, which destroys data), misses changes it is not configured to compare (server defaults, some type changes, depending on `compare_type` and `compare_server_default`), does not see anonymous constraints or check constraints reliably, and on Postgres does not detect added or removed enum values or drop the enum type in `downgrade()`. Adding a non-null column to a table with rows needs a `server_default` or a backfill step. SQLite cannot alter most column properties, so changes there need `op.batch_alter_table`, which recreates the table. Constraint names that the database generated differ between environments, so a `naming_convention` on the metadata matters. When two branches both add a revision, Alembic reports multiple heads, which needs a merge revision, not edits to `down_revision` in an already applied file. Data changes inside a migration must use `op.execute` or a lightweight table, not the app's ORM models, which change over time.
</context>

<task>
Change: {{change}}
Database: {{database}}

1. Read `env.py`, the metadata `naming_convention`, the models involved and the latest revisions. Run `alembic heads` and `alembic current` against a local database to know the state.
2. Generate a draft with autogenerate if useful, then review every operation: turn drop-and-add pairs that are really renames into `op.alter_column(..., new_column_name=...)` or `op.rename_table`; add `server_default` or a backfill for new non-null columns; name constraints explicitly; handle enum types on Postgres; and remove noise operations the change did not intend.
3. Use `op.batch_alter_table` where SQLite needs it, and keep the migration valid on every listed engine.
4. Write `downgrade()` so it really reverses `upgrade()`, or state clearly why a step cannot be reversed.
5. If there are multiple heads, create a merge revision with `alembic merge` instead of editing applied revisions.
6. Run `upgrade head`, `downgrade -1` and `upgrade head` again on a local database, then run the tests, and report results. Show `alembic upgrade head --sql` output for any operation that will take strong locks on a big table.
</task>

<constraints>
- Never accept autogenerate output without reading each operation.
- Do not edit revisions that have been applied in shared environments.
- Do not import application models into the migration for data changes.
- Do not run migrations against shared or production databases.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What autogenerate gets wrong here
Each issue found in the draft and how it was fixed.
## Migration
Code block with file path.
## Check
Commands run with real results.
## Open questions
Numbered, or "None".
</output_format>
