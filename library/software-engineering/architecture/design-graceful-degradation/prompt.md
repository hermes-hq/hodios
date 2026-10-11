---
schema: 1
id: design-graceful-degradation
kind: prompt
title: Design graceful degradation
description: Maps every dependency of a service or user journey, decides what users get when each one is slow or down, and specifies fallbacks, bulkheads, load shedding and the switches to trigger them.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, backend-engineer, sre, tech-lead]
requires: [none]
inputs: [spec, text, document]
output: [table, docs, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [resilience, fallbacks, load-shedding, bulkheads, circuit-breakers]
pairs_with:
  personas: [software-architect]
  prompts: [add-retries-and-timeouts, plan-caching-strategy, plan-game-day, review-system-design]
args:
  - name: journey
    description: The service or user journey to protect, for example "checkout" or "home feed", and what success means for the user and the business.
    type: text
    required: true
  - name: dependencies
    description: Everything it calls or needs, internal and external, with how it is called (sync, async), current timeouts and anything known about their reliability.
    type: text
    required: true
  - name: business_rules
    description: What the business will and will not accept when degraded, for example "never show a wrong price" or "accept orders even if fraud scoring is down, up to a value".
    type: text
output_contract:
  format: markdown
  sections: [Criticality map, Degraded modes, Mechanisms, Switches and signals, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most outages that users notice are not total failures but one slow dependency dragging everything down: threads pile up waiting on it, retries multiply the load, and a non-essential widget takes the whole page with it. Graceful degradation decides in advance, per dependency, what the product does instead: hide the recommendations panel, serve a cached price list, queue the order for later confirmation, or switch to read-only. These are product decisions as much as technical ones, and some fallbacks are worse than failing (showing a stale balance, accepting an order you cannot fulfil). The mechanics are well known: tight timeouts below the caller's own budget, bulkheads that cap concurrency per dependency, circuit breakers, load shedding by priority, and switches operators can flip during an incident.
</context>

<task>
<journey>
{{journey}}
</journey>

<dependencies>
{{dependencies}}
</dependencies>

{{#business_rules}}
<business_rules>
{{business_rules}}
</business_rules>
{{/business_rules}}

1. Classify each dependency as critical (the journey cannot complete without it), degradable (the journey completes with less) or optional (can be dropped silently). Challenge any "critical" that could be degradable.
2. For each degradable or optional dependency, define the degraded mode the user experiences: hidden feature, cached or default data with a maximum age, deferred processing with a later notification, or reduced functionality. Mark fallbacks that risk correctness (stale prices, balances, stock) and the business rule that allows or forbids them.
3. For critical dependencies, define the failure experience: a clear error, a retry later message, a queue, or read-only mode, and how to keep it from cascading to other journeys.
4. Specify mechanisms per dependency: timeout (below the caller's budget, with the arithmetic), retry policy with backoff and a retry budget, bulkhead or concurrency limit, circuit breaker thresholds, and cache to serve from. Add load shedding: which request classes are dropped first when the service itself is overloaded.
5. Specify switches and signals: feature kill switches and degraded-mode flags operators can flip, which ones flip automatically, the metric and threshold that triggers each, and how users and support are told.
6. Plan verification: fault injection or game-day scenarios per dependency, what to observe, and the pass condition.
</task>

<constraints>
- Do not propose a fallback that returns wrong money, stock, permission or safety data without an explicit business rule that accepts it.
- Timeouts must be justified against the caller's budget; no blanket "30 seconds".
- Retries must have a cap and must not apply to non-idempotent calls without idempotency keys.
- Do not invent dependency SLAs; ask or label assumptions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Criticality map
Table: dependency, call type, class (critical, degradable, optional), user impact if down.
## Degraded modes
Per dependency: what the user sees, data age limit, correctness risk, business rule.
## Mechanisms
Table: dependency, timeout, retries, bulkhead, breaker, cache or fallback.
## Switches and signals
Table: switch, manual or automatic, trigger metric and threshold, who is told.
## Verification
Numbered fault-injection scenarios with pass conditions.
## Open questions
Numbered, each naming who should answer.
</output_format>
