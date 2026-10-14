---
schema: 1
id: refactor-dbt-project
kind: prompt
title: Restructure a messy dbt project
description: Reorganises a dbt project into staging, intermediate and mart layers, removes duplicated logic, and proves the refactored models return identical rows.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [data-engineer, data-analyst]
stack: [dbt]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [plan, diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [dbt-layers, model-lineage, audit-helper, data-modeling]
pairs_with:
  prompts: [write-dbt-model, restructure-sql-query]
  personas: [analytics-engineer]
args:
  - name: project
    description: The dbt project path, the warehouse, the dbt version, which models are consumed by dashboards or other teams, and what hurts.
    type: text
    required: true
  - name: dev_target
    description: The dbt target to build and compare in, which must not be production (for example dev).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Current state, Target structure, Steps, Equivalence results, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The structure most dbt teams converge on: staging models (one per source table, `stg_<source>__<table>`) that only rename, cast and lightly clean, referencing sources with `source()`; intermediate models for reusable joins and business logic; marts (facts and dimensions) that downstream tools read. Messy projects have the same CTE copied into many models, marts reading raw sources directly, business logic inside staging, and long chains of models that each change one column.

The constraints on a refactor: models other people query (dashboards, reverse ETL, exposures) are a public interface, so their names, schemas, column names, types and grain must not change; renaming a model renames its table, breaking consumers unless an alias or a compatibility view is kept. Materialisation changes (view to table, incremental) change cost and freshness. Equivalence is checked by building the new models in a dev target and comparing them row for row with production, for example with `audit_helper`'s `compare_relations` or an `EXCEPT` query in both directions plus row counts; incremental models must be compared on a full refresh and on an incremental run.
</context>

<task>
Restructure {{project}} working in the `{{dev_target}}` target.

1. Read `dbt_project.yml`, the models, sources and exposures. Map the DAG: which models read sources directly, duplicated logic (repeated CTEs, joins, CASE statements), staging models with business logic, and the models consumed downstream.
2. Propose the target structure: folders and naming conventions, new staging models, intermediate models that absorb duplicated logic, and how each public model keeps its name, columns and grain. Wait for approval.
3. Refactor one mart and its lineage at a time. Keep public model names; add `alias` or a view if a file moves or is renamed. Keep materialisations unless the user approves a change.
4. Build the changed models in `{{dev_target}}` with `dbt build --select` on the changed lineage, then compare each public model with production: row counts, both-direction differences, and column-level mismatch counts. Investigate every difference.
5. Report results per model and list follow-ups (tests to add, models to deprecate) without doing them.
</task>

<constraints>
- Never run commands against the production target and never drop or overwrite production relations.
- Public models keep name, columns, types and grain unless the user approves a change.
- A model is only "equivalent" if the comparison shows zero differences; report any difference with an explanation, never round it away.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current state
DAG problems and duplicated logic, with model names.
## Target structure
Layers, naming, and where each piece of logic moves.
## Steps
Numbered steps per lineage.
## Equivalence results
Table: model, prod rows, dev rows, differences, verdict.
## Follow-ups
Suggested next changes, not done.
</output_format>
