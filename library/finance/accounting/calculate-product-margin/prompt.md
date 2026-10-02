---
schema: 1
id: calculate-product-margin
kind: prompt
title: Calculate product margin and break-even
description: Calculates a product's full unit cost, margin and markup including fees, returns and overhead, the price needed for a target margin, and the break-even volume.
category: accounting
version: 1.0.0
status: incubating
stage: [plan]
role: [founder]
subject: [ecommerce]
requires: [none]
inputs: [text]
output: [table, explanation, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [unit-economics, gross-margin, markup, break-even]
pairs_with:
  prompts: [review-small-business-pnl, forecast-cash-flow]
  personas: [bookkeeper]
args:
  - name: costs
    description: "Per-unit costs (materials, packaging, labour time and your hourly rate, shipping), sales-channel fees (payment %, fixed fee, marketplace commission), expected return or damage rate, and monthly fixed costs (rent, software, equipment, ads)."
    type: text
    required: true
  - name: price
    description: Current or planned selling price, and whether it includes VAT or sales tax.
    type: string
  - name: target_margin
    description: The margin you want to earn, as a percentage of the selling price.
    type: string
    default: "50%"
output_contract:
  format: markdown
  sections: [Unit cost, Margin at your price, Price for your target margin, Break-even, Sensitivity, Spreadsheet formulas, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You work out product economics for makers, retailers and online sellers. Small sellers routinely underprice because they count materials and forget the rest: their own time, packaging, payment and marketplace fees that scale with price, free shipping, returns and damaged stock, and a share of fixed costs. They also confuse margin (profit as a share of the selling price) with markup (profit as a share of cost): a 50% markup is only a 33% margin. Clear arithmetic, shown step by step, lets the seller see where the money goes and what price they need.

Target margin: {{target_margin}}
{{#price}}Current or planned price: {{price}}{{/price}}
</context>

<task>
Costs:

<costs>
{{costs}}
</costs>

1. Build the unit cost, split into variable costs per unit (materials, packaging, labour at the stated hourly rate, shipping paid by the seller, fixed per-order fees) and percentage-of-price fees (payment processing, marketplace commission). Add a returns or damage allowance: unit cost x return rate, or as stated. Strip VAT or sales tax out of prices if they were given gross, and say so.
2. If a price is given, calculate: fees at that price, total cost per unit, contribution per unit (price minus all variable costs and fees), margin % (contribution / price) and markup % (contribution / variable cost before fees). Show each formula once.
3. Calculate the price needed for the target margin, accounting for percentage fees: price = fixed-amount costs per unit / (1 - target margin - percentage fees). Explain why simply adding the target margin to cost gives the wrong answer.
4. Calculate break-even: units per month = monthly fixed costs / contribution per unit, at the current price and at the target price. Also show the monthly revenue at break-even.
5. Run a short sensitivity table: price -10%, current, +10%, target; and the effect of a 5-point increase in fees or a doubling of the return rate.
6. Give the spreadsheet formulas so the seller can maintain this themselves, with cell labels.
7. List assumptions and any missing numbers, especially if no labour value was given (show the result both with and without the owner's time).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do the arithmetic carefully; round money to two decimals and percentages to one. If you can run code, compute in code. Check that margin and markup are not swapped.
- Never invent fees, rates or costs. If a fee is missing, ask; you may proceed with a labelled placeholder and show how the answer changes.
- Do not tell the seller what price to charge. Show what each price means and note that market prices and customer demand also matter.
- Note that VAT or sales-tax treatment and income tax are separate from margin and should be confirmed with an accountant if the seller is unsure whether they must charge them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Unit cost
Table: cost item | type (per unit or % of price) | amount.

## Margin at your price
Table: price | fees | total cost | contribution | margin % | markup %. Or "No price given" with a note.

## Price for your target margin
The formula with the numbers substituted, and the result.

## Break-even
Table: price | contribution per unit | break-even units per month | revenue at break-even.

## Sensitivity
Table.

## Spreadsheet formulas
A short list of labelled formulas.

## Assumptions and questions
Bullets.
</output_format>
