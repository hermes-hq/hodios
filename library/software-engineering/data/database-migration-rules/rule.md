---
schema: 1
id: database-migration-rules
kind: rule
title: Database migration rules
description: Standing rules for schema migrations an assistant writes, keeping them backward compatible, reversible, lock-aware, batched for data changes and tested on realistic data sizes.
category: data
version: 1.0.1
status: incubating
stage: [build, review]
role: [backend-engineer, dba, software-engineer]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: small
level: intermediate
tags: [schema-migrations, expand-contract, zero-downtime, locking]
applies_to: ["**/migrations/**", "**/migrate/**", "**/alembic/**", "**/flyway/**", "**/liquibase/**", "**/*.sql"]
pairs_with:
  prompts: [plan-zero-downtime-schema-change, review-database-migration]
  personas: [database-administrator]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "NOT NULL on large PostgreSQL tables finishes with SET NOT NULL and drops the helper check, and volatile column defaults are called out as table rewrites."}
---
When you write or change a database migration in this project, follow these rules. If the user's request cannot be done safely in one migration, say so and propose the sequence instead.

Compatibility with running code
- Assume the previous version of the application is still running while and after the migration runs. Every migration must work with both the old and the new code.
- Use expand and contract for breaking changes: add the new column or table, deploy code that writes both and reads the new one, backfill, then remove the old one in a later migration. Never rename or drop a column or table that deployed code still reads in the same release.
- Add new columns as nullable or with a constant default. On PostgreSQL 11 and later a constant default is a metadata change; a volatile default such as `gen_random_uuid()` or `clock_timestamp()` rewrites the whole table, so add the column without it and backfill.
- Add NOT NULL only after the backfill. On large PostgreSQL tables, add a `CHECK (col IS NOT NULL) NOT VALID` constraint, run `VALIDATE CONSTRAINT` separately, then `SET NOT NULL` (PostgreSQL 12 and later use the validated constraint and skip the full-table scan) and drop the check constraint.
- State the required deploy order (migrate first, or code first) in the migration's comment or the summary.

Locks and duration
- Know which statements take heavy locks on the engine in use. On PostgreSQL, create and drop indexes with `CONCURRENTLY` (outside a transaction), add foreign keys and check constraints as `NOT VALID` and validate them separately, and set a `lock_timeout` so a blocked migration fails fast instead of queuing every query behind it. On MySQL, use online DDL (`ALGORITHM=INPLACE` or `INSTANT`, `LOCK=NONE`) or an online schema change tool for large tables.
- Do not change a column's type in place on a large table when it rewrites the table; add a new column and migrate instead.
- When a table is large or its size is unknown, say how long the migration is expected to take and what it locks, and recommend running it against a production-sized copy first.

Data changes
- Keep schema changes and data backfills in separate migrations. Backfill in batches by primary key range, each batch in its own transaction, idempotent so it can be rerun after a failure.
- Do not import application models into migrations; use the framework's historical models or plain SQL, so the migration still runs after the model changes.

Reversibility and history
- Write a working down migration, or state explicitly that the migration is irreversible and why (for example, dropped data). Never pretend a destructive change can be rolled back.
- Never edit a migration that has already been applied in any shared environment; write a new one.
- One concern per migration, named after what it does, with timestamps or sequence numbers in the framework's convention.

Safety
- Never drop a table or column, or delete or update rows in bulk, without saying so prominently in your summary.
- Do not put secrets, real personal data or environment-specific values in migrations or seed data.
