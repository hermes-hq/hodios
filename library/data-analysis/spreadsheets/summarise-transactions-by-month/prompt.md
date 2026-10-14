---
schema: 1
id: summarise-transactions-by-month
kind: prompt
title: Summarise transactions by month
description: Builds a live category-by-month summary from a transaction list with SUMIFS or dynamic arrays that keeps working as rows are added, with a check that the summary adds back to the raw total.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, financial-analyst, operations-manager, individual]
stack: [excel, google-sheets]
requires: [none]
inputs: [text, dataset]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
depth: specific
tags: [monthly-summary, sumifs, dynamic-arrays, expense-tracking, category-totals]
pairs_with:
  prompts: [build-pivot-analysis, clean-messy-spreadsheet, build-sheets-dashboard]
args:
  - name: transactions_layout
    description: The sheet and columns of the transaction list (date, description, category, amount, account), whether amounts are signed or in separate debit and credit columns, a few sample rows, and how new rows arrive (typed, pasted, imported).
    type: text
    required: true
  - name: summary_wanted
    description: What the summary should show - categories down and months across, which months (a year, a rolling 12), totals, and whether income and spending are separate.
    type: text
    required: true
  - name: app
    description: The application and version, for example Excel 365, Excel 2016, Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Setup, Summary formulas, Reconciliation check, Keeping it working, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build monthly summaries from transaction lists for households, small businesses and finance teams. The summary has to survive months of new rows without anyone fixing ranges. Experts get there with a few habits: the transaction list is an Excel Table (Ctrl+T) or an open-ended range in Google Sheets so new rows are included; month columns are headed with real dates (the first of each month, formatted to show "Jan 2026"), not text, so formulas can compute the month's start and end; SUMIFS uses ">=" the first of the month and "<" the first of the next month (EDATE) so times of day and month lengths do not matter; and a reconciliation cell proves the summary total equals the raw total, which catches uncategorised rows, typos in categories and dates stored as text. Excel 365 also offers PIVOTBY and GROUPBY in current builds, and Google Sheets offers QUERY with pivot, but SUMIFS grids are the most portable and the easiest for others to audit.

App: {{app}}

<transactions_layout>
{{transactions_layout}}
</transactions_layout>

<summary_wanted>
{{summary_wanted}}
</summary_wanted>
</context>

<task>
1. Check the input layout. If the date, category or amount column is missing or unclear, or it is not clear whether spending is negative, ask and stop.
2. Give the setup: convert the list to a Table (Excel) or use open-ended ranges (Sheets), and a short checklist for dates that are text and amounts that are text.
3. Build the summary grid: a category list (typed, or UNIQUE of the category column, sorted), month headers as real first-of-month dates (generated with EDATE or SEQUENCE from a start cell), and one SUMIFS formula that fills the grid. In Excel 365 or Google Sheets, offer a single spilling version as an option.
4. Add totals by row and column, and a separate line for uncategorised transactions (blank category) so they are visible rather than lost.
5. Add a reconciliation check: the grid total against SUMIFS of the raw amounts over the same date range, showing the difference and a flag when it is not zero.
6. If the user wants income and spending separated, handle the sign convention explicitly (for example spending as positive numbers in the summary) and say how refunds are treated.
7. Explain what keeps it working as rows are added and when a new category or a new month needs any action.
</task>

<constraints>
- Use date-range criteria, not TEXT(date,"mmm") matching or a month number alone, which mixes years and breaks across locales.
- Use only functions available in {{app}}; mark which options need Microsoft 365. Use English-locale commas and note that some locales use semicolons.
- Do not invent categories; use those in the data or given by the user.
- Do not round inside the formulas; format the display instead.
- If a pivot table would serve the user better (for example frequent ad hoc slicing), say so in one line, and still build the formula version.
</constraints>

<output_format>
## Setup
Numbered steps.

## Summary formulas
The grid layout (which cells hold categories and months) and each formula in a code block.

## Reconciliation check
The check formulas and what a non-zero difference usually means.

## Keeping it working
Bullets: new rows, new months, new categories, sorting, filters.

## Questions
Only if something was assumed.
</output_format>
