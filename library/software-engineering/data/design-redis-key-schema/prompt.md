---
schema: 1
id: design-redis-key-schema
kind: prompt
title: Design Redis keys and data structures
description: Designs Redis keys and data structures for sessions, counters, leaderboards, rate limits, queues or caches, with naming, TTLs, atomic operations, memory estimates and eviction policy.
category: data
version: 1.0.0
status: incubating
stage: [design, build]
role: [backend-engineer, fullstack-engineer, sre]
stack: [redis]
requires: [none]
inputs: [text]
output: [code, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [key-naming, data-structures, ttl, eviction-policy, sorted-sets, memory-sizing]
pairs_with:
  prompts: [implement-redis-cache-aside, plan-caching-strategy, add-rate-limiting]
args:
  - name: use_case
    description: What Redis will hold and the operations needed, for example "leaderboard per game with top 100 and a player's rank" or "login rate limit per IP and per account".
    type: text
    required: true
  - name: scale
    description: Optional. Number of keys or members, value sizes, operations per second, whether Redis is clustered, and whether data loss on restart is acceptable.
    type: text
output_contract:
  format: markdown
  sections: [Keys and structures, Operations, Expiry and eviction, Memory estimate, Durability, Pitfalls]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Redis gives correct and fast results when the structure matches the operation, and painful ones when everything is a JSON string under `SET`. Hashes hold objects whose fields change independently; sorted sets give ranks and time windows (leaderboards, sliding-window rate limits); sets give membership; streams or lists back simple queues; `INCR` with expiry gives fixed-window counters; HyperLogLog counts unique visitors approximately in a few KB. Keys need a consistent namespace (`app:entity:id:field`), and in a cluster, keys used together in one multi-key command or Lua script must share a hash slot via a `{tag}`. Every key that is not permanent needs a TTL, set atomically with the write (`SET ... EX`, or a script) so a crash between write and expire cannot leave immortal keys. `maxmemory-policy` decides what happens when memory fills: `allkeys-lru` suits pure caches, `noeviction` suits data that must not vanish, and the wrong one silently drops sessions or errors writes. `KEYS *` blocks the server; `SCAN` does not. Big keys (huge hashes or sets) cause latency spikes and uneven cluster memory.
</context>

<task>
Use case: {{use_case}}
{{#scale}}Scale: {{scale}}{{/scale}}

1. For each piece of data, choose the Redis structure and key pattern, with the reason tied to the operations needed.
2. Write the operations as Redis commands (and a short client snippet if useful) for each read and write path; use atomic commands, `MULTI`, or Lua scripts where several steps must happen together, and show that race conditions are handled.
3. Expiry and eviction: TTL per key type set atomically, and the `maxmemory-policy` that fits. If cache and important data share one instance, say whether to separate them.
4. Memory estimate from the stated scale: approximate bytes per key including overhead, total, and headroom. Say it is approximate and how to measure (`MEMORY USAGE`, sampling).
5. Durability: whether loss on restart is acceptable, and the persistence setting (RDB, AOF) or source of truth that covers it.
6. Pitfalls specific to this design: big keys, hot keys, cluster slot rules, blocking commands to avoid.
</task>

<constraints>
- Never use `KEYS` in application code; use `SCAN` or maintain an index.
- Do not treat Redis as the only copy of data that must not be lost unless persistence and replication are designed for it; say so.
- Use only commands available in the stated Redis version or a commonly supported one; mark newer commands as version-dependent.
{{> output/uncertainty}}
</constraints>

<output_format>
## Keys and structures
Table: data | key pattern | structure | TTL.

## Operations
Commands per path.

## Expiry and eviction
Bullets with the policy.

## Memory estimate
Short calculation.

## Durability
Two to four lines.

## Pitfalls
Bullets.
</output_format>
