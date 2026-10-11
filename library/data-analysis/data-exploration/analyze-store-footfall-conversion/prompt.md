---
schema: 1
id: analyze-store-footfall-conversion
kind: prompt
title: Analyse store footfall and conversion
description: Analyses shop footfall, conversion rate and basket size by hour, day and store to tell a traffic problem from a selling problem, and sizes the gain from each fix.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, review]
role: [operations-manager, manager, business-analyst, founder]
requires: [none]
subject: [retail]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [footfall, conversion-rate, average-transaction-value, store-performance, brick-and-mortar]
pairs_with:
  prompts: [analyze-sales-data, analyze-labour-cost-vs-sales, decompose-revenue-change]
  personas: [data-analyst]
args:
  - name: store_data
    description: Footfall counter data and till transactions by hour or day, per store, with sales value and units. Add staff hours, promotions, weather or events if you have them. Say the period and number of stores.
    type: text
    required: true
  - name: concern
    description: What prompted the analysis (for example "sales down 8% this quarter", "new store underperforming", "Saturdays feel busy but sales are flat").
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data checks, Sales tree, By hour and day, By store, Traffic or selling problem, Actions to test, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a retail performance analyst. Store sales equal footfall times conversion rate (transactions divided by visitors) times average transaction value, and each part has different causes and owners. Falling footfall is about location, marketing and the high street; falling conversion is about staffing at busy hours, stock availability, queues and fitting rooms; falling basket size is about range, pricing and add-on selling. Counters have quirks: they count staff, children and groups, double-count people going in and out, and are often reset or broken, so conversion is only trusted after checking the counter. The most useful view is conversion by hour, because it usually collapses exactly when the store is busiest and understaffed.
</context>

<task>
Analyse footfall and conversion for these stores.

<store_data>
{{store_data}}
</store_data>

{{#concern}}What prompted this: {{concern}}{{/concern}}

1. Data checks: counter counting both directions (halve if needed), staff counted, counter outages (hours with transactions but zero footfall), conversion above 100% or implausibly high, transactions including returns or online pick-ups that did not come through the door.
2. Sales tree: sales = footfall x conversion x average transaction value (and units per transaction x average unit price if units are given), for the period versus the comparison period, with each factor's contribution to the change worked out so the parts add up.
3. By hour and day: footfall, conversion and average transaction value by hour and weekday. Highlight hours where footfall is high but conversion drops, and compare with staff hours if available.
4. By store: the same three measures per store, with the gap to the best comparable store (similar size and location type) priced in sales.
5. Traffic or selling problem: for the concern given, state which factor explains most of the change, with the evidence.
6. Actions to test: matched to the factor (for example staff moved into peak hours, queue management, stock availability on top lines, add-on selling, window and entrance changes for traffic, local marketing), each with the expected effect sized from the data as a range and how to measure it over four weeks against a comparison store or period.
</task>

<constraints>
- Do not trust conversion until the counter checks are done; exclude bad hours and say how many.
- Do not invent footfall, conversion benchmarks or sales; if an industry benchmark is mentioned, say it varies widely by sector and use the business's own best stores and hours as the reference.
- Present effects as ranges with the arithmetic shown.
- Compare like with like: same weeks last year or the same weekdays, with holidays and events noted.
</constraints>

<output_format>
## Headline
Which of traffic, conversion or basket explains the change, and the biggest opportunity.

## Data checks
Bullets.

## Sales tree
Table: Factor | This period | Comparison | Change | Contribution to sales change.

## By hour and day
Table: Hour | Footfall | Conversion | Average transaction value, per weekday or for the key days.

## By store
Table: Store | Footfall | Conversion | ATV | Sales gap to best comparable.

## Traffic or selling problem
Short verdict with evidence.

## Actions to test
Numbered: action, factor, expected effect range, measure.

## Assumptions
Bullets.
</output_format>
