---
schema: 1
id: bulk-load-data-into-database
kind: prompt
title: Bulk load data into a database
description: Loads millions of rows fast with the engine's bulk path (COPY, LOAD DATA or batched inserts), a staging table, deferred indexes, validation and a load that can resume after failure.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, data-engineer, dba]
stack: [sql]
requires: [repo-read, file-write, shell]
inputs: [file, schema, text]
output: [code, plan]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [bulk-insert, copy-command, staging-table, resumable-load, throughput]
pairs_with:
  prompts: [implement-csv-import, speed-up-batch-job, migrate-database-engine]
  personas: [database-administrator]
args:
  - name: source
    description: What is being loaded (file format, size, row count, encoding, where it lives) and whether it is a one-off or recurring load.
    type: text
    required: true
  - name: target
    description: Target database engine and version, the destination table schema, and whether the table is empty or live with traffic.
    type: text
    required: true
  - name: current_attempt
    description: The current loading code or command and how slow or broken it is, if there is one.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Load script, Validation, Expected throughput, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most slow loads insert one row per statement and commit each one, so the database spends its time on round trips, transaction overhead and index maintenance. The fast path is the engine's bulk interface: `COPY ... FROM STDIN` in Postgres, `LOAD DATA [LOCAL] INFILE` in MySQL (often disabled by `local_infile`), `bcp` or `BULK INSERT` in SQL Server, or multi-row batched inserts through the driver's batch API when the bulk path is unavailable. Loading into an unlogged or plain staging table without indexes, then validating and moving rows into the real table in one set-based statement, keeps bad rows out and lets the target stay online. On an empty target, creating secondary indexes and foreign keys after the load is much faster than maintaining them per row. Common failures: encoding and delimiter mismatches, quoted newlines, empty strings versus NULL, time zones on timestamps, one giant transaction that fills disk or replication lag, and a crash halfway leaving no way to know what loaded.
</context>

<task>
Source: {{source}}
Target: {{target}}
{{#current_attempt}}Current attempt: {{current_attempt}}{{/current_attempt}}

1. Read the target schema and any existing loader code. Inspect a sample of the source (first rows, encoding, delimiter, quoting, null markers, date formats) and list mismatches with the target types.
2. Choose the load path for this engine and say why, including what to do if the bulk command is disabled or the file is not on the database host.
3. Write the load: a staging table with permissive types, the bulk load into it in chunks (by file split or row ranges) with a recorded checkpoint per chunk so a rerun skips finished chunks, then a set-based validate-and-insert (or upsert on the natural key) into the target.
4. If the target is empty or offline: drop or defer secondary indexes, foreign keys and triggers, load, then rebuild them and refresh planner statistics. If it is live: keep indexes, use moderate batch sizes, and throttle to protect replication and other traffic.
5. Write validation: row counts source versus staging versus target, rejected rows written to an error table with reasons, and checks for nulls, ranges and duplicates on the key.
6. Run the loader on a sample against a local or test database, measure rows per second, and extrapolate the full load time.
</task>

<constraints>
- Do not load into a production database yourself, and do not drop indexes, constraints or tables on a live database. Leave those steps for the user to run, with a backup first.
- Keep source parsing explicit: encoding, delimiter, quote, null marker and time zone stated in the code, not left to defaults.
- Never disable constraints without the step that re-enables and re-checks them.
- Use the engine's real syntax for the stated version; if the version is unknown, say which statements depend on it.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
Load path, staging design, index handling and why.
## Load script
Code blocks with file paths.
## Validation
Queries or code, and what passing looks like.
## Expected throughput
Measured sample speed and extrapolated total, or "not measured" with the reason.
## Open questions
Numbered, or "None".
</output_format>
