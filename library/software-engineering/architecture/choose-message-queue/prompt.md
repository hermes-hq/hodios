---
schema: 1
id: choose-message-queue
kind: prompt
title: Choose a message broker
description: Chooses between Kafka, RabbitMQ, SQS and SNS, Pub/Sub, NATS or Redis Streams from ordering, replay, throughput, delivery guarantees and the team's operating capacity.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, backend-engineer, devops-engineer, tech-lead]
requires: [none]
inputs: [spec, text, document]
output: [adr, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [message-broker, event-streaming, queues, rabbitmq, sqs]
pairs_with:
  personas: [software-architect]
  prompts: [choose-service-communication-style, design-event-driven-system, switch-message-broker, write-adr]
args:
  - name: use_cases
    description: What the messages are for (background jobs, events between services, streaming analytics, IoT telemetry), with volumes, message sizes and peak rates.
    type: text
    required: true
  - name: requirements
    description: Ordering, replay or retention needs, delivery guarantees, latency, fan-out, and any multi-region or compliance needs.
    type: text
  - name: environment
    description: Cloud or on-premises, existing infrastructure, managed services allowed, budget sensitivity, and who will operate it.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Requirements, Comparison, Operating cost, What would change the answer, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Brokers fall into two families that are often confused. Queues (RabbitMQ, SQS, most job systems) deliver each message to one consumer and delete it once acknowledged; they are good at work distribution, per-message retries, delays and dead-letter queues, and poor at replaying history. Logs (Kafka, Kinesis, Redpanda, Pub/Sub with retention, Redis Streams, NATS JetStream) keep an ordered, retained record that many consumer groups read at their own pace; they are good at fan-out, replay and high throughput, and ordering holds only within a partition, so the partition key decides what is ordered and how far consumers can scale. The operating cost often decides more than features: a self-run Kafka cluster needs real expertise, while a managed queue in the cloud you already use can be nearly free to run. Most teams with modest volumes and no replay need are best served by the managed queue they already have.
</context>

<task>
<use_cases>
{{use_cases}}
</use_cases>

{{#requirements}}
<requirements>
{{requirements}}
</requirements>
{{/requirements}}

{{#environment}}
<environment>
{{environment}}
</environment>
{{/environment}}

1. If volumes, retention or the operating environment are missing and would change the answer, ask up to four questions and stop. Otherwise continue and label assumptions.
2. Turn the use cases into requirements: queue or log semantics, ordering scope (none, per key, global), replay and retention, fan-out to several consumer groups, delivery guarantee (at most once, at least once, effectively once with idempotent consumers), delays and scheduled messages, dead-lettering, throughput and latency, message size.
3. Compare the realistic candidates for this environment (including the managed services of the cloud in use and anything already running) against those requirements. Drop candidates that fail a hard requirement and say which.
4. Estimate operating cost in people and money terms qualitatively: managed versus self-run, monitoring, upgrades, partition or queue management, and skills needed.
5. Recommend one broker (or one per use case if they truly differ) with the main reason, and note when one system for everything is worth some mismatch.
6. Say what would change the answer, such as needing replay later, multi-region or a tenfold volume increase.
</task>

<constraints>
- Do not claim exactly-once delivery end to end; explain what the broker offers and what consumers must still do.
- Do not quote prices, quotas or throughput limits as facts; give the direction and how to check current numbers.
- Do not recommend running a complex broker the team cannot operate without saying so.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Broker and reason in at most 5 lines.
## Requirements
Table: requirement, needed level, why.
## Comparison
Table: requirement, each candidate, with pass, partial or fail.
## Operating cost
## What would change the answer
## Open questions
Numbered.
</output_format>
