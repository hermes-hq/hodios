---
schema: 1
id: design-load-shedding
kind: prompt
title: Design overload protection for a service
description: Designs how a service protects itself from overload, with concurrency limits, bounded queues, priority-based shedding, backpressure and client retry behaviour that does not make it worse.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, sre, architect]
requires: [none]
inputs: [spec, text, logs, repo]
output: [docs, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [load-shedding, overload, backpressure, admission-control, retry-storms]
pairs_with:
  personas: [software-architect]
  prompts: [design-graceful-degradation, add-rate-limiting, add-retries-and-timeouts, estimate-system-capacity]
args:
  - name: service
    description: The service, its request types and their business importance, current capacity limits, and how it behaves under load today (latency curve, incidents).
    type: text
    required: true
  - name: environment
    description: Runtime and server model (thread pool, event loop, async workers), load balancer and gateway, autoscaling settings, and the clients that call it.
    type: text
output_contract:
  format: markdown
  sections: [Overload behaviour today, Request priorities, Admission control, Queues and timeouts, Client behaviour, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An overloaded service without protection does not slow down gracefully; it collapses. Requests queue in thread pools and sockets, every request waits longer than its caller's timeout, so the service does work nobody is waiting for, clients retry, load doubles, and throughput falls to almost zero (congestive collapse). Autoscaling is too slow to prevent this and does not help when the bottleneck is a database. Protection works by refusing work early and cheaply: a cap on concurrent in-flight requests (fixed or adaptive, based on latency), bounded queues with a maximum wait so stale requests are dropped instead of served late, deadline propagation so work is abandoned when the caller has given up, and priorities so that health checks, paid traffic or checkout survive while background or bot traffic is rejected first. Rejections should be fast 429 or 503 responses with Retry-After, and clients need retry budgets and jittered backoff, or the shedding just moves the storm.
</context>

<task>
<service>
{{service}}
</service>

{{#environment}}
<environment>
{{environment}}
</environment>
{{/environment}}

1. If a repository, metrics or logs are available, read the server configuration (pool sizes, queue settings, timeouts) and recent load data first, and say what you read.
2. Describe how the service behaves under overload today: where requests queue, which limit is hit first, and whether it collapses.
3. Classify request types into priorities (for example critical, normal, sheddable) with the reason, including health checks and internal traffic.
4. Design admission control: concurrency limit per instance (fixed with how it is derived, or adaptive based on latency), per-priority reservations, per-client or per-tenant fairness, and the fast rejection response with Retry-After.
5. Design queues and timeouts: bounded queue size and maximum queue wait, deadline propagation from callers, cancellation of abandoned work, and timeouts for downstream calls that fit within the remaining budget.
6. Design client behaviour: retry budgets, exponential backoff with jitter, honouring Retry-After, circuit breakers in callers, and avoiding retries at several layers at once.
7. Explain how this interacts with autoscaling and health checks, so shedding does not cause instances to be marked unhealthy and removed.
8. Plan verification: a load test beyond capacity, the expected goodput curve, and the alerts on shed rate.
</task>

<constraints>
- Do not rely on autoscaling alone as overload protection.
- Do not let health checks or critical traffic be shed before sheddable traffic.
- Do not set limits from guesses presented as facts; derive them from data or label them as starting points to tune.
{{> output/uncertainty}}
</constraints>

<output_format>
## Overload behaviour today
## Request priorities
Table: request type, priority, reason.
## Admission control
## Queues and timeouts
Table: component, limit, value or how derived.
## Client behaviour
## Verification
Numbered load-test scenarios with expected results.
## Open questions
Numbered.
</output_format>
