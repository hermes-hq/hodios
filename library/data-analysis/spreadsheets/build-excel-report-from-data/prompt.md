---
schema: 1
id: build-excel-report-from-data
kind: prompt
title: Build a formatted Excel report workbook with a script
description: Builds a formatted Excel workbook from data with a script, with live-formula summaries, pivot-style tables, charts and a documentation tab, and checks it recalculates. Use for reusable Excel reports.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build, verify]
role: [data-analyst, operations-manager, business-analyst, financial-analyst]
stack: [excel]
requires: [repo-read, file-write, shell]
inputs: [dataset, text]
output: [code, table, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [xlsx-generation, live-formulas, workbook-automation, data-validation, formula-recalculation]
pairs_with:
  prompts: [build-pivot-analysis, design-spreadsheet-model, write-spreadsheet-formula, audit-spreadsheet-model]
  rules: [spreadsheet-modeling-rules]
args:
  - name: data_path
    description: Path to the source data (CSV, Parquet, database export, or an existing workbook).
    type: string
    required: true
  - name: requirements
    description: The sheets, metrics, breakdowns and charts the workbook needs, and who uses it, for example "monthly sales by region and product, margin %, top 10 customers, a chart of monthly trend, for the sales director".
    type: text
    required: true
  - name: library
    description: The library to write the workbook with, for example openpyxl, XlsxWriter, ExcelJS or Apache POI. "any" uses what the project already has, or a standard choice for its language.
    type: string
    default: any
output_contract:
  format: markdown
  sections: [Workbook layout, Formulas, Build script, Recalculation check, Limitations, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A generated workbook is only useful if people can keep using it: change a filter, add a month of data, and see totals update. Scripts often write computed values instead of formulas, so the summary goes stale the moment someone edits the data. Libraries that write formulas usually do not calculate them, so a file can open with blank or stale cells in some viewers, or hide #REF! and #NAME? errors that nobody sees until a meeting. And most libraries cannot build true pivot tables reliably, so pivot-style summaries should be formulas over a structured table.
</context>

<task>
Build an Excel workbook from `{{data_path}}` with a script, using {{library}}.

<requirements>
{{requirements}}
</requirements>

1. Load and inspect the data: columns, types, row count, date range, and problems that would break formulas (numbers as text, blank keys, mixed date formats). If the data cannot meet the requirements, say what is missing and stop.
2. Design the layout and show it in the report before building: sheet names and order, what each holds, named ranges, and which cells are inputs (such as a selected month or region) versus formulas.
3. Build with a script that the user can rerun on new data:
   - **Data** sheet: the cleaned data as an Excel table with a name, typed columns and number formats.
   - **Summary** sheet: every metric as a live formula referencing the table by structured references or named ranges (for example SUMIFS, COUNTIFS, AVERAGEIFS, XLOOKUP or INDEX/MATCH, with a fallback for older Excel if the audience needs it). No total, percentage or ranking is written as a fixed number.
   - **Breakdowns**: pivot-style tables built from formulas over the table, with the row and column labels generated from the data. If a true pivot table is required, say whether the library can create one and, if not, provide the formula version plus instructions to insert a pivot table in one step.
   - **Charts** that reference the formula ranges, so they update with the data; titles that state what the chart shows, labelled axes, and colour-blind-safe colours.
   - **Data validation** on input cells (lists from the data, date ranges) and protection of formula cells if requested.
   - **Documentation** sheet: purpose, data source and refresh date, definition of each metric with its formula, how to add new data, and the build command.
   - Formatting: header styles, number and percentage formats, frozen panes, column widths, print setup for the summary.
4. Recalculate and check: open the file in a local spreadsheet engine that calculates formulas (for example LibreOffice in headless mode) and read back the calculated values. Independently compute the same metrics from the data in the script, and compare. Search every formula cell for error values. If no calculation engine is available, say so, and set the workbook to recalculate fully on open.
</task>

<constraints>
- Never write a computed total, rate or rank as a static value where a formula belongs. Static values are allowed only for the raw data and documented constants.
- Keep the data sheet as data: no blank rows, merged cells or subtotals inside the table.
- Do not overwrite an existing workbook; write a new file and say where.
- If the requirements are ambiguous about a metric's definition (for example margin on revenue or on cost), ask or state the assumption in the documentation sheet.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Workbook layout
Table: Sheet | Contents | Inputs | Key formulas.

## Formulas
Each metric with its formula and definition.

## Build script
Where it is and how to rerun it on new data.

## Recalculation check
Table: Metric | Value in workbook (recalculated) | Value from script | Match. Plus the result of the error-value search.

## Limitations
What the library could not do (for example native pivot tables) and the workaround.

## Verification
Commands run and real results, and the output file path.
</output_format>
