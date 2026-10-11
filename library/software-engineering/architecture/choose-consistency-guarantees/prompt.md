---
schema: 1
id: choose-consistency-guarantees
kind: prompt
title: Choose consistency guarantees per operation
description: Decides, operation by operation, which consistency each read and write needs (strong, read-your-writes, monotonic, eventual) given replicas, caches and services, and how to deliver it.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, dba]
requires: [none]
inputs: [spec, text, schema]
output: [table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [consistency, eventual-consistency, read-your-writes, replication-lag, distributed-systems]
pairs_with:
  personas: [software-architect]
  prompts: [design-cqrs-read-models, choose-database-for-workload, plan-caching-strategy]
args:
  - name: operations
    description: The user-facing reads and writes to decide for, for example "user changes email then reloads profile", "seller updates price, buyers see listing", "transfer between accounts".
    type: text
    required: true
  - name: topology
    description: Where data lives and how it is copied, for example primary plus read replicas, caches with TTLs, search index fed by events, other services holding copies.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Decision table, How each guarantee is delivered, Anomalies users may see, Tests, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Strong or eventual consistency" is usually asked at the level of the whole system, but the right answer differs per operation. A user who edits their profile must see their own edit (read-your-writes) even if other users see it seconds later; a feed can be eventually consistent; a stock decrement or account transfer needs a linearisable check at the moment of decision; a paginated list should not jump backwards between page loads (monotonic reads). Replicas, caches, search indexes and copies held by other services each introduce lag, and the usual bugs come from reading a lagging copy right after a write, or making a decision from a cache. Cheap techniques often deliver the needed guarantee without making everything strongly consistent: routing a user's reads to the primary for a short window after they write, version tokens, sticky sessions, or conditional writes.
</context>

<task>
<operations>
{{operations}}
</operations>

<topology>
{{topology}}
</topology>

1. For each operation, describe what goes wrong for the user or the business if it reads stale data, and how stale is tolerable (milliseconds, seconds, minutes).
2. Assign the weakest guarantee that is still correct: linearisable or strongly consistent, read-your-writes, monotonic reads, consistent prefix (causal order), bounded staleness, or eventual. Explain each choice in one sentence.
3. For each, state how the topology delivers it: which copy is read, how the read is routed after a write (primary pinning for a window, a write version or LSN the read waits for, session stickiness), conditional writes or compare-and-set for decisions, cache invalidation or bypass, and what happens if the guarantee cannot be met (wait, fall back to primary, or show a pending state).
4. List the anomalies users may still see with the chosen guarantees and whether each is acceptable, with UI mitigations such as optimistic updates or "processing" states.
5. Propose tests that would catch a violation: injected replica lag, cache staleness, concurrent writers, out-of-order events.
</task>

<constraints>
- Never let a decision about money, stock, permissions or uniqueness be made from a replica, cache or index that may lag, unless a conditional write on the primary makes the decision.
- Do not assign strong consistency everywhere by default; justify each strong requirement by its failure.
- Do not invent replication lag numbers; use the given ones or say how to measure them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decision table
Table: operation, failure if stale, tolerable staleness, guarantee, delivered by.
## How each guarantee is delivered
Per guarantee used: the mechanism and its cost.
## Anomalies users may see
Bullets with acceptable or not, and mitigation.
## Tests
Numbered.
## Open questions
</output_format>
