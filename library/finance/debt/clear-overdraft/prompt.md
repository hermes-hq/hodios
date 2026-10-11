---
schema: 1
id: clear-overdraft
kind: prompt
title: Clear a persistent overdraft
description: Plans how to get out of an overdraft used every month - what it really costs, a step-down schedule, how to stop the payday dip, what to ask the bank, and when to get free help.
category: debt
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
requires: [none]
inputs: [text]
output: [plan, table, script]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [overdraft, bank-charges, step-down-plan, cash-flow]
pairs_with:
  prompts: [build-monthly-budget, plan-debt-payoff, build-emergency-fund-plan]
args:
  - name: overdraft
    description: Your overdraft limit, how far into it you usually go and for how long each month, the interest rate or daily fee, and any other charges. Leave out account numbers.
    type: text
    required: true
  - name: money
    description: Take-home pay and pay date, main bills and their dates, and roughly what is left at the end of the month before payday.
    type: text
    required: true
  - name: country
    description: Country, because overdraft pricing and bank obligations differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What it costs you, Why you stay in it, Step-down plan, Ask the bank, Stay out, When to get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who live in their overdraft. Many treat it as part of their balance: pay arrives, clears the overdraft, and by mid-month they are back in it. It is often one of the most expensive forms of borrowing, but because the cost is spread over fees and daily interest people rarely add it up. Clearing it in one go is usually impossible and leaves no money for the month; the reliable way is a gradual step-down where the deepest point rises a little each month. Banks in some countries must help customers in persistent overdraft use, and many will agree a repayment plan or freeze charges on request.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Overdraft:

<overdraft>
{{overdraft}}
</overdraft>

Money:

<money>
{{money}}
</money>

1. Work out what the overdraft costs per month and per year from the figures given, showing the arithmetic, and compare it in plain words with other common borrowing.
2. Explain why they stay in it, from the cash flow given: bill timing, spending in the first days after payday, an irregular cost.
3. Build a step-down plan: an amount to reduce the overdraft by each month, from realistic savings in the budget, with a month-by-month table showing the deepest point rising toward zero, and a target date. If no saving is possible, say so and go to step 6.
4. Script a call or message to the bank: ask for a repayment plan, a freeze on fees or interest, a gradual reduction of the limit if that helps, and whether they have support for customers who use their overdraft persistently. Note this depends on the bank and country.
5. Stay out: move bill dates to just after payday, keep a small buffer once cleared, a separate account for spending money, and alerts for low balance.
6. If the overdraft is maxed out, if the bank is asking for it to be repaid in full, or if other debts are also in trouble, point to free, non-profit debt advice and note which bills come first.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not suggest a payday loan or another high-cost credit to clear the overdraft. Mention a cheaper personal loan or a 0% money transfer only with their catches and only if the person can stop using the overdraft.
- Use only figures given; label estimates.
- Do not name specific banks or products.
- Shame-free, practical tone.
</constraints>

<output_format>
## What it costs you
## Why you stay in it
## Step-down plan
Table: Month | Reduce by | Deepest point.
## Ask the bank
A short script.
## Stay out
## When to get help
</output_format>
