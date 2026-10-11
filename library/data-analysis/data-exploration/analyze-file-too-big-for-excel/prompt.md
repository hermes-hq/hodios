---
schema: 1
id: analyze-file-too-big-for-excel
kind: prompt
title: Analyse a file too big for Excel
description: Analyses a CSV or Excel file too large for a spreadsheet using DuckDB, Polars or chunked pandas, with load checks, sanity counts and the summary tables you asked for.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, business-analyst, financial-analyst, researcher]
stack: [python, sql]
requires: [none]
inputs: [file, text]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [large-files, duckdb, polars, csv, row-limit]
pairs_with:
  prompts: [explore-dataset, translate-spreadsheet-to-pandas, process-large-file-in-streaming]
args:
  - name: file_details
    description: File type, approximate size and row count, the first 10 to 20 lines (headers and sample rows, with personal data removed), delimiter and encoding if known, and whether there are several files.
    type: text
    required: true
  - name: questions
    description: What you want out of it, for example "total sales by month and region" or "how many unique customers, and the top 20 by spend".
    type: text
    required: true
  - name: setup
    description: Your computer (operating system and memory) and what you can install or already have (Python, R, a SQL tool). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Setup, Load and check, Analysis, Export for Excel, If it fails]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people whose file stopped fitting in a spreadsheet: Excel stops at 1,048,576 rows and loads only the first part of a larger CSV, behind a warning that is easy to dismiss, and Google Sheets caps a whole spreadsheet at 10 million cells. The best tool for most of these jobs is DuckDB, which runs SQL directly on CSV, Parquet and Excel files without loading everything into memory, and works from Python or its own command line; Polars with lazy scanning is the other good option; pandas with chunksize works but makes aggregation by key harder. Most problems come from loading, not analysis: a wrong delimiter or encoding, a type guessed from the first rows that breaks later (IDs with leading zeros read as numbers, a "N/A" in a numeric column), quoted fields with line breaks, and a footer or totals row. Results usually need to go back into Excel, so they should be small summary tables.
</context>

<task>
Help me analyse this file.

<file_details>
{{file_details}}
</file_details>

<questions>
{{questions}}
</questions>

{{#setup}}My setup: {{setup}}{{/setup}}

1. Recommend one approach (DuckDB from Python or its command line, Polars lazy, or chunked pandas) for this file and setup, and say why in two sentences.
2. Give install and setup steps for that approach, short and for the stated operating system.
3. Write the load step with explicit options suited to the sample: delimiter, header, encoding, quote handling, and column types for IDs, dates and amounts (read IDs as text). Convert to Parquet if the file will be queried more than a few times.
4. Write load checks: row count compared with a line count of the file, columns and types, NULL counts per column, rows that failed to parse, min and max of dates and amounts, duplicate rows on the likely key.
5. Write the analysis that answers each question as a separate, commented query or code block producing a summary table.
6. Show how to export the results to CSV or Excel at a size Excel can open.
7. List likely errors (memory, encoding, type) and the fix for each.
</task>

<constraints>
- Do not suggest opening the full file in Excel or Google Sheets, or splitting it into many spreadsheets, as the answer.
- Read identifier columns as text so leading zeros survive; say so.
- Base types and options on the sample lines; if the sample is not enough to tell (delimiter, date format), say what to check.
- Keep the original file unchanged; write outputs to new files.
- Do not invent column names; use those in the sample.
</constraints>

<output_format>
## Approach
The tool chosen and why.

## Setup
Numbered install and start steps.

## Load and check
A code block for loading and one for the checks, with what each result should look like.

## Analysis
One code block per question with a one-line explanation.

## Export for Excel
The export code and the expected size of each output.

## If it fails
A short table: symptom, cause, fix.
</output_format>
