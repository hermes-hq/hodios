---
schema: 1
id: design-firestore-data-model
kind: prompt
title: Design a Firestore data model
description: Designs Firestore collections, documents and subcollections from the app's screens, with denormalised fields, composite indexes, a structure that security rules can check, and read-cost estimates.
category: data
version: 1.0.0
status: incubating
stage: [design]
role: [mobile-engineer, fullstack-engineer, frontend-engineer]
stack: [firebase]
requires: [none]
inputs: [text, spec]
output: [report, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [firestore, nosql-modelling, denormalisation, composite-indexes, read-costs, subcollections]
pairs_with:
  prompts: [write-firestore-security-rules, implement-offline-sync]
args:
  - name: app
    description: What the app does, its screens and what each shows, who can see and edit what, and real-time needs.
    type: text
    required: true
  - name: scale
    description: Optional. Users, daily active users, items per user or group, and how often screens are opened.
    type: text
output_contract:
  format: markdown
  sections: [Screens and queries, Data model, Example documents, Indexes, Rules fit, Read cost estimate, Trade-offs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Firestore bills per document read, has no joins, and queries one collection (or a collection group) at a time with limited operators, so the model follows the screens. Each screen should be served by one query or a few document gets; showing a list with each item's author name means copying that name into each item and updating copies when it changes (with a Cloud Function or batched write). Documents are capped at 1 MiB and sustained writes to a single document are limited (roughly one per second), so counters on popular documents need distributed counters or aggregation queries. Subcollections suit data owned by a parent and fetched separately (messages in a chat); a top-level collection with an owner field suits data queried across parents, though collection group queries can span subcollections. Security rules cannot run queries to check access cheaply, so ownership and membership must be readable from the document itself or from a small number of `get()` calls, which also bill reads. Composite indexes must exist for multi-field queries, and real-time listeners bill a read for each changed document.
</context>

<task>
App: {{app}}
{{#scale}}Scale: {{scale}}{{/scale}}

1. List each screen or feature with the query it needs (collection, filters, order, limit) and whether it is real-time.
2. Design the collections and subcollections, document ids, and denormalised fields, each tied to a screen. Say which copies must be kept in sync and how.
3. Write example documents with invented values.
4. List composite indexes needed and any single-field index exemptions (for example large text or array fields).
5. Rules fit: show that each read and write can be authorised from the document path and fields (owner ids, member maps or role fields), and point to where full rules would be written.
6. Estimate reads per screen open and per day from the stated scale, flag expensive screens, and suggest fixes (pagination, caching, aggregation documents or count queries).
7. Trade-offs: hot documents, fan-out writes, offline behaviour, and what the model makes hard later.
</task>

<constraints>
- Every screen must be served without a client-side join over many documents unless the cost is stated.
- State figures such as write rate per document and document size limits as approximate and to verify against current Firebase documentation.
- Do not write the security rules in full; design the data so rules can enforce access.
- Example data is invented.
{{> output/uncertainty}}
</constraints>

<output_format>
## Screens and queries
Table: screen | query | real-time?

## Data model
Tree of collections and documents with fields.

## Example documents
JSON.

## Indexes
List.

## Rules fit
Bullets per collection.

## Read cost estimate
Table: screen | reads per open | opens per day | reads per day.

## Trade-offs
Bullets.
</output_format>
