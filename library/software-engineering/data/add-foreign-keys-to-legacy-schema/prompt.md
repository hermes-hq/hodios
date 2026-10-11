---
schema: 1
id: add-foreign-keys-to-legacy-schema
kind: prompt
title: Add missing foreign keys to a legacy schema
description: Adds missing foreign keys to a live database by finding orphan rows, deciding how to fix them, and adding constraints without long locks using NOT VALID then VALIDATE or the engine's online DDL.
category: data
version: 1.0.0
status: incubating
stage: [maintain]
role: [dba, backend-engineer]
stack: [postgres, mysql]
requires: [repo-read, file-write]
inputs: [schema, repo, text]
output: [code, plan, checklist]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [foreign-keys, referential-integrity, orphan-rows, online-ddl, not-valid-constraints]
pairs_with:
  prompts: [map-legacy-database-schema, plan-zero-downtime-schema-change, review-database-migration]
  personas: [database-administrator]
args:
  - name: relationships
    description: The child and parent columns that should be linked (declared intent or from a schema map), with table sizes and write rates.
    type: text
    required: true
  - name: database
    description: Engine, version and hosting, plus the migration tool the project uses.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Order of work, Orphan checks, Orphan decisions, Indexes first, Constraint migrations, Delete behaviour, Rollout and check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Adding a foreign key to a table that has run without one for years fails in two ways: the statement errors because orphan rows exist, or it succeeds but locks a busy table while it checks every row. In Postgres, `ADD CONSTRAINT ... FOREIGN KEY ... NOT VALID` is fast and enforces the rule for new writes at once, and a later `VALIDATE CONSTRAINT` checks existing rows with a lighter lock that does not block normal reads and writes. Adding the constraint still briefly takes locks on both tables, so a `lock_timeout` and retries protect against queueing behind long transactions. The child column also needs an index, or every parent delete or key update scans the child table. In MySQL InnoDB, the child column must be indexed (it creates one if missing), the types and collations must match exactly, and whether adding the key runs in place depends on the version and `foreign_key_checks`; tools such as gh-ost or pt-online-schema-change have their own foreign key limitations. Orphans need a decision per relationship: backfill a placeholder parent, set the column to NULL, archive and delete, or fix from another source. That is a data decision, not a technical one.
</context>

<task>
Relationships: {{relationships}}
Database: {{database}}

1. Read the existing migrations and schema in the repo. Order the relationships so parents are handled before children, and check types and collations match on both sides.
2. Write read-only orphan check queries per relationship: count of orphans, samples, and when they were created (to see whether the app still creates them).
3. For each relationship with orphans, lay out the options (archive then delete, set NULL, create placeholder parents, repair from another source) with consequences, and mark the choice as needing the data owner's decision. Fix the app path that still creates orphans first.
4. Indexes: create missing indexes on child columns online (`CREATE INDEX CONCURRENTLY` or the engine's online method) in their own migrations.
5. Constraint migrations: for Postgres, `NOT VALID` add with a short `lock_timeout`, then a separate `VALIDATE CONSTRAINT` migration after orphan cleanup; for MySQL, the safest method for this version and table size, with the lock behaviour stated.
6. Delete behaviour: `ON DELETE` choice per relationship (restrict, cascade, set null) matched to how the app deletes today, so adding the key does not break existing deletes.
7. Rollout: order of migrations, when to run each, how to watch locks and errors, and rollback (drop the constraint). Write the migration files; do not run them against shared databases.
</task>

<constraints>
- Orphan clean-up writes are proposals for the user to approve; never delete or modify data without explicit confirmation.
- Every DDL step states its lock and expected duration on the given table sizes.
- Do not apply migrations to shared, staging or production databases.
- Mark engine and version-specific behaviour as to verify.
{{> guardrails/scope-discipline}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Order of work
Numbered list of relationships and steps.

## Orphan checks
Read-only SQL.

## Orphan decisions
Table: relationship | orphan count | options | decision needed from.

## Indexes first
Migrations with file paths.

## Constraint migrations
Migrations with file paths and lock notes.

## Delete behaviour
Table: relationship | ON DELETE | reason.

## Rollout and check
Checklist with rollback.
</output_format>
