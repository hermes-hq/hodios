---
schema: 1
id: format-spreadsheet-for-readability
kind: prompt
title: Format a spreadsheet so others can read it
description: Formats a working Excel or Google Sheets file for other readers - number formats, alignment, freeze panes, input versus formula colours, table styles and an index tab - without changing values.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [ship]
role: [data-analyst, financial-analyst, business-analyst, individual]
stack: [excel, google-sheets]
inputs: [text]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [number-formats, cell-styles, freeze-panes, workbook-index, colour-coding]
pairs_with:
  prompts: [write-conditional-formatting-rules, set-up-spreadsheet-printing, set-up-data-validation]
  rules: [spreadsheet-modeling-rules]
args:
  - name: workbook
    description: The tabs and what each holds, who will read or use the file, and what looks wrong today (mixed formats, merged cells, no headers frozen, colours everywhere).
    type: text
    required: true
  - name: conventions
    description: Any house style to follow - fonts, brand colours, negative numbers in brackets, date format, currency, decimal places.
    type: text
  - name: tool
    description: Excel or Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Style guide for this file, Pass by tab, Index tab, Things to stop doing, Final check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You tidy working spreadsheets so other people can read and use them. Readability comes from consistency, not decoration: one number format per kind of quantity (thousands separators, the same decimals, percentages with one decimal, negatives in brackets or with a minus sign, never both), units in headers rather than in cells, numbers right-aligned with their headers right-aligned to match, text left-aligned, and dates in one unambiguous format. Readers need to tell inputs from formulas at a glance; the common convention is blue font for typed inputs, black for formulas and green for links to other sheets, with a light fill for cells users may edit. Merged cells break sorting, filtering and copying; "Center Across Selection" in Excel or simple alignment in Google Sheets does the same job. Frozen header rows and an index tab with links make large files navigable. Formatting must never change values; rounding with a format is display only, while ROUND changes the number.
</context>

<task>
Plan a formatting pass for this workbook in {{tool}}.

<workbook>
{{workbook}}
</workbook>

{{#conventions}}
<conventions>
{{conventions}}
</conventions>
{{/conventions}}

1. Style guide for this file: a short table of formats to apply: currency, counts, percentages, dates, ratios, headers, inputs, formulas, links, checks, notes; with the exact custom number format codes, for example `#,##0;(#,##0);-` for whole amounts with brackets for negatives and a dash for zero, `0.0%`, `yyyy-mm-dd` or the user's date format. Follow the user's conventions where given.
2. Pass by tab: for each tab, the steps in order: remove merged cells and replace with alignment; set header row style and wrap; freeze panes on headers and key columns; set column widths; apply the number formats by column; colour inputs and formulas by the convention; apply a table style or light banding to data tables (Format as Table in Excel, Alternating colours in Google Sheets); hide gridlines on report tabs; add a units line or note where needed.
3. Index tab: a first tab listing each sheet, what it is for, who maintains it, and a link to it: Excel `=HYPERLINK("#'Sheet Name'!A1", "Sheet Name")`; Google Sheets an inserted link to the sheet (Insert > Link > Sheets in this spreadsheet). Add a key explaining the colour convention and a "last updated" line.
4. Things to stop doing: from the description, the habits that cause confusion (merged cells, colour meaning nothing, hard-coded numbers formatted to look like formulas, several date formats, hiding instead of deleting) with the replacement for each.
5. Final check: confirm totals and key outputs are the same before and after, filters and sorting still work, and nothing prints or displays as `####`.
</task>

<constraints>
- Do not change formulas, values or structure beyond unmerging cells and adding the index tab; say which steps the user should run on a copy first.
- Use number format codes valid in {{tool}}; note where Excel and Google Sheets differ.
- Keep colour to a few meaningful uses and make sure meaning does not rely on colour alone (pair it with a key or a label) for readers with colour vision deficiency.
- If the workbook should be restructured (inputs mixed into calculations, no checks), say so in one line and point to modelling rules rather than doing it here.
</constraints>

<output_format>
## Style guide for this file
Table: Element | Format | Code or setting.
## Pass by tab
A numbered list per tab.
## Index tab
Layout and the link formula.
## Things to stop doing
## Final check
</output_format>
