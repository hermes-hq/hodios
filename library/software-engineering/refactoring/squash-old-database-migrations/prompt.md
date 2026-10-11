---
schema: 1
id: squash-old-database-migrations
kind: prompt
title: Squash old database migrations
description: Squashes a long history of ORM migrations into one clean baseline that fresh databases build from and existing databases skip, proving the resulting schema is identical.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, dba]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [plan, diff, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [schema-migrations, migration-baseline, orm, schema-diff]
pairs_with:
  prompts: [review-database-migration, fix-failed-database-migration]
  rules: [database-migration-rules]
args:
  - name: migrations
    description: The migration tool and folder (Django, Rails, Alembic, Flyway, Liquibase, Prisma, EF Core, Knex, golang-migrate), the database, how many migrations, and which environments exist (production, staging, developer machines, CI, customer installs).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Current history, Squash approach, Steps, Schema comparison, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hundreds of migrations make CI and fresh setups slow and carry dead references to removed models. A squash replaces them with one baseline that creates today's schema. The hard part is databases that already exist: each tool tracks applied migrations in its own table (`django_migrations`, `schema_migrations`, `alembic_version`, `flyway_schema_history`, `_prisma_migrations`, `__EFMigrationsHistory`), and the baseline must be recorded as applied there without running, while fresh databases run it.

Each tool has its own mechanism: Django `squashmigrations` with `replaces` keeps both paths until every database has passed the squash point, then old files can go; Rails can load `schema.rb`/`structure.sql` and drop old files once all environments are past them; Alembic needs a new base revision and `alembic stamp` on existing databases; Flyway uses `baselineVersion` with `baseline` on existing databases, or baseline migrations (`B` prefix) in editions that support them; Prisma uses `migrate diff` plus `migrate resolve --applied`. What gets lost: data migrations (seed rows, backfills) that a fresh database still needs, custom SQL (triggers, functions, extensions, partial indexes, check constraints, collations) that ORM autogeneration does not capture, and any environment still behind the squash point, such as a customer install or a long-lived branch. Equivalence is proven by building a fresh database from the old history and one from the baseline and diffing the schemas with a schema dump.
</context>

<task>
Squash {{migrations}}.

1. Read the migration history: count, oldest unapplied point across environments (ask if unknown), data migrations, raw SQL, and migrations that reference code that no longer exists.
2. Propose the approach for this tool: the squash point, how existing databases are marked as applied, how fresh databases build, what happens to data migrations and raw SQL, and the condition for deleting old files. Wait for approval.
3. Build a reference database from the full old history in a disposable local database or container, and dump its schema (for example `pg_dump --schema-only`, `mysqldump --no-data`).
4. Create the baseline, build a second disposable database from it, dump it and diff against the reference. Fix every difference (extensions, triggers, defaults, index names, constraint names, sequences) until only ordering differs.
5. Give the rollout checklist: confirm every environment is at or past the squash point, how to mark existing databases (exact tool command for the user to run), CI and developer setup changes, and when old files can be removed.
</task>

<constraints>
- Only run migrations against disposable databases you created; never against shared, staging or production databases.
- Never mark migrations applied on a real database yourself; give the command for the user.
- Keep seed data and data migrations a fresh install needs; say where each one went.
- Do not delete old migration files while any environment may still be behind the squash point.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current history
Counts, squash point, data migrations and raw SQL found.
## Squash approach
Tool-specific mechanism for fresh and existing databases.
## Steps
Numbered steps.
## Schema comparison
Diff result between old-history and baseline databases.
## Rollout
Checklist per environment, with commands for the user.
</output_format>
