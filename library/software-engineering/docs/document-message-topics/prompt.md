---
schema: 1
id: document-message-topics
kind: prompt
title: Document message topics and queues
description: Writes a catalog of Kafka topics or message queues with owners, producers, consumers, schemas, keys, ordering, retention and dead-letter handling for internal teams.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [backend-engineer, data-engineer, architect]
requires: [repo-read, file-write]
inputs: [repo, config, schema]
output: [docs, table]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [event-driven, message-queue, event-catalog, asyncapi]
pairs_with:
  prompts: [document-webhook-events]
args:
  - name: system
    description: The services, topic configs and schema files to cover (Kafka, RabbitMQ, SQS/SNS, Pub/Sub, NATS or similar).
    type: text
    required: true
  - name: format
    description: markdown writes a human catalog; asyncapi also writes an AsyncAPI document.
    type: enum
    enum: [markdown, asyncapi]
    default: markdown
output_contract:
  format: markdown
  sections: [Catalog written, Unowned or orphaned, Contract risks, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Event-driven systems lose track of themselves: nobody knows who still consumes `order-events-v2`, whether the key is the order id or the customer id, or how long messages are kept. A team about to change a payload or replay a topic needs exactly those facts. For each topic or queue the questions that matter are: who owns it, who produces and who consumes it, the schema and where it is registered, the message key (which decides partitioning and therefore ordering), delivery guarantees (at-least-once means consumers must be idempotent), retention and compaction, the dead-letter and retry setup, and the compatibility rule for schema changes. AsyncAPI can describe channels and messages in a machine-readable way, but a short human catalog is what most teams read first.
</context>

<task>
Write a catalog of the topics or queues in:

<system>
{{system}}
</system>

1. Find every topic or queue from infrastructure config (Terraform, Helm values, topic creation scripts, broker config) and from code (producer and consumer client setup, framework annotations such as `@KafkaListener`, queue names in config).
2. For each, record: name, purpose in one sentence, owning team or service, producers, consumers (with consumer group), schema (Avro, Protobuf, JSON Schema or none) and its registry subject, compatibility mode, message key, partitions, delivery guarantee, retention or TTL, compaction, retry and dead-letter destination, and an example message from tests or fixtures.
3. Note the ordering guarantee consumers can rely on, derived from the key and partitioning.
4. Flag topics with no consumer, consumers of topics no longer produced, missing schemas, keys that break ordering assumptions, and consumers that are not idempotent under at-least-once delivery.
5. Write the catalog as one Markdown page with a summary table and a section per topic. {{#format}}Format requested: {{format}}. If asyncapi, also write an AsyncAPI document with channels, operations and message payloads that match the schemas.{{/format}}
6. Put the catalog where the repo keeps architecture docs and link it from the services' READMEs if they exist.
</task>

<constraints>
- Every fact must come from config, code or schema files. Unknown fields stay blank with "unknown" rather than guessed; retention and partition counts in production may differ from repo defaults, so say where each value came from.
- Do not change topic configs, schemas or code.
- Do not copy real production payloads containing personal data into examples; use fixtures or synthetic values.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the catalog file(s). Then reply with:
## Catalog written
Path(s), number of topics or queues, and the sources used.
## Unowned or orphaned
Topics without an owner, producer or consumer.
## Contract risks
Missing schemas, weak compatibility modes, ordering or idempotency problems.
## Questions for the owners
Facts that could only be confirmed in production or by the owning team.
</output_format>
