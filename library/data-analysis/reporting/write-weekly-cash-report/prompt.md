---
schema: 1
id: write-weekly-cash-report
kind: prompt
title: Write a weekly cash report
description: Writes a weekly cash report with opening and closing cash reconciled to the bank, receipts and payments, overdue debtors, headroom and the pinch points in the coming weeks.
category: reporting
version: 1.0.0
status: incubating
stage: [operate]
role: [financial-analyst, founder, operations-manager, executive]
inputs: [dataset, text]
output: [report, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [cash-management, treasury, debtor-ageing, liquidity, weekly-report]
pairs_with:
  prompts: [forecast-cash-flow, calculate-cash-runway, write-management-accounts-commentary]
args:
  - name: cash_data
    description: "Opening and closing bank balances by account, the week's receipts and payments by type, the aged debtor list with the largest overdue items, known payments due in the next few weeks (payroll, tax, rent, loans, suppliers), and last week's forecast for this week if you had one."
    type: text
    required: true
  - name: limits
    description: "Facility or overdraft limit, minimum cash buffer the business wants to keep, any restricted or ring-fenced cash, and covenant tests if relevant. Optional."
    type: text
  - name: audience
    description: Who reads it (owner, finance director, lender) and the currency. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Cash position, Receipts and payments, Overdue debtors, Coming weeks, Actions, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A weekly cash report is an actuals report with a short look ahead, used by businesses where cash is tight or lenders are watching. Finance teams who run one well keep a few habits. The movement must reconcile: opening balance plus receipts minus payments equals the closing bank balance, with any difference explained. Cash that cannot be used, such as customer deposits held on trust, rent deposits or cash trapped in another entity, is shown separately so headroom is not overstated. Headroom is available cash plus undrawn facility minus the minimum buffer. Operating receipts and payments are separated from one-offs and financing (loan drawdowns, asset sales, tax), because a good week from a loan drawdown is not a good week. The aged debtor list is where cash is won or lost: the top overdue accounts, how late they are and who is chasing. Comparing last week's forecast with actuals shows whether the forecast can be trusted. The look-ahead is about pinch points: weeks with payroll, tax or quarterly rent against low expected receipts.

{{#audience}}Audience: {{audience}}{{/audience}}
</context>

<task>
<cash_data>
{{cash_data}}
</cash_data>

{{#limits}}<limits>
{{limits}}
</limits>{{/limits}}

1. Reconcile opening plus receipts minus payments to closing cash by account and in total; show any unexplained difference.
2. Separate restricted cash and compute available cash and headroom against the facility and minimum buffer.
3. Summarise receipts and payments by type, splitting operating from one-off and financing items.
4. Compare actuals with last week's forecast where given and explain the biggest differences from the data.
5. List the top overdue debtors with amount, days overdue and the next chasing step; give total overdue and its change from last week.
6. Show the known commitments for the next few weeks and flag any week where expected cash falls below the buffer, with the levers available (collections, payment timing, facility).
</task>

<constraints>
{{> guardrails/professional-limits}}
- The reconciliation must add up; never force it by adding an unexplained balancing line.
- Do not count restricted cash or undrawn facilities that need lender approval as available without saying so.
- Do not invent expected receipts; use only dated items given and label assumptions.
- Do not advise on borrowing, insolvency or tax positions; if the figures suggest the business may not meet its obligations, say that a qualified accountant or adviser should be consulted promptly.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three sentences: closing cash and headroom, change on the week and why, the next pinch point.

## Cash position
Table: Account | Opening | Receipts | Payments | Closing | Restricted | Available. Then headroom calculation.

## Receipts and payments
Table: Type | Actual | Forecast | Difference, split operating, one-off and financing.

## Overdue debtors
Table: Customer | Amount | Days overdue | Next step | Owner. Total overdue and change.

## Coming weeks
Table: Week | Known receipts | Known payments | Expected closing | Below buffer?

## Actions
Numbered actions with owner and date.

## Data notes
Bullets: reconciling items, assumptions, missing data.
</output_format>
