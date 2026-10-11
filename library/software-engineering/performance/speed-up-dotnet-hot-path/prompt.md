---
schema: 1
id: speed-up-dotnet-hot-path
kind: prompt
title: Speed up a .NET hot path
description: Speeds up a hot .NET code path with BenchmarkDotNet and profiler evidence, cutting allocations with Span and pooling, fixing LINQ and async overhead, and avoiding boxing and needless copies.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [backend-engineer, software-engineer]
stack: [dotnet]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [benchmarkdotnet, span, arraypool, allocations, linq]
pairs_with:
  prompts: [tune-garbage-collector, write-microbenchmark, profile-hot-path]
  personas: [performance-engineer]
args:
  - name: target
    description: The slow method, endpoint or loop, and the symptom (CPU, latency, allocations, GC).
    type: text
    required: true
  - name: evidence
    description: BenchmarkDotNet results, dotnet-trace or dotnet-counters output, or profiler screenshots described as text.
    type: text
output_contract:
  format: markdown
  sections: [Result, Where the cost is, Changes, Benchmark evidence, Left alone]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
.NET hot-path costs are mostly allocations and hidden work. LINQ chains allocate enumerators and delegates and may enumerate twice; in a tight loop a plain for loop or a single pass is cheaper. String.Split, Substring and string concatenation allocate; Span<T>, ReadOnlySpan<char> and span-based parsing (int.Parse on spans, Utf8 APIs) avoid it. Large temporary arrays belong in ArrayPool<T>.Shared, returned in finally. Value types stored as object or non-generic interfaces box. Async methods that usually complete synchronously can use ValueTask, but only when the caller awaits once; async over sync work, Task.Run in ASP.NET request paths and .Result or .Wait() blocking cause thread pool starvation, which looks like slowness. Closures capturing variables allocate per call. Regex should be static and compiled or source-generated. BenchmarkDotNet with MemoryDiagnoser is the standard evidence; Debug builds or attached debuggers give misleading numbers.
</context>

<task>
Target: {{target}}
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}

1. Read the code. Write a BenchmarkDotNet benchmark for the hot path with realistic input and [MemoryDiagnoser] if none exists, and run it in Release.
2. If the problem shows up only under load, use dotnet-counters (GC, thread pool queue length, exception rate) and dotnet-trace to find the hot methods and allocation sites.
3. Fix the biggest costs one at a time: replace LINQ in hot loops, use spans for parsing and slicing, pool large buffers, avoid boxing, cache delegates and Regex instances, remove sync-over-async and needless Task.Run, and use ValueTask only where it fits.
4. Rerun the benchmark after each change and keep only measurable wins that keep the code readable.
5. Run the test suite. Report results.
6. List candidate changes left alone and why.
</task>

<constraints>
- Measure in Release builds without a debugger attached; quote BenchmarkDotNet mean, error and allocated columns.
- Do not use unsafe code or stackalloc of unbounded sizes.
- ArrayPool buffers must be returned in finally and never used after return.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Mean time and allocated bytes before and after.
## Where the cost is
Hot methods and allocation sites with `path:line`.
## Changes
The diff with one sentence per change.
## Benchmark evidence
BenchmarkDotNet summary table before and after.
## Left alone
Ideas not applied and why, or "None".
</output_format>
