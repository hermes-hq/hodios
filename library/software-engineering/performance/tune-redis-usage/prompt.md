---
schema: 1
id: tune-redis-usage
kind: prompt
title: Fix slow or overloaded Redis
description: Fixes slow or overloaded Redis by finding big keys, hot keys, O(N) commands, missing pipelining and wrong eviction or persistence settings, from metrics, the slow log and client code.
category: performance
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [backend-engineer, sre, devops-engineer]
stack: [redis]
requires: [none]
inputs: [logs, config, text]
output: [report, config, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [slowlog, hot-keys, big-keys, pipelining, eviction-policy, latency]
pairs_with:
  prompts: [plan-caching-strategy, implement-redis-cache-aside, reduce-tail-latency]
  personas: [performance-engineer]
args:
  - name: symptom
    description: What is wrong, for example latency spikes, high CPU, memory full, timeouts or evictions, and when it happens.
    type: text
    required: true
  - name: evidence
    description: Output of SLOWLOG GET, INFO (memory, stats, commandstats, persistence), LATENCY DOCTOR, big-key or hot-key scans, client metrics.
    type: text
  - name: usage
    description: How the app uses Redis (cache, sessions, queues, rate limits, leaderboards), key patterns, the client library and the deployment (single node, replica, cluster, managed service).
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Fixes ranked, Config changes, Client code changes, What to monitor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Redis executes commands on one main thread, so one slow command delays every client behind it. The usual causes are O(N) commands on big values (KEYS, SMEMBERS, HGETALL, LRANGE 0 -1, ZRANGE over huge sets, DEL of a large key), big keys that take long to serialise or evict, and hot keys that pin one shard in a cluster. Round trips are the other big cost: hundreds of sequential GETs per request need pipelining or MGET, not a faster server. Memory problems come from missing TTLs, the wrong maxmemory-policy (noeviction on a cache returns write errors), fragmentation, and fork cost during RDB or AOF rewrite on a large dataset, which also causes latency spikes. Managed services expose the same signals under different names and may restrict some commands.
</context>

<task>
Symptom: {{symptom}}
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}
{{#usage}}
Usage:
{{usage}}
{{/usage}}

1. If evidence is missing, list the read-only commands to collect it and warn which ones are unsafe on production (KEYS, MONITOR for long, DEBUG); prefer SCAN-based big-key and hot-key scans and the slow log.
2. Classify the problem: slow commands, big keys, hot keys, round trips, memory and eviction, persistence or fork stalls, network or client-side (pool exhaustion, timeouts set too low), or CPU from too many connections.
3. Rank fixes by impact: replace O(N) commands with SCAN-family or bounded ranges, split big keys, use UNLINK instead of DEL for large values, pipeline or batch round trips, shard or replicate hot keys or add a short local cache in front of them, add TTLs.
4. Recommend config with reasons: maxmemory and maxmemory-policy for the use case (allkeys-lru or allkeys-lfu for a pure cache; volatile or noeviction where data must not be dropped), persistence choice, lazyfree options, client timeouts.
5. Show client code changes in the user's library where it helps (pipelining, MGET, connection reuse).
6. List the metrics to watch: slow log entries, latency percentiles, evicted and expired keys, memory fragmentation ratio, ops per second per shard, fork time.
</task>

<constraints>
- Never recommend running KEYS or FLUSHALL on production; mark any write or destructive command as needing the user's confirmation.
- Do not change the eviction policy for data that must not be lost (queues, sessions, locks) without saying what would be evicted.
- Do not state command complexity or default settings you are not sure of; mark them to verify for the user's version.
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
The problem class and the evidence for it.
## Fixes ranked
Numbered, each with expected effect and effort.
## Config changes
A config snippet with a comment per value, or "None".
## Client code changes
Code in the user's client library, or "None".
## What to monitor
Bullets.
</output_format>
