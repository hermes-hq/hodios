---
schema: 1
id: map-unfamiliar-database
kind: prompt
title: Map an unfamiliar database for analysis
description: Gives the read-only queries to map a database or warehouse you have just been given access to (tables, row counts, grain, keys, freshness, joins), then writes a short field guide for analysis.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, data-scientist, business-analyst, product-manager]
stack: [sql]
requires: [none]
inputs: [schema, text]
output: [code, docs, questions]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [schema-discovery, information-schema, data-freshness, analytics-sql]
pairs_with:
  prompts: [explore-dataset, check-tables-before-joining, write-data-dictionary]
args:
  - name: what_you_have
    description: The database or warehouse type, the schemas or datasets you can see, and anything already pasted (a table list, column list or output of earlier queries).
    type: text
    required: true
  - name: questions_to_answer
    description: The questions you were hired or asked to answer with this data, for example "weekly revenue by channel" or "why churn went up".
    type: text
    required: true
  - name: dialect
    description: The database engine.
    type: enum
    enum: [postgres, mysql, sql-server, bigquery, snowflake, redshift, duckdb, oracle]
    default: postgres
output_contract:
  format: markdown
  sections: [Discovery queries, What the results show, Field guide, Questions for the data owner, Next queries]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior analyst starting at a new company with access to a database nobody has documented. Engineers reverse-engineer a schema to change it; you need to know which tables to trust for numbers. What matters: the grain of each table (one row per order, per order line, per event, per daily snapshot), which tables are raw, which are cleaned models, and which are abandoned copies (names ending in _old, _bak, _v2, _tmp); how fresh each is; what the keys really are, regardless of what the names suggest; soft deletes and test accounts; and which of several revenue-like columns finance actually reports. Catalogue row counts are estimates in Postgres and MySQL (InnoDB), and views or external tables show none, so you check exact counts only on the tables that matter and keep scans cheap on pay-per-query warehouses, where LIMIT does not reduce the bytes billed.
</context>

<task>
Help me map this {{dialect}} database for analysis.

<what_you_have>
{{what_you_have}}
</what_you_have>

<questions_to_answer>
{{questions_to_answer}}
</questions_to_answer>

1. If no output has been pasted yet, give a short set of read-only discovery queries for {{dialect}}: tables and views per schema with estimated row counts and size from the system catalogue or INFORMATION_SCHEMA; columns with types; declared primary and foreign keys; and last modified time where the engine exposes it. Keep them cheap.
2. When results are pasted, sort tables into likely raw, modelled, lookup, snapshot, log and abandoned, with the evidence for each (names, sizes, freshness, column patterns).
3. Pick the five to ten tables most relevant to the stated questions. For each, give targeted queries: exact row count, a uniqueness check on the candidate key, min and max of the main date column, and the share of NULLs in key columns.
4. Infer join paths between the chosen tables from names and types, and give a query to test each join (match rate in both directions).
5. Write a field guide: per chosen table, its grain, key, freshness, what it is good for and its traps.
6. List questions only the data owner can answer, and stop to wait for pasted results where needed.
</task>

<constraints>
- Only read-only statements; no DDL, writes or long-running full scans on large tables without warning about cost or load.
- Mark every statement about a table as confirmed (from a query result) or inferred (from names); never present a guess about meaning as fact.
- On BigQuery and Snowflake, prefer metadata views (INFORMATION_SCHEMA) to scanning tables, filter on partition or clustering columns, select only needed columns, and say roughly what a query will scan; LIMIT alone does not cut the cost.
- Do not invent tables or columns that were not in the pasted lists.
- Flag tables that look like they hold personal data and suggest selecting only the needed columns.
</constraints>

<output_format>
## Discovery queries
Numbered code blocks with one line each on what they show.

## What the results show
Table classification with evidence, or "Waiting for results" if nothing was pasted.

## Field guide
A table: name, grain, key, freshness, use it for, watch out for, confirmed or inferred.

## Questions for the data owner
Numbered, specific.

## Next queries
The targeted checks for the chosen tables and joins.
</output_format>
