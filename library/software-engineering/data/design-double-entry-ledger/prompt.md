---
schema: 1
id: design-double-entry-ledger
kind: prompt
title: Design a double-entry ledger schema
description: Designs a double-entry ledger for balances and money movement with immutable entries that always balance, currency and decimal handling, idempotency, balance queries and reconciliation.
category: data
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, dba]
stack: [sql]
requires: [none]
inputs: [text, schema]
output: [code, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [double-entry, ledger, account-balances, money-movement, reconciliation, idempotency]
pairs_with:
  prompts: [implement-money-arithmetic, implement-idempotency-keys, review-diff-for-money-handling-bugs]
args:
  - name: product
    description: "What moves money and why: wallets, marketplace payouts, credits, invoices, refunds; the flows that happen (top-up, purchase, fee, payout, refund, chargeback); volume; currencies."
    type: text
    required: true
  - name: database
    description: Engine and version, and the app stack that writes to it.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Accounts, Schema, Posting rules, Writing a transaction, Balances, Reconciliation, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A `balance` column that the code increments and decrements drifts the first time a bug, a retry or a partial failure hits, and nobody can say why. A double-entry ledger records every movement as a transaction with two or more entries whose signed amounts sum to zero per currency; balances are derived from entries. Entries are never updated or deleted: corrections are new reversing transactions, which keeps an audit trail. Accounts are typed (asset, liability, revenue, expense, equity) and each user wallet is usually a liability of the platform. Money is stored as integer minor units or exact decimals, never floats, and each entry carries its currency; currency conversion is two legs through an FX account, not one mixed entry. Every external event (payment provider webhook, payout) carries an idempotency key so a retry cannot post twice. Reading balances by summing millions of entries gets slow, so systems keep a running balance on the account row, updated in the same transaction with a lock or a version check, or periodic balance snapshots. Pending versus settled funds usually need separate accounts or entry states. This is a data design, not accounting or tax advice.
</context>

<task>
Product: {{product}}
Database: {{database}}

1. Define the chart of accounts for this product: per-user accounts and platform accounts (cash at provider, fees revenue, pending payouts, FX), each with its type and normal balance sign.
2. Write the schema: accounts, transactions (with idempotency key, type, external reference, created time), entries (transaction, account, signed amount in minor units, currency), and a balances table or snapshot table if needed. Add constraints: amounts non-zero, currency codes, a unique idempotency key, foreign keys, and no update or delete for entries (permissions or triggers).
3. Write the posting rules: the entries for each flow in the product (top-up, purchase with fee, refund, payout, chargeback, failed payout reversal), showing that each sums to zero per currency.
4. Show how a transaction is written: one database transaction that inserts the ledger transaction and entries, enforces the zero-sum rule (a deferred constraint trigger or a check in the write path), updates running balances with row locks in a consistent order, and rejects overdrafts where the account must not go negative.
5. Balance queries: current balance, balance as of a date, pending versus available.
6. Reconciliation: queries that compare the ledger with the payment provider's settlement reports and that verify every transaction sums to zero and running balances match the sum of entries.
7. List the risks and open decisions (rounding of fees, multi-currency, reporting needs for the finance team).
</task>

<constraints>
- No floating point for money anywhere, including in examples.
- Never design entries that can be updated or deleted; corrections are new transactions.
- Show posting rules as data, not prose only, and check each one balances.
- Say plainly that account treatment for tax or regulated accounting should be confirmed with the finance team or an accountant.
{{> output/uncertainty}}
</constraints>

<output_format>
## Accounts
Table: account | type | normal sign | per user or platform.

## Schema
SQL DDL.

## Posting rules
Table per flow: account | debit or credit | amount.

## Writing a transaction
Code or SQL showing the transactional write.

## Balances
SQL queries.

## Reconciliation
SQL queries and what each checks.

## Risks
Bullets.
</output_format>
