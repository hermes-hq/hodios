---
schema: 1
id: set-up-spreadsheet-printing
kind: prompt
title: Set up a spreadsheet to print or export to PDF
description: Sets up a sheet to print or save as PDF cleanly in Excel or Google Sheets - print area, repeated header rows, fit to width, page breaks, orientation, and headers and footers with page numbers.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [ship]
role: [individual, operations-manager, financial-analyst, teacher]
stack: [excel, google-sheets]
inputs: [text]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [page-setup, print-area, pdf-export, page-breaks, print-titles]
pairs_with:
  prompts: [format-spreadsheet-for-readability, build-invoice-template-spreadsheet]
args:
  - name: sheet
    description: What the sheet looks like - rough number of rows and columns, which columns must print, header rows, helper columns to leave out, and what goes wrong today (cut-off columns, tiny text, headers only on page 1).
    type: text
    required: true
  - name: goal
    description: What the printout or PDF is for and its paper size (A4, Letter), whether it is a one-off or repeated each month as data grows.
    type: text
    required: true
  - name: tool
    description: Excel (Windows, Mac or web) or Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Layout decision, Setup steps, Headers and footers, Growing data, Preview checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set spreadsheets up to print and export to PDF properly. Bad printouts come from a few causes: no print area, so helper columns and stray cells print; column headers that appear only on page 1; "fit sheet on one page" shrinking a long table to unreadable text, when the right setting is fit all columns to one page wide and let the rows run onto as many pages as needed; automatic page breaks splitting a group in half; and wide tables printed in portrait. In Excel, print titles (rows to repeat at top) live in Page Layout > Print Titles, scaling in Page Layout > Scale to Fit, and Page Break Preview lets you drag breaks. In Google Sheets the print dialog (File > Print) holds the scope, paper size, scale ("Fit to width"), margins, custom page breaks and headers and footers, and frozen rows can be repeated on each page. A print area that must grow with the data can be a dynamic name in Excel; in Sheets, printing a selection or a dedicated print tab is the usual answer.
</context>

<task>
Set up printing for this sheet in {{tool}}.

<sheet>
{{sheet}}
</sheet>

<goal>
{{goal}}
</goal>

1. Layout decision: orientation, paper size, scaling (for example fit all columns on one page wide, rows automatic), and whether text will stay readable. If the columns cannot fit readably on one page wide, say so and suggest hiding helper columns, a narrower print version on its own tab, or landscape on a larger paper size.
2. Setup steps: exact clicks for {{tool}}: set the print area (or selection), repeat header rows on every page, scaling, margins and centring, gridlines on or off, and page breaks so groups are not split (Page Break Preview in Excel, custom page breaks in Google Sheets).
3. Headers and footers: what to put where - title or sheet name, date printed, "Page X of Y", file name - with the codes for Excel (`&[Page]`, `&[Pages]`, `&[Tab]`, `&[File]`, `&[Date]`) or the Google Sheets options.
4. Growing data: if the report is repeated as data grows, how to avoid resetting the print area each time: in Excel, edit the `Print_Area` name in Name Manager to a formula such as `=INDEX(Sheet1!$A:$A,1):INDEX(Sheet1!$H:$H, COUNTA(Sheet1!$A:$A))` (and note that using Set Print Area again overwrites it) or format the data as a table and print the table; in Google Sheets, a print tab that pulls the data with a formula, or printing the current sheet with frozen header rows.
5. Preview checklist: what to check in Print Preview before sending: last column on page 1, headers on page 2, page count, no blank trailing pages, no `####` from narrow columns, and the PDF opened once on screen.
</task>

<constraints>
- Give steps only for the stated tool; menu names differ between Excel on Windows, Mac and the web, so say which one the steps are for and what to look for if a label differs.
- Do not recommend shrinking to one page if text would fall below a readable size; suggest a layout change instead.
- Do not alter the user's data or formulas; changes are to page setup, hidden helper columns or a separate print tab.
</constraints>

<output_format>
## Layout decision
Two or three sentences.
## Setup steps
Numbered steps with menu paths.
## Headers and footers
Table: Position | Content | Code or option.
## Growing data
## Preview checklist
Checklist.
</output_format>
