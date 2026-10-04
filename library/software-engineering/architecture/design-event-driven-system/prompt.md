---
schema: 1
id: design-event-driven-system
kind: prompt
title: Design an event-driven system
description: Designs an event-driven flow with event schemas, topics, partition keys, idempotent consumers, an outbox, retries, dead letters and replay. Use when moving synchronous calls onto a broker.
category: architecture
version: 1.0.1
status: incubating
aliases: [arch-event-driven]
stage: [design]
role: [backend-engineer, architect, tech-lead, data-engineer]
stack: []
requires: [none]
inputs: [spec, text, document]
output: [docs, diagram, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [event-driven, outbox-pattern, idempotency, dead-letter-queue, event-schema, message-broker]
pairs_with:
  personas: [software-architect, backend-engineer]
  prompts: [write-adr, review-system-design, implement-background-job]
args:
  - name: workflow
    description: The business flow to make event-driven, the services involved and how they call each other today.
    type: text
    required: true
  - name: throughput
    description: Expected event volume, for example "800 orders per minute at peak, 5x on sale days".
    type: string
  - name: broker
    description: Broker in use or preferred, for example Kafka, RabbitMQ, SQS and SNS, Google Pub/Sub or NATS. "any" lets the design recommend one.
    type: string
    default: any
  - name: consistency_needs
    description: What must never go wrong, for example "never charge twice", "stock must not go negative", "emails can arrive late".
    type: text
output_contract:
  format: markdown
  sections: [Summary, Flow, Event catalogue, Topology and ordering, Producers and the outbox, Consumers and idempotency, Failure handling, Replay and evolution, Observability, Assumptions and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id arch-event-driven."}
---
<context>
Moving a flow from synchronous calls to a broker trades one set of failure modes for another. Teams usually get the happy path right and then meet the hard parts in production: the database commit succeeds but the publish fails (or the reverse), a consumer processes the same message twice because delivery is at-least-once, events for the same order arrive out of order because the partition key was wrong, a poison message blocks a partition, a schema change breaks a consumer nobody knew about, and nobody can replay a week of events after a bug. A good design decides each of these explicitly, and also says plainly when a synchronous call is still the better choice for a step.
</context>

<task>
Design the event-driven version of this flow:

<workflow>
{{workflow}}
</workflow>

{{#throughput}}
Expected throughput: {{throughput}}
{{/throughput}}
Broker: {{broker}}
{{#consistency_needs}}
Consistency needs:
{{consistency_needs}}
{{/consistency_needs}}

1. If the flow, the services involved or the consistency needs are too vague to decide ordering and delivery guarantees, ask up to five specific questions and stop. Otherwise continue, labelling every assumption.
2. Map the flow: the steps, which service owns each, and for each step whether it should be an event (something that happened, owned by its producer), a command (a request for one specific service to act) or stay a synchronous call (when the caller needs the answer to proceed). Justify each choice in one line.
3. Define the event catalogue. Name events in the past tense in domain language (OrderPlaced, PaymentCaptured). For each: producer, consumers, trigger, payload fields with types, and whether it carries the full state (event-carried state transfer) or only ids (notification). Every event has an envelope with event id, type, schema version, occurred-at time in UTC, producer, correlation id and causation id; prefer the CloudEvents attribute names unless the team already has a convention.
4. Design the topology: topics, queues or streams; partition or ordering keys chosen from the entity whose events must stay in order; partition counts sized from the throughput with the arithmetic shown; retention; and consumer groups. State exactly which ordering is guaranteed (per key, never global) and what happens to it during retries and rebalances.
5. Make publishing reliable: use a transactional outbox (or change data capture on the outbox table) so the state change and the event commit together; describe the relay, its ordering and how it avoids publishing duplicates where it can. Say why dual writes are unsafe here.
6. Make consumers idempotent: assume at-least-once delivery, choose the deduplication strategy per consumer (a processed-message table keyed by event id written in the same transaction as the side effect, natural idempotency, or version checks), and handle out-of-order events with entity versions or by fetching current state.
7. Define failure handling: retry policy with exponential backoff and jitter, which errors are retryable, retry topics or delayed redelivery versus blocking retries, a dead-letter destination per consumer with the original payload and error metadata, alerting, and the runbook for inspecting, fixing and redriving dead letters. For multi-step business transactions, design the saga (choreography or orchestration, with the choice justified) and the compensating actions.
8. Plan replay and evolution: how a consumer rebuilds state from retained events or a snapshot, how to reprocess safely given idempotency, schema registry or contract checks, compatible-change rules (add optional fields; never rename or repurpose), and how a breaking change ships as a new event version alongside the old.
9. List what to observe: consumer lag per group, end-to-end latency from occurred-at, dead-letter counts, outbox backlog, duplicate rate, and the alerts on each.
10. If {{broker}} is "any", recommend a broker for this throughput, ordering and team and explain the deciding factors. Otherwise use the named broker's own concepts and limits, and say where a feature you rely on differs by broker.
</task>

<constraints>
- Do not introduce events where a synchronous call is simpler and the caller needs the result; say so instead.
- Never claim exactly-once delivery end to end. If the broker offers transactional or exactly-once features, state precisely what they cover and what still needs idempotent consumers.
- Do not invent broker limits, quotas or prices. When a number matters and you are not sure of it, say how to look it up.
- Keep business rules you were not given as marked assumptions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The design in at most 6 lines, including the broker and the delivery guarantee.
## Flow
A Mermaid sequence or flowchart diagram, then a table: step, owner, event or command or sync call, why.
## Event catalogue
Table: event, producer, consumers, partition key, payload fields, state or notification. Then one example event as JSON with its envelope.
## Topology and ordering
Topics or queues with partitions, retention and consumer groups, and the sizing arithmetic.
## Producers and the outbox
The outbox table, the relay and publish guarantees.
## Consumers and idempotency
Per consumer: dedup strategy, ordering handling, side effects.
## Failure handling
Retry policy, dead letters, redrive runbook and any saga with compensations.
## Replay and evolution
## Observability
Metrics and alerts as a table.
## Assumptions and open questions
Numbered. Each says what it affects.
</output_format>
