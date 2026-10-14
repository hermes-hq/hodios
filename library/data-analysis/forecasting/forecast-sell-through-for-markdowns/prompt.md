---
schema: 1
id: forecast-sell-through-for-markdowns
kind: prompt
title: Forecast sell-through and markdown timing
description: Projects in-season sell-through for each item to decide when and how deep to mark down so stock clears by the season's end at the best margin, using rate of sale and past markdown uplift.
category: forecasting
version: 1.0.0
status: incubating
stage: [operate]
role: [operations-manager, business-analyst, founder]
subject: [retail, ecommerce]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sell-through, markdowns, rate-of-sale, clearance, weeks-of-cover]
pairs_with:
  prompts: [size-seasonal-buy-quantity, analyze-inventory-data, plan-inventory]
args:
  - name: stock_position
    description: "Per item (or style): units received, units sold to date, stock on hand, weekly sales for recent weeks, full price, unit cost, weeks left in the season, and size or variant availability if relevant."
    type: text
    required: true
  - name: markdown_history
    description: "How past markdowns changed weekly sales at each discount depth (for example 20% off doubled sales), how sales usually fall through the season, and what leftovers are worth at season end (outlet, jobber, write-off). Optional."
    type: text
  - name: rules
    description: "Business rules: target sell-through, allowed markdown steps, minimum margin, dates when markdowns can start. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Where each item stands, Projected end-of-season stock, Markdown options, Recommendation, Watch next week]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Merchandisers manage seasonal stock by projecting sell-through (units sold divided by units received) to the end of the season. The current rate of sale times the weeks left gives a first projection, but weekly sales usually fall as the season goes on, so a straight run rate overstates what will sell. Weeks of cover (stock on hand divided by weekly sales) compared with weeks left shows at a glance which items will be stuck. Marking down early and shallow usually earns more than late and deep, because there are more weeks to sell at a modest discount; but marking down a strong seller early gives margin away. Each option is compared on total margin: units sold at full price, units sold at the markdown price, and leftovers at their salvage value. Broken size runs slow an item regardless of price, and some regions regulate reference prices in sales (the "was" price must be genuine).
</context>

<task>
<stock_position>
{{stock_position}}
</stock_position>
{{#markdown_history}}

<markdown_history>
{{markdown_history}}
</markdown_history>
{{/markdown_history}}
{{#rules}}

<rules>
{{rules}}
</rules>
{{/rules}}

1. For each item compute sell-through to date, recent weekly rate of sale, weeks of cover, and weeks left; flag items whose cover far exceeds weeks left and items likely to sell out early.
2. Project end-of-season sales at full price with a declining rate if history shows one (state the decay used), and the projected leftover units.
3. For items at risk, evaluate markdown options (for example 20%, 30%, 50% off now or in two weeks) using the past uplift per depth: projected units sold, leftovers, and total margin including salvage value of leftovers. Show the arithmetic for one item in full.
4. Recommend per item: hold, mark down now (depth), or plan a later step; respect the rules given.
5. Note items limited by broken sizes or poor display rather than price, where a markdown will not help much.
6. Say what to check next week to confirm or change the plan.
</task>

<constraints>
- Do not invent markdown uplifts; if none are given, show results for a few labelled uplift assumptions.
- Compare options on total margin, not on units cleared alone.
- Do not suggest fictitious "was" prices or misleading sale claims; note that reference-price rules vary by country.
- Show arithmetic and label approximations.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Items to mark down now, items to hold, and the margin at stake.

## Where each item stands
Table: item | received | sold | sell-through | weekly rate | stock | weeks of cover | weeks left.

## Projected end-of-season stock
Table: item | projected full-price sales | projected leftover.

## Markdown options
Table: item | option | units sold | leftover | total margin.

## Recommendation
Per item: action, depth, timing, reason.

## Watch next week
Bullets.
</output_format>
