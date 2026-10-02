---
schema: 1
id: design-pricing
kind: prompt
title: Design pricing and packaging
description: Designs pricing and packaging - value metric, tiers, fences and anchors - from customer value rather than cost, with a plan to test willingness to pay. Use when launching or repricing a product.
category: business-strategy
version: 1.0.0
status: incubating
stage: [design, plan]
role: [founder, product-manager, marketer, executive]
inputs: [text, notes]
output: [table, plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [packaging, value-metric, willingness-to-pay, price-tiers]
pairs_with:
  prompts: [model-unit-economics, analyze-business-model]
  personas: [management-consultant]
args:
  - name: product
    description: What the product does, the outcomes it creates for customers, its cost to serve, and current pricing if any.
    type: text
    required: true
  - name: customers
    description: Who buys, the segments you see (size, use case, budget owner), how they buy, and any evidence of what they value or pay today.
    type: text
    required: true
  - name: competitors_pricing
    description: Competitor and substitute prices you have verified, with dates or sources. Leave empty if unknown.
    type: text
output_contract:
  format: markdown
  sections: [Value metric, Packaging, Price points, Anchoring and presentation, Willingness-to-pay tests, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pricing strategist. You price from the value a customer gets and the alternatives they have, use cost only as a floor, and treat every price as a hypothesis to test. You know that the choice of value metric (what the price scales with) and the packaging usually matter more than the exact number.
</context>

<task>
Design pricing and packaging for:

<product>
{{product}}
</product>

<customers>
{{customers}}
</customers>

<competitors_pricing>
{{competitors_pricing}}
</competitors_pricing>

1. Value metric. List two to four candidates (per seat, per usage unit, per outcome, per location, flat). Score each on: grows with the value the customer gets, easy for the buyer to understand and predict, hard to game, cheap to measure. Recommend one and say why.
2. Segments. Group customers by willingness to pay and needs, using the customer evidence. If the evidence does not support segments, say so and use a provisional split you label as an assumption.
3. Packaging. Design two to four tiers. For each: target segment, the job it covers, what is included, and the fences that stop high-value customers from buying down (limits, features, support level, security or admin needs). Keep the entry tier useful but clearly limited.
4. Price points. Reason from the economic value to the customer (time or money saved, revenue gained) and the next-best alternative, then check that cost to serve leaves a healthy margin. Give a starting price and a test range for each tier.
5. Anchoring and presentation: the tier to highlight, an anchor tier or annual option, and what to show or hide on the pricing page or quote.
6. Willingness-to-pay plan: pick the methods that fit the stage and volume, for example Van Westendorp questions asked in 10 to 20 customer interviews (a qualitative signal; reading the price curves needs a survey of a few hundred qualified respondents), Gabor-Granger price ladders, a price A/B or sequential test on new visitors where traffic allows, or quoting different prices in sales calls. For each: what to ask or change, sample size, the metric and the decision rule.
7. Risks: existing customers (grandfathering, migration), discounting discipline, competitor reaction, and what to monitor after launch.
</task>

<constraints>
- Use only competitor prices from the input. Do not quote prices from memory; if they matter and are missing, list which to collect.
- Never set price by cost-plus alone; show the value logic.
- Avoid more than four tiers and avoid features that exist only to pad a tier.
- If the product's value or buyer is unclear, ask for that first and stop rather than guessing a price.
{{> output/uncertainty}}
</constraints>

<output_format>
## Value metric
Table: Candidate | Scales with value | Predictable | Hard to game | Measurable. Then the recommendation in two sentences.

## Packaging
Table: Tier | Target segment | Included | Fences.

## Price points
Table: Tier | Starting price | Test range | Value logic.

## Anchoring and presentation
Bullets.

## Willingness-to-pay tests
Numbered: method, sample, metric, decision rule, time needed.

## Risks
Bullets with the mitigation for each.
</output_format>
