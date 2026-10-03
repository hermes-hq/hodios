---
schema: 1
id: build-emergency-fund-plan
kind: prompt
title: Build an emergency fund plan
description: Works out an emergency fund target from essential costs and income stability, where to keep it, and a step-by-step plan with milestones to build and refill it.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, student]
requires: [none]
inputs: [text]
output: [plan, table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [emergency-fund, cash-buffer, rainy-day-fund, financial-resilience]
pairs_with:
  prompts: [set-up-sinking-funds, compare-savings-accounts, plan-debt-payoff, budget-irregular-income]
  personas: [personal-finance-coach]
args:
  - name: essential_monthly_costs
    description: What your must-pay costs add up to each month (housing, utilities, food, transport, insurance, minimum debt payments, childcare), or the list of them.
    type: string
    required: true
  - name: income_stability
    description: How secure your income feels - stable (salaried, secure sector), variable (freelance, commission, shift-based) or uncertain (probation, contract ending, redundancies around).
    type: enum
    enum: [stable, variable, uncertain]
    default: stable
  - name: current_savings
    description: What you already have in cash savings, how much you can save each month, and anything relevant such as high-interest debts, dependants, or being a single earner. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your target, First milestone, Where to keep it, Build plan, Speed it up, What counts as an emergency, Using and refilling it]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An emergency fund is cash set aside for real shocks: losing income, an urgent repair, a medical or family emergency. Its job is to stop a bad month from becoming debt. It is sized from **essential** costs, not total spending, because in an emergency you cut the rest. The usual guide is 3 months of essentials for a stable income, 6 for a variable one and 6-12 when income is uncertain, adjusted up for single earners, dependants, homeowners and health or industry risk. A small starter buffer comes first, because it prevents most new debt quickly; expensive debt is usually tackled before the full fund is finished.

Essential monthly costs: {{essential_monthly_costs}}
Income stability: {{income_stability}}
{{#current_savings}}Savings and context: {{current_savings}}{{/current_savings}}
</context>

<task>
1. Target: state the months of cover for {{income_stability}} income, adjust it for any context given (single earner, dependants, homeowner, health, industry, an end date on a contract), and compute the target as months x essential costs. Show the arithmetic and a range (lower and upper target).
2. First milestone: a starter buffer of about one month of essentials (or a smaller fixed amount if one month is far off). Explain why it comes first.
3. Order with debt: if high-interest debt (credit cards, overdrafts, payday loans) is mentioned, explain the usual order - starter buffer, then expensive debt, then the full fund - and note that any employer pension match is often worth keeping. Present this as a common approach, not an instruction.
4. Where to keep it: cash, easy or instant access, protected by the country's deposit guarantee scheme (check the limit per bank), separate from the current account, earning interest. Optionally a two-tier set-up: about one month instant access, the rest in an easy-access or short-notice account. Explain why it should not be invested in shares, crypto or anything that can fall in value just when it is needed. No bank names.
5. Build plan: if a monthly saving amount is given, a table of month, contribution, balance and milestone reached until the target. If not, show three paces (for example 5%, 10%, 15% of essentials a month) and the months each takes.
6. Speed it up: 4-6 ideas sized to their situation (direct a windfall or tax refund, sell unused items, a short no-spend month, round-ups, saving any pay rise).
7. What counts: a short list of emergencies versus things that belong in planned savings (holidays, car insurance renewals, gifts).
8. Using and refilling: when to use it without guilt, the order to cut spending while using it, and a refill rule.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Base every figure on the costs given. If essential costs are vague or obviously include non-essentials, say what you assumed and ask.
- If income does not cover essentials, say so first and point to a survival budget and free money advice; a savings target is not the first step then.
- No product, bank or app recommendations; account types are fine.
- Round targets sensibly; avoid false precision.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your target
Months of cover, the calculation, and the range.

## First milestone
Amount and reason.

## Where to keep it
Short paragraph or bullets.

## Build plan
Table: month | contribution | balance | milestone.

## Speed it up
Bullets.

## What counts as an emergency
Two short lists.

## Using and refilling it
Bullets.
</output_format>
