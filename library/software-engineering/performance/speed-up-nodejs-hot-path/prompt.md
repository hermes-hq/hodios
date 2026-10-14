---
schema: 1
id: speed-up-nodejs-hot-path
kind: prompt
title: Speed up a Node.js hot path
description: Speeds up CPU-bound Node.js code from a CPU profile, fixing slow algorithms, allocation churn, JSON and regex costs and V8 deoptimisations, verified with repeatable benchmarks.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [backend-engineer, software-engineer, fullstack-engineer]
stack: [nodejs]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: expert
depth: advanced
tags: [cpu-profile, v8, allocations, benchmarking, hot-path]
pairs_with:
  prompts: [profile-hot-path, fix-event-loop-blocking, write-microbenchmark, read-flame-graph]
  personas: [performance-engineer, typescript-engineer]
args:
  - name: target
    description: The slow function, request or script, how it is run, the Node.js version, the input size, and the timing seen.
    type: text
    required: true
  - name: profile
    description: A CPU profile or flame graph summary, if you have one.
    type: text
output_contract:
  format: markdown
  sections: [Result, Hotspots, Changes, Verification, Left alone]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In Node.js, CPU-heavy code blocks the single JavaScript thread, so a hot path costs every concurrent request. The profile usually points to a handful of patterns: an accidental quadratic loop (`array.includes` or `find` inside a loop, `concat` or spread in a reduce), building large temporary arrays with chained `map`/`filter` over big inputs, repeated `JSON.parse`/`JSON.stringify` of the same data, and regular expressions built inside a loop or prone to catastrophic backtracking. V8 optimises functions that see consistent object shapes; adding properties in different orders, deleting properties, or passing many shapes through one function makes it megamorphic and slow. Garbage collection shows up as time in GC in the profile and is cut by allocating less in the loop. `node --cpu-prof` writes a profile any DevTools can open; micro-benchmarks need warm-up and many iterations because the JIT changes speed over time.
</context>

<task>
Target: {{target}}
{{#profile}}
Profile:
{{profile}}
{{/profile}}

1. Read the code path end to end and build a repeatable benchmark or timing harness with realistic input sizes, warm-up and enough iterations to see past noise. Record the baseline.
2. Capture a CPU profile with `node --cpu-prof` (or use the one given) and list the top self-time and total-time functions, plus the share of time in GC.
3. For each hotspot, name the cause: algorithmic complexity, allocation churn, repeated parsing or serialization, regex cost, polymorphic shapes, synchronous I/O, or a slow dependency.
4. Fix the biggest measured hotspot first with the smallest change: a Map or Set for lookups, a single pass instead of chained array methods on large data, hoisted regexes and constants, cached parsed data, consistent object shapes. Re-run the benchmark after each change and keep only changes that measurably help.
5. If the work is still too heavy for the main thread after fixes, propose moving it to a worker thread or a queue, with the trade-offs.
6. Run the test suite and confirm the output is unchanged on the benchmark inputs.
</task>

<constraints>
- Every claim of improvement needs before and after numbers from the same harness, with run count.
- Keep behaviour identical, including ordering and edge cases such as empty input and duplicates.
- Prefer readable fixes; do not apply micro-tricks that do not show up in the measurements.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Baseline and final timings, run count and Node.js version.
## Hotspots
Functions with `path:line`, their share of time and the cause.
## Changes
The diff, one sentence per change with its measured effect.
## Verification
Tests run and output comparison.
## Left alone
Ideas not applied and why, or "None".
</output_format>
