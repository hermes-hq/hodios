---
schema: 1
id: add-change-log-to-shared-sheet
kind: prompt
title: Add a change log to a shared sheet
description: Adds last-edited timestamps and a who-changed-what log to a shared Google Sheet or Excel workbook, using built-in history, Apps Script or VBA, and states what each method cannot capture.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, project-manager, data-analyst, manager]
stack: [google-sheets, excel, javascript]
inputs: [text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [audit-trail, edit-history, timestamps, apps-script, on-edit-trigger]
pairs_with:
  prompts: [write-spreadsheet-automation, set-up-data-validation, build-tracker-spreadsheet]
args:
  - name: sheet
    description: The sheet and columns to track (sheet name, header row, which columns matter), how many people edit it and how often.
    type: text
    required: true
  - name: need
    description: What you need to know - when each row was last changed, who changed it, the old and new value, or a full log - and why (accountability, audit, sorting by recency).
    type: text
    required: true
  - name: tool
    description: Google Sheets (consumer or Workspace account, same domain as the editors or not) or Excel (desktop, web, co-authored in OneDrive or SharePoint).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What is already built in, Recommended approach, Script, Install, What it will not capture]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You add change tracking to shared spreadsheets. People often reach for `=NOW()` in a "last updated" column, which recalculates on every edit and shows the current time on every row; a real timestamp must be written as a value by a script. In Google Sheets the `onEdit(e)` simple trigger runs as the person editing, for up to 30 seconds, and fires only for edits made by a user in the sheet: not for changes from formulas, other scripts, imports or the API. `e.oldValue` and `e.value` exist only for single-cell edits, so pastes and fills need different handling. A simple trigger cannot write to a range the editor is not allowed to edit, so a protected log sheet needs an installable on-edit trigger, which runs as the person who installed it. Identifying the editor is reliable only inside the same Google Workspace domain; for consumer accounts and outside editors the email is often blank. In Excel, Office Scripts have no on-edit trigger; the built-in options are Show Changes and version history for files in OneDrive or SharePoint, and a VBA `Worksheet_Change` macro works only in desktop Excel, with `Application.UserName` being a free-text setting rather than a verified identity.
</context>

<task>
Add change tracking for this sheet in {{tool}}.

<sheet>
{{sheet}}
</sheet>

<need>
{{need}}
</need>

1. What is already built in: say what {{tool}} gives without code (Google Sheets version history and Show edit history on a cell; Excel Show Changes and version history), and whether that already meets the need. If it does, say so and stop after the install section of the built-in route.
2. Recommended approach: pick one design and explain it in plain words: a last-updated timestamp column (and optionally last-updated-by) on the edited row, a separate Log sheet with one row per change (timestamp, user if available, sheet, cell or row key, column header, old value, new value), or both.
3. Script: complete code with a configuration block (sheet name, header row, tracked columns by header name, log sheet name). For Apps Script, handle single-cell and multi-cell edits (log each cell of a pasted range up to a limit, noting old values are not available), skip edits to the header and to the log itself, write timestamps with `new Date()`, and identify rows by a key column rather than row number, because rows move when sorted. For VBA, use `Worksheet_Change`, `Application.EnableEvents = False` with error handling that turns it back on, and the same skip rules.
4. Install: exact steps, including whether to use a simple or installable trigger and why, the authorisation prompt the user will see, protecting the log sheet, and how to test with a second account.
5. What it will not capture: the list of gaps for this design (edits made while the script was not installed, formula-driven changes, API or import changes, blank user emails, sorting and row moves, deletions of whole rows) and how version history covers some of them.
</task>

<constraints>
- Never use NOW() or TODAY() as a stored timestamp, and do not suggest iterative-calculation tricks as reliable.
- Do not claim the log is tamper-proof; editors with access to the script or the log can change them. Say what protection is possible.
- Do not collect more personal data than the need requires; if only "when" is needed, do not log email addresses.
- Keep the script fast: read only what the edit touched, append to the log with a single write, and avoid reading the whole sheet on every edit.
- Use V8 Apps Script syntax and current method names; if unsure a method exists in {{tool}}, say so.
</constraints>

<output_format>
## What is already built in
## Recommended approach
## Script
One code block, then a short note on each configuration value.
## Install
Numbered steps.
## What it will not capture
Bullets.
</output_format>
