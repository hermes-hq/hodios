---
schema: 1
id: evaluate-roth-conversion
kind: prompt
title: Evaluate a Roth conversion
description: Tests whether to convert some pre-tax retirement savings to Roth this year, sizing the amount to fill a tax bracket, with worked numbers, side effects and timing risks to check with an adviser.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [table, explanation, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [roth-conversion, retirement-accounts, tax-brackets, ira, usa]
pairs_with:
  prompts: [compare-roth-vs-traditional, plan-required-minimum-distributions, plan-retirement-scenarios]
  personas: [personal-finance-coach]
args:
  - name: accounts
    description: Pre-tax balances (traditional IRA, 401(k), 403(b)) and whether any IRA holds after-tax (non-deductible) money, Roth balances and when the first Roth was opened, and cash available outside retirement accounts to pay tax.
    type: text
    required: true
  - name: income
    description: This year's expected taxable income and filing status, expected income in retirement (pensions, Social Security, RMDs), state of residence and any planned move, and whether you get Medicare, ACA premium credits or need-based college aid.
    type: text
    required: true
  - name: goals
    description: Why you are considering it - lower taxes later, leaving money to heirs, a low-income year (sabbatical, early retirement, job loss), or reducing future RMDs - and when you might need the money.
    type: text
output_contract:
  format: markdown
  sections: [Short answer, Bracket room this year, Worked comparison, Side effects, Timing and rules, Questions for a tax professional]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people test a Roth conversion: moving money from a pre-tax retirement account to a Roth account and paying income tax on the converted amount now, in exchange for tax-free qualified withdrawals later and, for Roth IRAs, no required minimum distributions for the original owner. The core question is whether the tax rate paid now is lower than the rate the money would face later, for the person or their heirs. Conversions tend to make sense in low-income years (between retirement and Social Security or RMDs, a sabbatical, a business loss), when future tax rates are expected to be higher (large pre-tax balances that will create big RMDs, a surviving spouse moving to single brackets, heirs in high brackets, a move to a higher-tax state), and when tax can be paid from cash outside the account. They often fail when tax is paid from the converted money itself, when the conversion pushes income over thresholds that raise other costs (Medicare income-related premium surcharges with a two-year lookback, loss of ACA premium credits, taxation of Social Security benefits, college financial aid, net investment income tax, state tax), or when the money is needed soon. Mechanics people miss: conversions cannot be undone; the pro-rata rule means after-tax money in any traditional IRA is mixed with pre-tax money when converting; each conversion has its own five-year clock for penalty-free access to converted amounts before a certain age, separate from the five-year rule for tax-free earnings; and partial conversions spread over several years are often better than one large one. Brackets and thresholds change each tax year and must be checked.

<accounts>
{{accounts}}
</accounts>

<income>
{{income}}
</income>
{{#goals}}

<goals>
{{goals}}
</goals>
{{/goals}}
</context>

<task>
1. Short answer: say whether a conversion looks worth exploring this year, roughly how much, and the one or two factors that decide it, framed as an analysis for discussion, not a recommendation.
2. Bracket room this year: using the income and filing status given, estimate how much income could be added before reaching the next federal bracket and before any important threshold (Medicare surcharge tiers, ACA credit limits, other thresholds relevant to them). Ask the user to supply the current year's bracket and threshold figures or mark any you use as approximate and to verify.
3. Worked comparison: for one to three conversion sizes, show tax paid now (federal and state, at the stated or assumed rates) against the estimated tax on the same money if withdrawn later at the expected future rate, under stated assumptions about growth and years. Show the arithmetic and a break-even future tax rate. Include the case where tax is paid from the account versus from outside cash.
4. Side effects: list each knock-on effect that applies to this person (Medicare premiums with the two-year lookback, ACA credits, Social Security taxation, financial aid, state tax and planned moves, pro-rata rule if after-tax IRA money exists, estimated tax payments to avoid underpayment penalties).
5. Timing and rules: conversions are irreversible; when in the year to convert and how to pay the tax; the two five-year rules; spreading conversions over several years; how this interacts with future RMDs and heirs.
6. Questions for a tax professional: a short list specific to their case.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state tax brackets, thresholds, surcharge tiers or penalty ages as fact for any year; ask for them, or label them approximate and to verify against current IRS guidance (and Medicare or state tax authority guidance for surcharges and state tax).
- Show all arithmetic and assumptions; label results as estimates.
- Do not recommend specific investments or present the result as personal tax advice.
- This applies to US accounts; if the person is elsewhere, say the rules differ and do not adapt US rules.
</constraints>

<output_format>
## Short answer
## Bracket room this year
## Worked comparison
Table: Conversion amount | Tax now | Estimated tax later | Difference | Break-even future rate.
## Side effects
## Timing and rules
## Questions for a tax professional
</output_format>
