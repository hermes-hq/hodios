---
schema: 1
id: load-data-into-snowflake
kind: prompt
title: Load files into Snowflake
description: Loads files from cloud storage into Snowflake with a storage integration, stage, file format, COPY INTO or Snowpipe, error handling, deduplication and a load audit, as code.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [data-engineer]
stack: [snowflake]
requires: [repo-read, file-write, shell]
inputs: [spec, file, text]
output: [code, checklist]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [copy-into, snowpipe, external-stage, file-format, load-audit]
pairs_with:
  prompts: [bulk-load-data-into-database, design-data-pipeline, reduce-snowflake-costs]
  personas: [data-engineer]
args:
  - name: files
    description: What arrives (format such as CSV, JSON or Parquet, compression, sample rows or schema, file sizes), where it lands (S3, GCS, Azure Blob, path pattern), and how often.
    type: text
    required: true
  - name: requirements
    description: Latency needed (batch or near-real-time), target table, how bad rows should be handled, and how infrastructure is managed (SQL scripts, Terraform, schemachange, dbt).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Approach, Objects, Load and dedupe, Monitoring and audit, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Snowflake loading looks like one `COPY INTO` statement but production loads need more. Access to the bucket should go through a storage integration (cloud IAM role or service principal), not keys pasted into a stage definition. A named file format makes parsing explicit: delimiter, header skip, quoting, null markers, empty-field handling, encoding, date and timestamp formats. COPY keeps 64 days of load metadata per table and skips files it has already loaded, which prevents duplicates on rerun, but `FORCE = TRUE` or re-uploaded files with new names bypass it, and files whose load status is unknown because they fall outside that window are skipped unless `LOAD_UNCERTAIN_FILES = TRUE`. `ON_ERROR` decides whether one bad row fails a file, skips the file, or continues, and `VALIDATION_MODE` or `VALIDATE()` shows rejected rows. Files of roughly 100 to 250 MB compressed load most efficiently; thousands of tiny files waste time and Snowpipe overhead. Snowpipe with event notifications gives near-real-time loading billed serverlessly; batch COPY on a schedule is simpler and often cheaper for hourly or daily files. Semi-structured data can land in a `VARIANT` column, or Parquet can be loaded with `MATCH_BY_COLUMN_NAME`. Adding load metadata columns (`METADATA$FILENAME`, `METADATA$FILE_ROW_NUMBER`, load time) makes auditing and deduplication possible.
</context>

<task>
Files: {{files}}
Requirements: {{requirements}}

1. Read the existing Snowflake objects and infrastructure code in the repo, and follow how the team manages objects. Inspect sample files or the given schema for format details.
2. Choose batch COPY or Snowpipe from the latency need and file pattern, and say why.
3. Write the objects: storage integration (with the cloud-side trust steps listed for the user), stage on the path, named file format with every parsing option explicit, and the target table with load metadata columns.
4. Write the load: `COPY INTO` with a transformation select that adds `METADATA$FILENAME`, file row number and load time, the chosen `ON_ERROR` policy and a pattern filter; or the pipe definition with auto-ingest and the notification setup steps.
5. Handle duplicates beyond load metadata: a downstream merge or dedupe on a business key for re-sent files.
6. Write monitoring and audit: queries on `COPY_HISTORY` or `LOAD_HISTORY` and `VALIDATE()` for rejected rows, Snowpipe status checks, and an alert for files that failed or did not arrive.
7. Test against a dev database and a sample file including a bad row, and report results.
</task>

<constraints>
- Never put cloud access keys or secrets in SQL, stage definitions or the repo; use a storage integration.
- Do not use `FORCE = TRUE` in routine loads; explain when it is acceptable.
- Do not create or alter objects in production yourself; give the scripts.
- Mark cloud-provider-specific steps clearly and do not invent IAM policy names or ARNs; use placeholders.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
Batch or Snowpipe, file sizing advice and why.
## Objects
SQL or infrastructure code blocks with file paths.
## Load and dedupe
COPY or pipe definition and the dedupe step.
## Monitoring and audit
Queries and alerts, plus test results.
## Open questions
Numbered, or "None".
</output_format>
