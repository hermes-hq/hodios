---
schema: 1
id: define-physical-product-kpis
kind: prompt
title: Define KPIs for a physical product
description: Defines KPIs for a physical product line - sell-through, return rate, field failure, rating trend, warranty cost and margin per unit, attach rate - with formulas, sources and alert thresholds.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [product-manager, founder, operations-manager]
subject: [retail, ecommerce, supply-chain]
requires: [none]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [hardware-products, sell-through, return-rate, warranty-cost, unit-margin, field-failure-rate]
pairs_with:
  prompts: [analyze-field-service-notes, analyze-in-home-use-test-results, set-metric-targets-from-baseline]
  workflows: [returns-reduction-track]
args:
  - name: product_line
    description: The products (category, number of SKUs or models, price points, launch dates), how long they are expected to last, and the warranty terms.
    type: text
    required: true
  - name: channels
    description: Where it sells (own website, marketplaces, retailers, distributors, own shops) and the rough split, plus who handles returns and repairs in each channel.
    type: text
    required: true
  - name: available_data
    description: Optional. What you can see today (orders, retailer sell-out reports, returns logs with reasons, warranty claims, reviews, cost sheets) and how often.
    type: text
output_contract:
  format: markdown
  sections: [KPI tree, KPI definitions, Data sources, Alert thresholds, Review routine, Gaps and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You define the KPIs a product manager or small brand uses to run a physical product line. Unlike software, the cost of a quality problem arrives months later as returns, warranty claims and bad reviews, and it eats margin unit by unit. Teams often track revenue and star rating, and miss that a model with a good rating has a 14% return rate in one channel, or that warranty cost per unit has doubled for one production batch.

The set should link sales, customer and quality signals to margin per unit, with definitions precise enough that two people compute the same number.
</context>

<task>
<product_line>
{{product_line}}
</product_line>

<channels>
{{channels}}
</channels>

{{#available_data}}
<available_data>
{{available_data}}
</available_data>
{{/available_data}}

1. Draw a KPI tree in text: contribution margin per unit at the top, broken into price after discounts, landed cost, channel fees, cost of returns and warranty cost; with sales and customer drivers beside it.
2. Define each KPI with an exact formula and time basis:
   - Sell-through = units sold to end customers in the period / units available (opening stock + received) in that channel, by SKU.
   - Return rate = units returned / units sold, by the month of sale (cohort), not the month of return; with reason codes (defect, not as described, size or fit, damaged in transit, changed mind).
   - Field failure rate = failures reported / units sold, by months in service (0-3, 4-12, 13-24), and by production batch where known.
   - Warranty cost per unit sold = claims cost (parts, labour, shipping, replacements) / units sold in the matching cohort.
   - Rating trend = rolling 90-day average rating and count, by model and channel, plus share of 1-2 star reviews mentioning quality.
   - Contribution margin per unit after returns and warranty.
   - Attach rate = orders including an accessory or consumable / orders with the main product.
   Add a stock measure (weeks of cover) if supply is a concern.
3. Data sources: the system or report for each, its lag (retailer sell-out often arrives weeks late) and the owner.
4. Alert thresholds relative to the product's own baseline: for example return rate up by a quarter on the trailing 13-week cohort average, any batch whose 0-3 month failure rate is double the line average, and any safety-related failure (fire, burns, shock, choking, sharp edges) as an immediate alert regardless of count.
5. Review routine: weekly sales and stock, monthly quality and margin by SKU and channel, quarterly line review deciding fix, reprice, reposition or discontinue.
</task>

<constraints>
- Do not invent industry benchmarks or "normal" return rates; thresholds are relative to the product's own baseline until there is history.
- Use the product's real channels; do not add channels that are not listed.
- Safety-related failures go to whoever is responsible for product safety straight away; product safety reporting duties differ by country, so say to check them.
- If the products or channels are not described, ask for them and stop.
</constraints>

<output_format>
## KPI tree
An indented text tree.

## KPI definitions
Table: KPI | formula | cohort or period basis | split by | why it matters.

## Data sources
Table: KPI | source | lag | owner.

## Alert thresholds
Table: KPI | alert rule | who is alerted | first action.

## Review routine
Weekly, monthly and quarterly agendas as short lists.

## Gaps and questions
Data you cannot yet get and what to confirm.
</output_format>
