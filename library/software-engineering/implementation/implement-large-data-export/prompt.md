---
schema: 1
id: implement-large-data-export
kind: prompt
title: Implement large CSV or Excel exports
description: Implements CSV or Excel export of large datasets with streaming, background generation, expiring download links and formula-injection escaping. Use when users need to export tables or reports.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [csv, file-downloads, data-export, streaming, csv-injection]
pairs_with:
  prompts: [implement-csv-import, implement-background-job, implement-audit-log]
  personas: [backend-engineer]
args:
  - name: export_spec
    description: What is exported (which records and columns), who may export it, expected size in rows, and the formats wanted.
    type: text
    required: true
  - name: stack
    description: Language, framework, database, job queue and file storage. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Design decisions, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer building an export that must work for the largest customer, not just the demo account. What breaks exports:
- Loading every row into memory. Iterate with keyset pagination or a server-side cursor and write rows as you go.
- Request timeouts. Small exports can stream straight to the response; large ones run as a background job that writes to object storage and gives the user an expiring signed link, by email or in-app notification. Pick a row threshold between the two modes.
- Inconsistent data across pages: if rows change during the export, use a single read-only transaction with a consistent snapshot, or keyset iteration on a stable ordered column.
- Authorization: the export must apply exactly the same filters and permissions as the screen it comes from. Exports are a classic way to leak other tenants' rows.
- CSV injection: a cell starting with `=`, `+`, `-`, `@`, a tab or a carriage return can run as a formula when opened in a spreadsheet. Prefix such cells with a single quote (OWASP guidance), and document it.
- CSV format: RFC 4180 quoting for commas, quotes and newlines, UTF-8 with a byte order mark if users open it in Excel, ISO 8601 dates with the time zone stated, numbers without locale formatting.
- Excel: `.xlsx` sheets stop at 1,048,576 rows; use a streaming writer (for example openpyxl write-only mode, Apache POI SXSSF, or a streaming mode in the Node library in use), and split or refuse beyond the limit.
- Limit concurrent exports per user, expire generated files, and log exports of personal data in the audit log.
</context>

<task>
Implement this export:
{{export_spec}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the screen or endpoint the data comes from, its query, filters and authorization, and any existing export, job, storage and notification code.
2. State the design: sync versus async threshold, iteration method, snapshot consistency, file format details, storage location and link lifetime, limits, audit.
3. Implement the export reusing the existing query and authorization, the writer with injection escaping, the background job and download link for large exports, and the UI or endpoint to request it and see its status.
4. Write tests, including a dataset larger than one page and cells that start with formula characters. Run them and the type check.
</task>

<constraints>
- Never build a separate, looser query for exports than the one the screen uses.
- Do not make generated files publicly readable; use expiring signed links or authenticated downloads.
- Never invent library functions; if unsure of a streaming API, say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test: the case it covers.
## Verification
Commands run and their actual results, including memory or time for the large test if measured.
## Open questions
Choices left to the team, with the default chosen.
</output_format>
