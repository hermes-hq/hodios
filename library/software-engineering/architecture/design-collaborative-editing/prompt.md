---
schema: 1
id: design-collaborative-editing
kind: prompt
title: Design real-time collaborative editing
description: Designs real-time collaborative editing with CRDTs or operational transform, presence, persistence, offline merges and permission checks on every change.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [fullstack-engineer, frontend-engineer, architect, tech-lead]
requires: [none]
inputs: [spec, text, repo]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [crdt, operational-transform, multiplayer-editing, presence, offline-first, realtime]
pairs_with:
  personas: [software-architect, fullstack-engineer]
  prompts: [implement-offline-sync, implement-realtime-updates]
args:
  - name: document
    description: What is being edited together (rich text, spreadsheet cells, a canvas, a form, JSON config) and how many people edit one document at once.
    type: text
    required: true
  - name: requirements
    description: Offline editing, history and undo, comments, permissions, expected document sizes and platforms.
    type: text
  - name: stack
    description: Frontend framework, backend and storage, and any editor library already used.
    type: string
output_contract:
  format: markdown
  sections: [Recommendation, Data model, Sync architecture, Persistence and history, Permissions and validation, Presence, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most "collaborative" features do not need a CRDT. If people rarely edit the same field at once, field-level last-writer-wins with conflict detection, or soft locks ("Anna is editing"), is cheaper and easier to reason about. True simultaneous editing of rich text or structured documents needs either operational transform (a central server transforms concurrent operations; mature for text, hard to build correctly) or CRDTs (replicas converge without a central order; good for offline and peer sync, at the cost of metadata growth and tombstones). Mature libraries exist for both, and writing a merge algorithm from scratch is rarely justified. The data model decides what merges well: a list of blocks with stable ids merges better than one big string, and moving items needs explicit support. The server still matters with CRDTs: it authenticates, checks permissions per update, persists updates and periodic snapshots, and rejects edits to parts a user may not change. Presence (cursors, selections) is ephemeral and should travel on a separate channel, never stored in the document. Undo must be per-user, not global.
</context>

<task>
<document>
{{document}}
</document>
{{#requirements}}
Requirements: {{requirements}}
{{/requirements}}
{{#stack}}
Stack: {{stack}}
{{/stack}}

1. If a repository is available, read the current document model, save path and editor integration before proposing changes.
2. Decide whether real concurrent editing is required. If conflicts are rare or per-field, recommend locking or field-level merge with conflict detection and explain the threshold for moving to CRDT or OT.
3. If concurrent editing is required, choose CRDT or OT for this document type and requirements (offline need tips toward CRDT; a central server and text-only tip toward either), and recommend using an established library over a custom algorithm, naming the property to look for rather than inventing library features.
4. Design the document representation: stable ids for blocks, rows or shapes, what is a register versus a list versus a map, and how moves and deletes behave.
5. Describe sync: local apply, send updates, server relay and persist, peers apply, awareness channel for presence, and reconnect with state vector or version exchange.
6. Describe persistence: append updates, periodic snapshots, compaction of history, named versions, and per-user undo.
7. Describe server-side permission checks per update, validation of document schema, and how schema migrations apply to live documents.
</task>

<constraints>
- Do not recommend writing a custom CRDT or OT algorithm unless the user has a stated reason; point to proven libraries and the properties to check.
- Do not claim a library supports a feature unless you are sure; say what to verify.
- Never trust the client for permissions; every update is checked on the server.
- Keep presence out of the persisted document.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
CRDT, operational transform, or simpler locking or last-writer-wins, and why, in at most five lines.
## Data model
How the document is represented for merging and what granularity conflicts resolve at.
## Sync architecture
A Mermaid diagram plus steps from local edit to every peer, including reconnect.
## Persistence and history
Snapshots, update logs, compaction, versions and undo.
## Permissions and validation
How the server enforces who may change what.
## Presence
Cursors, selections and awareness, kept out of the document.
## Risks
Bullets: performance, document growth, schema changes, test strategy.
</output_format>
