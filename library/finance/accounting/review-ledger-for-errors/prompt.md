---
schema: 1
id: review-ledger-for-errors
kind: prompt
title: Review a ledger for errors
description: Scans a general ledger or trial balance export for misposts, duplicates, wrong signs, suspense balances, wrong-period entries and odd balances, and lists each fix to make.
category: accounting
version: 1.0.0
status: incubating
stage: [review]
role: [founder, operations-manager, financial-analyst]
requires: [none]
inputs: [dataset, text]
output: [table, checklist, report]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [general-ledger, error-detection, trial-balance, data-quality]
pairs_with:
  prompts: [prepare-month-end-close, prepare-year-end-accounts-pack, review-balance-sheet]
  personas: [bookkeeper]
args:
  - name: ledger_export
    description: The general ledger detail or trial balance export - account, date, reference, description, debit, credit - for the period. Remove bank account numbers and personal identifiers.
    type: text
    required: true
  - name: business
    description: What the business does, its financial year, accounting basis, tax registration, and anything you already suspect.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Findings, Balances that look wrong, Suggested corrections, What to check before year end]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review ledgers the way an experienced accountant does before the year-end file: fast scanning for the patterns that usually hide errors, then a short list of specific items to check. Patterns worth testing: the same amount, date and payee twice (duplicates from bank feed plus manual entry); balances on the wrong side (a credit balance on an expense or a debit on a liability usually means a reversed entry or misposting); suspense, uncategorised or "ask my accountant" accounts with a balance; entries dated outside the period or on weekends where unusual; round-sum entries without a reference; expenses that look like capital items; personal-looking spending (supermarkets, streaming, school fees) in business costs; sales tax or VAT posted to income or expense lines; transfers between own accounts posted as income or expense; and accounts that move very differently from last period. Some of these will be correct; the job is to flag them with the reason, not to declare them wrong.

Business: {{business}}
</context>

<task>
Ledger export:

<ledger_export>
{{ledger_export}}
</ledger_export>

1. Check the export: debits equal credits, the period is complete, and the accounts make sense. If totals do not balance, say so first.
2. Run each pattern test above against the data and list every hit with its account, date, reference, amount and the reason it was flagged.
3. Rate each finding: likely error, needs checking, or probably fine with the reason.
4. Review the balance of each account for its expected side and size relative to the business described; list those that look wrong.
5. For likely errors, draft correcting entries for review. For "needs checking", say which document settles it.
6. Give a short list of what to clear before year end, highest value first.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Only flag what the data shows. Do not invent transactions or assume fraud; describe patterns neutrally.
- Do not decide tax treatment or deductibility as fact; mark those for the accountant.
- If the export is too large to review line by line in one pass, say which accounts were covered and which were not.
- Recompute any totals you quote.
</constraints>

<output_format>
## Summary
Three to five lines: whether it balances, number of findings by rating, the biggest issue.

## Findings
Table: rating | account | date | reference | amount | pattern | reason.

## Balances that look wrong
Table: account | balance | expected | why.

## Suggested corrections
Table: date | account | debit | credit | narrative.

## What to check before year end
Numbered list.
</output_format>
