---
schema: 1
id: categorize-expenses
kind: prompt
title: Categorise expenses from a bank export
description: Categorises a bank or card transaction export into budget categories, totals each one, and flags subscriptions, fees, duplicate charges and spending spikes worth a closer look.
category: budgeting
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent]
requires: [none]
inputs: [dataset, text]
output: [table, summary]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [transactions, subscriptions, bank-fees, spending-review]
pairs_with:
  prompts: [build-monthly-budget, plan-savings-goal]
  personas: [personal-finance-coach]
args:
  - name: transactions
    description: Transaction export (CSV or pasted rows) with at least date, description and amount. Remove account numbers and card numbers before pasting.
    type: text
    required: true
  - name: categories
    description: Your own category list, if you have one. Optional; without it a standard household set is used.
    type: text
output_contract:
  format: markdown
  sections: [Period and totals, Spending by category, Transactions, Recurring charges, Flags, Needs your input]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a raw bank export into a spending picture someone can act on. Raw descriptions are cryptic ("SQ *BLUE BOTTLE 0423", "AMZN MKTP DE*2X4", "PAYPAL *STEAMGAMES"), sign conventions differ between banks, and transfers between a person's own accounts look like spending unless you take them out. The most useful findings are usually small and recurring: forgotten subscriptions, bank and foreign-transaction fees, duplicate charges, and one category that quietly doubled.

{{#categories}}Use these categories, and only add "Uncategorised" when nothing fits:
<categories>
{{categories}}
</categories>{{/categories}}
</context>

<task>
Transactions:

<transactions>
{{transactions}}
</transactions>

1. Detect the format: which column is date, description, amount, and whether debits are negative or in a separate column. State the convention you used.
2. If no category list is given, use: Housing, Utilities, Groceries, Eating out, Transport, Health, Insurance, Subscriptions, Shopping, Entertainment, Travel, Personal care, Kids, Gifts and donations, Fees and interest, Income, Transfers (own accounts), Cash withdrawals, Uncategorised.
3. Categorise every transaction. Use the merchant name, not guesses about what was bought; a supermarket charge is Groceries even if it might include household items. Mark low-confidence matches with "(?)".
4. Exclude income and transfers between own accounts from spending totals, and say how much you excluded.
5. Find recurring charges: same merchant at roughly the same amount on a regular interval. Give the monthly and yearly cost.
6. Flag: bank, overdraft, ATM and foreign-transaction fees; interest charges; possible duplicates (same merchant and amount within 3 days); refunds that never arrived for an obvious return; any category or single transaction far above the rest of the period.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent transactions, merchants or amounts. Totals must reconcile: spending by category plus excluded items equals the sum of all rows.
- If the data covers less than a month, say comparisons and "spikes" are limited.
- Do not label any spending as good or bad. Report it and let the person decide.
- If the export contains full account or card numbers, tell the person not to share them and refer to accounts by the last four digits only.
- A flagged duplicate or unknown charge is "worth checking with your bank", not proof of fraud. If several charges look unauthorised, tell them to contact their bank promptly.
- With more than about 200 rows, show the full category totals but list only flagged and low-confidence transactions individually.
{{> output/uncertainty}}
</constraints>

<output_format>
## Period and totals
Date range, total spending, total income, total excluded transfers.

## Spending by category
Table: category | total | % of spending | number of transactions. Sorted by total.

## Transactions
Table: date | description | amount | category. Low-confidence rows marked "(?)".

## Recurring charges
Table: merchant | amount | frequency | yearly cost | still wanted? (blank for the person to fill).

## Flags
Bullets: fees, possible duplicates, spikes, unknown merchants, each with date and amount.

## Needs your input
Transactions you could not categorise or that need the person to confirm, as a short list.
</output_format>
