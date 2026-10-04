---
schema: 1
id: price-farm-gate-produce
kind: prompt
title: Price farm-gate produce
description: Prices eggs, meat, veg, honey or flowers for farm-gate, honesty-box or market sale from costs, local prices and the value of buying direct, with price boards and rounding that suit cash and card.
category: farming
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual]
subject: [agriculture, retail]
requires: [none]
inputs: [notes, text]
output: [table, copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [farm-gate-sales, honesty-box, direct-selling, price-board, smallholding]
pairs_with:
  prompts: [plan-market-stall, calculate-product-margin, draft-farm-produce-labels, plan-csa-veg-box-scheme]
args:
  - name: products
    description: What you sell, in what units or packs (half dozen eggs, 1 kg bags, bunches, jars), roughly how much per week, and quality points worth mentioning (free-range, heritage breed, picked this morning).
    type: text
    required: true
  - name: costs
    description: Optional. What each product costs you - feed, seed, packaging, jars, labels, card fees - and roughly how much time it takes.
    type: text
  - name: local_prices
    description: Optional. Prices you have seen locally - other farm gates, markets, farm shops, supermarkets - for the same or similar products.
    type: text
  - name: sale_route
    description: How you sell - an unattended honesty box, a staffed farm shop or gate, a market stall, or a mix.
    type: enum
    enum: [honesty-box, farm-shop, market, mixed]
    default: mixed
output_contract:
  format: markdown
  sections: [Price table, Price board, How the prices were set, When to review, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a farmer or smallholder price produce sold direct. Direct sellers usually underprice: they copy the supermarket, forget packaging, card fees and their own time, and absorb honesty-box losses without allowing for them. Customers who stop at a farm gate are buying freshness, provenance and the visit as well as the product, so a fair farm-gate price usually sits above the supermarket's standard line and close to its premium or local-market price. Prices also need to work at the till: round numbers for an honesty box where people leave coins or use a payment link, simple pack sizes, and a board people can read from a car window.

Sale route: {{sale_route}}
</context>

<task>
<products>
{{products}}
</products>

{{#costs}}
<costs>
{{costs}}
</costs>
{{/costs}}

{{#local_prices}}
<local_prices>
{{local_prices}}
</local_prices>
{{/local_prices}}

1. For each product work out a cost floor per unit: direct costs (feed or inputs share, packaging, labels, jars or boxes) plus card or payment fees, plus time at an hourly rate the seller chooses, plus a loss allowance (default 5% for staffed sales, 10% for an honesty box, adjust if they know their losses). Show the arithmetic.
2. Place each product against the local prices given: below, matching or above the comparable product, and why (freshness, breed, free-range, local).
3. Suggest a price above the cost floor, positioned against local prices, then round it for the sale route: whole or half units of currency for an honesty box; card-friendly but still simple prices for staffed or market sales.
4. Suggest pack sizes and simple bundles (for example a dozen eggs at less than two half dozens) that raise the average sale without confusing anyone.
5. Write a price board: product, pack, price, one short selling line each, payment methods, and a thank-you line for honesty-box customers.
6. Say when to review prices (feed or input cost changes, season, sold out every day, product left over) and how to raise them without losing regulars.
</task>

<constraints>
- Use only costs and local prices given. Where a cost or local price is missing, mark it `[ADD]` and show the calculation with the gap, rather than inventing figures.
- Never price below the cost floor without saying so plainly and why (for example a loss leader the seller chooses).
- Do not plan pricing meant to drive a named competitor out of business; say that selling below cost hurts the seller first, price from costs instead, and suggest competing on freshness, range, service or opening hours.
- Do not state food labelling, weights-and-measures or egg-sale rules as fact; if a product has rules to check (eggs, honey, meat, dairy), mention them in one line and point to labelling checks.
- If no products are listed, ask and stop.
</constraints>

<output_format>
## Price table
Table: product | unit | cost floor | local comparison | suggested price | rounded board price | margin per unit.

## Price board
The board text, ready to print, under 60 words.

## How the prices were set
Bullets: the arithmetic and assumptions per product.

## When to review
Three to five bullets.

## Questions
Every `[ADD]` item and anything to confirm.
</output_format>
