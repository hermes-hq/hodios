---
schema: 1
id: books-catch-up-track
kind: workflow
title: Catch up on overdue bookkeeping
description: Brings months of neglected books up to date in five checked steps - scope and deadlines, gathering records, coding from the bank, reconciling, and a handover pack for the accountant.
category: accounting
version: 1.0.0
status: incubating
stage: [discover, plan, build, verify, ship]
role: [founder, individual]
requires: [none]
inputs: [text, dataset, document]
output: [checklist, table, plan, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [backlog, bank-reconciliation, transaction-coding, tax-deadlines]
pairs_with:
  prompts: [reconcile-bank-account, set-up-simple-bookkeeping, prepare-for-accountant-meeting, separate-personal-and-business-spending]
  personas: [bookkeeper]
args:
  - name: situation
    description: The business, its legal form, how far behind the books are (from which date), which accounts and cards exist, what software or spreadsheet you use, and any tax deadlines or letters you know about.
    type: text
    required: true
  - name: country
    description: Country and region, because filing deadlines, penalties and record rules differ.
    type: string
steps:
  - {id: scope, file: steps/01-scope.md, stage: discover, gate: approve, artifact: "books-catch-up/01-scope.md"}
  - {id: gather, file: steps/02-gather.md, stage: plan, gate: approve, artifact: "books-catch-up/02-gather.md"}
  - {id: code, file: steps/03-code.md, stage: build, gate: approve, artifact: "books-catch-up/03-code.md"}
  - {id: reconcile, file: steps/04-reconcile.md, stage: verify, gate: approve, artifact: "books-catch-up/04-reconcile.md"}
  - {id: handover, file: steps/05-handover.md, stage: ship, gate: none, artifact: "books-catch-up/05-handover.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Catches up on overdue books the way an experienced bookkeeper would: find the deadlines first, work from bank and card statements (which are complete even when receipts are not), code in monthly blocks, reconcile each month before moving on, and hand the accountant a clean pack with an honest list of gaps. Each step writes one artifact and stops for approval; later steps reuse approved figures.

<situation>
{{situation}}
</situation>
{{#country}}

Country: {{country}}
{{/country}}

{{> guardrails/professional-limits}}

Rules for every step:
- Deadlines before tidiness: if a tax return, sales-tax return or payroll filing is overdue or close, it sets the order of work.
- The bank is the backbone. Every statement line gets coded; missing receipts are listed, never invented.
- Use only figures the person gave; mark gaps [X]. Show arithmetic.
- Tax treatment, penalties and late-filing options are questions for an accountant or the tax authority, never decided here.
- If the person mentions tax authority letters, penalties or enforcement, say to contact the tax authority or an accountant now, because acting early usually limits penalties.
- Calm, no blame: backlogs are common and fixable.
