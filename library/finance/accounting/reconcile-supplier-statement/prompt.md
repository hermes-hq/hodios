---
schema: 1
id: reconcile-supplier-statement
kind: prompt
title: Reconcile a supplier statement
description: Reconciles a supplier's statement against your payables ledger, matching invoices, credits and payments, explaining each difference and listing the fixes and queries.
category: accounting
version: 1.0.0
status: incubating
stage: [verify]
role: [founder, operations-manager]
requires: [none]
inputs: [text, dataset, document]
output: [table, message, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [accounts-payable, supplier-reconciliation, creditors, month-end]
pairs_with:
  prompts: [plan-supplier-payment-run, prepare-month-end-close, reconcile-bank-account]
  personas: [bookkeeper]
args:
  - name: supplier_statement
    description: The supplier's statement lines - date, document number, type (invoice, credit, payment), amount - and the closing balance and statement date.
    type: text
    required: true
  - name: ledger
    description: Your payables ledger for the same supplier - date, their reference, type, amount - and your closing balance on the same date.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Result, Reconciliation, Differences explained, Fixes in your books, Query to the supplier]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You reconcile supplier statements the way an experienced payables clerk does. The aim is to agree what you owe before paying, so you neither overpay nor get put on stop. Differences fall into a few kinds: timing (a payment you sent that the supplier has not yet applied, an invoice they issued that you have not yet received), items missing on one side (a lost invoice, a credit note you never got or never recorded), duplicates (the same invoice entered twice, often once from a PDF and once from a paper copy), errors (wrong amount, transposition, invoice posted to the wrong supplier), and disputes (short delivery, price differences, credits promised but not issued). Work from the supplier's closing balance to yours, item by item; an unexplained balancing figure is not a reconciliation. Never pay an invoice you have not seen just because it is on a statement.
</context>

<task>
Supplier statement:

<supplier_statement>
{{supplier_statement}}
</supplier_statement>

Your ledger:

<ledger>
{{ledger}}
</ledger>

1. Check both sides cover the same date. If the dates differ, note which items fall between them as timing.
2. Match items by document number first, then by amount and date. Mark one-to-many matches (one payment covering several invoices).
3. List unmatched items on each side and classify each: timing, missing invoice, missing credit, duplicate, error, dispute or unapplied payment. Show the evidence.
4. Build the reconciliation: supplier closing balance, adjusted for each item, equals your closing balance. If it does not, state the remaining difference and the likely causes.
5. Write the fixes for your books: entries to record or remove, with the reason.
6. Draft a short, polite query to the supplier listing the items they need to act on (copy invoices, issue promised credits, apply payments), with references and amounts.
7. Say what is safe to pay now and what to hold until resolved.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the lines given. Do not invent invoices, payments or explanations; where an item could have several causes, list them.
- Do not recommend paying any invoice that is not in your ledger until you have a copy.
- Never force agreement with an unexplained adjustment.
- Keep the supplier message factual and neutral, without blame.
</constraints>

<output_format>
## Result
Two lines: agreed or not, and any unexplained difference.

## Reconciliation
Supplier balance, each adjustment, your balance.

## Differences explained
Table: side | date | reference | amount | type | evidence.

## Fixes in your books
Table: action | reference | amount | reason.

## Query to the supplier
Ready-to-send message, then one line on what to pay now and what to hold.
</output_format>
