---
schema: 1
id: configure-sqlite-for-production
kind: prompt
title: Configure SQLite for a production server app
description: Configures SQLite for a server app with WAL mode, busy timeouts, safe pragmas, a single-writer pattern, backups with Litestream or the backup API, and the limits that mean it is time to move.
category: data
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, fullstack-engineer]
stack: [sqlite]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [code, config, explanation]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [wal-mode, pragmas, busy-timeout, litestream, single-writer, database-locked]
pairs_with:
  prompts: [choose-database-for-workload, automate-postgres-backups]
args:
  - name: app
    description: The app's language, framework and SQLite driver or ORM, how it is deployed (one VM, containers, serverless), and expected reads and writes per second.
    type: text
    required: true
  - name: problem
    description: Optional. A current problem, such as "database is locked" errors, slow writes, or lost data after a redeploy.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Connection settings, Write pattern, Backups, Code changes, Check, Limits to watch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SQLite serves many production apps well on a single server, but its defaults are tuned for embedded use. The settings that matter: `journal_mode=WAL` so readers do not block the writer (persistent per database); `busy_timeout` so a connection waits for the write lock instead of failing at once with "database is locked"; `synchronous=NORMAL` in WAL mode as a common durability-speed balance (FULL is safer for each commit); `foreign_keys=ON`, which is off by default and per connection; and `BEGIN IMMEDIATE` for transactions that will write, because a deferred transaction that reads and then tries to write can fail with a busy error that busy_timeout cannot resolve. There is one writer at a time, so a single write connection (or a serialised write queue) with a pool of read connections avoids contention. The database file must live on a local disk with persistent storage: network file systems break locking, and container filesystems that reset lose data. Backups need the online backup API, `VACUUM INTO`, or continuous replication such as Litestream; copying the file while it is written can produce a corrupt copy.
</context>

<task>
App: {{app}}
{{#problem}}Problem: {{problem}}{{/problem}}

1. Fit check: given the deployment and write rate, is SQLite appropriate? Flag multi-server or serverless deployments with shared writes, network file systems and heavy concurrent writes as poor fits, and say what to use instead.
2. Read how the app opens connections. Set pragmas on every new connection (WAL, busy_timeout, synchronous, foreign_keys, a sensible cache size and temp store), in the driver's or ORM's connection hook.
3. Write pattern: a single writer connection or serialised writes, a read pool, `BEGIN IMMEDIATE` for write transactions, and short transactions.
4. Backups: Litestream or periodic `VACUUM INTO` / backup API to off-host storage, with a tested restore; make sure the file sits on a persistent local volume.
5. Make the smallest code and config changes, following the project's patterns.
6. Verify: a concurrency test with several readers and writers that previously reproduced the problem (or a load script), confirm pragmas are in effect by querying them, and a restore from backup on a scratch path.
7. Limits to watch: write throughput, file size, WAL growth and checkpoints, and signs it is time to move to a server database.
</task>

<constraints>
- Do not delete or overwrite the existing database file; run tests on a copy or a fresh file.
- Do not recommend `synchronous=OFF` or `journal_mode=OFF` for data that matters.
- Mark driver-specific behaviour (how pragmas and transactions are exposed) as to verify for the stated driver.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Fit check
Two to five lines.

## Connection settings
Pragmas with one line of reason each.

## Write pattern
Bullets.

## Backups
Setup and restore steps.

## Code changes
Diffs with file paths.

## Check
Tests run and their real results.

## Limits to watch
Bullets with thresholds.
</output_format>
