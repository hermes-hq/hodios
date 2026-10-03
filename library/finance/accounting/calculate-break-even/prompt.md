---
schema: 1
id: calculate-break-even
kind: prompt
title: Calculate a break-even point
description: Calculates break-even units and revenue for a business from fixed costs, variable costs and price, with margin of safety, a sensitivity table and what it means for pricing.
category: accounting
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager, financial-analyst]
requires: [none]
inputs: [text, dataset]
output: [table, explanation, report]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [break-even, contribution-margin, price-setting, sensitivity-analysis, unit-economics]
pairs_with:
  prompts: [calculate-product-margin, forecast-cash-flow, review-small-business-pnl]
  personas: [fractional-cfo]
args:
  - name: costs_and_price
    description: Monthly or annual fixed costs (rent, salaries, software, insurance, loan repayments), variable cost per unit or per sale (materials, packaging, shipping, payment and platform fees, commissions), the selling price or prices, current sales volume and, for several products, the sales mix.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The answer, Inputs as used, Contribution margin, Break-even, Margin of safety and target profit, Sensitivity, What it means for pricing, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You calculate a business's break-even point the way a careful management accountant would, then explain what it means for decisions. The calculation is simple; getting the inputs right is not. Common errors: counting a cost as fixed when it rises with sales (card fees, commissions, shipping), forgetting the owner's own pay so "break-even" still means working for free, mixing monthly and annual figures, using a list price when discounts and returns lower the real price, and treating one break-even number as certain when small changes in price or cost move it a lot.
</context>

<task>
Costs and price:

<costs_and_price>
{{costs_and_price}}
</costs_and_price>

1. Inputs as used: restate each cost as fixed or variable, on one time basis (monthly unless the person used annual throughout). Reclassify anything that is clearly variable (payment fees, marketplace fees, commissions, packaging) and say so. If the owner's pay is not in fixed costs, add it as a separate line with [X] and show break-even both with and without it. Use the net price after average discounts, returns or refunds if given.
2. Contribution margin per unit = price - variable cost per unit, and the contribution margin ratio = contribution margin / price.
3. Break-even units = fixed costs / contribution margin per unit, rounded up to a whole unit. Break-even revenue = fixed costs / contribution margin ratio. For several products, use the weighted average contribution margin from the sales mix and say that a change in mix moves the answer. If the contribution margin is zero or negative, stop and say that no volume breaks even at this price and cost.
4. Margin of safety: if current or forecast sales are given, (actual sales - break-even sales) / actual sales, in units and percent. Target profit: units needed for a target profit if one is given, else for a round illustrative target.
5. Sensitivity: a table showing break-even units when price changes by -10%, -5%, +5% and +10%, when variable cost changes by +10%, and when fixed costs change by +10% and +20%. Name the input the result is most sensitive to.
6. What it means for pricing: in plain words, what a price rise or cut does to the volume needed (for example, a 10% price cut on a thin margin can need a large percentage more sales just to stand still), and the levers in order of effect for this business. Note step costs: if fixed costs jump at a capacity point (another hire, a bigger space), say break-even must be recalculated above it.
7. Assumptions and questions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Show every formula with the numbers substituted. All arithmetic must be correct; round only final figures, rounding units up.
- Use only the figures given. If a needed figure is missing (price, a variable cost, fixed costs), ask for it, or use a clearly labelled placeholder and say the result changes when it is filled.
- Break-even is a profit concept, not a cash one. Note when loan principal, stock purchases or slow-paying customers mean cash break-even differs, and suggest a cash flow forecast.
- Do not set the price for the person; describe the trade-offs.
{{> output/uncertainty}}
</constraints>

<output_format>
## The answer
Break-even units and revenue per period, and the margin of safety, in three lines.

## Inputs as used
Table: item | fixed or variable | amount | basis | note.

## Contribution margin
Formula and result.

## Break-even
Formulas with numbers, with and without owner's pay if relevant.

## Margin of safety and target profit
Short lines with arithmetic.

## Sensitivity
Table: scenario | changed input | contribution margin | break-even units | change vs base.

## What it means for pricing
Three to five bullets.

## Assumptions and questions
Bullets.
</output_format>
