---
schema: 1
id: analyze-delivery-performance
kind: prompt
title: Analyse delivery performance
description: Analyses shipment data for on-time in-full rates and lateness by carrier, lane, warehouse and order type, separating where delays arise and ranking the causes worth fixing.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, review]
role: [operations-manager, data-analyst, business-analyst, manager]
requires: [none]
subject: [supply-chain, ecommerce]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [otif, on-time-delivery, carrier-performance, shipping, lead-time]
pairs_with:
  prompts: [analyze-process-cycle-times, run-pareto-analysis, analyze-inventory-data]
  personas: [data-analyst]
args:
  - name: shipment_data
    description: Orders or shipments with order date, promised date, ship date, delivery date, quantities ordered and delivered, carrier, origin warehouse, destination region and any exception codes. Say the period and row count.
    type: text
    required: true
  - name: promise_rules
    description: How the delivery promise is set (for example "next day if ordered by 14:00", contracted lead times per customer, delivery windows) and how "on time" is defined with customers.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data checks, Definitions, OTIF overview, Where lateness arises, Breakdowns, Causes to fix, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a logistics analyst. On-time in-full (OTIF) looks simple but depends entirely on definitions: on time against the date promised to the customer or the date requested, by line or by order, with what tolerance. Different definitions can move the figure by 20 points, so you fix them first. Then you split each late delivery into where the time was lost: order processing before dispatch (warehouse), transit (carrier), or a promise that was never achievable. Carriers are often blamed for late warehouse dispatch, and a carrier's average transit time hides its long tail of very late parcels, which is what customers remember.
</context>

<task>
Analyse delivery performance in this data.

<shipment_data>
{{shipment_data}}
</shipment_data>

{{#promise_rules}}Promise rules: {{promise_rules}}{{/promise_rules}}

1. Data checks: missing delivery scans, deliveries dated before dispatch, time zones and cut-off times, partial shipments split across rows, cancelled lines, weekends and holidays in lead-time maths (use business days if promises are in business days).
2. Definitions: state on time (against promised date, with the tolerance), in full (by line or by order), and OTIF at order level as the headline, with line-level as a secondary figure.
3. OTIF overview: on time, in full and OTIF rates by week or month, with the trend.
4. Where lateness arises: for late orders, split into late dispatch (left the warehouse after the planned ship date), slow transit (transit time beyond the carrier's standard) and unachievable promise (promise shorter than standard processing plus transit). Show counts and shares.
5. Breakdowns: by carrier and service (median, 90th and 95th percentile transit time, share delivered more than one day late), by lane or destination region, by warehouse, and by order type (multi-line, oversized, backordered items). Mark small groups.
6. In-full failures: the share caused by stock shortages, picking errors or damage, with the top products involved.
7. Causes to fix: ranked by late orders avoided, each with an owner (warehouse, carrier management, customer service promise rules, inventory planning) and how to measure the fix.
8. Give runnable code (SQL or pandas) that computes OTIF and the lateness split.
</task>

<constraints>
- Do not blame a carrier for delays that start before dispatch; show the split first.
- Do not invent transit standards, exception reasons or contract terms; if carrier standards are missing, use the observed median per lane as a reference and say so.
- Keep figures traceable to the definitions stated; if the user's customers use a different OTIF definition, show both.
- Use only the data supplied; label figures from a sample as provisional.
</constraints>

<output_format>
## Headline
OTIF rate and trend, the main source of lateness, and the top fix.

## Data checks
Bullets.

## Definitions
Bullets.

## OTIF overview
Table: Period | Orders | On time | In full | OTIF.

## Where lateness arises
Table: Source | Late orders | Share.

## Breakdowns
Tables by carrier and service, lane, warehouse and order type, with percentiles, then the in-full failures by cause and top products.

## Causes to fix
Numbered: cause, late orders avoided, owner, measure.

## Code
One code block.
</output_format>
