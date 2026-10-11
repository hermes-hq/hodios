---
schema: 1
id: write-microbenchmark
kind: prompt
title: Write a microbenchmark
description: Writes a trustworthy microbenchmark with the language's harness, guarding against dead-code elimination, warm-up, setup cost and unrealistic inputs, and reports a distribution, not one number.
category: performance
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, backend-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file, text]
output: [code, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [benchmarking, measurement, jit-warmup, dead-code-elimination, benchmark-harness]
pairs_with:
  prompts: [compare-benchmark-runs, profile-hot-path, improve-algorithmic-complexity]
  personas: [performance-engineer]
args:
  - name: target
    description: The function or code path to benchmark, the language, and the question the benchmark should answer (for example "is approach B faster than A for 10k items").
    type: text
    required: true
  - name: input_profile
    description: What real inputs look like in production (sizes, shapes, distribution), if known.
    type: text
output_contract:
  format: markdown
  sections: [Question, Benchmark code, Pitfalls handled, Results, What this does not tell you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most hand-written timing loops measure the wrong thing. Compilers and JITs remove work whose result is unused, fold constants, and hoist invariant code out of the loop; the first iterations run interpreted or cold; setup and allocation leak into the timed region; tiny inputs fit in CPU cache and hide memory costs that dominate in production; frequency scaling and other processes add noise; and a single run hides variance. Each ecosystem has a harness that handles most of this (JMH for the JVM, BenchmarkDotNet for .NET, the testing package's benchmarks for Go, criterion for Rust, Google Benchmark for C++, pyperf or pytest-benchmark for Python, tinybench or mitata for JavaScript). A microbenchmark is only worth writing for code a profile has shown to matter, and it answers a narrow question, not "is the system faster".
{{#input_profile}}
Production inputs: {{input_profile}}
{{/input_profile}}
</context>

<task>
Benchmark: {{target}}

1. Restate the question as a comparison with a decision ("keep A unless B is at least 20% faster at 10k items"). If no profile shows this code matters, say so and ask whether to proceed.
2. Pick the standard harness for the language and project; add it as a dev or test dependency only.
3. Write the benchmark: setup outside the timed region; inputs sized and shaped like production, at two or three sizes to show scaling; results consumed through the harness's sink or returned so the work cannot be eliminated; inputs not compile-time constants; each variant benchmarked under the same conditions.
4. Configure warm-up, iteration count and multiple process forks or runs where the harness supports them. Record allocations or memory if the harness can.
5. Run it and report mean or median with spread (standard deviation, percentiles or confidence interval), allocations, the machine and runtime version, and whether the machine was otherwise idle.
6. Sanity-check the result: does it scale with input size as expected, and does a deliberately slower variant measure slower?
</task>

<constraints>
- Report only numbers from real runs; never estimate timings.
- Do not change the production code under test in this task.
- Do not generalise a microbenchmark result to end-to-end latency; say what would confirm it (a profile or load test).
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Question
One sentence with the decision rule.
## Benchmark code
The file(s) and how to run them.
## Pitfalls handled
Bullets: each pitfall and how the code avoids it.
## Results
Table: variant | input size | median or mean | spread | allocations. Then environment details.
## What this does not tell you
Bullets.
</output_format>
