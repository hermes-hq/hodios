---
schema: 1
id: plan-downsizing-home
kind: prompt
title: Plan downsizing your home
description: Plans the money side of moving to a smaller or cheaper home, usually around retirement - real cash released after all costs, running-cost savings, uses for the equity and the non-money trade-offs.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [real-estate]
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
level: beginner
depth: specific
tags: [downsizing, home-equity, retirement-income, moving-costs]
pairs_with:
  prompts: [plan-retirement-drawdown, plan-long-term-care-costs, estimate-home-buying-costs, plan-windfall]
  personas: [personal-finance-coach]
args:
  - name: current_home
    description: Rough value of your home, any mortgage left, and yearly running costs (energy, property taxes, insurance, maintenance, service charges).
    type: text
    required: true
  - name: target
    description: What you are thinking of moving to - size, type, area, rough price - or a few options.
    type: text
    required: true
  - name: situation
    description: Ages, income and pensions, savings, health and mobility, family nearby, and what you hope the move achieves (cash, lower bills, less upkeep, being nearer family). Optional.
    type: text
  - name: country
    description: Country and region.
    type: string
output_contract:
  format: markdown
  sections: [What you would actually release, Running costs before and after, Uses for the released money, Non-money checks, Questions for professionals, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people, often near or in retirement, think through downsizing. The cash released is usually much less than the gap between the two prices: selling costs, purchase taxes and legal fees, moving and furnishing, and work on the new place can take a large slice, and some smaller homes (flats with service charges, retirement developments with event fees on resale) have higher running costs than expected. The right move also has to suit the next twenty years: step-free access, distance to family, health services and shops, and space for visitors or a carer. Released equity can affect means-tested benefits or care funding in some countries, and big sums attract salespeople and scams. Many people find it easier to plan the move before health forces it.

{{#country}}Country and region: {{country}}{{/country}}
</context>

<task>
Current home:

<current_home>
{{current_home}}
</current_home>

Target:

<target>
{{target}}
</target>
{{#situation}}

Situation:

<situation>
{{situation}}
</situation>
{{/situation}}

1. Estimate what would actually be released for each option as a range: sale price minus selling costs and mortgage, minus purchase price, purchase taxes and fees, moving, and a sensible allowance for work and furnishing. Show the arithmetic and mark your allowances as assumptions.
2. Compare yearly running costs before and after, including service charges, ground rent or community fees where they may apply, and any fees payable on resale for retirement properties.
3. Lay out uses for the released money in a sensible order: an emergency fund, clearing debts, supporting retirement income, care costs later, helping family, enjoying it. Note that large sums may affect means-tested benefits or care funding where the person lives, to check.
4. List non-money checks: accessibility, transport, health services, family and friends, the leasehold or tenure terms, and how they feel about leaving the home.
5. List questions for a financial adviser, solicitor or conveyancer, and benefits adviser where relevant.
6. State the assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent prices, tax rates, fees or benefit rules. Use the person's figures and labelled allowances; mark anything country-specific "verify".
- Do not recommend specific investments, products such as equity release, or providers. You may say equity release or similar products exist, are complex and need regulated advice.
- Treat the emotional side with respect: a family home carries memories.
- If the person's situation suggests urgent care needs, suggest a care needs assessment through local services or a doctor alongside the property question.
{{> output/uncertainty}}
</constraints>

<output_format>
## What you would actually release
Table per option: line | low | high.

## Running costs before and after
Table: cost | now | after.

## Uses for the released money
Numbered list with amounts where the figures allow.

## Non-money checks
Checklist.

## Questions for professionals
Bullets grouped by professional.

## Assumptions
Bullets.
</output_format>
