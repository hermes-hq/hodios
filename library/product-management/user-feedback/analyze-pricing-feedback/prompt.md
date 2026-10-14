---
schema: 1
id: analyze-pricing-feedback
kind: prompt
title: Analyse pricing feedback
description: Analyses pricing complaints, sales objections and churn reasons to separate price level, packaging, value metric, billing and unrealised-value problems by segment, and proposes tests.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, founder, marketer, executive]
requires: [none]
inputs: [text, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [pricing-research, packaging, willingness-to-pay, churn-reasons, sales-objections]
pairs_with:
  prompts: [analyze-cancellation-feedback, turn-sales-notes-into-product-insights, check-feedback-against-usage-data]
args:
  - name: feedback
    description: Pricing-related comments, sales objections, churn or cancellation reasons and survey answers, with source and segment where known.
    type: text
    required: true
  - name: pricing_context
    description: Current plans, prices, what each includes, the value metric (per seat, per usage, flat), billing options and any recent changes. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Sources and limits, Pricing signals by type, By segment, What is not about price, Hypotheses, Tests to run]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You analyse pricing feedback for product and commercial teams. "Too expensive" is the most common complaint and the least specific. It can mean the price level is high for the value a segment gets; the value metric is wrong (paying per seat when value comes from usage); the packaging is wrong (a needed feature sits in a higher tier, or they pay for features they do not use); the billing mechanics hurt (annual only, no local currency, surprise charges); the budget or approval process blocks them; or they never realised the value, which is an adoption problem wearing a price label. Each needs a different fix. Sources are biased in known ways: sales objections are partly negotiation, churned users rationalise, and happy customers rarely mention price. Segment matters: the same price can be trivial for one company size or region and impossible for another.

Feedback:

<feedback>
{{feedback}}
</feedback>
{{#pricing_context}}

Pricing context:

<pricing_context>
{{pricing_context}}
</pricing_context>
{{/pricing_context}}
</context>

<task>
1. Describe the sources and their limits: what each source is, how many items, its likely bias, and what is missing (for example no feedback from customers who accepted the price).
2. Code each item into a pricing signal type: price level, value metric, packaging or tier fit, billing mechanics, budget or approval, competitor anchor, unrealised value, or not about price. Show counts and one or two verbatim quotes per type.
3. Break the main types down by segment (plan, company size, region, use case, source) where the data allows, and point out where a pattern exists only in one segment.
4. Pull out what is not about price: items where the real issue is adoption, missing capability, a bug or a support failure, and where they should go.
5. Write hypotheses, each stated as "Segment X finds Y because Z", with the evidence for and against and how confident you are.
6. Propose tests to check them before changing prices: usage checks for complainers, short pricing interviews, a packaging or value-metric experiment, price sensitivity survey methods with their limits, and changes to billing options. Say what result would support or reject each hypothesis.
</task>

<constraints>
- Do not recommend specific new prices as conclusions; frame any number as a test candidate.
- Show counts with every pattern and keep small counts visible.
- Do not invent competitor prices or market data.
- Quote verbatim from the feedback only.
</constraints>

<output_format>
## Sources and limits
A table: source | items | likely bias.

## Pricing signals by type
A table: signal type | count | example quotes.

## By segment
A table or bullets, with counts.

## What is not about price
Bullets with routing.

## Hypotheses
Numbered, each with evidence and confidence.

## Tests to run
A table: hypothesis | test | supporting result | rejecting result.
</output_format>
