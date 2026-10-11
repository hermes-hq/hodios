---
schema: 1
id: prioritize-financial-goals
kind: prompt
title: Prioritise competing financial goals
description: Ranks competing money goals - emergency fund, debts, retirement, a home, children, travel - into an order and a monthly split that fits your surplus, with the trade-offs made visible.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [money-goals, savings-priorities, monthly-allocation, trade-offs]
pairs_with:
  prompts: [build-net-worth-statement, plan-savings-goal, build-emergency-fund-plan, plan-debt-payoff, plan-windfall]
  personas: [personal-finance-coach]
args:
  - name: goals
    description: Every goal you have in mind, with a rough amount and date if you know them, and how much each matters to you.
    type: text
    required: true
  - name: finances
    description: Monthly take-home pay, the amount left after essentials and bills, savings, debts with rates, and any employer pension or retirement match.
    type: text
    required: true
  - name: country
    description: Country, because tax-advantaged accounts and employer schemes differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your goals made concrete, Priority order, Monthly split, What waits and why, Check-in points, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people decide which money goals to fund first when they cannot fund them all. Most people try to save a little for everything and finish nothing, or they pick by mood. A sounder order, which planners broadly share, is: a starter emergency buffer; any employer retirement match (an immediate return that is hard to beat); high-interest debt; a full emergency fund; then goals by date and importance, with near-term goals kept in safe savings and long-term ones able to take more risk. Within that order, the person's values decide ties: a goal that matters a lot can go earlier if the trade-off is seen and accepted. A goal with no amount and no date is a wish, so the first job is to make each goal concrete.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Goals:

<goals>
{{goals}}
</goals>

Finances:

<finances>
{{finances}}
</finances>

1. Make each goal concrete: amount, date, and the monthly saving it needs. Where the person gave no amount or date, propose a placeholder and mark it [confirm]. Show the arithmetic.
2. Set a priority order using the default sequence above, adjusted for the person's stated values, and say in one line why each goal sits where it does.
3. Split the monthly surplus across the goals in that order. If the total needed exceeds the surplus, show which goals are fully funded, partly funded, or waiting, and what changing a date or amount would do.
4. For goals that wait, say what has to happen first (for example, "starts when the card is cleared, in about 9 months") so nothing is abandoned.
5. Set check-in points: a date to review, and the events that should trigger a re-plan (pay rise, new debt, baby, job change).
6. List assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the person's figures; mark placeholders. Do not invent interest rates or returns; if you use an illustrative savings rate, label it.
- Do not recommend specific products, accounts or investments. You may name account types to ask about in the person's country.
- Respect the person's values; show the cost of a choice rather than overruling it.
- If essentials are not covered by income, say the first step is a budget and debt help, not goal planning.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your goals made concrete
Table: goal | amount | date | monthly needed.

## Priority order
Numbered list with one-line reasons.

## Monthly split
Table: goal | monthly amount | funded fully, partly or waiting.

## What waits and why
Bullets.

## Check-in points
Bullets.

## Assumptions
Bullets.
</output_format>
