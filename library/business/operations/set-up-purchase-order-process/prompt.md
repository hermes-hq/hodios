---
schema: 1
id: set-up-purchase-order-process
kind: prompt
title: Set up a purchase order process
description: Sets up a purchase order process for a small or growing business - requisition, approval limits, PO format and numbering, goods receipt and three-way match before payment.
category: operations
version: 1.0.0
status: incubating
stage: [design, build]
role: [operations-manager, founder, manager]
requires: [none]
inputs: [notes, text]
output: [plan, docs, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [purchase-orders, purchasing, procure-to-pay, three-way-match, spend-control]
pairs_with:
  prompts: [write-approval-matrix, compare-vendors, set-up-internal-controls]
args:
  - name: business
    description: Size, who buys what today and how (email, card, phone, marketplace), monthly spend and number of suppliers, the accounting or stock software used, and the problems you want to fix (overspend, duplicate orders, invoices nobody recognises, late deliveries).
    type: text
    required: true
  - name: limits
    description: Approval limits already decided, if any. Leave empty to get proposed placeholders.
    type: string
output_contract:
  format: markdown
  sections: [Process overview, When a PO is needed, Steps and roles, PO template, Receiving and matching, Exceptions, Rollout, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A purchase order process exists so that the business commits to spend before the invoice arrives, not after. The core controls are: an approved request before ordering, a numbered PO that states exactly what was agreed (items, quantity, price, delivery date, terms), a record of what was actually received, and a three-way match of PO, goods receipt and invoice before payment, with price or quantity differences beyond a tolerance sent back for approval. Small businesses that introduce POs badly create a form-filling layer that staff bypass; good designs exempt low-value and recurring items (utilities, rent, subscriptions under contract, petty purchases on cards) and use blanket orders for regular suppliers. The person who approves an order should not be the same one who receives the goods and releases payment, where team size allows. Most accounting and stock systems already have PO features; using them beats a separate spreadsheet.
</context>

<task>
Business:
<business>
{{business}}
</business>

{{#limits}}Approval limits already set: {{limits}}{{/limits}}

1. Summarise the process in one flow: need, request, approve, order, receive, match, pay, file.
2. Define when a PO is required and what is exempt (low value under a threshold, contracted recurring costs, card purchases under a limit, emergencies with after-the-fact approval).
3. Write the steps with roles: who raises the request, who approves at which level (use the given limits or `[CONFIRM]` placeholders), who places the order, who receives, who matches and who pays. Note where one person holds incompatible roles and suggest a compensating check.
4. Give a PO template: number format, date, supplier, delivery address, line items with quantity, unit price, tax, totals, delivery date, payment terms, reference to quote or contract, and instructions to put the PO number on the invoice.
5. Describe receiving (what to check and record, partial deliveries, damage) and three-way matching (tolerances as `[CONFIRM]`, what to do with mismatches, invoices without a PO).
6. Cover exceptions: urgent orders, price changes, cancelled or amended POs, blanket orders, returns and credit notes.
7. Plan the rollout: set up in the existing software if it supports POs, tell suppliers "no PO, no payment" with a start date, train staff, review after one month.
8. List points to confirm.
</task>

<constraints>
- Do not set the business's approval limits or tolerances as decided facts; propose them as placeholders with reasoning.
- Do not claim specific features of named software; say to check whether the system supports POs and matching.
- Keep the process proportionate: if the business has fewer than five buyers and few suppliers, say what can be simplified.
- Do not give tax advice; tax lines follow the business's accountant's guidance.
</constraints>

<output_format>
## Process overview
## When a PO is needed
## Steps and roles
Table: Step | Who | What | Record.
## PO template
## Receiving and matching
## Exceptions
## Rollout
## Points to confirm
</output_format>
