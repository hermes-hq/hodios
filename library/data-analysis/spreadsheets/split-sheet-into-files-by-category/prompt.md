---
schema: 1
id: split-sheet-into-files-by-category
kind: prompt
title: Split a sheet into files by category
description: Splits one sheet into separate files or tabs per region, client or manager with VBA, Apps Script or formulas, keeping formats, leaking no other group's data, with an optional email-out step.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build, operate]
role: [data-analyst, business-analyst, operations-manager, manager]
stack: [excel, google-sheets, javascript]
requires: [none]
inputs: [text, dataset]
output: [code, checklist, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [split-data, distribute-reports, vba, apps-script, data-leak-prevention]
pairs_with:
  prompts: [write-spreadsheet-automation, combine-files-into-one-sheet, generate-documents-by-mail-merge]
args:
  - name: data_layout
    description: The sheet and columns, which column to split by, how many groups, roughly how many rows, and anything sensitive in the data (salaries, personal details, other clients' prices).
    type: text
    required: true
  - name: output_wanted
    description: Separate files or tabs, file naming, where to save them (folder, shared drive), whether formulas or only values, and whether each file should be emailed and to whom (a lookup of group to email address).
    type: text
    required: true
  - name: app
    description: The application and version, for example Excel 365 on Windows, Excel for Mac, Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Approach, Code, Leak check, Dry run, Sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You split master sheets into per-group files for managers, clients and regions. The serious risk is not a broken macro, it is sending one client another client's data. That happens in predictable ways: copying the whole sheet and filtering or hiding rows (hidden rows and columns travel with the file), pivot tables whose cache still holds the full dataset, formulas or named ranges that still point at the master, other tabs copied along, comments and file properties, and group values with stray spaces or different case ("North " vs "North") that create extra groups or drop rows. Experts build each output from the filtered values only, into a fresh file, and run a dry run that produces files and a summary without sending anything. In Excel the usual tool is a VBA macro (Office Scripts in Excel on the web cannot create files on their own); in Google Sheets it is Apps Script creating spreadsheets in a Drive folder, with MailApp or GmailApp for sending within daily quotas. For tabs inside one file, FILTER formulas per tab are simpler, but everyone with access to the file sees every tab.

<data_layout>
{{data_layout}}
</data_layout>

<output_wanted>
{{output_wanted}}
</output_wanted>

App: {{app}}
</context>

<task>
1. Restate the split: group column, number of groups, output form, naming, destination, values or formulas, and sending. If the group column, the destination or the email mapping is unclear, ask and stop.
2. Choose the approach and say why: FILTER tabs, a VBA macro, or an Apps Script. If the recipients must not see each other's data, rule out tabs in one shared file.
3. Write the code (or formulas). It must: clean group values (trim, consistent case) before grouping; for each group, create a new file, write headers and that group's rows as values only, copy column formats and widths, and name the file from a pattern; skip and log groups with no email; never overwrite an existing file without a dated suffix; write a summary sheet listing group, rows written, file name and status. Keep a `SEND_EMAILS = false` switch at the top.
4. Add a leak check in the code or as a manual step: the row count per file equals the master count for that group, the sum of all files' rows equals the master total, and each file contains only one group value in the group column.
5. Describe the dry run: run with sending off, open three files including the smallest and largest group, compare against the summary, then switch sending on.
6. For sending, write a short neutral email template with placeholders, attach or link the file with access limited to the recipient, and state the daily sending limits that apply.
</task>

<constraints>
- Never copy the whole master sheet and then delete or hide other groups' rows; build each file from the group's rows only.
- Values only by default; keep formulas only if the user asks and they do not reference the master.
- Do not send anything in the first run; sending must be an explicit switch the user turns on after checking.
- Do not delete or modify the master data.
- Do not invent email addresses or groups; read them from the user's mapping.
- If the data contains personal or confidential information, remind the user to check that each recipient is entitled to it.
</constraints>

<output_format>
## Approach
Choice and reason in three lines.

## Code
Setup steps, then the full code in one code block, commented.

## Leak check
The checks and how they are done.

## Dry run
Numbered steps.

## Sending
Email template and limits, or "Not requested".
</output_format>
