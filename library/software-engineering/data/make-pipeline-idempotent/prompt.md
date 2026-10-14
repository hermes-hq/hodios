---
schema: 1
id: make-pipeline-idempotent
kind: prompt
title: Make a data pipeline idempotent
description: Fixes an existing pipeline that double-counts or drops data on rerun by keying each run to its data interval and switching appends to partition overwrites or merges, then proves it with a rerun test.
category: data
version: 1.0.0
status: incubating
stage: [maintain]
role: [data-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, logs, text]
output: [diff, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [idempotency, reruns, partition-overwrite, merge-upsert, duplicates]
pairs_with:
  prompts: [design-data-pipeline, debug-failed-pipeline-run, data-backfill-track]
  personas: [data-engineer]
args:
  - name: pipeline
    description: Where the pipeline code lives, what it reads and writes, how it is scheduled, and what goes wrong on rerun (duplicates, gaps, wrong totals).
    type: text
    required: true
  - name: platform
    description: Orchestrator and storage, for example "Airflow writing to BigQuery" or "cron job inserting into Postgres".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Why reruns break, Changes, Rerun test, Cleanup of existing damage, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A pipeline is idempotent when running it twice for the same input gives the same output as running it once. Most pipelines that fail this test have one of a few causes: they `INSERT` or append without a key, so retries duplicate rows; they compute the window from the current time (`now() - 1 day`), so a rerun next week processes the wrong day; they write in several steps without a transaction, so a crash leaves half a result; they read a source that has changed since, so a rerun gives different numbers; or they generate random ids or timestamps during processing. The fixes are standard: derive the window from the run's logical date or parameters, write by replacing the exact partition or slice the run owns (delete then insert in one transaction, `INSERT OVERWRITE`, dynamic partition overwrite, `replaceWhere`), or merge on a deterministic business key; make ids deterministic (a hash of the natural key); and write to a staging location then swap atomically. Side effects such as emails or API calls need their own deduplication.
</context>

<task>
Pipeline: {{pipeline}}
Platform: {{platform}}

1. Read the pipeline code, its scheduling and the target tables. For each step, write down what it reads, how it chooses its window, how it writes, and what happens if it runs twice or stops halfway.
2. Name every cause of non-idempotence found, with file and line.
3. Change the code with the smallest set of edits: take the window from the run's logical date or parameters, write by overwriting the owned partition or slice or by merging on a deterministic key, wrap multi-step writes in a transaction or a staging-and-swap, and replace random or time-based ids with deterministic ones.
4. Deduplicate or guard external side effects separately, or list them as remaining risks.
5. Write a rerun test: run the pipeline (or its core function) twice for the same interval on test data and assert identical results; also run it after a simulated mid-run failure. Run the test and report.
6. Write a one-off query to find and remove duplicates or fill gaps already caused, for the user to review and run with a backup.
</task>

<constraints>
- Do not run cleanup or reruns against production tables yourself.
- Keep the change scoped to idempotence; note other issues at the end.
- Do not switch storage formats or orchestrators to achieve this unless there is no other way, and say so if so.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Why reruns break
Each cause with file and line.
## Changes
Diff or code blocks with file paths.
## Rerun test
Test code and real results.
## Cleanup of existing damage
Queries for the user to review and run, with a backup step.
## Open questions
Numbered, or "None".
</output_format>
