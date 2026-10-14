---
schema: 1
id: build-invoice-template-spreadsheet
kind: prompt
title: Build an invoice template in a spreadsheet
description: Builds a reusable invoice template in Excel or Google Sheets - line items, tax by rate, discounts, due date, invoice numbering and a register of issued invoices with paid status.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [founder, individual, operations-manager]
stack: [excel, google-sheets]
advice_risk: [financial]
inputs: [text]
output: [table, code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [invoicing, invoice-template, sales-tax, invoice-register, invoice-numbering]
pairs_with:
  prompts: [write-invoice, set-up-data-validation, chase-late-payment]
args:
  - name: business
    description: What you sell (services by hour or day, products, or both), your country and whether you charge VAT, GST or sales tax and at which rates, payment terms, and currency.
    type: text
    required: true
  - name: tool
    description: Excel or Google Sheets.
    type: string
    required: true
  - name: volume
    description: Roughly how many invoices you send a month, and whether you need one file per invoice or one workbook for all.
    type: string
output_contract:
  format: markdown
  sections: [Layout, Invoice sheet, Formulas, Numbering, Invoice register, Protecting it, Fields to check locally]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build invoice templates in spreadsheets for freelancers and small businesses not yet on accounting software. The problems that bite are: tax calculated on the wrong base when lines have different rates or a discount, rounding per line versus on the total producing a few cents of mismatch, duplicate or skipped invoice numbers (which some tax authorities treat seriously), overwriting last month's invoice instead of saving a copy, and no record of which invoices are unpaid. A good template separates inputs from formulas, protects the formulas, numbers invoices from a register, and makes the paid or unpaid status visible. Which fields an invoice must show, and how tax is shown, differ by country.
</context>

<task>
Build the invoice template in {{tool}}.

<business>
{{business}}
</business>

{{#volume}}Volume and file setup: {{volume}}{{/volume}}

1. Layout: tabs for Settings (business details, tax rates, payment terms, currency, next invoice number), Clients (name, address, tax ID, terms), Items (optional price list), Invoice (the printable sheet) and Register (one row per issued invoice).
2. Invoice sheet: header block, client picked from a dropdown that fills the address, invoice date and due date, line items (description, quantity, unit, unit price, discount, tax rate per line, net), totals by tax rate, total tax, grand total, payment details, and the notes field. Print area set to one page.
3. Formulas: give exact formulas for line net, tax per rate (SUMIFS on the tax rate column), totals and due date (invoice date + terms). State the rounding rule (per line or per total) and make it consistent.
4. Numbering: a sequential number with a prefix from Settings, the approach for issuing (copy the sheet or save as PDF, then log it in the Register and increment), and a check that flags duplicates or gaps in the Register.
5. Invoice register: invoice number, date, client, net, tax, total, due date, paid date, status formula (Paid, Due, Overdue by days), and a summary of unpaid totals by client.
6. Protecting it: lock formula cells, leave input cells unlocked and shaded, and add data validation for dates, quantities and tax rates.
7. Fields to check locally: the fields the user should confirm their country requires on an invoice and how tax must be shown, as a checklist, not as rules.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use functions available in {{tool}}; if a function differs between Excel and Google Sheets, give the right one.
- Do not state tax rates or legal invoice requirements as fact; use the rates the user gives and list requirements as items to check with the tax authority or an accountant.
- Keep inputs, settings and formulas separate; no hardcoded rates in formulas.
- Test with a three-line example including two tax rates and a discount and show the results.
</constraints>

<output_format>
## Layout
## Invoice sheet
Cell map table: Cell or range | Content | Input or formula.
## Formulas
Code blocks.
## Numbering
## Invoice register
## Protecting it
## Fields to check locally
Checklist. Then a worked example table with the three-line test.
</output_format>
