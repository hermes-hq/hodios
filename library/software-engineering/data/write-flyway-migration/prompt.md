---
schema: 1
id: write-flyway-migration
kind: prompt
title: Write a Flyway or Liquibase migration
description: Writes a Flyway or Liquibase database migration with correct versioning, safe locking on large tables, repeatable scripts for views and procedures, rollback notes and validation in CI.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, dba]
stack: [java]
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
tags: [flyway, liquibase, schema-migrations, jvm, zero-downtime]
pairs_with:
  prompts: [review-database-migration, plan-zero-downtime-schema-change, write-jpa-entity-mappings, fix-failed-database-migration]
  rules: [database-migration-rules]
args:
  - name: change
    description: The schema or data change to make, and the size of the affected tables if known.
    type: text
    required: true
  - name: setup
    description: Flyway or Liquibase, its version, the database, and how migrations run (on app startup with Spring Boot, a CLI step in the pipeline, a Gradle or Maven plugin), if the agent cannot read it.
    type: text
output_contract:
  format: markdown
  sections: [Migration, Locking and rollout, Rollback, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Flyway and Liquibase both record what has run, and both punish editing history. In Flyway a versioned migration (`V20261011_1__add_status.sql`) runs once and its checksum is stored; changing it after it ran anywhere fails validation, and `flyway repair` only realigns the history table, it does not undo anything. Versions must be unique across branches, so timestamp-style versions avoid clashes that sequential numbers cause, and `outOfOrder` is a team decision, not a fix. Repeatable migrations (`R__view_name.sql`) rerun when their checksum changes and suit views, functions and procedures written as `CREATE OR REPLACE`. Liquibase tracks changesets by id, author and file path, so moving a changelog file reruns everything unless `logicalFilePath` is set; `runOnChange` is its repeatable equivalent, and preconditions guard environment differences. Rollback is not automatic for raw SQL in either tool: Flyway undo is a paid feature and Liquibase needs explicit rollback blocks for SQL changesets. On large tables the migration itself is the outage: adding a non-null column with a volatile default, adding a foreign key or index without `CONCURRENTLY` (Postgres) or `ALGORITHM=INPLACE, LOCK=NONE` (MySQL) locks writes, and Postgres `CREATE INDEX CONCURRENTLY` cannot run inside a transaction, which needs per-script transaction settings. Running migrations on app startup with several replicas relies on the tool's lock and makes a slow migration delay every pod's start.
</context>

<task>
Change: {{change}}
{{#setup}}Setup: {{setup}}{{/setup}}

1. Read the migration configuration (locations, naming, `baselineOnMigrate`, `outOfOrder`, `validateOnMigrate`), existing migrations and how they run in each environment.
2. Name and place the migration per the project's convention, with a version that cannot clash with other branches. Use a repeatable migration for views, functions and procedures.
3. Write the SQL (or changeset) so it is safe on the table sizes involved: nullable column then backfill then constraint, indexes built concurrently or online with the transaction disabled for that script, foreign keys added `NOT VALID` then validated on Postgres, and backfills in batches in a separate migration or job.
4. Write rollback: a Liquibase rollback block, or a written forward-fix or manual rollback SQL for Flyway, and say which steps cannot be undone without data loss.
5. Note the rollout order when app code and schema change together (expand first, deploy code, contract later).
6. Run the migration against a local database or the test container setup (`flyway migrate` or `liquibase update`, then `validate`), run the tests, and report the results. Confirm CI runs validation.
</task>

<constraints>
- Never edit or delete a migration that has run in any shared environment; write a new one.
- Do not run `repair`, `clean`, `dropAll` or migrations against shared or production databases yourself, and say that `clean` must stay disabled in production config.
- Do not combine a long backfill and a schema lock in one migration on a large table.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Migration
The file(s) in fenced blocks with their paths and names.
## Locking and rollout
What each statement locks and for how long on the stated size, and the expand and contract order.
## Rollback
The rollback script or forward-fix, and what cannot be undone.
## Check
Commands run with real results.
## Open questions
Numbered, or "None".
</output_format>
