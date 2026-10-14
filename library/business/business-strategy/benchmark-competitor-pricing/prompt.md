---
schema: 1
id: benchmark-competitor-pricing
kind: prompt
title: Benchmark prices against competitors
description: Builds a like-for-like price comparison against competitors, normalising packages, fees and terms to one unit, and shows where you sit high or low and why it matters.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, review]
role: [founder, product-manager, marketer, business-analyst]
requires: [none]
inputs: [text, dataset, notes]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [price-benchmark, competitor-pricing, price-positioning, packaging]
pairs_with:
  prompts: [design-pricing, analyze-competitor-price-data, plan-owner-led-price-rise, analyze-competitors]
args:
  - name: our_offer
    description: Your products, packages or plans with prices, what each includes, fees, contract length, payment terms and any standard discounts.
    type: text
    required: true
  - name: competitor_prices
    description: The same for each competitor you can see - list prices, what is included, setup or delivery fees, minimum terms, add-ons. Note where each figure came from and its date.
    type: text
    required: true
  - name: customer_view
    description: Who buys, what they compare you on, and a typical order or usage size (for example "a 10-person team", "a family of four", "monthly 200 orders"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Comparison basis, Normalised comparison, Where we sit, What explains the gaps, Implications, Data gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pricing analyst. Comparing headline prices is misleading: competitors bundle different things, charge setup or delivery fees, quote per user versus per account, require annual terms, or advertise an entry tier no real customer buys. A useful benchmark first fixes a typical customer and a common unit, then adds every cost the customer actually pays over a fair period (total cost to the customer), and only then compares. Being dearer is fine if the difference is explained by value customers recognise; being dearer on the items customers compare most is the real risk.
</context>

<task>
Benchmark these prices:

<our_offer>
{{our_offer}}
</our_offer>

<competitor_prices>
{{competitor_prices}}
</competitor_prices>
{{#customer_view}}

<customer_view>
{{customer_view}}
</customer_view>
{{/customer_view}}

1. Set the comparison basis: one to three typical customer profiles and a common unit and period (for example first-year cost for a 10-user team, cost per kilo delivered, price per hour of work). State any assumption.
2. Map each competitor package to the nearest of ours, noting what is included or missing. Where packages differ, add the cost of the missing items at the competitor's own add-on price, or mark it as not comparable.
3. Compute the normalised cost per profile, including fees, minimum terms, and standard discounts that a typical customer actually gets. Show the arithmetic.
4. Express our position as an index (our price divided by the competitor average, times 100) and as the gap in money.
5. Explain each significant gap: features or service level, brand, convenience, contract terms, or no visible reason.
6. Give implications: where we are exposed (high price on items customers compare first), where we may be leaving money on the table (well below rivals with equal or better value), and what to test.
7. List data gaps, especially undated or unverified competitor prices.
</task>

<constraints>
- Use only the prices given. Do not invent competitor prices, fees or discounts; mark anything estimated as `assumption`.
- Flag any competitor price without a source or date as unverified.
- Use the currency given and do not convert unless asked; if currencies are mixed, say so and stop at the comparison that is valid.
- Do not recommend agreeing prices with competitors or sharing price plans with them; independent pricing only.
{{> output/uncertainty}}
</constraints>

<output_format>
## Comparison basis
Profiles, unit, period, assumptions.

## Normalised comparison
Table per profile: Provider | Package mapped | Included / missing | Fees and terms | Normalised cost | Index.

## Where we sit
Two or three sentences with the index range.

## What explains the gaps
Bullets per significant gap.

## Implications
Numbered: exposure, money left on the table, tests to run.

## Data gaps
Bullets.
</output_format>
