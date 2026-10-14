---
schema: 1
id: remove-duplicate-rows
kind: prompt
title: Remove duplicate rows from a database table
description: Finds exact-key duplicate rows in a table, repoints foreign keys to one survivor, deletes the rest in batches and adds the unique constraint that stops them coming back.
category: data
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, dba, data-engineer]
stack: [sql]
requires: [repo-read, file-write, shell]
inputs: [schema, repo, text]
output: [code, plan]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [duplicates, unique-constraint, foreign-keys, batched-deletes, data-cleanup]
pairs_with:
  prompts: [plan-zero-downtime-schema-change, review-database-migration, implement-idempotency-keys]
  personas: [database-administrator]
args:
  - name: table
    description: The table with duplicates, its schema, the columns that should be unique, and the database engine and version.
    type: text
    required: true
  - name: cause
    description: How the duplicates got in, if known, for example a double-submitted form, a retrying import or a race between two workers.
    type: text
  - name: table_size
    description: Approximate row count and how many duplicates you expect, so the plan can size batches.
    type: string
output_contract:
  format: markdown
  sections: [Findings, Survivor rule, Cleanup script, Constraint, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Duplicate rows in an application table are rarely just extra rows. Other tables point at them, so deleting the wrong copy orphans orders or breaks foreign keys; the copies often differ in a few columns, so "keep the lowest id" can throw away the newest email or status; and if the code path that created them is not fixed and a unique constraint is not added, they come back next week. Large deletes in one transaction lock the table, bloat it and fill replication lag. Uniqueness also has traps: `NULL` is not equal to `NULL` in most engines, so a unique index on a nullable column allows many nulls, and case or whitespace differences ("Ann@x.com" and "ann@x.com ") mean the true key is normalised, not raw.
</context>

<task>
Clean up duplicates in this table:
{{table}}
{{#cause}}Known cause: {{cause}}{{/cause}}
{{#table_size}}Size: {{table_size}}{{/table_size}}

1. Read the schema, migrations and the code that inserts into this table. Find every foreign key and every application-level reference (ids stored in JSON, caches, search indexes, external systems) that points at it.
2. Write read-only queries that count duplicate groups on the intended key, including the normalised form if case or whitespace may differ, and show a sample of groups with the columns that differ inside each group. Run them if you have read access and report the numbers.
3. Propose a survivor rule per group (for example the oldest row, merged with the most recent non-null value of each column that differs) and say which column values would be lost. Ask before applying a rule that loses data the user may care about.
4. Write the cleanup as a script that: builds a mapping table of duplicate id to survivor id; updates every referencing table to the survivor, handling rows that would themselves become duplicates there; merges column values onto the survivor; deletes the duplicates in batches by primary key with a pause between batches; and can be rerun safely if it stops halfway.
5. Add the unique constraint or unique index in a migration, built online where the engine supports it (for example `CREATE UNIQUE INDEX CONCURRENTLY` in Postgres), on normalised expressions if needed, and decide how nullable key columns are handled.
6. Fix the insert path so it relies on the constraint: an upsert or a caught unique violation, not a check-then-insert that races.
7. Give verification queries: zero duplicate groups, no orphaned references, row counts before and after matching the expected deletions.
</task>

<constraints>
- Do not run any `UPDATE`, `DELETE` or schema change against a shared or production database. Write the script, run it only against a local or test copy, and leave running it in production to the user with a backup or snapshot taken first.
- Never delete before the references are repointed, and never in one unbatched statement on a large table.
- Do not assume the key. If the intended uniqueness is unclear (per tenant, per day, case-insensitive), ask.
- Use the engine's own syntax and say which engine and version each statement assumes.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Findings
Duplicate counts, sample groups, referencing tables and the likely cause.
## Survivor rule
The rule, and the data each duplicate group would lose.
## Cleanup script
Fenced SQL or code with file path, with batch size and rerun notes.
## Constraint
The migration and the change to the insert path.
## Verification
Queries and the results that mean success.
## Open questions
Numbered, or "None".
</output_format>
