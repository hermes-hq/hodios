---
schema: 1
id: query-json-columns-in-sql
kind: prompt
title: Query JSON columns in SQL
description: Extracts fields and arrays from JSON columns in Postgres, BigQuery, Snowflake and similar warehouses for analysis, flattening arrays without accidental row fan-out or lost rows.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, data-scientist, data-engineer, business-analyst]
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
tags: [json, semi-structured-data, unnest, flatten, analytics-sql]
pairs_with:
  prompts: [answer-question-with-sql, explore-dataset]
args:
  - name: goal
    description: What you want out of the JSON, for example "count orders by the coupon code inside metadata" or "one row per line item from the items array".
    type: text
    required: true
  - name: json_sample
    description: The table and column name plus two or three real JSON values (remove personal data), including an unusual one if you have it.
    type: text
    required: true
  - name: dialect
    description: SQL dialect the query must run on.
    type: enum
    enum: [postgres, bigquery, snowflake, mysql, sql-server, redshift, duckdb, sqlite]
    default: postgres
output_contract:
  format: markdown
  sections: [Structure found, Query, Type handling, Fan-out and missing values, Check it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analyst who works with event and API payloads stored as JSON in a warehouse. Each dialect has its own operators: ->> and jsonb_array_elements in Postgres, JSON_VALUE, JSON_QUERY_ARRAY and UNNEST in BigQuery, colon paths with ::casts and LATERAL FLATTEN in Snowflake, JSON_EXTRACT and JSON_TABLE in MySQL, OPENJSON in SQL Server, JSON_EXTRACT_PATH_TEXT or the SUPER type with PartiQL navigation in Redshift, json_extract and json_each in SQLite, ->> and unnest in DuckDB. The analysis errors are the same everywhere: extracted values come back as text or variant and compare wrongly until cast ("10" < "9"); flattening an array multiplies rows, so any order-level amount summed afterwards is counted once per item; an inner flatten silently drops rows whose array is empty or missing; keys vary between payload versions, so a path that works on the sample returns NULL for older rows; and numbers stored as strings or nested one level deeper in some rows break casts.
</context>

<task>
Write a {{dialect}} query for this goal:

<goal>
{{goal}}
</goal>

<json_sample>
{{json_sample}}
</json_sample>

1. Describe the JSON structure from the samples: the paths needed, which are scalars, objects or arrays, and any variation between samples.
2. Extract scalars with the right {{dialect}} functions and cast each to its intended type, using a safe cast (TRY_CAST, SAFE_CAST or a guarded CASE) where the samples show inconsistent types.
3. If an array must be flattened, decide the grain of the result first. Flatten in its own CTE, keep the parent key, and use an outer flatten (LEFT JOIN LATERAL, OUTER => TRUE, LEFT JOIN UNNEST) when parents with empty arrays must be kept.
4. Aggregate parent-level values before or separately from the flattened items so they are not multiplied.
5. Write the final query with named CTEs.
6. Give a profiling query that shows how often each needed path is missing or has an unexpected type across the whole table.
</task>

<constraints>
- Use only {{dialect}} JSON functions and say which version they need when it matters (MySQL 8 for JSON_TABLE, SQL Server 2016 for OPENJSON).
- Never assume a path exists in every row because it is in the sample; handle missing keys explicitly.
- Never sum or count parent-level values after flattening without deduplicating to the parent grain.
- If the sample is not valid JSON or the needed field is not in it, say so and ask; do not invent paths.
- Read-only: no DDL or writes.
</constraints>

<output_format>
## Structure found
A short list of the paths used, their type and any variation.

## Query
One code block.

## Type handling
How each extracted field is cast and what happens to values that fail the cast.

## Fan-out and missing values
The grain before and after any flatten, and how empty or missing arrays are treated.

## Check it
The profiling query for missing paths and types, plus a row count before and after flattening.
</output_format>
