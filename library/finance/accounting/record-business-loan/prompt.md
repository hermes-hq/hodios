---
schema: 1
id: record-business-loan
kind: prompt
title: Record a business loan in the books
description: Sets up the bookkeeping for a business loan - drawdown, fees, monthly interest and principal split, current versus long-term portion - and reconciles it to the lender statement.
category: accounting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager]
requires: [none]
inputs: [text, document]
output: [table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [loan-accounting, interest, liabilities, loan-reconciliation]
pairs_with:
  prompts: [build-amortization-schedule, review-balance-sheet, write-journal-entries]
  personas: [bookkeeper]
args:
  - name: loan
    description: The loan terms - lender, amount, drawdown date, interest rate (fixed or variable), term, repayment type and amount, fees, and any payment holiday. Remove account numbers.
    type: text
    required: true
  - name: what_was_recorded
    description: How the loan and repayments have been recorded so far, if at all (for example "whole repayment posted to loan account"). Optional.
    type: text
  - name: lender_statement
    description: The balance on the latest lender statement and its date. Optional, but needed for the reconciliation.
    type: string
output_contract:
  format: markdown
  sections: [Accounts to set up, Opening entries, Monthly entries, Repayment split, Current and long-term portion, Reconciliation and corrections, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up loan bookkeeping the way an experienced bookkeeper does. A loan is a liability, not income, so the drawdown never goes to sales. Each repayment is split: the interest part is an expense, the principal part reduces the liability. The most common error is posting the whole repayment to the loan account (understating expenses and leaving a loan balance that never matches the lender) or the whole repayment to expenses (overstating expenses and leaving a loan that never goes down). Arrangement fees are usually either expensed or spread over the loan term depending on the framework and size; the accountant decides. At each year end, the part repayable within twelve months is shown as a current liability. The loan account in the books should match the lender statement on the same date, apart from timing.
</context>

<task>
Loan:

<loan>
{{loan}}
</loan>

{{#what_was_recorded}}What has been recorded so far:

<what_was_recorded>
{{what_was_recorded}}
</what_was_recorded>{{/what_was_recorded}}

{{#lender_statement}}Lender statement balance: {{lender_statement}}{{/lender_statement}}

1. List the accounts needed: loan liability, loan interest expense, bank charges or fees, and a separate current portion account if the user's software does not split it in reports.
2. Write the drawdown entry, including fees deducted from the amount received (gross loan to liability, fee to its account, net to bank).
3. Compute the repayment split for the first months and at least the rest of the current financial year: for an amortising loan, interest equals balance times the periodic rate, principal is the payment minus interest. For variable rates, show the method and use the lender's figures where given. Show the formula once.
4. Write the monthly journal for a repayment and, if repayments come by direct debit, a suggested bank rule.
5. Compute the current and long-term portions at the next year end.
6. If a lender balance is given, reconcile the book balance to it and explain the difference. If past repayments were posted wrongly, write the single correcting entry.
7. List what to check each month and at year end.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the loan terms given. Where the lender's own schedule exists, it overrides your calculation; say to use it.
- Do not invent rates, fees or balances. If the rate type or repayment method is unclear, ask.
- The tax deductibility of interest and fees, and personal guarantees, are out of scope; refer to the accountant.
- Do not advise whether to take, repay or refinance the loan.
</constraints>

<output_format>
## Accounts to set up
Bullets.

## Opening entries
Journal table: date | account | debit | credit | narrative.

## Monthly entries
Journal table for a typical repayment.

## Repayment split
Table: month | opening balance | payment | interest | principal | closing balance.

## Current and long-term portion
Two figures with the date.

## Reconciliation and corrections
Book versus lender, difference explained, any correcting entry.

## Questions
Bullets.
</output_format>
