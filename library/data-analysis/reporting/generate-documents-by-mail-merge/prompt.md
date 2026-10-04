---
schema: 1
id: generate-documents-by-mail-merge
kind: prompt
title: Generate personalised documents by mail merge
description: Generates personalised letters, certificates or labels from a spreadsheet and a template as Word or PDF files, previewing three records for approval before the rest. Use for batch documents.
category: reporting
version: 1.0.0
status: incubating
stage: [build, verify]
role: [operations-manager, teacher, support-agent, individual]
requires: [repo-read, file-write, shell]
inputs: [dataset, document]
output: [code, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: optional
level: beginner
tags: [mail-merge, certificates, form-letters, address-labels, batch-documents, pdf-generation]
pairs_with:
  prompts: [generate-docx-report-from-template]
args:
  - name: data_path
    description: Path to the spreadsheet or CSV with one row per recipient and a header row.
    type: string
    required: true
  - name: template_path
    description: Path to the template (.docx with merge fields or placeholders, or an HTML template for PDF), or a description of the label sheet, for example "Avery L7163 labels, 14 per A4 sheet".
    type: string
    required: true
  - name: output_format
    description: Format of the generated files.
    type: enum
    enum: [docx, pdf]
    default: pdf
output_contract:
  format: markdown
  sections: [Data check, Field mapping, Preview, Generation, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A mail merge goes wrong at scale: one blank first name produces "Dear ," three hundred times, a long name overflows the certificate's border, accented names come out as garbled characters, duplicates get two letters, and file names with slashes or spaces break the output folder. Checking a few carefully chosen records before generating everything catches nearly all of it.
</context>

<task>
Generate one {{output_format}} document per recipient from `{{data_path}}` using the template `{{template_path}}`, with a script.

1. Check the data: row count, header names, empty values in fields the template uses, duplicates (same name and address or same id), encoding problems (garbled accented characters), inconsistent case or spacing in names, and values much longer than typical. Report counts; do not change the data file. Ask before excluding any row.
2. Map every template field to a column. List template fields with no column and stop if any are required. Decide formatting for dates, numbers and names (keep names exactly as given unless the user asks for case fixes).
3. For labels, set up the sheet geometry from the label product's published dimensions (page size, margins, label size, pitch, rows and columns) and fill labels in reading order.
4. Choose the file naming scheme, for example `<id>-<last-name>.<ext>`, with characters that are unsafe in file names replaced, and unique even when names repeat.
5. Generate a preview of exactly three records: the first row, the row with the longest values in the template's fields, and a row with accents, apostrophes or other special characters (or the next row if none). Convert to PDF if needed and check that nothing overflows or is cut off.
6. Stop and show the preview files and the data check. Wait for approval before generating the rest.
7. After approval, generate all documents with the same script (individual files, plus one combined PDF if the user wants it for printing). Then verify: the file count equals the approved row count, no output contains a leftover placeholder or an empty greeting, and a random sample of five files matches their rows.
</task>

<constraints>
- Do not send, email, upload or print anything. This task only creates files.
- Treat the data as personal information: do not copy it into the report beyond what the preview needs, and keep outputs in the project folder you were given.
- Do not modify the template or the data file.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Data check
Table: Check | Count | Rows affected (by row number) | Action needed.

## Field mapping
Table: Template field | Column | Format.

## Preview
The three preview files, why each was chosen, and what to look at. Then stop for approval.

## Generation
After approval: output folder, file naming, count, combined file if made.

## Verification
File count against rows, leftover-placeholder scan, sample check, with real results.
</output_format>
