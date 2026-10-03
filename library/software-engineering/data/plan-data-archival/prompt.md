---
schema: 1
id: plan-data-archival
kind: prompt
title: Plan data archival and purging
description: Plans archiving or purging old data with per-table retention, partitioning, throttled deletes, verified copies and a restore path. Use when tables grow without bound or retention rules apply.
category: data
version: 1.0.1
status: incubating
stage: [plan, operate]
role: [backend-engineer, dba, data-engineer, architect]
stack: []
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
tags: [data-retention, archiving, partitioning, batch-deletes]
pairs_with:
  personas: [database-administrator]
  prompts: [plan-zero-downtime-schema-change]
args:
  - name: tables
    description: The tables or collections involved - row counts, growth per month, size, the timestamp column that defines age, foreign keys, how the data is read (recent only, reports over all history) and the database engine and version.
    type: text
    required: true
  - name: retention_rules
    description: The retention rules you already have, with their source - for example "invoices 10 years (finance), events 13 months (product), deleted accounts erased within 30 days (privacy)".
    type: text
output_contract:
  format: markdown
  sections: [Inventory, Retention matrix, Strategy per table, Job design, Restore path, Rollout, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Partition-and-drop checks the engine limits on keys and foreign keys before recommending it."}
---
<context>
Deleting old data looks like one `DELETE ... WHERE created_at < ...` statement. On a large table that statement holds locks for minutes, bloats the table, floods replication and can take the application down. Archival also has a correctness side: rows are moved before anyone has checked the copy, children are deleted after their parents and break foreign keys, deleted data survives for years in backups (which matters for erasure requests), and nobody can restore an archived record when support asks. The cheapest deletion is dropping a whole time partition, so the physical design often matters more than the job.
</context>

<task>
Plan archival or purging for:
<tables>
{{tables}}
</tables>
{{#retention_rules}}
Retention rules:
{{retention_rules}}
{{/retention_rules}}

1. Build an inventory: per table, size, growth, the age column, dependants, and how old data is read.
2. Build a retention matrix. Use only the rules given; for any table without one, mark "owner to decide" and name the kind of owner (legal or compliance, finance, product). Never invent a legal retention period. Note where legal holds must be able to pause deletion.
3. Choose a strategy per table and say why:
   - **Partition and drop** by time range when the engine supports it and the table is large and append-mostly; include how to convert an existing table safely. Check the engine's limits first: in PostgreSQL and MySQL the partition key must be part of every primary key and unique constraint, and MySQL partitioned tables cannot have foreign keys.
   - **Archive then delete**: copy to an archive table, a cheaper database or object storage in an open format (for example Parquet), verify counts and checksums, then delete.
   - **Throttled batch delete**: small batches by primary key range or keyset, each in its own transaction, with a pause and a stop condition on replication lag or load.
   - **Anonymise instead of delete** where aggregates must survive but personal data must go.
4. Respect dependencies: delete or archive children before parents, or archive whole aggregates together.
5. Design the job: schedule, batch size, idempotency (safe to rerun after a crash), progress tracking, metrics, alerts, and a kill switch.
6. Define the restore path: how to find and bring back an archived record, who may request it, and how long it takes. Include backup retention so erased data does not live on indefinitely.
7. Plan the rollout: dry run with counts only, first run on a small slice, watching locks, lag, bloat and query latency, then the steady-state schedule.
</task>

<constraints>
- Give SQL or pseudocode for the engine and version stated; if unstated, ask or write it for PostgreSQL and say so.
- Every destructive step is preceded by a verification step and a backup point.
- Do not rely on `ON DELETE CASCADE` to delete large volumes; it hides the work in one transaction.
- Retention periods and erasure obligations are decided by the data owner and their legal or compliance advisers; present them as inputs, not advice.
</constraints>

<output_format>
## Inventory
Table: table, rows, growth per month, age column, dependants, read pattern.
## Retention matrix
Table: table, keep online, keep archived, then, rule source.
## Strategy per table
One short paragraph each.
## Job design
SQL or pseudocode for the batch loop or partition maintenance, plus monitoring and kill switch.
## Restore path
Numbered steps.
## Rollout
Numbered phases with go or no-go checks.
## Risks and open questions
Bullets.
</output_format>
