---
schema: 1
id: implement-slowly-changing-dimension
kind: prompt
title: Implement a type 2 slowly changing dimension
description: Implements a type 2 slowly changing dimension with dbt snapshots or MERGE SQL, with change detection, valid-from and valid-to dates, a current flag, deletes and correct point-in-time joins.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [data-engineer, data-analyst]
stack: [sql]
requires: [repo-read, file-write, shell]
inputs: [schema, spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [scd-type-2, dbt-snapshots, history-tracking, point-in-time, dimensional-modeling]
pairs_with:
  prompts: [design-star-schema, write-dbt-incremental-model, write-data-quality-checks]
  personas: [analytics-engineer]
args:
  - name: dimension
    description: The source table and key, which attributes should be tracked over time and which can be overwritten, and how often the source is loaded.
    type: text
    required: true
  - name: tooling
    description: How it will be built, for example "dbt snapshots on Snowflake" or "MERGE statements in Postgres run by Airflow".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Design, Implementation, Point-in-time join, Tests, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A type 2 dimension keeps a new row for each change to tracked attributes, so facts can be reported with the attribute values that were true at the time. Mistakes are predictable. Tracking every column, including noisy ones such as `last_login_at`, explodes the table; tracked and overwritten (type 1) columns should be chosen deliberately. Change detection by `updated_at` misses changes when the source does not bump it, while comparing a hash of the tracked columns catches them but must treat NULLs consistently. Validity ranges must not overlap or leave gaps: use half-open intervals (`valid_from` inclusive, `valid_to` exclusive) and a far-future or NULL `valid_to` for the current row, and pick one convention. The history only starts when capture starts, so a snapshot cannot recover past changes. Hard deletes need an explicit rule. A surrogate key per version is what facts join to, or facts join on the natural key with `fact_time >= valid_from and fact_time < valid_to`. In dbt, snapshots implement this with the `timestamp` or `check` strategy, and they should read directly from sources with minimal logic, because changing snapshot logic later rewrites history.
</context>

<task>
Dimension: {{dimension}}
Tooling: {{tooling}}

1. Read the source table, existing models and any current dimension. Confirm the natural key is unique per load, and list each attribute as tracked (type 2), overwritten (type 1) or excluded.
2. Choose change detection: `updated_at` if it is reliable for every tracked column, otherwise a hash of tracked columns with a fixed NULL representation and column order.
3. Define columns: surrogate key, natural key, attributes, `valid_from`, `valid_to`, `is_current`, and a deleted flag or rule. State the interval convention.
4. Implement it in the stated tooling: a dbt snapshot (strategy, `unique_key`, `updated_at` or `check_cols`, invalidating hard deletes where the dbt version supports it) or a MERGE that closes changed rows and inserts new versions in one transaction, rerun-safe for the same load.
5. Show the point-in-time join from a fact table to the dimension, and the current-view query.
6. Write tests: one current row per natural key, no overlapping or gapped intervals per key, surrogate key unique, and a test case where an attribute changes twice. Run the build twice with a changed source row on a dev target and report results.
</task>

<constraints>
- Do not put business logic in dbt snapshots; keep them as direct captures and transform downstream.
- Do not claim the dimension can show history before capture began.
- Do not run against production targets yourself.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Attribute classification, change detection, columns and interval convention.
## Implementation
Code blocks with file paths.
## Point-in-time join
SQL for the as-of join and the current view.
## Tests
Tests and results.
## Open questions
Numbered, or "None".
</output_format>
