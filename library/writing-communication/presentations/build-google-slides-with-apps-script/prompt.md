---
schema: 1
id: build-google-slides-with-apps-script
kind: prompt
title: Build Google Slides from a Sheet with Apps Script
description: Writes a Google Apps Script that creates or refreshes a Google Slides deck from a Google Sheet, filling template placeholders, tables and linked charts so recurring decks update themselves.
category: presentations
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, operations-manager, manager, business-analyst]
stack: [javascript, google-sheets]
requires: [none]
inputs: [text, dataset]
output: [code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [apps-script, google-slides, recurring-deck, template-placeholders, automation]
pairs_with:
  prompts: [write-spreadsheet-automation, migrate-deck-to-new-template, proofread-slide-deck]
  personas: [presentation-designer]
args:
  - name: job
    description: What the script should do, such as build one slide per region from a Sheet, or refresh the numbers in last month's deck, and how often.
    type: text
    required: true
  - name: sheet_layout
    description: The Sheet's tab names, header row and a few sample rows (made-up values are fine), plus any charts in the Sheet.
    type: text
    required: true
  - name: template
    description: How the template deck is set up, such as placeholder text like <<region>> on slides, layout names or a template slide to duplicate. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Script, Setup, Test plan, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write Google Apps Script that turns Sheets data into Google Slides. The reliable pattern is template-driven: keep a template deck whose slides contain placeholder tokens (for example `<<region>>`, `<<revenue>>`; any delimiter that never occurs in real text works), copy the template with `DriveApp.getFileById(id).makeCopy(name)`, then use `SlidesApp.openById(copyId)` and `replaceAllText` on the presentation or on individual slides, duplicating a template slide per row when the deck repeats. Charts should be inserted with `insertSheetsChart` (linked, refreshable with `refresh()`) or `insertSheetsChartAsImage` when the copy must be frozen. Read Sheet data once with `getDataRange().getValues()` and map columns by header name, not by position, so a moved column does not silently fill wrong numbers. Format numbers in the script (or use `getDisplayValues()`) because raw values come out unformatted. Never edit the template itself. Apps Script has execution time limits (about six minutes for most accounts), and large decks should be built in batches. The script needs authorisation for Slides, Drive and Sheets scopes, which the user approves on the first run.

Job: {{job}}

Sheet layout:
{{sheet_layout}}
{{#template}}Template: {{template}}{{/template}}
</context>

<task>
1. Restate the job and choose the approach: copy a template and replace placeholders, duplicate a template slide per row, refresh linked charts in an existing deck, or a mix. Say why.
2. List the IDs and names the user must supply (template deck ID, Sheet ID, tab names, output folder) as constants at the top of the script.
3. Write the script in V8 syntax with small named functions: read and map data by header, copy the template, fill text, build or update tables, insert or refresh charts, remove the unused template slide, and log a summary.
4. Format numbers, currencies, percentages and dates explicitly, with the locale stated.
5. Validate input before writing: missing headers, empty rows, placeholders left unreplaced after the run (search the deck for `<<` and log any).
6. Add a menu item via `onOpen` in the Sheet if the user will run it by hand, or explain a time-driven trigger if it is recurring.
7. Give setup steps, the scopes that will be requested, and a test plan using a copy.
</task>

<constraints>
- Never modify or delete the template deck or the source Sheet; write to a copy.
- Do not hard-code real IDs, emails or data; use clearly named constants.
- Use only documented SlidesApp, SpreadsheetApp and DriveApp methods; if something is not supported (for example a chart type or a specific table style), say so instead of guessing an API.
- Keep the script under the execution time limit for the stated data size, or batch it and say how.
</constraints>

<output_format>
## Approach
Two to four sentences.

## Script
One `javascript` code block with the complete script.

## Setup
Numbered steps: template placeholders, constants to fill, first run and authorisation, trigger or menu.

## Test plan
Steps to test on a copy, including a deliberately missing value.

## Limits
Bullets: quotas, unsupported formatting, what to check by eye.
</output_format>
