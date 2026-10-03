---
schema: 1
id: plan-financial-independence
kind: prompt
title: Plan for financial independence
description: Calculates a financial-independence number and timeline from spending, savings rate and return assumptions, with scenarios, a sensitivity check and sequence-of-returns caveats.
category: financial-planning
version: 1.1.0
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
  - {version: 1.1.0, note: "Defines one central case across a withdrawal-rate and return grid, gives the closed-form years-to-FI formula, and spells out the two-phase method for a pension that starts later."}
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
2. Scenario grid: withdrawal rates of 3%, 3.5% and 4%, and real returns after fees of 2%, 4% and 6%. If the person gave a rate or return, use it as the middle value and one step either side (0.5 points for withdrawal rate, 2 points for return). The central case is the middle withdrawal rate with the middle return; use it wherever a single number is reported.
3. Your FI number: (annual spending in independence - guaranteed income already being received) / withdrawal rate, at each withdrawal rate, with the multiple of spending each implies. If a pension or other guaranteed income starts later, use two phases: the portfolio needed from that age = (spending - that income) / withdrawal rate, plus a bridge = (that income x years between independence and its start), held in today's money with no growth assumed (a conservative simplification; say so). Add taxes on withdrawals as a labelled assumption or a question.
4. Timeline: years to reach each FI number at each return, with savings C added once a year to invested assets P: n = ln((FI x r + C) / (P x r + C)) / ln(1 + r), from FV = P(1+r)^n + C((1+r)^n - 1) / r. Show the substitution for the central case. If P already meets the FI number, n = 0; if a target age was given, also compute the portfolio reached at that age with the FV formula and compare.
5. What moves the date most: recompute the central case with savings increased by 10% of take-home pay, spending in independence 10% lower, and returns 1 point lower. Name the biggest lever.
6. Bridging and access: if independence comes before retirement accounts or pensions can be accessed, say the plan needs enough in accessible accounts to cover spending until then (years x spending), and compare that with what is in accessible accounts now. Mark access ages and rules "verify" for their country.
7. Risks the averages hide: sequence-of-returns risk with a short illustration (the same average return with a large fall in year one versus year twenty), inflation in specific costs such as health care, longevity, and flexibility as a defence (spending cuts in bad years, part-time income, a cash buffer of one to two years of spending).
8. Questions to check with a financial planner or tax adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- All returns are hypothetical assumptions in real terms after fees; say once that real returns vary and can be negative for years, and never present them as forecasts.
- If a stated return is described as guaranteed, or is far above what a diversified portfolio has historically earned after inflation (roughly above 7% real), say so plainly, note that a guaranteed high return is a common scam signal, and run the default grid instead of building the plan on it.
- Show formulas with numbers substituted for at least one case and round years to one decimal place. Results must be arithmetically consistent across tables.
- Do not recommend funds, products, asset allocations or providers.
- Use only figures given; missing items (age, existing assets) become questions, or labelled assumptions if the answer can still proceed.
- If the person has high-interest debt or no emergency fund, note that those usually come first and how that affects the timeline.
{{> output/uncertainty}}
</constraints>

<output_format>
## The answer
FI number range, central-case FI number and age, and the key assumption, in three lines.

## Your FI number
Table: withdrawal rate | multiple of spending | FI number. If there are two phases, the post-pension portfolio and the bridge as separate columns.

## Timeline scenarios
Grid: rows are real returns, columns are withdrawal rates, each cell "years (age)". Central case marked. Substitution for the central case below.

## What moves the date most
Table: change | years to FI | difference vs central.

## Bridging and access
Short paragraph and the bridge amount.

## Risks the averages hide
Bullets with the sequence illustration.

## Questions to check
Numbered.
</output_format>
