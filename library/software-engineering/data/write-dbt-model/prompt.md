---
schema: 1
id: write-dbt-model
kind: prompt
title: Write a dbt model
description: "Writes a dbt model from business logic, with declared sources, a stated grain, unique, not_null and relationships tests, column docs and a safe incremental strategy. Use when adding a dbt model."
category: data
version: 1.0.0
status: experimental
stage: [build]
role: [data-engineer, data-analyst]
stack: [dbt]
requires: [none]
inputs: [spec, schema, text]
output: [code, tests, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [analytics-engineering, incremental-models, data-tests, grain]
pairs_with:
  prompts: [design-star-schema, write-data-quality-checks]
  personas: [data-engineer]
args:
  - name: business_logic
    description: What the model should contain in business terms, including definitions such as what counts as an active customer or a completed order.
    type: text
    required: true
  - name: source_tables
    description: The source or upstream model names with their columns and types, plus the warehouse (Snowflake, BigQuery, Postgres, Databricks, Redshift…) if known.
    type: text
    required: true
  - name: materialization
    description: How dbt builds the model.
    type: enum
    enum: [view, table, incremental]
    default: table
output_contract:
  format: markdown
  sections: [Assumptions and grain, Files, Run and verify, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
dbt models go wrong in quiet ways. A join fans out and nobody notices because no test pins the grain. A table name is hardcoded instead of using `ref` or `source`, so lineage and environments break. Business terms are implemented the way the author guessed. An incremental model filters on `max(updated_at)` with no lookback, so late-arriving rows are lost forever. Good dbt code states its grain, tests it, documents its columns and makes incremental loads safe to rerun.
</context>

<task>
Write a dbt model, materialised as {{materialization}}, for this logic:
{{business_logic}}

Sources and upstream models:
{{source_tables}}

1. State the grain as "one row per …" and the key that enforces it. If the business logic leaves the grain or a definition open, ask, or state the assumption and put it in Open questions.
2. Declare sources in a sources YAML file with `loaded_at_field` and freshness thresholds where a load timestamp exists. Reference upstream data only through `source()` and `ref()`.
3. Add staging models only where a source needs renaming, casting or deduplication, one per source, following the project convention (`stg_<source>__<table>` if unknown).
4. Write the model SQL as import CTEs, then logical CTEs, then a final `select` with an explicit column list. Handle nulls and duplicates in the sources explicitly, and note any time zone conversion.
5. If materialised as incremental: set `unique_key`, choose `incremental_strategy` for the warehouse (merge where supported, otherwise delete+insert or insert_overwrite; check whether the project's dbt version supports microbatch), filter new rows inside `is_incremental()` with a lookback window for late-arriving data, set `on_schema_change`, and say when a full refresh is needed.
6. Write a properties YAML file with the model and column descriptions and tests: `unique` and `not_null` on the key (or a combination-of-columns test for a composite key, naming the package it needs), `relationships` for foreign keys, `accepted_values` for categorical columns, and one singular test for the most important business rule. Use the `data_tests:` key on dbt 1.8 or later and `tests:` before that; if the project is on 1.8 or later and the rule is easier to show with fixed input rows, write a dbt unit test instead.
7. Give the commands to build and test the model and its children, and a query that checks the grain.
</task>

<constraints>
- Use only columns listed in the sources. If the logic needs a column that is not there, list it under Open questions instead of inventing it.
- Keep SQL portable unless the warehouse is known. Flag any warehouse-specific function you use.
- No `select *` in the final CTE. Keep Jinja to what the model needs.
- Follow the project's naming and folder conventions if they are visible in the input.
</constraints>

<output_format>
## Assumptions and grain
The grain statement, the key, and each assumption.

## Files
Each file in its own fenced block, preceded by its path (for example `models/marts/fct_orders.sql`, `models/marts/_marts__models.yml`, `models/staging/_sources.yml`).

## Run and verify
Commands, the grain-check query, and what a passing result looks like.

## Open questions
Definitions or columns that need confirmation.
</output_format>
