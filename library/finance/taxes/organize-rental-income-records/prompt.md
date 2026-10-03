---
schema: 1
id: organize-rental-income-records
kind: prompt
title: Organise rental income records
description: Builds a record-keeping system for a landlord's rental income and expenses, with a ledger layout, categories to verify locally, receipts, mileage and questions for a tax preparer.
category: taxes
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, founder]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [landlord, rental-property, record-keeping, deductible-expenses]
pairs_with:
  prompts: [analyze-rental-property, track-business-expenses, organize-tax-documents]
args:
  - name: properties
    description: Each rental property (type, how it is let, long-term, furnished, short-stay or a room in your home), who owns it and in what shares, whether there is a mortgage, whether an agent manages it, and how you track things today.
    type: text
    required: true
  - name: country
    description: Country (and state or region if relevant) where the properties are and where you are tax resident, if different.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [The system at a glance, Ledger layout, Income and expense categories, Receipts and documents, Mileage and travel log, Monthly and year-end routine, Questions for your tax preparer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up the records a landlord needs so that the annual return takes an evening, not a week of digging through emails. Rental tax rules differ widely, but every system asks the same things: what rent was received for each property, which costs were spent wholly on the letting, which were improvements rather than repairs, how finance costs are treated, and how joint owners split the result. Records that are tagged by property and category as they happen answer all of them.

Country: {{country}}
</context>

<task>
Properties:

<properties>
{{properties}}
</properties>

1. Summarise the setup in a few lines: number of properties, letting type, ownership shares, agent, mortgage. Ask about anything that changes record-keeping and is missing (furnished or not, any personal use, joint ownership shares).
2. Recommend the structure: one bank account used only for the rentals (or one per property when owners differ), a ledger with one row per transaction, and a folder per property per tax year.
3. Design the ledger columns: date, property, payee or payer, category, description, amount, tax or VAT if relevant, paid from, receipt reference, and a flag for "improvement or repair? ask".
4. Give the categories that commonly apply, each with examples and a note on treatment to verify in {{country}}: rent and other income (fees, insurance payouts), deposits (usually not income while held), repairs and maintenance, improvements and capital costs, finance costs and mortgage interest (often restricted or treated differently), insurance, agent and letting fees, utilities and council or property taxes paid by the landlord, legal and accounting, travel, replacing furnishings, depreciation or capital allowances where they exist, and vacant periods.
5. Set up a mileage and travel log with the fields usually needed: date, property, purpose, start and end point, distance, and the method to verify (actual cost or a standard rate).
6. Give a monthly routine (about 20 minutes) and a year-end checklist that ends with a summary per property for the preparer.
7. End with numbered questions for a tax preparer, specific to these properties.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Describe categories and records; do not decide whether a specific cost is deductible. Mark treatment "verify for {{country}}" unless you are confident it is current.
- Flag situations that change the rules and need professional input: short-stay or holiday lets, letting part of your own home, properties abroad, owners in different countries, and mixing personal use with letting.
- Keep the system light enough to keep up: if the user has one property, do not design for ten.
- If you do not know the country's treatment of an item, say "I don't know" and list it as a question for the preparer.
{{> output/uncertainty}}
</constraints>

<output_format>
## The system at a glance
Three to five bullets.

## Ledger layout
Table with the columns and an example row.

## Income and expense categories
Table: category | examples | treatment to verify | evidence to keep.

## Receipts and documents
Checklist, including what to keep permanently (purchase and improvement records) versus per year.

## Mileage and travel log
Table template with one example row.

## Monthly and year-end routine
Two short checklists.

## Questions for your tax preparer
Numbered.
</output_format>
