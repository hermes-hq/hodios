---
schema: 1
id: estimate-tax-on-retirement-withdrawals
kind: prompt
title: Estimate tax on retirement withdrawals
description: Estimates the income tax on planned withdrawals from pensions and retirement accounts and compares withdrawal orders that could lower it, with every rate and assumption stated.
category: taxes
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
tags: [retirement-income, pension-tax, withdrawal-order, tax-brackets]
pairs_with:
  prompts: [plan-retirement-drawdown, explain-marginal-tax-rates, compare-pension-lump-sum-vs-income]
  personas: [tax-educator]
args:
  - name: accounts
    description: Each pension or retirement account (type, tax treatment if known, balance), any tax-free lump sum options, other income in retirement (state or social security pension, rent, part-time work), your age and the yearly amount you plan to withdraw.
    type: text
    required: true
  - name: country
    description: Country (and state or region if it taxes income) where you will be tax resident in retirement.
    type: string
    required: true
  - name: rates
    description: "Optional: the tax bands, allowances or deductions for the year, if you have them from official guidance. Without them, illustrative rates are used and labelled."
    type: text
output_contract:
  format: markdown
  sections: [Income picture, Tax on the plan as given, Alternative withdrawal orders, Thresholds and cliffs, Assumptions, Questions for an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You estimate the income tax on retirement withdrawals so the person can see the effect of different withdrawal plans before talking to an adviser. Retirement accounts are taxed differently: contributions made before tax are usually taxed as income when withdrawn; accounts funded after tax may be tax-free on withdrawal if conditions are met; ordinary taxable investment accounts are taxed on gains and income, not on the money withdrawn; and some pensions allow part to be taken tax-free. State or social security pensions often count as taxable income and use up the lower bands first. The key planning ideas are filling lower tax bands each year rather than taking large sums in a few years, the order of drawing from each account type, and avoiding cliffs where income above a threshold triggers extra tax, reduced allowances, higher health premiums or the loss of means-tested support. Required minimum withdrawals and early-withdrawal penalties before a minimum age can also apply.

Country: {{country}}
</context>

<task>
Accounts and plans:

<accounts>
{{accounts}}
</accounts>

{{#rates}}
Rates supplied:

<rates>
{{rates}}
</rates>

{{/rates}}
1. Build the income picture for a typical retirement year: each income source, whether it is taxable, and the taxable amount. Classify each account by tax treatment; if a type's treatment in {{country}} is unclear, say so and ask.
2. Estimate tax on the plan as given: taxable income, allowances or deductions, tax by band and the effective rate, using the rates supplied. If none were supplied, use clearly labelled illustrative rates only if you are confident they are recent for {{country}}, with the tax year, marked "verify"; otherwise show the method with placeholders.
3. Compare at least two alternative withdrawal orders or mixes that deliver the same spending, for example drawing taxable-on-withdrawal money up to the top of a lower band and the rest from tax-free or after-tax sources, or spreading a lump sum over several years. Show the tax for each with arithmetic.
4. List thresholds and cliffs in {{country}} that the plans approach: allowance tapers, higher-rate thresholds, health premium surcharges, means-tested benefits, taxation of state pension, minimum withdrawal rules, and penalties for early access. Mark each "verify".
5. State every assumption: tax year, rates, filing status, no inflation, no investment growth unless supplied.
6. List questions for a regulated adviser or tax professional.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is an estimate for discussion, not a tax calculation to file or a recommendation of which plan to follow. Say so once.
- Never invent rates, thresholds or rules. Use supplied figures first; anything else is labelled illustrative with a tax year and "verify".
- Show all arithmetic so it can be checked.
- Do not recommend specific products or providers. Flag that cross-border pensions, annuities and inherited accounts can have special rules.
- Note that state or regional income tax may apply in addition if relevant.
{{> output/uncertainty}}
</constraints>

<output_format>
## Income picture
Table: source | yearly amount | taxable? | taxable amount.

## Tax on the plan as given
Step-by-step calculation with the effective rate.

## Alternative withdrawal orders
Table: plan | where the money comes from | taxable income | estimated tax | effective rate. Short note on each.

## Thresholds and cliffs
Bullets marked "verify".

## Assumptions
Bullets.

## Questions for an adviser
Up to six questions.
</output_format>
