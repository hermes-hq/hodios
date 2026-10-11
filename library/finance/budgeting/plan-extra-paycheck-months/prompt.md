---
schema: 1
id: plan-extra-paycheck-months
kind: prompt
title: Plan your extra paycheck months
description: Finds the months with a third biweekly or fifth weekly paycheck, checks the budget runs on the base pays, and decides in advance where each extra paycheck goes.
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
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [biweekly-pay, weekly-pay, windfall, cash-flow]
pairs_with:
  prompts: [plan-bill-payment-calendar, build-monthly-budget, plan-debt-payoff]
  personas: [personal-finance-coach]
args:
  - name: pay
    description: How often you are paid (weekly or every two weeks), take-home per pay, the date of your next payday, and how your monthly bills are currently split across paydays.
    type: text
    required: true
  - name: priorities
    description: Debts with interest rates, savings goals, emergency fund status, and upcoming costs you know about.
    type: text
    required: true
  - name: currency
    description: Currency code or symbol for amounts. Optional; inferred from the input if missing.
    type: string
output_contract:
  format: markdown
  sections: [Your extra-pay months, Is your budget built on the base pays, Plan for each extra paycheck, Rules for future years, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone paid weekly or every two weeks use their extra paychecks well. Paid every two weeks, a person gets 26 pays a year, so two months usually contain three paydays (occasionally three months, when the year has 27 paydays). Paid weekly, there are 52 or 53 pays, so about four months contain five. Experts budget monthly bills on the base number of pays (two or four) so the extra paychecks arrive as true surplus, and they decide where that surplus goes before it arrives, because undecided extra money is usually spent. The months depend on the date of the first payday, and pay may arrive a day early when a payday falls on a weekend or public holiday, which can move it into the previous month.

{{#currency}}Currency: {{currency}}{{/currency}}
</context>

<task>
Pay:

<pay>
{{pay}}
</pay>

Priorities:

<priorities>
{{priorities}}
</priorities>

1. List every payday for the next 12 months from the next payday given, and mark the months with an extra pay. Note that weekend or holiday shifts could move a payday and the person should check their employer's pay calendar.
2. Check the budget: monthly bills and savings should be covered by the base pays (pay x 2 for biweekly, pay x 4 for weekly). If they rely on the extra pays, say so and show how to rebalance: monthly bills spread over base pays, and the annual difference between "pay x 26 / 12" and "pay x 2" set aside.
3. Plan each extra paycheck with a priority order, adjusted to the person's goals: top up an emergency fund to a first target; catch up any sinking fund that is behind; pay extra on the highest-interest debt; fund a known upcoming cost; then a goal. Give each extra paycheck a specific split in money, and include a small share for something enjoyable so the plan holds.
4. Show the year's total from extra paychecks and what it achieves (for example months removed from a debt payoff or the emergency fund reached), with arithmetic.
5. Write two or three rules for future years: check the pay calendar each January, move the extra pay to its destination on the day it lands, and review the split when goals change.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given. Show payday arithmetic so it can be checked against a calendar.
- Do not recommend specific banks, products or investments.
- If bills currently need the extra paychecks to be covered, say plainly that the budget is short and the extra pays are not spare.
- If the person is behind on priority bills, put catching up on those first and suggest free non-profit money advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your extra-pay months
Table: month | paydays | extra pay amount.

## Is your budget built on the base pays
Short verdict with arithmetic and any rebalancing needed.

## Plan for each extra paycheck
Table: month | amount | split by destination.

## Rules for future years
Up to three bullets.

## Questions
Bullets.
</output_format>
