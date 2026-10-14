---
schema: 1
id: build-deferred-revenue-schedule
kind: prompt
title: Build a deferred revenue schedule
description: Builds a deferred revenue schedule for annual subscriptions, retainers or deposits, recognising revenue as it is earned, with monthly entries and a tie-out to the balance sheet.
category: accounting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, financial-analyst]
requires: [none]
inputs: [text, dataset]
output: [table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [deferred-revenue, revenue-recognition, subscriptions, deposits]
pairs_with:
  prompts: [prepare-month-end-close, write-journal-entries, review-balance-sheet]
  personas: [fractional-cfo]
args:
  - name: billings
    description: Each invoice or payment received in advance - customer or plan, amount excluding tax, invoice date, service period or delivery date, and any refunds, cancellations or upgrades.
    type: text
    required: true
  - name: business
    description: What you sell and how you deliver it (monthly access, hours of work, an event on a date, goods shipped later), and your financial year.
    type: text
    required: true
  - name: reporting_framework
    description: The accounting standard or framework your accountant uses, if known, for example IFRS 15, ASC 606, FRS 102 or a local standard. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Recognition rule used, Schedule by contract, Monthly summary, Journal entries, Balance sheet tie-out, Questions for your accountant]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You keep deferred revenue schedules the way a careful finance lead in a small subscription or services business does. Cash received in advance is not yet revenue: it is a liability (deferred revenue, or contract liability) until the service is delivered. A 12-month subscription is usually recognised evenly over the service period; a retainer for a block of hours is recognised as the hours are used; a deposit for an event is recognised when the event happens; a non-refundable deposit is still deferred until delivery under most standards. The schedule's closing balance must equal the deferred revenue balance on the balance sheet every month. Common mistakes are recognising the whole annual invoice in the month billed, including sales tax in revenue, forgetting to stop recognition after a cancellation with refund, and mixing billings with revenue in reports.

Business: {{business}}
{{#reporting_framework}}Framework: {{reporting_framework}}{{/reporting_framework}}
</context>

<task>
Billings and payments in advance:

<billings>
{{billings}}
</billings>

1. State the recognition rule used for each type of billing (straight-line over the service period, on usage, at a point in time) and why it fits what is delivered. Where the rule depends on contract terms you do not have, say so and use the simplest reasonable rule, labelled as an assumption.
2. For each contract, compute monthly recognition, handling part months consistently (daily proration or start-of-month rule, stated once), and carry rounding to the last month.
3. Handle changes: refunds reduce deferred revenue not yet recognised; cancellations without refund need a decision on the remaining balance (list it as a question); upgrades start a new schedule for the extra amount from the upgrade date.
4. Build a monthly summary: opening deferred revenue, new billings, revenue recognised, refunds, closing deferred revenue.
5. Write the journals: on invoice (debit receivables or bank, credit deferred revenue, with tax to the tax account where registered), and each month (debit deferred revenue, credit revenue).
6. Show how to tie the closing balance to the balance sheet monthly and what a mismatch usually means.
7. Recompute every total and confirm that recognised revenue plus closing deferred revenue equals billings net of refunds.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the billings given. Do not invent contracts, dates or customers.
- Do not claim compliance with a named standard. Describe the common treatment, and refer judgements (multi-element contracts, set-up fees, variable pricing, non-refundable balances) to the accountant.
- Keep sales tax and VAT out of revenue.
- Revenue recognition is separate from cash and from tax timing; do not advise on when the revenue is taxable.
</constraints>

<output_format>
## Recognition rule used
Table: billing type | rule | reason | assumption or given.

## Schedule by contract
Table with months as columns, one row per contract, totals row.

## Monthly summary
Table: month | opening | billed | recognised | refunds | closing.

## Journal entries
Table: date | account | debit | credit | narrative.

## Balance sheet tie-out
Short routine.

## Questions for your accountant
Bullets.
</output_format>
