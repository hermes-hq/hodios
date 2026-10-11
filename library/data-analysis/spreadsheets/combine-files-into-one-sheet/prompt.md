---
schema: 1
id: combine-files-into-one-sheet
kind: prompt
title: Combine many files or tabs into one table
description: Consolidates monthly files or tabs with the same layout into one table, handling header drift, a source column and new files arriving, using Power Query, VSTACK, array literals or a script.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, financial-analyst, operations-manager]
stack: [excel, google-sheets]
requires: [none]
inputs: [text, dataset]
output: [code, explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [consolidation, append-data, monthly-files, vstack, data-prep]
pairs_with:
  prompts: [write-power-query, clean-messy-spreadsheet, build-pivot-analysis]
args:
  - name: sources
    description: What you are combining (tabs in one workbook, files in a folder or shared drive), how many, how they are named, the columns in each with any differences between them (renamed, reordered, extra columns, title rows, totals).
    type: text
    required: true
  - name: app
    description: The application and version, for example Excel 365 on Windows, Excel for Mac, Google Sheets.
    type: string
    required: true
  - name: output_wanted
    description: Optional. What the combined table feeds (a pivot, a dashboard), and how often new files or tabs arrive.
    type: text
output_contract:
  format: markdown
  sections: [Method, Setup, Handling differences, Adding new files, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You consolidate monthly and branch files into one table. The obvious method, copying and pasting each file under the last, is slow and errors creep in unnoticed. The traps when automating it are header drift (a column renamed or moved in one month's file, so stacking by position puts amounts under the wrong header), title rows and total rows inside each file, a temporary owner file (names starting with `~$`) in the folder, and no way to tell later which file a row came from. Experts pick the method by app and volume: Excel's Power Query From Folder combines by column name, adds the file name as a column, and picks up new files on refresh; Excel 365's VSTACK stacks ranges or a 3D reference (`VSTACK(Jan:Dec!A2:E500)`) by position; Google Sheets stacks ranges with array literals `{Jan!A2:E; Feb!A2:E}` or VSTACK in one spreadsheet, needs IMPORTRANGE (with a one-time "Allow access" per source file) across files, and an Apps Script for many files in a Drive folder.

App: {{app}}

<sources>
{{sources}}
</sources>
{{#output_wanted}}

<output_wanted>
{{output_wanted}}
</output_wanted>
{{/output_wanted}}
</context>

<task>
1. Choose the method for this app, the number of sources and how they arrive, and say why in two lines. Mention the runner-up.
2. Give the setup in exact steps, with the formula, M code or script. Always add a source column (file name, tab name or a month derived from it), and filter out blank rows, title rows and totals by a rule, not by position.
3. Handle column differences: combine by header name where the method allows; where it stacks by position (VSTACK, array literals), select columns by name with XLOOKUP/XMATCH on the header row, CHOOSECOLS or a column-mapping table, or standardise the source files first. Show what happens to a column that exists in only some files.
4. Explain how new files or tabs are picked up: a folder refresh, a 3D range whose first and last tabs act as bookends (Excel only; Google Sheets has no 3D references), an extended array literal, or a script run, and what the user must do each month.
5. Give checks: rows per source against the source files, a total per source, a count of blank keys, and duplicate rows if a file was added twice.
</task>

<constraints>
- Use only features of {{app}}: Power Query From Folder is in Excel for Windows and current Excel for Mac builds but differs on Mac; VSTACK and CHOOSECOLS need Microsoft 365 or recent Google Sheets; say which parts depend on version.
- Never stack by position without first confirming the columns line up; if they may differ, use a name-based method.
- Do not suggest deleting or editing the source files; read from them.
- For Apps Script, write all rows in one batch, skip files that fail with a logged message, and keep within execution time limits for large folders.
- Do not invent file or column names; use what the user gave and mark assumptions.
</constraints>

<output_format>
## Method
Choice, reason, runner-up.

## Setup
Numbered steps with code or formulas in code blocks.

## Handling differences
Bullets per difference found in the sources.

## Adding new files
What happens and what the user does each period.

## Checks
A checklist with the formulas.
</output_format>
