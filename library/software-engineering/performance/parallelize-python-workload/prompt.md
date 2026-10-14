---
schema: 1
id: parallelize-python-workload
kind: prompt
title: Parallelize a slow Python job
description: Picks threads, processes, asyncio or vectorisation for a slow Python job based on whether it is I/O- or CPU-bound and the GIL, then implements it and measures the speed-up against the original.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, data-engineer, backend-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [gil, multiprocessing, concurrent-futures, asyncio, thread-pool]
pairs_with:
  prompts: [speed-up-dataframe-code, implement-asyncio-concurrent-requests, profile-hot-path]
  personas: [performance-engineer]
args:
  - name: target
    description: The slow script, function or job, how long it takes and how much data it processes.
    type: text
    required: true
  - name: environment
    description: Python version, machine or container cores and memory, and where it runs (laptop, server, notebook, serverless).
    type: text
output_contract:
  format: markdown
  sections: [Result, Bottleneck, Approach and why, Changes, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The right tool depends on what the time is spent on, so profile first. Waiting on network or disk: threads (ThreadPoolExecutor) or asyncio give large speed-ups because the GIL is released during I/O. Pure Python CPU work: threads do not help in standard CPython builds because of the GIL; processes (ProcessPoolExecutor, multiprocessing) do, at the cost of pickling arguments and results and process start-up, so chunks must be big enough. Free-threaded CPython builds exist but most deployments do not use them, so check before relying on them. Numeric loops often gain more from vectorising with NumPy or pandas than from any parallelism, and C extensions that release the GIL can run in threads. Process pools need the if __name__ == "__main__" guard on platforms that spawn, cannot pickle lambdas or open connections, and multiply memory. Running out of cores in a container limited to 2 CPUs while os.cpu_count() says 64 is a common mistake.
</context>

<task>
Target: {{target}}
{{#environment}}
Environment:
{{environment}}
{{/environment}}

1. Read the code and measure the baseline on a realistic input. Profile (cProfile, py-spy or line timing) to split time into I/O waits, pure Python CPU, and native library calls.
2. Choose the approach and explain why: vectorise, threads, asyncio, processes, or a combination, or no parallelism if the bottleneck is elsewhere (a slow query, an algorithm). Check whether the work items are independent and whether order of results matters.
3. Implement with concurrent.futures or asyncio: bounded worker count from the real CPU limit (os.sched_getaffinity or the container limit where available), chunked tasks for process pools, per-item error handling, and results kept in input order if needed.
4. Handle shared state: no shared mutable globals, one client or connection per worker or a thread-safe pool, and the main guard for process pools.
5. Measure again with the same input and report the speed-up and the memory change. Run the tests and compare outputs with the sequential version on a sample.
</task>

<constraints>
- Do not use threads for pure Python CPU work in standard CPython and call it a speed-up; measure.
- Verify outputs match the sequential version; parallel code must not change results.
- Respect rate limits and connection limits of anything the workers call.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Time and memory before and after, with input size and worker count.
## Bottleneck
What the profile showed.
## Approach and why
The chosen approach and the alternatives rejected.
## Changes
The diff with one sentence per change.
## Verification
Output comparison and tests run.
</output_format>
