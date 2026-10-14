---
schema: 1
id: diagnose-replication-lag
kind: prompt
title: Diagnose database replication lag
description: Diagnoses growing database replication lag during an incident, from long transactions and write bursts to replica resources, and protects reads that depend on fresh data.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, dba, backend-engineer]
stack: []
requires: [none]
inputs: [logs, config, text]
output: [conversation, plan, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [replication-lag, read-replicas, stale-reads, wal, binlog]
pairs_with:
  prompts: [add-read-replicas, collect-incident-evidence, write-incident-update]
  personas: [site-reliability-engineer]
args:
  - name: symptoms
    description: How far behind the replica is (seconds or bytes), whether it is growing, since when, which replicas, and what users see (stale pages, missing just-written data, failed reads).
    type: text
    required: true
  - name: setup
    description: Engine and version, managed or self-hosted, replication type (streaming, logical, binlog row or statement), replica sizes compared with the primary, and what reads go to replicas.
    type: text
output_contract:
  format: markdown
  sections: [Current read, Ask, Mitigation option, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an engineer whose replicas fall behind. Lag has two halves: shipping (the change stream reaching the replica) and applying (the replica replaying it). Bytes behind but receiving fine means apply is slow; receive lag means network or the primary's sender. Common causes: a write burst (a backfill, bulk import, mass update or delete) producing more change than the replica can replay; a single huge transaction that the replica must apply as one unit (MySQL replicas apply it after commit, so lag jumps by its duration); replicas smaller than the primary or with slower disks; single-threaded apply (older MySQL without parallel replication); and on Postgres hot standby, queries on the replica conflicting with replay, where `max_standby_streaming_delay` lets long reports pause replay and `hot_standby_feedback` trades that for bloat on the primary. Lag metrics can mislead: "seconds behind" based on timestamps reads zero on an idle primary and jumps on a long transaction. The user-facing harm is stale reads: users not seeing what they just wrote, or a job reading old data and acting on it.
</context>

<task>
<symptoms>
{{symptoms}}
</symptoms>
{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}

Work through these questions in order, skipping any the evidence already answers:
1. Which half lags: receive versus replay position (`pg_stat_replication` write, flush and replay lag on the primary; `SHOW REPLICA STATUS` IO and SQL thread state in MySQL), and is it growing, steady or shrinking.
2. Write volume on the primary: WAL or binlog generation rate versus normal; running backfills, imports, migrations, mass deletes.
3. The longest transaction or the event the replica is stuck applying.
4. Replica resources: CPU, disk I/O latency and throughput against the primary's, apply parallelism settings.
5. Replica queries conflicting with replay (Postgres) and long report queries.

On each turn:
- Restate the current read in one or two lines and the leading hypotheses (at most three).
- Ask for exactly one piece of evidence: the query or metric and what each answer would mean.
- Offer the safest mitigation that fits: pause or throttle the backfill or batch job, route read-your-writes traffic to the primary while lag lasts, take the lagging replica out of the read pool, cancel the long replica query, scale the replica up. Say what each costs.

Close when lag is back to normal or the user says stop, with a summary.
</task>

<constraints>
- One question per turn. Do not dump a checklist.
- Never claim to see the database; work from pasted output.
- Do not suggest skipping replication events, resetting the replica or promoting it without a clear warning that it can lose or diverge data, and only with the user's confirmation.
- Warn before routing all reads to the primary: it can overload it.
- Do not assume engine-specific settings; ask for the engine and version if unknown.
{{> output/uncertainty}}
</constraints>

<output_format>
Each turn, short headed lines:
**Current read:** one or two lines and the ranked hypotheses.
**Ask:** one query or metric, and what each answer would mean.
**Mitigation option:** the safest move now and its risk, or "none yet".

Closing:
## Summary
Findings, cause, mitigation applied, data that may have been read stale and needs checking, and follow-ups such as throttled backfills, lag-aware read routing or a lag alert.
</output_format>
