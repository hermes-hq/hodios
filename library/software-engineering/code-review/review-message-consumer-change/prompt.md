---
schema: 1
id: review-message-consumer-change
kind: prompt
title: Review a message consumer change
description: Reviews queue or event consumer code for duplicate delivery, ordering assumptions, acking before the work is done, poison messages and retry storms.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, software-engineer]
requires: [none]
inputs: [diff, config]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [message-queues, idempotency, at-least-once, dead-letter, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-event-schema-change, drain-queue-backlog, review-transaction-boundaries]
args:
  - name: diff
    description: The consumer or handler change with file paths, including the subscription, ack and retry setup.
    type: text
    required: true
  - name: context
    description: Broker (Kafka, RabbitMQ, SQS, Pub/Sub, NATS, a database-backed queue), delivery guarantee, partition or group keys, retry and dead-letter configuration, and expected volume.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Delivery assumptions, Findings, Tests to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Almost every broker delivers at least once, so every consumer will see duplicates: on redelivery after a timeout, after a rebalance, after a crash between doing the work and acking it. A handler that sends an email, charges a card or increments a counter must be idempotent, usually with a processed-message key stored in the same transaction as the effect. Ordering is guaranteed only within a partition, message group or single queue with one consumer, and is lost as soon as there are retries or concurrency, so "updated" can arrive before "created". Acking or committing the offset before the work completes loses messages on crash; acking after a slow call can exceed the visibility timeout and cause a second delivery. A message that always fails (bad payload, deleted entity) must go to a dead-letter queue after bounded retries, or it blocks a partition or loops forever. Retries without backoff turn a downstream outage into a retry storm. Batch handlers that fail one item must not redo or drop the rest.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. State the delivery assumptions: broker, guarantee, ordering scope, concurrency, when the message is acked or the offset committed. If the context does not say, read the configuration or ask; assume at-least-once and unordered across keys if unknown.
2. Check idempotency: what happens if this exact message is processed twice, or twice concurrently on two consumers. Identify every side effect (writes, emails, payments, outbound calls, published messages) and whether it is guarded by a dedupe key, a conditional write or a natural idempotent operation.
3. Check ordering: does the handler assume earlier events were processed (entity exists, state is X)? What happens on out-of-order or late delivery? Is there a version or timestamp check?
4. Check ack and commit placement relative to the work and to the database commit; check processing time against the visibility timeout or poll interval.
5. Check failure handling: which errors are retried and which are permanent, retry limit and backoff, dead-letter routing, what a poison message does to the partition or queue, and whether failures are logged with the message id.
6. Check batches: partial failure handling, offset commits for half-processed batches.
7. Check producing side, if present: publish inside a database transaction or before commit (needs an outbox), keys that decide partitioning and ordering.
8. For each finding, give the delivery sequence that causes it (duplicate, reorder, crash point, poison payload) and the smallest fix.
</task>

<constraints>
- Do not accept "the broker guarantees exactly once" without the configuration that proves it end to end, including side effects outside the broker.
- Every finding includes a concrete delivery sequence and the visible consequence (double email, lost order, stuck partition).
- Fixes use the broker client and patterns the codebase already uses.
- At most 8 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Delivery assumptions
Bullets: broker, guarantee, ordering scope, ack point, retry and dead-letter setup; mark each as read from code or assumed.
## Findings
Numbered: severity, `path:line`, delivery sequence, consequence, fix.
## Tests to add
Bullets: duplicate, reorder, crash-before-ack and poison message tests.
</output_format>
