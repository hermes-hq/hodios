---
schema: 1
id: find-memory-leak
kind: prompt
title: Find a memory leak
description: Finds a memory leak from heap snapshots, memory metrics and code, naming the retaining path and the minimal fix with a regression check. Use when memory grows until a process is killed or restarted.
category: performance
version: 1.0.1
status: incubating
aliases: [debug-memory-leak]
stage: [maintain, verify]
role: [backend-engineer, frontend-engineer, software-engineer, sre]
stack: []
requires: [none]
inputs: [logs, file, text]
output: [report, diff, tests]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [memory-leak, heap-snapshot, retaining-path, oom]
args:
  - name: symptoms
    description: What you observe - memory over time, restarts or OOM kills, when it started, load pattern, recent changes, and suspect code if any.
    type: text
    required: true
  - name: heap_data
    description: Heap snapshot comparison, allocation profile, retainer paths, GC logs or pprof output.
    type: text
  - name: runtime
    description: Runtime and version, e.g. "node 22", "jvm 21", "go 1.23", "python 3.12", "browser (react app)".
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Retaining path, Evidence, Fix, Regression check, Next captures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id debug-memory-leak."}
---
<context>
Not every rising memory graph is a leak. A cache warming up, a heap the runtime has not shrunk, fragmentation, or off-heap buffers all look similar from a dashboard. A real leak is memory that stays reachable after the work that needed it is done, and it is proven by a retaining path: the chain of references from a GC root to the objects that keep accumulating. Fixes made without that path tend to move the leak rather than remove it.
</context>

<task>
Find the leak{{#runtime}} in this {{runtime}} process{{/runtime}}.
Symptoms:
{{symptoms}}
{{#heap_data}}
Heap and profiling data:
{{heap_data}}
{{/heap_data}}

1. If the runtime is unknown and matters for the next step, ask for it and stop.
2. Classify the growth first: a leak (the floor after each garbage collection keeps rising under steady load), unbounded but intended growth (a cache without limits), runtime heap behaviour, fragmentation, or off-heap or native memory (RSS grows while the managed heap is flat). Say which evidence supports the classification.
3. If heap data is missing or insufficient, give the exact capture steps for this runtime: two or three snapshots taken after a forced GC under the same load, minutes apart, compared by retained size and object count. Stop there with hypotheses ranked by likelihood.
4. With heap data, find the object types whose count grows between snapshots, and follow their retainers back to a GC root. Write that chain as the retaining path.
5. Match the path to code. Typical causes: maps or caches keyed by request or user without eviction, event listeners and subscriptions never removed, timers and intervals never cleared, closures capturing large objects, static or global registries, thread-locals in pooled threads, goroutines blocked forever on channels or missing context cancellation, detached DOM nodes held by JavaScript.
6. Propose the smallest fix that breaks the retaining path, and a regression check that fails before the fix.
</task>

<constraints>
- Do not claim a cause without evidence from the data or the code. Mark each hypothesis with what would confirm or rule it out.
- Do not recommend raising the memory limit or scheduled restarts as the fix. You may mention them as a stop-gap, labelled as such.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Verdict
Leak, not a leak, or not yet determined, with one sentence of evidence.
## Retaining path
GC root → … → leaking objects, or "Not yet established".
## Evidence
Bullets citing snapshot numbers, metrics or code locations.
## Fix
A diff and one sentence on why it breaks the path.
## Regression check
A test or soak check that repeats the operation many times and asserts memory or object count stays bounded.
## Next captures
What to capture next if anything is unconfirmed, or "None".
</output_format>
