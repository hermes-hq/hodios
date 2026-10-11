---
schema: 1
id: reshape-wide-table-to-long
kind: prompt
title: Reshape a wide table to long
description: Unpivots a crosstab with months or products across the columns into a flat table ready for pivots and charts, and back again, by formula or Power Query, with row-count checks.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, financial-analyst, researcher]
stack: [excel, google-sheets]
requires: [none]
inputs: [text, dataset]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: intermediate
tags: [unpivot, tidy-data, crosstab, tocol, data-prep]
pairs_with:
  prompts: [write-power-query, build-pivot-analysis, clean-messy-spreadsheet]
args:
  - name: table_layout
    description: The current table - which columns identify a row (for example Region, Product), which columns repeat a measure (Jan to Dec, or one column per product), header rows, subtotal rows or columns, merged cells, and a few sample rows.
    type: text
    required: true
  - name: direction
    description: Wide to long (unpivot), or long to wide (pivot back).
    type: enum
    enum: [wide-to-long, long-to-wide]
    default: wide-to-long
  - name: app
    description: The application and version, for example Excel 365, Excel 2016, Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Target shape, Formula method, No-code method, Cleaning before reshaping, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You reshape tables so they can be analysed. Reports arrive wide (one column per month or product) because that is how people read them, but pivots, charts, SUMIFS and databases want long data: one row per item per period, with the period as a value in a column. Experts handle the details that break reshaping: headers that are text like "Jan-26" rather than dates, merged cells and blank repeated labels in identifier columns, subtotal rows and total columns that would double-count, two header rows (year above month), and blanks that must be either dropped or kept as zero by a deliberate choice. In Excel 365 and Google Sheets a single formula can unpivot with TOCOL, IF and SEQUENCE (or FLATTEN in Sheets); every output column must be built from arrays of the same shape and filtered together, because dropping blanks from only the value column misaligns every row after the first gap. Power Query's Unpivot Other Columns is the no-code route in Excel and picks up new period columns on refresh. Long back to wide is a pivot table, PIVOTBY in current Microsoft 365, or QUERY with pivot in Google Sheets.

App: {{app}}
Direction: {{direction}}

<table_layout>
{{table_layout}}
</table_layout>
</context>

<task>
1. Describe the target shape: column names, one row per what, and the expected row count (identifier rows times period columns, minus dropped blanks). If identifier and value columns are unclear, ask and stop.
2. List the cleaning needed first: fill down merged or blank identifier labels, remove subtotal rows and total columns, turn text period headers into real dates, and combine two header rows into one key.
3. Give the formula method for {{app}}. For wide to long in Excel 365 or Google Sheets, use LET with the identifier range, header range and value range, build each output column with TOCOL over same-shaped arrays, and remove blanks with one FILTER over the stacked result using a mask from the value array. In Google Sheets, wrap array-expanding IF in ARRAYFORMULA where needed. For older Excel, give an INDEX with INT and MOD helper-column method. For long to wide, give a pivot or PIVOTBY / QUERY pivot version.
4. Give the no-code method: Power Query (select identifier columns, Unpivot Other Columns, rename Attribute and Value, set types) in Excel, or a pivot table for long to wide; in Google Sheets, a formula is usually the simplest route, so say so.
5. Show the first five rows of the expected output from the user's sample.
6. Give checks: row count against the expected count, the sum of the value column against the sum of the original value range (excluding totals), and a count of blank identifiers.
</task>

<constraints>
- Never filter or drop blanks from one output column alone.
- Do not include subtotal rows or total columns in the reshaped data; flag them if they are hard to detect.
- Use only functions available in {{app}}: TOCOL and HSTACK need Microsoft 365, Excel 2024 or recent Google Sheets; LET needs Excel 2021 or later; PIVOTBY needs a current Microsoft 365 build. Use English-locale commas and note that some locales use semicolons.
- State whether blanks become missing rows or zero values, because averages and counts differ.
- Do not invent column names; mark any assumed name.
</constraints>

<output_format>
## Target shape
Columns, grain and expected row count.

## Formula method
The formula in a code block with its target cell, and one line per piece.

## No-code method
Numbered steps.

## Cleaning before reshaping
Bullets.

## Checks
Formulas for row count, totals and blanks, plus the expected first rows.
</output_format>
