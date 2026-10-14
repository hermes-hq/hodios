---
schema: 1
id: tune-postgres-configuration
kind: prompt
title: Tune Postgres configuration
description: Sets Postgres memory, WAL, checkpoint, autovacuum, planner and connection settings from instance size and workload, with the reason for each change, restart needs and how to verify it.
category: data
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [dba, sre, backend-engineer]
stack: [postgres]
requires: [none]
inputs: [config, text]
output: [config, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [postgresql-conf, shared-buffers, work-mem, checkpoints, autovacuum-tuning, database-tuning]
pairs_with:
  prompts: [fix-table-bloat-and-vacuum, tune-connection-pool, find-worst-queries-in-workload]
  personas: [database-administrator]
args:
  - name: instance
    description: Postgres version, RAM, vCPUs, storage type (local SSD, network volume with provisioned IOPS), and hosting (self-run, RDS, Cloud SQL, Azure and so on).
    type: string
    required: true
  - name: workload
    description: OLTP, analytics or mixed; database size; peak connections and whether a pooler is used; write rate; the symptoms (slow queries, checkpoint warnings, I/O spikes, memory errors).
    type: text
    required: true
  - name: current_settings
    description: Optional. Output of non-default settings (for example from pg_settings where source is not default) or the current parameter group.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Recommended settings, Settings to leave alone, How to apply, How to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Default Postgres settings are sized for a tiny machine, and managed services change some defaults but not all. Experts tune a handful of settings and leave the rest. `shared_buffers` around a quarter of RAM is a common start on dedicated servers (managed services often set it already); `effective_cache_size` is a planner hint, not an allocation. `work_mem` is per sort or hash node per query, so a high value times many connections can exhaust memory; it is safer to raise it per role or session for reports. `max_connections` in the hundreds without a pooler wastes memory and hurts throughput; a pooler is usually the fix. Checkpoint settings (`max_wal_size`, `checkpoint_timeout`, `checkpoint_completion_target`) smooth I/O for write-heavy loads; frequent "checkpoints are occurring too frequently" warnings mean `max_wal_size` is too low. `random_page_cost` near 1.1 suits SSDs. Autovacuum defaults are too timid for large busy tables; per-table scale factors and higher cost limits help. Some settings need a restart, some a reload, and on managed services some cannot be changed at all.
</context>

<task>
Instance: {{instance}}

Workload: {{workload}}
{{#current_settings}}
<current_settings>
{{current_settings}}
</current_settings>
{{/current_settings}}

1. State the assumptions you are making about the workload and anything missing that would change the advice.
2. Recommend values for the settings that matter for this case (memory, connections, WAL and checkpoints, planner cost settings, autovacuum, parallel query, logging of slow queries, lock waits and checkpoints), each with the value, the reasoning from the given numbers, and whether it needs a restart or reload.
3. Say which settings to leave at the default or provider value and why, including ones commonly over-tuned.
4. Explain how to apply: `ALTER SYSTEM` plus reload or restart for self-run, parameter groups or flags for managed services, and per-role or per-database overrides where better than global ones. Changes go out one group at a time, during a quiet period, with the old values recorded.
5. Give a verification plan: the views and metrics to watch before and after (checkpoint stats, temp file usage, buffer hit ratio, autovacuum activity, memory and swap, query latency), and how long to observe.
</task>

<constraints>
- Every value is a starting point tied to the stated numbers, not a universal truth; say so.
- Mark settings that the stated managed service does not allow changing, or that differ by version, as to verify.
- Never recommend `fsync = off`, `full_page_writes = off` or `synchronous_commit = off` globally for data that matters; if relaxing durability is discussed, state the data-loss risk.
- Do not apply changes; the user applies them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets.

## Recommended settings
Table: setting | current | recommended | why | restart or reload.

## Settings to leave alone
Bullets.

## How to apply
Steps for this hosting.

## How to verify
Checklist with the views and metrics to compare.
</output_format>
