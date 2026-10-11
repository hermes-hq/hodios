---
schema: 1
id: find-lock-contention
kind: prompt
title: Find lock contention
description: Finds where threads wait on locks when throughput stops scaling with cores or concurrency, using lock profiles and thread dumps, then shrinks or splits critical sections with before-and-after numbers.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, operate]
role: [backend-engineer, software-engineer, sre]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, logs, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [lock-contention, concurrency, mutex-profile, thread-dump, scalability]
pairs_with:
  prompts: [profile-hot-path, read-flame-graph, debug-race-condition]
  personas: [performance-engineer, concurrency-specialist]
args:
  - name: symptom
    description: What you see (for example throughput flat beyond 8 threads while CPU is at 30%), the language and runtime, and where it happens.
    type: text
    required: true
  - name: evidence
    description: Thread dumps, lock or block profiles, or off-CPU profiles, if you have them.
    type: text
output_contract:
  format: markdown
  sections: [Result, Contended locks, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lock contention shows up as a system that does not get faster with more threads or cores, latency that rises with concurrency, and CPU that stays low while requests wait. An on-CPU profile misses it, because waiting threads are not on the CPU; it needs a lock or block profile (Go's mutex and block profiles, Java Flight Recorder lock events or async-profiler in lock mode, .NET contention events, off-CPU profiling with perf or eBPF tools) or repeated thread dumps showing many threads blocked on the same monitor. Typical culprits are hidden: a synchronized logger or metrics registry, a global cache map, a connection pool's internal lock, a singleton with a synchronized getter, the memory allocator, or I/O done while holding a lock. Waiting on a database row lock or a pool slot is a different problem and needs a different fix.
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}
</context>

<task>
Symptom: {{symptom}}

1. Confirm it is contention: measure throughput and latency at increasing concurrency, and capture a lock, block or off-CPU profile (or at least 3 thread dumps a few seconds apart) under load. Rule out pool exhaustion and database locks by checking their wait metrics.
2. Rank the contended locks by total wait time, with the owning code (`path:line`) and what runs inside each critical section.
3. Explain the cause for the top one or two: work inside the lock that does not need it (I/O, allocation, logging, serialization), one lock guarding unrelated data, or a hot shared counter or map.
4. Fix with the least risky option that works: move work out of the critical section; split the lock by key (striping or sharding); use a concurrent data structure or atomic counters; use per-thread or per-core buffers merged later; use a read-write lock only if reads dominate and critical sections are not tiny. Keep the invariants the lock protected and state them.
5. Re-run the same concurrency sweep and profile. Report throughput and latency at each level before and after, and run the existing tests plus a stress test with a race detector or sanitizer if the language has one.
</task>

<constraints>
- Do not remove a lock without stating the invariant it protected and how it is still kept.
- Report numbers from runs, not estimates.
- Do not introduce lock-free code when a simpler split or move-out fixes it.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
One line: throughput or latency at the target concurrency, before and after.
## Contended locks
Table: lock | `path:line` | wait time share | work inside.
## Cause
Short explanation for the top locks.
## Fix
The diff and the invariant kept for each change.
## Verification
Concurrency sweep results, tests and stress test results.
</output_format>
