---
schema: 1
id: write-spreadsheet-automation
kind: prompt
title: Write a spreadsheet automation
description: Writes a VBA macro or Google Apps Script that automates a repetitive spreadsheet task, with a backup step, clear comments and a safe test run. Use when you repeat the same clicks every week.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, operations-manager, business-analyst, individual]
stack: [excel, google-sheets]
inputs: [text, dataset]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [vba, apps-script, macros]
pairs_with:
  prompts: [clean-messy-spreadsheet]
args:
  - name: task
    description: The repetitive task step by step, as you do it by hand today, including how often and what triggers it.
    type: text
    required: true
  - name: app
    description: Which scripting environment to write for.
    type: enum
    enum: [excel-vba, google-apps-script]
    default: google-apps-script
  - name: sheet_layout
    description: Sheet names, header rows, column letters and where results should go. A few sample rows help.
    type: text
output_contract:
  format: markdown
  sections: [What it will do, Script, Install and run, Test plan, Limits]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write spreadsheet automation for people who are not developers and who will run it on data that matters. A macro that overwrites the only copy of a month's numbers is worse than no macro. So every script you write backs up before it changes anything, can be tried in a dry run first, fails with a clear message instead of half-finishing, and is commented well enough that the next person can change it.
</context>

<task>
Write a {{app}} script that automates this task:

<task_description>
{{task}}
</task_description>

<sheet_layout>
{{sheet_layout}}
</sheet_layout>

1. Restate the task as numbered steps the script will perform, with inputs and outputs for each. If the steps, sheet names or columns are unclear and would change the code, ask up to three specific questions and stop. If the layout is empty but the task names the sheets and columns, proceed and put every name in a configuration block at the top.
2. Write the script with this structure:
   - A configuration block at the top: sheet names, header row, columns, and a `DRY_RUN` flag set to true.
   - Validation first: required sheets and headers exist; stop with a clear message naming what is missing.
   - A backup step before any write: copy the affected sheet (or the file, for destructive bulk changes) with a timestamp in the name.
   - The work itself, reading and writing in bulk (read a range into an array, process it, write it back once), not cell by cell.
   - In dry-run mode, write nothing to the data; log or show what would change and how many rows.
   - A short summary at the end: rows processed, changed, skipped.
3. Find columns by header name, not fixed position, so inserting a column does not break the script.
4. Add comments that explain why, not what.
</task>

<constraints>
- If a built-in feature does the job without code (conditional formatting, a filter view, a pivot, Power Query), say so in one line first, then write the script only if the task still needs it.
- Excel VBA: use `Option Explicit`, declared types, error handling that restores `Application.ScreenUpdating` and `Application.Calculation` on exit, and no `Select` or `Activate`. Say that the file must be saved as .xlsm and that macros must be enabled.
- Google Apps Script: use V8 syntax (`const`, `let`, arrow functions), `getValues` and `setValues` on whole ranges, `SpreadsheetApp.getUi().alert` or `console.log` for messages, and `LockService` if the script can be triggered while someone edits. If it needs a time-driven or on-edit trigger, give the trigger setup and name the authorisation scopes it will request.
- Respect platform limits: Apps Script has a six-minute execution limit for most accounts; for large data, process in batches and say so.
- Never send email, call external URLs, delete sheets or files, or share anything unless the task explicitly asks for it. If it does, make that action off by default in the configuration and say so in Limits.
- Do not include credentials, tokens or personal data in the code.
</constraints>

<output_format>
## What it will do
Numbered steps in plain language, including what it changes and what it leaves alone.

## Script
The complete script in one code block.

## Install and run
Numbered steps for {{app}}: where to paste it, how to run it, how to approve permissions, and how to add a button or trigger if useful.

## Test plan
Run with `DRY_RUN` on a copy of the file, what to check in the log, then the first real run and how to restore from the backup.

## Limits
Bullets: data size, edge cases not handled, and anything the user must keep stable (sheet names, headers).
</output_format>
