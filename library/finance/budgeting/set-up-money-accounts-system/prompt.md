---
schema: 1
id: set-up-money-accounts-system
kind: prompt
title: Set up an automated money accounts system
description: Designs a simple set of accounts and payday transfers (bills, spending, savings pots, buffer) so money is sorted automatically, with the order to set it up and what to check each month.
category: budgeting
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, diagram, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [money-automation, bank-account-structure, savings-pots, pay-yourself-first]
pairs_with:
  prompts: [build-monthly-budget, set-up-sinking-funds, plan-bill-payment-calendar, compare-savings-accounts]
  personas: [personal-finance-coach]
args:
  - name: money_picture
    description: Take-home income and pay dates, main bills, savings goals, and whether this is for one person or a couple.
    type: text
    required: true
  - name: current_setup
    description: The accounts and cards you have now and what goes where today. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The structure, Payday flow, Amounts, Set-up order, Monthly check, Pitfalls]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The most durable budgets run on structure rather than willpower: income lands in one place, and on payday fixed amounts move automatically to a bills account, savings and goal pots, and a spending account or card. Then the only number to watch day to day is the spending balance. Experts keep it as simple as the household can manage: usually three to five accounts or pots, not twelve. Bills accounts need a buffer so a slightly higher bill does not bounce; savings should sit where they are not visible on the everyday card; and transfers should happen on payday, not "whatever is left at the end of the month". Couples commonly use yours-mine-ours: a joint bills account funded by agreed contributions plus personal spending accounts.

<money_picture>
{{money_picture}}
</money_picture>
{{#current_setup}}Current set-up: {{current_setup}}{{/current_setup}}
</context>

<task>
1. The structure: propose three to five accounts or pots with a one-line job each (for example income hub, bills, everyday spending, buffer or emergency, goal pots). Re-use their current accounts where possible. For couples, show the joint and personal parts.
2. Payday flow: a text diagram (or a simple Mermaid flowchart) of where money goes on payday and in what order.
3. Amounts: work out each transfer from their figures, including monthly amounts for annual bills inside the bills account, plus a bills buffer. Show that the transfers add up to take-home pay.
4. Set-up order: numbered steps, starting with the bills account and moving direct debits, then standing orders on payday plus a day, then savings pots. Warn about the gap month while debits are being moved.
5. Monthly check: three things to look at in five minutes.
6. Pitfalls: common ways this breaks (transfers set before pay clears, too many pots, savings on the spending card) and how to avoid them.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Describe account types and features (fee-free current account, easy-access savings, pots or sub-accounts); do not name banks, apps or products.
- Mention checking deposit protection limits and any account fees locally.
- Use only figures given; mark estimates.
- Never ask for account numbers or log-in details.
{{> output/uncertainty}}
</constraints>

<output_format>
## The structure
Table: account or pot | job | type.

## Payday flow
Diagram.

## Amounts
Table: transfer | amount | when. Then the total check.

## Set-up order
Numbered steps.

## Monthly check
Three bullets.

## Pitfalls
Bullets.
</output_format>
