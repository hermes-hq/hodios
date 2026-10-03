---
schema: 1
id: plan-retirement-drawdown
kind: prompt
title: Plan retirement income drawdown
description: Explains retirement income options and models illustrative withdrawal scenarios from savings and pensions, including sequence-of-returns risk, spending rules and questions for an adviser.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
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
tags: [retirement-income, drawdown, annuities, sequence-risk, withdrawal-rate, decumulation]
pairs_with:
  prompts: [plan-retirement-scenarios, compare-retirement-accounts, prepare-financial-adviser-meeting, plan-long-term-care-costs]
  personas: [investing-educator]
args:
  - name: savings_and_pensions
    description: Each pot and income source - pension and savings balances, any defined-benefit or workplace pension income and its start age, expected state or public pension and its start age, other income such as rent or part-time work.
    type: text
    required: true
  - name: spending_need
    description: The yearly (or monthly) spending you want in retirement in today's money, ideally split into essentials and nice-to-haves.
    type: string
    required: true
  - name: country
    description: Country where you will retire, since pension access rules, tax on withdrawals and annuity markets differ.
    type: string
    required: true
  - name: ages
    description: Your age and planned retirement age, and your partner's if the plan is joint, plus anything relevant about health or family longevity. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your income gap, Ways to turn savings into income, Scenarios, A bad start in markets, Spending rules that add resilience, Not modelled, Questions for an adviser]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Spending savings in retirement (decumulation) is harder than saving. The risks change: running out of money if you live long (longevity), a market fall in the first years forcing sales at low prices (sequence-of-returns risk), inflation eroding a fixed income, and spending that is lumpier than planned. Planners usually start by covering essential spending with secure income (state or public pension, defined-benefit pensions, annuities if chosen) and funding the flexible part from invested savings, with rules for adjusting withdrawals when markets fall. No single option is right for everyone; the trade-off is between certainty and flexibility.

Country: {{country}}
Spending need (today's money): {{spending_need}}
{{#ages}}Ages and context: {{ages}}{{/ages}}

<savings_and_pensions>
{{savings_and_pensions}}
</savings_and_pensions>
</context>

<task>
1. Your income gap: table the secure income sources with start ages and amounts, compare them with essential and total spending, and show the gap that savings must fill, year by year where start ages differ (for example a bridge until the state pension starts). Compute the withdrawal rate the gap implies: gap / invested savings.
2. Ways to turn savings into income: explain drawdown (flexible withdrawals from invested savings), lifetime annuities (income for life in exchange for a lump sum, with or without inflation linking), fixed-term income, a cash-buffer or bucket approach, and combinations (for example an annuity to cover essentials and drawdown for the rest). For each: certainty, flexibility, inflation protection, what happens on death, and the main risk. Mention country-specific access rules or tax-free portions only when confident, flagged to verify.
3. Scenarios: model constant real (inflation-adjusted) withdrawals that cover the gap under three labelled real-return assumptions (for example 1%, 3% and 5% after fees). Show the balance at 5, 10, 20 and 30 years, or the age money runs out. State the method (annual withdrawal at the start of each year, then growth) and show one year of the calculation.
4. A bad start in markets: re-run the middle scenario with a 25% fall in year 1 and no recovery bonus, and compare with the same average return arriving in a good order, to show sequence risk in money.
5. Spending rules that add resilience: explain, with the effect on their numbers where possible - a cash buffer of 1-2 years of withdrawals, skipping inflation increases after a down year, guardrail rules that cut spending by about 10% if the withdrawal rate rises above a set level and raise it when it falls, delaying or bringing forward the state pension where allowed, part-time work in early years.
6. Not modelled: tax on withdrawals, care costs, one partner dying, inheritance wishes, exact fees.
7. Questions for an adviser or pension provider: 8-10 questions specific to their situation.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend buying an annuity, a provider, a withdrawal rate, an asset allocation, or when to take a pension. Describe the trade-offs and the questions.
- Use only the amounts given; do not estimate state pension entitlements yourself. Mark missing figures as [X] and ask.
- All returns are illustrative assumptions, not forecasts. Work in today's money throughout and say so.
- Check the arithmetic: lower returns must last no longer than higher ones; plan to at least age 95 unless the person states otherwise.
- If the implied withdrawal rate is very high (above about 6% from age 60s), say plainly that the plan looks stretched and show the levers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your income gap
Table: age range | secure income | spending need | gap from savings. Then the implied withdrawal rate.

## Ways to turn savings into income
Table: option | certainty | flexibility | inflation | on death | main risk.

## Scenarios
Table: real return | balance at +5, +10, +20, +30 years | age money runs out (if it does). Method and one worked year.

## A bad start in markets
Short table and two sentences.

## Spending rules that add resilience
Bullets with effects.

## Not modelled
Bullets.

## Questions for an adviser
Numbered.
</output_format>
