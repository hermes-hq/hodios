---
schema: 1
id: switch-accounting-software
kind: prompt
title: Plan a switch of accounting software
description: Plans moving a small business's books to new accounting software - cut-over date, opening balances, open invoices and bills, history to bring, integrations and parallel checks.
category: accounting
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, operations-manager]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [data-migration, opening-balances, cut-over, bookkeeping-tools]
pairs_with:
  prompts: [set-up-chart-of-accounts, reconcile-bank-account, prepare-month-end-close, prepare-for-accountant-meeting]
  personas: [bookkeeper]
args:
  - name: current_setup
    description: What you use now (software, spreadsheets or a mix), how long you have used it, roughly how many transactions a month, and what is connected to it (bank feeds, payroll, shop, payment apps, receipt capture).
    type: text
    required: true
  - name: target
    description: The software you are moving to, or the shortlist, and why you are switching.
    type: text
    required: true
  - name: context
    description: Country, financial year end, whether you are registered for VAT, GST or sales tax, whether you run payroll, and whether an accountant or bookkeeper is involved. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Recommended cut-over, What moves and what stays, Migration steps, Checks before switching off, Questions for your accountant, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small businesses move their books to new accounting software without breaking them. The decision that matters most is the cut-over date. The cleanest is the first day of a financial year, then the first day of a tax return period, then a month start; mid-period switches split one return across two systems. Most migrations do not need every historical transaction: the usual approach is opening balances (a trial balance at the cut-over date) plus open items (unpaid customer invoices and supplier bills individually, so they can be matched to payments later), with the old system kept read-only for history. Errors come from opening balances that do not match the old system's closing figures, open items entered twice (once in the balances and once as invoices), bank feeds importing transactions from before the cut-over, and tax settings left at defaults. Automated migration tools exist for some pairs of products; their scope and cost vary and must be checked with the vendor.

{{#context}}Context: {{context}}{{/context}}
</context>

<task>
Current set-up:

<current_setup>
{{current_setup}}
</current_setup>

Target:

<target>
{{target}}
</target>

1. Recommend a cut-over date with the reason, given the year end and tax periods. Say what must be finished in the old system first (reconciliations to the cut-over date, last tax return in the old system).
2. Say what moves and what stays: chart of accounts (mapped, and tidied if needed), customers and suppliers, opening trial balance, open receivables and payables in detail, fixed assets, payroll year-to-date figures if payroll moves, inventory if tracked, and how much history (none, the current year, or more) with the trade-offs.
3. Give the migration steps in order: export reports from the old system (trial balance, aged receivables and payables, fixed asset register, tax reports), set up the new company and tax settings, import contacts and chart, enter opening balances with an opening-balance or suspense account and clear it to zero, enter open items, connect bank feeds with the start date set to the cut-over date, reconnect integrations one at a time.
4. List checks before switching off the old system: opening trial balance matches the old closing one line by line, aged receivables and payables totals match, the first bank reconciliation in the new system works, one month run in parallel if volume allows, and an archive of the old data saved in a readable format for the record-keeping period required locally.
5. Questions for the accountant: cut-over timing around tax returns, payroll mid-year, tax settings, and whether they need access.
6. Risks and how to avoid each: double counting, feed duplicates, lost attachments and audit trail, user permissions, and subscription overlap cost.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent product features, migration tools, prices or limits. Describe them as things to confirm with the vendor.
- Do not recommend a specific product unless the person asks to compare a shortlist they supplied; then compare only on the needs they stated and tell them to verify current features.
- Record-keeping periods and tax rules differ by country; mark them "check locally".
- If payroll is involved, say that a mid-year payroll switch has its own reporting steps and should be planned with whoever runs payroll.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommended cut-over
Date and two or three lines of reasoning.

## What moves and what stays
Table: item | move how | note.

## Migration steps
Numbered list.

## Checks before switching off
Checklist.

## Questions for your accountant
Bullets.

## Risks
Table: risk | how to avoid it.
</output_format>
