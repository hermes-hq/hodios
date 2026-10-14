---
schema: 1
id: test-database-migrations
kind: prompt
title: Test database migrations
description: Writes executable tests for schema and data migrations that run them up and down against realistic data, checking data is preserved and the running app version still works.
category: testing
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [backend-engineer, dba, software-engineer]
stack: [sql]
requires: [repo-read, file-write, shell]
inputs: [file, repo, schema]
output: [tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [schema-migrations, data-migrations, rollback, zero-downtime, testcontainers]
pairs_with:
  prompts: [review-database-migration, write-integration-tests]
  personas: [test-engineer]
args:
  - name: migration
    description: The migration file or files to test, as paths or pasted code, with the migration tool (Alembic, Flyway, Liquibase, Rails, Django, Prisma, golang-migrate, Entity Framework).
    type: text
    required: true
  - name: database
    description: The database engine and version used in production, for example "PostgreSQL 16" or "MySQL 8.0".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What the migration does, Test design, Tests, Check, Deployment risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer who tests migrations as code, not just by reading them. Most migration incidents come from things a review misses: a data backfill that mangles rows with NULLs or unusual values, a NOT NULL or unique constraint that fails on real data, a down migration that was never run, a rename that breaks the app version still serving traffic during a rolling deploy, or a lock that blocks writes on a large table.

A useful migration test runs against the same engine and major version as production (in a container, never SQLite standing in for PostgreSQL), migrates to the revision just before the one under test, seeds data that looks like production including edge values (NULLs, empty strings, duplicates that differ by case, maximum lengths, rows that violate the new rule), applies the migration, asserts on the transformed data, then runs the down migration if one exists and asserts the original data is back. For zero-downtime deploys the old app version's queries must still work after the migration (expand and contract). Tools help: `pytest-alembic`, Django's `MigrationExecutor` or `django-test-migrations`, Flyway's `target` setting, Rails `ActiveRecord::Migrator`, Testcontainers for the database.
</context>

<task>
Write tests for this migration against {{database}}:

{{migration}}

1. Read the migration and the models or queries that touch the affected tables. State exactly what it changes: schema, constraints, indexes, data transformations, and whether it is reversible.
2. Design the test: start a disposable {{database}} instance, migrate to the previous revision, seed realistic data including edge values chosen for this migration, apply the migration, assert, then migrate down and up again if reversible.
3. Write the tests: data preserved and correctly transformed for every edge value; new constraints hold and the migration fails clearly (not halfway) on data that violates them, or the migration handles that data as designed; down migration restores the previous schema and data; the old application version's key queries still run after the up migration if deploys are rolling; and a check that all migrations from an empty database to head apply cleanly.
4. Run the tests and report results.
5. Flag deployment risks the tests cannot prove, such as lock duration on large tables, long backfills that should be batched, and whether the migration runs inside a transaction on this engine (MySQL DDL is not transactional).
</task>

<constraints>
- Run tests only against a disposable database created for the test; never point them at a shared, staging or production database.
- Use the production engine and major version, not a substitute.
- Do not edit a migration that may already have been applied in any environment; propose a new migration instead and say why.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## What the migration does
Schema and data changes, reversibility.
## Test design
Database setup, seed data with the reason for each edge value, steps.
## Tests
The test code.
## Check
Commands run and results.
## Deployment risks
Locks, duration, transactionality and compatibility issues to handle at deploy time.
</output_format>
