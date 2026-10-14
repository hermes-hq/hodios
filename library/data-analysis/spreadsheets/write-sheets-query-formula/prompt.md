---
schema: 1
id: write-sheets-query-formula
kind: prompt
title: Write a Google Sheets QUERY formula
description: Writes a Google Sheets QUERY formula with select, where, group by, pivot and label clauses for your range, handling mixed-type columns, date literals and cell-driven filters.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, operations-manager, individual]
stack: [google-sheets]
requires: [none]
inputs: [text, dataset]
output: [code, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: intermediate
depth: specific
tags: [query-function, group-by, pivot, date-filter, summary-table]
pairs_with:
  prompts: [write-spreadsheet-formula, debug-spreadsheet-formula, build-pivot-analysis]
  personas: [spreadsheet-expert]
args:
  - name: goal
    description: The table you want back, in plain words, for example "total sales per region per month for 2026, only paid orders, biggest first".
    type: text
    required: true
  - name: sheet_layout
    description: Sheet name, the data range, each column's letter and header, the type of data in it, and a few sample rows. Say which cells hold any filter values (a date, a region) the formula should read.
    type: text
    required: true
  - name: broken_formula
    description: Optional. A QUERY formula you already tried and what it returned.
    type: text
output_contract:
  format: markdown
  sections: [Formula, How it works, Traps checked, Variations]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write Google Sheets QUERY formulas that keep working after the data grows and someone else edits the sheet. QUERY uses the Google Visualization query language, not SQL, and its traps are well known to experts: a column holding mixed numbers and text is typed by the majority of its values and the minority comes back blank; dates must be written as `date 'yyyy-mm-dd'` literals, so a date from a cell needs `TEXT(cell,"yyyy-mm-dd")`; string values go in single quotes, so a value containing an apostrophe breaks a concatenated filter; `month()` is zero-based (January is 0); every selected column that is not aggregated must appear in `group by`; text comparisons with `=` are case-sensitive; and when the source is an array (`{…}` or another function) columns are named `Col1`, `Col2`, not letters.

<goal>
{{goal}}
</goal>

<sheet_layout>
{{sheet_layout}}
</sheet_layout>
{{#broken_formula}}

<broken_formula>
{{broken_formula}}
</broken_formula>
{{/broken_formula}}
</context>

<task>
1. Restate the output table: its columns, one row per what, sort order, and where it spills. If the data range, a column's letter or the filter cells are missing, ask one short question listing what you need and stop. Do not invent column letters.
2. Choose the source range: an open-ended range such as `Data!A1:F` so new rows are included, with the header-rows argument set explicitly (usually 1).
3. Write the query string clause by clause in the required order: `select`, `where`, `group by`, `pivot`, `order by`, `limit`, `offset`, `label`, `format`. Add `where A is not null` (or the key column) when the range is open-ended, so blank rows do not create an empty group.
4. Build any cell-driven filter safely: dates with `date '"&TEXT(cell,"yyyy-mm-dd")&"'`, numbers without quotes, text in quotes. For text that may contain an apostrophe, use doubled double quotes inside the string instead of single quotes. Use `lower(B) = 'north'` or `contains` / `matches` when case or partial matches matter, and say which.
5. Check every column the goal uses for mixed types (numbers stored as text, "N/A" in a number column, IDs that are sometimes numeric). If found, give the fix: clean the column, or wrap the source with a type-forcing array such as `{ARRAYFORMULA(TO_TEXT(A1:A)), B1:F}` and switch to `Col` names.
6. If a broken formula was given, name the exact cause of its failure before giving the fix.
7. Walk the formula through the sample rows and show the expected output for at least two rows or groups, including one awkward one (a blank, a boundary date, a mixed-type cell).
</task>

<constraints>
- QUERY is Google Sheets only. If the user's goal needs to work in Excel, say so and point to FILTER, GROUPBY/PIVOTBY (Microsoft 365) or a pivot table instead of pretending QUERY exists there.
- Use English-locale commas between function arguments and add one line noting that some locales use semicolons.
- Remember `month()` returns 0 to 11 and `dayOfWeek()` returns 1 (Sunday) to 7; adjust labels accordingly.
- Use `label` to rename aggregate headers (`label sum(D) 'Revenue'`); never leave headers like `sum Revenue` when the output feeds a chart or a lookup.
- Do not wrap the whole formula in IFERROR; an empty result should show a clear message only where you add it deliberately, for example `IFNA(QUERY(...), "No rows")`.
- If a pivot table or FILTER/SORT would be simpler for this goal, say so in one line and still give the QUERY.
</constraints>

<output_format>
## Formula
The target cell, then the formula in a code block, ready to paste.

## How it works
One bullet per clause, in plain words.

## Traps checked
A short table: trap | applies here? | how the formula handles it. Cover mixed types, dates, blank rows, case, apostrophes and header rows.

## Variations
Up to two useful variants (for example a cell-driven version, or a top-10 with `limit`), each with one line on when to use it.
</output_format>
