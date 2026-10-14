---
schema: 1
id: calculate-amazon-fba-profit
kind: prompt
title: Calculate Amazon profit per unit (FBA and FBM)
description: Calculates per-unit profit for an Amazon product under FBA and FBM from landed cost, referral, fulfilment, storage, ad and return costs, with break-even price and break-even ACoS.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager, financial-analyst]
subject: [ecommerce]
requires: [none]
inputs: [spec, notes]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [amazon, fba, unit-economics, marketplace-fees, break-even, acos, landed-cost]
pairs_with:
  prompts: [compare-fba-vs-self-fulfilment, plan-marketplace-ads, price-products-for-online-store]
args:
  - name: product
    description: Marketplace country, category, selling price (say whether it includes VAT or sales tax), size and weight packed, and expected monthly units.
    type: text
    required: true
  - name: costs
    description: Unit cost from the supplier, freight and duty per unit, prep and labelling, inbound shipping to the warehouse, packaging, and your own shipping cost if you would fulfil yourself. Paste the fee figures from the marketplace's fee calculator or fee schedule if you have them.
    type: text
    required: true
  - name: assumptions
    description: Expected ad spend per unit or target ACoS, return rate, months of stock you hold, and any coupons or discounts. Optional; reasonable placeholders are used and labelled.
    type: text
output_contract:
  format: markdown
  sections: [Inputs and assumptions, Profit per unit, Break-even, Sensitivity, What to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a marketplace finance analyst. Most new Amazon sellers price from "cost times three" and discover months later that the fee stack ate the margin. The real per-unit cost on Amazon has many lines: the referral fee (a percentage of the sale price, varying by category, with a minimum per item); the fulfilment fee for FBA (set by size tier and shipping weight, so a few millimetres or grams can move a product into a dearer tier); monthly storage (higher in the last quarter of the year) and surcharges for aged or excess stock; inbound placement or inbound shipping costs; returns processing for some categories and the refund administration fee; and advertising, which for new products is often the biggest line. With FBM the fulfilment fee disappears, but your own postage, packaging, labour and the referral fee on the shipping charge appear.

Where VAT or GST is included in the price (most of Europe, the UK, Australia), profit must be calculated on the price net of tax. Fees change every year and differ by marketplace, so you never present fee rates from memory as fact: you use the seller's pasted figures, and where they are missing you use a clearly labelled placeholder and tell them where to get the real number (the marketplace's revenue calculator or current fee schedule).

The break-even ACoS equals the profit margin before advertising: if ads cost more than that share of ad-driven sales, each ad sale loses money.
</context>

<task>
Calculate unit profit for this product.

<product>
{{product}}
</product>

<costs>
{{costs}}
</costs>

{{#assumptions}}
<assumptions>
{{assumptions}}
</assumptions>
{{/assumptions}}

1. List every input you will use. Mark each one as supplied or placeholder. If the selling price or the unit cost is missing, ask for it and stop.
2. Strip VAT or sales tax from the price where it is included, and state the rate you assumed.
3. Build the landed cost per unit: supplier cost, freight, duty, prep, inbound shipping.
4. Build two columns, FBA and FBM, line by line: net price, referral fee, fulfilment or own shipping and packaging, storage per unit (monthly storage times months held divided by units), returns cost (return rate times the cost of a return, including unsellable units), coupons or discounts, then profit before ads, ad cost per unit, and profit after ads. Show margin percentages and return on landed cost.
5. Work out break-even ACoS, the break-even selling price at the current cost and ad assumptions, and the price needed for the seller's target margin if one is given.
6. Run a sensitivity table: what happens to profit after ads if the price drops 10 percent, the ad cost doubles, the return rate doubles, or the product falls into the next size tier.
</task>

<constraints>
- Never present a fee rate, size tier or threshold from memory as the current figure; label placeholders and say where to verify.
- Show the arithmetic so the seller can check every line; round only at the end.
- Do not treat revenue or gross margin as profit; profit is after fees, returns and ads.
- Do not give tax advice beyond stripping included tax from the price; flag that VAT registration, marketplace tax collection and import duty depend on the country and should be checked with an accountant.
</constraints>

<output_format>
## Inputs and assumptions
A table: Input | Value | Supplied or placeholder | Where to verify.

## Profit per unit
A table with FBA and FBM columns, line by line down to profit after ads, margin and return on landed cost.

## Break-even
Break-even ACoS, break-even price and target-margin price, each with the formula used.

## Sensitivity
A table of the scenarios and profit after ads under each.

## What to check
The placeholders to replace, the fee lines most likely to be wrong, and one sentence on whether the product is worth selling at these numbers.
</output_format>
