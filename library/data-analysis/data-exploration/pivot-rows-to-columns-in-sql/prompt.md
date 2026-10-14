---
schema: 1
id: pivot-rows-to-columns-in-sql
kind: prompt
title: Pivot rows to columns in SQL
description: Turns rows into columns, or columns back into rows, in SQL with conditional aggregation or PIVOT and UNPIVOT, and handles a column list that changes over time for your dialect.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, business-analyst, financial-analyst, data-engineer]
stack: [sql]
requires: [none]
inputs: [schema, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [pivot, unpivot, conditional-aggregation, crosstab, analytics-sql]
pairs_with:
  prompts: [answer-question-with-sql, write-window-function-query]
args:
  - name: reshape
    description: What the result should look like, for example "one row per store, one column per month of 2026 with sales" or "turn the q1..q4 columns into rows". A sketch of the desired output helps.
    type: text
    required: true
  - name: schema
    description: The source table with column names and types, what one row is, and the distinct values of the column that becomes headers if you know them.
    type: text
    required: true
  - name: dialect
    description: SQL dialect the query must run on.
    type: enum
    enum: [postgres, bigquery, snowflake, mysql, sql-server, sqlite, redshift, duckdb, oracle]
    default: postgres
output_contract:
  format: markdown
  sections: [Shape, Query, Dynamic columns, Pitfalls checked, Check it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analyst who reshapes data in SQL for reports and exports. Conditional aggregation (SUM(CASE WHEN month = 1 THEN amount END) AS jan) works in every dialect and is easiest to read and to check; native PIVOT exists in SQL Server, Oracle, Snowflake, BigQuery, Redshift and DuckDB with different syntax, and Postgres offers crosstab only through an extension. The traps: SQL needs the column list at parse time, so "a column for every month that exists" requires either a fixed list, generated SQL, or a dialect feature such as Snowflake's PIVOT ANY or DuckDB's dynamic PIVOT; extra columns in the source silently become grouping columns in native PIVOT and split rows; SUM of no rows gives NULL, not zero; and UNPIVOT drops NULL values by default unless told to include them.
</context>

<task>
Reshape the data in {{dialect}}:

<reshape>
{{reshape}}
</reshape>

<schema>
{{schema}}
</schema>

1. State the target shape: the row key, the column that supplies the new headers (or the columns that become rows), the value and the aggregate (SUM, MAX, COUNT).
2. Pre-select only the needed columns in a CTE so no stray column becomes part of the grouping.
3. Write the pivot with conditional aggregation by default. If {{dialect}} has native PIVOT or UNPIVOT and it is clearer, show that version too.
4. Decide how empty cells appear: NULL or zero (COALESCE), and say which suits the use.
5. If the header values are not fixed, explain the options for {{dialect}}: a fixed list that must be updated, a query that generates the SQL text from the distinct values, or a dialect feature that pivots dynamically. Give the generating query if that is the practical route.
6. Give a check that the reshape lost nothing.
</task>

<constraints>
- Only use syntax that exists in {{dialect}}; do not suggest crosstab for Postgres without saying it needs the tablefunc extension.
- Never invent header values; use the ones given or show how to list them with SELECT DISTINCT.
- Quote generated column names that start with a digit or contain spaces, using the dialect's quoting.
- For UNPIVOT, say whether NULLs are kept and how to keep them if needed.
- Read-only: no DDL or writes; generated SQL is shown for the user to review and run.
</constraints>

<output_format>
## Shape
Row key, header source, value and aggregate, plus a tiny before-and-after example.

## Query
One code block (a second block if a native PIVOT version is shown).

## Dynamic columns
What to do if the header values change, for {{dialect}}; "Not needed" if the list is fixed.

## Pitfalls checked
Bullets: stray grouping columns, NULL versus zero, quoting, NULLs dropped by UNPIVOT.

## Check it
A query that compares the grand total before and after the reshape.
</output_format>
