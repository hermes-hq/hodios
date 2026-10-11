---
schema: 1
id: prepare-financial-statements-from-trial-balance
kind: prompt
title: Prepare financial statements from a trial balance
description: Turns a trial balance into a profit and loss and balance sheet for management use, with an account mapping, subtotals, checks that it balances and notes on what is missing.
category: accounting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, financial-analyst]
requires: [none]
inputs: [dataset, text]
output: [table, report]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [trial-balance, profit-and-loss, balance-sheet, management-accounts]
pairs_with:
  prompts: [review-small-business-pnl, review-balance-sheet, prepare-month-end-close]
  personas: [fractional-cfo]
args:
  - name: trial_balance
    description: The trial balance at the period end - account code, name, debit or credit balance. Include the prior period if you want comparatives.
    type: text
    required: true
  - name: business
    description: What the business does, legal form (sole trader, partnership, company), the period, and who the statements are for (owner, lender, board).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Checks on the trial balance, Account mapping, Profit and loss, Balance sheet, Notes and adjustments not yet made, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare management statements from a trial balance the way an experienced accountant does. Every account maps to one line: income statement accounts to revenue, cost of sales, overheads by type, other income and finance costs; balance sheet accounts to non-current assets, current assets, current liabilities, non-current liabilities and equity. Before year-end close, the trial balance still holds the period's income and expense accounts, so the profit for the period must be carried into equity for the balance sheet to balance. Common traps: owner drawings or dividends shown as expenses, loan repayments in overheads, a suspense balance hidden in other debtors, tax control accounts netted wrongly, credit card balances treated as bank, and the current portion of loans not split out. These are management statements; statutory accounts follow a framework, format and disclosures that an accountant prepares.

Business: {{business}}
</context>

<task>
Trial balance:

<trial_balance>
{{trial_balance}}
</trial_balance>

1. Check that total debits equal total credits. If they do not, stop and report the difference and the likely causes.
2. Map every account to a statement line, showing the mapping in a table. Flag any account whose balance is on the unexpected side or whose name suggests it belongs elsewhere.
3. Build the profit and loss: revenue, cost of sales, gross profit and margin, overheads grouped by type, operating profit, finance costs, profit before tax. Use comparatives if given.
4. Build the balance sheet: non-current assets at net book value, current assets, current liabilities, net current assets, non-current liabilities, net assets, and equity including the profit for the period and drawings or dividends. Show that net assets equal equity.
5. List adjustments not yet made that commonly change the figures (depreciation, accruals, prepayments, stock count, bad debts, tax provision, splitting the loan current portion) and whether the trial balance suggests they are missing.
6. Write a short commentary: three to five points an owner should notice.
7. Recompute every subtotal before answering.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the balances given. Do not invent adjustments; list them as "not yet made" with why they matter.
- Label the output as management statements, not statutory or filed accounts, and do not compute tax.
- If the statements do not balance after mapping, show the difference; never plug it.
- Keep account names as given in the mapping so the user can trace every figure.
</constraints>

<output_format>
## Checks on the trial balance
Bullets with totals.

## Account mapping
Table: account | balance | statement | line | flag.

## Profit and loss
Table with subtotals (and comparatives if given).

## Balance sheet
Table with subtotals; final line shows net assets equal to equity.

## Notes and adjustments not yet made
Bullets, then the short commentary.

## Questions
Bullets.
</output_format>
