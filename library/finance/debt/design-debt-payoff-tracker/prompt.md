---
schema: 1
id: design-debt-payoff-tracker
kind: prompt
title: Design a debt payoff tracker spreadsheet
description: Designs a debt payoff spreadsheet in Excel or Google Sheets with a debt list, a monthly payment log, interest, projected payoff dates and a progress view, with working formulas.
category: debt
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
stack: [excel, google-sheets]
requires: [none]
inputs: [text, preferences]
output: [table, code, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [debt-spreadsheet, payoff-dates, nper, progress-tracking, snowball-avalanche]
pairs_with:
  prompts: [plan-debt-payoff, design-budget-spreadsheet, explain-how-loan-interest-works]
args:
  - name: tool
    description: Which spreadsheet you use.
    type: enum
    enum: [excel, google-sheets]
    default: google-sheets
  - name: debts
    description: Each debt you want to track - a short name (no account numbers), balance, interest rate, minimum payment, and any promotional rate end date. Example figures are fine.
    type: text
    required: true
  - name: needs
    description: How you plan to pay them off (snowball, avalanche, a fixed total each month), how often you will update it, and what keeps you motivated, for example a chart or a debt-free date.
    type: text
output_contract:
  format: markdown
  sections: [Workbook layout, Tab by tab, Formulas, Starter rows, Monthly routine, Mistakes to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A debt tracker keeps people going because it shows progress the bank statements hide. Home-made trackers break in predictable ways: balances typed over each month so history is lost, interest estimated once and never updated, payoff dates that ignore the interest, minimum payments that silently cover less than the interest, and a "snowball" order that is not updated when a debt is cleared and its payment should roll to the next. A robust design keeps one Debts tab (one row per debt, never deleted, with a status), one long Payments log (date, debt, amount, type), and a Summary that calculates current balance from the starting balance, payments and statement interest, then projects the payoff month with NPER at the current payment. Real interest should come from statements, entered as its own row, because lenders compute it daily and apply fees.

Tool: {{tool}}
</context>

<task>
Debts:

<debts>
{{debts}}
</debts>
{{#needs}}

How they will use it:

<needs>
{{needs}}
</needs>
{{/needs}}

1. Workbook layout: four tabs at most (Debts, Payments, Summary, optional Plan for the snowball or avalanche order) and what each holds.
2. Tab by tab: columns with header names, data types and validation (debt name as a drop-down from the Debts tab, entry type as a drop-down: payment, interest, fee, new charge, adjustment; real dates).
3. Formulas for {{tool}}, written for the column letters you defined: current balance per debt (start balance plus interest, fees and new charges minus payments, with SUMIFS), total paid and total interest paid to date, monthly interest estimate, projected months to payoff and payoff date with NPER and EDATE, a warning when the payment does not cover the monthly interest, percentage paid off, and the next debt in the chosen order. Prefer whole-column or table references. One line explaining each formula.
4. A simple progress view: total debt over time from the Payments log (a monthly summary table that a line chart can sit on), and a debt-free date.
5. Starter rows from their debts, clearly marked as examples to replace.
6. Monthly routine: enter statement interest and payments, check the balance against the statement and add an adjustment row for any difference, roll the freed-up payment to the next debt.
7. Mistakes to avoid.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Formulas must be valid in {{tool}} and match the column layout you gave; do not mix Excel-only and Sheets-only functions.
- Say clearly that projected payoff dates are estimates and that the lender's statement balance is the authority.
- Do not link to templates or add-ons; describe how to build it.
- Never include account numbers or personal identifiers in examples.
- Keep it to what they will maintain; offer extras separately.
{{> output/uncertainty}}
</constraints>

<output_format>
## Workbook layout
Table: tab | purpose.

## Tab by tab
For each tab, a table: column | header | type or validation.

## Formulas
Code blocks with a one-line note each.

## Starter rows
Small tables.

## Monthly routine
Numbered steps.

## Mistakes to avoid
Bullets.
</output_format>
