---
schema: 1
id: calculate-running-totals-and-ytd
kind: prompt
title: Calculate running totals and year to date
description: Writes running total, month-to-date, year-to-date, fiscal YTD, rolling 12-month and same-period-last-year formulas that stay right when rows are sorted, filtered or months are missing.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, financial-analyst, operations-manager]
stack: [excel, google-sheets]
requires: [none]
inputs: [text, dataset]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [running-total, year-to-date, rolling-12-months, fiscal-year, sumifs]
pairs_with:
  prompts: [summarise-transactions-by-month, calculate-dates-and-workdays, compare-period-performance]
args:
  - name: data_layout
    description: The sheet and columns (date, amount, and any grouping such as product or region), whether there is one row per transaction or one row per month, and a few sample rows.
    type: text
    required: true
  - name: measures
    description: Which cumulative measures you need, for example running total by product, YTD, rolling 12 months, same period last year.
    type: text
    required: true
  - name: fiscal_year_start
    description: Optional. The month your financial year starts, if not January.
    type: string
  - name: app
    description: The application and version, for example Excel 365, Excel 2019, Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Approach, Formulas, Test rows, Pitfalls avoided]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write cumulative formulas for reports. The classic expanding-range running total (a SUM from a locked first cell down to the current row) breaks the moment someone sorts, filters or inserts a row, and "the previous 12 rows" is not "the last 12 months" when a month is missing or there are several rows per month. Experts define every cumulative measure by dates and keys instead of row positions: a running total is SUMIFS of amounts with a date up to the current row's date (and the same group); YTD is from the first day of the (fiscal) year to the current date; rolling 12 months is the window after EDATE(date,-12) up to the date; same period last year shifts both ends with EDATE(…,-12), which also handles 29 February. Fiscal years starting in, say, April need the year start computed from the date, not hard-coded. Excel 365 and Google Sheets also offer SCAN for a running total in one spilling formula, which is fine for a fixed, sorted list but still depends on order.

App: {{app}}
{{#fiscal_year_start}}Fiscal year starts: {{fiscal_year_start}}{{/fiscal_year_start}}

<data_layout>
{{data_layout}}
</data_layout>

<measures>
{{measures}}
</measures>
</context>

<task>
1. Restate each measure as a date window: start date, end date, inclusive or exclusive, and which group it is within. If the data has several rows on the same date, say whether the running total on those rows should include all of that day or only rows above, and choose the date-based version unless the user needs row order.
2. Write each formula with SUMIFS on dates and group keys, with references locked for filling down. For the fiscal year start, derive it from the date (for example DATE(YEAR(d)-(MONTH(d)<start_month), start_month, 1)) and explain it.
3. For month-level summaries (one row per month), write the same measures against the month table, and handle a missing month by using dates rather than OFFSET or row counts.
4. Add a "complete period" flag where a rolling or YTD figure covers a partial month or fewer than 12 months of history, so readers do not compare a partial number with a full one.
5. Build a small test set (6 to 10 rows: two years, two groups, a missing month, two rows on one date, 29 February) and show the expected value of each measure on at least three rows, worked by hand.
6. If the user's sheet uses an expanding-range SUM or OFFSET-based windows, explain in one line why the new version is safer.
</task>

<constraints>
- Use only functions available in {{app}}; SCAN and LET need Microsoft 365 or Google Sheets. Use English-locale commas and note that some locales use semicolons.
- Do not use volatile functions (OFFSET, INDIRECT, TODAY inside every row) when a non-volatile version exists; if "as of today" is needed, put TODAY() in one cell and reference it.
- Never compare a partial current period with a full prior period without labelling it.
- Do not assume a fiscal year start; use January unless the user gives one, and say so.
</constraints>

<output_format>
## Approach
One line per measure: its date window and grouping.

## Formulas
For each measure: the cell, the formula in a code block, and one line on how it works.

## Test rows
Table: date | group | amount | each measure expected.

## Pitfalls avoided
Bullets: sorting, filtering, missing months, duplicate dates, leap years, partial periods.
</output_format>
