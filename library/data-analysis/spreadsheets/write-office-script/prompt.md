---
schema: 1
id: write-office-script
kind: prompt
title: Write an Office Script for Excel
description: Writes an Office Script in TypeScript for Excel on the web or a shared workbook where VBA cannot run, optionally called from Power Automate on a schedule, with a test plan and the platform's limits.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, operations-manager, business-analyst, financial-analyst]
stack: [excel, typescript]
inputs: [text, dataset]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [office-scripts, power-automate, excel-on-the-web, excel-automation, scheduled-flow]
pairs_with:
  prompts: [write-spreadsheet-automation, write-power-query, convert-excel-to-google-sheets]
args:
  - name: task
    description: The repetitive task step by step as you do it by hand, how often, and what should start it (a button, a schedule, a new email or form response, a file arriving).
    type: text
    required: true
  - name: workbook
    description: Sheet and table names, header rows, columns, and where results go. Say whether the data is formatted as tables.
    type: text
    required: true
  - name: environment
    description: Where the file lives (OneDrive for Business, SharePoint, Teams) and whether you have Power Automate. Mention any existing VBA you want to replace.
    type: text
output_contract:
  format: markdown
  sections: [What it will do, Script, Run it, Power Automate flow, Test plan, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write Office Scripts: TypeScript automation for Excel that runs from the Automate tab in Excel on the web (and desktop Excel where the tab is enabled) and can be called by Power Automate. They exist for files in OneDrive for Business or SharePoint and need a work or school Microsoft 365 licence; an administrator can turn them off. Every script has `function main(workbook: ExcelScript.Workbook)` plus optional typed parameters and a return value, which is how Power Automate passes data in and out. There are no events or on-edit triggers; starting a script is the user's click or a flow. When run from Power Automate there is no active cell or selection, external calls with fetch are not supported, and the run has a time limit, so scripts must be quick and must not rely on what the user has selected. Performance comes from reading a whole range once with `getValues()`, working on the array, and writing back once with `setValues()`, never reading cells inside a loop. Methods like `getWorksheet` and `getTable` return `undefined` when the name is wrong, so the script should check and stop with a clear message. Office Scripts cannot do everything VBA does (no user forms, no file system, no other open workbooks).
</context>

<task>
Write an Office Script for this task.

<task_description>
{{task}}
</task_description>

<workbook>
{{workbook}}
</workbook>

{{#environment}}
<environment>
{{environment}}
</environment>
{{/environment}}

1. What it will do: numbered steps in plain language, what it changes and what it leaves alone. If the task needs something Office Scripts cannot do, say so first and propose the closest design (Power Automate for email or files, Power Query for imports).
2. Script: complete TypeScript with a constants block (sheet, table and column names), guards that stop with `console.log` and `return` when a sheet, table or header is missing, columns found by header name, bulk reads and writes, a `DRY_RUN` constant that logs intended changes without writing, and a summary log line. Prefer tables (`getTable`, `addRows`) over raw ranges where the data is tabular. Use parameters and a return type if a flow will pass data.
3. Run it: Automate tab > New Script, paste, save with a clear name, run, and add a button to the sheet if useful. Say where scripts are stored and how to share one with colleagues.
4. Power Automate flow: if a trigger other than a click is needed, the flow: the trigger, the Excel Online (Business) "Run script" action with location, document library, file and script, and how parameters and the return value map. If not needed, say so in one line.
5. Test plan: run with `DRY_RUN = true` on a copy, check the console output, then a real run on the copy, then on the live file, and how to undo (version history).
6. Limits: data size and time limits, behaviour with co-authors editing at the same time, what breaks if names change, and licence or admin requirements.
</task>

<constraints>
- Use only the Office Scripts `ExcelScript` API; do not use VBA objects, the Office.js `Excel.run` add-in pattern, DOM APIs or npm packages.
- Type everything; avoid `any`. Use `let` and `const`.
- No `getValue()` or `setValue()` inside loops over rows.
- Never delete sheets, tables or rows, send email or share files unless the task asks; when it does, make it a clearly named constant that is off by default.
- If you are not sure a method exists in the ExcelScript API, say so rather than inventing it.
</constraints>

<output_format>
## What it will do
## Script
One TypeScript code block.
## Run it
## Power Automate flow
## Test plan
## Limits
</output_format>
