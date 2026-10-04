---
schema: 1
id: profile-hot-path
kind: prompt
title: Profile and speed up a hot path
description: Measures a slow operation, profiles where the time goes, and makes it faster one verified change at a time, with before-and-after numbers. Use when an endpoint, command or function is too slow.
category: performance
version: 1.0.1
status: experimental
aliases: [perf-profile]
stage: [maintain, verify]
role: [software-engineer, backend-engineer, sre]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, text, logs]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [profiling, flame-graph, benchmark, latency]
args:
  - name: target
    description: The slow operation (endpoint, command, function, job) and how to trigger it.
    type: text
    required: true
  - name: goal
    description: The measurable target, for example "p95 under 200 ms at 50 requests per second".
    type: string
    default: "as fast as reasonable changes allow; report the gain"
  - name: environment
    description: Where to measure and any limits (local machine, staging, production data size, no production access).
    type: text
output_contract:
  format: markdown
  sections: [Result, Where the time went, Changes, Not done, How to reproduce]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id perf-profile."}
---
<context>
Performance work without measurement is guessing, and guesses are usually wrong about where the time goes. The method is: make the slowness reproducible, measure it, profile it, change one thing, and measure again. A speedup that was not measured did not happen.
</context>

<task>
Speed up: {{target}}
Goal: {{goal}}.
{{#environment}}
Environment and limits:
{{environment}}
{{/environment}}

1. Define the scenario and the metric (latency percentiles, throughput, CPU time, memory or allocations) and the input size that matches real use.
2. Build a repeatable measurement: a benchmark, a load script or a timed command. Warm up first, run enough repetitions to see the variance, and record the baseline as a median with its spread.
3. Profile the scenario with a sampling profiler suited to the runtime (for example perf or a flame graph tool for native code, py-spy for Python, pprof for Go, async-profiler or JFR for the JVM, the built-in inspector for Node.js, dotnet-trace for .NET). Use what is installed, or ask before installing anything.
4. Classify where the time goes: CPU in our code, CPU in a library, waiting on I/O (database, network, disk), lock contention, or garbage collection. Name the top contributors with their share of the total.
5. Form one hypothesis, make one change, and re-run the measurement. Keep the change only if the gain is larger than the noise. Run the tests after each kept change.
6. Stop when the goal is met, or when the remaining contributors need a design change; then describe that change instead of making it.
</task>

<constraints>
- No optimisation without profile evidence pointing at it.
- One change per measurement, so every gain is attributable.
- Behaviour must stay identical; the tests must pass after every kept change.
- Skip micro-optimisations that make the code harder to read for a gain under about 5% unless the user asks for them.
- Report real measured numbers with the number of runs. Never estimate a speedup you did not measure.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
One line: metric before, after, number of runs, and whether the goal is met.
## Where the time went
Table: contributor, share of total before, share after.
## Changes
Numbered: the change — why the profile pointed there — measured effect.
## Not done
Bigger opportunities that need a design change or a decision, with the expected benefit stated as a hypothesis.
## How to reproduce
The exact commands to re-run the measurement.
</output_format>
