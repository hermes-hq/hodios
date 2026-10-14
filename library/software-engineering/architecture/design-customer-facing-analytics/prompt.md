---
schema: 1
id: design-customer-facing-analytics
kind: prompt
title: Design customer-facing analytics
description: Designs in-app dashboards and reports for customers, choosing read replicas, pre-aggregation, an OLAP store or embedded BI, with tenant isolation and freshness.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, data-engineer, architect, tech-lead]
requires: [none]
inputs: [spec, text, schema]
output: [plan, table, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [embedded-analytics, olap, pre-aggregation, tenant-isolation, in-app-dashboards, data-freshness]
pairs_with:
  personas: [software-architect, data-engineer]
  prompts: [design-cqrs-read-models, design-multi-tenancy]
args:
  - name: needs
    description: What customers need to see (charts, tables, exports, filters, date ranges), how fresh it must be, and how many customers use it.
    type: text
    required: true
  - name: data
    description: Where the source data lives, its volume and growth, and the heaviest queries today.
    type: text
  - name: constraints
    description: Team skills, budget, existing data warehouse or BI tools, latency targets.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Options compared, Data flow, Metric definitions, Tenant isolation, Performance and limits, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Analytics shown to customers inside a product has different needs from internal BI: every query must be scoped to one tenant, latency must feel interactive, and numbers must match what customers see elsewhere in the app and on their invoices. Running aggregate queries on the primary database is the usual starting point and the usual source of outages once data grows. The progression is predictable: a read replica buys time, then pre-aggregated rollup tables (per tenant, per day, per dimension) refreshed by jobs handle most dashboards, and only large event volumes with free-form slicing justify a columnar OLAP store. Embedded BI tools ship fast but bring per-viewer pricing, styling limits and their own tenant isolation model that must be configured correctly. Freshness requirements are usually looser than first stated; "updated every 15 minutes" is far cheaper than real time. Metric definitions belong in one place (a semantic layer, views or a shared module), otherwise the chart, the CSV export and the API disagree and support tickets follow.
</context>

<task>
<needs>
{{needs}}
</needs>
{{#data}}
<data>
{{data}}
</data>
{{/data}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. Restate the requirements as numbers: tenants, rows or events per tenant, largest tenant, queries per minute at peak, freshness target and latency target. Ask for or label missing ones.
2. Compare serving options against those numbers, including the cheapest one that could work.
3. Recommend one, with the trigger that would move to the next option.
4. Design the data flow: source, change capture or batch extraction, transformation into rollups or the analytical store, refresh schedule and late-arriving data.
5. Define where metric definitions live and how charts, exports and any API share them.
6. Define tenant isolation: tenant key in every query enforced in one layer (row-level security, a mandatory filter in the query builder, or separate datasets), plus a test that fails if a query leaks across tenants.
7. Set performance guardrails: maximum date range per query, pagination and async generation for large exports, caching keyed by tenant and filters.
</task>

<constraints>
- Tenant isolation is not optional; never rely on the frontend to filter by tenant.
- Do not recommend an OLAP store or streaming pipeline when rollup tables meet the stated freshness and volume.
- Do not quote vendor prices or product limits as facts; say what to verify.
- Numbers shown to customers must have one definition; flag any metric that is ambiguous.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The serving approach and why, in at most five lines.
## Options compared
Table: option (query the primary or replica, pre-aggregated tables, OLAP store, embedded BI tool), fit, cost, effort, risk.
## Data flow
A Mermaid diagram from source tables to the dashboard, with freshness at each step.
## Metric definitions
Where definitions live so every chart and export agrees.
## Tenant isolation
How each query is scoped and tested.
## Performance and limits
Query budgets, caching, guardrails on date ranges and exports.
## Rollout
Numbered steps, starting with the slowest existing report.
</output_format>
