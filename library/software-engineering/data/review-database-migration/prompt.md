---
schema: 1
id: review-database-migration
kind: prompt
title: Review a database migration
description: Reviews a schema migration for locking risk, table rewrites, unsafe defaults, missing indexes, irreversible steps and deploy-order problems, and returns a safer version. Use before merging.
category: data
version: 1.0.0
status: experimental
stage: [review]
role: [backend-engineer, dba, software-engineer, sre]
stack: [postgres, mysql]
requires: [none]
inputs: [diff, schema, file]
output: [report, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [schema-migrations, table-locks, ddl, expand-contract, rollback]
pairs_with:
  prompts: [plan-zero-downtime-schema-change, review-database-indexes]
  personas: [database-administrator]
args:
  - name: migration
    description: The migration as written - raw SQL or the framework migration file (Rails, Django, Alembic, Flyway, Prisma, Knex and so on), plus any application change shipped with it.
    type: text
    required: true
  - name: database
    description: Engine and major version, and managed service if any (for example PostgreSQL 16 on RDS, MySQL 8.0, Aurora MySQL 3).
    type: string
    required: true
  - name: table_sizes
    description: Row counts and sizes of the touched tables, write rates, and how deploys run (migrations before or after the new code, rolling or all at once).
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Statement analysis, Findings, Safer migration, Deploy order, Pre-flight checks, Rollback]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Migrations that pass in development cause outages in production because production tables are large and busy. The usual causes: a statement that takes an exclusive lock and then waits behind a long transaction while every other query queues behind it; a type change or default that rewrites the whole table; a constraint or `NOT NULL` that scans the table under lock; a non-concurrent index build that blocks writes; a rename or drop that breaks the old application code still running during a rolling deploy; a data backfill in the same transaction as the schema change; and a down migration that cannot bring dropped data back. Lock behaviour differs by engine and version, so the review must be specific to the database named.
</context>

<task>
Review this migration for {{database}}:

<migration>
{{migration}}
</migration>
{{#table_sizes}}

Table sizes and deploy process: {{table_sizes}}
{{/table_sizes}}

1. If it is a framework migration, translate each operation into the SQL the framework will actually run, including implicit transactions and anything the framework adds (default indexes, constraint names, column type mappings).
2. For each statement, determine for this engine and version: the lock it takes and what that lock blocks; whether it rewrites the table or scans it while holding the lock; and how long it would run at the given table sizes. When sizes are missing, say how the risk changes with size.
3. Check each risk:
   - Locking without `lock_timeout` (PostgreSQL) or with long metadata-lock waits (MySQL), and the queue that forms behind a waiting DDL statement.
   - Table rewrites: column type changes, volatile defaults, and engine-specific cases (in MySQL, which operations support `ALGORITHM=INSTANT` or `INPLACE` with `LOCK=NONE` and which fall back to `COPY`).
   - Constraints validated under lock: foreign keys, check constraints and `NOT NULL` on existing columns, and the safer path (`NOT VALID` then `VALIDATE CONSTRAINT` in PostgreSQL).
   - Index builds that are not concurrent or online, and `CONCURRENTLY` used inside a transaction (which fails), including how the framework disables its transaction.
   - Missing indexes on new foreign-key columns or on columns the shipped code will filter by.
   - Unique indexes or constraints added over data that may already contain duplicates.
   - Deploy-order breakage: renames, drops and new `NOT NULL` columns without defaults that old code still running cannot handle, and ORMs that cache column lists.
   - Data changes mixed with schema changes: unbatched `UPDATE` or `DELETE` on large tables, long transactions and replication lag.
   - Irreversibility: drops, narrowing type changes and down migrations that cannot restore data.
4. Write a safer version: split into separate migrations where needed, set timeouts, use concurrent or online operations, move backfills into batched jobs, and follow expand and contract for anything that old and new code must both survive.
5. Give the deploy order relative to application releases, the pre-flight queries to run (duplicate checks, long-running transactions, table sizes), and the rollback for each step.

If the engine version is ambiguous in a way that changes lock behaviour, state the version you assumed.
</task>

<constraints>
- Base every lock claim on the named engine and version; when behaviour changed between versions, say from which version it applies.
- Rank findings by outage or data-loss risk, not by style. Do not comment on naming unless it breaks something.
- Never recommend running the migration on production as a test. Pre-flight checks must be read-only.
- Keep the safer version equivalent in end state to the original unless a change is required for safety, and say when it is.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
One line: safe to merge | merge with the changes below | do not merge. Then the main reason in one sentence.

## Statement analysis
Table: statement | lock taken | blocks | rewrite or scan | estimated duration | risk (low, medium, high).

## Findings
Numbered, most severe first. Each: the statement, what goes wrong in production, and the fix.

## Safer migration
Code blocks in the same format as the input (SQL or the framework's), split into ordered migrations.

## Deploy order
Numbered steps interleaving migrations and application releases.

## Pre-flight checks
Read-only SQL to run before deploying, each with what result means stop.

## Rollback
Per step: how to undo it, and which steps cannot be undone.
</output_format>
