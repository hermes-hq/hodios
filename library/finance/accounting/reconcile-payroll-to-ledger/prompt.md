---
schema: 1
id: reconcile-payroll-to-ledger
kind: prompt
title: Reconcile payroll to the ledger
description: Reconciles monthly payroll reports to the books - gross pay, employee deductions, employer costs, pension and amounts owed to tax authorities - and drafts the payroll journal and fixes.
category: accounting
version: 1.0.0
status: incubating
stage: [verify]
role: [founder, operations-manager]
requires: [none]
inputs: [text, dataset, document]
output: [table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [payroll-journal, payroll-liabilities, wage-control, month-end]
pairs_with:
  prompts: [set-up-first-payroll, prepare-month-end-close, write-journal-entries]
  personas: [bookkeeper]
args:
  - name: payroll_summary
    description: The payroll summary for the period - gross pay, each employee deduction (income tax, social security, pension, other), net pay, and employer costs (social security, pension). Totals are enough; remove names and ID numbers.
    type: text
    required: true
  - name: ledger_balances
    description: What the books show for the same period - wages expense, employer cost accounts, net wages paid from the bank, and the balances on payroll liability accounts (tax owed, pension owed, net wages control).
    type: text
    required: true
  - name: country
    description: The country, and the payroll software or provider you use. Optional but helps name the deductions.
    type: string
output_contract:
  format: markdown
  sections: [Result, Payroll journal, Reconciliation by account, Differences and fixes, Liabilities to pay, Monthly routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You reconcile payroll to the general ledger the way an experienced bookkeeper does. The payroll report is the source; the books must show the full cost of employment, not just net pay. A correct payroll journal debits gross wages and employer costs (employer social security, employer pension) to expense, and credits net wages payable, each deduction owed to a tax authority or pension provider, and other deductions owed elsewhere. When net pay, tax and pension are later paid, each liability account clears to zero. The most common errors are posting only the net pay from the bank as wages (understating costs and leaving tax unrecorded), double-counting when both a payroll journal and bank payments are coded to wages, missing employer costs, and liability accounts that grow every month because payments were coded to expenses. A liability account that does not return to the expected balance after each payment is the clearest warning sign.

{{#country}}Country and payroll system: {{country}}{{/country}}
</context>

<task>
Payroll summary:

<payroll_summary>
{{payroll_summary}}
</payroll_summary>

Books:

<ledger_balances>
{{ledger_balances}}
</ledger_balances>

1. Check the payroll summary adds up: gross pay minus employee deductions equals net pay; total employment cost equals gross plus employer costs. If it does not, stop and point to the line that fails.
2. Draft the payroll journal for the period from the summary, with each deduction going to its own liability account, and show it balances.
3. Compare each expense and liability account in the books with what the journal says it should be, line by line, and show the difference.
4. Explain each difference using the common patterns (net-only posting, double counting, missing employer cost, payment coded to expense, timing of a payment) and say which evidence confirms it.
5. Write correcting entries for review.
6. List each liability owed at period end with the amount and who it is owed to, and remind the user to check due dates with the tax authority or provider rather than relying on you.
7. Give a monthly routine: post the journal from the report, code payments to liabilities, check each liability returns to the expected balance.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not calculate tax, social security or pension deductions, and do not state rates or due dates as fact. Use the payroll report's figures.
- Do not ask for or repeat employee names or identification numbers; work with totals.
- Use only the figures given. Never force a balance with an unexplained adjustment.
- Payroll compliance questions (whether someone is an employee, correct tax codes, late filings) go to a payroll professional or the tax authority.
</constraints>

<output_format>
## Result
Two lines: reconciled or not, and the largest difference.

## Payroll journal
Table: account | debit | credit | source line, with totals.

## Reconciliation by account
Table: account | per payroll | per books | difference.

## Differences and fixes
Table: difference | likely cause | evidence | correcting entry.

## Liabilities to pay
Table: liability | amount | owed to | check due date with.

## Monthly routine
Checklist.
</output_format>
