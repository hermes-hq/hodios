---
schema: 1
id: check-tables-before-joining
kind: prompt
title: Check tables before joining them
description: Checks two tables before you join them (key uniqueness, orphan rows, type and format mismatches, expected row counts) so totals do not inflate from fan-out or vanish from failed matches.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, data-scientist, business-analyst, data-engineer]
stack: [sql, pandas]
requires: [none]
inputs: [schema, dataset, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [joins, fan-out, join-keys, data-quality, analytics-sql]
pairs_with:
  prompts: [review-analysis-sql, reconcile-datasets, map-unfamiliar-database]
args:
  - name: tables
    description: The two (or more) tables or files with columns and types, the columns you plan to join on, and a few sample rows of each if you can share them.
    type: text
    required: true
  - name: intent
    description: What the joined result is for, for example "add customer region to each order to total revenue by region".
    type: text
    required: true
  - name: tool
    description: Where the join runs.
    type: enum
    enum: [postgres, bigquery, snowflake, mysql, sql-server, duckdb, pandas]
    default: postgres
output_contract:
  format: markdown
  sections: [Expected cardinality, Diagnostic queries, What to look for, Join to use, Check after joining]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analyst who checks keys before trusting a join. Most wrong totals come from joins that looked fine: a lookup table with two rows for one key (a customer who moved region, a product with two active prices) doubles every matching fact row; keys that differ only by type or format ('00123' versus 123, trailing spaces, upper versus lower case, UUIDs with and without dashes) fail to match and quietly drop rows in an inner join; a slowly changing dimension needs a date condition, not just the key; and NULL keys never match anything. A join is safe when you know, from data rather than names, the cardinality on each side and the match rate in both directions.
</context>

<task>
Check these tables before joining them in {{tool}}.

<tables>
{{tables}}
</tables>

<intent>
{{intent}}
</intent>

1. State the cardinality the intent needs (for example many orders to one customer) and the row count the joined result should have.
2. Give diagnostic queries (or pandas code) for: duplicate keys on the side that should be unique, with examples of duplicated keys; NULL keys on each side; distinct type and length or format patterns of the key on each side; match rate from left to right and right to left; and the row count of the join compared with the left table.
3. For any table with validity dates or a current flag, check overlapping or missing validity ranges and say what condition the join needs.
4. Explain how to read each result and what action follows (deduplicate with a rule, normalise the key with TRIM, LOWER or CAST, add a date condition, use a LEFT JOIN and label unmatched rows).
5. Recommend the join type and key expression for the intent.
6. Give a check after joining: the total of the main measure before and after the join should be equal.
</task>

<constraints>
- Use only syntax valid in {{tool}}; in pandas, use merge with validate= and indicator=True.
- Do not deduplicate by picking an arbitrary row; state the rule (latest by date, active flag) and ask if none is obvious.
- Never recommend an inner join where unmatched rows would silently leave a total the intent depends on without saying what is lost.
- Never assume a key is unique because it is called id; test it.
- Read-only: no DDL or writes.
</constraints>

<output_format>
## Expected cardinality
One or two sentences and the expected joined row count.

## Diagnostic queries
Numbered code blocks, each with one line on what it detects.

## What to look for
A table: check, healthy result, problem result, action.

## Join to use
The recommended join with the key expression and any date condition.

## Check after joining
A before-and-after total check.
</output_format>
