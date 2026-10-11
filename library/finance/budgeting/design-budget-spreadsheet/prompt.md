---
schema: 1
id: design-budget-spreadsheet
kind: prompt
title: Design a personal budget spreadsheet
description: Designs a household budget spreadsheet in Excel or Google Sheets - transactions tab, category list, plan-versus-actual summary and exact formulas - sized to the tracking you will really do.
category: budgeting
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
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
tags: [budget-spreadsheet, household-tracker, plan-vs-actual, sumifs]
pairs_with:
  prompts: [build-monthly-budget, categorize-expenses, review-budget-vs-actual]
  personas: [personal-finance-coach]
args:
  - name: tool
    description: Which spreadsheet you use.
    type: enum
    enum: [excel, google-sheets]
    default: google-sheets
  - name: needs
    description: Who it is for (single, couple, family), your budget categories or method, how often you will update it, and whether you will paste bank exports or type entries.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Workbook layout, Tab by tab, Formulas, Starter rows, How to use it each month, Mistakes to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Home-made budget spreadsheets usually fail in predictable ways: a new tab per month copied by hand until formulas break, categories typed freely so "Groceries" and "groceries " are counted apart, totals that silently miss rows added below the range, and so much detail that updating takes an hour. A robust design keeps one long transactions table (date, description, amount, category, account, month), a categories tab used as a drop-down list, and a summary that pulls plan versus actual per category per month with SUMIFS. Spending stored as negative or positive numbers must be consistent. Bank exports differ in date and sign formats, so a short import routine matters more than clever charts.

Tool: {{tool}}

<needs>
{{needs}}
</needs>
</context>

<task>
1. Workbook layout: the tabs and what each holds, kept to four or five (for example Settings or Categories, Transactions, Plan, Summary, optional Sinking funds).
2. Tab by tab: the columns for each tab with header names, data types and validation (drop-down from the category list, dates as real dates). Use a helper "Month" column so the summary works for any month.
3. Formulas: the exact formulas for {{tool}}, written for the column letters you defined: month from date, actual per category per month (SUMIFS), plan lookup, difference, percentage used, totals, and a running "left to spend". Prefer whole-column or table references so new rows are included. Explain each in one line.
4. Starter rows: a few example transactions and categories based on their needs, clearly marked as examples to delete.
5. How to use it each month: the import or entry routine in steps (paste export, fix sign and dates, assign categories), and the review.
6. Mistakes to avoid: sign conventions, transfers between own accounts counted as spending, refunds, split purchases.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Formulas must be valid for {{tool}} and consistent with the column layout you gave; do not mix Excel-only and Sheets-only functions.
- Do not include links to templates or add-ons; describe how to build it.
- Keep the design to what they said they will maintain; offer optional extras separately.
- No personal data in examples beyond generic placeholder descriptions.
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

## How to use it each month
Numbered steps.

## Mistakes to avoid
Bullets.
</output_format>
