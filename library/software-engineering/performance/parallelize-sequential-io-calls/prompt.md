---
schema: 1
id: parallelize-sequential-io-calls
kind: prompt
title: Run independent I/O calls concurrently
description: Cuts request latency by running independent HTTP, database or service calls concurrently instead of one after another, with a limit, timeouts and clear error handling, measured.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [concurrency, async-await, fan-out, latency, timeouts]
pairs_with:
  prompts: [reduce-tail-latency, implement-asyncio-concurrent-requests, fix-event-loop-blocking]
  personas: [performance-engineer]
args:
  - name: target
    description: The slow handler, function or job that makes several calls in sequence.
    type: text
    required: true
  - name: trace
    description: A trace or timing log showing the calls and their durations, if available.
    type: text
output_contract:
  format: markdown
  sections: [Result, Dependency map, Changes, Error and limit handling, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a handler awaits five independent calls one after another, its latency is the sum; run concurrently, it is roughly the slowest one. This is often the cheapest large latency win in a service. The work is in proving independence: a call that needs another's result, shares a transaction or a non-thread-safe client, or must happen in order for side effects cannot simply be parallelised. Each language has its tool: Promise.all or Promise.allSettled in JavaScript, asyncio.gather or TaskGroup in Python, errgroup in Go, CompletableFuture or structured concurrency in Java, Task.WhenAll in C#, join or futures in Rust. Unbounded fan-out (one call per item in a list of 1,000) overloads downstream services and connection pools, so it needs a concurrency limit. Error semantics change: decide whether one failure fails the whole result or gives a partial response, and cancel the remaining calls when the result is already lost. A single database connection or transaction usually cannot run queries concurrently.
</context>

<task>
Target: {{target}}
{{#trace}}
Trace:
{{trace}}
{{/trace}}

1. Read the code path and list every I/O call in order, with its inputs, outputs, side effects and measured or estimated duration. Measure the current latency on a realistic request.
2. Build the dependency map: which calls need another call's result, which share a transaction, connection or client that is not safe for concurrent use, and which must stay ordered for side effects.
3. Group independent calls into stages and run each stage concurrently with the language's idiom. For calls over a collection, use a bounded concurrency limit sized to what the downstream and the connection pool can take.
4. Define error behaviour per call: required (fail the request) or optional (fall back), with a timeout on each call and cancellation of the remaining work when the request fails or the client disconnects.
5. Re-measure latency and check downstream impact (connection pool usage, rate limits). Run the tests and add one that covers the failure of one concurrent call.
</task>

<constraints>
- Do not parallelise calls that share a transaction or depend on order for correctness; list them as left sequential with the reason.
- Never leave fan-out unbounded.
- Keep results and error responses the same, unless the user agrees to partial results.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Latency before and after, measured on the same request.
## Dependency map
A list or small table of calls, what each depends on, and the stage it runs in.
## Changes
The diff with one sentence per change.
## Error and limit handling
Required versus optional calls, timeouts, concurrency limit and cancellation.
## Verification
Tests run and measurements.
</output_format>
