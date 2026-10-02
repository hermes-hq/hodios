---
schema: 1
id: prepare-month-end-close
kind: prompt
title: Prepare a month-end close checklist
description: Builds a month-end close checklist for a small business, sequenced by day, covering bank and card reconciliations, receivables, payables, accruals, payroll, tax accounts, review and sign-off.
category: accounting
version: 1.0.0
status: incubating
stage: [operate, review]
role: [founder, operations-manager, financial-analyst]
requires: [none]
inputs: [text]
output: [checklist, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [month-end, reconciliation, accruals, bookkeeping-routine]
pairs_with:
  prompts: [set-up-chart-of-accounts, forecast-cash-flow]
args:
  - name: business
    description: The business and its books - what it sells, accounts held (bank, cards, payment processors, loans), invoicing and bills, payroll, inventory, sales tax or VAT, who does the books, and how many days after month end you want to close.
    type: text
    required: true
  - name: software
    description: Bookkeeping or accounting software in use. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Close calendar, Checklist, Reconciliation standards, Review and sign-off, Risks in your setup]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design a repeatable month-end close for a small business. A good close is boring: the same steps in the same order, each with an owner, a day and evidence that it was done, so that the monthly numbers can be trusted for decisions and the year-end is not a scramble. The order matters: reconcile cash first, because almost every other account depends on it; then receivables and payables; then accruals and adjustments; then review.

{{#software}}Software: {{software}}{{/software}}
</context>

<task>
Business:

<business>
{{business}}
</business>

1. Set a realistic target close (often day 5 to 10 for a small business) and sequence the work into close days: day 1 (cut-off and data capture), day 2-3 (reconciliations), day 4-5 (accruals and adjustments), final day (review and lock).
2. Build the checklist, including only what applies to this business:
   - Cut-off: all sales invoices raised, bills entered, receipts attached, expense claims submitted.
   - Reconcile every bank, card, payment-processor and loan account to its statement; clear the suspense or clearing account.
   - Receivables: ageing review, follow-ups, potential bad debts flagged for the accountant.
   - Payables: ageing review, unbilled supplier costs.
   - Payroll: journal posted, payroll liabilities match the payroll report.
   - Accruals and prepayments; deferred revenue for anything invoiced but not yet earned.
   - Inventory count or roll-forward and cost of goods sold, if there is inventory.
   - Fixed assets and depreciation per the agreed schedule.
   - Sales tax or VAT control accounts reconciled to the returns.
   - Intercompany or owner transactions classified.
3. For each item give owner (role placeholder), day, evidence (what document proves it is done) and the typical red flag.
4. Write reconciliation standards: what "reconciled" means, tolerance, and what to do with unexplained differences.
5. Design the review: a variance review of the profit and loss and balance sheet against last month and budget, with thresholds that trigger investigation, then sign-off and locking the period in the software.
6. Point out risks specific to this setup (one person doing everything, cash sales, many payment processors, no inventory counts).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not decide accounting treatments that need judgement (revenue recognition on complex contracts, bad-debt write-offs, capitalisation, tax adjustments). List them as items to agree with the accountant.
- Owners are roles ([Bookkeeper], [Owner], [External accountant]), never invented names.
- Scale to the business: a one-person consultancy needs a short list; do not pad it with steps for inventory or payroll it does not have.
- If the software is named, refer to features generically (bank feeds, lock date, reconciliation report) unless you are sure of the exact name.
- If the description is too thin to know which accounts exist, ask up to three questions and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Close calendar
Table: close day | focus | items.

## Checklist
Table: # | task | owner | day | evidence | red flag. Grouped by area.

## Reconciliation standards
Bullets.

## Review and sign-off
Checklist with variance thresholds.

## Risks in your setup
Bullets with one mitigation each.
</output_format>
