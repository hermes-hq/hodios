---
schema: 1
id: set-up-internal-controls
kind: prompt
title: Set up internal controls for a small business
description: Designs simple internal financial controls for a small team - approvals, segregation of duties, payment and bank-detail checks, reviews and fraud red flags - sized to the people available.
category: accounting
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager, executive]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [internal-controls, fraud-prevention, segregation-of-duties, payment-approvals]
pairs_with:
  prompts: [plan-supplier-payment-run, reconcile-bank-account, reconcile-daily-takings]
  personas: [fractional-cfo]
args:
  - name: business
    description: What the business does, headcount, who does what in finance (who raises invoices, enters bills, pays suppliers, runs payroll, reconciles the bank, has card or bank access), tools used, and roughly how many payments a month.
    type: text
    required: true
  - name: concerns
    description: Anything that prompted this - a near-miss, a fake invoice, a new hire in finance, a lender or investor request, growth. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Biggest risks, Control matrix, Payment and bank-detail controls, Monthly review routine, Red flags to watch, First steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design controls the way an experienced finance lead does for a small business: few, practical, and aimed at the losses that actually happen. In small firms the costliest frauds and errors are usually: payments to a supplier whose bank details were changed by a fake email, fake or duplicate invoices paid without checking against an order, payroll with a ghost employee or inflated hours, personal spending on company cards, cash skimming, and one trusted person who controls the whole cycle and never takes leave. Full segregation of duties is rarely possible with two or three people, so the answer is compensating controls: the owner approves every payment batch, reviews the bank statement directly, receives statements from the bank, and someone other than the preparer reconciles or reviews. Controls must be cheap enough that people keep doing them.

{{#concerns}}What prompted this: {{concerns}}{{/concerns}}
</context>

<task>
Business:

<business>
{{business}}
</business>

1. Map the finance cycles (sales and receipts, purchases and payments, payroll, cash and cards, bank access, records) to the people described, and identify where one person controls a whole cycle.
2. Rank the five biggest risks for this business with the reason, based on what was described.
3. Build a control matrix per cycle: control, who performs it, who reviews, how often, and evidence kept. Use compensating controls where duties cannot be split.
4. Set payment and bank-detail controls: dual approval or owner release for payments, verifying any change of supplier bank details by calling a known number (never the one in the email), matching invoices to orders and deliveries, payment limits per person, and bank alerts.
5. Write a monthly review routine for the owner or a second person, under an hour: bank statement read line by line, new payees, payroll changes, card spend, credit notes and write-offs, reconciliation sign-off.
6. List red flags to watch (missing documents, reluctance to take leave, unusual payees, round amounts, changes in bank details, rising refunds or voids).
7. Give the first five steps to take this month, in order.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Size every control to the team described; do not propose departments or software they do not have.
- Do not accuse any person. Frame everything as protecting the business and the staff.
- If a fraud is suspected now, say to preserve records, avoid confronting the person alone, and get advice from an accountant or lawyer and, where appropriate, the bank and police.
- Keep insurance, legal and employment questions out of scope beyond pointing to the right professional.
</constraints>

<output_format>
## Biggest risks
Numbered, with reasons.

## Control matrix
Table: cycle | control | performed by | reviewed by | frequency | evidence.

## Payment and bank-detail controls
Checklist.

## Monthly review routine
Checklist with estimated time.

## Red flags to watch
Bullets.

## First steps
Numbered, five items.
</output_format>
