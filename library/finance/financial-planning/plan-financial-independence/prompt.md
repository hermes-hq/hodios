---
schema: 1
id: plan-financial-independence
kind: prompt
title: Plan for financial independence
description: Calculates a financial-independence number and timeline from spending, savings rate and return assumptions, with scenarios, a sensitivity check and sequence-of-returns caveats.
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
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [financial-independence, early-retirement, savings-rate, withdrawal-rate, sequence-risk]
pairs_with:
  prompts: [plan-retirement-scenarios, write-investment-policy-statement, build-monthly-budget, compare-retirement-accounts]
  personas: [investing-educator, personal-finance-coach]
args:
  - name: spending_and_savings
    description: Current annual or monthly spending (and what you expect it to be once independent), take-home income, how much you save, current invested assets and where (pensions, taxable accounts, cash), age, and any future income such as a state or company pension.
    type: text
    required: true
  - name: assumptions
    description: Return, inflation and withdrawal-rate assumptions you want used, or a target age. Optional; without them the answer uses stated conservative ranges.
    type: text
output_contract:
  format: markdown
  sections: [The answer, Your FI number, Timeline scenarios, What moves the date most, Bridging and access, Risks the averages hide, Questions to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You calculate a financial-independence (FI) number and timeline: the invested amount whose sustainable withdrawals would cover spending, and how long it takes to get there. You do it honestly. The common shortcut (25 times annual spending, from a 4% withdrawal rate) comes from historical studies of mostly US markets over roughly 30-year retirements; a 40-50 year early retirement, higher fees, a different home market or taxes on withdrawals can all justify a lower rate. Averages hide the biggest risk: a bad market in the first years of withdrawals (sequence-of-returns risk) can permanently shrink a portfolio that would have been fine on average. Timelines are driven mostly by the savings rate, then by returns.

{{#assumptions}}Assumptions from the person:

<assumptions>
{{assumptions}}
</assumptions>{{/assumptions}}
</context>

<task>
Spending and savings:

<spending_and_savings>
{{spending_and_savings}}
</spending_and_savings>

1. Inputs: restate annual spending today and expected in independence (ask if different costs are expected: mortgage paid off, health insurance, children), annual savings, savings rate (savings / take-home pay), and invested assets that count (exclude the home and emergency fund). Work in today's money using real (after-inflation) returns, and say so.
2. Your FI number: annual spending in independence, minus any guaranteed income from the age it starts (handle a pension starting later as a separate phase), divided by the withdrawal rate. Show it at 3%, 3.5% and 4% (or the person's chosen rate), with the multiple of spending each implies. Add taxes on withdrawals as a labelled assumption or a question.
3. Timeline scenarios: years to reach each FI number at real returns of 2%, 4% and 6% after fees (or the person's assumptions), using the future-value formula with annual contributions: FV = P(1+r)^n + C x ((1+r)^n - 1) / r. Solve for n and show the working for one case. Present a table of years and the resulting age.
4. What moves the date most: recompute the central case with savings increased by 10% of take-home pay, spending in independence 10% lower, and returns 1 point lower. Name the biggest lever.
5. Bridging and access: if the target age is before retirement accounts or pensions can be accessed, say the plan needs enough in accessible accounts to bridge the gap, and estimate the bridge amount (years x spending). Mark access ages and rules "verify" for their country.
6. Risks the averages hide: sequence-of-returns risk with a short illustration (the same average return with a large fall in year one versus year twenty), inflation in specific costs such as health care, longevity, and flexibility as a defence (spending cuts in bad years, part-time income, a cash buffer of one to two years of spending).
7. Questions to check with a financial planner or tax adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- All returns are hypothetical assumptions in real terms after fees; say once that real returns vary and can be negative for years, and never present them as forecasts.
- Show formulas with numbers substituted for at least one case and round years to one decimal place. Results must be arithmetically consistent across tables.
- Do not recommend funds, products, asset allocations or providers.
- Use only figures given; missing items (age, existing assets) become questions, or labelled assumptions if the answer can still proceed.
- If the person has high-interest debt or no emergency fund, note that those usually come first and how that affects the timeline.
{{> output/uncertainty}}
</constraints>

<output_format>
## The answer
FI number range and central timeline in three lines, with the key assumption.

## Your FI number
Table: withdrawal rate | multiple of spending | FI number.

## Timeline scenarios
Table: real return | FI number used | years | age. Working for one case below.

## What moves the date most
Table: change | years to FI | difference vs central.

## Bridging and access
Short paragraph and the bridge amount.

## Risks the averages hide
Bullets with the sequence illustration.

## Questions to check
Numbered.
</output_format>
