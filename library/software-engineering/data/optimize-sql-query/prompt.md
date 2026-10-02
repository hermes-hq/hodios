---
schema: 1
id: optimize-sql-query
kind: prompt
title: Optimize a slow SQL query
description: Diagnoses a slow SQL query from its plan and schema, then proposes equivalent rewrites and indexes with the evidence to verify them. Use when a query is slow, times out or loads the database.
category: data
version: 1.0.0
status: experimental
stage: [maintain]
role: [backend-engineer, data-engineer, dba, software-engineer]
stack: [sql]
requires: [none]
inputs: [text, schema]
output: [code, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [query-plan, indexing]
args:
  - name: query
    description: The slow query, with real or representative parameter values.
    type: text
    required: true
  - name: dialect
    description: Database engine the query runs on.
    type: enum
    enum: [postgres, mysql, sqlite, sql-server, oracle, bigquery, snowflake, other]
    default: postgres
  - name: plan
    description: Output of EXPLAIN with actual timings, such as `EXPLAIN (ANALYZE, BUFFERS)` in Postgres or `EXPLAIN ANALYZE` in MySQL 8.
    type: text
  - name: schema
    description: CREATE TABLE statements, existing indexes, and approximate row counts for the tables involved.
    type: text
  - name: workload
    description: How often the query runs, its latency target, and how write-heavy the tables are.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Changes, Rewritten query, Verify, Trade-offs]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most slow queries have one dominant cost: a scan that should be an index lookup, a predicate the planner cannot use, a bad row estimate that picks the wrong join, or a sort or aggregate that spills to disk. The plan shows which one. Advice given without the plan, such as "add an index" or "avoid SELECT *", is guessing, and a rewrite that changes the result set is a bug, not an optimisation.
</context>

<task>
Optimize this {{dialect}} query:
{{query}}
{{#plan}}
Plan:
{{plan}}
{{/plan}}
{{#schema}}
Schema:
{{schema}}
{{/schema}}
{{#workload}}
Workload: {{workload}}
{{/workload}}

1. If there is no plan, say exactly which EXPLAIN command to run for {{dialect}}, give your best provisional diagnosis from the query and schema, and label it provisional.
2. In the plan, find the node or nodes where most time goes. Compare estimated and actual rows; a gap of 10 times or more points at stale or missing statistics or correlated columns.
3. Check the query for patterns that block index use or inflate work: functions or casts on filtered columns, leading-wildcard `LIKE`, `OR` across different columns, implicit type conversion in joins, correlated subqueries, `OFFSET` pagination over large ranges, `DISTINCT` hiding a join fan-out, and columns fetched but not needed.
4. Propose changes, cheapest and safest first: statistics, query rewrites, indexes, then schema or config changes. For an index, give the exact DDL, explain the column order (equality columns first, then range, then sort, plus included columns for an index-only scan), use the non-blocking build option the engine offers, and state the write and storage cost.
5. For each rewrite, show that it returns the same rows: consider NULLs, duplicates, ordering ties and empty inputs.
</task>

<constraints>
- Never change the query's results. If a faster version needs a semantic change, present it separately and say exactly what changes.
- Use syntax and features that exist in {{dialect}}. If you are not sure a feature exists in the user's version, say so.
- Do not quote speed-ups as facts. Say what the plan should show after the change instead.
- Do not suggest running `EXPLAIN ANALYZE` on statements that modify data in production; it executes them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
The dominant cost, with the plan node and numbers that show it. Mark it provisional if there was no plan.

## Changes
Numbered, best first. Each: the change, why it helps this plan, and its cost or risk.

## Rewritten query
The full query, or "No rewrite needed".

## Verify
The commands to run and what the new plan should show (node types, rows, buffers or timing).

## Trade-offs
Write cost of new indexes, locking during the build, and anything that could regress other queries.
</output_format>
