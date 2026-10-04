---
schema: 1
id: decide-stall-to-shopfront-move
kind: prompt
title: Decide on moving from stall to shopfront
description: Decides whether a market trader or online seller should take a shopfront - sales needed to cover rent and staff, what current sales data shows, trial steps like a pop-up, and the trigger points.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, artist]
subject: [retail]
requires: [none]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [shopfront, market-trader, break-even, sales-per-day, step-up-options, trigger-points]
pairs_with:
  prompts: [plan-pop-up-shop, plan-market-stall, plan-shop-opening, inspect-commercial-unit-before-lease]
args:
  - name: current_sales
    description: Your current selling - stall days and takings per day, online orders and average order value, gross margin, repeat customers, seasonality and how long you have traded. Paste figures or a summary.
    type: text
    required: true
  - name: shop_costs
    description: What a shop would cost if you know - rent, service charge, local property taxes, fit-out, staff hours you would need, opening hours.
    type: text
  - name: goals
    description: Why you want a shop (more sales, a base for workshops, storage, less setting up, brand) and what you are not willing to risk (savings, home, weekends).
    type: text
output_contract:
  format: markdown
  sections: [What your numbers say, What a shop would need to take, Gap and realism check, Options short of a full lease, Recommendation and trigger points, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a market trader, craft seller or online shop owner decide whether to take on a permanent shopfront. Good stall days are misleading: market crowds are concentrated into a few busy hours that a shop must spread across six days a week, a shop adds fixed costs that run every day whether it rains or not, and someone has to stand in it - so the owner either stops making, stops trading at markets, or pays staff. The decision should come from daily sales required versus evidence, with cheaper steps in between (shared shop, concession, pop-up, a workshop with open days) before signing a lease of several years.
</context>

<task>
<current_sales>
{{current_sales}}
</current_sales>
{{#shop_costs}}

<shop_costs>
{{shop_costs}}
</shop_costs>
{{/shop_costs}}
{{#goals}}

<goals>
{{goals}}
</goals>
{{/goals}}

1. What your numbers say: monthly sales and gross profit by channel, trend over time, seasonality, repeat rate, and how much of the sales a shop might cannibalise (stall regulars and local online buyers who would just switch).
2. What a shop would need to take: monthly fixed costs (rent, service charge, property taxes, insurance, utilities, card fees, staff for the hours the owner cannot cover, a set-aside for the fit-out spread over the lease), divided by the gross margin to give monthly sales needed, then sales per open day and transactions per day at the current average sale. Use their figures; mark estimates where shop costs are missing.
3. Gap and realism check: compare with what the stall and online data suggests. Ask what conversion and footfall would make it work, and whether the owner's time would collapse other channels. State the size of the gap plainly.
4. Options short of a full lease: shared shop or maker collective, concession in another shop, a 2-to-8-week pop-up, a short licence or a meanwhile-use unit, a studio with open days, more market days. For each: cost, risk, and what it would prove.
5. Recommendation and trigger points: a recommendation (go now, test first, or not yet) and the concrete triggers that would justify a lease - for example a pop-up hitting a set sales per day for four weeks, a repeat-customer count, a cash buffer equal to six months of shop fixed costs.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent rents, footfall, tax amounts or conversion rates for their area; mark assumptions and say how to check them (agents, other traders, a pop-up test).
- Show every calculation step so it can be checked.
- If current sales figures or margin are missing, ask for them first, because the decision depends on them; give the structure with [X] meanwhile.
- The final decision is the owner's; for lease terms point to a property solicitor and for finance an accountant.
</constraints>

<output_format>
## What your numbers say
Table: Channel | Monthly sales | Gross profit | Trend | Notes.

## What a shop would need to take
Table of monthly fixed costs, then the arithmetic to sales per day and transactions per day.

## Gap and realism check
Three to six bullets with the gap stated in numbers.

## Options short of a full lease
Table: Option | Cost | Risk | What it proves.

## Recommendation and trigger points
The recommendation in two sentences, then a checklist of triggers with numbers.

## Questions
Short bullets.
</output_format>
