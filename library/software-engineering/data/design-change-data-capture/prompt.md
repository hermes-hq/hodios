---
schema: 1
id: design-change-data-capture
kind: prompt
title: Design change data capture
description: Designs log-based change data capture from an operational database to a warehouse, search index or cache, covering snapshot and stream, ordering, deletes, schema changes, outbox and lag.
category: data
version: 1.0.0
status: incubating
stage: [design]
role: [data-engineer, backend-engineer, architect]
stack: []
requires: [none]
inputs: [text, schema]
output: [report, diagram, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [change-data-capture, transactional-outbox, replication-slots, event-ordering, schema-evolution, replication-lag]
pairs_with:
  prompts: [design-data-pipeline, design-search-index, design-event-driven-system]
  personas: [data-engineer, database-administrator]
args:
  - name: source
    description: The source database, version and hosting (for example "Postgres 15 on a managed service", "MySQL 8 self-hosted"), and the tables to capture with rough sizes and write rates.
    type: string
    required: true
  - name: destinations
    description: Where changes must go (for example "warehouse", "search index", "cache invalidation", "another service").
    type: string
    required: true
  - name: requirements
    description: Optional. Freshness target, which consumers need deletes and history, ordering needs, tolerance for duplicates, personal data in the tables, team skills and existing streaming platform.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Pipeline, Snapshot and stream, Ordering and delivery, Deletes and schema changes, Operations, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A data or backend engineer wants changes from {{source}} to flow to {{destinations}} without dual writes in application code. Log-based change data capture reads the database's write-ahead or binary log, so it catches every committed change, but it has sharp edges: the initial snapshot must line up exactly with the stream position; a replication slot that no consumer reads makes the source keep log files until the disk fills; deletes need tombstones and full before-images that are not on by default; schema changes can stop the connector; delivery is at least once, so consumers must be idempotent; and capturing raw tables couples consumers to the internal schema. The transactional outbox (the app writes a domain event to an outbox table in the same transaction, and CDC ships only that table) trades setup for a stable contract.
{{#requirements}}
Requirements:
{{requirements}}
{{/requirements}}
</context>

<task>
1. Approach: decide between raw table capture and an outbox per destination. Raw capture fits replicating tables to a warehouse; the outbox fits other services and caches that need business events. Mention when CDC is overkill (a nightly batch export meets the freshness target) and recommend that instead.
2. Pipeline: source log settings needed (for example logical replication level and replica identity, or row-based binary logging with full row images, to verify for this engine), the connector, the transport (a log or queue, or direct), and per-destination sinks. Draw it as a short text diagram.
3. Snapshot and stream: how the initial load is taken consistently with the stream start position (connector snapshot mode, or a consistent export plus recorded position), how large tables are snapshotted without locking writes, and how to re-snapshot one table later.
4. Ordering and delivery: ordering is per key (partition by primary key), not global; consumers apply changes idempotently using the source position or a version column, ignore stale updates, and handle duplicates after restarts. Transactions spanning tables arrive as separate events unless the outbox carries them.
5. Deletes and schema changes: deletes as tombstones or soft-delete flags per destination; hard deletes for erasure requests must propagate to every sink. Schema changes: additive changes only by default, a schema registry or contract for events, and the procedure for renames and drops (expand and contract).
6. Operations: lag measured in time and bytes per slot or connector with alerts, an alert and runbook for an inactive slot growing the source's disk, connector restarts and offsets, a reconciliation job comparing counts or checksums between source and destination, and failover behaviour when the source primary changes.
7. Personal data: which columns are captured, masking or dropping sensitive ones in the pipeline, and retention in the transport.
</task>

<constraints>
- Do not state connector option names or engine settings as fact unless sure; mark them to verify in the docs for this version and hosting.
- If freshness, delete needs or write rates are missing and they change the design, ask, and mark assumptions as [X].
- Never recommend dual writes from application code as the main mechanism; explain why if the user proposes it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Approach
Recommendation per destination (raw capture, outbox or batch) with reasons.

## Pipeline
Text diagram and the source settings to enable.

## Snapshot and stream
Numbered procedure.

## Ordering and delivery
Bullets, including the idempotent apply rule per destination.

## Deletes and schema changes
Bullets.

## Operations
Table: signal | threshold | action.

## Risks and open questions
Bullets.
</output_format>
