---
schema: 1
id: recover-from-cache-outage
kind: prompt
title: Recover from a cache outage or cold-cache stampede
description: Handles a Redis or Memcached outage or a cold-cache stampede, protecting the database, warming up gradually and adding request coalescing afterwards.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, backend-engineer]
stack: []
requires: [none]
inputs: [logs, config, text]
output: [plan, checklist, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [cache-stampede, cold-cache, redis-outage, request-coalescing, load-shedding]
pairs_with:
  prompts: [plan-caching-strategy, design-load-shedding, write-incident-update]
  personas: [incident-commander, site-reliability-engineer]
args:
  - name: situation
    description: What happened to the cache (down, failed over, flushed, evicting heavily, restarted empty), what the database and app are doing now, error and latency numbers, and when it started.
    type: text
    required: true
  - name: setup
    description: The cache (Redis, Memcached, managed service, cluster mode), what is cached and with which TTLs, how the app behaves on a cache miss or a cache error, and the database behind it.
    type: text
output_contract:
  format: markdown
  sections: [Current read, Protect the database now, Restore the cache, Verify, Afterwards, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an engineer through a cache incident. The danger is rarely the cache itself; it is the database behind it. A cache with a 95% hit rate means the database sees 5% of reads; when the cache empties, it sees twenty times its normal load at once, and the database falls over, which keeps the cache from warming, which keeps the database down. That loop is the stampede. Many popular keys expiring together (same TTL set at the same deploy) cause a smaller version of it. App behaviour on cache errors matters: a client with no timeout or a long connect timeout to a dead cache adds that delay to every request; an app that treats a cache error as fatal turns a cache outage into a full outage. Recovery order: stop the bleeding on the database (shed or rate-limit expensive endpoints, serve stale or degraded content, fail fast on cache errors), then bring the cache back and let it warm under a controlled load, then fix the design (request coalescing so one request per key refills, TTL jitter, stale-while-revalidate, sensible cache client timeouts).
</context>

<task>
<situation>
{{situation}}
</situation>
{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}

1. Current read: what state the cache is in and whether the database is overloaded because of it. If the evidence does not show database load or cache hit rate, ask for those first and stop.
2. Protect the database now: options in order of safety, such as rate-limiting or temporarily disabling the most expensive cache-backed endpoints, serving stale or static fallback content, making cache errors fail fast (short timeouts) instead of hanging, and holding back autoscaling that adds more database clients. Name the trade-off of each.
3. Restore the cache: fix or fail over the cache node, check memory and eviction policy if it was evicting, then warm it gradually (let traffic back in steps, or pre-warm the hottest keys from a known list) while watching database load. Say what to watch and the threshold to pause.
4. Verify: hit rate back near baseline, database CPU and connections normal, error rate and latency normal.
5. Afterwards: request coalescing or locking per key, TTL jitter, stale-while-revalidate, a circuit breaker on the cache client, capacity so the database survives a defined miss rate, and an alert on hit rate drop.
</task>

<constraints>
- Do not recommend flushing or restarting the cache while the database is already struggling; say it deepens the stampede.
- Do not recommend scaling the app tier as a fix for database overload caused by misses.
- Warn that failing over a cache cluster may lose data held only in the cache (sessions, queues, rate-limit counters, locks) and ask whether any of that lives there.
- Never claim to see metrics; work from pasted numbers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Current read
Two or three lines.

## Protect the database now
Numbered options with trade-offs.

## Restore the cache
Steps with what to watch and when to pause.

## Verify
Signals and target values.

## Afterwards
Design fixes ranked by value.

## Summary
What happened, what was done, what remains.
</output_format>
