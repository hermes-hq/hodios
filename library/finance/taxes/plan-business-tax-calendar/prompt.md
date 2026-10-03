---
schema: 1
id: plan-business-tax-calendar
kind: prompt
title: Plan a business tax calendar
description: Builds a dated calendar of a business's tax filings and payments for the year, covering income tax, payroll, VAT or sales tax and annual filings, with owners, documents and reminders.
category: taxes
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, operations-manager, consultant]
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
tags: [tax-deadlines, compliance-calendar, annual-filings, payroll-tax]
pairs_with:
  prompts: [plan-estimated-tax-payments, prepare-vat-return-workpaper, prepare-month-end-close]
args:
  - name: business_structure
    description: Legal form (sole trader, partnership, LLC, limited company, other), financial year end, whether you have employees and how often you run payroll, VAT or sales tax registration and filing frequency, and who does your accounts.
    type: string
    required: true
  - name: country
    description: Country (and state or province if relevant) where the business is registered and operates.
    type: string
    required: true
  - name: year
    description: The calendar or tax year the plan covers, for example 2027.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Calendar, Recurring items, Documents by filing, Items to confirm, Setting it up]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build the one calendar a small business owner needs so that no tax filing or payment surprises them. Small businesses rarely miss deadlines because the work is hard; they miss them because the dates are scattered across income tax, payroll, VAT or sales tax and company filings, each with a different cycle, and some depend on the financial year end rather than the calendar. Late filing often carries a fixed penalty even when no tax is owed, so every item matters, not just the payments.

Country: {{country}}
Year: {{year}}
</context>

<task>
Business:

<business_structure>
{{business_structure}}
</business_structure>

1. State your assumptions: legal form, year end, payroll frequency, VAT or sales tax frequency, and who prepares what. If something that drives dates is missing (year end, filing frequency, whether there are employees), ask and show the calendar both ways only if the difference is small.
2. List every filing and payment that usually applies to this structure in {{country}}: business or personal income tax returns and payments, advance or estimated payments, payroll filings and payments, year-end employee forms, VAT or sales tax returns and payments, annual company filings with the business registry, and local business or property taxes.
3. Put them in date order for {{year}}. Mark any date you are not confident is current for {{country}} as "confirm", and note that dates on weekends or public holidays may move.
4. For each item give the period it covers, who owns it (owner, bookkeeper, accountant, payroll provider), the documents needed, and a reminder date (by default 14 days before, and 3 days before for payments).
5. Separate the monthly and quarterly recurring items into their own short list so the main calendar stays readable.
6. List the documents each filing needs.
7. Explain how to set it up in a calendar or task tool with reminders, and how to review it at the start of each quarter.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never present a deadline as certain unless you are confident it is current for {{country}} and this structure; otherwise mark it "confirm" and name the official source.
- Include filings with no tax to pay (nil returns, information returns, registry filings), since missing them is usually penalised too.
- If you do not know the country's deadlines, say "I don't know" for those items and list the categories to confirm with an accountant or the tax authority.
- Keep the calendar specific to this business; leave out obligations that clearly do not apply and say why in one line.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets.

## Calendar
Table: date | filing or payment | period covered | owner | reminder | confirm?

## Recurring items
Table: item | frequency | usual deadline | owner.

## Documents by filing
Bullets per filing.

## Items to confirm
Numbered, with who to ask.

## Setting it up
Short checklist.
</output_format>
