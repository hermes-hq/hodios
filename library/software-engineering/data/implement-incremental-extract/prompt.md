---
schema: 1
id: implement-incremental-extract
kind: prompt
title: Implement an incremental extract
description: Implements incremental extraction from a database or API with a high-water mark, overlap window, tie-breaker, delete detection and safe replay, when log-based CDC is not available.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [data-engineer, backend-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [schema, spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [high-water-mark, incremental-load, delete-detection, extract-load, replay]
pairs_with:
  prompts: [design-change-data-capture, build-api-ingestion-job, make-pipeline-idempotent]
  personas: [data-engineer]
args:
  - name: source
    description: The source table or endpoint, its columns for modification time and keys, how rows change (updates in place, soft or hard deletes), and the source engine.
    type: text
    required: true
  - name: target
    description: Where the data lands and how often the extract runs.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Approach, Code, State and replay, Tests, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Query-based incremental extraction looks simple (select rows with `updated_at` greater than last time) and loses data in quiet ways. Transactions commit after their timestamp, so a row stamped 10:00:01 can become visible after the extract that read up to 10:00:05 has finished; an overlap window that re-reads the last few minutes, plus idempotent upserts on the key, covers that. Many rows can share one timestamp, so paging by `updated_at > x` skips rows at a page boundary unless the cursor is the pair (`updated_at`, primary key). Not every write path bumps `updated_at` (bulk updates, triggers, admin scripts), which needs checking in the source code. Hard deletes are invisible to the query: you need soft deletes, a periodic key comparison, or log-based CDC. Clock and time zone differences between source and extractor shift the window. The watermark must be saved only after the batch is safely written, or a crash skips data.
</context>

<task>
Source: {{source}}
Target: {{target}}

1. Read the source schema and, where available, the code that writes to it. Check that the modification column is indexed and is set on every write path, including bulk updates; list any path that skips it.
2. Design the cursor: (`updated_at`, primary key) as a compound high-water mark, read in pages ordered by both, with an overlap window sized to the longest likely transaction and clock skew, using the source's clock rather than the extractor's.
3. Write to the target with upserts on the key so the overlap is harmless, and record load metadata (extracted at, batch id).
4. Store state durably (a state table or the orchestrator's state store) and update it only after the target write commits.
5. Handle deletes: soft-delete flags, a scheduled full key comparison that marks missing keys as deleted, or a clear statement that deletes are not captured and log-based CDC is needed.
6. Support replay: a parameter to reset the watermark to a time and re-extract safely, and a first-run full load path.
7. Write tests with rows sharing a timestamp across a page boundary, a late-committed row, an update and a delete. Run them and report.
</task>

<constraints>
- Read-only against the source. Use a replica where one exists and keep queries index-friendly.
- Never advance the watermark before the write succeeds.
- Do not claim deletes are captured if the design cannot see them.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
Cursor, overlap, write mode, delete handling and why.
## Code
Code blocks with file paths.
## State and replay
Where state lives, how to replay and how the first run works.
## Tests
Code blocks and results.
## Open questions
Numbered, or "None".
</output_format>
