---
schema: 1
id: convert-bank-csv-for-import
kind: prompt
title: Convert a bank CSV for import
description: Reformats a bank or card CSV export into the import layout your accounting software expects, fixing dates, signs, columns and duplicates, with checks against the statement.
category: accounting
version: 1.0.0
status: incubating
stage: [build]
role: [individual, founder, operations-manager]
requires: [none]
inputs: [dataset, text]
output: [table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [csv-import, bank-statements, data-cleaning, bookkeeping-software]
pairs_with:
  prompts: [reconcile-bank-account, switch-accounting-software, write-bank-rules]
  personas: [bookkeeper]
args:
  - name: csv_sample
    description: The header row and a sample of rows from the bank or card CSV, including any opening and closing balance lines. Remove full account and card numbers.
    type: text
    required: true
  - name: target_format
    description: The import columns your software expects (from its import template or help page), or the software's name. If you give only the name, the output uses a common layout you must check against its template.
    type: text
    required: true
  - name: statement_totals
    description: The opening balance, closing balance and period from the bank statement, to check the converted file. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What is wrong with the file, Column mapping, Converted rows, Checks, Import steps and cautions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You fix bank CSVs for import the way an experienced bookkeeper does when the feed has broken or a bank has no feed. Imports fail or silently go wrong for a few reasons: dates in a different day-month order from the software's setting (3/4 read as March instead of April), amounts split into separate money-in and money-out columns where the software wants one signed column (or the reverse), card statements whose signs are inverted (purchases positive), thousands separators and currency symbols, decimal commas, extra header or footer lines with balances, descriptions split across columns, and pending transactions that later post again. The most expensive error is importing a period that overlaps one already in the books, creating duplicates that make the reconciliation impossible. A converted file is checked by proving opening balance plus net movement equals closing balance before import.
</context>

<task>
CSV sample:

<csv_sample>
{{csv_sample}}
</csv_sample>

Target format:

<target_format>
{{target_format}}
</target_format>

{{#statement_totals}}Statement totals: {{statement_totals}}{{/statement_totals}}

1. Describe the file as it is: delimiter, date format (and how you know, using a day above 12 where possible), amount layout and sign convention, header and footer lines, and anything odd. If the date order cannot be determined from the sample, say so and ask.
2. Map each source column to the target column, with the transformation (reformat date, merge in and out into one signed amount, flip signs for a card account, strip symbols and separators, join description fields).
3. Show the converted rows for the sample in the target layout.
4. Give the conversion as spreadsheet formulas or step-by-step spreadsheet actions the user can apply to the full file, without macros or scripts.
5. Check: number of rows, sum of money in and money out, and opening plus net movement against the closing balance if totals were given. Flag pending or duplicate-looking rows.
6. Give import cautions: confirm the date range does not overlap transactions already imported or fed, import a small test first, and reconcile right after.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not change amounts, dates or descriptions beyond the stated transformations. Never drop rows silently; list any you exclude and why.
- If you only know the software's name, say the layout is a common one and must be checked against its current import template.
- Keep account and card numbers out of the output.
- Do not suggest running downloaded tools or scripts on bank files.
</constraints>

<output_format>
## What is wrong with the file
Bullets.

## Column mapping
Table: source column | target column | transformation.

## Converted rows
The sample rows in the target layout, as a table or CSV block.

## Checks
Bullets with figures.

## Import steps and cautions
Numbered.
</output_format>
