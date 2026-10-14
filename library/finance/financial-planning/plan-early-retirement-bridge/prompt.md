---
schema: 1
id: plan-early-retirement-bridge
kind: prompt
title: Plan the bridge years of an early retirement
description: Plans how to fund the years between stopping work and the ages when pensions and retirement accounts pay out - which pots to draw in what order, cash buffers, tax and health cover gaps.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [early-retirement, bridge-years, withdrawal-order, cash-buffer, retirement-income]
pairs_with:
  prompts: [plan-financial-independence, plan-retirement-drawdown, compare-state-pension-claiming-ages, prepare-retirement-countdown-checklist]
  personas: [personal-finance-coach]
args:
  - name: timeline
    description: Your age (and partner's), the age you plan to stop work, and the ages at which each pension, retirement account or state pension can first be accessed without penalty.
    type: text
    required: true
  - name: assets
    description: Every pot with its rough value and type - cash, ordinary investment accounts, tax-advantaged accounts with access ages, workplace pensions, property or other income such as part-time work or rent.
    type: text
    required: true
  - name: spending
    description: Expected yearly spending in the bridge years, including one-offs (car, home repairs, children's costs) and any health cover you will need to pay for yourself.
    type: text
    required: true
  - name: country
    description: Country, because access ages, early withdrawal penalties and tax on withdrawals differ widely.
    type: string
output_contract:
  format: markdown
  sections: [The gap, Sources and order, Year-by-year bridge, Risks to the bridge, Rules to verify, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who want to stop work before their pensions and retirement accounts can be accessed. Reaching a total savings number is not enough: early retirees often have most of their wealth locked in accounts with access ages, and too little in accessible money to cover the bridge. The bridge needs to be funded from accessible pots (cash, ordinary investment accounts, part-time income, rent) or from early-access routes that some countries allow under strict rules. The order of withdrawals matters for tax: low-income bridge years can be a chance to draw taxable money at low rates, while using up tax-free wrappers first can waste their shelter. A cash buffer of one to three years of spending reduces the risk of selling investments after a fall early in retirement (sequence risk), which is the greatest threat to an early retirement. Hidden gaps include health cover once employer cover ends, lost employer pension contributions, missing years in a state pension record, and big one-off costs.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Timeline:

<timeline>
{{timeline}}
</timeline>

Assets:

<assets>
{{assets}}
</assets>

Spending:

<spending>
{{spending}}
</spending>

1. Define the gap: number of bridge years, total spending over them in today's money (with one-offs), and how much of it can be met by accessible pots. Show the shortfall or surplus plainly.
2. Classify every pot as accessible now, accessible at a later age, or accessible early only under special rules, and describe in plain terms an order of drawing them that keeps tax low and protects locked pots, listing the tax trade-offs as questions to verify.
3. Build a year-by-year bridge table from stopping work to the last access age: spending, source used, balance of accessible money left, and the point at which each locked pot opens. Use a modest real return labelled as an assumption, and show the result with a lower return.
4. Name the risks: a market fall in the first years, higher spending than planned, health cover costs, state pension record gaps, inflation, and access ages rising. Give a mitigation for each (cash buffer, part-time income, flexible spending, voluntary contributions).
5. If the bridge does not hold, show the levers with their effect: work a year or two longer, part-time income, lower spending, or shifting new savings toward accessible accounts now.
6. List rules to verify and state assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent access ages, penalties, early-access routes or tax rates; mark any you use with country and "verify".
- Do not predict returns. Use labelled real-return assumptions and a lower-return test.
- Do not recommend specific funds or products.
- Point out if the plan relies on a locked pot opening at an age that could change by law.
{{> output/uncertainty}}
</constraints>

<output_format>
## The gap
Short calculation.

## Sources and order
Table: pot | accessible from | role in the bridge | tax note to verify.

## Year-by-year bridge
Table: age | spending | source | accessible balance left | notes.

## Risks to the bridge
Table: risk | effect | mitigation.

## Rules to verify
Bullets.

## Assumptions
Bullets.
</output_format>
