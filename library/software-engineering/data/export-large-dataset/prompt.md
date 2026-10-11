---
schema: 1
id: export-large-dataset
kind: prompt
title: Export a large dataset from a database
description: Exports a large table or query result to CSV or Parquet by streaming in key-ordered chunks from a consistent snapshot, with explicit types, checksums and a manifest the receiver can verify.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [data-engineer, backend-engineer, dba]
stack: []
requires: [repo-read, file-write, shell]
inputs: [schema, text]
output: [code, plan]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [data-export, parquet, csv, streaming, snapshot-consistency, checksums]
pairs_with:
  prompts: [implement-large-data-export, plan-data-archival, bulk-load-data-into-database]
  personas: [data-engineer]
args:
  - name: what_to_export
    description: The table or query, the database engine and version, approximate size, and whether the source is under live traffic.
    type: text
    required: true
  - name: destination
    description: Who or what receives the export and where it goes, for example a partner over SFTP, an S3 bucket for a warehouse, or another team's laptop.
    type: text
    required: true
  - name: format
    description: Output format.
    type: enum
    enum: [csv, parquet, jsonl, ask]
    default: ask
output_contract:
  format: markdown
  sections: [Plan, Export code, File layout and manifest, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A big export usually fails one of four ways. The client loads the whole result into memory (the default for many drivers, which buffer every row unless you use a server-side cursor or streaming mode). `OFFSET` pagination gets slower with every page and skips or repeats rows while the table changes. Chunks read at different times give an inconsistent picture across tables. And the receiver cannot tell whether the file is complete. The fixes are known: stream with a server-side cursor or the engine's native export (`COPY TO`, `UNLOAD`, `EXPORT DATA`), chunk by ranges of an indexed key, read inside one repeatable-read snapshot or from a replica or backup, and ship a manifest with row counts and checksums. Format matters: CSV loses types and needs explicit quoting, null and encoding rules, while Parquet keeps types and compresses well but needs care with decimals, time zones and very large row groups. Exports often contain personal data, so the destination's access controls matter as much as the code.
</context>

<task>
Export: {{what_to_export}}
Destination: {{destination}}
Format: {{format}} (if "ask", recommend one from the destination and say why)

1. Read the schema and any existing export code. Note the column types that need care (decimals, timestamps with and without time zone, binary, JSON, very long text) and whether personal data is included.
2. Choose the read path: the engine's native export or a server-side cursor, from a replica, snapshot or backup if the primary is busy, inside one consistent snapshot when several tables must match.
3. Chunk by an indexed key range (never `OFFSET`), with a chunk size that keeps memory flat, and write one file per chunk with a deterministic name so a failed chunk can be redone alone.
4. Write the export code with explicit format settings: for CSV the delimiter, quoting, header, null marker, encoding and time zone; for Parquet the schema, compression, row group size and timestamp unit.
5. Write a manifest: files, row counts, byte sizes, checksums, the snapshot time and the query, and compute the totals against a source count.
6. Run it on a small slice locally or against a test database, check memory stays flat, and estimate total time.
</task>

<constraints>
- Do not run the full export against a production primary yourself. Prepare it for the user to run, and default to a replica or backup.
- Do not remove columns or rows to make the export easier without saying so; list any type conversions that lose information.
- If the export contains personal data, say so, include only the columns the receiver needs, and note that the transfer and storage need the owner's approval.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Plan
Read path, snapshot, chunking, format and why.
## Export code
Code blocks with file paths.
## File layout and manifest
File naming and a sample manifest.
## Verification
Checks run, memory observation and estimated total time.
## Open questions
Numbered, or "None".
</output_format>
