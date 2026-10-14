---
schema: 1
id: reduce-bigquery-costs
kind: prompt
title: Reduce BigQuery costs
description: Cuts BigQuery spend by finding the queries and tables that cost most, then fixing partitioning, clustering, select-star, repeated scans, materialisation, storage billing and the pricing model.
category: data
version: 1.0.0
status: incubating
stage: [operate]
role: [data-engineer, data-analyst]
stack: [bigquery]
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
tags: [cost-reduction, bytes-scanned, partition-pruning, slot-reservations, finops]
pairs_with:
  prompts: [reduce-cloud-spend, optimize-sql-query, write-dbt-incremental-model]
  personas: [data-engineer]
args:
  - name: usage
    description: Results from INFORMATION_SCHEMA.JOBS (top queries by bytes billed or slot time, by user or service account), billing export totals, table sizes and storage, and current pricing model (on-demand or editions with reservations).
    type: text
    required: true
  - name: context
    description: Who runs queries (BI tool, dbt, scheduled queries, analysts), refresh schedules, and performance needs.
    type: text
output_contract:
  format: markdown
  sections: [Where the money goes, Savings ranked, Changes, Guardrails, Queries to collect more evidence, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
BigQuery has two compute models: on-demand, billed by bytes processed, and capacity (editions) billed by slot-hours with reservations and autoscaling. The right fixes differ. Under on-demand, cost follows bytes scanned: `SELECT *` reads every column, `LIMIT` does not reduce bytes, filters on non-partition columns do not prune, a filter wrapped in a function or compared to a subquery may disable partition pruning, and dashboards that re-run the same heavy query every few minutes multiply cost. Partitioning by date with `require_partition_filter`, clustering on common filter columns, materialised views or pre-aggregated tables for dashboards, and incremental models instead of full rebuilds are the usual fixes. Under editions, cost follows slot usage, so baseline and max reservation sizes, idle autoscaling and job concurrency matter more than bytes. Storage can be billed on logical or physical (compressed) bytes per dataset, and long-term storage is cheaper automatically for tables untouched for 90 days. Streaming inserts and some APIs have their own charges. Each estimate must be checked against `INFORMATION_SCHEMA.JOBS` before and after.
</context>

<task>
Usage data: {{usage}}
{{#context}}Context: {{context}}{{/context}}

1. Break down spend by compute (by project, user or service account, and query pattern), storage (active and long-term, logical versus physical), streaming and other services. Note the pricing model in use.
2. Find the top queries by bytes billed (on-demand) or slot-hours (editions), grouped by normalised query text, and for each give the cause: full scans, no partition filter, unpruned filters, select-star, repeated identical dashboard queries, full rebuilds.
3. Find tables that should be partitioned or clustered based on how they are filtered, and whether `require_partition_filter` is safe to turn on.
4. Rank savings by estimated monthly amount, effort and risk: query rewrites, partitioning and clustering, materialised views or summary tables for dashboards, BI caching or extract schedules, incremental models, storage billing model per dataset, table expiration for scratch data, and a pricing model comparison if usage justifies it.
5. Write the DDL and SQL for each change for the user to run, and the INFORMATION_SCHEMA query to measure the effect.
6. Add guardrails: per-user or per-project custom quotas, maximum bytes billed on scheduled and BI queries, and budget alerts.
</task>

<constraints>
- Read-only analysis. Do not execute changes; produce statements for the user.
- Do not quote current list prices from memory as fact; use the user's billing numbers or mark estimates as relative.
- Repartitioning a large table means rewriting it; give the cost and the approach (create new table, swap) rather than presenting it as free.
- Flag changes that can break queries, such as `require_partition_filter`.
</constraints>

<output_format>
## Where the money goes
Table: area | monthly cost or bytes | share.
## Savings ranked
Table: change | est. saving | effort | risk.
## Changes
SQL or DDL blocks per change, with notes.
## Guardrails
Quotas, maximum bytes billed and alerts.
## Queries to collect more evidence
INFORMATION_SCHEMA queries for anything missing and for measuring results.
## Open questions
Numbered, or "None".
</output_format>
