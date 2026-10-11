---
schema: 1
id: speed-up-python-code
kind: prompt
title: Speed up slow Python code
description: Speeds up slow Python code by profiling with cProfile, py-spy or line_profiler, then fixing hot loops, data structures, I/O and repeated work one change at a time with before-and-after timings.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [backend-engineer, data-engineer, software-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [profiling, cprofile, py-spy, python-speed, benchmarks]
pairs_with:
  prompts: [parallelize-python-workload, speed-up-dataframe-code, vectorize-numpy-code, read-flame-graph, improve-algorithmic-complexity]
  personas: [performance-engineer]
  rules: [python-style-rules]
args:
  - name: target
    description: The slow script, function, command or job, how it is run, the input size, and how long it takes now versus how long it should take.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Profile, Changes, Results, Not done]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Python speed problems are usually not where people guess. The tools: `cProfile` (with `snakeviz` or `pstats` sorted by cumulative time) for where calls spend time, `py-spy` for sampling a running process or a slow production job without code changes, `line_profiler` for one hot function, `tracemalloc` or `memray` when memory is the issue, and `timeit` or `pyperf` for micro-measurements. The frequent fixes, roughly by payoff: work done in a loop that could be done once (repeated parsing, regex compiled per call, a database or HTTP call per item); membership tests on lists instead of sets or dicts (O(n) per lookup); building strings with `+=` in a loop instead of `"".join`; reading a whole file into memory or line-by-line I/O with no buffering; pure Python loops over numbers that NumPy, pandas or the standard library (`collections.Counter`, `itertools`, `bisect`, `heapq`) do in C; deep copies, repeated `sorted()` calls and unnecessary object creation; logging that formats strings even when the level is off; and `lru_cache` or memoisation for pure functions called with the same arguments. Attribute lookups in tight loops and comprehension versus loop are small wins worth doing only after the big ones. When CPU-bound pure Python remains the bottleneck, the options are multiprocessing, Numba, Cython, a compiled extension or PyPy, each with costs. Python versions differ in speed: 3.11 and later are noticeably faster.
</context>

<task>
Speed up {{target}}.

1. Read the code and how it is run. Find or build a repeatable benchmark on a realistic input size (a script or `pytest-benchmark` test), note the Python version, and record the baseline: wall time, and peak memory if relevant. Run it at least three times.
2. Profile with `cProfile` (or `py-spy` for a long-running or already-running process), sort by cumulative and own time, and name the top hotspots with their share of total time. Drill into the top function with `line_profiler` if the cause is not clear.
3. Classify each hotspot: repeated work, wrong data structure, I/O pattern, pure-Python numeric loop, algorithmic complexity, or waiting on the network or database.
4. Fix the biggest hotspot first with the smallest change that addresses its cause. Re-run the tests and the benchmark after each change, and keep the change only if it helps.
5. Stop when the target is met or the remaining time is spread thin, and list bigger options (parallelism, Numba or Cython, moving work to the database, an algorithm change) with expected gain and cost.
6. Report each change with its measured effect.
</task>

<constraints>
- Do not optimise without a profile showing the code is hot, and do not report a speed-up without a measurement.
- Keep outputs identical; run the existing tests after every change and add a test if the code had none.
- Do not add a new dependency or a compiled extension without asking.
- Do not profile against production systems in a way that adds load or exposes data.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Benchmark command, input size, Python version, timings.
## Profile
Top hotspots table: function, own time, cumulative time, share, cause.
## Changes
Numbered: what changed, why, file.
## Results
Table: step, time, speed-up versus baseline, tests status.
## Not done
Bigger options with expected gain and cost, or "None".
</output_format>
