---
schema: 1
id: convert-range-to-excel-table
kind: prompt
title: Convert ranges to Excel Tables
description: Converts plain data ranges in a workbook to Excel Tables and rewrites the formulas, lookups, charts, pivots and validation that use them to structured references, so ranges grow on their own.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [maintain]
role: [data-analyst, financial-analyst, business-analyst, operations-manager]
stack: [excel]
inputs: [text]
output: [checklist, code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [excel-tables, structured-references, dynamic-ranges, workbook-cleanup, listobject]
pairs_with:
  prompts: [speed-up-slow-workbook, write-spreadsheet-formula, audit-spreadsheet-model]
args:
  - name: workbook
    description: The data ranges to convert (sheet, range, header row, what grows), and what depends on them - formulas with fixed ranges like A2:A500 or whole columns, VLOOKUPs, pivots, charts, dropdown lists, macros, links from other files.
    type: text
    required: true
  - name: problems
    description: What goes wrong today, such as new rows missed by totals, formulas not copied down, pivots needing their range changed.
    type: text
output_contract:
  format: markdown
  sections: [Before you convert, Conversion steps, Formula rewrites, Dependent features, Things tables cannot do, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You convert plain ranges in Excel to Tables (Insert > Table or Ctrl+T) so data ranges grow by themselves. A table expands when rows are added directly below it, fills calculated columns automatically, and gives names that make formulas readable: `tblSales[Amount]` for a column, `[@Amount]` for the same row, `tblSales[#Headers]`, `tblSales[#Totals]`. Converting is not just pressing Ctrl+T. Tables do not allow merged cells, blank or duplicate headers (they get renamed Column1 or Amount2), or a second header row; dynamic array formulas cannot spill inside a table; and data validation and conditional formatting cannot use structured references directly, so they need a defined name or INDIRECT with the reference as text. Structured references copied sideways shift to the next column unless written `tblSales[[Amount]:[Amount]]`. Links to a table in another workbook only update while that workbook is open. VBA that refers to fixed ranges should use ListObjects instead. Pivot tables and charts pointed at the table name pick up new rows on refresh.
</context>

<task>
Plan and carry out the conversion.

<workbook>
{{workbook}}
</workbook>

{{#problems}}
<problems>
{{problems}}
</problems>
{{/problems}}

1. Before you convert: per range, the fixes needed first: one header row, unique non-blank headers, no merged cells, no blank rows or subtotal rows inside the data, totals moved below or into the table's total row, nothing directly to the right or below that should not join the table. Say to work on a copy.
2. Conversion steps: Ctrl+T with "My table has headers", then rename each table on Table Design (a short prefix and no spaces, such as `tblOrders`), and choose a plain style if the existing formatting should stay.
3. Formula rewrites: for each kind of formula the user described, the before and after: SUM or SUMIFS over fixed or whole-column ranges to table columns; VLOOKUP with a column number to XLOOKUP or INDEX/MATCH on named columns; row formulas to `[@Column]`; formulas that must stay pointing at one column when copied across to `[[Column]:[Column]]`. Explain how to use Find and Replace or rewrite one and let the calculated column fill.
4. Dependent features: pivots (PivotTable Analyze > Change Data Source to the table name), charts (series follow the table), dropdown lists (a defined name such as `=tblLists[Category]` used as the list source), conditional formatting (A1 ranges or names), Power Query sources, macros (ListObjects), and links from other files.
5. Things tables cannot do: the limits that apply here and the workaround for each.
6. Check: add a test row at the bottom and confirm totals, lookups, pivots after refresh, charts and dropdowns all include it; then delete the test row.
</task>

<constraints>
- Excel only; if the user mentions Google Sheets, say its table feature and references differ and do not give these steps as-is.
- Do not change results: compare key totals before and after the conversion.
- Do not convert ranges that are report layouts rather than data (cross-tabs with merged headers, printed forms); say which ones to leave.
- Keep table and column names short and stable, because formulas depend on them.
</constraints>

<output_format>
## Before you convert
Checklist per range.
## Conversion steps
## Formula rewrites
Table: Formula today | Rewritten | Note.
## Dependent features
## Things tables cannot do
## Check
</output_format>
