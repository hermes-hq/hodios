---
schema: 1
id: add-read-replicas
kind: prompt
title: Add read replicas and route reads
description: Adds database read replicas and routes reads to them safely, handling replication lag, read-your-writes, long queries on replicas, failover and monitoring in the app's data layer.
category: data
version: 1.0.0
status: incubating
stage: [design, build]
role: [backend-engineer, dba, sre]
stack: [postgres, mysql]
requires: [repo-read, file-write, shell]
inputs: [repo, config, text]
output: [code, plan]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [read-replicas, replication-lag, read-your-writes, read-write-splitting, database-scaling]
pairs_with:
  prompts: [tune-connection-pool, plan-caching-strategy, find-worst-queries-in-workload]
  personas: [database-administrator]
args:
  - name: situation
    description: Why replicas are wanted (primary CPU, report queries, regional latency), current load numbers, the engine, version and hosting.
    type: text
    required: true
  - name: stack
    description: The app's language, framework and ORM or database library, and how connections are configured today.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Are replicas the right fix, Replica setup, Read routing, Lag handling, Code changes, Check, Monitoring and failover]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Replicas offload reads but are asynchronous by default, so a read right after a write can miss it: the user saves a profile, the page reloads from a replica and shows the old value. Routing must therefore be explicit. Safe defaults: everything inside a transaction and every read that follows a write in the same request or session goes to the primary; replicas get reads that tolerate a few seconds of staleness (listings, search, reports). Techniques for read-your-writes include sticking a user to the primary for a short period after they write, or comparing replication positions (LSN or GTID) before reading. Long queries on Postgres replicas can be cancelled by replication conflicts, or with `hot_standby_feedback` cause bloat on the primary; MySQL replicas can fall behind on large transactions. Many ORMs support read/write splitting natively (for example multiple databases in Django or Rails), which beats hand-rolled routing. Replicas are also not a backup.
</context>

<task>
Situation: {{situation}}
App stack: {{stack}}

1. Check whether replicas are the right fix: if load comes from a few bad queries or missing caching, say so with the cheaper fix first. Continue if replicas are justified.
2. Replica setup: how to create them on this hosting, sizing (same class as primary for failover candidates), settings relevant to long queries and lag, and connection endpoints. Do not create infrastructure; describe it or write it in the project's infrastructure-as-code if present.
3. Read routing: read the data layer, then use the framework's native read/write splitting if it has one. Define which reads may go to replicas, with transactions and post-write reads pinned to the primary.
4. Lag handling: read-your-writes strategy for this app, a maximum acceptable lag, and fallback to the primary when lag exceeds it or a replica is down.
5. Implement the routing in the code with the smallest change, plus configuration for replica endpoints and pool sizes.
6. Tests: post-write reads hit the primary, read-only paths hit the replica, the fallback works when the replica is unavailable. Run them locally with a primary and replica if the project's dev setup allows, otherwise say what was not verified.
7. Monitoring and failover: lag metrics and alerts, replica query cancellations, what happens to routing when the primary fails over.
</task>

<constraints>
- Do not create, resize or promote real databases; produce code and plans for the user to apply.
- Never route writes or transactional reads to a replica.
- Do not call replicas a backup.
- Mark hosting-specific behaviour (endpoint types, lag metrics names) as to verify for the user's provider.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Are replicas the right fix
Two to five lines.

## Replica setup
Steps or infrastructure code.

## Read routing
Rules: what goes where.

## Lag handling
Strategy and thresholds.

## Code changes
Diffs with file paths.

## Check
Tests run and their results, or what could not be verified.

## Monitoring and failover
Metrics, alerts and failover behaviour.
</output_format>
