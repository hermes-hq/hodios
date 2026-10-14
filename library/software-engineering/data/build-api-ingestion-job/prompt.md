---
schema: 1
id: build-api-ingestion-job
kind: prompt
title: Build an API ingestion job
description: Builds a job that pulls a paginated third-party API into raw storage with rate limiting, retries, incremental state, schema drift capture, idempotent writes and alerting.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [data-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [spec, url, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [api-extraction, pagination, rate-limiting, schema-drift, raw-layer, extract-load]
pairs_with:
  prompts: [implement-incremental-extract, design-data-pipeline, integrate-third-party-api]
  personas: [data-engineer]
args:
  - name: api
    description: The API and the endpoints to ingest, its authentication, pagination style, rate limits and any incremental filter (updated_since, cursors), from its documentation.
    type: text
    required: true
  - name: destination
    description: Where raw data lands (object storage, warehouse raw schema), the schedule, and the orchestrator if any.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Design, Code, Tests, Operating notes, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SaaS APIs are the least reliable source a data team has. Pagination differs (page numbers, offsets, opaque cursors, link headers) and offset paging over data that changes during the run skips or duplicates records. Rate limits come as 429 responses with `Retry-After`, as quota headers, or as silent throttling; ignoring them gets the key blocked. Incremental filters such as `updated_since` often have coarse granularity or exclude deletes. Fields appear, disappear and change type without notice, so flattening responses into fixed columns at ingestion time breaks; landing the raw JSON with load metadata and parsing downstream keeps the history and survives drift. Long backfills hit token expiry. Before writing a custom job, check whether an existing connector in the team's tooling (Airbyte, Fivetran, dlt, Singer taps) already covers the API well enough.
</context>

<task>
API: {{api}}
Destination: {{destination}}

1. Read the existing ingestion code and orchestration in the repo and reuse its clients, config and logging patterns. Check whether an existing connector already in use covers this API, and say so if it does.
2. Design: endpoints and their pagination, the incremental filter and its granularity, a lookback overlap, request rate under the documented limit, and how deletes are (or are not) visible.
3. Write the client: authentication with token refresh, a rate limiter, retries with exponential backoff and jitter for timeouts, 429 and 5xx only (honouring `Retry-After`), and no retry on other 4xx.
4. Write the extractor: iterate pages per endpoint, write raw records as JSON lines or the warehouse's semi-structured type with `_extracted_at`, `_endpoint`, request parameters and a batch id, in files or partitions that a rerun overwrites rather than duplicates.
5. Persist incremental state per endpoint and advance it only after the batch is written; support a backfill range parameter.
6. Capture schema drift: record the set of top-level keys per batch and log or alert when new or missing fields appear.
7. Write tests with recorded or mocked responses covering pagination end, a 429 with Retry-After, a token expiry and an empty page. Run them and report.
</task>

<constraints>
- Secrets come from the environment or the secrets manager, never from code, config files in git or logs.
- Respect the provider's documented rate limits and terms; do not suggest ways around them.
- Do not invent endpoint names, parameters or limits. Use what the user gave or the documentation they point to, and list unknowns as questions.
- Do not call the live API with production credentials during development unless the user says to.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Per endpoint: pagination, incremental filter, overlap, rate and deletes.
## Code
Code blocks with file paths.
## Tests
Code blocks and results.
## Operating notes
Schedule, backfill command, alerts, and what to do on drift.
## Open questions
Numbered, or "None".
</output_format>
