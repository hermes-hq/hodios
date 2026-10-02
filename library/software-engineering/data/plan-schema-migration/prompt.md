---
schema: 1
id: plan-schema-migration
kind: prompt
title: Plan a zero-downtime schema migration
description: Plans a live schema change as backward-compatible expand and contract steps with lock analysis, batched backfill and rollback. Use before changing a table that serves production traffic.
category: data
version: 1.0.0
status: experimental
stage: [plan, ship]
role: [backend-engineer, dba, data-engineer, sre]
stack: [sql]
requires: [repo-read]
inputs: [schema, spec, repo]
output: [plan, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [zero-downtime, expand-contract, backfill]
pairs_with:
  prompts: [design-database-schema]
args:
  - name: change
    description: The schema change, for example "rename users.fullname to display_name" or "make orders.customer_id NOT NULL".
    type: text
    required: true
  - name: database
    description: Database engine. Add the major version in context if you know it.
    type: enum
    enum: [postgres, mysql, sql-server, other]
    default: postgres
  - name: context
    description: Table size and write rate, database version, migration tool or ORM, how the app is deployed, and how much downtime is acceptable.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Steps, SQL, Verify, Point of no return, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Schema changes on live tables fail in two ways. A statement takes a lock that blocks reads or writes for minutes, or old and new versions of the application, running side by side during a deploy, disagree about the schema. The safe pattern is expand and contract: add the new shape, make the code work with both, move the data, then remove the old shape, with every step deployable and reversible on its own.
</context>

<task>
Plan this change on {{database}}: {{change}}
{{#context}}
Context: {{context}}
{{/context}}

1. If the repository is available, read the current table definition, recent migrations, the migration tool's conventions and the code that reads and writes the affected columns. List the code paths you found.
2. Break the change into ordered steps. At every step, the deployed application version and the next one must both work against the schema.
3. For each DDL statement, state the lock it takes and whether it rewrites or scans the table on {{database}}. Prefer the non-blocking forms, for example in Postgres: `CREATE INDEX CONCURRENTLY`; constraints added `NOT VALID` and validated separately; `SET NOT NULL` after a validated `CHECK (col IS NOT NULL)`. In MySQL, say which `ALGORITHM` applies or whether an online schema change tool is needed.
4. Set a `lock_timeout` (or the engine's equivalent) on every DDL statement so a blocked migration fails fast instead of queueing all traffic behind it, and say how to retry.
5. Design any backfill to run in small batches by primary key range, throttled, idempotent and resumable, outside the migration transaction.
6. Give verification queries for each step and a rollback for each step.
7. Name the point of no return: the first step whose rollback loses data or needs a restore.
</task>

<constraints>
- Never plan a single-step rename, type change or drop on a live table that running code still uses.
- If you are not sure how a statement locks on the user's database version, say so and give a way to test it on a staging copy under load.
- Do not run any migration or query. The plan is for the team to execute.
- Use the project's migration tool format when you know it; otherwise plain SQL.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Two sentences: the approach and the number of deploys it takes.

## Steps
| # | Step | Type (DDL / deploy / backfill / cleanup) | Lock and table impact | Rollback |

## SQL
The statements for each step, labelled by step number, with lock timeouts.

## Verify
The check to run after each step and the result that means it is safe to continue.

## Point of no return
The step, and what to confirm before taking it.

## Risks
What could still go wrong (replication lag, long transactions holding locks, ORM caching the old schema) and how to watch for it.
</output_format>
