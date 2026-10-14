---
schema: 1
id: reduce-memory-footprint
kind: prompt
title: Reduce a service's memory footprint
description: Cuts steady-state memory of a service or container that is too big but not leaking, splitting heap from native and runtime overhead, then ranks fixes by megabytes saved and verifies under load.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, operate]
role: [backend-engineer, sre, devops-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, logs, config, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [memory-usage, rss, container-limits, heap-analysis, oom]
pairs_with:
  prompts: [find-memory-leak, tune-garbage-collector, profile-hot-path]
  personas: [performance-engineer]
args:
  - name: service
    description: The service, language and runtime, its memory limit and current usage (RSS over time), and what pushed you to act (OOM kills, cost, density).
    type: text
    required: true
  - name: evidence
    description: Heap histograms or snapshots, runtime memory stats, container metrics, if any.
    type: text
output_contract:
  format: markdown
  sections: [Result, Where the memory goes, Fixes ranked, Changes made, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A process that is big but flat is not leaking; it needs a footprint breakdown, not a leak hunt. Resident memory (what the container limit counts) is the managed heap plus runtime overhead: thread stacks times thread count, JIT code caches, metaspace or class data, native buffers, memory-mapped files, and allocator fragmentation (glibc malloc arenas multiply on many-threaded processes). On the managed heap the usual waste is loading whole files or result sets instead of streaming, caches without size bounds, duplicate strings, boxed numbers and per-object headers in large collections, and large default buffers. Runtime settings matter too: heap limits that ignore the container limit, or are set so high that the GC never needs to collect, inflate usage without any code problem.
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}
</context>

<task>
Service: {{service}}

1. Confirm it is not a leak: memory flat or bounded over a long run at steady load. If it grows without bound, stop and say this is a leak problem instead.
2. Break down resident memory: heap used versus heap reserved, non-heap runtime areas, thread count and stack size, native allocations and mapped files. Use the runtime's own tools (native memory tracking, runtime memory stats, heap histograms) and say which numbers are measured.
3. Inside the heap, list the largest object types or retainers and why they exist: whole-payload loading, unbounded or oversized caches, duplicated data, wasteful representations.
4. Rank fixes by megabytes saved per effort and risk: stream instead of load; bound caches by size; shrink thread pools or use smaller stacks; compact representations; tune heap and GC limits to the container (a heap limit as a fraction of the container, a soft memory limit, allocator arena limits) only after code fixes.
5. Apply the top fixes, then run the same load and report resident memory and peak, plus latency and throughput to show nothing regressed.
</task>

<constraints>
- Do not raise the memory limit as the fix; mention it only as a stopgap with its cost.
- Do not change GC or heap settings without measuring latency and throughput after.
- Separate measured numbers from estimates.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
One line: resident memory steady and peak, before and after.
## Where the memory goes
Table: area | size | measured or estimated.
## Fixes ranked
Numbered: fix | MB saved | effort | risk.
## Changes made
The diff summary.
## Verification
Load run results including latency and throughput.
</output_format>
