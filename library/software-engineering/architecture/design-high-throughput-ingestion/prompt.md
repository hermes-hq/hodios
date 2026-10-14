---
schema: 1
id: design-high-throughput-ingestion
kind: prompt
title: Design a high-throughput ingestion path
description: Designs an endpoint that takes in high volumes of events, telemetry or logs, with batching, buffering, partitioning, backpressure, validation and an explicit data loss guarantee.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, data-engineer, sre]
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
depth: advanced
tags: [ingestion, telemetry, batching, backpressure, partitioning]
pairs_with:
  personas: [software-architect]
  prompts: [estimate-system-capacity, choose-message-queue, design-load-shedding, choose-database-for-workload]
args:
  - name: workload
    description: What is ingested (analytics events, IoT readings, logs, metrics), from which clients, event size, average and peak rates, and growth.
    type: text
    required: true
  - name: requirements
    description: Acceptable data loss and duplication, latency until data is queryable, ordering needs, retention, and multi-tenant fairness.
    type: text
    required: true
  - name: environment
    description: Cloud or on-premises, existing brokers and stores, budget sensitivity and team skills.
    type: text
output_contract:
  format: markdown
  sections: [Guarantees, Pipeline, Edge endpoint, Buffer and partitioning, Downstream writers, Overload and failure, Capacity arithmetic, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Write-heavy ingestion is a different problem from serving requests. The edge must accept data fast and do almost nothing synchronously: authenticate, apply cheap validation and size limits, append to a durable buffer (a log-based broker or a managed stream) and acknowledge. Everything else (enrichment, deduplication, aggregation, writing to the store) happens downstream at its own pace, in batches, because per-event writes to a database are the usual bottleneck. The guarantees must be chosen explicitly: acknowledging before the buffer has the data means possible loss; client retries mean duplicates, so events need client-generated ids for deduplication. Clients should batch and compress, and SDKs should buffer locally with limits and back off on 429 or 503. Partition keys decide both ordering and hotspots: one huge tenant or device on one partition throttles everyone behind it.
</context>

<task>
<workload>
{{workload}}
</workload>

<requirements>
{{requirements}}
</requirements>

{{#environment}}
<environment>
{{environment}}
</environment>
{{/environment}}

1. State the guarantees chosen: loss (none after acknowledgement, best effort), duplicates (allowed with ids for dedupe), ordering scope, and freshness target. Challenge requirements that conflict with each other or with the budget.
2. Draw the pipeline from client to queryable store.
3. Design the edge endpoint: protocol and batch format, compression, authentication cost per request, validation done synchronously versus later, size limits, when to acknowledge, and response codes for throttling.
4. Design the buffer and partitioning: broker or stream choice, partition key with hotspot handling (salting or splitting large tenants), retention to cover downstream outages, and replay.
5. Design downstream writers: batch sizes and flush intervals, deduplication by event id within a window, schema validation with a dead-letter or quarantine path for bad events, and the store's write pattern (append-only, columnar, time-partitioned).
6. Design overload and failure handling: per-tenant quotas, backpressure to clients, behaviour when the buffer or the store is down, and client-side buffering limits and retry with jitter.
7. Do the capacity arithmetic for peak: events per second, bytes per second before and after compression, partitions needed, writer throughput, and storage per day, with assumptions shown.
</task>

<constraints>
- Do not write each event synchronously to a database in the request path.
- Do not claim zero loss and zero duplicates at the same time without explaining the mechanism and its cost.
- Show the arithmetic for capacity; do not quote service limits or prices as facts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Guarantees
Table: property, chosen level, mechanism.
## Pipeline
Mermaid flowchart.
## Edge endpoint
## Buffer and partitioning
## Downstream writers
## Overload and failure
## Capacity arithmetic
A worked calculation with assumptions.
## Open questions
Numbered.
</output_format>
