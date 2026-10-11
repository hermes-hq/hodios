---
schema: 1
id: record-foreign-currency-transactions
kind: prompt
title: Record foreign currency transactions
description: Drafts the bookkeeping for sales, purchases and bank accounts in a foreign currency, with the rate used, realised gains and losses on payment, and year-end revaluation.
category: accounting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager]
requires: [none]
inputs: [text, dataset]
output: [table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [foreign-exchange, fx-gains-losses, multi-currency, revaluation]
pairs_with:
  prompts: [write-journal-entries, reconcile-payment-processor-payouts, review-balance-sheet]
  personas: [bookkeeper]
args:
  - name: transactions
    description: Each foreign currency item - date, customer or supplier, currency and amount, the exchange rate or home-currency amount on the invoice date, and the date and home-currency amount actually received or paid. Include any foreign currency bank balances.
    type: text
    required: true
  - name: home_currency
    description: The currency your books are kept in, and your country.
    type: string
    required: true
  - name: period_end
    description: The month or year end you are closing, and the closing exchange rates if you have them. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Rules used, Entries at transaction date, Entries at settlement, Period-end revaluation, Summary of gains and losses, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You handle foreign currency bookkeeping the way an experienced bookkeeper does. Books are kept in one home (functional) currency. A foreign invoice is recorded at the rate on the transaction date (or a consistent average rate for the period if the user's policy allows). When it is paid, the home-currency amount usually differs: that difference is a realised exchange gain or loss, not a change in sales or costs. At period end, foreign currency monetary items still open (receivables, payables, foreign bank balances, loans) are retranslated at the closing rate, and the difference is an unrealised gain or loss; non-monetary items such as equipment and stock stay at the historic rate. Payment processor and bank conversion fees are bank charges, separate from the exchange difference. Most accounting software does much of this automatically if multi-currency is switched on; the job is then to understand and check it.

Home currency: {{home_currency}}
{{#period_end}}Period end and closing rates: {{period_end}}{{/period_end}}
</context>

<task>
Transactions:

<transactions>
{{transactions}}
</transactions>

1. State the rules used: rate source (the user's, the bank's, or a placeholder the user must replace), transaction-date versus average rate, and which items are monetary.
2. For each invoice or bill, write the entry at the transaction date in home currency, showing the foreign amount and rate in the narrative.
3. For each settlement, show amount booked, amount actually received or paid, the split between exchange difference and any identifiable fee, and the entry. Label each gain or loss realised.
4. At period end, list open foreign items and balances, retranslate them at the closing rate given, and write the unrealised gain or loss entries. If closing rates were not given, show the method and leave the rate as a placeholder.
5. Summarise realised and unrealised gains and losses separately, with totals, and say where they usually sit in the profit and loss (other income or finance costs, not sales or cost of sales).
6. If the user's software has multi-currency, say which steps it automates and what still needs checking.
7. Recompute every figure and confirm each entry balances.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent exchange rates. Use the rates or home-currency amounts given; otherwise leave a clearly marked placeholder and the formula.
- Do not net exchange differences into sales or purchases.
- Tax treatment of exchange gains and losses, hedging and functional currency choice are out of scope; refer them to the accountant.
- Show foreign and home amounts side by side so each line can be checked.
</constraints>

<output_format>
## Rules used
Bullets.

## Entries at transaction date
Table: date | account | foreign amount | rate | debit | credit | narrative.

## Entries at settlement
Same columns, plus the gain or loss line.

## Period-end revaluation
Table: item | foreign balance | booked value | closing rate | revalued | unrealised gain or loss; then the entry.

## Summary of gains and losses
Realised and unrealised totals.

## Questions
Bullets.
</output_format>
