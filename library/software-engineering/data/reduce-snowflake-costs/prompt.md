---
schema: 1
id: reduce-snowflake-costs
kind: prompt
title: Reduce Snowflake costs
description: Cuts Snowflake spend using metering and query history, with warehouse right-sizing, auto-suspend, workload separation, query fixes, clustering and storage review, and resource monitors.
category: data
version: 1.0.0
status: incubating
stage: [operate]
role: [data-engineer, dba]
stack: [snowflake]
requires: [none]
inputs: [dataset, text, config]
output: [report, plan, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [cost-reduction, warehouse-sizing, credits, query-history, finops]
pairs_with:
  prompts: [reduce-cloud-spend, optimize-sql-query, write-dbt-incremental-model]
  personas: [data-engineer]
args:
  - name: usage
    description: Results from ACCOUNT_USAGE views such as WAREHOUSE_METERING_HISTORY, QUERY_HISTORY (top queries by time or credits), the warehouse list with size, auto-suspend and scaling settings, and storage by database.
    type: text
    required: true
  - name: context
    description: Edition, who uses each warehouse (BI tool, dbt, loaders, data science), schedules, and any performance needs that must not get worse.
    type: text
output_contract:
  format: markdown
  sections: [Where the credits go, Savings ranked, Changes, Guardrails, Queries to collect more evidence, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Snowflake bills compute per second while a warehouse runs (with a 60-second minimum each time it resumes), doubling credits per hour with each size step, plus storage, serverless features (Snowpipe, automatic clustering, materialised views, search optimisation, tasks) and cloud services above a daily allowance. The biggest wastes are usually warehouses that never suspend because a BI tool or monitoring ping keeps them awake, auto-suspend set to several minutes, oversized warehouses for small queries, one shared warehouse where a heavy job forces everyone to size up, dbt models rebuilt as full tables every hour, and queries that scan whole tables because filters do not prune micro-partitions. Larger warehouses are not always more expensive: a query that is twice as fast on the next size costs the same and may avoid spilling. Automatic clustering and search optimisation have their own running costs that need to be paid back by pruning. Storage costs grow from long Time Travel retention and fail-safe on high-churn tables and forgotten clones. Changes should be measured against metering history, not guessed.
</context>

<task>
Usage data: {{usage}}
{{#context}}Context: {{context}}{{/context}}

1. Break down credits by warehouse, by hour of day and by workload (BI, transformation, loading, ad hoc), plus serverless features and storage. Note what share each holds and the trend.
2. Find idle burn: warehouses running with few queries, auto-suspend settings, resume frequency and what wakes them.
3. Find the most expensive queries and query patterns (by total elapsed time times warehouse size, or by attributed cost if available), and for each, the reason: full scans with poor pruning, spills, repeated identical queries missing the result cache, full rebuilds that could be incremental.
4. Rank savings by estimated monthly credits, effort and risk: auto-suspend and sizing changes, splitting workloads onto right-sized warehouses, multi-cluster settings for concurrency instead of bigger sizes, query and model fixes, clustering keys only where pruning will pay back, and storage clean-up (Time Travel retention, transient tables for rebuildable data, old clones).
5. Write the SQL for each change (ALTER WAREHOUSE, resource monitors with notify and suspend thresholds, retention changes) for the user to run, and the ACCOUNT_USAGE query that measures the effect a week later.
</task>

<constraints>
- Read-only analysis. Do not execute changes; produce statements for the user.
- Base estimates on the provided numbers and say when they are rough; do not invent credit prices or contract terms.
- Do not reduce Time Travel or switch tables to transient where recovery requirements are unknown; ask.
- Flag any change that could slow user-facing dashboards.
</constraints>

<output_format>
## Where the credits go
Table: area | credits per month | share | trend.
## Savings ranked
Table: change | est. monthly saving | effort | risk.
## Changes
SQL blocks per change, with notes.
## Guardrails
Resource monitors and alerts.
## Queries to collect more evidence
ACCOUNT_USAGE queries for anything missing and for measuring results.
## Open questions
Numbered, or "None".
</output_format>
