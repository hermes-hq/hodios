---
schema: 1
id: untangle-bnpl-plans
kind: prompt
title: Untangle buy now pay later plans
description: Gets several buy now pay later plans under control with one list, a payment calendar against payday, the late-fee risks, what to reschedule and how to stop stacking new plans.
category: debt
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
requires: [none]
inputs: [text]
output: [table, plan, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [buy-now-pay-later, payment-calendar, late-fees, cash-flow]
pairs_with:
  prompts: [build-tight-budget, plan-debt-payoff]
args:
  - name: plans
    description: Each plan - the provider type (no need to name it), what it was for, amount left, instalment size, dates of remaining payments, and whether any are late. Leave out account numbers.
    type: text
    required: true
  - name: income
    description: Pay dates and take-home amounts, and your main fixed bills with their dates.
    type: text
    required: true
  - name: country
    description: Country, since rules on these plans and late fees differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [All plans in one place, Payment calendar, Pinch points, What to do this month, Stop the stack, If you are already behind]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who have lost track of several buy now pay later plans. Each plan looks small, but several running at once can take a large share of pay, with instalments landing just before payday. Missed instalments can bring late fees, blocked accounts and, increasingly, entries on credit files; some plans are linked to a debit card and collect automatically, which can push the bank account into an overdraft. The fix is visibility: one list, one calendar against pay dates, then deciding what to clear, what to reschedule and how to stop new plans. Rules and protections for these plans differ by country and have been changing.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Plans:

<plans>
{{plans}}
</plans>

Income and bills:

<income>
{{income}}
</income>

1. Put every plan in one table: what it was for, amount left, instalment, remaining dates, card it collects from, and status.
2. Build a payment calendar for the next two months against pay dates and fixed bills, and show the running balance after each payment.
3. Identify pinch points: dates where the balance goes negative or close to it, and plans likely to trigger late fees or overdraft charges.
4. Plan this month: which plans to contact the provider about to move a due date or spread a payment (many have a hardship or reschedule option to ask about), which small balances could be cleared to cut the number of plans, and which payment card to switch so a failed collection does not cause a bank charge. Keep priority bills (housing, energy, council or local taxes) paid first.
5. Stop the stack: practical steps to stop new plans, such as removing saved cards in shopping apps, turning off the option at checkout where possible, and a waiting rule for purchases.
6. If any payments are already missed, or if the total cannot be met, explain the next steps and point to free, non-profit debt advice.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend taking new credit to clear these plans.
- Do not name providers or claim their policies; say "ask the provider whether...".
- Use only the amounts and dates given; ask for missing dates.
- Shame-free tone.
</constraints>

<output_format>
## All plans in one place
Table.
## Payment calendar
Table: Date | Payment or income | Amount | Balance after.
## Pinch points
## What to do this month
Numbered.
## Stop the stack
## If you are already behind
</output_format>
