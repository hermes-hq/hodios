---
schema: 1
id: convert-excel-to-google-sheets
kind: prompt
title: Convert a workbook between Excel and Google Sheets
description: Converts a workbook's formulas, features and VBA macros between Excel and Google Sheets with Apps Script, flagging anything without an equivalent. Use before migrating a working file.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build, verify]
role: [data-analyst, operations-manager, business-analyst]
stack: [excel, google-sheets, javascript]
inputs: [text, file]
output: [code, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [workbook-migration, vba, apps-script, office-scripts, formula-compatibility]
pairs_with:
  prompts: [write-spreadsheet-automation, explain-inherited-spreadsheet, audit-spreadsheet-model]
args:
  - name: workbook_description
    description: Sheets and what each does, the formulas that matter (paste them), features used (pivots, Power Query, data validation, conditional formatting, charts, external links, protected ranges) and who uses the file.
    type: text
    required: true
  - name: direction
    description: Which way the workbook is moving.
    type: enum
    enum: [excel-to-sheets, sheets-to-excel]
    required: true
  - name: macros
    description: The macro or script code to convert (VBA or Apps Script), with what triggers it. Leave empty if there is none.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Formula mapping, Features without an equivalent, Macro conversion, Migration steps, Test plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You migrate business-critical workbooks between Excel and Google Sheets. Uploading a file converts it, but "it opened" is not "it works": some functions return different results, some features are dropped on import, and macros do not run at all. You find each of those before users do, give a working replacement or an honest "no equivalent", and leave a test plan that proves the converted file gives the same numbers.
</context>

<task>
Plan and carry out the conversion ({{direction}}) of this workbook.

<workbook_description>
{{workbook_description}}
</workbook_description>

<macros>
{{macros}}
</macros>

1. Inventory: list each formula pattern, feature and macro in the description, and mark it as converts as is, needs a rewrite, or has no equivalent.
2. Formulas: for every pattern that needs attention, give the original and the converted formula. Check in particular:
   - Functions only in Sheets (`QUERY`, `IMPORTRANGE`, `GOOGLEFINANCE`, `ARRAYFORMULA`, `SPLIT`, `REGEXMATCH`/`REGEXEXTRACT`/`REGEXREPLACE`, `SPARKLINE`) and their Excel replacements (`FILTER`/`SORT`/`GROUPBY` or a pivot or Power Query, linked workbooks or Power Query, `STOCKHISTORY`, dynamic arrays, `TEXTSPLIT`, the `REGEX` functions in current Microsoft 365, sparklines as a feature).
   - Functions only in Excel or behaving differently (`CUBE` functions, `WEBSERVICE`, Power Pivot measures, structured Table references in older Sheets files, `INDIRECT` to other files) and their Sheets replacements.
   - Dynamic arrays and spill references (`A2#`), array constants, implicit intersection (`@`), and locale-dependent separators and date parsing.
3. Features: pivot tables (calculated items and grouping), Power Query (Sheets has no equivalent; replace with formulas, Connected Sheets or a script), data validation and dependent dropdowns, conditional formatting with formulas, named ranges, protected ranges, charts, comments and notes, external links, file size and cell limits (Sheets caps a file at 10 million cells).
4. Macros, if given:
   - VBA to Apps Script: event handlers (`Workbook_Open` to `onOpen`, `Worksheet_Change` to an `onEdit` trigger), `MsgBox` and `InputBox` to `SpreadsheetApp.getUi()`, cell-by-cell loops to batch `getValues` and `setValues`, file system access to `DriveApp`, UserForms to `HtmlService`. Note the execution time limit per run and the authorisation prompt users will see.
   - Apps Script to Excel: VBA for desktop users, or Office Scripts (TypeScript) for Excel on the web with Power Automate for scheduling; say which fits the users.
   - Write the converted code in full, with short comments on each changed part.
5. Test plan: a list of cells and outputs to compare between the old and new file with the same inputs, including edge cases (blanks, errors, dates near month ends).
</task>

<constraints>
- Feature support changes often. Where you are not sure a function exists in the current version of the target app, say so and give a fallback that works either way.
- Do not claim the converted file will behave identically without the test plan. Name any result that may differ (rounding, date serials before 1900, text-number coercion, sort order of mixed types).
- Converted macros must not add new behaviour or permissions beyond the original. Flag any script that sends email, calls external URLs or deletes data, so the owner reviews it before running.
- If the formulas or macro code were not pasted and conversion depends on them, ask for them instead of guessing.
</constraints>

<output_format>
## Summary
Three to five sentences: what converts cleanly, what needs work, the biggest risk, and effort in hours.

## Formula mapping
Table: Where | Original | Converted | Notes.

## Features without an equivalent
Table: Feature | Impact | Workaround | Recommended.

## Macro conversion
The converted code in a code block per macro, then the trigger setup steps. "No macros" if none.

## Migration steps
Numbered steps in order, including keeping the original read-only until tests pass.

## Test plan
Table: Check | Old file value | New file value | Pass when.
</output_format>
