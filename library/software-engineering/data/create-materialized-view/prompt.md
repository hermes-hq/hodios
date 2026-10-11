---
schema: 1
id: create-materialized-view
kind: prompt
title: Create a materialized view for a slow aggregate
description: Creates a materialized view or summary table for a slow aggregate with a refresh strategy (concurrent, scheduled or incremental), its indexes and an agreed staleness limit.
category: data
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, dba, data-engineer]
stack: [sql]
requires: [repo-read, file-write, shell]
inputs: [repo, schema, text]
output: [code, explanation]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [materialized-views, summary-tables, precomputed-aggregates, refresh-strategy, dashboard-performance]
pairs_with:
  prompts: [optimize-sql-query, design-cqrs-read-models, plan-caching-strategy]
args:
  - name: slow_query
    description: The slow aggregate query, how often it runs and its current timing, ideally with the query plan.
    type: text
    required: true
  - name: freshness
    description: How stale the result may be (seconds, minutes, a day) and who reads it.
    type: string
    required: true
  - name: database
    description: Engine and version, and the sizes of the main tables.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Is precomputing the right fix, Design, Migration, Refresh, Query changes, Check, Operating notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A dashboard or report runs an aggregate over millions of rows and it is too slow. Precomputing helps only if the query cannot be fixed with an index or rewrite, and the readers accept some staleness. The options differ by engine. Postgres materialized views refresh fully each time; `REFRESH MATERIALIZED VIEW CONCURRENTLY` keeps the view readable but needs a unique index on the view and is slower; neither refreshes automatically. MySQL has no materialized views, so a summary table maintained by a scheduled job or by incremental upserts is the usual answer. A full refresh cost grows with the data; for append-mostly data (events, orders), an incremental summary table keyed by day or hour that only recomputes recent buckets is far cheaper. Late-arriving or updated rows break naive incremental schemes unless the recompute window covers them.
</context>

<task>
<slow_query>
{{slow_query}}
</slow_query>
Freshness allowed: {{freshness}}
Database: {{database}}

1. Read the query, the schema and where the result is used in the code. Check first whether an index or a rewrite would make the live query fast enough; if so, say that and stop with the fix.
2. Choose: a materialized view with full refresh, a concurrent refresh, or an incremental summary table. Base the choice on refresh cost, freshness, table growth and the engine.
3. Define the view or table: grain (per day, per account), columns, a unique key, and indexes for how it is read.
4. Write the migration in the project's tool, including the initial population and its cost on a large table.
5. Refresh: the mechanism (the project's scheduler or job runner, `pg_cron` if available, or an incremental upsert after writes), schedule from the freshness limit, overlap protection so two refreshes never run at once, and for incremental tables, a recompute window that covers late or corrected rows.
6. Change the reading code to use the precomputed result, and show the data's as-of time to users if staleness matters.
7. Verify on a local or disposable database: results match the live query on the same data, the read is fast (plan and timing), and the refresh time is measured.
</task>

<constraints>
- Run migrations and refreshes only against local or disposable databases unless the user confirms otherwise.
- State the lock taken by the initial build and by each refresh method.
- Do not promise real-time results from a periodically refreshed view.
- Use only features the stated engine and version have.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Is precomputing the right fix
Two to four lines.

## Design
Choice, grain, key and indexes, with reasons.

## Migration
SQL or migration code with file path.

## Refresh
Mechanism, schedule, overlap guard and recompute window.

## Query changes
Diff of the reading code.

## Check
Correctness comparison, timings and refresh duration, as run.

## Operating notes
Monitoring refresh failures and lag, growth, and how to rebuild.
</output_format>
