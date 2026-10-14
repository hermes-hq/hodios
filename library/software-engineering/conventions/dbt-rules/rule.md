---
schema: 1
id: dbt-rules
kind: rule
title: dbt rules
description: Standing rules for dbt projects covering staging, intermediate and mart layers, ref and source only, one grain per model, naming, tests and docs per model, and safe incremental models.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [data-engineer, data-analyst]
stack: [dbt]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
depth: specific
tags: [data-modeling, incremental-models, dbt-tests, staging-models, analytics-engineering]
applies_to: ["models/**/*.sql", "models/**/*.yml", "macros/**", "snapshots/**", "dbt_project.yml"]
pairs_with:
  rules: [sql-style-rules]
  prompts: [write-dbt-model]
  personas: [analytics-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change models in this dbt project:

**Know the project first**
- Read `dbt_project.yml`, the folder layout under `models/`, the warehouse adapter and installed packages (dbt_utils, dbt_expectations) before adding a model. Follow the existing layer names, prefixes and materialisation defaults even where they differ from the rules below.

**Layers**
- Staging (`stg_<source>__<entity>`): one model per source table, the only place that selects from `source()`. Rename columns, cast types, and do light cleaning. No joins, no aggregations. Materialise as views unless the project says otherwise.
- Intermediate (`int_<entity>_<verb>`): reusable joins and logic between staging and marts. Not exposed to end users.
- Marts (`fct_<process>`, `dim_<entity>` or the project's names): business-facing tables built from staging and intermediate models.
- Never reference a raw table by name. Use `source()` in staging and `ref()` everywhere else. Do not let marts select from sources directly or reference each other in cycles.

**Grain and keys**
- Each model has one clearly stated grain (one row per order, one row per customer per day), written in its description. Every model has a primary key column with `unique` and `not_null` tests (or a combination test for composite keys).
- Check that joins do not change the grain; fan-out joins are the most common silent error. Aggregate before joining when needed.

**SQL style**
- Start models with import CTEs (one CTE per upstream model, each a plain select from `ref('stg_shop__orders')` and so on), then logical CTEs, then a final `select` from the last CTE.
- Use explicit column lists in marts, not `select *`. Use the project's SQL style for casing and commas.
- Put repeated logic in macros only when it is used in three or more places; prefer readable SQL to clever Jinja.
- Avoid hard-coded dates, ids and environment names; use variables or seeds.

**Tests and docs**
- Every model has a YAML entry with a description and column descriptions for keys and non-obvious columns.
- Add `relationships` tests for foreign keys, `accepted_values` for status columns, and source freshness for sources that drive reports.
- Use model contracts for marts consumed by other teams or tools, if the dbt version supports them.

**Incremental models**
- Use incremental materialisation only when full refresh is too slow or costly. Define a `unique_key` and an incremental strategy suited to the warehouse, and filter inside an `is_incremental()` block using a lookback window for late-arriving data.
- Make sure a `--full-refresh` produces the same result as incremental runs.
- Do not run `--full-refresh` on large production models or drop tables without the owner's agreement.

**Before you finish**
- Run `dbt build --select <model>+` (or `state:modified+` in CI) so the changed model, its tests and its children run. Compare row counts and key metrics against the previous version for changed marts. Say what you ran.
