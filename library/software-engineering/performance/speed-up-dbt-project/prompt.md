---
schema: 1
id: speed-up-dbt-project
kind: prompt
title: Cut dbt run time
description: Cuts the run time and warehouse cost of an existing dbt project by finding the slowest models in run artifacts, then fixing materializations, incremental logic, selection and threads.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, operate]
role: [data-engineer]
stack: [dbt]
requires: [repo-read, file-write, shell]
inputs: [repo, logs, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [run-time, incremental-models, materialization, warehouse-cost, critical-path]
pairs_with:
  prompts: [write-dbt-incremental-model, refactor-dbt-project, reduce-bigquery-costs, reduce-snowflake-costs]
  personas: [analytics-engineer, data-engineer]
args:
  - name: project
    description: Warehouse (Snowflake, BigQuery, Databricks, Redshift, Postgres), dbt version, how runs are scheduled (full `dbt build` nightly, per-hour selectors), current run time and the goal, and access to `run_results.json` or job logs.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Where the time goes, Fixes, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A dbt run is a DAG, so total time is set by the critical path, not the sum of model times; speeding up a model off the critical path saves money but not minutes. `run_results.json` holds each node's execution time, and the manifest gives the graph, so the slowest models and the longest chain can be found without guessing; the dbt Cloud model timing view shows the same. Usual causes, in order of payoff: large fact models rebuilt as `table` every run when they could be `incremental` (with a correct unique key and a lookback for late data); incremental models whose filter does not prune partitions, so they scan the full source anyway; `view` models stacked deeply so every downstream query recomputes the chain; ephemeral models inlined many times; tests on huge tables running full scans (`unique` and `relationships` on billions of rows, which can be limited with `where` configs or moved to a lower frequency); running the whole project hourly when only a few sources change (use `state:modified+`, source freshness, or tag-based selectors); and too few threads for the warehouse's concurrency, or a warehouse too small for the heaviest model. Clustering or partitioning the largest tables on the incremental filter column often matters more than SQL rewrites.
</context>

<task>
Cut the run time of this dbt project: {{project}}

1. Read the project layout, `dbt_project.yml` materialization defaults, the job commands and selectors, and the largest models.
2. Parse the latest `run_results.json` and the manifest (or job timing view) to list the 15 slowest nodes, including tests, and compute the critical path. If you cannot access them, explain how to export them and stop at a plan.
3. For each slow node on the critical path, find the cause from its SQL, materialization and the warehouse's query profile: full rebuilds, unpruned scans, deep view stacks, heavy tests, or skewed joins.
4. Propose fixes ranked by minutes saved on the critical path and cost saved: incremental models with a lookback, partition or cluster keys, materializing a hot view as a table, scoping tests, smarter selectors and scheduling, thread count and warehouse size.
5. Implement the agreed fixes one at a time in a dev target; for each incremental change, compare row counts and a checksum against a full refresh.
6. Re-run and report the new critical path time and the per-model gains.
</task>

<constraints>
- Never run `--full-refresh` against production, drop tables or change production warehouse size without explicit confirmation.
- Every incremental conversion needs a parity check against a full build; no silent data drift.
- Report warehouse-specific settings (clustering, partitioning, warehouse size) for the stated warehouse only.
- Do not reduce test coverage without saying which tests changed and why.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Where the time goes
Total time, critical path, and the slowest nodes with seconds.
## Fixes
Ranked table: model, cause, fix, expected saving.
## Changes
One line per file: `path`, what changed.
## Results
Run times after, parity checks, and anything pending confirmation.
</output_format>
