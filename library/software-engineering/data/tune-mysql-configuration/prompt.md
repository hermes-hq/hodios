---
schema: 1
id: tune-mysql-configuration
kind: prompt
title: Tune MySQL configuration
description: Sets MySQL or MariaDB InnoDB buffer pool, redo log, flush, connection and temp table settings from instance size and workload, with each change's reason, restart needs and how to verify it.
category: data
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [dba, sre, backend-engineer]
stack: [mysql]
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
tags: [my-cnf, innodb, buffer-pool, redo-log, database-tuning]
pairs_with:
  prompts: [tune-postgres-configuration, find-worst-queries-in-workload, tune-connection-pool]
  personas: [database-administrator]
args:
  - name: instance
    description: MySQL or MariaDB version, RAM, vCPUs, storage type and IOPS, and hosting (self-run, RDS, Aurora, Cloud SQL, Azure and so on). Say whether other services share the host.
    type: string
    required: true
  - name: workload
    description: OLTP, reporting or mixed; data size; peak connections and pooling; write rate; replication setup; and the symptoms (slow queries, disk temp tables, I/O stalls, memory pressure, crashes).
    type: text
    required: true
  - name: current_settings
    description: Optional. The my.cnf or parameter group, or the output of SHOW GLOBAL VARIABLES and SHOW GLOBAL STATUS for the relevant settings.
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
Most MySQL tuning is a handful of InnoDB settings. `innodb_buffer_pool_size` matters most: on a dedicated host it is usually 50 to 75 percent of RAM, leaving room for per-connection buffers, the OS and anything else on the box; it can be resized online since 5.7 but in chunks, and `innodb_dedicated_server` in 8.0 sizes it automatically. Redo log size controls how often InnoDB is forced to flush: in 8.0.30 and later it is `innodb_redo_log_capacity`, earlier versions use `innodb_log_file_size` times the number of files and need a restart. `innodb_flush_log_at_trx_commit=1` with `sync_binlog=1` is the durable setting; 2 or 0 is faster but can lose up to about a second of committed transactions on an OS crash or power loss, which is a business decision, not a tuning tweak. `innodb_io_capacity` should match what the storage can really do, and `innodb_flush_method=O_DIRECT` avoids double caching on Linux. The classic way to run out of memory is a high `max_connections` combined with large per-session buffers (`sort_buffer_size`, `join_buffer_size`, `read_rnd_buffer_size`, temp tables), because each can be allocated per connection and sometimes several times per query; raising them globally rarely helps. The query cache was removed in 8.0. Managed services fix some parameters, and Aurora's distributed storage layer handles redo and durability itself, so redo log sizing does not apply and flush settings behave differently from stock MySQL. MariaDB has diverged (its own thread pool, different defaults and variable names), so version matters for every line.
</context>

<task>
Instance: {{instance}}
Workload: {{workload}}
{{#current_settings}}Current settings: {{current_settings}}{{/current_settings}}

1. State assumptions: engine and exact version, memory left for the OS and other processes, durability requirements, whether this is a primary or a replica.
2. Read the current settings and status counters if given. Point out settings that are harmful as they are (buffer pool far too small or too large for RAM, huge per-session buffers, `max_connections` far above what the app needs) before anything else.
3. Recommend values for the buffer pool, redo log capacity, flush method, I/O capacity, durability settings, connection limits, per-session buffers, temp table limits (`tmp_table_size`, `max_heap_table_size`, and the TempTable settings in 8.0), `table_open_cache`, and the slow query log, each with the reason tied to the given instance and workload.
4. Estimate peak memory: buffer pool plus a realistic per-connection worst case times expected connections, and show it fits in RAM.
5. List settings to leave at default and any common advice that does not apply here (query cache, tuning-script suggestions without evidence, relaxing durability without sign-off).
6. Say how to apply each change: dynamic with `SET PERSIST` or a parameter group change, or needs a restart; group restarts together and apply on a replica first where one exists.
7. Give the status counters and queries to compare before and after (buffer pool read misses, disk temp tables, checkpoint age, thread and connection counts, slow log), and what result means the change worked.
</task>

<constraints>
- Do not recommend lowering `innodb_flush_log_at_trx_commit` or `sync_binlog` below the durable values without stating the exact data-loss risk and asking for the owner's decision.
- Do not invent version behaviour; when a setting's name, default or dynamic status depends on the version or on MariaDB versus MySQL, say so and mark it to verify.
- For managed services, only recommend parameters that service lets users change, and say which ones are fixed.
- Do not apply changes yourself; this is a recommendation for the user to roll out.
- Prefer a few high-impact changes over a long list of micro-tweaks.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets.

## Recommended settings
Table: setting | current | recommended | reason | dynamic or restart.

## Settings to leave alone
Bullets with the reason.

## How to apply
Numbered steps, including restart grouping and replica-first order.

## How to verify
Checklist with the counters and queries to compare.
</output_format>
