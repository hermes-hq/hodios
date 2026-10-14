---
schema: 1
id: keep-rag-index-in-sync
kind: prompt
title: Keep a RAG index in sync with its sources
description: Builds incremental re-indexing for a RAG corpus that handles new, edited, deleted and moved documents, permission changes and embedding-model upgrades, with a reconciliation check.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build, operate]
role: [data-engineer, ml-engineer, backend-engineer, software-engineer]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [incremental-indexing, data-freshness, embeddings, reindexing]
pairs_with:
  prompts: [design-rag-pipeline, design-change-data-capture]
args:
  - name: sources
    description: Where documents come from (wiki, file storage, database, ticketing system), how changes can be detected (webhooks, modified timestamps, change feeds), corpus size and change rate.
    type: text
    required: true
  - name: index
    description: The vector or search store, the current ingestion code and how it runs today (for example a full rebuild every night).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Change detection, Sync design, Code, Model upgrades, Tests, Check, Monitoring]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
RAG demos index once; production corpora change every day. Common failures: deleted or unpublished documents keep being cited because deletes never reach the index; an edited document gets new chunks added while the old ones stay, so the model sees both versions; a moved or renamed document is indexed twice; permission changes lag, so a user sees content they lost access to; full nightly rebuilds get too slow and expensive; and an embedding-model upgrade mixes old and new vectors in one index, which ruins similarity ranking. Reliable sync keys every chunk to a stable source document id and a content hash, replaces a document's chunks atomically, propagates deletes, and has a reconciliation job that catches whatever the change feed missed.
</context>

<task>
Build incremental sync for these sources: {{sources}}

Index and current ingestion: {{index}}

1. Read the ingestion code, the chunk schema and how the store supports upserts, deletes by filter and aliases or collections.
2. Change detection per source: webhooks or change feeds where available, otherwise polling on modified time with a cursor; say how deletes and permission changes are detected for each, since timestamps alone miss deletes.
3. Identity: a stable source document id (not the path or title, which change on move or rename), a document version or content hash, and deterministic chunk ids derived from document id and chunk position or content.
4. Sync per changed document: skip if the hash is unchanged; otherwise re-parse, re-chunk, embed only new or changed chunks (reuse vectors for unchanged chunk hashes), then replace the document's chunk set atomically or in an order that never leaves both versions searchable. Deletes and access loss remove all chunks of the document.
5. Permissions: store access groups on chunks and update them without re-embedding when only permissions change.
6. Reconciliation: a periodic job that compares the set of source ids and hashes with the index and fixes drift, reporting counts.
7. Embedding-model upgrades: build a new index or collection with the new model in parallel, backfill, run the retrieval eval on both, then switch with an alias and keep the old one for rollback. Never mix models in one index.
8. Tests: edit, delete, move, permission change, unchanged document skipped, and a crash mid-sync that recovers. Run them and report.
</task>

<constraints>
- Never delete or rebuild the live index during testing; use a test collection or a disposable store.
- Make every sync step idempotent so retries are safe.
- If a source cannot report deletes, say so and rely on reconciliation with a stated maximum staleness.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Change detection
Table: source | adds and edits | deletes | permission changes | staleness.
## Sync design
Identity, hashing and the replace sequence, as numbered steps.
## Code
Code blocks with file paths.
## Model upgrades
The parallel index and switch procedure.
## Tests
Code blocks with file paths.
## Check
Commands run with real results.
## Monitoring
Lag, drift counts, failures and alerts.
</output_format>
