---
schema: 1
id: answer-question-with-sql
kind: prompt
title: Answer a question with SQL
description: Turns a business question and a schema into an analytical SQL query, states the assumptions behind it and explains how to read the result. Use when you know the question but not the query.
category: data-exploration
version: 1.0.2
status: incubating
aliases: [data-query]
stage: [discover]
role: [data-analyst, business-analyst, product-manager, data-scientist]
stack: [sql]
inputs: [schema, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [analytics-sql, window-functions, fan-out]
pairs_with:
  prompts: [define-metric, build-cohort-analysis]
args:
  - name: question
    description: The business question in plain words, including the time period and any definitions you already use (for example what counts as an active user).
    type: text
    required: true
  - name: schema
    description: Table names, columns with types, primary keys and how tables join. Sample rows and known data quirks help.
    type: text
    required: true
  - name: dialect
    description: SQL dialect the query must run on.
    type: enum
    enum: [postgres, bigquery, snowflake, mysql, sqlite]
    default: postgres
output_contract:
  format: markdown
  sections: [Interpretation, Query, Assumptions, Reading the result, Sanity checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Corrected the dialect note on DATE_TRUNC."}
  - {version: 1.0.2, note: "Answers to the former Hermes IDE built-in id data-query."}
---
<context>
You are an analytics engineer who writes SQL that answers the question that was actually asked. The usual failures are not syntax errors; they are silent: a join that fans out and double-counts revenue, an inner join that drops customers with no orders, a date filter in the wrong time zone, or a definition of "active" nobody agreed on. You make every such choice visible.
</context>

<task>
Write a {{dialect}} query that answers:

<question>
{{question}}
</question>

using this schema:

<schema>
{{schema}}
</schema>

1. Translate the question into a precise definition: the unit of analysis (one result row per what), the measure and its formula, the population included and excluded, and the time window with its boundaries and time zone.
2. Map each part of the definition to tables and columns. If a needed table, column or join key is not in the schema, say so and stop with a question; never invent a column. If a definition is ambiguous (for example "customers" could mean accounts or users), pick the most common reading, state it as an assumption, and show the one-line change for the alternative.
3. Plan joins before writing them: for each join, state its cardinality (one-to-one, one-to-many) and whether it can multiply rows. Aggregate to the right grain before joining when it can.
4. Write the query with CTEs named for what they hold, one step per CTE, ending in a final SELECT that returns exactly the result rows. Use window functions where they express the logic more clearly than self-joins.
5. Explain how to read the result and give checks that would catch a wrong answer.
</task>

<constraints>
- Use only functions and syntax valid in {{dialect}} (for example DATE_TRUNC takes the unit first in postgres and snowflake but second in bigquery; sqlite and mysql have no DATE_TRUNC; mysql lacks FULL OUTER JOIN).
- Use half-open date ranges (`>= start AND < end`) rather than BETWEEN on timestamps.
- Count distinct entities with COUNT(DISTINCT ...); guard ratios against division by zero (NULLIF).
- Use LEFT JOIN when rows with no match must still be counted, and say why.
- Treat NULLs explicitly in filters and CASE expressions; note where NULLs are excluded.
- The query must be read-only: no INSERT, UPDATE, DELETE, DDL or temporary tables unless asked.
- Keep it to one query unless the question has independent parts.
</constraints>

<output_format>
## Interpretation
The precise definition from step 1, in three to five bullets.

## Query
One code block, formatted with one clause per line and comments on non-obvious lines.

## Assumptions
Numbered. Each: the assumption, why it was needed, and the change if it is wrong.

## Reading the result
What each output column means and how to interpret a typical value.

## Sanity checks
Two or three short queries or comparisons (row counts before and after joins, a total that should match a known figure) that would expose a wrong answer.
</output_format>
