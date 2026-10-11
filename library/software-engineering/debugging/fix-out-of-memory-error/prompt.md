---
schema: 1
id: fix-out-of-memory-error
kind: prompt
title: Fix an out of memory crash
description: Fixes a process dying with Java heap space, JavaScript heap out of memory, Python MemoryError or an OOM kill by measuring what uses memory and fixing load patterns or limits, not just raising them.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, software-engineer, sre]
requires: [repo-read, file-write, shell]
inputs: [logs, stack-trace, file, config]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [out-of-memory, heap, oom-killer, streaming, memory-limits]
pairs_with:
  prompts: [find-memory-leak, diagnose-crashlooping-pod, fix-container-exits-on-start]
  personas: [debugger, performance-engineer]
args:
  - name: error
    description: The error or kill message and when it happens (on startup, on one request or job, after hours of running, during a build).
    type: text
    required: true
  - name: context
    description: Runtime and version, memory limits (container limit, -Xmx, --max-old-space-size), input sizes, and the code path suspected, if known.
    type: text
output_contract:
  format: markdown
  sections: [Kind of failure, Measurements, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who fixes out of memory crashes by first deciding which kind they are, because the fixes differ:
- A spike: one operation needs more memory than allowed, usually loading a whole file, result set or response into memory (`readFile` of a large upload, `fetchall()`, `findAll()` on a big table, building a large JSON string, `pandas.read_csv` of a file larger than RAM). Fix with streaming, pagination, batching, chunked reads or server-side cursors.
- A leak: memory grows across requests or time until it dies (that is the job of a leak hunt with heap snapshots).
- A limit mismatch: the runtime's heap limit and the container limit disagree. The JVM sizes its heap from container limits only with container support (default in modern JDKs; `-XX:MaxRAMPercentage`), and heap is not the whole process (metaspace, threads, direct buffers). Node's default old-space limit may be lower than the container allows (`--max-old-space-size`), or higher, so the kernel OOM-kills it first. Exit code 137 or `OOMKilled` means the kernel or container killed the process, not the runtime.
- A build: bundlers, TypeScript type checks and Gradle daemons running out of memory on large projects, often fixed by limits plus splitting work.
Signals to read: "Java heap space" versus "GC overhead limit exceeded" versus "Metaspace"; "JavaScript heap out of memory" with the last GC trace; Python `MemoryError` versus a silent kill; `dmesg` or the container's last state for OOM kills. Measuring beats guessing: peak RSS (`/usr/bin/time -v`), heap histograms (`jcmd GC.class_histogram`), Node `--heapsnapshot-near-heap-limit`, Python `tracemalloc` or memray.
Raising the limit is a valid fix only when the measured working set is legitimately larger than the limit and will stay bounded.
</context>

<task>
Fix this out of memory failure.

Error:
{{error}}
{{#context}}

Context:
{{context}}
{{/context}}

1. Classify it: spike, leak, limit mismatch or build, from the message, exit code and timing. If it grows over time, say this is a leak and hand off to a leak investigation with the evidence needed.
2. Measure: give or run the commands to capture peak memory and what holds it for this runtime, and the effective limits (container limit, heap flags, defaults). If you cannot measure, list exactly what to collect and stop.
3. Find the code or config responsible: read the path that runs when it fails and look for unbounded loads, large intermediate copies, unbounded caches or queues, and concurrency multiplying per-request memory.
4. Fix the cause: stream or paginate, process in batches, bound caches and concurrency, or align the heap limit with the container limit leaving headroom for non-heap memory. Raise a limit only with the measured need stated.
5. Verify by running the failing case (or a test with a large input) and showing peak memory before and after; run the related tests.
</task>

<constraints>
- Do not "fix" it only by raising memory limits without a measurement that shows the need is bounded.
- Do not add manual garbage collection calls (`System.gc()`, `gc.collect()`, `global.gc`) as the fix.
- Do not restart-on-crash as a fix; say if it is a stopgap.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Kind of failure
Spike, leak, limit mismatch or build, and the evidence.
## Measurements
Commands and results: peak memory, what holds it, effective limits.
## Cause
The code or configuration responsible.
## Fix
The diff and any limit changes with their justification.
## Verification
Before and after peak memory and test results.
</output_format>
