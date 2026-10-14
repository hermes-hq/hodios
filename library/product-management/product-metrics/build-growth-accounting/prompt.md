---
schema: 1
id: build-growth-accounting
kind: prompt
title: Build growth accounting
description: Breaks active users or accounts into new, retained, resurrected and churned each period, computes the quick ratio and shows which flow is really driving or dragging growth.
category: product-metrics
version: 1.0.0
status: incubating
stage: [review, learn]
role: [product-manager, data-analyst, founder, data-scientist]
requires: [none]
inputs: [dataset, text]
output: [table, report, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [growth-accounting, quick-ratio, resurrected-users, churned-users, user-flows, active-users]
pairs_with:
  prompts: [calculate-active-users-in-sql, calculate-mrr-movements, diagnose-metric-drop, build-cohort-analysis]
args:
  - name: unit
    description: What is being accounted for (users or accounts), what counts as active, and the period (week or month).
    type: text
    required: true
  - name: data
    description: Either per-period counts already split into flows, or a description of the table with one row per user (or account) per active period.
    type: text
    required: true
  - name: dialect
    description: SQL dialect if you want the query to compute the flows. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Flow definitions, Growth accounting table, What drives growth, Query, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a growth analyst who uses growth accounting to explain why a top-line number moves. Every active user in a period is either new (first active ever), retained (active last period too) or resurrected (active before, not last period, active again); every user active last period but not this one is churned. So active(t) = new + retained + resurrected and active(t) - active(t-1) = new + resurrected - churned. The quick ratio, (new + resurrected) / churned, says how efficiently growth beats losses. (Revenue has its own version with expansion and contraction; that is an MRR bridge, a separate job.) Novices miss that a flat top line can hide rising churn masked by paid acquisition, that resurrection is often notification-driven and fragile, that the definition of "active" and the period length change every flow, and that the first periods of data have no history, so everyone looks new.
</context>

<task>
<unit>
{{unit}}
</unit>

<data>
{{data}}
</data>
{{#dialect}}SQL dialect: {{dialect}}{{/dialect}}

1. State the flow definitions for this unit and period, including how the first periods without history are handled (exclude them from the table).
2. Build the growth accounting table per period: starting actives, new, retained, resurrected, churned, ending actives, quick ratio, retention rate of last period's actives. Check that the identity active(t) - active(t-1) = new + resurrected - churned holds and say where it does not.
3. Explain what drives growth: which flow changed most, whether growth leans on acquisition or on retention, whether churn is rising in absolute terms or as a rate, and how dependent the product is on resurrection.
4. If a dialect is given, or data is described as a table, write the query: one row per entity per active period (deduplicated), LAG to the entity's previous active period (none = new, exactly one period earlier = retained, earlier = resurrected), LEAD to the next active period to count churn in the period after the last active one (no next period, or a gap), then aggregation by period. Do not report churn for the period after the last one in the data.
5. List what to confirm.
</task>

<constraints>
- Compute from the user's numbers only; show the arithmetic for the quick ratio in at least one period.
- Do not quote outside benchmarks for quick ratio as targets; compare periods with each other.
- If the data cannot separate resurrected from new (no history), say so and do not guess the split.
- Flag partial current periods.
- If the user wants revenue flows (expansion, contraction, MRR churn), say that needs an MRR bridge built from billing data and keep this analysis to users or accounts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Flow definitions
Bullets, one per flow.

## Growth accounting table
Table: period | start | new | retained | resurrected | churned | end | quick ratio.

## What drives growth
Three to six bullets.

## Query
Code block, or "not requested".

## Questions
What to confirm.
</output_format>
