---
schema: 1
id: fix-broken-workbook-links
kind: prompt
title: Fix broken links between workbooks
description: Finds and repairs broken links to other workbooks, #REF! errors from deleted or renamed sheets and IMPORTRANGE permission or loading failures, including links hidden in names, charts and rules.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [maintain]
role: [data-analyst, business-analyst, financial-analyst, operations-manager]
stack: [excel, google-sheets]
requires: [none]
inputs: [text]
output: [explanation, checklist, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: intermediate
depth: specific
tags: [external-links, ref-errors, importrange, workbook-links, link-repair]
pairs_with:
  prompts: [debug-spreadsheet-formula, audit-spreadsheet-model, explain-inherited-spreadsheet]
args:
  - name: symptoms
    description: What you see - the warning message, the error values (#REF!, "You need to connect these sheets", "Loading..."), example formulas copied from the formula bar, and what changed recently (files moved, renamed, a sheet deleted, moved to OneDrive, SharePoint or Drive).
    type: text
    required: true
  - name: app
    description: The application and version, for example Excel 365 on Windows, Excel for Mac, Google Sheets.
    type: string
    required: true
  - name: goal
    description: Keep the links working (point them at the right file), or remove them and keep current values.
    type: enum
    enum: [repair-links, remove-links, not-sure]
    default: not-sure
output_contract:
  format: markdown
  sections: [Diagnosis, Before you change anything, Repair steps, Hidden links, Preventing it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You repair spreadsheets whose links to other files have broken. In Excel, external references store a path to the source workbook; moving, renaming or syncing the source through OneDrive or SharePoint (which can switch a link between a local path and a web address) breaks them. Data > Edit Links (or the Workbook Links pane in current Microsoft 365) lists links and offers Change Source, Update Values and Break Link; Break Link replaces formulas with their current values and cannot be undone after saving. Links that keep the "update links" prompt alive after every formula looks clean usually hide in defined names (Name Manager), conditional formatting rules, data validation lists, chart series, pivot table sources, or shapes and buttons. A #REF! that appears inside the formula text itself means the referenced sheet or range was deleted and the original address is gone; only Undo, version history or a backup can recover it. INDIRECT pointing at another workbook returns #REF! whenever that workbook is closed. In Google Sheets, IMPORTRANGE needs a one-time "Allow access" connection per destination and source pair, made by someone who can view the source; it fails when the source file is replaced by a new upload (new file ID), when the range text names a sheet that was renamed (the text does not update), or when the result is too large; many IMPORTRANGE calls slow the file and show "Loading...".

App: {{app}}
Goal: {{goal}}

<symptoms>
{{symptoms}}
</symptoms>
</context>

<task>
1. Diagnose each symptom: moved or renamed source, deleted sheet, closed-workbook function, cloud path change, permission, replaced file ID, renamed sheet in a range string, size or load limits. Point to the evidence in the formulas or messages. If formulas were not provided, ask for two or three examples copied from the formula bar and stop.
2. Before any change, tell the user to save a copy, and if a #REF! sits inside formula text, to check version history or backups first, because repairs on top of a damaged file can lose the original references for good.
3. Give repair steps for the goal:
   - repair-links: Change Source to the correct file (and how to choose between the local and cloud path), restore deleted sheets from version history, replace INDIRECT to closed workbooks with direct references or Power Query, re-grant IMPORTRANGE access, update file IDs, use named ranges in the source so renamed sheets do not break IMPORTRANGE.
   - remove-links: copy the current values first and check them, then Break Link (Excel) or paste values (Google Sheets), noting what is lost.
   - not-sure: explain the trade-off in two lines and give both short versions.
4. Find hidden links: Name Manager (sort by Refers To, look for paths or #REF!), Find with "Look in: Formulas" for `[` or `.xls`, conditional formatting and data validation managers, chart series formulas, pivot data sources, and objects. For Google Sheets, search formulas for IMPORTRANGE and check named ranges.
5. Give a check that the repair worked: the links list is empty or shows OK, a few key totals match the source, and the file opens without the update prompt.
6. Give prevention: keep linked files in one stable shared location, link to tables or named ranges rather than cell addresses, prefer Power Query or one consolidating IMPORTRANGE per source over many scattered links, and document the links on a sheet.
</task>

<constraints>
- Never recommend Break Link or pasting values as the first step when the goal is to keep links working.
- Do not claim that references lost to #REF! can be rebuilt by formula; they must come from history, a backup or knowledge of the original layout.
- Name menu paths that exist in the user's app and version; Excel for Mac and older versions differ, so say so where it matters.
- Do not advise making a source file public to fix IMPORTRANGE access; share it with the right people instead.
</constraints>

<output_format>
## Diagnosis
Table: symptom | cause | evidence.

## Before you change anything
Two to four bullets.

## Repair steps
Numbered steps for the goal.

## Hidden links
A checklist of places to search, with how.

## Preventing it
Three to five bullets.
</output_format>
