---
schema: 1
id: enforce-data-rules-with-constraints
kind: prompt
title: Enforce data rules with database constraints
description: Moves business rules that only live in app validation into NOT NULL, CHECK, unique and partial unique constraints, checking existing rows first and adding them without long locks.
category: data
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [backend-engineer, dba, fullstack-engineer]
stack: [postgres, mysql, sqlite]
requires: [repo-read, file-write, shell]
inputs: [repo, schema, text]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [check-constraints, unique-constraints, partial-indexes, data-integrity, not-null]
pairs_with:
  prompts: [add-foreign-keys-to-legacy-schema, prevent-double-booking, review-database-migration, plan-zero-downtime-schema-change]
  personas: [database-administrator]
args:
  - name: rules
    description: The rules to enforce in plain words, such as "email is unique ignoring case", "one active subscription per user", "quantity is positive", "end date after start date".
    type: text
    required: true
  - name: database
    description: Engine and version, table sizes and write rates, and the migration tool the project uses.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Rules and constraint types, Violation checks, Migrations, App error handling, Tests, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Validation in application code does not keep data clean on its own. Two requests can both check "is this email taken?" and both insert; a background job, an admin script or a second service writes without the same checks. Constraints are the only rule every writer must follow. Each rule maps to a specific tool: NOT NULL for required fields, CHECK for value and cross-column rules on one row, UNIQUE for keys, a unique index on an expression for case-insensitive uniqueness (`lower(email)`, or `citext` in Postgres), a partial unique index for "one active X per Y" (`WHERE status = 'active'`), exclusion constraints for overlapping ranges, and foreign keys for references. Rules that span many rows or tables usually do not fit a constraint and need a locking pattern instead. Engines differ in ways that bite: MySQL only enforces CHECK from 8.0.16 (earlier versions parse and ignore it), has no partial indexes (a generated column that is NULL when inactive plus a unique index is the usual workaround), and MariaDB differs again; unique constraints allow many NULLs except with `NULLS NOT DISTINCT` in Postgres 15 and later; SQLite cannot add most constraints to an existing table without rebuilding it. Adding a constraint to a table that already holds violating rows fails, and on a big table the check scan can block writes: in Postgres, `CHECK ... NOT VALID` then `VALIDATE`, a validated `CHECK (col IS NOT NULL)` before `SET NOT NULL`, and `CREATE UNIQUE INDEX CONCURRENTLY` then `ADD CONSTRAINT ... USING INDEX` avoid long locks.
</context>

<task>
Rules: {{rules}}
Database: {{database}}

1. Read the models, existing migrations and validation code in the repo. Find where each rule is checked today and every path that writes these tables.
2. Map each rule to a constraint type, or say why it does not fit a constraint and what pattern to use instead. Name every constraint explicitly.
3. Write read-only queries that count and sample existing rows that break each rule. For violations, lay out options (fix, default, archive) and leave the choice to the data owner.
4. Write the migrations in the project's migration tool, using the lowest-lock method for this engine and version and the given table sizes, with each step's lock and expected duration stated.
5. Update the app so a constraint violation becomes a clear user-facing error (for example a unique violation on email becomes "email already registered", not a 500), keeping the existing validation as the friendly first check.
6. Add tests that try to write invalid data directly and through the concurrent path (two inserts at once for uniqueness) and expect the database to refuse it. Run the test suite and report the real results.
7. Give the rollout order: data fixes, then constraints, then app error handling, with the rollback for each migration.
</task>

<constraints>
- Never modify or delete existing rows to make a constraint pass without explicit confirmation.
- Do not apply migrations to shared, staging or production databases.
- Mark engine and version-specific behaviour as to verify when the version is unknown.
- Do not remove the app-level validation; the constraint is the backstop, not the only message users see.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Rules and constraint types
Table: rule | constraint or pattern | name | engine notes.

## Violation checks
Read-only SQL and the counts if run, with the decisions needed.

## Migrations
Files with paths, and lock notes per step.

## App error handling
The code changes and the error each violation maps to.

## Tests
Tests added and the command run with its real result.

## Rollout
Numbered order with rollback.
</output_format>
