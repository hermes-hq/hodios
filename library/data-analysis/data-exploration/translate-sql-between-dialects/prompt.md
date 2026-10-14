---
schema: 1
id: translate-sql-between-dialects
kind: prompt
title: Translate SQL between dialects
description: Translates an analytical SQL query between Postgres, MySQL, SQL Server, BigQuery, Snowflake and others, and flags every date, string, NULL, division and rounding difference that could change results.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, data-engineer, business-analyst, data-scientist]
stack: [sql]
requires: [none]
inputs: [text]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [sql-dialects, query-translation, analytics-sql, warehouse-migration]
pairs_with:
  prompts: [review-analysis-sql, answer-question-with-sql]
args:
  - name: query
    description: The SQL query to translate, complete, with any notes on what it is meant to return.
    type: text
    required: true
  - name: from_dialect
    description: The dialect the query is written in.
    type: enum
    enum: [postgres, mysql, sql-server, bigquery, snowflake, redshift, oracle, sqlite, duckdb, spark-sql]
    default: postgres
  - name: to_dialect
    description: The dialect it must run on.
    type: enum
    enum: [postgres, mysql, sql-server, bigquery, snowflake, redshift, oracle, sqlite, duckdb, spark-sql]
    default: bigquery
output_contract:
  format: markdown
  sections: [Translated query, Changes, Behaviour differences, Parity check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analyst who has moved reports between warehouses and knows that a query that runs is not the same as a query that returns the same numbers. Syntax changes are the easy part (DATE_TRUNC argument order, LIMIT versus TOP, identifier quoting, ILIKE). The silent ones matter more: integer division (5/2 is 2 in Postgres and SQL Server, 2.5 in MySQL, BigQuery and Snowflake); string comparison that is case-insensitive under a MySQL or SQL Server collation but case-sensitive elsewhere; empty string versus NULL (Oracle treats them as the same); CONCAT versus || with NULLs; timestamps with or without time zone and the session time zone each engine assumes; week numbering and week start; ROUND of halves on floats; DATEDIFF that counts boundaries crossed rather than elapsed time; and NULL ordering defaults (NULLS LAST versus FIRST).
</context>

<task>
Translate this query from {{from_dialect}} to {{to_dialect}}:

<query>
{{query}}
</query>

1. Read the query and state in one sentence what it returns.
2. Rewrite it for {{to_dialect}}, keeping the structure and CTE names so the two versions can be compared side by side.
3. List every change, from syntax to function to type.
4. Go through the silent-difference checklist for this pair of dialects (division, case sensitivity, NULL and empty string, concatenation, time zones, week and date-part functions, DATEDIFF semantics, rounding, NULL ordering, implicit casts) and report each one that applies to this query, with how the translation handles it.
5. Where an exact equivalent does not exist, give the closest option and say how results may differ.
6. Give a parity check to run on both systems.
</task>

<constraints>
- Only use functions that exist in {{to_dialect}}; if unsure whether a function exists in a specific version, say so.
- Preserve results, not just syntax: when a direct translation would change numbers, adjust it (for example cast to decimal before dividing) and explain.
- Do not change the logic or "improve" the query beyond what the translation needs; list optional improvements separately if they are important.
- If the query relies on a table, user-defined function or setting not shown, flag it rather than guessing its behaviour.
- Read-only: translate data-modifying statements only if they were in the input, and say so.
</constraints>

<output_format>
## Translated query
One code block.

## Changes
A table: original, translated, reason.

## Behaviour differences
Bullets for each silent difference that applies, and "Checked, not affected" for the important ones that do not.

## Parity check
A query (or pair) to run on both systems, such as row counts and sums by a key column, and what to compare.
</output_format>
