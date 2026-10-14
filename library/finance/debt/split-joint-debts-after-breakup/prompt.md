---
schema: 1
id: split-joint-debts-after-breakup
kind: prompt
title: Untangle joint debts after a breakup
description: Untangles joint loans, cards, overdrafts and guarantees after a separation - who the lender can chase, how to stop new borrowing, options to refinance or close, and how to protect your credit.
category: debt
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, checklist, message]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [separation, joint-liability, financial-association, credit-file]
pairs_with:
  prompts: [plan-separation-finances, improve-credit-score, negotiate-with-creditor, dispute-credit-report-error]
  personas: [personal-finance-coach]
args:
  - name: debts
    description: Every debt that is joint or linked to your ex - type, lender, balance, whose name it is in (joint, yours, theirs, you as guarantor or authorised user), monthly payment, and who has been paying.
    type: text
    required: true
  - name: situation
    description: Married or not, whether you are on speaking terms, whether there is a separation agreement or court process, your own income and costs. Mention any abuse or control over money. Optional.
    type: text
  - name: jurisdiction
    description: Country and state or region.
    type: string
output_contract:
  format: markdown
  sections: [The key fact, Your debt map, Do this week, Options for each debt, Messages to lenders, Protect your credit, Get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people separate their debts from an ex-partner's. The key fact most people miss is that a joint debt usually makes each borrower liable for the whole amount ("jointly and severally"), whatever a separation agreement or court order says about who should pay. The agreement binds the ex-partners to each other; the lender can still chase either one. So the practical goals are: stop new borrowing on joint accounts, keep every joint payment up to date while things are sorted (missed payments hit both credit files), move each debt into one name by refinancing, transferring or closing it, and remove financial links on credit files where that system exists. Guarantors and co-signers stay liable until released by the lender. Authorised users on a card are usually not liable but can be removed. Where there has been economic abuse or coercion, specialist help exists and some lenders have processes for it.

{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Debts:

<debts>
{{debts}}
</debts>
{{#situation}}

Situation:

<situation>
{{situation}}
</situation>
{{/situation}}

1. State the key fact about joint liability in two sentences.
2. Build a debt map: each debt, whose name, who the lender can chase, monthly payment, who is paying now, and risk (missed payments, growing balance, ex still spending).
3. Do this week: freeze or close joint credit lines to new spending where possible, list all joint and linked accounts from a credit report, agree in writing who pays what in the meantime, and keep payments current.
4. Options for each debt: one person refinances it into their sole name, sell the asset (car) and clear the loan, pay off and close, ask the lender to release a guarantor, or convert a joint account. Note what the lender must agree to, and what the separation agreement or court should cover (as a question for a family lawyer).
5. Draft short messages to lenders with [BRACKETS]: freeze further borrowing on a joint account, request statements, ask about removing a name or releasing a guarantee.
6. Protect your credit: check reports, ask to remove a financial association or link where that system exists once no joint products remain, and set reminders.
7. Get help: family lawyer or mediator, free debt advice, and specialist economic-abuse support if the situation mentions control or abuse.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never say a separation agreement removes liability to the lender.
- Do not invent lender policies or laws; mark jurisdiction-specific items "verify".
- If the person mentions abuse, threats or fear, put their safety first, point to emergency services if in danger and specialist support, and suggest contacting lenders in ways that do not alert the ex.
- Do not suggest stopping payments on joint debts to pressure the ex.
{{> output/uncertainty}}
</constraints>

<output_format>
## The key fact
Two sentences.

## Your debt map
Table: debt | names | lender can chase | monthly | paid by | risk.

## Do this week
Checklist.

## Options for each debt
Bullets per debt.

## Messages to lenders
Short drafts.

## Protect your credit
Bullets.

## Get help
Bullets.
</output_format>
