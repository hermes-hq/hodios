---
schema: 1
id: check-if-you-can-afford-purchase
kind: prompt
title: Check if you can afford a purchase
description: Tests a planned purchase against your monthly budget, savings buffer and goals, shows its full cost and what it displaces, and gives a yes, wait or save-first verdict.
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
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [affordability, big-purchase, opportunity-cost, buy-now-pay-later]
pairs_with:
  prompts: [curb-impulse-spending, plan-savings-goal, build-monthly-budget]
  personas: [personal-finance-coach]
args:
  - name: purchase
    description: What you want to buy, the price, how you would pay (cash, card, instalments, finance, buy now pay later) and when you want it.
    type: text
    required: true
  - name: finances
    description: Monthly take-home income, regular monthly outgoings or surplus, savings and emergency fund, debts with interest rates, and any goals you are saving for.
    type: text
    required: true
  - name: currency
    description: Currency code or symbol for amounts. Optional; inferred from the input if missing.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, The full cost, Budget fit, What it displaces, Ways to make it work, Assumptions and questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone decide whether a specific purchase fits their money, before they buy it. "Can I afford it?" is rarely about whether the cash is in the account today. A purchase is affordable when it can be paid for from surplus or money already set aside for it, without draining the emergency fund, without adding high-interest debt, and without quietly pushing back a goal the person cares more about. People most often underestimate three things: the running costs that come with the item (insurance, servicing, subscriptions, accessories, higher bills), the true cost of paying over time (interest, fees, late-payment charges on buy now pay later), and how many months of progress on another goal the purchase costs.

{{#currency}}Currency: {{currency}}{{/currency}}
</context>

<task>
The purchase:

<purchase>
{{purchase}}
</purchase>

Their finances:

<finances>
{{finances}}
</finances>

1. Work out the full cost: the price, one-off extras (delivery, installation, accessories, fees), and the yearly running costs the item brings. If paid over time, add the total interest and fees and the monthly payment. Mark any running cost you estimate as a placeholder for the person to check.
2. Test the budget fit with these checks, each passed or failed with the numbers:
   - Paid from monthly surplus or savings meant for it, not from the emergency fund.
   - After buying, the emergency fund still covers the target number of months of essential costs (use the person's target, or 3 months as a labelled assumption).
   - Any new monthly payment plus running costs fits within the current monthly surplus with room to spare.
   - No high-interest debt is being carried that the same money would pay down at a better effective return.
3. Show what it displaces: for each goal stated, how many months later it would be reached if this money went to the purchase instead, with arithmetic.
4. Give one verdict: "Yes, it fits", "Wait" (with how long and why, for example until an emergency fund is rebuilt), or "Save first" (with a monthly amount and a target date). Say which check decided it.
5. Offer up to four ways to make it work if the verdict is not yes: a cheaper version, second-hand or refurbished, a later date, selling something, or a sinking fund. Never suggest borrowing at high interest to make it fit.
6. If the purchase is a want and the person seems unsure, suggest a short cooling-off rule (wait a set number of days and re-check) without lecturing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the numbers given. If income, outgoings or savings are missing, ask for them and give only a provisional verdict clearly labelled as such.
- Show the arithmetic for every total and every "months delayed" figure.
- Do not recommend specific lenders, credit products, shops or brands.
- Treat buy now pay later and store finance as debt: count the payments, the late fees and the risk of several plans running at once.
- Do not moralise about the item or the person's priorities. The person decides; you show the trade-off.
- If the person mentions they are behind on rent, utilities or debt payments, say plainly that priority bills come first and suggest free non-profit money advice in their country.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
One line: "Yes, it fits", "Wait" or "Save first", then the deciding reason in one sentence.

## The full cost
Table: item | one-off | monthly | yearly. Totals row, plus the total cost of credit if financed.

## Budget fit
Table: check | result | the numbers.

## What it displaces
Bullets: each goal and how many months later it would be reached.

## Ways to make it work
Up to four options, each with its effect in money or months. "None needed" if the verdict is yes.

## Assumptions and questions
Bullets: every assumption and anything to confirm.
</output_format>
