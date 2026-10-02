---
schema: 1
id: optimize-sql-query
kind: prompt
title: Optimise a slow SQL query
description: Speeds up a slow SQL query from its execution plan, proposing rewrites and indexes with expected gains and their write-cost trade-offs. Use when one query dominates latency or database load.
category: performance
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, dba, data-engineer]
stack: [sql]
requires: [none]
inputs: [file, logs, schema]
output: [code, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [query-plan, indexing, sql-tuning, sargable]
args:
  - name: query
    description: The slow query, plus the relevant table definitions, existing indexes and approximate row counts if you have them.
    type: text
    required: true
  - name: plan_output
    description: The execution plan with actual timings, e.g. EXPLAIN (ANALYZE, BUFFERS) output or the query profile.
    type: text
  - name: engine
    description: Database engine the query runs on.
    type: enum
    enum: [postgres, mysql, sql-server, sqlite, bigquery, snowflake]
    default: postgres
output_contract:
  format: markdown
  sections: [Diagnosis, Changes, Rewritten query, Index changes, Trade-offs, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Query tuning without a plan is guessing. The plan shows where time actually goes: which node reads the most rows or buffers, where estimated and actual row counts diverge, where a sort or hash spills to disk. Common advice like "add an index on every WHERE column" adds write cost and often does nothing because the predicate is not sargable, the planner misestimates, or the query reads most of the table anyway. Warehouse engines have no indexes at all, so their fixes are different.
</context>

<task>
Make this {{engine}} query faster:
{{query}}
{{#plan_output}}
Execution plan:
{{plan_output}}
{{/plan_output}}

1. If there is no plan, give the exact command to capture one for {{engine}} with actual timings (for example EXPLAIN (ANALYZE, BUFFERS) on Postgres, EXPLAIN ANALYZE on MySQL 8, the actual execution plan on SQL Server, EXPLAIN QUERY PLAN on SQLite, the query profile or execution details on BigQuery and Snowflake). Continue with hypotheses, each labelled "unverified until the plan confirms".
2. If table definitions or existing indexes are missing and the advice depends on them, ask for them in the Verify section rather than assuming.
3. Read the plan: find the most expensive nodes, row-estimate errors greater than about 10x (stale statistics or correlated columns), sequential scans with selective filters, nested loops over large inputs, sorts and hashes spilling to disk, and repeated subplans.
4. Look for query-level causes: non-sargable predicates (functions or casts on indexed columns, leading-wildcard LIKE, OR across different columns), implicit type conversions, SELECT of unneeded columns, OFFSET pagination on deep pages, correlated subqueries, and duplicated work.
5. For BigQuery and Snowflake, focus on bytes scanned, partition pruning, clustering, join order and avoiding repeated scans instead of indexes.
6. Propose changes in order of expected gain. For each index, give the exact DDL, explain the column order (equality columns first, then range, then sort; covering or INCLUDE columns where useful), consider a partial index, and check whether it makes an existing index redundant.
</task>

<constraints>
- Every rewrite must return the same results. Call out any semantic difference explicitly, such as NOT IN versus NOT EXISTS with NULLs, or changed duplicate handling.
- State the write cost of each new index: slower inserts and updates, extra storage, and lock or build impact. For production, use the online or concurrent build option where {{engine}} has one.
- Expected gains are estimates unless the plan proves them. Say which.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Diagnosis
Where the time goes, citing plan nodes and their actual numbers.
## Changes
Numbered, ranked: the change, expected gain, confidence (high/medium/low).
## Rewritten query
A fenced `sql` block, or "No rewrite needed".
## Index changes
Fenced DDL for indexes to add or drop, or "None".
## Trade-offs
Write cost, storage, and any semantic changes.
## Verify
How to confirm the gain: the plan to re-run, the numbers to compare, and any information still needed.
</output_format>
