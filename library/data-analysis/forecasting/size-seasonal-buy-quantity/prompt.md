---
schema: 1
id: size-seasonal-buy-quantity
kind: prompt
title: Size a one-time seasonal buy
description: Works out how much seasonal, event or one-shot stock to buy from a demand range, margin and leftover value using newsvendor logic, with pack sizes, top-up options and budget limits.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, founder, business-analyst]
subject: [retail, supply-chain]
inputs: [dataset, text]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [newsvendor, critical-ratio, seasonal-stock, overstock, stockout-cost]
pairs_with:
  prompts: [plan-inventory, forecast-new-product-demand, forecast-sell-through-for-markdowns]
args:
  - name: item
    description: "What is being bought and for which season or event, selling price, unit cost, what leftovers are worth (clearance price, return to supplier, write-off), minimum order and pack size, and whether a top-up order is possible later."
    type: text
    required: true
  - name: demand
    description: "What is known about demand: last season's sales (and whether it sold out, and when), a range or scenarios, or comparable items."
    type: text
    required: true
  - name: limits
    description: Budget, storage or display limits. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Economics, Demand range, Recommended quantity, Sensitivity, Practical adjustments]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Christmas stock, swimwear, event merchandise, a festival's food order, a print run: when there is one chance to buy, the right quantity is not the expected demand. Buyers use the newsvendor rule. The cost of having one unit too few (underage, usually the lost margin: price minus cost, plus any goodwill cost) is weighed against the cost of one unit too many (overage: cost minus what the leftover fetches). The critical ratio, underage divided by (underage plus overage), is the probability of not running out that the buy should target, and the optimal quantity is that percentile of the demand distribution. High margin and good leftover value push the buy above the expected demand; thin margin and worthless leftovers push it below. Two common traps: last season's sales understate demand if the item sold out early (sales are censored), and a cheap top-up order later changes the answer, since the first buy only needs to cover demand until the top-up can arrive.
</context>

<task>
<item>
{{item}}
</item>

<demand>
{{demand}}
</demand>
{{#limits}}

<limits>
{{limits}}
</limits>
{{/limits}}

1. Set out the economics: underage cost per unit, overage cost per unit, and the critical ratio, with arithmetic.
2. Build the demand range: from last season (uncensoring it if it sold out early, by estimating demand at the sell-out rate for the remaining days), scenarios or comparables. Express it as low, likely and high, or as a mean and spread, and state the assumption.
3. Find the quantity at the critical-ratio percentile of demand (with a normal approximation or directly from the scenarios), and show expected profit at a few quantities around it so the user sees how flat or steep the curve is.
4. Adjust for practical limits: pack sizes and minimum orders (round to the better of the two neighbouring quantities), budget or space caps, and a possible top-up (buy for demand until the top-up arrives, at a lower risk).
5. Give the recommendation with the expected leftover and expected stockout risk at that quantity.
6. Say what would change the answer most: margin, leftover value, or the demand range.
</task>

<constraints>
- Do not invent prices, costs, leftover values or demand figures; ask for any that are missing because the answer depends on them.
- Show the arithmetic and label approximations.
- Treat last season's sales as a lower bound on demand if it sold out.
- Make clear this optimises expected profit; if running out has a cost not captured (a key customer, a safety item), include it or say it is excluded.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The quantity to buy, the expected leftover, and the chance of selling out.

## Economics
Underage, overage and critical ratio with arithmetic.

## Demand range
Low, likely, high (or mean and spread) and the basis.

## Recommended quantity
The calculation and the result.

## Sensitivity
Table: quantity | expected sales | expected leftover | expected profit.

## Practical adjustments
Pack sizes, budget, space, top-up.
</output_format>
