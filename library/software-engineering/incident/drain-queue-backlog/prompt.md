---
schema: 1
id: drain-queue-backlog
kind: prompt
title: Recover from a growing queue backlog
description: Works a live queue or consumer-lag incident, finding whether producers surged, consumers slowed or a poison message is stuck, and plans a safe drain without overloading downstream systems.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, backend-engineer, data-engineer]
stack: []
requires: [none]
inputs: [logs, text, config]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [consumer-lag, message-queue, poison-message, dead-letter-queue, backpressure]
pairs_with:
  prompts: [triage-production-alert, collect-incident-evidence, write-incident-update, write-runbook]
  personas: [incident-commander, site-reliability-engineer]
args:
  - name: situation
    description: The queue or topic, how fast the backlog or lag is growing, since when, the oldest message age, and what consumers and producers are doing now. Paste graphs as numbers, error logs and recent changes.
    type: text
    required: true
  - name: system
    description: The broker and setup (for example Kafka with 12 partitions, a cloud queue with a dead-letter queue, a job queue on Redis), consumer count and concurrency, retry policy, and what the consumers write to downstream.
    type: text
    required: true
---
<context>
You help an on-call engineer recover a queue that is backing up. A backlog grows for three different reasons and the fix differs: producers sent more (a traffic spike, a replay, a bug producing duplicates); consumers got slower or fewer (a slow downstream database or API, a deploy, crashes, rebalancing loops); or consumption stopped on part of the queue (a poison message retried forever, a stuck partition, an expired lease). The common mistakes are scaling consumers when the bottleneck is a downstream database, which turns a backlog into an outage; scaling past the partition count in Kafka, which adds idle consumers; purging messages that cannot be recovered; and draining at full speed so a downstream system or an email provider is flooded. Messages also age: some lose value or become harmful if processed late.

<situation>
{{situation}}
</situation>

<system>
{{system}}
</system>
</context>

<task>
1. Classify the cause as producer surge, consumer slowdown, partial stop, or unclear, using rates in versus out, per-partition or per-queue lag, consumer errors and restarts, and downstream latency. If it is unclear, give the next three checks, ordered by speed, and ask for their results; keep the later sections to safe holding actions and mark the drain plan as waiting on those results.
2. Stabilise first: stop the growth if possible (throttle or pause a bulk producer, stop a replay), and protect downstream systems.
3. For a poison message or stuck partition: how to find the message (repeated errors at the same offset or id), how to move it aside to a dead-letter queue or skip it while recording what was skipped, and how to reprocess it later.
4. Plan the drain: the safe consumption rate given downstream capacity, how to scale consumers within the partition or concurrency limits, batching, and the expected time to clear (backlog divided by net drain rate), shown as arithmetic.
5. Decide what to do with old messages: messages that are now stale or harmful if delivered late (notifications, expired offers), which should be filtered or handled differently; ask the user to confirm before discarding anything.
6. Give the verification: lag trend, oldest message age, downstream error rates and latency, duplicate processing checks if consumers are not idempotent.
7. List follow-ups: alerting on oldest message age not only depth, autoscaling limits, a dead-letter policy, idempotency.
</task>

<constraints>
- Never recommend purging or deleting messages without stating they will be lost and asking for confirmation; prefer moving them aside.
- Do not recommend more consumers than partitions for partitioned topics, or more load than the downstream system can take; say how to check that capacity.
- Warn about duplicate processing whenever offsets are reset or messages are replayed.
- Use only facts from the inputs; mark guesses as hypotheses.
{{> output/uncertainty}}
</constraints>

<output_format>
## Cause
Classification with the evidence, or the next checks if unclear.
## Stabilise now
Numbered actions.
## Stuck or poison messages
Steps, or "Not indicated".
## Drain plan
Rate, scaling, batching, and time-to-clear arithmetic.
## Stale messages
Bullets and the decision needed from the user.
## Verify
Bullets.
## Follow-ups
Bullets.
</output_format>
