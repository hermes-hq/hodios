---
schema: 1
id: process-google-form-responses
kind: prompt
title: Set up a Google Form responses sheet
description: Sets up a Google Form responses spreadsheet so lookups, calculated columns and a summary tab keep working as new responses arrive, without editing or sorting the raw responses tab.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, teacher, project-manager, individual]
stack: [google-sheets]
requires: [none]
inputs: [text]
output: [code, plan, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
depth: specific
tags: [google-forms, form-responses, arrayformula, live-summary, sign-ups]
pairs_with:
  prompts: [build-sheets-dashboard, set-up-data-validation, analyze-survey-results]
args:
  - name: form_and_sheet
    description: What the form collects (each question and its type - short answer, multiple choice, checkboxes, date), the responses tab name and column letters, and how many responses you expect.
    type: text
    required: true
  - name: what_you_need
    description: What you want the sheet to do - calculated columns (age from date of birth, a price per option), lookups from another tab, status columns people fill in by hand, a summary or dashboard, notifications.
    type: text
    required: true
  - name: current_problem
    description: Optional. What is going wrong now, for example "formulas stop at row 40" or "my status column no longer lines up after someone sorted".
    type: text
output_contract:
  format: markdown
  sections: [Sheet structure, Formulas, Manual columns, Summary tab, Rules for everyone, Fixing what broke]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up spreadsheets behind Google Forms for schools, clubs, events and small teams. A linked responses tab behaves differently from a normal sheet: each new response is written as a new row at the bottom, so formulas typed in extra columns and filled down stop at the last row they were filled to, and references that point at fixed cells can shift. Sorting or filtering the responses tab in place, or inserting columns into it, is the usual way people break things. If respondents can edit their answers, the row updates in place. Renaming a question renames its column header; new questions add columns at the right; deleting a question leaves its column. Checkbox answers arrive joined with a comma and space. The robust pattern is: leave the responses tab untouched, read it from other tabs with open-ended ranges (`'Form Responses 1'!A2:A`), put calculated columns in one ARRAYFORMULA per column placed in the header row, and keep hand-entered columns (status, notes) keyed to a stable ID so they do not drift when rows move.

<form_and_sheet>
{{form_and_sheet}}
</form_and_sheet>

<what_you_need>
{{what_you_need}}
</what_you_need>
{{#current_problem}}

<current_problem>
{{current_problem}}
</current_problem>
{{/current_problem}}
</context>

<task>
1. Propose the tab structure: the raw responses tab (untouched), a working tab that mirrors the responses with calculated columns, a lookup tab if needed, and a summary tab. Say which tabs people may edit.
2. Write the mirror and calculated columns: either a single array formula that brings over the raw columns, or open-ended references; each calculated column as one formula in the header row (for example `={"Age"; ARRAYFORMULA(IF(A2:A="",, DATEDIF(D2:D, A2:A, "Y")))}`) so it fills for every new row automatically. Use XLOOKUP or VLOOKUP inside ARRAYFORMULA for lookups.
3. Handle hand-entered columns safely: give each response a stable ID (the timestamp plus the email, or a generated ID column), keep manual columns on a separate tab keyed to that ID, or explain the trade-off if the user insists on typing next to the responses.
4. Build the summary tab with COUNTIF, COUNTIFS, QUERY or a pivot table on the working tab, using open-ended ranges, and handle checkbox answers (point to splitting them if counts per option are needed).
5. Give the rules for everyone who uses the sheet: do not sort or insert columns in the responses tab, use filter views instead of filters, do not delete response rows (remove them in the form if needed, or mark them as excluded).
6. If a current problem was described, diagnose it and give the repair steps, including how to restore a sorted or broken tab from version history.
</task>

<constraints>
- Google Sheets only; use functions that exist there. Use English-locale commas and note that some locales use semicolons.
- Never tell the user to edit, sort or insert columns in the linked responses tab.
- Do not rely on row position to link manual notes to responses unless the user accepts the risk.
- Use an `IF(A2:A="",,…)` guard in array formulas so blank rows stay blank.
- If personal data (names, emails, dates of birth, health information) is collected, remind the user to limit sharing of the sheet and keep only what they need.
</constraints>

<output_format>
## Sheet structure
Tabs, what each holds, who may edit.

## Formulas
Each formula with its tab and cell in a code block.

## Manual columns
How hand-entered columns stay aligned.

## Summary tab
Formulas or pivot steps.

## Rules for everyone
Five or fewer bullets to paste into the sheet.

## Fixing what broke
Diagnosis and steps, or "Nothing reported".
</output_format>
