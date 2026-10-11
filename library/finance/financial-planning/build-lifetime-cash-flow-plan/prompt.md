---
schema: 1
id: build-lifetime-cash-flow-plan
kind: prompt
title: Build a lifetime cash flow plan
description: Builds a year-by-year household cash flow plan from now to late life - income, spending, big goals, retirement and assets in one model - to show whether the plan holds and which lever matters most.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, plan, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cash-flow-forecast, life-goals, retirement-income, scenario-planning, household-finances]
pairs_with:
  prompts: [prioritize-financial-goals, plan-retirement-scenarios, build-net-worth-statement, prepare-financial-adviser-meeting]
  personas: [personal-finance-coach]
args:
  - name: household
    description: Ages of everyone in the household, take-home incomes and how they are expected to change, planned retirement ages, and expected state or workplace pensions.
    type: text
    required: true
  - name: spending_and_assets
    description: Current yearly spending (essential and lifestyle), savings and investments, pensions, property and mortgage, other debts, and regular saving amounts.
    type: text
    required: true
  - name: goals
    description: Big future events with rough years and costs - children's education, home move or renovation, car replacements, helping family, sabbaticals, travel, inheritance expected or to leave. Optional.
    type: text
  - name: country
    description: Country, for tax and pension assumptions to mark as verify.
    type: string
output_contract:
  format: markdown
  sections: [Model set-up, Cash flow by phase, Year-by-year table, Pressure points, Levers, Assumptions to revisit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build lifetime cash flow plans, the core tool financial planners use. Unlike a single retirement projection, it puts every year of the household's life on one page: income in, spending out, the big one-off goals, and the resulting balance of savings and investments. Its value is in showing when money runs short (often the decade of children's costs plus mortgage, or the gap between stopping work and pensions starting) and which change makes the biggest difference. Good practice is to work in today's money with a real return (after inflation and fees), keep assumptions few and visible, treat spending as stepping down or changing in phases rather than flat, include one-offs like car replacements and home repairs, and run at least one stress case. Expected inheritances should be treated as uncertain. The result is a map for decisions, not a forecast.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Household:

<household>
{{household}}
</household>

Spending and assets:

<spending_and_assets>
{{spending_and_assets}}
</spending_and_assets>
{{#goals}}

Goals:

<goals>
{{goals}}
</goals>
{{/goals}}

1. Set up the model: today's money, a base real return and a lower one, the plan end age (state it, for example 95), and how income, spending and goals are treated in each life phase. List missing data and the placeholder used.
2. Summarise cash flow by phase (for example: now to children leaving, until retirement, early retirement, later life): typical yearly income, spending, surplus or shortfall.
3. Build a year-by-year table in five-year steps (or yearly for the next five years and around key events): ages, income, spending, one-off goals, net cash flow and end-of-year assets, for the base case. Show the arithmetic for the first row so it can be checked.
4. Identify pressure points: years with a shortfall, the lowest asset point, whether assets last to the end age, and what happens under the lower return.
5. Show the levers and their effect on the outcome: retiring one or two years later, saving more now, trimming lifestyle spending, changing a goal's size or timing, downsizing later. Rank them by impact.
6. List the assumptions to revisit each year.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not predict returns, inflation or house prices. Use labelled assumptions and a stress case.
- Never invent tax rates or pension amounts; use the person's figures or mark placeholders "verify".
- Treat expected inheritances as a separate scenario, not part of the base case.
- Keep the table readable: summarise rather than print 60 rows, and say how to extend it in a spreadsheet.
- Do not recommend products. The output is a planning map, not advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## Model set-up
Short bullets with key assumptions and missing data.

## Cash flow by phase
Table: phase | ages | income | spending | surplus or shortfall.

## Year-by-year table
Table: year | ages | income | spending | one-offs | net cash flow | assets at year end.

## Pressure points
Bullets.

## Levers
Table: lever | change | effect on assets at the end age or lowest point.

## Assumptions to revisit
Bullets.
</output_format>
