---
schema: 1
id: build-supplier-scorecard
kind: prompt
title: Build a supplier scorecard
description: Builds a supplier scorecard for ongoing reviews, with weighted criteria such as quality, delivery, cost, service and risk, scoring anchors, data sources, a review cadence and actions for low scores.
category: operations
version: 1.0.0
status: incubating
stage: [design, review]
role: [operations-manager]
requires: [none]
inputs: [dataset, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [supplier-performance, scorecard, otif, vendor-management, supplier-review]
pairs_with:
  prompts: [compare-vendors, prepare-supplier-negotiation, map-supply-risk]
  personas: [procurement-specialist]
args:
  - name: suppliers
    description: The suppliers to score, what each supplies, how much you spend with each, and how critical each is.
    type: text
    required: true
  - name: priorities
    description: What matters most to your business from suppliers - for example consistent quality, on-time delivery, price stability, responsiveness, sustainability - and any recent problems.
    type: text
    required: true
  - name: data_available
    description: Optional. Data you already have or could collect - delivery records, goods-in checks, returns or complaints, invoices, quotes, response times.
    type: text
output_contract:
  format: markdown
  sections: [Scorecard design, Criteria and weights, Scoring anchors, Data collection, Review cadence, Thresholds and actions, Scorecard template, Message to suppliers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design supplier scorecards for small and mid-sized businesses. A scorecard is for managing suppliers you already use, period after period, not for choosing a new one. It works when each criterion is measured from data rather than impressions, each score has an anchor that two people would apply the same way, the weights reflect what the business actually cares about, and a low score triggers a defined conversation rather than a surprise switch. The usual core measures are on time and in full (OTIF) delivery, quality (defects, returns or rejected lots), cost (price against agreed or benchmark, invoice accuracy), service (responsiveness, problem resolution) and risk (financial health, dependence, compliance).

<suppliers>
{{suppliers}}
</suppliers>

<priorities>
{{priorities}}
</priorities>
{{#data_available}}
<data_available>
{{data_available}}
</data_available>
{{/data_available}}
</context>

<task>
1. If no suppliers or no priorities are given, ask for them and stop.
2. Propose four to six criteria drawn from the priorities, each with a precise measure (for example "OTIF = orders delivered complete on or before the agreed date ÷ all orders in the period").
3. Assign weights that add up to 100 and explain each weight in one line from the priorities.
4. Write scoring anchors on a 1 to 5 scale for every criterion, tied to thresholds (for example OTIF 98% or more = 5, 95 to 97.9% = 4 …). Mark thresholds you are assuming as starting points to adjust after the first review.
5. For each measure, say where the data comes from, who records it and how often, using the data available; where no data exists yet, give the simplest way to start collecting it.
6. Set the review cadence by supplier criticality: for example monthly measures with a quarterly review for critical suppliers, twice yearly for the rest.
7. Define thresholds and actions: green, amber and red overall scores; what each triggers (no action, a corrective action plan with dates, escalation, and finally qualifying an alternative), and recognition for consistently strong suppliers.
8. Produce a scorecard template with the suppliers listed. Fill in scores only where the data supports them; otherwise leave cells blank for the first review.
9. Write a short message introducing the scorecard to suppliers: what is measured, how often, and how results will be shared.
10. Before writing the final version, check that weights sum to 100, every criterion has a measure, anchors and a data source, and no supplier is scored without data.
</task>

<constraints>
- Do not invent performance data or scores.
- Keep it light enough for the people who will run it; a small business should not need software to maintain it.
- Treat suppliers fairly: share the criteria in advance, and base actions on the agreed measures.
- This is an ongoing performance tool; if the user is really choosing between new suppliers, say so and suggest a one-off weighted comparison instead.
</constraints>

<output_format>
## Scorecard design
Two or three sentences on scope and how it will be used.
## Criteria and weights
Table: Criterion | Measure | Weight | Why.
## Scoring anchors
Table: Criterion | 1 | 2 | 3 | 4 | 5.
## Data collection
Table: Measure | Source | Who records | Frequency.
## Review cadence
## Thresholds and actions
## Scorecard template
Table: Supplier | one column per criterion | Weighted score | Status.
## Message to suppliers
</output_format>
