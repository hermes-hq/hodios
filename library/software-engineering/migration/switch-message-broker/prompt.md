---
schema: 1
id: switch-message-broker
kind: prompt
title: Switch message brokers
description: Plans moving producers and consumers to a new message broker, mapping delivery, ordering, retry, dead-letter and retention semantics, with a bridge or dual-publish period and idempotent consumers.
category: migration
version: 1.0.0
status: incubating
stage: [plan, design, ship]
role: [backend-engineer, architect, sre]
stack: []
requires: [none]
inputs: [text, config, spec]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [message-queues, event-streaming, dual-publish, idempotency, dead-letter-queue]
pairs_with:
  prompts: [design-event-driven-system, plan-incremental-migration]
  personas: [migration-engineer]
args:
  - name: setup
    description: Current and target broker or queue service, the topics or queues, producers and consumers, message volumes and sizes, and the guarantees the business relies on (ordering, no loss, delays).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Semantic differences, Topic and queue mapping, Consumer changes, Migration sequence, Verification and rollback, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Brokers look interchangeable until the semantics are written down. A log-based broker keeps messages after consumption, orders only within a partition and tracks consumer offsets, so one slow or poison message holds up its whole partition and there is no built-in dead-letter queue. A queue-based broker deletes on acknowledgement, can route by pattern, supports per-message retry and dead-lettering, and loses order once consumers compete. Managed cloud queues add their own limits on message size, visibility timeouts, retention and ordering modes. In practice every option delivers at least once, so consumers must be idempotent whatever "exactly-once" claims say. Migrations go wrong at the overlap: messages processed twice, lost in the gap, or out of order when old and new paths run together.
</context>

<task>
Setup:
{{setup}}

1. Write the semantic differences that matter for this system, side by side: delivery guarantee, ordering scope, acknowledgement or offset model, retries and dead-lettering, delayed messages, retention and replay, routing, message size, consumer scaling limits (for example partitions cap parallel consumers).
2. Map every current topic or queue to the target: name, partitioning or ordering key, retention, dead-letter and retry design, and the schema and its compatibility rule.
3. List consumer changes: idempotency with a dedup key and where it is stored, poison-message handling, how retries become retry topics or queues if the target has none, and ordering assumptions that the new model breaks.
4. Choose the migration sequence and justify it: a bridge that copies old to new, dual publishing from producers, or moving consumers first. Order the flows from lowest to highest risk. For each step: who reads where, how duplicates are absorbed and how gaps are prevented.
5. Verification: message counts and checksums per flow on both sides, consumer lag, dead-letter volume, end-to-end latency. Rollback for each step, and the condition to delete the old topics.
</task>

<constraints>
- Do not claim exactly-once delivery end to end; design for at-least-once.
- Do not state limits or quotas of a specific service as facts unless sure; mark them to verify.
- Keep ordering guarantees the business relies on, or say plainly which ones change.
{{> output/uncertainty}}
</constraints>

<output_format>
## Semantic differences
Table: property | current | target | impact here.
## Topic and queue mapping
Table: source | target | key | retention | retry and dead-letter | schema rule.
## Consumer changes
Bullets per consumer.
## Migration sequence
Numbered steps with duplicate and gap handling.
## Verification and rollback
Checks per step and rollback path.
## Open questions
Bullets.
</output_format>
