---
schema: 1
id: recover-from-overspending
kind: prompt
title: Recover from an overspent month
description: Makes a calm recovery plan after a month of overspending, such as a holiday, an emergency or a splurge, sizing the hole, protecting essentials, and spreading the catch-up over the next few months.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, student]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [overspending, budget-recovery, catch-up-plan, money-stress]
pairs_with:
  prompts: [build-monthly-budget, plan-no-spend-month, clear-overdraft, set-up-sinking-funds]
  personas: [personal-finance-coach]
args:
  - name: what_happened
    description: What you overspent on and by roughly how much, and where the money came from (savings, card, overdraft, buy now pay later, borrowing from family).
    type: text
    required: true
  - name: budget
    description: Your normal monthly take-home and main costs, so the catch-up fits. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The size of the hole, This week, The catch-up plan, Protect the essentials, Stop it happening again]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
After an overspent month people often swing to an extreme: either a crash budget they cannot keep, or giving up because "it's already ruined". Both make it worse. The practical recovery is to measure the hole exactly, stop it growing (especially on expensive credit), protect rent, utilities and minimum payments first, and then repay at a pace the budget can carry over two to six months. Where the money came from matters: an overdraft or credit card charges interest daily and should be cleared before refilling savings; buy now pay later instalments and late fees need to be listed with dates; money taken from an emergency fund is refilled last unless the fund is now empty. A recurring trigger (holidays, birthdays, a stressful week) usually needs a sinking fund, not more discipline.

<what_happened>
{{what_happened}}
</what_happened>
{{#budget}}Normal budget: {{budget}}{{/budget}}
</context>

<task>
1. The size of the hole: total what was overspent and list each source with its cost (interest rate, fees, due dates). Mark unknown rates as questions.
2. This week: three to five immediate actions (pause new card or instalment use, check upcoming due dates, move any surplus to the most expensive balance, cancel or return anything still returnable).
3. The catch-up plan: two paces, gentle and faster, as a month-by-month table showing how much goes to each source and when each is cleared, most expensive first. If a budget is given, show where the monthly catch-up money comes from (named lines trimmed, not "spend less").
4. Protect the essentials: confirm rent, utilities, food and minimum payments stay covered during catch-up; if they would not be, say so.
5. Stop it happening again: name the trigger from what they said and one structural fix (a sinking fund amount, a spending cap, a cooling-off rule).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Calm, practical tone; no blame.
- Use their numbers; mark assumptions. Do not invent interest rates.
- Do not suggest new borrowing (another card, a loan, payday credit) to fix it, except to note a zero-interest balance transfer is something some people check, with its fees and risks.
- If the overspend has left essentials or minimum payments unaffordable, put that first and point to free money or debt advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## The size of the hole
Table: source | amount | cost | due.

## This week
Checklist.

## The catch-up plan
Two tables or one table with two columns of pace.

## Protect the essentials
Short paragraph.

## Stop it happening again
Two or three bullets.
</output_format>
