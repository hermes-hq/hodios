---
schema: 1
id: write-invoice
kind: prompt
title: Write an invoice
description: Writes a professional invoice with the commonly required fields - numbering, tax IDs, VAT or sales-tax lines, payment terms and a late-fee clause - plus a short cover message.
category: accounting
version: 1.0.1
status: incubating
stage: [build, ship]
role: [consultant, founder]
requires: [none]
inputs: [text]
output: [docs, message, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [payment-terms, vat, sales-tax, getting-paid]
pairs_with:
  prompts: [chase-late-payment, set-up-chart-of-accounts, track-business-expenses]
  personas: [bookkeeper]
args:
  - name: work_details
    description: What you are billing for - client name and address, items or hours with rates, dates of work, any purchase order number, deposit already paid, and agreed payment terms.
    type: text
    required: true
  - name: business_details
    description: Your business name, address, tax or VAT number if registered, company number if any, last invoice number used, and how you want to be paid (bank transfer, payment link). Leave out full bank details if you prefer; placeholders are used.
    type: text
  - name: country
    description: Your country and, if different, the client's country - this changes required fields, tax lines and cross-border notes.
    type: string
output_contract:
  format: markdown
  sections: [Invoice, Cover message, Before you send]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.1, note: "Uses an issue-date placeholder when no date is given."}
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare invoices for freelancers and small businesses. A good invoice gets paid faster because nothing on it gives the client's accounts team a reason to send it back: a unique sequential number, issue and due dates, both parties' legal names and addresses, tax identifiers where required, a clear description of what was supplied and when, correct arithmetic, tax shown the way the law requires, payment terms and payment instructions, and the client's purchase order number if they use one. Requirements vary by country: many VAT and GST systems specify mandatory fields and special wording (for example reverse-charge notes for cross-border business services), some countries require invoices to go through a government e-invoicing system, and in others there is no fixed format at all.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Work to invoice:

<work_details>
{{work_details}}
</work_details>
{{#business_details}}

Business details:

<business_details>
{{business_details}}
</business_details>
{{/business_details}}

1. Work out the invoice number (next in sequence if the last one was given; otherwise a placeholder with a suggested format such as 2026-014), the issue date (the date given, otherwise [ISSUE DATE]) and the due date from the agreed terms (if no terms were agreed, default to 30 days and say so).
2. Build the line items: description specific enough to match the agreement (what, for which project, which dates), quantity, unit, rate and line total. Subtract any deposit already paid.
3. Apply tax as the details indicate: if the seller is registered, add VAT, GST or sales tax at the stated rate with the tax amount shown separately; if not registered, show no tax and do not add a tax line. For cross-border business-to-business services, add the reverse-charge or zero-rating note only as a placeholder to confirm. Ask for the rate rather than assuming it.
4. Add payment terms, accepted payment methods with placeholders for bank details, and a late-payment clause that refers to the contract or to the statutory interest rules where they exist, worded as something to confirm.
5. Check the arithmetic: line totals, subtotal, tax, deposit and total due. Show the check below the invoice.
6. Write a short cover message for email: what is attached, the amount and due date, the payment method, and a friendly line of thanks.
7. List what to confirm before sending: missing fields, tax treatment, e-invoicing obligations in their country, and whether the client needs a purchase order number.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent tax numbers, company numbers, bank details, addresses or purchase order numbers. Use clear placeholders such as [VAT NUMBER] and list them under "Before you send".
- Do not decide whether the seller must register for VAT, GST or sales tax, or which rate applies to a product; flag it for an accountant if the details suggest it is unclear.
- Mention mandatory e-invoicing systems only where you are confident they apply (for example Brazil, Italy or Mexico), and say to confirm current scope.
- Keep the late-payment clause factual and proportionate; no threats.
- Round money to two decimals and keep currency consistent; if the client is billed in a foreign currency, show the currency code on every amount.
</constraints>

<output_format>
## Invoice
The invoice as a clean Markdown layout: header (seller details, invoice number, issue date, due date, PO number), bill-to block, line-item table (description | qty | unit | rate | amount), totals block (subtotal, tax, deposit, total due), payment instructions, terms and late-payment note, tax notes.

Then a short "Arithmetic check" line showing the sums.

## Cover message
Subject line and a message of 60-100 words.

## Before you send
Checklist of placeholders and items to confirm.
</output_format>
