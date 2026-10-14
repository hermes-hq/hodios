---
schema: 1
id: forecast-new-product-demand
kind: prompt
title: Forecast demand for a new product
description: Forecasts demand for a product with no sales history by triangulating analogue products, a market funnel and early signals, with a launch curve, a wide range and rules for re-forecasting.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, operations-manager, business-analyst]
inputs: [text, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [new-product, analogue-forecasting, launch-curve, demand-sizing]
pairs_with:
  prompts: [forecast-time-series, estimate-market-size, plan-inventory]
args:
  - name: product
    description: The product, price, channels, where and when it launches, who it is for, and what it replaces or sits next to in your range.
    type: text
    required: true
  - name: analogues
    description: Launch sales of similar past products (yours or public figures), first weeks or months, with how they were launched. Optional but the forecast is much weaker without them.
    type: text
  - name: signals
    description: "Early evidence: pre-orders, waitlist sign-ups, retailer orders, test-market results, survey purchase intent, marketing budget and planned reach."
    type: text
  - name: horizon
    description: How far ahead to forecast and at what grain (for example "first 26 weeks, weekly").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, What we know and assume, Three estimates, Triangulated forecast, Launch curve, What to watch in the first weeks, Assumptions to test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
New-product forecasts are mostly wrong, and the job is to be wrong by less and find out fast. Experienced planners triangulate rather than trust one method: analogue forecasting (scale the launch curve of similar past products by differences in price, distribution and marketing), a market funnel (people reachable times awareness times trial times repeat), and early signals (pre-orders and waitlists, which overstate demand because sign-ups cost nothing and need a conversion discount). Trial and repeat behave differently: launch spikes come from trial, the long run depends on repeat. Distribution and supply limit sales before demand does, so a forecast must separate demand from what can be shipped. New products also cannibalise existing ones. Stated purchase intent from surveys overstates real buying, often heavily. The useful output is a range, a launch curve shape, and rules for updating as soon as real sales arrive.

Product: {{product}}
Horizon: {{horizon}}
{{#analogues}}

<analogues>
{{analogues}}
</analogues>
{{/analogues}}
{{#signals}}

<signals>
{{signals}}
</signals>
{{/signals}}
</context>

<task>
1. List what is known (price, channels, launch date, reach) and the assumptions you must make, each marked as an assumption.
2. Build three independent estimates for the first full period of the horizon:
   a. Analogue: pick the closest analogues, say why each fits or does not, and scale them with stated adjustments.
   b. Funnel: reachable people or outlets times the conversion rates at each stage, with the source of each rate or a clearly labelled assumption.
   c. Signals: convert pre-orders, waitlists or intent into expected purchases with an explicit discount and why.
   If a method has no inputs, say so and do not fake it.
3. Triangulate: compare the estimates, explain why they differ, and give a low, central and high forecast for the whole horizon. The range should be wide; say what it would take to land at each end.
4. Shape the launch curve over the horizon: initial trial spike or slow build, the repeat rate that sets the steady level, seasonality, and the effect of planned marketing bursts. Separate cannibalised sales from net new sales if the product sits next to existing ones.
5. Check supply and distribution: flag any period where planned stock or outlets cap sales below the demand forecast.
6. Set re-forecast rules: which early metrics to read (week 1 to 4 sell-through, repeat rate, rate of sale per outlet), how they map onto the low, central or high path, and when to reorder or cut.
7. List the assumptions to test before launch, most consequential first.
</task>

<constraints>
- Never present a single number without the range. Never use survey intent at face value.
- Do not invent analogue sales figures or market sizes. If none are given, use clearly labelled placeholders and say what data would replace them.
- Keep units consistent (units versus revenue, sell-in to retailers versus sell-through to customers) and say which one each number is.
- Say plainly when the evidence is too thin for anything better than an order-of-magnitude estimate.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The low, central and high forecast for the horizon, the main driver of the range, and the first metric to watch.

## What we know and assume
Two bullet lists.

## Three estimates
One subsection per method with the arithmetic shown.

## Triangulated forecast
Table: scenario | units or revenue | what has to be true.

## Launch curve
Table by period: low | central | high, plus a sentence on the shape.

## What to watch in the first weeks
Table: metric | low path | central path | high path | action.

## Assumptions to test
Numbered list.
</output_format>
