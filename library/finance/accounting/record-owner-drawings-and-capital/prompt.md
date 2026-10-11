---
schema: 1
id: record-owner-drawings-and-capital
kind: prompt
title: Record owner drawings and capital
description: Sets up how a sole trader or partner records money put into and taken out of the business, with equity accounts, journals and the year-end close of drawings to capital.
category: accounting
version: 1.0.0
status: incubating
stage: [build]
role: [individual, founder]
requires: [none]
inputs: [text]
output: [table, explanation, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [owner-equity, sole-trader, partnership, capital-account]
pairs_with:
  prompts: [separate-personal-and-business-spending, set-up-chart-of-accounts, prepare-year-end-accounts-pack]
  personas: [bookkeeper]
args:
  - name: situation
    description: Your business structure (sole trader, partnership with the profit split, or other), country, and how money moves between you and the business - money you put in, things you paid personally for the business, money you took out, business money spent on personal things.
    type: text
    required: true
  - name: software
    description: The bookkeeping software or spreadsheet you use. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Structure check, Accounts to set up, How to record each movement, Year-end treatment, Monthly habits, Questions for your accountant]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain owner equity the way a patient bookkeeper does for a sole trader or partner. In an unincorporated business the owner and the business are the same legal person, so the owner does not pay themselves a salary through the books: money taken out is drawings, not an expense, and it does not reduce profit. Money put in is capital introduced, not income. Business costs paid from a personal card are capital introduced (or a reimbursement owed), and personal costs paid from the business account are drawings. At year end, profit is added to the capital account and drawings are deducted, so the closing capital shows what the owner has left invested. Partnerships keep a capital and usually a current account per partner, with profit shared by the agreement. Companies are different: owners are paid by salary, dividends or loan accounts, with their own rules, so this setup does not apply to them.
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

{{#software}}Software: {{software}}{{/software}}

1. Check the structure. If the business is a limited company or corporation, say plainly that drawings do not apply, explain in two sentences that owner pay runs through salary, dividends or a director's loan account, recommend the accountant, and stop.
2. List the equity accounts to set up (capital introduced, drawings, capital account, and per-partner current accounts where relevant), with how they appear on the balance sheet.
3. For each kind of movement the user described, give the entry in plain words and as a journal: money in, personal card used for business, business account used for personal costs, regular transfers to self, assets brought into the business.
4. Show the year-end treatment with a worked example using the user's figures where given: opening capital plus capital introduced plus profit minus drawings equals closing capital. For partnerships, show the profit split into each partner's account.
5. Explain why drawings do not reduce taxable profit, without stating any tax amount, and what usually needs setting aside for tax.
6. Give monthly habits: one regular transfer, references on every transfer, reimbursing personal-card spending in one batch with receipts.
7. List questions for the accountant.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not calculate tax or tell the user how much they can take out. State the general principle only.
- Use only the figures given; label any worked-example numbers that are illustrative.
- Rules on equity and owner pay differ by country and structure; name the assumption.
- Keep it plain: define capital, drawings and equity in one line each.
</constraints>

<output_format>
## Structure check
One or two sentences.

## Accounts to set up
Table: account | type | what goes in it.

## How to record each movement
Table: movement | entry in plain words | debit | credit.

## Year-end treatment
Worked capital account reconciliation.

## Monthly habits
Checklist.

## Questions for your accountant
Bullets.
</output_format>
