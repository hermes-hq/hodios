---
schema: 1
id: tune-connection-pool
kind: prompt
title: Tune a connection pool
description: Sizes and configures database or HTTP client connection pools from measured hold times and throughput, with the server's connection limit across all instances, timeouts and leak detection.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, operate]
role: [backend-engineer, sre, dba]
stack: []
requires: [none]
inputs: [config, logs, text]
output: [config, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [connection-pool, littles-law, pool-sizing, timeouts, connection-leaks]
pairs_with:
  prompts: [optimize-sql-query, plan-service-scaling, reduce-tail-latency]
  personas: [performance-engineer, database-administrator]
args:
  - name: setup
    description: The pool library and settings, number of app instances and their scaling range, the database or remote service and its connection limit, and any poolers or proxies in between.
    type: text
    required: true
  - name: metrics
    description: Request rate, pool wait time, active and idle connections, connection errors or timeouts, query durations.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Sizing calculation, Recommended settings, Leak and timeout checks, What to monitor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pool sizing is arithmetic before it is tuning. By Little's law, the connections busy on average equal the rate of acquisitions times how long each is held, so a pool needs that number plus headroom for bursts; more than that adds nothing. The database sees the pool size times every instance, including autoscaled ones and every service sharing it, and many databases degrade well before their connection maximum because each connection costs memory and scheduling (a few dozen active connections per core is often already too many). So "raise the pool" can make things slower. Long hold times are the real problem more often than small pools: transactions left open across remote calls, connections borrowed for the whole request, or leaks that never return. Timeouts need to line up: acquire timeout shorter than the request timeout, idle and maximum lifetime shorter than what firewalls, load balancers or the server cut. Transaction-mode poolers in front of the database change what session features work.
{{#metrics}}
Metrics:
{{metrics}}
{{/metrics}}
</context>

<task>
Setup: {{setup}}

1. Diagnose from the metrics: pool wait time and how often the pool is exhausted, active versus maximum connections, hold time per acquisition, errors. Decide whether the pool is too small, the hold time too long, there is a leak, or the server is saturated.
2. Do the sizing calculation with the user's numbers: needed connections per instance from rate and hold time, plus burst headroom; then total across the maximum number of instances and every service, compared with what the server can handle well, not only its configured maximum.
3. Recommend settings: maximum and minimum pool size, acquire timeout, idle timeout, maximum lifetime, validation or keepalive, and a statement or query timeout. If the total exceeds the server's budget, recommend an external pooler or fewer, smaller pools, and list session features that a transaction-mode pooler affects.
4. Leak and timeout checks: enable leak detection or logging of long-held connections, find code that holds connections across remote calls or long work, and check that timeouts nest correctly across layers.
5. List the metrics and alerts to keep: pool wait time p99, exhaustion count, active connections per instance and in total at the server.
</task>

<constraints>
- Show the calculation with the user's numbers; mark any number you had to assume.
- Do not recommend raising the pool size without checking the total at the server.
- Do not state library defaults as facts unless sure; mark them to verify.
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
One paragraph.
## Sizing calculation
The arithmetic, step by step.
## Recommended settings
A config snippet for the pool in use, with a comment per value.
## Leak and timeout checks
Bullets.
## What to monitor
Bullets.
</output_format>
