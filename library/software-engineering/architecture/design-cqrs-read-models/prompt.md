---
schema: 1
id: design-cqrs-read-models
kind: prompt
title: Design CQRS read models
description: Designs separate read models (projections) for query-heavy screens or APIs, with what feeds them, how lag is surfaced to users, rebuilds, ordering and when plain queries are enough.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, data-engineer]
requires: [none]
inputs: [spec, schema, text]
output: [docs, table, diagram]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [cqrs, projections, read-models, eventual-consistency, denormalisation]
pairs_with:
  personas: [software-architect]
  prompts: [design-event-driven-system, design-change-data-capture, choose-database-for-workload, write-adr]
args:
  - name: queries
    description: The slow or complex reads to serve, for example a dashboard, a search page or a public listing API, with their filters, sort orders, volumes and freshness needs.
    type: text
    required: true
  - name: write_side
    description: How the data is written today, the source tables or aggregates, write volume, and whether domain events or change data capture already exist.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Recommendation, Read models, Update pipeline, Consistency and user experience, Rebuild and versioning, Operations]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
CQRS separates the model that accepts writes from one or more models shaped for reads. It helps when reads need joins across many tables or services, different storage (search, analytics, a key-value cache), or far higher volume than writes. It costs a pipeline to maintain, data that lags behind writes, and projections that must be rebuildable from scratch. Many teams reach for it when an index, a materialised view or a read replica would do. When it is warranted, the hard parts are ordering and idempotency of updates, telling users that what they see may be seconds old (or reading their own writes from the write side), and rebuilding a projection when its shape changes without downtime.
</context>

<task>
<queries>
{{queries}}
</queries>

<write_side>
{{write_side}}
</write_side>

1. For each query, first check cheaper options in order: better indexes or query rewrite, a database view or materialised view, a read replica, a cache. Recommend CQRS read models only for the queries those cannot serve, and say why.
2. For each read model: its purpose, the store that suits it (relational table, document store, search index, key-value), its schema or document shape, the key, and which queries it answers.
3. Design the update pipeline: the source of changes (domain events from an outbox, change data capture, or synchronous dual write, with why dual writes are risky), the projector that applies them, ordering guarantees per key, idempotent upserts using a version or sequence number, and how deletes and corrections propagate.
4. Specify consistency: expected lag and the target, how the UI or API handles it (read-your-writes from the write model for the author, "updated a few seconds ago" hints, optimistic UI), and which decisions must never be made from the read model (for example authorisation or balance checks).
5. Specify rebuild and versioning: how a projection is rebuilt from the full history or a snapshot, running the new version side by side and switching reads, and how long a full rebuild would take at current volume (show the arithmetic from given numbers or say what is needed).
6. Specify operations: lag metrics and alerts, a dead-letter path for events the projector cannot apply, reconciliation checks between write and read sides, and who owns each projection.
7. Draw the data flow as a Mermaid diagram.
</task>

<constraints>
- Do not recommend CQRS for a query a straightforward index or view would serve.
- Never let a security or money decision depend on a lagging read model.
- Do not invent throughput figures for a store; reason from the given volumes or state what to measure.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Per query: plain query, view, replica, cache or read model, with the reason. At most 8 lines.
## Read models
Table: name, purpose, store, key, shape, queries served.
## Update pipeline
Steps and a Mermaid flow diagram.
## Consistency and user experience
Lag target and how each screen or API copes.
## Rebuild and versioning
Numbered procedure.
## Operations
Bullets: metrics, alerts, dead letters, reconciliation, ownership.
</output_format>
