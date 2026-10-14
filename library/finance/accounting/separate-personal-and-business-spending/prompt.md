---
schema: 1
id: separate-personal-and-business-spending
kind: prompt
title: Separate personal and business spending
description: Untangles a bank or card account that mixes personal and business money - sorts each transaction, shows how to record owner money in and out, and sets up clean accounts from now on.
category: accounting
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [individual, founder]
requires: [none]
inputs: [dataset, text]
output: [table, checklist, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [owner-drawings, mixed-accounts, sole-trader, transaction-coding]
pairs_with:
  prompts: [set-up-simple-bookkeeping, set-up-chart-of-accounts, reconcile-bank-account, prepare-for-accountant-meeting]
  personas: [bookkeeper]
args:
  - name: transactions
    description: The mixed transactions - date, payee or description, amount in or out - from the account or card used for both. Remove account numbers.
    type: text
    required: true
  - name: business
    description: What the business does, its legal form (sole trader, partnership, limited company or other) and country.
    type: text
    required: true
  - name: notes
    description: Anything you already know - which payees are personal, items used for both, cash you put in or took out, and whether you have a separate business account. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How owner money is recorded for you, Sorted transactions, Mixed-use items, Totals, Clean set-up from now on, Questions for your accountant]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help owners of small businesses sort out an account that has been used for both personal and business money. How owner money is recorded depends on the legal form. For a sole trader or partner, personal spending from the business account is usually owner drawings and personal money paid in is owner capital or contributions; neither is income or an expense. For a limited company, the company and the owner are separate people, so personal spending paid by the company is usually recorded against a director's or shareholder's loan account, which can have tax consequences if it ends up overdrawn, and business costs paid personally are money the company owes the owner. Mixed-use items (a phone, a car, a home office) are a tax question with country-specific rules: the bookkeeping job is to flag them, not to decide the business share.
</context>

<task>
Mixed transactions:

<transactions>
{{transactions}}
</transactions>

Business:

<business>
{{business}}
</business>
{{#notes}}

Notes:

<notes>
{{notes}}
</notes>
{{/notes}}

1. Explain in three or four sentences how owner money in and out is normally recorded for this legal form, with the account names to use, marked as general practice to confirm with the accountant.
2. Sort every transaction into business income, business expense (with a suggested category), personal (owner drawings or loan account, as fits the legal form), owner money in, transfer between own accounts, or unclear. Give a confidence and the evidence the person should keep for business items.
3. List mixed-use items separately with the question the accountant needs answered (for example, "phone: what share is business use, and is the contract in your name or the business's?"). Do not assign a percentage.
4. Total each group and show what the business figures look like once personal items are removed. If the business is a company, show the running balance owed between owner and company and flag if it looks overdrawn.
5. Give a clean set-up from now on: a separate account for the business, one regular transfer to pay the owner rather than ad hoc personal spending, what to do if a personal card is used for business (keep the receipt, claim it back), and a weekly ten-minute check.
6. List questions for the accountant.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not decide what is tax-deductible or the business share of mixed-use costs; flag them as accountant questions.
- Do not guess a transaction's nature from a vague payee name with high confidence. Put it in "unclear" with the question to ask.
- Do not invent transactions or totals. Show the arithmetic.
- Warn plainly, without alarm, that an overdrawn director's loan or personal costs booked as business expenses can have tax consequences that differ by country.
{{> output/uncertainty}}
</constraints>

<output_format>
## How owner money is recorded for you
Three or four sentences.

## Sorted transactions
Table: date | description | amount | group | category or account | confidence | evidence to keep.

## Mixed-use items
Table: item | amount | question for accountant.

## Totals
Short table by group, plus the owner and business balance if a company.

## Clean set-up from now on
Checklist.

## Questions for your accountant
Bullets.
</output_format>
