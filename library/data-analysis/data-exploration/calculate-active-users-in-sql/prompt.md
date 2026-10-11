---
schema: 1
id: calculate-active-users-in-sql
kind: prompt
title: Calculate active users in SQL
description: Computes DAU, WAU, MAU, rolling 7- and 28-day active users and stickiness from an event table, with deduplicated users, correct trailing windows and test traffic excluded.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, product-manager, data-scientist, founder]
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
tags: [active-users, dau-mau, stickiness, event-data, analytics-sql]
pairs_with:
  prompts: [define-engagement-metric, build-cohort-analysis, build-date-spine-for-metrics]
args:
  - name: event_table
    description: The event table (columns, types, timestamp time zone), how users are identified (user id, anonymous id, both) and what is in it that is not real usage (test accounts, bots, background or system events).
    type: text
    required: true
  - name: active_definition
    description: What counts as active, for example "any event except push_received" or "opened a document". If you have not decided, say so and the prompt will propose one and flag it.
    type: text
    required: true
  - name: dialect
    description: SQL dialect the query must run on.
    type: enum
    enum: [postgres, bigquery, snowflake, redshift, mysql, sql-server, duckdb, clickhouse]
    default: postgres
output_contract:
  format: markdown
  sections: [Definitions, Query, Reading the numbers, Pitfalls checked, Check it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product analyst who has computed active users at several companies and seen the numbers disagree across dashboards. The disagreements come from definitions and windows, not arithmetic. Calendar MAU (users active in September) and rolling 28-day active users (users active in the 28 days ending on each day) are different metrics; summing daily active users never gives weekly or monthly actives, because the same user is counted every day; DAU/MAU stickiness needs both from the same trailing window ending on the same day; passive events (push received, background sync, email open) inflate counts; one person can appear under an anonymous id and a logged-in id; and the day boundary depends on time zone. Rolling distinct counts are expensive: a self-join of a daily user table to a date spine over the trailing window is the honest method, and approximate distinct functions are fine for trends but not for reported figures.
</context>

<task>
Compute active users in {{dialect}}.

<event_table>
{{event_table}}
</event_table>

<active_definition>
{{active_definition}}
</active_definition>

1. Write the definitions: qualifying events, excluded users and events, user identity rule, day boundary and time zone, and the exact windows (daily; calendar week and month, or trailing 7 and 28 days ending on each date).
2. Build a CTE with one row per user per active day after filtering and identity resolution.
3. Compute DAU from it, calendar WAU and MAU with COUNT(DISTINCT) by truncated period, and rolling 7- and 28-day actives by joining a date spine to the daily user table on the trailing window and counting distinct users.
4. Compute stickiness as average DAU over the window divided by the rolling 28-day actives ending on the same day (or DAU/MAU as the user defines it), and say which form you used.
5. Explain how to read the numbers and how they relate (rolling 28-day actives are smoother than calendar MAU; the latest periods are incomplete).
6. Give checks.
</task>

<constraints>
- Never derive WAU or MAU by summing or averaging DAU.
- Use exact COUNT(DISTINCT) for reported figures; mention approximate functions (APPROX_COUNT_DISTINCT, HyperLogLog) only as a cost option for trends, labelled as approximate.
- If the active definition is not decided, propose one based on a meaningful action, mark it as a proposal, and show where to change it.
- If the table has no user identifier or timestamp, ask; do not invent columns.
- Flag the current day, week or month as partial.
- Read-only: no DDL or writes.
</constraints>

<output_format>
## Definitions
Bullets: qualifying events, exclusions, identity, time zone, windows.

## Query
One or more code blocks with named CTEs: daily users, DAU, calendar WAU and MAU, rolling actives, stickiness.

## Reading the numbers
How the metrics relate and what a typical stickiness value means for this kind of product use, without inventing industry benchmarks.

## Pitfalls checked
Bullets: summing DAU, passive events, identity, time zone, partial periods.

## Check it
Checks such as rolling 28-day actives being at least the highest DAU in the window, and calendar MAU being at most the number of distinct users in the table.
</output_format>
