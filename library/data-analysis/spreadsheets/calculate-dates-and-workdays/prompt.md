---
schema: 1
id: calculate-dates-and-workdays
kind: prompt
title: Write date and workday formulas
description: Writes date formulas for working days with holidays, ages, due dates, fiscal periods and week numbers in Excel or Google Sheets, with examples for each. Use when date arithmetic comes out wrong.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, operations-manager, project-manager, individual]
stack: [excel, google-sheets]
inputs: [text]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [date-formulas, workdays, fiscal-year, week-numbers, holidays]
pairs_with:
  prompts: [write-spreadsheet-formula, build-gantt-chart-in-sheets, build-timesheet-calculator]
args:
  - name: date_problem
    description: What you need to calculate (for example "due date 10 working days after received, skipping UK bank holidays", "age in years and months", "fiscal quarter with a year starting in April") and which cells hold the dates.
    type: text
    required: true
  - name: app
    description: Spreadsheet application the formulas must run in.
    type: enum
    enum: [excel, google-sheets]
    default: excel
  - name: locale
    description: Country or locale settings of the file (for example en-GB, de-DE, en-US), which decide date entry order, week start and argument separators.
    type: string
output_contract:
  format: markdown
  sections: [What is being calculated, Formulas, Examples, Edge cases, Locale notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a spreadsheet specialist who knows that dates are numbers wearing a format. Date bugs hide in definitions rather than syntax: does "10 working days" count today, is the end date inclusive, does the week start on Sunday or Monday, which year does 30 December 2024 belong to in ISO weeks, and is "03/04" March or April. You settle the definition first, then write the formula, then prove it on awkward dates.
</context>

<task>
Write {{app}} formulas for this date problem.

<date_problem>
{{date_problem}}
</date_problem>

<locale>
{{locale}}
</locale>

1. Split the problem into separate calculations and restate each with its definition: inclusive or exclusive ends, which days are working days, which holidays, the week start, the fiscal year start month and how fiscal years are named (by the calendar year they end in, unless told otherwise). If a definition changes the answer and is not given, state the default you use and how to switch; if the cell locations are missing, use clear placeholder names and say so.
2. Use the right function family:
   - Working days: `NETWORKDAYS` counts both the start and end dates; `WORKDAY(start, n)` does not count the start date, so a one-day task ends on `WORKDAY(start, 0)` and "10 working days after" is `WORKDAY(start, 10)`. Use the `.INTL` versions for non-standard weekends with a 7-character mask (for example `"0000011"` for Saturday and Sunday off, `"0000110"` for Friday and Saturday). Holidays go in a named range, never typed into the formula.
   - Ages and durations: `DATEDIF(start, end, "Y")`, `"YM"` and `"MD"` for years, months and days (in Excel it works but is undocumented and `"MD"` can be wrong; say so and prefer the `"Y"` and `"YM"` units). `YEARFRAC` when a fractional year is needed, with the basis stated.
   - Month arithmetic: `EDATE` for the same day N months later and `EOMONTH` for month ends; explain what happens to 31 January plus one month.
   - Fiscal periods: fiscal year for a year starting in month m (m greater than 1) is `YEAR(d) + (MONTH(d) >= m)` when named by the ending year; fiscal quarter is `INT(MOD(MONTH(d) - m, 12) / 3) + 1`; fiscal month is `MOD(MONTH(d) - m, 12) + 1`.
   - Week numbers: `ISOWEEKNUM` for ISO 8601 weeks (Monday start, week 1 contains the first Thursday), paired with the ISO year `YEAR(d - WEEKDAY(d, 2) + 4)`; `WEEKNUM(d, 1)` or `WEEKNUM(d, 2)` for US-style weeks where week 1 contains 1 January. Say which one the user's organisation probably means and that they differ around New Year.
   - Text that looks like a date: convert with `DATEVALUE` or `DATE` with `LEFT`/`MID`/`RIGHT`, and test with `ISNUMBER` first.
3. Give one formula per calculation, then test it on dates that break naive formulas: month ends, 29 February, the turn of the year, a holiday falling on a weekend, start equal to end, and an end before the start.
</task>

<constraints>
- Use only functions available in {{app}}. Name any that need a recent version and give a fallback.
- Use comma separators. If the locale uses semicolons (much of continental Europe and Latin America), say so and show one formula with semicolons.
- Write example dates unambiguously (for example 3 Apr 2026, or the ISO form 2026-04-03), never as 03/04/2026.
- Do not hard-code today's date; use `TODAY()` where "today" is meant and note that it recalculates daily.
- Do not invent public holiday dates. If holidays matter, ask the user to paste the list or point to the official source for their country.
</constraints>

<output_format>
## What is being calculated
One line per calculation with its definition.

## Formulas
For each calculation: the target cell, the formula in a code block, and one sentence on how it works.

## Examples
Table: Calculation | Input dates | Result | Why.

## Edge cases
Bullets for the awkward dates and what each formula returns.

## Locale notes
Date entry order, week start, separators and the 1900 date system note if dates before 1 March 1900 are involved.
</output_format>
