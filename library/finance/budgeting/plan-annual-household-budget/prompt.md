---
schema: 1
id: plan-annual-household-budget
kind: prompt
title: Plan an annual household budget
description: Builds a 12-month household budget that maps irregular costs to the months they fall, finds the pinch-point months and smooths them into steady monthly set-asides.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [annual-budget, irregular-expenses, cash-flow, sinking-funds]
pairs_with:
  prompts: [set-up-sinking-funds, build-monthly-budget, plan-bill-payment-calendar]
  personas: [personal-finance-coach]
args:
  - name: income
    description: Take-home pay for each earner, pay frequency and dates, and any bonuses, tax refunds, benefits or seasonal income with the month they arrive.
    type: text
    required: true
  - name: costs
    description: Regular monthly costs, plus every irregular cost you know of with its amount and month (insurance renewals, car tax and servicing, holidays, school fees and uniforms, birthdays and festivals, annual subscriptions, tax bills, heating season).
    type: text
    required: true
  - name: start_month
    description: "Optional: the month the plan starts. Defaults to the next full month."
    type: string
  - name: currency
    description: Currency code or symbol for amounts. Optional; inferred from the input if missing.
    type: string
output_contract:
  format: markdown
  sections: [Year at a glance, Month by month, Irregular costs calendar, Smoothing plan, Pinch points, Review dates, Assumptions and questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build a household's budget for a whole year, not just a typical month. A monthly budget can balance in an ordinary month and still fail in the months when the car insurance, the school uniform, a festival and a heating bill all land together. Planning by year shows the real picture: the annual total of costs that only appear once or twice, the months where cash runs low, and the steady monthly amount that pays for everything if it is set aside from the start. Experts also plan for the less obvious: months with an extra paycheck for people paid weekly or every two weeks, bonuses that should not be spent before they arrive, higher energy bills in the cold or hot season, tax bills or refunds, and the gap if a plan starts mid-year with funds still empty.

{{#start_month}}Plan starts: {{start_month}}{{/start_month}}
{{#currency}}Currency: {{currency}}{{/currency}}
</context>

<task>
Income:

<income>
{{income}}
</income>

Costs:

<costs>
{{costs}}
</costs>

1. Build the year: for each of the 12 months, list income (counting extra paydays and the month bonuses or refunds actually arrive), regular costs, and the irregular costs falling in that month.
2. Calendar the irregular costs: each one with its month, amount and yearly total. Add likely irregular costs that are missing (car repairs, gifts, medical or dental, replacing clothes and devices, annual subscriptions) as labelled placeholders for the person to fill in.
3. Show the unsmoothed cash flow: each month's surplus or deficit and the running balance, starting from the savings stated. Identify the lowest point and when it happens.
4. Smooth it: total yearly irregular costs / 12 = the monthly set-aside. Rebuild the month-by-month view with that transfer, showing the fund balance rising and falling. If the plan starts mid-year and a big cost comes before the fund can cover it, show the catch-up amount needed now.
5. Decide how to treat uncertain income: budget the year without bonuses or variable extras, and give a rule for using them when they arrive.
6. Name the pinch-point months and what to do about each: move a payment date, switch an annual payment to monthly (or the reverse if cheaper), build the fund earlier, or reduce the cost.
7. Set review dates: a quarterly check and an update when any big cost changes.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only amounts and months given; label every estimate as a placeholder and never present it as a fact.
- Show arithmetic and make each month's figures reconcile: income minus costs minus set-asides equals the change in balance.
- Do not recommend specific banks, products or providers.
- If the year runs a deficit overall, say so plainly and rank the changes by effect; do not balance it with invented cuts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Year at a glance
Three lines: yearly income, yearly costs, surplus or deficit.

## Month by month
Table with 12 rows: month | income | regular costs | irregular costs | set-aside | surplus or deficit | running balance.

## Irregular costs calendar
Table: cost | month | amount | yearly total. Totals row and the monthly set-aside.

## Smoothing plan
Bullets: the monthly transfer, where it goes, any catch-up amount and the rule for bonuses or extra pay.

## Pinch points
Bullets: month, why, and the fix.

## Review dates
Short list.

## Assumptions and questions
Bullets.
</output_format>
