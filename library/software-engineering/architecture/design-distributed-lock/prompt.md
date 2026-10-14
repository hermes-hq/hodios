---
schema: 1
id: design-distributed-lock
kind: prompt
title: Design a distributed lock or avoid one
description: Decides whether work across many instances needs a distributed lock and designs it with leases, fencing tokens and failure behaviour, or replaces it with a lock-free alternative.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, sre]
requires: [none]
inputs: [spec, text, repo]
output: [docs, code, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [distributed-locking, leases, fencing-tokens, leader-election, concurrency]
pairs_with:
  personas: [software-architect]
  prompts: [implement-optimistic-locking, implement-idempotency-keys, implement-background-job, choose-consistency-guarantees]
args:
  - name: problem
    description: What must not happen concurrently, for example "two instances running the nightly billing job" or "two workers processing the same account", and what goes wrong if it does.
    type: text
    required: true
  - name: environment
    description: Number of instances, the datastores and coordination services available (Postgres, Redis, etcd, ZooKeeper, a cloud lock service), and the runtime.
    type: text
output_contract:
  format: markdown
  sections: [Do you need a lock, Recommended approach, Design, Failure scenarios, Tests, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Distributed locks are often added where something simpler is safer. A lock held over a network can always be lost without the holder knowing: a garbage collection pause or network partition outlasts the lease, another instance takes the lock, and both now think they own it. Locks are fine for efficiency (avoid doing the same work twice, where a rare duplicate is harmless) but for correctness (never double-charge, never corrupt data) they need fencing: a token that increases with each grant and that the protected resource checks, rejecting writes from older tokens. Many problems need no lock at all: a unique constraint, a conditional update or optimistic concurrency version, an idempotency key, partitioning work by key to one consumer (queue message groups, Kafka partitions), or SELECT ... FOR UPDATE SKIP LOCKED for job claiming. Advisory locks in the existing database are usually better than adding a new system just to lock.
</context>

<task>
<problem>
{{problem}}
</problem>

{{#environment}}
<environment>
{{environment}}
</environment>
{{/environment}}

1. If a repository is available, read the code that runs concurrently and the datastores it uses, and say what you read.
2. Classify the need: efficiency (duplicates are wasteful but harmless) or correctness (duplicates cause damage). State the consequence of two holders at once.
3. List lock-free alternatives that fit: database constraints, conditional writes with versions, idempotency keys, partitioning by key, job claiming with row locks, a single scheduled leader by platform features. Recommend one if it solves the problem.
4. If a lock is still needed, design it: the store (prefer one already in use), lock key naming, lease duration from the expected work time with margin, renewal while work runs, release on completion, behaviour when acquisition fails (skip, wait with timeout, queue), and fencing tokens checked by the protected resource when correctness depends on it.
5. Walk through failure scenarios: holder crashes, holder pauses longer than the lease, the lock store fails over or loses data, clock skew, network partition. For each, state what happens and whether it is acceptable.
6. Describe tests that simulate the scenarios, such as pausing a holder past its lease, and the metrics to watch (acquisition failures, lease expiries while working).
</task>

<constraints>
- Do not present a lease-based lock without fencing as safe for correctness-critical work.
- Do not add a new coordination system when the existing database can do the job, without saying why.
- Do not recommend lock algorithms by name as safe without stating their assumptions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Do you need a lock
Efficiency or correctness, and the consequence of two holders.
## Recommended approach
The alternative or lock design chosen, in at most 6 lines.
## Design
Bullets, with a short pseudocode block.
## Failure scenarios
Table: scenario, what happens, acceptable (yes or no), mitigation.
## Tests
## Open questions
Numbered.
</output_format>
