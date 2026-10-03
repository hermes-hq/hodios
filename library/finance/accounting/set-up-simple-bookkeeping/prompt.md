---
schema: 1
id: set-up-simple-bookkeeping
kind: prompt
title: Set up simple bookkeeping
description: Sets up simple bookkeeping for a sole trader or freelancer, with a tool choice sized to volume, lean categories, a weekly routine, receipt rules and a year-end checklist for the accountant.
category: accounting
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, consultant, content-creator]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [sole-trader, freelancers, record-keeping, bank-reconciliation]
pairs_with:
  prompts: [set-up-chart-of-accounts, track-business-expenses, prepare-year-end-accounts-pack]
  personas: [bookkeeper]
args:
  - name: business_type
    description: What the business does and how it gets paid (for example freelance copywriter invoicing clients, market stall taking cash and card, online shop selling physical products).
    type: string
    required: true
  - name: transactions_per_month
    description: Roughly how many sales and expense transactions you have in a typical month. Optional; used to size the tool.
    type: number
  - name: country
    description: Country where the business is taxed. Optional; used for record-keeping periods and tax return categories, all marked to verify.
    type: string
output_contract:
  format: markdown
  sections: [Setup decisions, Categories, Weekly routine, Monthly routine, Receipts and records, Year-end checklist, Questions for your accountant]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up bookkeeping that a busy sole trader will actually keep up, because a perfect system abandoned in March is worse than a simple one kept all year. Good small-business bookkeeping comes down to a few habits: business money in its own account, every transaction categorised soon after it happens, a receipt attached to every expense, a monthly check that the books match the bank, and categories that map straight onto the tax return so year end is a summary, not a reconstruction.

Business: {{business_type}}
{{#transactions_per_month}}Transactions per month: about {{transactions_per_month}}{{/transactions_per_month}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Make the setup decisions, each with a one-line reason: a separate business bank account (and card); cash basis or accrual (cash basis is often simpler and sometimes allowed for small sole traders, verify locally); and a tool sized to volume, a spreadsheet for very low volume or a bookkeeping app with bank feeds and receipt capture above that. Describe what the tool must do rather than recommending a brand, unless the user named tools.
2. Propose 10 to 15 categories that fit this business and map onto the usual self-employed tax return headings{{#country}} in {{country}} (mark the mapping "verify"){{/country}}. Include owner drawings and money the owner puts in, which are not income or expenses, and sales tax or VAT if registered.
3. Write a weekly routine of about 15 minutes: categorise new transactions, attach receipts, invoice and chase.
4. Write a monthly routine: reconcile to the bank statement, review unpaid invoices, move a tax set-aside, glance at profit to date.
5. Set receipt and record rules: what counts as adequate evidence, digital copies, how to handle mixed personal and business purchases, and how long to keep records (verify the local period).
6. Give a year-end checklist that produces what an accountant or tax return needs.
7. Ask, at the end, about anything that would change the setup (stock held, employees, VAT registration, a partner).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Keep it proportionate: no more categories or steps than this business needs. Every routine has a time estimate.
- Mark any country-specific point (cash basis eligibility, retention periods, tax return headings) "verify" unless you are confident it is current.
- Do not decide whether a specific expense is deductible; categories are for tracking, and borderline items go on the accountant question list.
- If the business holds stock, has employees or is a company rather than a sole trader, say this simple setup may not be enough and what to add.
{{> output/uncertainty}}
</constraints>

<output_format>
## Setup decisions
Table: decision | recommendation | reason.

## Categories
Table: category | examples | maps to (tax return heading, verify).

## Weekly routine
Checklist with time estimate.

## Monthly routine
Checklist with time estimate.

## Receipts and records
Bullets.

## Year-end checklist
Checklist.

## Questions for your accountant
Numbered.
</output_format>
