---
schema: 1
id: stop-relying-on-credit-cards
kind: prompt
title: Stop relying on credit cards for everyday costs
description: Plans breaking the cycle of putting groceries and bills on credit cards each month - finding the gap, a buffer, card rules and a paydown that does not push you back onto the cards.
category: debt
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [credit-card-cycle, cash-flow-gap, spending-buffer, card-rules, paydown]
pairs_with:
  prompts: [plan-debt-payoff, plan-bill-payment-calendar, build-emergency-fund-plan, curb-impulse-spending]
  personas: [personal-finance-coach]
args:
  - name: situation
    description: Your card balances, rates and minimums, what you typically put on the cards each month, and when it started.
    type: text
    required: true
  - name: budget
    description: Monthly take-home pay, pay dates and main bills. Rough figures are fine.
    type: text
  - name: country
    description: Country, for free advice services and typical card features.
    type: string
output_contract:
  format: markdown
  sections: [What is driving the cycle, Close the gap, Build a small buffer, Card rules, Paydown plan, When to get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who use credit cards to get through each month, paying off part of the balance on payday and then charging everyday costs again. Payoff plans fail in this situation because the card is acting as the person's buffer: as soon as they overpay, there is not enough cash before the next payday and the balance creeps back. The cycle usually has one of four causes, often mixed: a real monthly shortfall (income lower than essential costs), a timing gap (bills due before payday), irregular costs treated as surprises (car repairs, annual bills, gifts), or spending that has drifted up because the card makes it painless. The fix is in that order: find which cause applies, close the gap, build a small cash buffer so the card stops being the emergency fund, set card rules, and only then accelerate the paydown. Hiding or cancelling every card on day one can backfire if there is no cash to fall back on.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>
{{#budget}}

Budget:

<budget>
{{budget}}
</budget>
{{/budget}}

1. Diagnose what is driving the cycle, from their figures: shortfall, timing gap, irregular costs, spending drift, or a mix. Show the arithmetic (income minus essentials minus card minimums). If income does not cover essentials and minimums, say so directly and make free debt advice the first step.
2. Close the gap: concrete fixes for each cause found, for example moving bill due dates to after payday, a monthly amount set aside for irregular costs, specific cost cuts, and income or benefit checks, each with an estimated monthly effect.
3. Build a small buffer: a target (for example one week to one month of essentials), where to keep it, and how to fund it within a few months while still paying at least the minimums. Explain why this comes before aggressive paydown.
4. Card rules: which card, if any, to keep for genuine emergencies, which to stop using (remove saved card details from shops and apps, not necessarily close it), a weekly spending plan on debit or cash, and a rule for what counts as an emergency.
5. Paydown plan: once the buffer exists, the order (highest rate first unless motivation needs a quick win), the monthly amount, an estimated payoff date, and what to do when an unexpected cost hits.
6. When to get help: signs that the problem is bigger than cash flow (missed payments, only paying minimums for a year or more, borrowing to pay other debts) and free, non-profit advice to contact.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend new borrowing (consolidation loans, balance transfers) as the main fix; mention them only as an option to check once spending is back under control, with the catch.
- Do not shame or moralise. Treat the cycle as a cash-flow problem with a fix.
- Never suggest stopping minimum payments.
- Do not invent their figures; if the budget is missing, show the method and ask for the numbers.
- Do not recommend specific card providers or paid debt companies.
{{> output/uncertainty}}
</constraints>

<output_format>
## What is driving the cycle
Short diagnosis with the arithmetic.

## Close the gap
Table: fix | monthly effect.

## Build a small buffer
Target, where to keep it, timeline.

## Card rules
Bullets.

## Paydown plan
Table: card | balance | rate | order | monthly payment | estimated payoff.

## When to get help
Bullets.
</output_format>
