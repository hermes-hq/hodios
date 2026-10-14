---
schema: 1
id: reduce-tail-latency
kind: prompt
title: Reduce tail latency
description: Lowers p99 and p99.9 latency by finding the sources of the tail (queueing, GC, fan-out, retries, slow dependencies) from histograms and traces, then applying fixes such as deadlines and hedging.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, operate]
role: [backend-engineer, sre, architect]
stack: []
requires: [none]
inputs: [logs, text, config]
output: [report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [tail-latency, p99, hedged-requests, queueing, fan-out]
pairs_with:
  prompts: [investigate-latency-spike, tune-garbage-collector, analyze-load-test-results, add-retries-and-timeouts]
  personas: [performance-engineer]
args:
  - name: service
    description: The service and its latency numbers (p50, p95, p99, p99.9) over time, load, and its downstream calls.
    type: text
    required: true
  - name: evidence
    description: Slow traces, GC logs, saturation metrics, timeouts and retry settings, if available.
    type: text
output_contract:
  format: markdown
  sections: [Tail profile, Likely sources, Fixes ranked, Measurement plan, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A good median with a bad p99 is a different problem from general slowness. Tails come from a short list: queueing as utilisation approaches saturation (latency grows sharply well before 100%); garbage collection or runtime pauses; fan-out, where a request waiting on many backends is as slow as the slowest one, so a 1% slow backend makes many requests slow; retries and timeouts that are too long or stacked across layers; lock or pool waits; cold caches after deploys; noisy neighbours and CPU throttling; and head-of-line blocking in connections or queues. Averages hide all of it, and a load generator that waits for each response before sending the next (coordinated omission) under-reports it. The fixes are targeted: cap concurrency and shed load before saturation, propagate deadlines, reduce fan-out, hedge or tie requests to a second replica after the p95, fix pauses, and warm caches.
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}
</context>

<task>
Service: {{service}}

1. Describe the tail profile: ratio of p99 and p99.9 to p50, whether the tail is constant or spikes, and whether it tracks load, time, deploys or specific endpoints. Say if the data could be distorted (averaged percentiles across hosts, coordinated omission, coarse histogram buckets).
2. List the likely sources for this service, each tied to the evidence that supports it, and the check that would confirm or rule it out (slow trace breakdown, GC pause log against slow requests, utilisation at the time, per-backend latency for fan-out).
3. Rank fixes by expected tail reduction and risk: for queueing, concurrency limits and load shedding; for fan-out, fewer calls, partial results or hedged requests with a budget; for retries, deadlines and a retry budget; for pauses, the GC or allocation fix; for cold starts, warm-up. State the cost of each (extra load from hedging, dropped requests from shedding).
4. Define how to measure: per-endpoint histograms at the right resolution, percentiles computed from merged histograms not averaged, a load test with an open (arrival-rate) model, and the target p99.
</task>

<constraints>
- Do not conclude a cause the evidence does not support; mark hypotheses and how to test them.
- Never recommend hedging or retries without a budget that bounds extra load.
- Do not average percentiles across instances.
{{> output/uncertainty}}
</constraints>

<output_format>
## Tail profile
Short description with the key ratios.
## Likely sources
Table: source | supporting evidence | confirming check.
## Fixes ranked
Numbered: fix | expected effect | cost or risk.
## Measurement plan
Bullets.
## Open questions
Bullets.
</output_format>
