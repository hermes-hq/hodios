---
schema: 1
id: implement-message-queue-consumer
kind: prompt
title: Implement a message queue consumer
description: Implements a Kafka, SQS or RabbitMQ consumer with correct acknowledgement, ordering, redelivery, idempotent handling and a dead-letter queue. Use when a service must process broker messages.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer, data-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, schema, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [message-queue, consumer-groups, sqs, rabbitmq, dead-letter-queue, idempotency]
pairs_with:
  prompts: [implement-background-job, design-event-driven-system, implement-graceful-shutdown, drain-queue-backlog]
  personas: [backend-engineer]
args:
  - name: message_spec
    description: The broker, topic or queue, the message format, what processing does (writes, calls, side effects) and whether order matters.
    type: text
    required: true
  - name: stack
    description: Language, framework and client library. Leave empty to detect it from the repo.
    type: string
  - name: volume
    description: Expected throughput and processing time, for example "200 messages per second, each takes about 50 ms".
    type: string
output_contract:
  format: markdown
  sections: [Design decisions, Changes, Tests, Verification, Operating notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer writing a broker consumer. Every mainstream broker delivers at least once, so the consumer must survive duplicates, crashes mid-message and poison messages. Broker by broker:
- Kafka: order is guaranteed only within a partition, so the message key decides what stays ordered. Commit offsets after processing, not before (auto-commit can commit messages you have not finished). Processing that exceeds `max.poll.interval.ms` gets the consumer kicked out of the group and triggers a rebalance and redelivery. A message that always fails blocks its partition, so failures go to a retry topic or dead-letter topic after a bounded number of attempts.
- SQS: the visibility timeout must exceed processing time, or the message reappears and runs twice; extend it for long work. Delete only after success. A redrive policy with `maxReceiveCount` moves repeated failures to a dead-letter queue. FIFO queues order per message group id. Standard queues do not order and may duplicate.
- RabbitMQ: use manual acknowledgements and a prefetch limit. `nack` with requeue on a permanent failure loops forever; reject without requeue to a dead-letter exchange, and use delayed retry queues for transient failures.
- Idempotency: deduplicate by message id in the same transaction as the side effect, or make the write naturally idempotent (upsert by business key). Exactly-once claims rarely survive side effects outside the broker.
- Separate transient errors (retry with backoff) from permanent ones (bad payload: dead-letter immediately). Tolerate unknown fields so producers can evolve the schema.
- On shutdown, stop fetching, finish or release in-flight messages, then commit or acknowledge.
- Operators need consumer lag, processing time, error and dead-letter counts, and a way to replay dead-lettered messages.
</context>

<task>
Implement a consumer for:
{{message_spec}}

{{#stack}}Stack: {{stack}}{{/stack}}
{{#volume}}Volume: {{volume}}{{/volume}}

1. Read the existing consumers, broker configuration, client library, logging and metrics. Follow the existing pattern if there is one.
2. State the design: acknowledgement or commit point, ordering guarantees needed and how they are met, concurrency, idempotency method, retry and dead-letter policy, error classification, schema handling, and shutdown behaviour.
3. Implement the consumer, the handler (kept separate from broker plumbing so it can be unit tested), deduplication storage if needed, retry and dead-letter wiring, metrics and structured logs with the message id, and graceful shutdown.
4. Write unit tests for the handler and an integration test against a local or containerised broker if the project has that setup. Run them and the type check.
</task>

<constraints>
- Never acknowledge or commit before the side effect has succeeded.
- Never requeue permanent failures in an endless loop.
- Do not create, delete or reconfigure real topics or queues; put infrastructure changes in the project's infrastructure code and list them.
- Never invent client library functions or configuration keys; if unsure, say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Changes
One line per file: `path`, what changed, including infrastructure changes still to apply.
## Tests
One line per test. Cover at least: a duplicate message causes one side effect, a transient failure is retried, a permanent failure is dead-lettered, a crash before acknowledgement leads to redelivery, and unknown fields are tolerated.
## Verification
Commands run and their actual results.
## Operating notes
Metrics and alerts to watch, how to replay the dead-letter queue, and how to scale consumers.
</output_format>
