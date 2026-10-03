---
schema: 1
id: build-job-quote-calculator
kind: prompt
title: Build a job quote calculator
description: Builds a job quote calculator for a trade or service business with materials, labour, markup, overheads and tax, producing a customer-ready total. Use to price jobs consistently and protect margin.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [founder, sales-rep, individual]
stack: [excel, google-sheets]
inputs: [text]
output: [table, code, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [quoting, job-costing, markup, trades, margin]
pairs_with:
  prompts: [design-spreadsheet-model, set-up-data-validation]
args:
  - name: business_type
    description: The trade or service (for example electrician, landscaper, cleaning company, photographer) and the country or region, which decides the sales tax and how quotes are usually laid out.
    type: string
    required: true
  - name: cost_items
    description: What goes into a typical job - materials with unit costs, labour roles with hourly costs, travel, equipment hire, subcontractors, disposal fees - and your yearly overheads if you know them.
    type: text
    required: true
  - name: markup_rules
    description: How you price now - markup or target margin per cost type, minimum job charge, call-out fee, contingency, deposit, discounts, rounding.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions and questions, Workbook layout, Formulas, Worked example, Customer quote, Checks before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small trade and service businesses price jobs. Owners lose money on quotes in predictable ways: confusing markup with margin (a 25% markup is only a 20% margin), pricing labour at the wage instead of the loaded cost, forgetting travel, waste and overheads, and quoting from memory so similar jobs get different prices. You build one calculator that does the arithmetic the same way every time and produces a clean quote the customer sees, separate from the internal costing they should not see.
</context>

<task>
Build a job quote calculator for a {{business_type}} business.

<cost_items>
{{cost_items}}
</cost_items>

<markup_rules>
{{markup_rules}}
</markup_rules>

1. List assumptions and questions. If the markup rules are missing, propose a structure with clearly labelled placeholder percentages and ask the owner to set them; do not present invented percentages as industry standard. Ask about the sales tax rate and which items it applies to rather than assuming.
2. Rates sheet (named cells or a table): material price list with unit, unit cost and waste factor (for example extra for cutting tiles or timber); labour roles with loaded hourly cost (wage plus employer taxes, insurance, paid leave and non-billable time) and charge-out rate; overhead recovery per billable hour (yearly overheads divided by yearly billable hours, with both inputs visible); travel cost per trip or per distance; markup by cost type; minimum charge; tax rate; deposit percentage; quote validity in days.
3. Quote builder sheet, one row per line item: type (material, labour, equipment, subcontract, other), item picked from a dropdown, quantity, unit cost looked up from Rates, waste-adjusted quantity, cost, markup, sell price. Then subtotals by type, contingency if used, minimum charge check, discount, tax, total, deposit due, and the quote expiry date.
4. Formulas, with the distinction made explicit: sell price from markup is `cost * (1 + markup)`; sell price from a target margin is `cost / (1 - margin)`. Show both, and show the resulting margin of the whole job as `(price before tax - total cost) / price before tax`.
5. Work one realistic example job through the calculator with the user's items, showing each line and the totals.
6. Customer quote sheet: the business details placeholder, customer, job description, scope in plain words, priced sections (not internal costs or markups), exclusions, tax, total, deposit, validity, payment terms placeholder.
7. Margin guardrails: a warning cell when the job margin falls below a floor the owner sets, and when labour hours look low for the job type relative to a rule of thumb the owner enters.
</task>

<constraints>
- Every rate and percentage lives on the Rates sheet; no numbers typed into formulas.
- Use only functions in both Excel and Google Sheets unless one app is named; comma separators, and note once that some locales use semicolons.
- Tax rules vary by country and by item. State the tax assumption and tell the owner to confirm it with their accountant or tax authority; do not give tax advice.
- Keep internal cost and markup off the customer quote sheet, and say how to export or print only that sheet.
- Round the customer-facing total the way the owner chooses (to the cent, or to a whole amount), and round only the final price, not intermediate lines.
</constraints>

<output_format>
## Assumptions and questions
Bullets, with placeholders marked.

## Workbook layout
Rates, Quote builder and Customer quote sheets with their columns and named cells.

## Formulas
Table: Purpose | Cell or column | Formula | Notes.

## Worked example
The example job as a table: Line | Qty | Unit cost | Cost | Markup | Sell. Then subtotals, tax, total, margin.

## Customer quote
The layout of the customer-facing page.

## Checks before sending
A short checklist: scope matches the site visit, exclusions listed, margin above floor, expiry date set, tax correct.
</output_format>
