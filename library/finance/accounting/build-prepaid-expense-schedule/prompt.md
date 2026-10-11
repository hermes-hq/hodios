---
schema: 1
id: build-prepaid-expense-schedule
kind: prompt
title: Build a prepayments and accruals schedule
description: Builds a prepayments and accruals schedule that spreads annual bills and unbilled costs across the months they relate to, with the monthly journals and balance checks.
category: accounting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager]
requires: [none]
inputs: [text, dataset]
output: [table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [prepayments, accruals, matching-principle, month-end]
pairs_with:
  prompts: [prepare-month-end-close, write-journal-entries, review-balance-sheet]
  personas: [bookkeeper]
args:
  - name: items
    description: Bills paid in advance (insurance, software, rent, subscriptions) and costs used but not yet billed (utilities, professional fees, bonuses), each with amount, invoice date and the period it covers.
    type: text
    required: true
  - name: financial_year
    description: Your financial year start and end, and the month you want the schedule to start from.
    type: string
    required: true
  - name: threshold
    description: The smallest amount you bother to spread, if you have one. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Prepayments schedule, Accruals schedule, Monthly journals, Balance check, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You keep prepayment and accrual schedules the way a careful bookkeeper does. On the accrual basis, a cost belongs in the months it relates to, not the month it is paid. An annual insurance bill paid in January for the year from April is a prepayment (an asset) that is released to expense month by month as cover is used. A utility used in March but billed in April is an accrual (a liability) in March. The schedule's closing balance must equal the prepayments or accruals balance on the balance sheet each month; when it does not, something was posted straight to expense or released twice. Small teams usually set a threshold so that only material bills are spread, and apply it consistently. Cash-basis users do not need this schedule.

Financial year: {{financial_year}}
{{#threshold}}Threshold: {{threshold}}{{/threshold}}
</context>

<task>
Items:

<items>
{{items}}
</items>

1. Sort each item into prepayment, accrual, or "expense as paid" (below the threshold or covering one month only), with the reason. If the period covered is missing, ask for it rather than guess.
2. For each prepayment, compute the monthly release (amount divided by months covered, rounding carried to the last month) and the months it falls in, including months that spill into the next financial year.
3. For each accrual, give the estimated amount, how it was estimated (last bill, contract rate, usage), the month it is accrued, and when it reverses or is replaced by the real invoice.
4. Build month-by-month tables showing opening balance, additions, releases and closing balance for prepayments and for accruals.
5. Write the monthly journals: release of prepayments (debit expense, credit prepayments), new accruals (debit expense, credit accruals) and reversals.
6. Show the closing balances at the financial year end and explain how to check them against the balance sheet each month.
7. Recompute every total and confirm that releases plus closing balance equal the original amounts.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the items given. Estimates for accruals must state their basis; do not invent bills.
- Do not spread items the user's threshold says to expense, and do not apply a threshold the user did not give without labelling it a suggestion.
- If the user works on a cash basis, say this schedule is not needed and stop after one short explanation.
- Keep tax (VAT or sales tax) out of the spread amounts where the user is registered to reclaim it, and say so.
</constraints>

<output_format>
## Assumptions
Bullets.

## Prepayments schedule
Table with months as columns per item, and opening, release and closing rows.

## Accruals schedule
Table: item | month accrued | estimate | basis | reversal month.

## Monthly journals
Table: month | account | debit | credit | narrative.

## Balance check
Year-end closing balances and the monthly tie-out routine.

## Questions
Items needing more facts.
</output_format>
