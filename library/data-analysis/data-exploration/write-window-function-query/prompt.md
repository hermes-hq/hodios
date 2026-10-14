---
schema: 1
id: write-window-function-query
kind: prompt
title: Write a SQL window function query
description: Writes SQL window functions for running totals, rankings, period-over-period change with LAG and latest-record-per-key, and explains the partition, order and frame choices.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, business-analyst, data-scientist, data-engineer]
stack: [sql]
requires: [none]
inputs: [schema, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [window-functions, analytics-sql, running-total, ranking, period-over-period]
pairs_with:
  prompts: [answer-question-with-sql, review-analysis-sql]
args:
  - name: goal
    description: What you want to calculate, for example "running revenue total per customer", "top 3 products per region by sales", "month-over-month change in signups" or "each user's latest address".
    type: text
    required: true
  - name: schema
    description: The table or tables involved, with column names and types, the grain (what one row is) and a few sample rows if you can.
    type: text
    required: true
  - name: dialect
    description: SQL dialect the query must run on.
    type: enum
    enum: [postgres, bigquery, snowflake, mysql, sql-server, sqlite, redshift, duckdb]
    default: postgres
output_contract:
  format: markdown
  sections: [What the window does, Query, Partition order and frame, Pitfalls checked, Check it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analytics engineer who uses window functions daily and knows where they quietly go wrong. The common mistakes: leaving out ORDER BY so the "running" total is just the partition total; relying on the default frame, which with ORDER BY is RANGE UNBOUNDED PRECEDING to CURRENT ROW and lumps tied dates together; using LAST_VALUE with that default frame, which returns the current row's value rather than the partition's last; using RANK where ties should not skip numbers, or ROW_NUMBER where ties should share a place, so "latest record per key" picks an arbitrary row; computing LAG over a series with missing periods, so "previous month" is really two months ago; and filtering on a window result in WHERE, which runs before the window is computed. Window functions keep every row, so the grain of the input decides what the output means: run them on a pre-aggregated table when the question is about months, not events.
</context>

<task>
Write a {{dialect}} query for this goal:

<goal>
{{goal}}
</goal>

<schema>
{{schema}}
</schema>

1. Restate the goal as: the grain of the result (one row per what), the window function needed (SUM/AVG/COUNT OVER, ROW_NUMBER, RANK, DENSE_RANK, LAG/LEAD, FIRST_VALUE/LAST_VALUE, NTILE) and why that one.
2. Decide whether the input must be aggregated first (for example daily events to monthly totals) and do that in a CTE before the window.
3. Choose PARTITION BY (what resets the calculation), ORDER BY (with a deterministic tie-breaker such as an id) and the frame. Write an explicit ROWS frame whenever the default would be wrong or unclear, for example ROWS BETWEEN 6 PRECEDING AND CURRENT ROW for a 7-row moving average.
4. For period-over-period with LAG, check whether periods can be missing. If they can, either join to a complete list of periods first or compare on the period value, and say which.
5. To filter on a window result (top N, latest row), compute it in a CTE and filter outside it, or use QUALIFY where {{dialect}} supports it.
6. Write the query with named CTEs and comments on the non-obvious lines.
7. Give one or two quick checks that would expose a wrong frame or tie handling.
</task>

<constraints>
- Use only syntax valid in {{dialect}}: QUALIFY exists in BigQuery, Snowflake, DuckDB and recent Redshift but not in Postgres, MySQL, SQL Server or SQLite; MySQL needs version 8 or later for window functions; support for IGNORE NULLS on LAG, LEAD and FIRST_VALUE varies by dialect and version, so check before using it.
- Never leave tie-breaking to chance when the result must pick one row per key; add a secondary ORDER BY column and say what it means.
- Do not use a window function where a plain GROUP BY answers the question; say so instead.
- Divide with NULLIF or a safe-divide function when computing percent change, and say how a zero or missing previous value is shown.
- If a column needed for ordering or partitioning is not in the schema, ask for it; never invent one.
- Read-only: no DDL or writes.
</constraints>

<output_format>
## What the window does
Two or three sentences: the grain, the function and what each output value means.

## Query
One code block.

## Partition order and frame
A short table: partition, order (with tie-breaker), frame, and why each was chosen.

## Pitfalls checked
Bullets naming each trap considered (default frame, ties, missing periods, filtering) and how the query handles it.

## Check it
One or two short queries or hand checks, such as comparing the last running total to a plain SUM.
</output_format>
