---
schema: 1
id: write-dbt-incremental-model
kind: prompt
title: Write a dbt incremental model
description: Writes or fixes a dbt incremental model with the right strategy for the warehouse, a unique key, a late-data lookback, schema change handling and a parity check against a full refresh.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [data-engineer, data-analyst]
stack: [dbt]
requires: [repo-read, file-write, shell]
inputs: [repo, spec, schema]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [incremental-models, merge-strategy, late-arriving-data, full-refresh, analytics-engineering]
pairs_with:
  prompts: [write-dbt-model, set-up-dbt-project, write-data-quality-checks]
  personas: [analytics-engineer]
args:
  - name: model
    description: The model to make incremental (or the existing incremental model that is wrong), its grain, and the source columns for event time, load time and keys.
    type: text
    required: true
  - name: warehouse
    description: Warehouse and dbt version, for example "Snowflake, dbt 1.8" or "BigQuery, dbt 1.9".
    type: string
    required: true
  - name: data_behaviour
    description: How data arrives, for example "events up to 3 days late", "rows updated in place", "hard deletes in the source".
    type: text
output_contract:
  format: markdown
  sections: [Strategy choice, Model code, Tests and parity check, Operating notes, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An incremental model is a correctness trade: it saves compute by processing only new rows, and it drifts from the truth unless the strategy matches how data arrives. Filtering `where updated_at > (select max(updated_at) from the current model)` loses late rows forever and, with `>` on coarse timestamps, can skip rows that share the max value; a lookback window plus a `unique_key` fixes both. Strategies differ by warehouse: `merge` needs a reliable unique key and gets expensive on huge targets without a filter on the target side (`incremental_predicates`); `delete+insert` suits batches identified by a key or date; `insert_overwrite` replaces whole partitions on BigQuery, Spark and Databricks and is the cheapest when data arrives by partition; `append` is only safe for immutable, never-duplicated data; and newer dbt versions add `microbatch` for event-time batches. Hard deletes in the source are never seen by a plain incremental model. Schema changes need `on_schema_change`. And no incremental model should be trusted until an incremental run has been compared with a full refresh on the same data.
</context>

<task>
Model: {{model}}
Warehouse and dbt version: {{warehouse}}
{{#data_behaviour}}How data arrives: {{data_behaviour}}{{/data_behaviour}}

1. Read the model, its upstream models and sources, the project config and any existing incremental models to follow their conventions. State the grain and the unique key, and check the key really is unique in the source.
2. Choose the strategy for this warehouse and data behaviour and explain why the others are worse here. Say whether `microbatch` fits and is available in this dbt version.
3. Write the model: config with `materialized='incremental'`, `unique_key`, `incremental_strategy`, `on_schema_change`, partitioning or clustering for the warehouse, and `incremental_predicates` for large merge targets; an `is_incremental()` filter using a lookback window sized to the late-data behaviour, on load time if event time can arrive late.
4. Handle deletes and updates explicitly: soft-delete flags, a periodic reconciliation, or a documented limit.
5. Add tests: `unique` and `not_null` on the key, and a parity check that compares an incremental build against a full refresh (for example in a dev schema with a short date range), with the query that shows differences.
6. Run `dbt build --select` for the model twice (first run full, second incremental) and a full refresh in a dev target, run the parity check, and report results.
</task>

<constraints>
- Never run `--full-refresh` against a production target yourself; it can be slow and costly. Tell the user when one is needed.
- Do not use `append` unless the data is proven immutable and duplicate-free.
- Use only configuration keys supported by the stated adapter and dbt version.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Strategy choice
The strategy, unique key, lookback and why.
## Model code
Code blocks with file paths (SQL and YAML).
## Tests and parity check
Tests, the parity query, and results.
## Operating notes
When a full refresh is needed, delete handling, cost notes.
## Open questions
Numbered, or "None".
</output_format>
