---
schema: 1
id: build-small-business-budget
kind: prompt
title: Build a small business budget
description: Builds an annual budget for a small business from revenue drivers and cost lines, phased by month with seasonality, sanity checks and a monthly variance review routine.
category: accounting
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager, executive]
requires: [none]
inputs: [text, dataset]
output: [table, plan, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [annual-budget, variance-analysis, revenue-drivers, seasonality]
pairs_with:
  prompts: [forecast-cash-flow, review-small-business-pnl, calculate-break-even]
  personas: [fractional-cfo]
args:
  - name: business
    description: What the business sells, to whom, how it charges, team size, main cost lines, seasonality, and the budget year.
    type: text
    required: true
  - name: last_year_figures
    description: Last year's revenue and costs by line or by month, from the profit and loss if you have it. Optional; without it, the budget is built from drivers and labelled assumptions.
    type: text
  - name: goals
    description: What the year should achieve (revenue target, margin, a hire, paying the owner a set salary, saving for equipment). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Annual budget, Monthly phasing, Sanity checks, Variance review routine, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build a small business budget the way a good finance lead does: revenue from drivers the owner can influence and check (customers, price, volume, capacity), costs from known commitments plus explicit allowances, phased by month so it can be compared with actuals, and paired with a short routine that turns it into decisions. A budget that is just last year plus ten percent tells the owner nothing when the year goes off plan.

The budget is profit-based. Cash timing differs (customer payment terms, annual bills, equipment, loan capital, tax), so point the user to a cash forecast for that.
</context>

<task>
Business:

<business>
{{business}}
</business>

{{#last_year_figures}}Last year:

<last_year_figures>
{{last_year_figures}}
</last_year_figures>{{/last_year_figures}}

{{#goals}}Goals: {{goals}}{{/goals}}

1. Choose the revenue drivers that fit this model (for example customers times average order times frequency; billable hours times rate times utilisation; covers times spend times opening days) and set each assumption, saying whether it comes from last year, the user, or your placeholder.
2. Build direct costs as a percentage of revenue or per unit, and fixed costs line by line: people (gross pay plus employer costs and benefits), premises, software, marketing, insurance, professional fees, finance costs, depreciation, owner pay, and a contingency of 3 to 5 percent of costs with the reason.
3. Phase revenue and variable costs by month using the seasonality given, and fixed costs when they actually fall (annual renewals, a hire starting mid-year).
4. Run sanity checks: gross and net margin against last year, revenue growth against capacity (can the team deliver it?), break-even month, and whether the goals are met.
5. Write a variance review routine: monthly comparison of actuals to budget by line, investigation thresholds (for example 10 percent and a minimum amount), a one-line explanation per variance, and a quarterly reforecast.
6. List the open questions whose answers would most change the budget.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never present an invented number as fact. Every assumption is labelled with its source, and placeholders say "replace".
- Keep the arithmetic consistent: monthly figures sum to the annual totals, and the totals in every table agree.
- Keep capital purchases and loan repayments out of the profit budget, and list them separately for the cash forecast.
- If the figures suggest the business is loss-making or the goals are unreachable, say so plainly with the numbers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Table: assumption | value | source (last year, user, placeholder).

## Annual budget
Table: line | annual amount | percent of revenue | versus last year.

## Monthly phasing
Table with months as columns for revenue, gross profit, total fixed costs and net profit, plus a cumulative net profit row.

## Sanity checks
Bullets with figures.

## Variance review routine
Checklist.

## Open questions
Numbered, highest impact first.
</output_format>
