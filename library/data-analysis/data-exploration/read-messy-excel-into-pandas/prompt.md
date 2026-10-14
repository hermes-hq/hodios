---
schema: 1
id: read-messy-excel-into-pandas
kind: prompt
title: Read a messy Excel file into pandas
description: Loads report-style Excel workbooks into tidy pandas DataFrames, handling multi-row headers, merged cells, several sheets, notes and totals rows, with checks on exactly what was read.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, data-scientist, business-analyst, financial-analyst]
stack: [pandas, excel]
requires: [none]
inputs: [file, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [workbooks, read-excel, tidy-data, multi-row-headers, data-loading]
pairs_with:
  prompts: [translate-spreadsheet-to-pandas, explore-dataset, write-dataframe-transformation]
args:
  - name: workbook_layout
    description: Describe or paste the layout of each relevant sheet, for example the first 15 rows copied as text, which rows hold headers, where merged cells are, where data ends, and any notes, subtotals or blank spacer rows. Remove personal data.
    type: text
    required: true
  - name: target
    description: The table you want at the end, for example "one row per region per month with columns region, month, sales, units".
    type: text
    required: true
  - name: recurring
    description: Whether the same workbook arrives again (monthly, weekly) and may shift slightly, so the code must find headers rather than rely on fixed row numbers. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Layout read, Code, What was read, Checks, If the layout changes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analyst who regularly turns finance and operations workbooks into tidy tables. Those workbooks are built for people to read: a title block above the headers, headers spread over two rows (a merged "2026" above "Jan, Feb, Mar"), merged category cells that pandas reads as one value followed by blanks, subtotal and total rows mixed into the data, notes at the bottom, hidden rows and columns, and numbers stored as text with thousands separators. pandas.read_excel with header=[0, 1], skiprows, usecols and nrows handles most of it, followed by forward-filling merged labels, melting wide month columns into rows, and dropping subtotals by a rule. The danger is silent misreads: a total row kept in the data doubles the sum, a hard-coded skiprows breaks when next month's file has one more title line, and formulas come through as their last saved values (or as empty if the file was produced by a tool that never calculated them).
</context>

<task>
Write pandas code to load this workbook into the target table.

<workbook_layout>
{{workbook_layout}}
</workbook_layout>

<target>
{{target}}
</target>

{{#recurring}}Recurring delivery: {{recurring}}{{/recurring}}

1. Describe how you read the layout: per sheet, the header rows, the first and last data rows, merged and spacer cells, subtotal and total rows, notes, and anything you are unsure of.
2. Write the load: read_excel with sheet_name, header, skiprows, usecols, nrows and dtype (identifiers as str), using openpyxl for .xlsx. If several sheets share a layout, loop over them and add the sheet name as a column.
3. Clean to the target: flatten or melt multi-row headers, forward-fill merged labels, remove subtotal and total rows by an explicit rule (label text or a flag), convert numbers stored as text, parse dates, and rename columns.
4. If the file is recurring, locate the header row by searching for a known label instead of using fixed row numbers, and fail with a clear message when the label is not found.
5. Print a short report of what was read: rows and columns per sheet, rows dropped and why.
6. Add checks: the cleaned total of each measure equals the workbook's own total row where one exists; no duplicate keys at the target grain; expected columns present.
</task>

<constraints>
- Never drop rows silently; every filter that removes rows logs how many and why.
- Do not guess the layout beyond what was shown; where a row's role is unclear, say so and make the rule easy to change.
- Read identifier and code columns as text so leading zeros survive.
- Note that formula cells load as their cached values and say what to do if they come back empty.
- Leave the source file untouched; write outputs to a new file if requested.
</constraints>

<output_format>
## Layout read
Bullets per sheet, including uncertainties.

## Code
One runnable Python block with comments.

## What was read
What the printed report will show and how to read it.

## Checks
The assertions and what a failure means.

## If the layout changes
Which parts of the code adapt and which need editing.
</output_format>
