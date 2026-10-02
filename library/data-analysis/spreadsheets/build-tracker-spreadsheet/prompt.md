---
schema: 1
id: build-tracker-spreadsheet
kind: prompt
title: Build a tracker spreadsheet
description: Designs a tracker spreadsheet (projects, applications, habits, inventory, expenses) with dropdowns, conditional formatting, a summary tab and formulas. Use to organise recurring work in a sheet.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, project-manager, operations-manager, job-seeker]
stack: [excel, google-sheets]
inputs: [text, topic]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [trackers, data-validation, conditional-formatting, status-tracking]
pairs_with:
  prompts: [write-spreadsheet-formula, build-pivot-analysis, write-spreadsheet-automation]
  personas: [spreadsheet-expert]
  rules: [spreadsheet-modeling-rules]
args:
  - name: what_to_track
    description: What the tracker is for, who updates it and how often, and what you want to see at a glance (for example "job applications, updated by me a few times a week; I want to see what needs a follow-up").
    type: text
    required: true
  - name: app
    description: Spreadsheet app the tracker will be built in.
    type: enum
    enum: [excel, google-sheets]
    default: google-sheets
output_contract:
  format: markdown
  sections: [Design, Sheets, Columns, Dropdown lists, Conditional formatting, Summary tab, Setup steps, Sample rows]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design trackers that people keep using after the first week. A tracker fails when it asks for too many fields, when free-text entries make it impossible to filter or count, or when nothing on it tells you what to do next. A good one has one row per item, a small set of typed columns, controlled dropdowns for anything you will filter or count, dates you can calculate from, visual cues for what needs attention, and a summary that answers the questions the user actually asks.
</context>

<task>
Design a tracker in {{app}} for:

<what_to_track>
{{what_to_track}}
</what_to_track>

1. Identify the item (one row = one what?), who updates it, how often, and the three to five questions the user wants the tracker to answer (for example "what is overdue?", "how much did I spend per category this month?", "which items are below reorder level?"). If the request does not make the row unit or the purpose clear enough to design columns, ask up to three short questions and stop.
2. Design the main sheet as a single table: a unique ID, the minimum set of columns needed to answer those questions, and nothing speculative. For each column give the data type (date, number, currency, dropdown, checkbox, text, formula) and whether the user types it or a formula fills it. Put calculated columns (days open, next follow-up date, overdue flag, running balance) at the right end and protect or shade them.
3. Define dropdown lists on a separate Lists sheet so they can be edited in one place, with data validation that rejects other values. Keep status lists short and ordered by lifecycle.
4. Write conditional formatting rules as exact custom formulas for {{app}}, applied to the whole row or the relevant column (for example overdue, due this week, done, below reorder level). Pair each colour with a text status so meaning does not depend on colour alone.
5. Design a Summary sheet with exact formulas: counts by status, totals by category or month, overdue items, and one trend if the data supports it. Use functions available in {{app}}: in Google Sheets you may use `QUERY`, `FILTER`, `UNIQUE` and `ARRAYFORMULA`; in Excel prefer a formatted Table with structured references, `COUNTIFS`, `SUMIFS`, `FILTER` and `UNIQUE` (Excel 365), and note a pivot-table alternative for older versions.
6. Give setup steps in click order, including freezing the header row, turning the range into a table or filter view, and any protection.
7. Provide three or four realistic sample rows so the user can test the formulas, clearly marked as sample data to delete.
</task>

<constraints>
- Prefer fewer columns. Every column must serve one of the stated questions; list optional extras separately in one line instead of adding them.
- Formulas must reference whole columns of the table or structured references so new rows are included automatically, and must handle blank rows without errors.
- Use real dates and numbers, never text that looks like a date or number. Dates follow the user's locale if it is evident; otherwise say which date format you assumed.
- Do not include sensitive personal data columns (ID numbers, health details, passwords) unless the user asked for them; if the tracker involves other people's personal data, add a one-line note about keeping access restricted.
- Do not invent the user's categories, budgets or thresholds when they matter; use sensible placeholders and label them as editable.
</constraints>

<output_format>
## Design
One row = …; updated by …; questions the tracker answers (numbered).

## Sheets
A table: sheet | purpose.

## Columns
A table: column | header | type | entered or formula | validation or formula | notes.

## Dropdown lists
Each list with its values in order.

## Conditional formatting
A table: applies to | custom formula | format | meaning.

## Summary tab
A table: cell or block | label | formula | what it answers.

## Setup steps
Numbered click-by-click steps for {{app}}.

## Sample rows
A small Markdown table of sample data, marked for deletion.
</output_format>
