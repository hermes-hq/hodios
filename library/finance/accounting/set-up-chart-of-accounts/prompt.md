---
schema: 1
id: set-up-chart-of-accounts
kind: prompt
title: Set up a chart of accounts
description: Proposes a lean chart of accounts for a small business type, with numbering, what belongs in each account, mapping notes for the bookkeeping software and the common mistakes to avoid.
category: accounting
version: 1.0.0
status: incubating
stage: [design]
role: [founder, operations-manager]
requires: [none]
inputs: [text]
output: [table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [chart-of-accounts, general-ledger, account-numbering, tracking-categories]
pairs_with:
  prompts: [prepare-month-end-close, forecast-cash-flow]
args:
  - name: business_type
    description: What the business does and how it earns money (for example "two-person design agency billing retainers", "online shop selling own-brand candles", "café with catering").
    type: string
    required: true
  - name: country
    description: Country of registration. Some countries prescribe a standard chart or numbering. Optional.
    type: string
  - name: software
    description: Bookkeeping software you use or plan to use. Optional; affects how default accounts are reused.
    type: string
output_contract:
  format: markdown
  sections: [Design choices, Chart of accounts, Tracking without new accounts, Common mistakes, Check with your accountant]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design a chart of accounts the way an experienced small-business bookkeeper would: lean enough that transactions are coded consistently, detailed enough that the owner can see margins and the accountant can prepare the tax return without re-coding a year of entries. Charts usually go wrong in one of two directions: one account per vendor or project (bloated, inconsistent) or a single "expenses" bucket (useless). Detail that is not needed for tax or decisions belongs in tracking categories, classes, tags or projects, not new accounts.

Business: {{business_type}}
{{#country}}Country: {{country}}{{/country}}
{{#software}}Software: {{software}}{{/software}}
</context>

<task>
1. Note the design choices that follow from the business type: how revenue should be split (by stream, not by client), whether there is inventory and cost of goods sold, whether there is sales tax or VAT, payroll or contractors, owner draws or salary, deferred revenue for prepayments or subscriptions.
2. If {{country}} uses a prescribed or widely standard chart (some countries do), say so, name it if you are confident, and align numbering with it; otherwise use a conventional scheme: 1000 assets, 2000 liabilities, 3000 equity, 4000 revenue, 5000 cost of sales, 6000-7000 operating expenses, 8000 other income and expenses.
3. Propose the chart, typically 30 to 60 accounts for a small business. For each: number, name, type, what goes in it, and an example transaction. Include control accounts (bank, receivables, payables, sales tax or VAT payable, payroll liabilities), a clearing or suspense account, and owner's equity accounts.
4. If software is named, note where to reuse its default or system accounts instead of creating duplicates, but do not claim specific menu paths you are unsure of.
5. Recommend tracking categories, classes or tags for detail that should not be accounts (clients, projects, locations, sales channels).
6. List the common mistakes for this business type and how the chart prevents them.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Ask the person to have their accountant review the chart before the first entries are posted; the tax return and statutory accounts may need specific lines.
- Do not state tax treatments (what is deductible, depreciation methods, VAT rates) as fact. Where an account exists for tax reasons, say "confirm treatment with your accountant".
- Use names a non-accountant understands. Avoid one account per vendor, per person or per month.
- Keep capital purchases (equipment above the business's capitalisation threshold) separate from expenses, and say the threshold is a policy to agree with the accountant.
- If the business type is too vague to tell how it earns money, ask up to three questions and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Design choices
Bullets.

## Chart of accounts
Table: number | name | type | what goes here | example. Grouped by assets, liabilities, equity, revenue, cost of sales, expenses, other.

## Tracking without new accounts
Bullets: tracking dimension - what it is for.

## Common mistakes
Bullets: mistake - how this chart avoids it.

## Check with your accountant
Numbered questions.
</output_format>
