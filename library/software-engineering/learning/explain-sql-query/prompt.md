---
schema: 1
id: explain-sql-query
kind: prompt
title: Explain a SQL query
description: Explains a complex SQL query clause by clause in logical execution order, shows intermediate results on a tiny example, and points out bugs and performance traps. Use when inheriting a query.
category: learning
version: 1.0.0
status: experimental
stage: [learn, review]
role: [data-analyst, software-engineer, backend-engineer, student]
stack: [sql]
requires: [none]
inputs: [text, schema]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [query-walkthrough, joins, window-functions, null-handling]
pairs_with:
  prompts: [optimize-sql-query, review-analysis-sql, explain-concept-with-code, answer-question-with-sql]
  rules: [sql-style-rules]
args:
  - name: query
    description: The SQL query to explain, complete and as it runs.
    type: text
    required: true
  - name: schema
    description: Table definitions or column lists for the tables used, with keys and what a row represents, if known.
    type: text
  - name: dialect
    description: The database dialect (PostgreSQL, MySQL, SQL Server, BigQuery, Snowflake, SQLite). Affects functions, NULL handling and grouping rules.
    type: string
  - name: audience
    description: How much SQL the reader knows. Beginner knows basic SELECT, WHERE and JOIN; intermediate is comfortable with grouping and subqueries; expert wants the traps without definitions.
    type: enum
    enum: [beginner, intermediate, expert]
    default: beginner
output_contract:
  format: markdown
  sections: [In one sentence, Execution order, Worked example, Bugs and traps, Simpler version, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SQL is written in one order and evaluated in another: the `SELECT` list comes first on the page but is computed almost last. People who inherit a long query read it top to bottom and miss what actually shapes the result: a `WHERE` condition that silently turns a `LEFT JOIN` into an inner join, a join that multiplies rows before a `SUM`, `NOT IN` against a list that contains `NULL`. Watching a few rows flow through each step makes these visible in a way that prose does not.
</context>

<task>
Explain this query{{#dialect}} ({{dialect}}){{/dialect}}:

```sql
{{query}}
```
{{#schema}}

Schema:
{{schema}}
{{/schema}}

1. Say in one plain sentence what the query returns and what one row of the result represents (one customer, one customer per month, one order line).
2. Walk through it in logical evaluation order: CTEs in dependency order, then `FROM` and each `JOIN` with its condition and join type, `WHERE`, `GROUP BY`, aggregates, `HAVING`, window functions, `SELECT` expressions, `DISTINCT`, `ORDER BY`, `LIMIT` or `OFFSET`. For each clause, say what it does to the set of rows in plain words (keeps, drops, multiplies, collapses, adds a column) and why the author probably wrote it.
3. Build a tiny example dataset of three to six rows per table that exercises the interesting cases: an unmatched row for each outer join, a `NULL` where it matters, a duplicate key that causes fan-out, a group with one row and one with several. Show the intermediate result after each step that changes the rows, as small tables, ending with the final result. If the schema is not given, infer the columns from the query, label the inference, and keep the example consistent with it.
4. Point out bugs and traps, each tied to a line of the query and shown on the example data where possible:
   - Correctness: outer joins undone by `WHERE` conditions on the outer table, `NOT IN` with `NULL`s, `COUNT(*)` versus `COUNT(column)` after outer joins, sums inflated by one-to-many joins, `BETWEEN` on timestamps that drops the last day, integer division, ambiguous grouping in permissive dialects, `DISTINCT` hiding a join problem, window frames that default to `RANGE`, time-zone conversions.
   - Performance: functions or casts on filtered columns that prevent index use, leading-wildcard `LIKE`, correlated subqueries run per row, `SELECT *` in subqueries, sorting large sets for `LIMIT` with a big `OFFSET`.
   Mark which are definite and which depend on data you have not seen.
5. If the query can be written more clearly with the same result, show the simpler version and confirm it returns the same rows on the example data. Skip this if the query is already clear.

Pitch it at the {{audience}} level. For beginner, assume only basic `SELECT`, `WHERE` and `JOIN`, and define every other term (evaluation order, fan-out, window function) the first time you use it. For intermediate, define only window functions, recursive CTEs and dialect-specific features. For expert, skip definitions and spend the words on the traps and the evaluation order.

Scale the answer to the query. For a short query with no joins, aggregates, subqueries or window functions, show only the input table and the final result in the worked example and keep every section to a few lines.
</task>

<constraints>
- Follow the named dialect's rules. If no dialect is given, use standard SQL and note where common dialects behave differently for this query.
- Example data must be small and obviously fictional.
- Do not claim a performance problem without saying what it depends on (table size, indexes, the plan).
{{> output/uncertainty}}
</constraints>

<output_format>
## In one sentence
What it returns and what one row means.

## Execution order
Numbered steps in evaluation order, each naming the clause and what it does to the rows.

## Worked example
The input tables, then the intermediate tables after each step that changes the rows, then the final result.

## Bugs and traps
Numbered. Each: the line, the problem, a demonstration on the example data, and the fix. "None found" if there are none.

## Simpler version
A `sql` code block and one line on why it is equivalent, or "Not needed."

## Questions
Anything about the data or intent that would change the explanation.
</output_format>
