---
schema: 1
id: write-journal-entries
kind: prompt
title: Write journal entries
description: Drafts balanced double-entry journal entries for described transactions and adjustments - accruals, reclasses, corrections - with accounts, amounts and a clear narrative.
category: accounting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [double-entry, journals, accruals, reclassification, adjustments]
pairs_with:
  prompts: [prepare-month-end-close, set-up-chart-of-accounts, explain-accounting-concept]
  personas: [bookkeeper]
args:
  - name: transactions
    description: What happened, in plain words - each transaction, correction or adjustment with dates, amounts, and any tax on it. Include what was already recorded if you are correcting something.
    type: text
    required: true
  - name: chart_of_accounts
    description: Your account names or codes, or the software you use. Optional; without it, standard account names are used and marked for mapping.
    type: text
  - name: basis
    description: Cash or accrual basis, the country, and whether you are registered for sales tax or VAT. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Journal entries, Why each entry, Checks, Questions for your accountant]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft journal entries the way a careful bookkeeper does before posting them. Every entry has equal debits and credits, a date in the right period, accounts that exist in the user's chart, and a narrative that lets someone understand it a year later without asking. Most errors in small-business books come from a few patterns: posting an accrual without the matching reversal next period, correcting a mistake by posting a new entry for the full amount instead of only the difference or a reversal and re-post, mixing sales tax or VAT into income or expense lines, recording a capital purchase as an expense, and using a suspense account as a permanent home. Debits increase assets and expenses and decrease liabilities, equity and income; credits do the opposite.

{{#basis}}Basis and setting: {{basis}}{{/basis}}
</context>

<task>
Transactions and adjustments:

<transactions>
{{transactions}}
</transactions>

{{#chart_of_accounts}}Chart of accounts or software:

<chart_of_accounts>
{{chart_of_accounts}}
</chart_of_accounts>{{/chart_of_accounts}}

1. Restate each item in one line and decide its type: ordinary transaction, accrual, prepayment, reclass, correction, reversal or year-end adjustment. If an item is too vague to post (no amount, no date, unclear whether it was paid), list it under questions and do not guess.
2. For each item, write the journal: date, account, debit, credit, tax code if any, and a narrative of the form "what - why - reference". Use the user's account names where given; otherwise use standard names marked "map to your account".
3. For corrections, show what was posted, what should have been posted, and the entry that fixes only the difference (or a full reversal and re-post when that is clearer), and say which approach you used.
4. For accruals and prepayments, include the reversing entry for the next period and its date.
5. Split tax out to the tax control account only where the user says they are registered; otherwise include it in the cost and say so.
6. Explain each entry in one or two sentences a non-accountant can follow, including the effect on profit and on the balance sheet.
7. Check that every entry balances, that no entry uses a suspense account without a plan to clear it, and that dates fall in the intended period.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given. Do not invent amounts, dates, tax rates or accounts; mark any assumption plainly.
- Every entry must balance to the cent. Recompute totals before answering.
- Do not decide tax treatment, capitalisation thresholds or deductibility as fact; state the common treatment, the assumption used, and that the accountant should confirm it where it matters.
- These are drafts for review. Do not tell the user they are posted or final.
</constraints>

<output_format>
## Assumptions
Bullets: basis, tax registration, account mapping.

## Journal entries
One table per entry: date | account | debit | credit | tax code | narrative. Show the total row for each.

## Why each entry
Numbered to match, one or two sentences each with the effect on profit and balance sheet.

## Checks
Bullets: balanced, periods, reversals scheduled, suspense cleared.

## Questions for your accountant
Only items that need a judgement or more facts.
</output_format>
