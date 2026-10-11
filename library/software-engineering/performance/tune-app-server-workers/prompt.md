---
schema: 1
id: tune-app-server-workers
kind: prompt
title: Size app server workers and threads
description: Sizes Gunicorn, Uvicorn, Puma, PHP-FPM or Node cluster workers and threads from CPU count, memory per worker and the I/O mix of requests, and checks the result under load.
category: performance
version: 1.0.0
status: incubating
stage: [operate, ship]
role: [backend-engineer, sre, devops-engineer]
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
tags: [gunicorn, puma, php-fpm, concurrency, capacity, worker-sizing]
pairs_with:
  prompts: [tune-connection-pool, plan-load-test, reduce-memory-footprint]
  personas: [performance-engineer]
args:
  - name: setup
    description: The app server and its current settings, language runtime, container or machine CPU and memory limits, number of instances, and what sits in front (proxy, load balancer).
    type: text
    required: true
  - name: measurements
    description: Request rate, latency percentiles, time spent in database or external calls versus CPU, memory per worker, CPU usage, queueing or 502/504 errors.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Sizing calculation, Recommended settings, Knock-on effects, How to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Worker sizing comes from two limits. CPU: in runtimes with a global interpreter lock or one event loop per process (CPython, Ruby MRI, Node, PHP), real parallelism comes from processes, so CPU-bound apps want about one process per available core, where available means the container's CPU limit, not the host's core count that the runtime may report. Memory: workers times memory per worker (after warm-up, including growth) must fit the limit with headroom, or the kernel kills processes. Threads (Puma threads, Gunicorn gthread, PHP-FPM has none) help when requests mostly wait on I/O; async workers (Uvicorn, gevent) help further but only if the code does not block. Every concurrent slot also needs a database connection, so workers times threads times instances must fit the database's budget. Rules of thumb such as 2 x cores + 1 are a starting point, not an answer; the request mix decides. Timeouts must also line up with the proxy in front.
</context>

<task>
Setup: {{setup}}
{{#measurements}}
Measurements:
{{measurements}}
{{/measurements}}

1. Diagnose from the measurements: CPU-bound saturation, waiting for free workers (queueing in the proxy or listen backlog), memory pressure or OOM kills, or a slow dependency that no worker count will fix. If measurements are missing, list the few that are needed and how to get them.
2. Calculate with the user's numbers: usable cores from the CPU limit, memory per worker and the resulting maximum workers, the share of request time spent waiting on I/O, and the concurrency needed for the request rate (rate times average latency, by Little's law).
3. Recommend settings for the user's server: processes, threads or async worker class, PHP-FPM pm mode and pm.max_children, request timeouts and graceful timeouts, max-requests recycling if memory grows, preload where it saves memory.
4. List knock-on effects: total database connections, memory headroom, autoscaler targets, proxy timeouts and keep-alive settings.
5. Give a verification plan: a load test at expected and peak rates, watching CPU, memory, queueing and latency percentiles.
</task>

<constraints>
- Show the arithmetic with the user's numbers and mark assumed values.
- Do not recommend more workers when the bottleneck is a dependency or the database.
- Do not state defaults of a server version as fact unless sure; mark them to verify.
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
One paragraph naming the bottleneck and the evidence.
## Sizing calculation
The arithmetic, step by step.
## Recommended settings
A config snippet for the user's server with a comment per value.
## Knock-on effects
Bullets.
## How to verify
Steps and the metrics to watch.
</output_format>
