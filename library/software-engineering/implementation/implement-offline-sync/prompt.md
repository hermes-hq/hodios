---
schema: 1
id: implement-offline-sync
kind: prompt
title: Implement offline-first sync
description: Implements offline-first sync for a mobile or web app with a local store, a mutation outbox, a server-ordered change feed, an explicit conflict policy and safe retries. Use for apps used offline.
category: implementation
version: 1.0.0
status: incubating
stage: [design, build]
role: [mobile-engineer, fullstack-engineer, frontend-engineer, backend-engineer]
stack: []
requires: [none]
inputs: [spec, schema, text]
output: [code, explanation, tests]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [offline-first, data-sync, conflict-resolution, crdt, local-first, outbox]
pairs_with:
  prompts: [implement-realtime-updates, implement-background-job]
  personas: [mobile-engineer, backend-engineer]
args:
  - name: app
    description: What the app does, who uses it offline and for how long, the platforms (iOS, Android, web, cross-platform framework), the backend, and how many devices or people can edit the same records.
    type: text
    required: true
  - name: data_model
    description: The entities that must work offline, their fields and relationships, roughly how much data each user holds, and which edits can collide (same record, same field, lists, free text).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Requirements and conflict policy, Data model changes, Sync protocol, Client, Server, Failure cases and tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who has built offline-first apps used in the field. Offline sync fails in ways users notice: edits that vanish, duplicates created by retries, deleted records that come back, and silent overwrites when two people edited the same thing. A design that holds up has these parts:
- A local database as the app's source of truth for the UI (SQLite on mobile, IndexedDB on the web), so the app reads and writes locally and syncs in the background.
- Client-generated ids (UUIDs, ideally time-ordered such as UUIDv7) so records can be created offline and referenced before the server sees them.
- An outbox: every local change is recorded as a mutation with an idempotency key, sent in order, and removed only after the server confirms. Retries are safe because the server deduplicates by key.
- A change feed ordered by the server: the client pulls "changes since cursor N", where N is a server-issued sequence or version, never the device clock.
- Tombstones for deletes, kept long enough for every device to sync, so deleted records do not reappear.
- A conflict policy chosen per entity or field: last-writer-wins by server order for low-value fields; field-level merge when people usually edit different fields; domain rules (an inventory count applied as a delta, not overwritten); CRDTs (for example Yjs or Automerge) for collaborative text and lists; or surfacing the conflict to the user when the data matters and cannot merge.
- Local schema migrations, storage limits and eviction (browsers can evict site data; ask for persistent storage), and auth tokens expiring while offline.

Several backends and sync engines provide much of this; adopting one is often better than building it, and the design questions stay the same.
</context>

<task>
Design and implement offline sync.

App:
{{app}}

Data model:
{{data_model}}

1. If it is unclear how long users stay offline, which records can be edited by more than one person, or which platforms are targeted, ask up to three questions and stop.
2. State the requirements and choose the conflict policy for each entity, and for individual fields where they differ, with the reason. Say whether an existing sync engine or backend feature would fit and what it would replace; continue with the custom design unless the user asked otherwise.
3. Define the data model changes: client ids, version or sequence columns, updated-by fields, tombstones, the outbox table, and the sync cursor.
4. Define the sync protocol: push (batching, ordering, idempotency, per-mutation results including rejections) then pull (changes since cursor, paging, tombstones), and when sync runs (app start, foreground, connectivity change, after local writes, periodic).
5. Implement the client: local writes plus outbox in one local transaction, the sync loop with exponential backoff and jitter, applying pulled changes without clobbering pending local edits, conflict handling per the policy, and UI state for pending, synced and failed items.
6. Implement the server: idempotent mutation handling, validation and authorisation per mutation, conflict detection using versions, the change feed endpoint, and tombstone retention.
7. List the failure cases and write tests for them.
</task>

<constraints>
- Never order or resolve conflicts by device clocks.
- Never drop a local change silently; a rejected mutation must be visible to the user or logged with a recovery path.
- Keep sensitive data stored on devices to what the feature needs, and say whether it should be encrypted at rest.
{{> guardrails/scope-discipline}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Requirements and conflict policy
Table: Entity or field | Who edits it | Policy | Why.
## Data model changes
Schema or migration code for client and server.
## Sync protocol
Request and response shapes for push and pull, as code blocks, and the triggers.
## Client
Code.
## Server
Code.
## Failure cases and tests
Tests for: a retry after a lost response not duplicating a record, a delete on one device while another edits offline, two devices editing the same field, an app killed mid-sync, a token expiring offline, and a local schema migration with pending outbox items.
</output_format>
