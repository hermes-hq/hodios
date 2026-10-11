---
schema: 1
id: compare-roth-vs-traditional
kind: prompt
title: Compare pre-tax and Roth-style retirement contributions
description: Compares pre-tax (traditional) and after-tax (Roth-style) retirement contributions using your tax rate now and an expected rate later, with worked numbers and the breakeven rate.
category: investing
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [individual]
requires: [none]
inputs: [text]
output: [explanation, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [roth, pre-tax-contributions, marginal-tax-rate, tax-diversification, retirement-contributions]
pairs_with:
  prompts: [compare-retirement-accounts, understand-pension-fund-choices]
  personas: [investing-educator]
args:
  - name: situation
    description: Country, the accounts you can use (for example a workplace plan with both options, or a pension versus a tax-free savings wrapper), your income and your current top (marginal) tax rate if you know it.
    type: text
    required: true
  - name: retirement_view
    description: What you expect in retirement - other income such as a state or workplace pension, where you might live, when you plan to stop work. Rough is fine.
    type: text
    required: true
  - name: contribution
    description: How much you plan to contribute a year and for how many years. Optional; an illustrative amount is used otherwise.
    type: string
output_contract:
  format: markdown
  sections: [The choice in one line, Worked comparison, Breakeven, What tilts it your way, What the simple comparison misses, Questions to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The pre-tax versus after-tax question is mostly a bet on tax rates. With a pre-tax (traditional) contribution you skip tax now and pay it on withdrawal; with an after-tax (Roth-style) contribution you pay tax now and withdraw tax-free. If the tax rate is the same at both ends, the two give the same after-tax result, because multiplication order does not matter: 1,000 taxed at 22% then grown 5x equals 1,000 grown 5x then taxed at 22%. So the decision turns on the rate saved now (the marginal rate on the last slice of income) against the rate paid later (the effective rate on withdrawals, which is often lower because withdrawals fill the lower bands first).

Things novices miss: comparing the current marginal rate with the future marginal rate instead of the future average rate on withdrawals; forgetting that when the contribution limit is the binding constraint, a Roth-style contribution shelters more after-tax money; ignoring that pre-tax contributions can lower income for means-tested benefits, credits or student-loan repayments now; that withdrawals can push up tax on other benefits in retirement; tax-free lump sums some pension systems allow; employer contributions that may only go in pre-tax; moving country or state; and the value of holding both types (tax diversification) when the future is uncertain. Rules differ a lot by country and change over time.

Situation: {{situation}}

Retirement view: {{retirement_view}}
{{#contribution}}Planned contribution: {{contribution}}{{/contribution}}
</context>

<task>
1. Restate the choice in their terms: which two account types or contribution options they are choosing between, and the tax treatment of each going in, growing and coming out. Name the country assumption and label any account names or rules you are not sure of as "verify".
2. Worked comparison: using their contribution (or 5,000 a year for 20 years if none, labelled illustrative) and one illustrative growth rate stated as an assumption, show the after-tax value of each option under three future tax rates: lower than now, the same, and higher. Show the arithmetic, and reinvest the tax saved on the pre-tax option where that is the fair comparison, saying so.
3. Breakeven: state the future effective tax rate at which the two are equal (normally today's marginal rate) and estimate, from their retirement view, roughly which band their withdrawals would fall in, showing how other retirement income fills the lower bands first.
4. What tilts it: list the factors that push toward each option in their case (low income now or early career, high earner now, contribution limit binding, means-tested benefits, employer contributions, expected move, tax-free lump sums, heirs).
5. What the simple comparison misses: rule changes, access rules before retirement age, required withdrawals where they exist, the option of splitting contributions.
6. Give questions to verify with the plan administrator, the tax authority's guidance or a licensed adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell them which option to choose. Show which way the numbers lean under each assumption and let them decide.
- Never state a current tax rate, band or contribution limit as fact for their country unless they supplied it; give it as "check the current figure" when you need one.
- Keep growth assumptions identical for both options, since growth does not change the comparison when rates are equal.
- If the two options in their situation are not actually a pre-tax versus after-tax choice (for example two pre-tax plans), say so and explain what does differ.
{{> output/uncertainty}}
</constraints>

<output_format>
## The choice in one line
One or two sentences.

## Worked comparison
Table: future tax rate | pre-tax option after tax | after-tax option | difference, with the working beneath.

## Breakeven
Short paragraph.

## What tilts it your way
Two short bullet lists: toward pre-tax, toward after-tax.

## What the simple comparison misses
Bullets.

## Questions to verify
Bullets.
</output_format>
