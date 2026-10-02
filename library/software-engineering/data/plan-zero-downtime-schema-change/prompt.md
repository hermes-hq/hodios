---
schema: 1
id: plan-zero-downtime-schema-change
kind: prompt
title: Plan a zero-downtime schema change
description: Turns current table DDL and a desired change into expand and contract steps with lock-safe SQL, app changes, backfill, verification and rollback. Use before altering a live table.
category: data
version: 1.0.0
status: experimental
aliases: [plan-schema-migration]
stage: [plan, ship]
role: [backend-engineer, dba, data-engineer, sre]
stack: [sql]
requires: [none]
inputs: [schema, spec, repo]
output: [plan, code, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [zero-downtime, expand-contract, backfill, dual-writes]
pairs_with:
  prompts: [design-database-schema, write-data-quality-checks]
  personas: [data-engineer]
args:
  - name: current_schema
    description: The exact CREATE TABLE statements for the affected tables, including indexes, constraints, triggers and foreign keys. If you only have a repository, name the table and the assistant will look for its definition.
    type: text
    required: true
  - name: desired_change
    description: The target state, for example "split users.name into first_name and last_name" or "change orders.amount from float to numeric(12,2)".
    type: text
    required: true
  - name: engine
    description: Database engine.
    type: enum
    enum: [postgres, mysql, sqlite, sql-server, other]
    default: postgres
  - name: context
    description: Engine major version, row counts and peak write rate, replication setup, the migration tool or ORM, how the app is deployed (rolling, blue-green, single instance) and how much downtime, if any, is acceptable.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Compatibility matrix, Steps, Point of no return, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version. Absorbs plan-schema-migration."}
---
<context>
The exact DDL decides what is safe. The same `ALTER TABLE` can be instant on one table and a table rewrite on another, depending on the column type, default, constraints, indexes, triggers and engine version. Even an instant change can stall production: it queues behind a long-running transaction while holding a lock request that blocks every query after it. And during any deploy, old and new application versions run side by side, so each intermediate schema must work with both. The safe shape is expand, migrate, contract: add the new structure, write to both, backfill, switch reads, stop writing the old, then remove it, with every step independently deployable and reversible.
</context>

<task>
Current schema ({{engine}}):
{{current_schema}}

Desired change: {{desired_change}}
{{#context}}

Context: {{context}}
{{/context}}

1. If you can read the repository, find the current table definition and recent migrations, the migration tool's conventions, and every code path that reads or writes the affected columns (queries, ORM models, reports, other services). List what you found. If you cannot, say which of these you are assuming.
2. Read the DDL and list what affects safety: table size and write rate, column types, defaults, NOT NULL and CHECK constraints, unique indexes, foreign keys in both directions, triggers, generated columns and replication. Say what is missing and what you assume about it. If the engine version is unknown and changes the answer, give both paths.
3. Break the change into ordered steps. For each step give:
   - the SQL, in the project's migration tool format if known, using the engine's lock-safe forms (see the notes below), with a lock timeout and a retry instruction for any statement that takes a strong lock;
   - the lock it takes, whether it rewrites or scans the table, and the expected duration class (instant, proportional to table size, or batched);
   - the application change that ships with it (write both, read new behind a flag, stop writing old);
   - the verification query that must pass before the next step;
   - the rollback for that step.
4. Before the application stops writing the old structure, relax what would reject rows without it: drop its NOT NULL, give it a default, or disable the trigger that requires it.
5. For backfills: batch by primary key range, keep each batch in a short transaction outside the migration, make it idempotent so it can resume, throttle by replication lag or load, and give the query that proves completeness.
6. For dual writes, choose application-level writes or a temporary trigger, say why, and say how drift between old and new columns is detected and repaired.
7. Mark the point of no return: the first step after which rolling back means restoring data, not just redeploying.

Engine notes. Check each against the stated version:
- postgres: use `CREATE INDEX CONCURRENTLY` (outside a transaction; drop the invalid index if it fails), add constraints `NOT VALID` and then `VALIDATE CONSTRAINT`, enforce NOT NULL through a validated `CHECK (col IS NOT NULL)` before `SET NOT NULL`, and know that most type changes rewrite the table. Set `lock_timeout` on every DDL session.
- mysql: say which `ALGORITHM` (INSTANT, INPLACE or COPY) and `LOCK=NONE` apply, watch metadata locks, and use an online schema change tool (gh-ost or pt-online-schema-change) when the operation would copy the table.
- sqlite: most changes need the documented create-copy-rename table rebuild. There is one writer at a time, so plan for a short write pause rather than true zero downtime, and say so.
- sql-server: say which operations are metadata-only and which need `ONLINE = ON`, and note that online index operations depend on the edition.
- other: ask which engine and version before giving engine-specific SQL. Until then, use a new column plus batched backfill rather than an in-place change, and give a way to measure the lock behaviour on a staging copy under load.
</task>

<constraints>
- Never combine the expand and contract phases in one deploy.
- Every step must leave the currently deployed application version working.
- Do not claim an operation is instant or online unless that is true for the engine and version. If it depends on the version, say so.
- Do not drop or rename anything still read by any deployed code. Say how to confirm that nothing reads it.
- Do not run any migration or query. The plan is for the team to execute.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Two or three sentences: the approach, the number of deploys, and the riskiest step.

## Compatibility matrix
Table: step | schema state | app version that must work | reads from | writes to.

## Steps
Numbered. Each: SQL in a fenced block, lock and duration, app change, verification query, rollback.

## Point of no return
The step, what rollback means after it, and what to confirm before taking it.

## Risks
Bullets: the risk (for example replication lag, long transactions holding locks, an ORM caching the old schema), how to detect it, and the mitigation.
</output_format>
