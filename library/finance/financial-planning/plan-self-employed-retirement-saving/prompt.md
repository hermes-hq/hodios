---
schema: 1
id: plan-self-employed-retirement-saving
kind: prompt
title: Plan retirement saving when self-employed
description: Plans retirement saving for the self-employed with no employer plan - a target contribution, account types to check, a system for irregular income and how to catch up after lean years.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sole-trader, no-employer-match, pension-contributions, irregular-income, retirement-saving]
pairs_with:
  prompts: [compare-retirement-accounts, plan-freelance-tax-set-aside, plan-retirement-scenarios, plan-finances-before-going-self-employed]
  personas: [personal-finance-coach]
args:
  - name: income
    description: Business set-up (sole trader, freelancer, own company), typical yearly profit and how much it swings, how you pay yourself, and your tax set-aside habit.
    type: text
    required: true
  - name: savings
    description: Age, retirement savings so far (including old workplace pensions), state pension expectations, other savings, debts, and the age and income you hope to retire on.
    type: text
    required: true
  - name: country
    description: Country, because account types, contribution limits, tax relief and state pension rules for the self-employed differ.
    type: string
output_contract:
  format: markdown
  sections: [Where you stand, Target contribution, Accounts to look into, A system for irregular income, Catching up, Questions for an accountant or adviser, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help self-employed people build retirement savings without an employer plan. Employees usually get automatic contributions, often matched by the employer, and saving happens before they see the money; the self-employed miss both the match and the habit, so many reach their fifties with little saved. The self-employed also often have lower state pension entitlement or must pay voluntary or separate contributions to build it. Most countries offer tax-advantaged retirement accounts for the self-employed, and contributions often reduce taxable profit or income, which makes saving cheaper than it looks; for company owners, paying into a pension from the company can be more tax-efficient than paying salary first. Irregular income calls for a percentage-of-profit rule and a year-end top-up rather than a fixed monthly amount, with a cash buffer and the tax set-aside protected first. The business itself is rarely a reliable retirement plan unless it can be sold.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Income:

<income>
{{income}}
</income>

Savings and goals:

<savings>
{{savings}}
</savings>

1. Summarise where the person stands: years to retirement, savings so far, likely state pension position (to verify), and the income gap the savings must fill.
2. Set a target contribution as a percentage of profit and as a yearly figure, showing a simple projection under two labelled real-return assumptions, and what the target becomes if they start five years later.
3. List account types to look into in their country, described generally with what to check (tax relief, limits, access age, flexibility for irregular payments, fees), without recommending a provider. Mark each "verify".
4. Design a system for irregular income: the order of tax set-aside, buffer, then retirement percentage; a minimum monthly amount; and a year-end top-up step once profit is known.
5. If they are behind, show catch-up options: higher percentage in good years, carry-forward rules if the country has them (verify), consolidating old pensions, and what working a few years longer does.
6. List questions for an accountant or adviser, including how contributions interact with tax and the business structure, and state assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent contribution limits, tax relief rates or account rules. Mark any you name with country, year and "verify".
- Do not recommend specific providers, funds or investments.
- Keep the tax set-aside and an emergency buffer ahead of retirement saving; say why.
- Do not treat the business's future sale value as retirement savings unless the person gives a realistic basis, and then show it as a separate, uncertain scenario.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you stand
Short bullets.

## Target contribution
Table: start now or later | yearly contribution | projected pot (two return cases) | rough income it supports.

## Accounts to look into
Table: account type | what to check | why it might fit.

## A system for irregular income
Numbered steps.

## Catching up
Bullets, or "not needed".

## Questions for an accountant or adviser
Bullets.

## Assumptions
Bullets.
</output_format>
