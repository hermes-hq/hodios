---
schema: 1
id: fix-table-bloat-and-vacuum
kind: prompt
title: Fix Postgres table bloat and vacuum
description: Diagnoses Postgres table and index bloat and lagging autovacuum from stats and settings, finds blockers such as long transactions or replication slots, and gives tuning and safe cleanup.
category: data
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [dba, backend-engineer, sre]
stack: [postgres]
requires: [none]
inputs: [logs, config, text]
output: [report, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [autovacuum, table-bloat, dead-tuples, xid-wraparound, index-bloat, maintenance]
pairs_with:
  personas: [database-administrator]
  prompts: [review-database-indexes, plan-data-archival]
args:
  - name: evidence
    description: Output of queries such as pg_stat_user_tables (n_dead_tup, last_autovacuum), table and index sizes, age of datfrozenxid, pg_stat_activity long transactions, replication slots, and current autovacuum settings. Paste what you have.
    type: text
    required: true
  - name: environment
    description: Postgres version, self-managed or managed service, instance size, and write pattern (for example "queue table with constant inserts and deletes").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Blockers, Tuning, Cleanup plan, Monitoring]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Postgres updates and deletes leave dead row versions that vacuum reclaims for reuse; when autovacuum falls behind, tables and indexes grow, scans slow down, and in the worst case transaction ID wraparound forces an emergency. Autovacuum usually falls behind for reasons other than its settings: a long-running or idle-in-transaction session, an abandoned replication slot, a prepared transaction, or a standby with `hot_standby_feedback` holding back the cleanup horizon so nothing can be removed. Defaults suit small tables: the scale factor triggers vacuum after 20 percent of a table changes, which for a 500 million row table is far too late, so large and hot tables need per-table settings, and the cost limit often throttles workers too hard on modern storage. Plain `VACUUM` rarely shrinks files; reclaiming space needs `VACUUM FULL` (exclusive lock, full rewrite) or an online tool such as pg_repack, and indexes can be rebuilt with `REINDEX CONCURRENTLY` on recent versions. Queue-like tables with constant insert and delete are a classic bloat source and may need a different design.
</context>

<task>
Environment: {{environment}}

<evidence>
{{evidence}}
</evidence>

1. Read the evidence: tables with the most dead tuples and their ratio to live tuples, last vacuum and analyse times, table and index sizes against expected sizes, transaction ID age per database and table, and any long transactions, idle-in-transaction sessions, replication slots or prepared transactions.
2. Diagnose: real bloat versus normal free space, autovacuum not triggering (thresholds), triggering but too slow (cost limits, worker count, I/O), or blocked by the cleanup horizon. Rate wraparound urgency from the ages shown.
3. Name the blockers and how to remove each safely (end or time out sessions, drop or fix an abandoned slot after checking who uses it, review `hot_standby_feedback`), with the risk of each action.
4. Recommend tuning: per-table scale factor and threshold for large or hot tables, cost limit and delay, worker count and memory, `idle_in_transaction_session_timeout`, and any managed-service limits that apply. Show `ALTER TABLE ... SET (...)` statements.
5. Plan cleanup for space already lost: which tables need a rewrite, online versus locking options, disk space needed during the rewrite, index rebuilds, and order of work.
6. Give monitoring queries and alert thresholds for dead tuples, vacuum age, transaction ID age and slot lag.
</task>

<constraints>
- Do not recommend disabling autovacuum or running `VACUUM FULL` on a busy table without stating the exclusive lock and the alternative.
- If the evidence suggests wraparound is close, put that first and say plainly how urgent it is.
- Mark version-specific features and managed-service differences as "to verify".
- Base conclusions on the evidence; list missing queries to run when it is incomplete.
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
Table: Table | Live | Dead | Size | Last autovacuum | Finding. Then summary with urgency.

## Blockers
Bullets: blocker, evidence, safe action, risk.

## Tuning
SQL and config with reasons.

## Cleanup plan
Numbered steps with lock impact and disk needs.

## Monitoring
Queries and thresholds.
</output_format>
