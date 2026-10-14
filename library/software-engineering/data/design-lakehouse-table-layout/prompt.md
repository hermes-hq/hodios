---
schema: 1
id: design-lakehouse-table-layout
kind: prompt
title: Design a lakehouse table layout
description: Designs Iceberg, Delta Lake or Hudi table layout from real query patterns, covering partitioning, clustering, file sizes, compaction, snapshot expiry, merge strategy and cost of small files.
category: data
version: 1.0.0
status: incubating
stage: [design]
role: [data-engineer, architect]
stack: [spark]
requires: [none]
inputs: [schema, text]
output: [plan, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [lakehouse, iceberg, delta-lake, partitioning, compaction, small-files]
pairs_with:
  prompts: [design-data-pipeline, plan-table-partitioning, design-star-schema]
  personas: [data-engineer]
args:
  - name: table
    description: What the table holds, its columns, row volume per day and total, how data arrives (append, upserts, deletes, late data) and how often.
    type: text
    required: true
  - name: queries
    description: The main read patterns with filters and frequency, for example "dashboard filters by event_date last 7 days and tenant_id", plus the engines that read it.
    type: text
    required: true
  - name: format
    description: Table format if decided.
    type: enum
    enum: [iceberg, delta, hudi, undecided]
    default: undecided
output_contract:
  format: markdown
  sections: [Assumptions, Layout, Write strategy, Maintenance, Cost and risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Open table formats bring transactions to object storage, but performance depends on layout decisions that are hard to change later. The common failures: partitioning on a high-cardinality column (user id, or event timestamp at hour grain for a small table) that creates millions of tiny files; partitions so coarse that every query scans everything; frequent small appends or streaming writes without compaction; upserts using copy-on-write on a table updated all day, rewriting large files for a few changed rows, or merge-on-read without regular compaction, so reads slow down; snapshots and orphan files never expired, so storage grows forever; and clustering keys that do not match filters. Formats differ: Iceberg has hidden partitioning with transforms (day, bucket, truncate) and partition evolution without rewriting; Delta relies on explicit partition columns or liquid clustering and Z-ordering in some runtimes; Hudi distinguishes copy-on-write and merge-on-read tables. Target data files are usually in the low hundreds of MB, and partitions should hold at least several such files' worth of data.
</context>

<task>
<table>
{{table}}
</table>
<queries>
{{queries}}
</queries>
Format: {{format}}

1. State assumptions about volumes, growth, late data and engines.
2. If the format is undecided, recommend one for this workload in a few lines, based on engines, upsert needs and the platform, and say what would change the choice.
3. Design the layout: partition spec (column and transform) justified by data per partition and the query filters, clustering or sort order for the second most common filter, target file size, and column types (timestamps with time zone, decimal for money).
4. Design the write strategy: append versus merge, copy-on-write versus merge-on-read, handling late and duplicate records, idempotent writes for retries, and how streaming micro-batches avoid small files.
5. Design maintenance: compaction schedule and target, snapshot expiry and retention for time travel, orphan file cleanup, manifest or log rewrite, statistics, and who runs them.
6. Estimate the cost and risks: files and partitions per day, scan reduction for the main queries, and what to watch (file count per partition, average file size, planning time).
7. Give the DDL or table properties for the chosen format and the maintenance commands, marking engine-specific syntax to verify.
</task>

<constraints>
- Justify every partition column by both data volume per partition and real filters; do not partition by a column only because it exists.
- Mark runtime-specific features (liquid clustering, specific procedures) as dependent on the engine and version.
- Do not invent volumes; where missing, give the decision rule and a default.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets.

## Layout
Partition spec, clustering, file size, types, with reasons. DDL in a code block.

## Write strategy
Bullets.

## Maintenance
Table: Task | Schedule | Setting | Why.

## Cost and risks
Numbers with arithmetic, and metrics to watch.
</output_format>
