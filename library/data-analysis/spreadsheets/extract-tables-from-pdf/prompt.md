---
schema: 1
id: extract-tables-from-pdf
kind: prompt
title: Extract tables from a PDF
description: Extracts tables from PDF or scanned text into clean CSV, Markdown or JSON, keeps values exactly as printed, flags likely OCR errors and validates totals against the source. Use before analysis.
category: spreadsheets
version: 1.0.0
status: experimental
stage: [build]
role: [data-analyst, financial-analyst, researcher, operations-manager]
requires: [none]
inputs: [document, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [pdf, data-extraction, ocr, csv]
pairs_with:
  prompts: [reconcile-datasets, write-dataframe-transformation]
args:
  - name: source
    description: The text copied or OCR'd from the PDF pages containing the tables, including headers, footnotes and page numbers.
    type: text
    required: true
  - name: output_format
    description: Format for the extracted tables.
    type: enum
    enum: [csv, markdown-table, json]
    default: csv
output_contract:
  format: markdown
  sections: [Tables found, Validation, Issues to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Text copied from PDFs loses table structure: columns run together, multi-line cells split into separate rows, headers span several lines, tables continue across pages with repeated headers, and scanned pages add OCR errors such as O for 0, l for 1 or a dropped decimal point. Financial and statistical tables also carry meaning outside the cells: units in the title ("in thousands of EUR"), negatives in parentheses, footnote markers and subtotal rows. A clean extraction preserves every printed value and proves itself by re-adding the totals.
</context>

<task>
Extract every table from this source as {{output_format}}:
<source>
{{source}}
</source>

1. Find each table and give it a name from its title or caption, with the page if shown.
2. Rebuild the structure: one header row (flatten multi-level headers as "Parent - Child"), one row per record, multi-line cells joined, and tables that continue across pages merged with repeated headers removed.
3. Normalise numbers for machine use: remove thousands separators, turn parentheses into a leading minus sign, keep the decimal places printed, and move units and scale into the column name (for example "revenue_eur_thousands"). Keep "-", "n/a" and blank cells as empty values and list them.
4. Keep footnote markers out of numeric cells and put them in a separate notes column or list.
5. Keep subtotal and total rows, labelled as such in a row-type column, so they can be validated and then filtered out.
6. Validate: recompute every printed total and subtotal (rows and columns) from the extracted values and compare. Report each match and each mismatch with the difference.
7. Flag suspected OCR errors: characters inside numbers, implausible magnitudes, misaligned columns, and totals that fail by an amount that suggests a single misread digit.
</task>

<constraints>
- Never change a printed value to make a total work. Report the mismatch and the likely culprit instead.
- Never fill an empty or unreadable cell with a guess; leave it empty and list it.
- Output each table in a separate fenced block. For csv, use commas, quote fields that contain commas, and put the header in the first line. For json, give an array of objects per table with the column names as keys and numbers as numbers.
- If the source has no recognisable table, or the text is too garbled to rebuild columns reliably, say so and ask for a better copy (for example exported text, a higher-resolution scan or the page image) rather than producing a doubtful table.
</constraints>

<output_format>
## Tables found
For each table: its name, page, row and column count, then the table in a fenced block.
## Validation
A table: table | total checked | printed | recomputed | result (match / mismatch and difference).
## Issues to check
Bullets: empty cells, suspected OCR errors and structural guesses, each with its location.
</output_format>
