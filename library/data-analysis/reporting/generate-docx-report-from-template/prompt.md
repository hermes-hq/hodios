---
schema: 1
id: generate-docx-report-from-template
kind: prompt
title: Fill a Word report template from data with a script
description: Fills a Word report template from data or analysis output with a script, keeping its styles, tables, headings and figure captions, and checks that no placeholder remains. Use for recurring reports.
category: reporting
version: 1.0.0
status: incubating
stage: [build, verify]
role: [data-analyst, operations-manager, business-analyst]
requires: [repo-read, file-write, shell]
inputs: [document, dataset]
output: [code, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [docx-generation, report-template, document-automation, placeholders]
pairs_with:
  prompts: [design-report-template, automate-recurring-report, build-report-deck-from-analysis]
  workflows: [data-report-build-track]
args:
  - name: template_path
    description: Path to the Word template (.docx or .dotx) with placeholders, merge fields or content controls.
    type: string
    required: true
  - name: data_path
    description: Path to the data or analysis output that fills it (JSON, CSV, Excel or a results folder with chart images).
    type: string
    required: true
  - name: output_path
    description: Where to write the filled report. It must not be the template's own path.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Placeholders, Mapping, Build script, Checks, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Word templates look simple and are not. A placeholder that reads as a single tag on screen is often split across several runs in the document XML because of spell-check marks or formatting, so a plain find-and-replace misses it. Placeholders hide in headers, footers, footnotes, text boxes and tables. Inserting text with direct formatting breaks the template's styles, building tables from scratch loses their design, and figures inserted without real caption fields leave the list of figures and cross-references broken.
</context>

<task>
Fill the template at `{{template_path}}` with the data at `{{data_path}}` and write the report to `{{output_path}}`, using a script.

1. Inspect the template: list every placeholder and where it is (body, tables, headers, footers, footnotes, text boxes), its syntax (for example Jinja-style tags, merge fields, content controls, or custom tokens), repeating sections such as table rows or per-item blocks, conditional blocks, image slots, and the styles the template defines for headings, body, tables and captions.
2. Inspect the data and map each placeholder to a field or computed value. List placeholders with no data and data with no placeholder. If a required placeholder has no data, stop and report it rather than filling it with an empty string.
3. Choose the approach from the template's syntax: a templating library that understands the document format (for example docxtpl or python-docx for Python, docx-templates or docxtemplater for JavaScript), or the format's own merge mechanism. Handle placeholders split across runs.
4. Fill the template:
   - Text: insert into the existing runs so the template's character and paragraph styles apply; no direct formatting.
   - Tables: repeat the template's row for each record, keeping its style; format numbers, dates and currency consistently, with the locale the template uses.
   - Headings and sections: use the template's heading styles so the table of contents works.
   - Figures: insert images at the template's slots at a width that fits the text column, with alt text, and with a caption paragraph in the Caption style using a figure number field so numbering and lists of figures update.
   - Fields such as the table of contents and page numbers: mark them to update on open, and say so.
5. Validate the output: reopen it and scan every part of the document (body, headers, footers, footnotes, endnotes, text boxes, comments) for any remaining placeholder pattern or template marker; confirm repeated rows equal the record count; confirm every image is present. If a local office suite is available, convert to PDF and check the page layout.
</task>

<constraints>
- Never modify the template file. Never write the output over the template path.
- Use the data as given; do not round, rename or recompute values unless the template's format requires it, and say where you did.
- If a value contains characters that the document format treats specially, escape them so they appear as written.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Placeholders
Table: Placeholder | Location | Kind (text, row, block, image, condition).

## Mapping
Table: Placeholder | Data field or computation | Format.

## Build script
Where it is, the library used, and the command to rerun it.

## Checks
Leftover-placeholder scan result per document part, row counts, images, layout check.

## Verification
Commands run, real results, and the output path.
</output_format>
