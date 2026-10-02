---
schema: 1
id: compare-rent-vs-buy
kind: prompt
title: Compare renting and buying a home
description: Compares renting and buying a home over a time horizon with every cost on both sides, the opportunity cost of the deposit, the break-even year and a sensitivity check on the key assumptions.
category: financial-planning
version: 1.1.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [real-estate]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rent-vs-buy, mortgage, opportunity-cost, break-even]
pairs_with:
  prompts: [plan-savings-goal, build-monthly-budget]
args:
  - name: home_price
    description: Purchase price of the home you are considering.
    type: number
    required: true
  - name: rent
    description: Monthly rent for a comparable home.
    type: number
    required: true
  - name: horizon_years
    description: How many years you expect to stay before moving.
    type: number
    default: 7
  - name: assumptions
    description: Deposit, mortgage rate and term, purchase taxes and fees, property tax, insurance, service charges, maintenance, expected rent increases, home price growth, return on savings, selling costs, and country. Optional; missing items get stated defaults.
    type: text
output_contract:
  format: markdown
  sections: [Bottom line, Assumptions used, Cost over the horizon, Break-even, Sensitivity, Beyond the numbers, Questions to check locally]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Invested the yearly cost difference on whichever side is cheaper, and added a labelled placeholder mortgage rate when none is given."}
---
<context>
You run a fair rent-versus-buy comparison. Most comparisons are lopsided: they compare rent with the mortgage payment and stop, ignoring that part of a mortgage payment is saving (principal), that owners pay maintenance, insurance, property taxes and large transaction costs at both purchase and sale, and that the deposit could have earned a return if it stayed invested. The fair question is: after the horizon, which path leaves the person with more net wealth, and how sensitive is that answer to the assumptions?

Home price: {{home_price}}
Monthly rent: {{rent}}
Horizon: {{horizon_years}} years
{{#assumptions}}Stated assumptions:

<assumptions>
{{assumptions}}
</assumptions>{{/assumptions}}
</context>

<task>
1. List every assumption in a table. Use the person's values where given; otherwise apply clearly labelled defaults (for example: 20% deposit, a 25-year repayment mortgage, purchase costs 3-5% of price, maintenance 1% of price a year, selling costs 5%, home price growth 2% a year, rent growth 2.5% a year, return on invested savings 4% a year). Say the defaults are placeholders and that local values can differ a lot. If no mortgage rate is given, use a clearly labelled placeholder rate, put "get a current mortgage quote" first in the questions, and rely on the rate row in the sensitivity check.
2. Buying path: upfront cash (deposit plus purchase costs), mortgage payment split into interest and principal, property tax, insurance, maintenance and service charges, and at the end: sale price minus selling costs minus remaining mortgage = equity.
3. Renting path: rent growing each year, renter's insurance, and the upfront cash the buyer would have spent, invested at the assumed return. Treat the yearly difference symmetrically: in years when renting costs less than owning, the renter invests the difference; in years when owning costs less (rent has risen past the owner's costs), the owner invests the difference. End-of-horizon net wealth for each path = equity or invested savings at that point.
4. Compare net wealth at the end of the horizon for each path and compute the break-even year (when buying overtakes renting), or say there is none within 30 years.
5. Sensitivity: rerun the result with home price growth at 0% and 4%, mortgage rate 1 point higher, and horizon 3 years shorter and longer. Report which assumption the result depends on most.
6. Add the non-financial factors briefly: stability, flexibility, control over the home, concentration of wealth in one asset, effort of maintenance.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a scenario comparison, not a recommendation to buy or rent. The decision depends on the person's whole situation.
- Do not guess local taxes, mortgage rates or fees as facts. Where the country is given, mention which local costs to check (purchase taxes, notary or legal fees, property tax, tax relief on mortgage interest or capital gains on sale) without asserting the rates.
- Do not recommend lenders, mortgage types or properties.
- Show the yearly figures summarised (year 1, middle year, final year) and the totals; arithmetic must be consistent between the table and the bottom line. If you can run code or a spreadsheet, compute the year-by-year comparison there and report its results.
- If affordability looks stretched (housing costs above roughly a third to 40% of take-home pay, where income is known), say so and suggest an independent mortgage adviser.
{{> output/uncertainty}}
</constraints>

<output_format>
## Bottom line
Three lines: which path ends with more net wealth after {{horizon_years}} years under these assumptions, by how much, and the break-even year.

## Assumptions used
Table: assumption | value | source (given or default).

## Cost over the horizon
Table: item | buying | renting, with totals and end-of-horizon net wealth.

## Break-even
One or two sentences.

## Sensitivity
Table: change | result | break-even year.

## Beyond the numbers
Bullets.

## Questions to check locally
Numbered.
</output_format>
