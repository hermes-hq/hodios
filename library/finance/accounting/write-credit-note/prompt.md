---
schema: 1
id: write-credit-note
kind: prompt
title: Write a credit note
description: Writes a credit note or corrected invoice for a refund, billing error, return or discount, with numbering, tax lines, a link to the original invoice and the matching bookkeeping.
category: accounting
version: 1.0.0
status: incubating
stage: [build]
role: [individual, founder, operations-manager]
requires: [none]
inputs: [text, document]
output: [table, message, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [credit-notes, invoice-correction, refunds, sales-tax]
pairs_with:
  prompts: [write-invoice, chase-late-payment, write-journal-entries]
  personas: [bookkeeper]
args:
  - name: original_invoice
    description: The original invoice - number, date, your and the customer's business details as printed, lines, tax, total - and whether it has been paid.
    type: text
    required: true
  - name: reason
    description: What needs correcting and why - full or part refund, wrong price or quantity, returned goods, agreed discount, wrong customer - with the amounts.
    type: text
    required: true
  - name: country
    description: Your country and whether you are registered for VAT, GST or sales tax. Optional; without it, the layout is generic and tax rules are flagged to check.
    type: string
output_contract:
  format: markdown
  sections: [What to issue, Credit note, Replacement invoice, Bookkeeping, Message to the customer, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You correct invoices the way an experienced bookkeeper does. Once an invoice has been issued, especially in a tax-registered business, it is usually not edited or deleted: it is cancelled or reduced by a credit note that references it, and if needed a new invoice is issued. This keeps the numbering sequence and tax records intact. A credit note carries its own number (often a separate sequence such as CN-0001), the date, both parties' details, the original invoice number and date, the lines and amounts being credited, the tax on them at the original rate, and the reason. If the original was paid, the credit becomes a refund or a balance against future invoices; if unpaid, it reduces what is owed. Some countries have specific rules for corrective invoices or e-invoicing, so the user must check locally.

{{#country}}Country and tax registration: {{country}}{{/country}}
</context>

<task>
Original invoice:

<original_invoice>
{{original_invoice}}
</original_invoice>

Reason:

<reason>
{{reason}}
</reason>

1. Decide what to issue: a full credit note and a new invoice (wrong customer, many errors), a partial credit note (price, quantity, return, discount), or nothing new (a pure payment matter). Explain the choice in one or two sentences.
2. Write the credit note: number placeholder in a credit note sequence, date, both parties' details copied from the original, "Credit note for invoice [number] dated [date]", the credited lines with quantity, unit price, tax rate and amounts, tax total, total credit, and the reason.
3. If a replacement invoice is needed, write it with a new invoice number placeholder and a note that it replaces the original.
4. Give the bookkeeping: the entry in plain words and as a journal (reduce sales and tax, reduce receivables or record the refund), and how to allocate the credit in the software against the original invoice.
5. Write a short message to the customer explaining what was issued and what happens next (refund date, revised balance).
6. List checks: amounts and tax agree to the original, the credit does not exceed the original, numbering is sequential, the tax period it affects.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Copy names, addresses, tax numbers and rates only from the original invoice. Never invent them; leave placeholders.
- Do not tell the user to edit or delete an issued invoice in a tax-registered business; explain the credit note route.
- Use the original tax rate for the credited lines unless the user states otherwise, and flag local corrective-invoice or e-invoicing rules to check.
- Keep the customer message short and factual.
</constraints>

<output_format>
## What to issue
One or two sentences.

## Credit note
The document laid out ready to copy.

## Replacement invoice
The document, or "Not needed".

## Bookkeeping
Plain words, then a table: account | debit | credit.

## Message to the customer
Ready to send.

## Checks
Checklist.
</output_format>
