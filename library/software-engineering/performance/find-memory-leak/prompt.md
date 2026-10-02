---
schema: 1
id: find-memory-leak
kind: prompt
title: Find a memory leak
description: Confirms whether memory growth is a real leak, finds what retains the memory using heap snapshots and retainer paths, fixes the cause and proves memory stays flat. Use when a process keeps growing.
category: performance
version: 1.0.0
status: experimental
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
tags: [memory-leak, heap-snapshot, garbage-collection, oom]
args:
  - name: symptom
    description: What grows, where, how fast, and what you see (for example "RSS grows 50 MB per hour until the container is OOM-killed").
    type: text
    required: true
  - name: environment
    description: Runtime and version, where it runs, and what tools or access you have.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Evidence, Retainer path, Fix, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Memory that grows is not always a leak: caches warm up, runtimes delay collection, and allocators keep freed memory. A real leak is memory that is still reachable but will never be used again, and it is found by following what holds on to it, not by reading code and guessing. The fix is proven only when memory stays flat over many repetitions of the triggering work.
</context>

<task>
Investigate: {{symptom}}
{{#environment}}
Environment:
{{environment}}
{{/environment}}

1. Decide what to measure: heap used after garbage collection, not resident memory alone. Note what in the symptom is already measured and what is assumed.
2. Reproduce locally if you can: run the suspected operation in a loop (requests, jobs, messages), force or wait for garbage collection between rounds where the runtime allows it, and record heap size after each round. Flat after warm-up means no leak; steady growth per round means a leak in that operation.
3. Take heap snapshots at three points (after warm-up, after N rounds, after 2N rounds) with the runtime's tool (for example the inspector for Node.js, tracemalloc for Python, pprof heap and goroutine profiles for Go, a heap dump with an analyser for the JVM, dotnet-gcdump for .NET, heaptrack or LeakSanitizer for native code). Find the object types whose count grows with the rounds.
4. Follow the retainer path from a growing object to its root, and name the code that holds the reference. Common causes: unbounded caches or maps, event listeners or subscriptions never removed, timers or intervals never cleared, closures that capture large objects, global registries, unclosed connections or streams, and goroutines or threads that never exit.
5. Fix the cause (bound the cache, remove the listener, close the resource, end the task), then repeat step 2 and compare.
</task>

<constraints>
- Do not "fix" by raising memory limits, restarting the process on a schedule or calling the garbage collector by hand.
- Name the retainer path with evidence from snapshots or profiles; do not report a cause you inferred only from reading code without saying so.
- If you cannot reproduce the growth, say so, and give the exact measurements to collect from the environment where it happens.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Verdict
One line: leak confirmed in [operation], not a leak, or not reproduced.
## Evidence
Table: round, heap after collection. Then the object types that grew.
## Retainer path
From the growing object to its root, with `path:line` of the code that holds it.
## Fix
The diff, then one sentence on why it releases the memory.
## Verification
The same measurement after the fix, with real numbers.
</output_format>
