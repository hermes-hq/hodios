---
schema: 1
id: speed-up-batch-job
kind: prompt
title: Speed up a batch job
description: Makes a slow nightly or scheduled batch job fit its window by timing each stage, then fixing row-by-row writes, per-item lookups, full reprocessing and unbounded parallelism, with correctness checks.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, operate]
role: [backend-engineer, data-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, logs, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [batch-processing, bulk-insert, incremental-processing, throughput, job-runtime]
pairs_with:
  prompts: [fix-n-plus-one-queries, optimize-sql-query, speed-up-dataframe-code, move-cron-jobs-to-orchestrator]
  personas: [performance-engineer, data-engineer]
args:
  - name: job
    description: What the job does, its runtime versus its window, data volumes, where it reads and writes, and how it is scheduled.
    type: text
    required: true
  - name: evidence
    description: Job logs with timings, database or API metrics during the run, if any.
    type: text
output_contract:
  format: markdown
  sections: [Result, Stage timings, Bottlenecks, Changes made, Correctness checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Batch jobs get slow in predictable ways as data grows. Rows are written one at a time with a commit each, when bulk inserts, multi-row statements or the database's bulk-load path are tens to hundreds of times faster; each item triggers its own lookup query or API call; the job reprocesses everything every night instead of only what changed since a watermark; the whole input is loaded into memory before processing; or parallelism was added without bounds and now saturates the database or hits a partner's rate limit. Adding workers helps only when the bottleneck is not shared. Speed-ups must not change results: idempotency, ordering, partial-failure handling and reruns after a crash matter more for batch jobs than for requests.
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}
</context>

<task>
Job: {{job}}

1. Time each stage (extract, transform, each lookup, load) on a full or representative run, and record rows processed per stage and resource use of the systems it touches.
2. Name the bottleneck stage and its type: per-row round trips, per-row commits, reprocessing unchanged data, memory pressure, CPU-bound transformation, or a downstream limit.
3. Fix in order of time saved: batch reads into set-based queries or in-list lookups; batch writes with bulk insert or upsert and commits per batch; process incrementally from a watermark or change data; stream in chunks instead of loading everything; parallelise by partition with a bound set to what the downstream systems can take, and keep each partition idempotent.
4. Check correctness on the same input: row counts, checksums or sample comparisons of outputs before and after, rerun after a simulated mid-run failure, and behaviour on an empty run.
5. Report runtime per stage before and after, and the remaining headroom against the window as data grows.
</task>

<constraints>
- Results must be identical to the old job on the same input, or every difference explained and accepted.
- Do not raise parallelism without stating the downstream limit it respects.
- Report measured timings, not estimates.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
One line: total runtime before and after, and window headroom.
## Stage timings
Table: stage | rows | before | after.
## Bottlenecks
Bullets with `path:line`.
## Changes made
The diff summary, one sentence per change.
## Correctness checks
Each check and its result.
</output_format>
