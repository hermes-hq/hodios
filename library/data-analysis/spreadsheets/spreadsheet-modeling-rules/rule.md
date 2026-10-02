---
schema: 1
id: spreadsheet-modeling-rules
kind: rule
title: Spreadsheet modelling rules
description: Rules for building or editing spreadsheets, covering separate inputs, calculations and outputs, no hard-coded numbers, consistent units, checks and a notes tab. Load for spreadsheet work.
category: spreadsheets
version: 1.0.1
status: incubating
stage: [build, review]
role: [data-analyst, business-analyst, financial-analyst, operations-manager]
stack: [excel, google-sheets]
requires: [none]
risk: read-only
invocation: model
level: intermediate
tags: [financial-modelling, model-checks, auditability, named-ranges]
pairs_with:
  prompts: [design-spreadsheet-model, audit-spreadsheet-model, write-spreadsheet-formula]
  personas: [spreadsheet-expert]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Loads only when spreadsheet work is in progress, and the description says when it applies."}
---
When you build, extend or edit a spreadsheet, workbook or spreadsheet formula:

Structure
- Keep inputs, calculations and outputs apart: separate sheets for anything beyond a one-off calculation, or at least clearly labelled blocks on one sheet. Inputs are entered once and referenced everywhere else; outputs only reference calculations.
- Add a Notes (or Cover) sheet that states the purpose, the author or owner, the date or version, how to use the file, the source of every input and every important assumption.
- Lay calculations out to read left to right and top to bottom, with one time axis shared by every time-based sheet (one column per period, same columns on every sheet).
- Store data as one flat table per entity: one header row, one record per row, no merged cells, no blank rows inside the data, no subtotals mixed into raw data, and no separate tab per month when a date column would do.

Formulas
- Never type a number inside a formula except 0, 1, and fixed unit conversions such as 12 months, 7 days or 100 for percentages. Every rate, price, threshold or assumption goes in an input cell with a label and unit, preferably as a named range (for example `inp_vat_rate`).
- Use one formula per row (or per column) and copy it across the whole range unchanged. If a period needs a different calculation, drive it with a flag row (1 or 0) rather than a different formula.
- Prefer simple, readable formulas: helper columns or `LET` over deep nesting, `SUMIFS`, `XLOOKUP` or `INDEX`/`MATCH` over `VLOOKUP` with a hard-coded column number, exact-match lookups unless an approximate match is deliberate and documented.
- Reference whole tables, structured references or named ranges instead of fixed ranges that stop short of the data.
- Avoid volatile and fragile functions (`INDIRECT`, `OFFSET`, whole-column array formulas over large sheets) unless there is no reasonable alternative, and say why when you use them.
- Never use `IFERROR` to hide errors you have not understood; handle the specific expected case (for example a missing lookup key) and let unexpected errors show.
- Avoid circular references. If one is genuinely needed (for example interest on an average balance), isolate it, add an on/off switch and document it on the Notes sheet.

Units and formats
- Put the unit in every label or header (currency, thousands, %, per month, per year) and keep one unit per row or column. Convert explicitly in a labelled step rather than inside another formula.
- Keep rates and periods consistent: never mix monthly and annual rates without a visible conversion.
- Store dates as real dates and numbers as numbers, never as text.
- Format inputs so they are visibly different from calculations (for example a fill colour), but never let colour be the only signal: label input cells too.

Checks
- Add checks wherever numbers must agree: totals across and down, balance sheet balancing, sums of parts equal to the whole, row counts before and after a transformation, and opening plus flows equals closing.
- Each check returns a difference that should be 0 (with a small tolerance for rounding), and a master check cell on the Notes or output sheet shows OK or ERROR.
- Add sign and range checks where they protect the answer (no negative stock, probabilities between 0 and 1).

Working with an existing file
- Follow the conventions already in the file unless they break these rules; when they do, point it out and ask before restructuring someone else's workbook.
- Do not delete or overwrite data, sheets or formulas you were not asked to change. Suggest keeping a copy before any bulk edit.
- When you give a formula, say which cell it goes in, whether to fill it down or across, and one quick way to verify it.
- Never invent input values. Mark unknown inputs as needed, and label any illustrative value as a placeholder.
