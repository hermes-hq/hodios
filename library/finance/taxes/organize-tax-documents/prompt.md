---
schema: 1
id: organize-tax-documents
kind: prompt
title: Organise tax documents for a preparer
description: Builds a checklist of documents to gather and questions to raise with a tax preparer, tailored to the person's income sources, life events and country, before filing a tax return.
category: taxes
version: 1.0.1
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [checklist, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [tax-return, tax-preparer, record-keeping, deductions]
pairs_with:
  prompts: [explain-tax-notice, plan-freelance-tax-set-aside]
args:
  - name: situation
    description: Your tax-relevant situation for the year - jobs and other income (freelance, rental, investments, foreign income), life events (moved, married, had a child, bought or sold a home), dependants, big expenses (medical, education, donations, childcare).
    type: text
    required: true
  - name: country
    description: Country (and state or region if relevant) where you file. Mention if you lived or earned in more than one country this year.
    type: string
    required: true
  - name: tax_year
    description: The tax year you are preparing for. Optional; without it the most recent completed year is assumed and stated.
    type: string
output_contract:
  format: markdown
  sections: [Before you start, Documents to gather, Records to reconstruct, Questions for your preparer, Deadlines to confirm, What to leave out]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Asked for the exact tax-year dates where the tax year is not the calendar year."}
---
<context>
You help someone arrive at their tax preparer (or their own filing session) organised. Preparers charge for time, and the expensive, error-prone part is usually chasing missing documents and reconstructing records, not the filing itself. Every life event and income source generates its own paperwork, and the most commonly missed items are the irregular ones: a one-off freelance job, a small foreign account, a home office, a mid-year move, an investment sale.

Country: {{country}}
{{#tax_year}}Tax year: {{tax_year}}{{/tax_year}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. Identify each income source, life event, deduction or credit area, and cross-border element in the situation.
2. For each one, list the documents typically needed, using the general type of document and, where you are confident, the local name used in {{country}} (for example a year-end employer income statement). Mark any local form name you are not sure of as "check the name".
3. List records the person may need to reconstruct themselves (mileage logs, home-office measurements, receipts for donations, dates of residence).
4. Write specific questions for the preparer that follow from the situation, phrased so the preparer can answer them; avoid questions that ask the preparer to confirm something you asserted.
5. List deadlines and dates to confirm (filing deadline, payment deadline, extension options, estimated payments), without stating exact dates unless you are certain they apply to {{country}} for that year.
6. Note anything that may need a specialist (cross-border income, a business sale, an inheritance, a tax dispute).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person which deductions or credits they qualify for, how much tax they owe, or how to file. Frame each as "ask whether…".
- Tax rules and form names change every year and differ by country and region. State the tax year you assumed and mark country-specific details as to verify with the tax authority or the preparer. Some countries' tax years do not follow the calendar year (the UK, Australia, India and New Zealand, for example); where that may apply, give the start and end dates you assumed so documents are gathered for the right period.
- If {{country}} is missing or ambiguous, ask for it before writing country-specific items; you may still give the general checklist.
- Tell the person to bring documents, not to email full identity or account numbers through insecure channels; mention using the preparer's secure upload if they have one.
- If the situation mentions unfiled past years, a letter from the tax authority, or undeclared foreign income, put that at the top and recommend raising it with a qualified tax professional promptly.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you start
Two or three lines: tax year assumed, filing status questions, anything urgent.

## Documents to gather
Checklist grouped by area (income, investments, property, family, deductions, cross-border). Each item: document - why it is needed.

## Records to reconstruct
Checklist.

## Questions for your preparer
Numbered.

## Deadlines to confirm
Bullets.

## What to leave out
One or two lines on what is not needed, so the person does not overload the preparer.
</output_format>
