---
schema: 1
id: write-django-data-migration
kind: prompt
title: Write a Django data migration
description: Writes a Django migration that transforms existing rows with RunPython and historical models, in batches, with a reverse function and safe ordering around the schema migrations it depends on.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [django]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [django-migrations, runpython, backfill, historical-models, expand-contract]
pairs_with:
  prompts: [review-database-migration, test-database-migrations, plan-zero-downtime-schema-change]
args:
  - name: change
    description: What data needs to change and why, for example "split full_name into first_name and last_name" or "backfill the new status field from legacy flags".
    type: text
    required: true
  - name: scale
    description: Approximate row counts for the affected tables and whether deploys run migrations while old code is still serving.
    type: text
output_contract:
  format: markdown
  sections: [Plan, Migration files, Tests, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Django data migrations break in a few classic ways. Importing the model class directly (`from app.models import Order`) uses today's code, so the migration breaks once fields change later; the function must use `apps.get_model()` to get the historical model, which also lacks custom methods and managers unless `use_in_migrations = True`. Model `save()` overrides and signals do not run on historical models, so logic in them must be repeated explicitly. Iterating `Model.objects.all()` on a large table loads everything; use `.iterator(chunk_size=...)` and `bulk_update` in batches. On Postgres each migration runs in one transaction by default, so a long data migration holds locks for its whole duration; `atomic = False` lets it commit per batch. Mixing schema and data changes in one migration, or adding a non-null column and backfilling it in the same deploy, causes errors while old code is still running. And `RunPython` without a reverse function makes the migration irreversible; use `migrations.RunPython.noop` when reversing needs nothing.
</context>

<task>
Data change: {{change}}
{{#scale}}Scale and deploy: {{scale}}{{/scale}}

1. Read the models, the latest migrations in the affected apps, and any code that reads or writes the fields. Find the current migration leaf for each app.
2. Plan the sequence: a schema migration that adds new fields as nullable or with a default, the data migration, and a later migration that adds constraints or removes old fields once code no longer uses them. Say which steps ship in which deploy.
3. Write the data migration with `apps.get_model()`, correct `dependencies`, a forward function that processes rows in batches with `.iterator()` and `bulk_update` (or a set-based `update()` with `F`, `Case` and `When` expressions where possible), and repeats any logic that normally lives in `save()` or signals.
4. Write a reverse function, or `RunPython.noop` when reversing is harmless, and explain if true reversal is impossible.
5. Set `atomic = False` with per-batch transactions for large tables on Postgres, and make the forward function idempotent so a rerun after failure is safe.
6. Write a test that migrates to the state before, creates rows, runs the migration and asserts the result, using the project's existing migration test approach if there is one. Run `makemigrations --check`, the test and `migrate` on a local database, and report the results.
</task>

<constraints>
- Never import current models inside the migration function.
- Do not edit migrations that have already been applied in shared environments; add new ones.
- Do not run migrations against a shared or production database.
- Do not squash or reorder existing migrations as part of this change.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Plan
Migration sequence and which deploy each ships in.
## Migration files
Code blocks with file paths.
## Tests
Code blocks with file paths.
## Check
Commands run with real results.
## Open questions
Numbered, or "None".
</output_format>
