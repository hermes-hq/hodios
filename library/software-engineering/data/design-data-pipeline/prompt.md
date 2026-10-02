---
schema: 1
id: design-data-pipeline
kind: prompt
title: Design a data pipeline
description: Designs a batch or streaming data pipeline sized to stated volumes, covering sources, schedule, idempotency, late data, backfills and monitoring. Use before building or replacing a pipeline.
category: data
version: 1.0.0
status: experimental
stage: [design]
role: [data-engineer, backend-engineer, architect]
requires: [none]
inputs: [spec, text]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [idempotency, backfill, late-data, cdc]
pairs_with:
  prompts: [write-data-quality-checks, design-star-schema]
  personas: [data-engineer]
args:
  - name: requirements
    description: Sources, destinations, who consumes the data and how fresh it must be, correctness needs, retention and any personal data involved.
    type: text
    required: true
  - name: volume
    description: Rows or events per day or second, payload size, and expected growth.
    type: string
  - name: stack
    description: Tools already in use or required (orchestrator, warehouse, streaming platform, cloud).
    type: string
output_contract:
  format: markdown
  sections: [Summary, Requirements and assumptions, Architecture, Idempotency and late data, Backfills, Monitoring and alerts, Failure modes, Sizing and cost, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pipelines rarely fail on the happy path. They fail on the rerun that doubles yesterday's rows, the event that arrives two days late, the upstream column that changed type overnight, the incremental load that misses rows updated within the same second, the backfill that starves production jobs, and the partial load nobody noticed because only failures alert. Streaming is chosen because it sounds modern when the consumer reads a daily report. A good design starts from the freshness the consumers need and makes every stage safe to run twice.
</context>

<task>
Design a pipeline for:
{{requirements}}
{{#volume}}

Volume: {{volume}}
{{/volume}}
{{#stack}}

Stack: {{stack}}
{{/stack}}

1. Pin down requirements: each source (type, how changes can be captured, rate limits), each destination, the consumers and their freshness need, delivery semantics (exactly-once effect, or at-least-once with deduplication), retention, and personal data handling. If freshness or volume is missing and would change the design, ask; otherwise state the assumption.
2. Choose batch, micro-batch or streaming, justified by the freshness need and volume rather than preference. Size it: events or rows per second at peak, bytes per day, growth over two years, and the partitioning scheme that follows.
3. Ingestion: change data capture, incremental extraction by a cursor column, or full snapshots. For cursor-based extraction, handle ties on the cursor value, clock skew and deletes that the cursor cannot see.
4. Idempotency: make every stage safe to rerun by overwriting deterministic partitions or merging on keys, with deduplication keys and a run identifier recorded on output rows.
5. Late and out-of-order data: event time versus processing time, the watermark or lookback window, and how corrections reach downstream tables.
6. Schema evolution: the contract with each producer, what happens on a breaking change (fail, quarantine, or dead-letter), and who is told.
7. Orchestration: the dependency graph, schedule, retries with backoff, timeouts and SLAs.
8. Backfills: parameterised by date range, throttled, isolated from scheduled runs, and validated afterwards.
9. Monitoring: freshness, volume, schema, null rates, consumer lag, rejected records and cost, each with a threshold, an owner, and whether it blocks publishing.
10. List failure modes: what breaks, how it is detected, and how to recover.
</task>

<constraints>
- Use the given stack. If none is given, use the fewest components that meet the requirements, and name alternatives only as examples.
- Show the sizing arithmetic, and label numbers you supplied as assumptions.
- Do not add streaming, a lakehouse, or a message bus unless a stated requirement needs it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
One paragraph, then a Mermaid or ASCII diagram of the flow.

## Requirements and assumptions
Bullets, with assumptions marked.

## Architecture
Stage by stage: what it does, the technology, and the schedule or trigger.

## Idempotency and late data
How reruns and late events are handled at each stage.

## Backfills
The procedure and its safeguards.

## Monitoring and alerts
Table: signal | threshold | owner | blocks publishing (yes or no).

## Failure modes
Table: failure | detection | recovery.

## Sizing and cost
The arithmetic and the main cost drivers.

## Open questions
Only those whose answers would change the design.
</output_format>
