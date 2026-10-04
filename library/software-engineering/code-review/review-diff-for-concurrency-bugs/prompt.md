---
schema: 1
id: review-diff-for-concurrency-bugs
kind: prompt
title: Review a diff for concurrency bugs
description: Reviews a change for data races, lock ordering, missed awaits, check-then-act and cancellation leaks, naming the exact interleaving that breaks each finding. Use on concurrent or async code.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, mobile-engineer, software-engineer]
subject: [computer-science]
stack: []
requires: [none]
inputs: [diff]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [race-condition, deadlock, async, thread-safety, interleaving]
pairs_with:
  prompts: [review-pull-request, debug-race-condition]
  personas: [concurrency-specialist]
args:
  - name: diff
    description: The unified diff or changed files, plus any surrounding code that touches the same shared state (fields, caches, globals, database rows).
    type: text
    required: true
  - name: language
    description: Language and runtime, for example "Go 1.22", "Kotlin coroutines on Android", "Python asyncio", "Java 21 with virtual threads". Leave empty to infer from the diff.
    type: string
    default: ""
  - name: concurrency_model
    description: How this code runs concurrently, for example "HTTP handlers on a thread pool", "single event loop", "3 replicas reading the same Postgres rows", "actor per device". Leave empty if unknown.
    type: string
    default: ""
output_contract:
  format: markdown
  sections: [Verdict, Shared state, Findings, Not a problem, Tests to add]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review one change only for concurrency defects. A general review skims these because the code looks right when read top to bottom; concurrency bugs only appear when two executions interleave. Reviewers lose credibility with vague "this might not be thread-safe" comments, so every finding here names the shared state, the two (or more) actors, and the exact order of steps that produces a wrong result. If you cannot write that interleaving, it is not a finding.

Language and runtime: {{language}}
Concurrency model: {{concurrency_model}}
</context>

<task>
<diff>
{{diff}}
</diff>

1. Work out the execution model. If neither the language nor the concurrency model is clear from the diff, state your assumption (for example "handlers run concurrently on a pool") in Verdict and review under it. If the answer would change most findings, ask the one question that settles it and stop.
2. List every piece of shared mutable state the diff reads or writes: fields on long-lived objects, module or static variables, caches and maps, singletons, files, database rows, queues, and external resources. Note who writes it and under what protection.
3. Check each against these patterns:
   - unsynchronised read-modify-write (counters, `x = x + 1`, append to a shared list, lazy init without a once guard);
   - check-then-act across a gap (`if not exists: create`, `get` then `put` on a map, balance check then debit; in a database, a SELECT followed by UPDATE without a lock, a unique constraint or a conditional write);
   - lock problems: inconsistent lock order across code paths (deadlock), holding a lock across I/O, `await` or callbacks, releasing on only the happy path, locking a different object than the one other paths use;
   - async mistakes: a missing `await` or unhandled promise, fire-and-forget tasks that swallow errors, blocking calls on an event loop or UI thread, shared state mutated across an `await` point as if it were atomic;
   - visibility and publication: non-volatile flags, publishing a partly built object, double-checked locking without the language's memory guarantees;
   - collections and caches: non-thread-safe maps under concurrent writes, iterating while another task mutates, cache stampede on a miss, stale cache after a write;
   - cancellation and lifetime: tasks, goroutines or coroutines that outlive their caller, missing context or timeout propagation, resources not released on cancel, leaked locks or semaphores;
   - ordering across processes: idempotency of retried messages, out-of-order delivery, two replicas running the same scheduled job.
4. For each confirmed defect, write the interleaving as numbered steps for actor A and actor B, and the wrong result it produces (lost update, duplicate row, deadlock, crash, stale read). Rate severity: critical (data loss, corruption, money, deadlock in production paths), high (wrong results under normal load), medium (needs unusual timing), low (hardening).
5. Give the smallest correct fix in the idiom of the language: an atomic operation, a lock with consistent ordering, a single-flight or once guard, a conditional write or unique constraint, a channel or actor that owns the state, or structured concurrency for lifetimes. Prefer removing sharing over adding locks.
6. Name what you looked at and judged safe, so the author knows it was checked.
7. Propose tests that would expose the defects: a race detector or sanitizer run (for example `go test -race`, ThreadSanitizer), a stress test with barriers or latches forcing the interleaving, or a deterministic scheduler where the platform has one.
</task>

<constraints>
- Every finding cites `path:line`, the shared state and a concrete interleaving. No interleaving, no finding.
- At most 8 findings, ranked by severity. Do not comment on style, naming or general design unless it causes a concurrency defect.
- Do not claim a race the language rules out (for example plain variables inside a single-threaded event loop with no `await` between read and write), and say so in Not a problem.
- When safety depends on code outside the diff (who calls this, how many replicas run), state the assumption instead of guessing.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, then one sentence on the overall concurrency risk and any assumption made.
## Shared state
Table: State | Where | Written by | Protected by.
## Findings
Numbered. Each: severity, `path:line`, the defect in one sentence, the interleaving as numbered A/B steps, the wrong result, the fix.
## Not a problem
Bullets: suspicious-looking code judged safe, and why.
## Tests to add
Bullets: the test or tool, and which finding it would catch.
</output_format>
