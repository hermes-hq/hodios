---
schema: 1
id: plan-table-partitioning
kind: prompt
title: Plan table partitioning
description: Decides whether and how to partition a large table, from the key in real queries and range, list or hash choice to partition size, index and constraint effects, upkeep and online migration.
category: data
version: 1.0.0
status: incubating
stage: [design, plan]
role: [dba, backend-engineer, data-engineer]
stack: [postgres, mysql]
requires: [none]
inputs: [schema, text]
output: [report, code, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [partitioning, partition-pruning, partition-key, large-tables, online-migration]
pairs_with:
  prompts: [plan-data-archival, plan-zero-downtime-schema-change, design-time-series-schema]
  personas: [database-administrator]
args:
  - name: table_ddl
    description: The table's CREATE TABLE with indexes and constraints, current row count and size, growth per month, and foreign keys pointing to and from it.
    type: text
    required: true
  - name: query_patterns
    description: The real queries against the table with rough frequency and latency targets, the retention or purge rule, and the maintenance problems you see (slow vacuum, bloat, long deletes, index size).
    type: text
    required: true
  - name: database
    description: The engine and exact version, and managed or self-hosted.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Evidence, Partition design, Indexes and constraints, Maintenance, Migration path, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A DBA or backend engineer has a large, growing table on {{database}} and is considering partitioning. Partitioning is a maintenance and lifecycle tool more than a speed tool: it pays off when queries filter on the partition key so whole partitions are pruned, and when old data is removed by dropping partitions instead of mass deletes. It hurts when the key does not appear in most queries (every query visits every partition), when there are thousands of tiny partitions, when unique constraints must include the partition key and the application relies on uniqueness of another column, and when foreign keys or the engine's limits rule it out. Often a better index, a covering index or an archival job solves the actual problem.
</context>

<task>
<table_ddl>
{{table_ddl}}
</table_ddl>

<query_patterns>
{{query_patterns}}
</query_patterns>

1. Verdict first: partition, do not partition, or not yet (with the trigger). Base it on whether a partition key appears in the hot queries and the retention rule, and whether simpler fixes would solve the stated problem.
2. Evidence: for each query, whether it would prune with the proposed key, and what each stated problem (bloat, slow deletes, vacuum time, index size) gains.
3. Partition design: key and method (range for time and lifecycle, list for a small set of tenants or regions, hash to spread write hot spots only when pruning is not the goal), interval or count with the arithmetic (aim for partitions that stay manageable to maintain and index, and avoid thousands of partitions; state the target), default partition handling, and sub-partitioning only if justified.
4. Indexes and constraints: primary key and unique constraints must include the partition key in many engines (verify for this version); say how uniqueness of other columns will be enforced instead. Local indexes per partition; foreign keys to and from the table and what the engine supports (to verify).
5. Maintenance: creating future partitions ahead of time (a scheduled job or extension, with an alert if fewer than N future partitions exist), dropping or detaching old partitions per retention, statistics per partition, and monitoring partition count and size.
6. Migration path for the existing table online: create the partitioned table, dual-write or trigger-based copy or attach the existing table as an old partition where the engine allows, backfill in throttled batches, verify counts and checksums, switch reads and writes with a short lock, and the rollback. Name each step's lock.
</task>

<constraints>
- Every engine limit or feature (unique constraints, foreign keys, attach and detach behaviour, online options) is stated with "verify for this version" unless you are sure.
- Show size arithmetic; do not invent row counts.
- If DDL, queries or retention are missing, ask, and mark assumptions as [X].
- Every DDL step names its lock and a rollback.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
One line, then up to three reasons.

## Evidence
Table: query or problem | prunes or helps? | why.

## Partition design
Bullets and the DDL in one code block.

## Indexes and constraints
Bullets, including how lost uniqueness is enforced.

## Maintenance
Checklist and the job sketch.

## Migration path
Numbered steps with lock, duration estimate and rollback.

## Risks and open questions
Bullets.
</output_format>
