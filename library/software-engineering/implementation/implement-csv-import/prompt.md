---
schema: 1
id: implement-csv-import
kind: prompt
title: Implement a CSV import
description: Implements a CSV or spreadsheet import with streaming parsing, per-row validation, a downloadable error report, idempotent upserts and progress for large files.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, spec, file]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [csv, bulk-import, streaming, upsert, data-validation, idempotency]
pairs_with:
  prompts: [implement-file-upload, implement-background-job, write-file-parser]
args:
  - name: target_model
    description: 'What each row becomes and its rules, for example "products: sku (unique, required), name, price (decimal, at least 0), stock (integer), category (must exist)". Name the natural key if there is one.'
    type: text
    required: true
  - name: stack
    description: Language, framework, database and background job system, for example "Django, PostgreSQL, Celery".
    type: string
    required: true
  - name: max_rows
    description: The largest number of data rows one file may contain. Larger files are rejected before processing.
    type: number
    default: 100000
  - name: error_policy
    description: skip-invalid-rows imports valid rows and reports the rest; all-or-nothing imports nothing unless every row is valid.
    type: enum
    enum: [skip-invalid-rows, all-or-nothing]
    default: skip-invalid-rows
output_contract:
  format: markdown
  sections: [Column contract, Design, Changes, Tests, Limits and follow-ups]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Imports built in an afternoon break on real files: the whole file is read into memory, then the request times out; a file exported from a European spreadsheet uses semicolons and decimal commas; a UTF-8 byte-order mark ends up in the first header name; quoted fields contain newlines and the code splits on commas; spreadsheet software has turned long ids into scientific notation and dropped leading zeros; headers arrive as "E-mail" instead of "email"; the same file uploaded twice creates every record twice; a failure at row 40,000 leaves half the data in and no record of which half; the error report only says "invalid file"; and the downloadable error report, opened in a spreadsheet, runs a formula a user typed into a cell. A good import streams, validates every row, tells the user exactly which rows failed and why, and is safe to run again.
</context>

<task>
Implement an import for this target:

<target_model>
{{target_model}}
</target_model>

Stack: {{stack}}
Maximum data rows per file: {{max_rows}}
Error policy: {{error_policy}}

1. Inspect the code: the target models and their constraints, existing upload handling and file storage, the background job system, how progress is shown to users elsewhere, and any existing import code to reuse. If there is no natural key to upsert on and none can be inferred, or a rule in the target model is ambiguous, ask and stop.
2. Write the column contract: for each column, the canonical header and accepted aliases (compared case-insensitively, ignoring spaces, dashes and underscores), required or optional, type and format (dates, decimals and booleans, with the locales accepted), length limits, the lookups it needs, and the natural key used for upserts.
3. Intake: accept the file through the existing upload path, check size and type early, store it, create an import record (status, file hash, uploader, counts) and process it in a background job, never in the request. If the same file hash was already imported successfully, warn the user or reuse the earlier result instead of silently importing again.
4. Parse with a mature CSV library in streaming mode; never split lines on commas. Detect or accept the delimiter, strip a byte-order mark, handle quoted newlines, and decode as UTF-8 with a clear error (or a documented fallback) for other encodings. Read spreadsheet files only through a streaming reader for that format, and only if the target model or the existing code calls for them. Stop with a clear message once {{max_rows}} data rows are exceeded.
5. Validate every row and collect all of its errors, not just the first, each with row number, column, the offending value (truncated) and a human-readable message. Also detect duplicates of the natural key within the file.
6. Write in batches inside transactions, upserting on the natural key so re-running the same file creates no duplicates. With skip-invalid-rows, write valid rows and record the invalid ones. With all-or-nothing, run a full validation pass first, then write everything in one transaction or through a staging table, and write nothing if any row fails.
7. Report progress: update rows processed, created, updated and failed on the import record at a sensible interval, and expose it through the app's existing pattern (polling endpoint, websocket or page).
8. Generate the error report as a CSV of the original rows plus an error column. Neutralise cells starting with `=`, `+`, `-`, `@`, tab or carriage return so they cannot run as formulas when opened in a spreadsheet. Serve it only to the user who ran the import or to admins.
9. Write tests with small fixture files: the happy path; a semicolon-delimited file with a byte-order mark; quoted newlines; invalid rows with several errors each; duplicate keys within the file; a file over the row limit; re-importing the same file (no duplicates); the error policy behaviour; and formula neutralisation in the error report. Add one generated large file to show memory stays flat, if the stack makes that practical. Run them and report the real result.
</task>

<constraints>
- Never load the whole file into memory, and never process the file inside the web request.
- Do not log full row contents if rows can contain personal data; log row numbers and counts.
- Keep the column contract in one place in code, so the parser, the validation and any downloadable template all use it.
- Use existing libraries in the project before adding new ones, and ask before adding a dependency.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Column contract
Table: column, aliases, required, type and format, rules.
## Design
Intake, job, parsing, batching and upsert, progress and error report, in a few bullets.
## Changes
One line per file.
## Tests
One line per test and the real result of the run.
## Limits and follow-ups
Known limits (encodings, formats, size) and anything left for later.
</output_format>
