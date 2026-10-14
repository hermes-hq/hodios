---
schema: 1
id: build-retiree-budget
kind: prompt
title: Build a budget for living in retirement
description: Builds a monthly budget for someone already retired on pension and savings income, with irregular big costs, health and home spending, a cash reserve and an early warning if savings run down too fast.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [retirement-budget, pension-income, fixed-income, later-life]
pairs_with:
  prompts: [plan-retirement-drawdown, set-up-sinking-funds, cut-monthly-costs, plan-long-term-care-costs]
  personas: [personal-finance-coach]
args:
  - name: income
    description: Monthly income from state and private pensions, annuities, part-time work or rent, and when each is paid, after tax if you know it.
    type: text
    required: true
  - name: costs_and_savings
    description: Regular costs, irregular ones (car, home repairs, travel, gifts to family, dental), savings balances and how much you take from them now.
    type: text
    required: true
  - name: country
    description: Country of residence, for benefits and tax points to check. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your income floor, Monthly budget, Irregular and rising costs, Savings top-up check, Help to check, Yearly review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Budgeting in retirement differs from working-life budgeting in a few ways that matter. Income is mostly fixed and paid on different dates, so the "income floor" (guaranteed pensions and annuities) is set against essential costs first. Spending is lumpy: car replacement, roof repairs, dental work, travel in the early active years and help for children or grandchildren. Costs often follow a pattern, higher in the active early years, lower in the middle, then rising again with care and health needs. Inflation erodes fixed income that is not index-linked. And money drawn from savings has to be sustainable: taking a little too much each year is hard to notice until the balance is low. Many retirees also miss benefits, tax allowances or discounts they are entitled to.

<income>
{{income}}
</income>

<costs_and_savings>
{{costs_and_savings}}
</costs_and_savings>
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Your income floor: total the guaranteed monthly income, note which parts rise with inflation and which do not, and compare it with essential costs (housing, utilities, food, insurance, transport, health). Say whether essentials are covered by the floor alone.
2. Monthly budget: a table of income and spending lines including a monthly set-aside for irregular costs, showing the gap that savings must fill each month, if any.
3. Irregular and rising costs: list the lumpy costs mentioned plus common ones they did not mention (as questions), with a yearly estimate only where they gave a figure, and a sinking-fund amount for each.
4. Savings top-up check: express the yearly amount drawn from savings as a percentage of the savings balance and how many years the balance would last at that rate with no growth. Explain plainly that a high percentage is a warning sign worth taking to an adviser, without promising any safe rate.
5. Help to check: categories of entitlement worth checking locally (pension credits or top-ups, housing or council tax support, age-related tax allowances, health cost help, travel and energy discounts) as questions, not claims.
6. Yearly review: what to recheck each year (pension increases, bills, the drawdown rate, care needs).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell them how to invest savings or which annuity or product to buy.
- Do not invent benefit names, amounts or eligibility; frame them as things to check with the relevant agency or a free advice service.
- Use their figures; mark estimates and ask about missing big items.
- If income plus a reasonable draw cannot cover essentials, say so and point to free advice services for older people and benefit checks.
- Use respectful, plain language; no assumptions about tech skills or health.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your income floor
Short table and a one-line verdict.

## Monthly budget
Table: line | monthly amount | note.

## Irregular and rising costs
Table: cost | yearly estimate | monthly set-aside.

## Savings top-up check
Calculation and plain-language reading.

## Help to check
Bullets framed as questions.

## Yearly review
Checklist.
</output_format>
