---
schema: 1
id: build-weekly-spending-plan
kind: prompt
title: Build a weekly spending plan
description: Turns a monthly budget into a weekly spending allowance with bills assigned to paydays and a weekly reset ritual, for people paid weekly or who run out of money mid-month.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, student]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [weekly-budget, spending-allowance, cash-flow, money-routine]
pairs_with:
  prompts: [build-monthly-budget, plan-bill-payment-calendar, set-up-money-accounts-system]
  personas: [personal-finance-coach]
args:
  - name: monthly_budget
    description: Take-home income, how often and on which dates you are paid, and fixed bills with amounts and due dates (rent, utilities, phone, debt payments, savings transfers).
    type: text
    required: true
  - name: variable_spending
    description: "Optional: what you usually spend on day-to-day things such as groceries, fuel or transport, eating out and fun, and when in the month the money tends to run out."
    type: text
  - name: currency
    description: Currency code or symbol for amounts. Optional; inferred from the input if missing.
    type: string
output_contract:
  format: markdown
  sections: [The numbers, Weekly allowance, Bills by payday, Weekly reset ritual, Five-week months and rollovers, Assumptions and questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a monthly budget into a plan the person lives week by week. Monthly budgets often balance on paper and still fail, because day-to-day money is spent freely in the first week after payday and the last week is a scramble. A weekly allowance fixes that: bills are ring-fenced first, and the money left for groceries, transport and fun is split into equal weekly amounts released on the same day each week. The arithmetic matters: a month is about 4.33 weeks (52 / 12), so dividing a monthly amount by 4 overspends by roughly 8%, and some months contain five paydays or five reset days. For people paid weekly or every two weeks, bills must be matched to the pay that covers them.

{{#currency}}Currency: {{currency}}{{/currency}}
</context>

<task>
Monthly budget:

<monthly_budget>
{{monthly_budget}}
</monthly_budget>

{{#variable_spending}}
Day-to-day spending:

<variable_spending>
{{variable_spending}}
</variable_spending>

{{/variable_spending}}
1. Convert everything to a monthly and a yearly view: income (weekly pay x 52 / 12, biweekly x 26 / 12), fixed bills, savings transfers. Show what is left for day-to-day spending.
2. Set the weekly allowance: yearly day-to-day money / 52. Split it into the person's main variable categories (groceries, transport, fun) if they want separate limits, or one combined figure. Compare with what they currently spend and say where it is tight.
3. Assign each bill to the payday that covers it, so that each pay period shows: pay in, bills out, savings out, weekly allowances out, and a small buffer left. Flag any pay period that goes negative and fix it by moving a bill date (if the provider allows it), building a one-off buffer, or shifting a savings transfer.
4. Design the mechanics: a bills account or pot for fixed costs, and the weekly allowance moved on the same day each week to the account or card used for spending (or withdrawn as cash if the person prefers). Say what happens when the allowance runs out (stop, or borrow from next week only with a payback rule).
5. Write a 10-minute weekly reset ritual: check last week's spending, roll over or sweep any surplus, release this week's allowance, look at the week's calendar for known costs (birthdays, trips).
6. Explain five-week months and extra paydays: how many allowances fall in each month and where the spare allowances or extra pay go.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given; mark any estimated category as a placeholder.
- Use 52 / 12 conversions, never x 4, and show the arithmetic so totals reconcile with the monthly budget.
- Do not recommend specific banks, apps or products.
- If income does not cover fixed bills, say so first and suggest free non-profit money advice before designing allowances.
- No moralising about spending choices.
{{> output/uncertainty}}
</constraints>

<output_format>
## The numbers
Short table: income, fixed bills, savings, left for day-to-day, monthly and yearly.

## Weekly allowance
The weekly figure, split by category if wanted, with the arithmetic and a comparison with current spending.

## Bills by payday
Table: payday | pay in | bills out | savings out | allowances out | left.

## Weekly reset ritual
Checklist.

## Five-week months and rollovers
Bullets: which months need an extra allowance and the rollover rule.

## Assumptions and questions
Bullets.
</output_format>
