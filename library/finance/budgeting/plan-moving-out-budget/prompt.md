---
schema: 1
id: plan-moving-out-budget
kind: prompt
title: Plan a moving-out budget
description: Builds a first-home budget for a young adult leaving the family home - upfront costs, a full monthly budget, a savings target and a trial run before signing a lease.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
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
tags: [moving-out, first-home, young-adults, upfront-costs]
pairs_with:
  prompts: [check-rent-affordability, plan-first-job-finances, build-emergency-fund-plan]
  personas: [personal-finance-coach]
args:
  - name: income
    description: Your take-home pay, how regular it is, and any other income or help from family.
    type: text
    required: true
  - name: plans
    description: Where you want to live, alone or sharing and with how many people, the rent you have seen, when you want to move, current savings and debts, and what you will bring (furniture, kitchen things).
    type: text
    required: true
  - name: currency
    description: Currency code or symbol for amounts. Optional; inferred from the input if missing.
    type: string
output_contract:
  format: markdown
  sections: [Upfront costs, Monthly budget, Savings target and timeline, Trial run, Ready-to-move checklist, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a young adult work out whether and when they can afford to move out for the first time. People leaving home budget for rent and often forget the rest. Upfront costs usually include a deposit, the first month's rent in advance, any fees agencies may legally charge locally, moving costs, and furnishing and kitting out a kitchen even when a place is "furnished". Monthly costs go beyond rent: energy, water, internet, local property or council taxes (sometimes with a discount for single occupiers or exemptions for students), contents insurance, any TV or broadcasting licence, food (which usually costs more than they expect once they buy staples from scratch), cleaning and toiletries, transport from the new address, and a small amount for things that break. A useful readiness test: the monthly budget balances with a margin left over, the upfront costs are saved, and there is a buffer of at least one to three months of essential costs. Paying the planned rent into savings for a few months while still at home tests the budget and builds the fund at the same time.

{{#currency}}Currency: {{currency}}{{/currency}}
</context>

<task>
Income:

<income>
{{income}}
</income>

Plans:

<plans>
{{plans}}
</plans>

1. List upfront costs: deposit, rent in advance, fees to check, moving, furniture and kitchen basics (split into must-have on day one and can-wait), utility set-up. Use the person's figures and mark everything else as a placeholder to price locally.
2. Build a full monthly budget at the new address: rent or rent share, each bill, food, transport, phone, insurance, debt payments, savings and a small fun amount. For shared homes, show the person's share and note how bills are usually split. Compare the total with take-home pay and show the margin.
3. Set the savings target: upfront costs plus a buffer of one to three months of essential costs (state the choice), minus current savings, and the monthly saving needed to move on the planned date, or the realistic move date at a stated monthly saving.
4. Design a trial run: for two or three months before moving, pay the new monthly costs (rent, bills share, food) into savings and live on the rest. Say what to watch for and what it means if the trial fails.
5. Give a ready-to-move checklist: savings target reached, budget tested, lease and deposit protection checked, bills and address changes, contents insurance, an emergency plan.
6. If the numbers do not work, show the levers ranked by effect: sharing, a cheaper area, a later date, a smaller deposit option where legal, or increasing income.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent local rents, bills or fees. Use the person's figures and placeholders with clear labels.
- Tenancy rules (deposit caps and protection, legal fees, notice periods) vary by country and region; tell the person to check local rules and not to sign anything they have not read.
- Do not recommend specific banks, landlords, agents, insurers or products.
- Never suggest borrowing at high interest to fund a move.
- Keep it encouraging: the aim is a move that lasts, not to talk them out of it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Upfront costs
Table: item | must-have or can-wait | amount or placeholder. Total row.

## Monthly budget
Table: item | monthly amount | notes. Total, take-home and margin.

## Savings target and timeline
Target, monthly saving and move date, with arithmetic.

## Trial run
Short plan with what to watch.

## Ready-to-move checklist
Checklist.

## Questions
Bullets, including anything to price locally.
</output_format>
