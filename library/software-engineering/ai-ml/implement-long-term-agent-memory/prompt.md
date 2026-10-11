---
schema: 1
id: implement-long-term-agent-memory
kind: prompt
title: Implement long-term memory for an assistant
description: Implements a user-scoped long-term memory store for an AI assistant, with write rules, deduplication, relevance retrieval, expiry, user-visible editing and deletion, plus tests.
category: ai-ml
version: 1.0.0
status: incubating
stage: [design, build]
role: [backend-engineer, ml-engineer, fullstack-engineer, software-engineer]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [long-term-memory, personalisation, embeddings, data-retention, user-privacy]
pairs_with:
  prompts: [extract-durable-user-preferences, implement-chat-history-management, redact-personal-data]
args:
  - name: assistant
    description: What the assistant does, the stack and database, whether a vector store is available, and what it should remember across sessions (examples help).
    type: text
    required: true
  - name: privacy_rules
    description: Consent, retention and deletion requirements, and categories of data that must never be stored.
    type: text
output_contract:
  format: markdown
  sections: [Memory design, Data model, Write path, Read path, Code, Tests, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Long-term memory makes an assistant feel personal, and it goes wrong in the same few ways. It stores everything, so retrieval surfaces trivia and stale facts ("user is moving to Berlin" two years later). It stores inferences as facts ("user is depressed") and sensitive data the user never asked it to keep. Contradicting memories pile up because new facts are appended instead of updating old ones. Memories leak between users because retrieval was not filtered by owner before ranking. Users cannot see or delete what is remembered, which breaks trust and often privacy law. And memory is injected into every prompt in full, so cost grows and irrelevant memories steer answers. A sound design has explicit write rules, update-or-add logic, owner-filtered retrieval with a small top-k, timestamps and expiry, and a user-facing view.
</context>

<task>
Implement long-term memory for: {{assistant}}
{{#privacy_rules}}
Privacy rules: {{privacy_rules}}
{{/privacy_rules}}

1. Read the existing conversation flow, storage and any embedding or vector search already in the project. Reuse them where possible.
2. Memory design: list the memory types worth keeping for this assistant (stable preferences, profile facts the user stated, ongoing projects, explicit "remember this" requests) and the ones never stored (inferences about health, beliefs or other sensitive traits, credentials, third parties' personal data, anything excluded by the privacy rules).
3. Data model: memory id, owner user id, text, type, source conversation and message id, created and last-confirmed timestamps, optional expiry, embedding (if used), and a deleted flag.
4. Write path: after a turn, extract candidate memories (use or adapt the project's extraction prompt), then for each candidate search the user's existing memories and decide add, update (replace a contradicting or refined memory) or skip duplicate. Only save what the user stated or explicitly asked to remember. Run writes asynchronously so they do not slow the reply.
5. Read path: retrieve with the owner filter applied before similarity ranking, top-k of 3 to 8 with a relevance threshold, optionally boosted by recency; inject them in a clearly labelled section with their dates, with an instruction that memories may be outdated and that the current conversation wins on conflict.
6. User control: endpoints or functions to list, edit and delete memories, delete all, and turn memory off; deletion removes embeddings too. Apply expiry if the rules require it.
7. Tests: user isolation, update replaces a contradicted memory, duplicate skipped, sensitive candidate not stored, deleted memory never retrieved, memory-off stops writes and reads. Run them and report.
</task>

<constraints>
- Never retrieve across users or tenants; the owner filter is part of the query, not a post-filter on the top results.
- Do not store inferred sensitive attributes. If the privacy rules are missing, assume consent is needed for anything beyond preferences and say so.
- Keep the injected memory section small and labelled; do not paste the whole store into prompts.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Memory design
Kept and never-stored types, with one example each.
## Data model
Fields and migration.
## Write path
Steps and the add, update or skip rule.
## Read path
Query, filters, top-k and how memories are injected.
## Code
Code blocks with file paths.
## Tests
Code blocks with file paths.
## Check
Commands run with real results, or a plain statement that they were not run.
## Open questions
Numbered, or "None".
</output_format>
