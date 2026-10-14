---
schema: 1
id: build-date-spine-for-metrics
kind: prompt
title: Build a date spine for metrics
description: Builds a calendar or date spine so daily, weekly or monthly metrics show zero-activity periods, with joins that neither drop periods nor duplicate rows, in your SQL dialect or pandas.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, business-analyst, data-engineer, data-scientist]
stack: [sql, pandas]
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
tags: [date-spine, calendar-table, time-series, zero-fill, analytics-sql]
pairs_with:
  prompts: [write-window-function-query, answer-question-with-sql]
args:
  - name: metric
    description: The metric and its period, for example "daily orders per store for the last 90 days" or "weekly signups since January, weeks starting Monday".
    type: text
    required: true
  - name: schema
    description: The fact table (columns, types, timestamp column and its time zone) and any dimension that also needs every combination, such as a stores table.
    type: text
    required: true
  - name: tool
    description: Where the query runs.
    type: enum
    enum: [postgres, bigquery, snowflake, mysql, sql-server, redshift, duckdb, pandas]
    default: postgres
output_contract:
  format: markdown
  sections: [Why a spine, Spine, Metric query, Choices made, Check it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analyst who has seen many charts that skip the days nothing happened. Grouping a fact table by date only returns dates that have rows, so a quiet Sunday disappears, a line chart draws straight through it, moving averages average over the wrong number of days, and LAG compares with the wrong period. The fix is a spine: one row per period (and per entity, if each store or product needs its own zeros), left-joined to the aggregated facts with COALESCE to zero. The usual mistakes in building it: joining raw facts instead of pre-aggregated ones; putting a filter on the fact table in WHERE, which turns the LEFT JOIN back into an inner join; truncating timestamps in UTC when the business day is local; inconsistent week starts (ISO Monday versus Sunday); and a spine whose end date includes today's partial period without saying so.
</context>

<task>
Build a spine and the metric in {{tool}}:

<metric>
{{metric}}
</metric>

<schema>
{{schema}}
</schema>

1. State the period unit, the week start if weekly, the time zone used to assign events to periods, and the start and end of the spine (and whether the current, incomplete period is included).
2. Generate the spine with {{tool}} features (generate_series, GENERATE_DATE_ARRAY with UNNEST, a GENERATOR or row-number table in Snowflake, a recursive CTE in MySQL or SQL Server, pandas date_range), or use an existing calendar table if the schema has one.
3. If the metric is per entity, cross join the spine with the entity list, and say which entities are included (all, or only those active in the range).
4. Aggregate the facts to the same period and entity grain in a separate CTE, converting timestamps to the stated time zone before truncating.
5. Left join the spine to the aggregate, put fact filters inside the aggregate CTE (not in the outer WHERE), and COALESCE counts and sums to zero. Leave averages and rates NULL where the denominator is zero, and say why.
6. Give checks that the result has exactly one row per period (and entity) and that totals match the raw table.
</task>

<constraints>
- Use only syntax that exists in {{tool}}. Recursive CTEs have depth limits: MySQL stops at cte_max_recursion_depth (1000 by default) and SQL Server at 100 unless OPTION (MAXRECURSION 0) is added; Redshift's generate_series runs only on the leader node and cannot be joined to tables, so use a recursive CTE or a numbers table there. In pandas, a W-<day> frequency names the day the week ends, so Monday-start weeks need W-SUN periods or resample('W-MON', closed='left', label='left').
- Zero-fill counts and sums only; never fill a ratio, average or balance with zero without saying it is a choice.
- Never join raw fact rows to the spine and aggregate afterwards when the facts have their own joins; aggregate first.
- If the time zone of the timestamp column is unknown, ask or state the assumption plainly.
- If the schema has no timestamp or date column for the metric, say so and ask.
- Read-only: no DDL or writes; if a permanent calendar table would help, describe it but do not create it.
</constraints>

<output_format>
## Why a spine
One or two sentences on what goes wrong for this metric without one.

## Spine
The code that generates the periods (and entities).

## Metric query
One code block joining the spine to the aggregate.

## Choices made
Bullets: period, week start, time zone, range, partial period, entity list, zero versus NULL.

## Check it
A row-count check and a total check.
</output_format>
