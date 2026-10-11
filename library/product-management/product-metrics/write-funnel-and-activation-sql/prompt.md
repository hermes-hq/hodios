---
schema: 1
id: write-funnel-and-activation-sql
kind: prompt
title: Write activation and funnel SQL
description: Writes SQL for activation rate and ordered conversion funnels from an event table, with conversion windows, strict step order, time zones, internal users, bots and late-arriving events handled.
category: product-metrics
version: 1.0.0
status: incubating
stage: [build, review]
role: [data-analyst, product-manager, data-scientist, data-engineer]
stack: [sql]
requires: [none]
inputs: [schema, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [funnel-sql, activation-rate, conversion-window, event-data, analytics-sql, late-events]
pairs_with:
  prompts: [define-activation-metric, analyze-conversion-funnel, calculate-active-users-in-sql, build-cohort-analysis]
args:
  - name: event_table
    description: The event table or tables (columns, types, timestamp time zone, ingestion timestamp if any), how users are identified, and known junk (test or staff accounts, bots, background events).
    type: text
    required: true
  - name: metrics
    description: What to compute, for example "activation = created 1 project and invited 1 teammate within 7 days of signup" and "funnel = visit pricing, start checkout, pay, within 3 days, by weekly signup cohort".
    type: text
    required: true
  - name: dialect
    description: SQL dialect the query must run on.
    type: enum
    enum: [postgres, bigquery, snowflake, redshift, mysql, sql-server, duckdb, clickhouse]
    default: postgres
output_contract:
  format: markdown
  sections: [Definitions, Query, Edge cases handled, Check it, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analytics engineer who has rebuilt the same activation and funnel numbers after three dashboards disagreed. The disagreements come from a few decisions, not arithmetic. A funnel can count any user who ever did each step (loose) or only users who did the steps in order, each after the previous one (strict), and the two can differ by half. Conversion needs a window anchored on the first step or on signup, otherwise old cohorts look better simply because they had longer. A cohort is only judged once every member has had the full window, so the latest cohorts must be cut or flagged. Activation is a share of a signup cohort, never "activated users this week divided by signups this week". Staff, test accounts, bots and passive events (push received, background sync) must go before counting, and the day boundary depends on the time zone chosen. Late-arriving events (mobile offline batches) change recent numbers after they are first reported, so recent windows need a settling period based on ingestion lag.
</context>

<task>
Write {{dialect}} SQL for these metrics.

<event_table>
{{event_table}}
</event_table>

<metrics>
{{metrics}}
</metrics>

1. Write the definitions: the cohort anchor (signup or first step), qualifying events per step, strict or loose order (default strict and say so), the conversion window, exclusions, identity rule, time zone and settling period.
2. Build a cleaned events CTE: exclusions applied, passive events removed, identities resolved, timestamps converted to the chosen time zone.
3. Build one row per user with the first time of each step that happened after the previous step and inside the window. Compute steps in sequence: step one's first time per user, then step two as the MIN of qualifying events later than that time and inside the window, and so on, grouping back to one row per user at each stage so repeated events never multiply rows. A single conditional MIN per step does not enforce order.
4. Aggregate by cohort: users entering, reaching each step, step and overall conversion, and median time between steps. Flag or drop cohorts that have not had the full window plus settling period.
5. For activation, compute the share of each signup cohort that met the rule within its window.
6. Give checks that prove the query is right.
</task>

<constraints>
- Only use columns that are described; if a needed column (user id, timestamp, event name) is missing, ask and stop.
- Stay on funnels and activation; if the request also asks for active-user counts or a full retention triangle, say those need their own query and do not bolt them on here.
- Never divide this period's step-two count by this period's step-one count across different users; follow the same users through the funnel.
- Keep cohorts that are too young out of reported rates or label them clearly.
- Comment each CTE in one line; use named CTEs, no clever one-liners.
- Read-only: no DDL, inserts or deletes.
{{> output/uncertainty}}
</constraints>

<output_format>
## Definitions
Bullets for anchor, steps, order, window, exclusions, identity, time zone, settling period.

## Query
Code blocks with named CTEs: clean events, user steps, cohort funnel, activation.

## Edge cases handled
Bullets: out-of-order steps, repeated steps, users with several ids, young cohorts, late events, staff and bots.

## Check it
Checks such as each step count being at most the previous one, a hand-traced sample of five users, and totals matching a simple count of first-step users.

## Questions
Decisions the user should confirm.
</output_format>
