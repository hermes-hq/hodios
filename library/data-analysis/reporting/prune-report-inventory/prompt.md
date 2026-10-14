---
schema: 1
id: prune-report-inventory
kind: prompt
title: Prune a report and dashboard inventory
description: Audits a sprawl of recurring reports and dashboards using usage, owners, overlap and upkeep cost, then proposes which to keep, merge or retire and how to retire them without surprises.
category: reporting
version: 1.0.0
status: incubating
stage: [maintain]
role: [data-analyst, data-engineer, business-analyst, manager]
inputs: [dataset, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [report-sprawl, bi-governance, decommissioning, usage-analytics]
pairs_with:
  prompts: [audit-dashboard, build-metrics-glossary, automate-recurring-report]
args:
  - name: inventory
    description: "The list of reports and dashboards with, where known: owner, audience, refresh frequency, last viewed or opened, views or recipients over the last 90 days, data sources, metrics shown and hours of upkeep per month."
    type: text
    required: true
  - name: constraints
    description: "Anything that must stay: regulatory or contractual reports, board packs, reports feeding other systems. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Inventory assessment, Overlap clusters, Recommendations, Retirement plan, Data gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reporting estates grow by accretion: every request gets a new dashboard, nothing is retired, and after a few years a team maintains hundreds of assets, many showing the same metric with slightly different filters and numbers that disagree. BI leads who have cleaned this up know that view counts alone mislead: a quarterly board pack is opened four times a year and is essential, a scheduled email is "delivered" to 80 people and read by none, and some reports exist only because a downstream spreadsheet or process pulls from them. The useful lens combines usage (active viewers, not deliveries), whether a decision depends on it, overlap with other assets, upkeep cost and data risk (stale or broken sources). Retirement works best as a staged process: announce, switch off delivery or hide, wait a full reporting cycle for complaints, archive, then delete, with a named replacement for anything that overlaps.
</context>

<task>
<inventory>
{{inventory}}
</inventory>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Assess each asset on: active usage (people who viewed, not recipients), cadence fit (quarterly assets judged over a quarter), decision dependency, owner present or orphaned, upkeep hours, and data health. Mark which facts are missing.
2. Group assets into overlap clusters that show the same metrics for the same audience, and pick the strongest candidate in each cluster to survive.
3. Classify every asset: keep, keep and fix, merge into another, retire, or investigate (when the data is too thin to judge). Assets protected by the constraints are kept or fixed, never retired.
4. Estimate the upkeep hours freed by the plan, using only the hours supplied.
5. Write a staged retirement plan: announcement wording, a hide or pause step, a waiting period of at least one full cycle of the asset's cadence, archive, delete; plus a check for downstream dependencies (exports, extracts, feeds) before each step.
6. Suggest a light rule to stop the sprawl returning, such as an owner and review date on every new asset.
</task>

<constraints>
- Never recommend retiring an asset only on low view counts when its cadence is quarterly or annual, or when it feeds another process.
- Do not invent usage figures; mark missing data and classify those assets as investigate.
- Every retire or merge decision names a replacement or states that none is needed.
- Keep the plan reversible until the final delete step.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Counts by classification and the hours freed.

## Inventory assessment
Table: Asset | Owner | Active users | Cadence | Decision dependency | Upkeep h/month | Data health | Class.

## Overlap clusters
For each cluster: assets, shared metrics, survivor and why.

## Recommendations
Table: Asset | Action | Replacement | Reason.

## Retirement plan
Numbered stages with timing and the announcement text.

## Data gaps
Bullets: what to collect before the investigate items can be decided.
</output_format>
