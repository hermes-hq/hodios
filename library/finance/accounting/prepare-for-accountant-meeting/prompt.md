---
schema: 1
id: prepare-for-accountant-meeting
kind: prompt
title: Prepare for a meeting with your accountant
description: Prepares a small business owner or freelancer for an accountant meeting - documents to gather, questions on tax, structure and cash, decisions to bring, and a one-page brief to send ahead.
category: accounting
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual]
requires: [none]
inputs: [text]
output: [checklist, questions, summary]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [accountant, year-end, meeting-prep, sole-trader, self-employed]
pairs_with:
  prompts: [prepare-year-end-accounts-pack, choose-business-structure, plan-freelance-tax-set-aside, reconcile-bank-account]
  personas: [bookkeeper, fractional-cfo]
args:
  - name: business_type
    description: What the business is and how it is set up, for example "freelance designer, sole trader, 2 years trading" or "two-person limited company selling online, VAT registered".
    type: string
    required: true
  - name: meeting_purpose
    description: Why you are meeting, for example "year-end accounts", "first meeting with a new accountant", "should I incorporate?", "cash is tight" or "tax bill surprise".
    type: string
    required: true
  - name: concerns
    description: Optional - what worries you or what you want to decide, such as a big purchase, hiring, taking money out, late filings, or messy records.
    type: text
output_contract:
  format: markdown
  sections: [What to get out of this meeting, Documents to gather, Questions to ask, Decisions to bring, Brief to send ahead, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare small business owners and freelancers for meetings with their accountant so they get advice, not just compliance. Accountants are often paid for a fixed number of hours, and too much of the meeting is spent hunting for documents or explaining basics. Owners who arrive with organised records, a short brief and a clear list of decisions get better answers on the questions that matter: how much tax to set aside, whether the structure still fits, how to pay themselves, what they can claim, and how to manage cash. Your job is the preparation; the advice itself comes from the accountant.

Business: {{business_type}}
Meeting purpose: {{meeting_purpose}}
</context>

<task>
{{#concerns}}Concerns:

<concerns>
{{concerns}}
</concerns>
{{/concerns}}

1. If the business type does not say whether it is a sole trader, partnership or company, or whether it is registered for sales tax or VAT, ask those two things and stop, because the document list depends on them.
2. Set the goals for the meeting: two or three outcomes the owner should leave with, matched to the purpose (for example "a number to set aside each month for tax" or "a decision on whether to incorporate this year, or the data still needed").
3. List the documents to gather for this purpose and business type, grouped: bank statements and reconciliations, sales and invoices, expenses and receipts, payroll, sales tax or VAT returns, assets bought or sold, loans and finance agreements, previous accounts and tax returns, letters from the tax authority, and anything relating to the concerns. Mark which are essential and which are useful.
4. Write the questions to ask, grouped by tax (deadlines, payments on account or estimates, what is deductible, record-keeping periods), structure (does it still fit, what would change it), paying yourself (salary, drawings, dividends, pension, as questions only), cash (how much to keep back, managing seasonal dips), and compliance (what the owner must do between meetings). Tailor them to the purpose and the concerns, and drop questions that do not apply.
5. Turn the concerns into decisions to bring, each with the information the accountant will need to answer it (for example for a van purchase: price, finance terms, business use percentage, timing).
6. Draft a short brief to email ahead: what the business does, the period, what has changed this year, the decisions wanted, and the documents attached or to follow. Use placeholders for names and figures.
7. Add an after-the-meeting checklist: write down the decisions and deadlines, confirm them by email, put tax payments in the calendar, and agree who does what.
8. Check before answering that no tax position is recommended and every country-specific term is either from the input or marked to confirm with the accountant.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Phrase tax, structure and pay questions as questions for the accountant. Do not tell the owner which structure, salary split or deduction to use.
- Do not invent deadlines, thresholds or rates. If you mention a typical deadline type (a filing date, a payment on account), say to confirm the date for their country and year.
- If the concerns mention missed filings, letters from the tax authority, or an investigation, put that at the top as the first thing to raise and suggest gathering every letter received.
- Keep the document list practical: no more than about twenty items, essentials first.
</constraints>

<output_format>
## What to get out of this meeting
Two or three outcome bullets.

## Documents to gather
Grouped checklist with essential / useful marks.

## Questions to ask
Grouped numbered questions.

## Decisions to bring
Table: decision | information the accountant needs | where to find it.

## Brief to send ahead
A short email with placeholders.

## After the meeting
Checklist.
</output_format>
