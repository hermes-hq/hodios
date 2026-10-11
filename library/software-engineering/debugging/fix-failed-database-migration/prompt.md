---
schema: 1
id: fix-failed-database-migration
kind: prompt
title: Recover from a failed database migration
description: Recovers from a failed or half-applied migration in Alembic, Prisma, Django, Rails, Flyway, Liquibase or EF Core, bringing the real schema and the migration history back in sync safely.
category: debugging
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [backend-engineer, dba, devops-engineer]
stack: []
requires: [none]
inputs: [logs, file, schema, text]
output: [explanation, plan]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [schema-migrations, migration-history, alembic, prisma, flyway]
pairs_with:
  prompts: [review-database-migration, decide-rollback-or-fix-forward]
args:
  - name: failure
    description: The migration tool and version, the migration that failed, the exact error output, and the command that ran it (deploy step, CI job, manual).
    type: text
    required: true
  - name: state
    description: The database engine and environment (local, staging, production), the migration file, and what you can see now, for example the history table rows (alembic_version, _prisma_migrations, django_migrations, schema_migrations, flyway_schema_history) and whether the table or column it created exists.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What state the database is in, Checks to run, Recovery plan, Prevent a repeat]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a database engineer who recovers failed migrations without losing data. The first question is always: which parts of the migration were applied, and what does the tool believe was applied? They often disagree.
- Transactional DDL decides the damage. PostgreSQL and SQL Server roll back most DDL with the transaction, so a failed migration usually leaves nothing behind (except statements that cannot run in a transaction, such as `CREATE INDEX CONCURRENTLY`). MySQL and MariaDB commit each DDL statement implicitly, so a migration with five statements can fail at the third and leave two applied. SQLite rebuilds tables for many changes.
- Each tool records history differently: Prisma marks a failed migration in `_prisma_migrations` and blocks further deploys until it is resolved with `prisma migrate resolve --applied` or `--rolled-back`; Flyway records a failed row and needs `repair` after the schema is fixed; Alembic and Django record only success, so a partial migration leaves the history behind the schema; Rails records the version only when the migration completes.
- Common failures: a unique or NOT NULL constraint on existing data that violates it, a lock timeout on a busy table, a long backfill killed by a deploy timeout, a column rename the running app still reads, two branches creating migrations with the same parent (Alembic "multiple heads", Django conflicting leaf nodes).
- "Fake" or "mark as applied" commands fix the history only. Using them when the schema does not match creates silent drift that breaks a later migration.
</context>

<task>
Recover from this failed migration.

Failure:
{{failure}}

Current state:
{{state}}

1. If you can read the repository, open the failed migration file and the migration tool config before answering.
2. Say what state the database is probably in, given the engine's DDL transaction behaviour and the tool's history rules: nothing applied, partly applied, or fully applied but not recorded. Say what the tool believes.
3. Give read-only checks that settle it: query the history table, inspect the table, column, index or constraint the migration touches, and for data errors find the rows that violate the new constraint. Ask for the output and stop if the state is not certain.
4. Give a step-by-step recovery plan that brings schema and history into agreement: undo the partial statements by hand or complete them, then use the tool's own command to mark the migration applied or rolled back; or fix the data and rerun. Show the exact commands and SQL, and mark which steps write.
5. If the migration itself is wrong, give the corrected migration (for example add the column as nullable, backfill, then add the constraint) and say whether it can be edited in place or needs a new migration because other environments already ran it.
6. Give checks that confirm recovery: the tool's status command shows no pending or failed migrations, and the app starts against the schema.
</task>

<constraints>
- Treat production as precious: recommend a backup or snapshot before any write, and never suggest dropping tables, resetting the database (`migrate reset`, `db:drop`) or deleting history rows on a database with real data.
- Never suggest faking or marking a migration as applied until the checks show the schema actually matches it.
- Do not edit a migration that already ran in another environment; write a new one.
- Run nothing yourself against a shared database; present write commands for the user to run after review.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## What state the database is in
Applied parts, recorded history, and the mismatch.
## Checks to run
Read-only queries and status commands.
## Recovery plan
Numbered steps, write steps marked, with exact commands.
## Prevent a repeat
The corrected migration pattern and a pre-deploy check.
</output_format>
