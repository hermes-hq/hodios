---
schema: 1
id: rationalize-product-line
kind: prompt
title: Rationalise a product line
description: Reviews a range of products or SKUs on revenue, margin, growth, strategic role, complexity cost and cannibalisation, recommending keep, fix, reposition or cut with a transition plan.
category: product-strategy
version: 1.0.0
status: incubating
stage: [review, plan]
role: [product-manager, founder, operations-manager, business-analyst]
subject: [retail, ecommerce]
requires: [none]
inputs: [dataset, text]
output: [table, report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sku-rationalisation, range-review, complexity-cost, cannibalisation, long-tail]
pairs_with:
  prompts: [plan-product-end-of-life, set-product-cost-target, plan-seasonal-product-calendar]
args:
  - name: product_list_and_data
    description: Each product or SKU with whatever you have - units and revenue over 12 months, price, unit cost or margin, growth, stock on hand, minimum order quantities, which customers or channels buy it, and anything special (bundle anchor, entry price, seasonal).
    type: text
    required: true
  - name: strategic_goals
    description: Optional. What the business is trying to achieve (margin, simplicity, a segment, a channel, cash release) and any products that must stay for strategic reasons.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Range scorecard, Hidden complexity costs, Recommendations, Transition plan, Data gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review product ranges for brands, makers, retailers, food producers and service businesses whose range has grown one product at a time. Ranges usually follow a long tail: a minority of items make most of the profit, and the tail costs more than its sales suggest because every item adds changeovers, stock, packaging variants, listings, photography, forecasting errors and support questions. The two classic mistakes are cutting on revenue alone (losing a low-selling item that brings customers in or anchors a bundle) and keeping everything because each item "still sells". You judge each item on contribution after complexity, its strategic role, and where its demand would go if it were cut.
</context>

<task>
Products and data:

<products>
{{product_list_and_data}}
</products>

{{#strategic_goals}}
Strategic goals:

<goals>
{{strategic_goals}}
</goals>
{{/strategic_goals}}

1. Build the scorecard: revenue, share of total, gross margin per unit and percentage, gross profit, growth trend, and rank. Show the cumulative share so the long tail is visible.
2. Estimate complexity cost per item from the data given: stock holding (carrying cost often runs 20-30% of stock value a year; label as an assumption), minimum order quantity versus sales rate (months of cover), unique components or packaging, changeovers, listing or marketplace fees, returns. Where data is missing, rate complexity low, medium or high with the reason.
3. Note each item's strategic role: traffic or entry product, bundle or range anchor, price anchor, halo or brand item, seasonal, customer-specific, or none.
4. Estimate cannibalisation: if this item went, what share of its buyers would switch to another item in the range (high, medium or low with the reason)? Cutting an item whose buyers would switch is cheap; cutting a unique one loses the sale.
5. Recommend per item: keep, fix (price, cost, pack size, minimum order), reposition (channel, bundle, made to order) or cut. Each with the reason and the expected effect on profit and complexity.
6. Plan the transition for fixes and cuts: sell-through or clearance of stock, last order dates with suppliers, customer and retailer notice, replacement suggestions, and any obligations (spare parts, warranties, contracted supply) to check.
</task>

<constraints>
- Use only the numbers given and show the arithmetic. Any assumed rate (carrying cost, switching share) is labelled.
- Never recommend cutting an item that the goals say must stay, or one flagged as contractually committed; mark it "keep: strategic" and suggest a fix instead if it loses money.
- Do not treat revenue alone as the verdict; every cut must cite margin, complexity and switching.
- If there is no margin or cost data at all, give a provisional ranking on revenue and role, label it provisional, and list exactly what data to gather.
- Keep recommendations to a short, decisive set; group very small items where sensible.
</constraints>

<output_format>
## Summary
Three to five bullets: how concentrated the range is, total profit at stake, and the headline recommendation.

## Range scorecard
Table: item | revenue | share | cumulative share | margin % | gross profit | trend | complexity | role | switching.

## Hidden complexity costs
Bullets per item or group, with labelled assumptions.

## Recommendations
Table: item | keep, fix, reposition or cut | reason | expected effect.

## Transition plan
Ordered steps with timing relative to the decision.

## Data gaps
What to gather and how it could change the result.
</output_format>
