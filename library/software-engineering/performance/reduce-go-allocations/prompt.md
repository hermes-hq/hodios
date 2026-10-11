---
schema: 1
id: reduce-go-allocations
kind: prompt
title: Cut allocations in a Go hot path
description: Cuts heap allocations in a Go hot path using alloc profiles and escape analysis, with preallocation, buffer reuse, sync.Pool and fewer interface conversions, proven with benchmarks.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [backend-engineer, software-engineer]
stack: [go]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [pprof, escape-analysis, sync-pool, benchmarks, allocations]
pairs_with:
  prompts: [tune-garbage-collector, write-microbenchmark, profile-hot-path]
  personas: [performance-engineer]
args:
  - name: target
    description: The function, handler or package that allocates too much, and why it matters (GC CPU, latency, throughput).
    type: text
    required: true
  - name: profile
    description: Output of go test -bench with -benchmem, or a pprof alloc_space or alloc_objects top list, if available.
    type: text
output_contract:
  format: markdown
  sections: [Result, Allocation sources, Changes, Benchmark evidence, Left alone]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In Go, fewer allocations means less GC work, and GC CPU and pauses grow with allocation rate. The compiler decides what escapes to the heap; `go build -gcflags=-m` shows why a value escapes (returned pointers, stored in interfaces, captured by closures that outlive the call, too large or of unknown size for the stack). The common hot-path allocations are: slices and maps grown by append without capacity, string concatenation and fmt.Sprintf in loops (strings.Builder or strconv.Append* avoid it), []byte to string conversions, values boxed into interface{} or any (including logging arguments and fmt), per-request buffers that could be reused, and closures. sync.Pool is for short-lived, frequently reused objects of similar size; it must reset objects before reuse and must not hold huge buffers, or it keeps memory alive. Benchmarks with -benchmem and benchstat over several runs are the evidence; one run is noise.
</context>

<task>
Target: {{target}}
{{#profile}}
Profile or benchmark:
{{profile}}
{{/profile}}

1. Read the code. If there is no benchmark for the hot path, write one with realistic input and b.ReportAllocs, and record allocs/op, B/op and ns/op over several runs (-count).
2. Get an allocation profile (go test -memprofile or pprof alloc_space and alloc_objects) and list the top allocation sites. Run escape analysis on the package and explain why each top site escapes.
3. Fix the biggest sites first, one change at a time: preallocate slices and maps with known sizes, reuse buffers across iterations, strings.Builder or append-style formatting instead of Sprintf, avoid interface boxing on hot paths, return values instead of pointers where the value is small, and sync.Pool only for objects that are reused at high rates.
4. After each change, rerun the benchmark and compare with benchstat; keep the change only if it helps measurably and keeps the code clear.
5. Run the full test suite, and the race detector if you introduced pooling or buffer reuse.
6. List allocation sites you chose not to change and why (cold path, readability cost, tiny gain).
</task>

<constraints>
- Every claim of improvement must come from benchmark output with several runs, not from reasoning alone.
- Do not introduce unsafe or reflection tricks, or share pooled buffers that callers can still reference.
- Keep behaviour identical; pooled objects must be fully reset.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
allocs/op, B/op and ns/op before and after.
## Allocation sources
Top sites with `path:line`, the share of allocations and why each escapes.
## Changes
The diff with one sentence per change.
## Benchmark evidence
benchstat output or a summary of runs.
## Left alone
Sites not changed and why, or "None".
</output_format>
