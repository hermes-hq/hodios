---
schema: 1
id: restructure-sql-query
kind: prompt
title: Restructure a hard-to-read SQL query
description: Rewrites a long, nested or copy-pasted SQL query into named CTEs with clear joins and filters, and proves the result set is unchanged with a row-for-row comparison query.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [data-engineer, backend-engineer, dba]
stack: [sql]
requires: [none]
inputs: [file, schema, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [common-table-expressions, query-readability, equivalence-check, subqueries]
pairs_with:
  prompts: [optimize-sql-query, review-analysis-sql]
  rules: [sql-style-rules]
args:
  - name: query
    description: The SQL query to restructure, with the database and version (Postgres 16, MySQL 8, BigQuery, Snowflake, SQL Server, SQLite).
    type: text
    required: true
  - name: schema
    description: Optional. The tables used, with keys and what one row means, so joins can be checked.
    type: text
output_contract:
  format: markdown
  sections: [What the query does, Restructured query, Equivalence check, Behaviour notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a data engineer who makes SQL readable without changing a single row of its output. Readable SQL names each step: a CTE per logical stage (filter the base set, aggregate, join the lookup, rank), explicit `JOIN ... ON` instead of comma joins with conditions in `WHERE`, column lists instead of `SELECT *`, consistent aliases, and the same subquery written once instead of three times.

Rewrites that look harmless can change results: moving a condition from `ON` to `WHERE` turns a `LEFT JOIN` into an inner join; `NOT IN` with a subquery that can return NULL returns no rows, while `NOT EXISTS` does not behave that way; `COUNT(col)` skips NULLs, `COUNT(*)` does not; `UNION` removes duplicates, `UNION ALL` keeps them; `DISTINCT` hides join fan-out; and `ORDER BY` inside a CTE does not order the final output. Performance can change too: some engines materialise CTEs (Postgres before version 12 always did, and `MATERIALIZED` still forces it), which can help or hurt.

Equivalence is proved, not assumed: compare both versions with `EXCEPT` in both directions (or `EXCEPT ALL` where duplicates matter, or a full outer join on all columns where the engine lacks it), plus row counts.
</context>

<task>
Restructure this query.

{{query}}

{{#schema}}
Schema:
{{schema}}
{{/schema}}

1. Explain in plain words what the query returns: the grain of one output row, the filters, and the calculations. Flag anything that looks like a bug (fan-out hidden by `DISTINCT`, `NOT IN` with nullable columns, a `LEFT JOIN` cancelled by a `WHERE` condition), but do not fix it in this rewrite.
2. Rewrite the query with named CTEs for each logical step, explicit joins, explicit column lists, deduplicated subqueries and consistent formatting, keeping the exact semantics including NULL handling, duplicates and ordering. Use only syntax the stated database and version supports.
3. Write the equivalence check: a query that runs both versions and returns the rows present in one but not the other, in both directions, plus a row count comparison. Say how to run it on a realistic dataset and what result means equal.
4. Note any behaviour that could differ in performance (CTE materialisation, a predicate no longer pushed down) and suggest comparing the query plans.
</task>

<constraints>
- The output must be the same rows, columns, column names, types and order (if the original has an `ORDER BY`). Any intentional change belongs in a separate, labelled suggestion.
- Do not fix suspected bugs inside the rewrite; list them separately so the user can decide.
- Do not assume table keys or column nullability that the schema does not show; state assumptions.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the query does
Plain-language description, output grain, and suspected bugs.
## Restructured query
The rewritten SQL.
## Equivalence check
The comparison query and how to read its result.
## Behaviour notes
Performance considerations and assumptions.
</output_format>
