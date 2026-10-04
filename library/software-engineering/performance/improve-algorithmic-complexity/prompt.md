---
schema: 1
id: improve-algorithmic-complexity
kind: prompt
title: Improve an algorithm's time or space complexity
description: Analyses the time and space complexity of a piece of code on realistic input sizes, finds a better algorithm or data structure, and proves the gain with a benchmark and tests.
category: performance
version: 1.0.0
status: incubating
aliases: [perf-algorithm]
stage: [maintain, build]
role: [software-engineer, backend-engineer, data-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [big-o, data-structures, benchmarking, time-complexity]
pairs_with:
  personas: [performance-engineer]
  prompts: [profile-hot-path, explain-algorithm]
args:
  - name: code
    description: The function or module to analyse, as a path or pasted code.
    type: text
    required: true
  - name: input_size
    description: Realistic input sizes and shapes (for example "up to 200,000 orders, usually sorted by date").
    type: text
output_contract:
  format: markdown
  sections: [Current complexity, Better approach, Diff, Measurement, Trade-offs]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Big-O tells you how cost grows, not what it costs at the sizes you have. A quadratic loop over 50 items is fine; over 200,000 it is an outage. A theoretically better algorithm can lose in practice to constant factors, memory locality or the cost of building an index. The goal is a change that is faster on the real inputs, keeps the same results, and is still readable.
</context>

<task>
Analyse {{code}}.
{{#input_size}}Realistic inputs: {{input_size}}
{{/input_size}}
1. Read the code and identify the dominant operations: nested loops, repeated linear searches (`includes`, `indexOf`, `find` inside a loop), repeated sorting, recursion without memoisation, string building in loops, and hidden costs inside library calls.
2. State the current time and space complexity in terms of named input sizes (n orders, m customers), and show where each factor comes from by quoting the lines.
3. Estimate the cost at the realistic sizes. If they are unknown, ask, or state the sizes you assume. Decide whether the complexity matters at those sizes before changing anything.
4. Find a better approach: a hash map or set for lookups, sorting once and using two pointers or binary search, a heap for top-k, prefix sums, memoisation or dynamic programming, streaming instead of materialising, or an index built once outside the loop. Give its complexity.
5. Implement it with the same results, including order, duplicates and edge cases (empty input, ties). Run the existing tests and add tests for those edge cases if missing.
6. Benchmark old and new on representative sizes, including the small case, and report the numbers with the method.
</task>

<constraints>
- Keep results identical, including ordering and duplicate handling, unless the user agrees to a change.
- Do not trade readability for a gain that does not matter at the real input sizes; say when the current code is fine.
- Report memory cost as well as time when the new approach builds indexes or caches.
- Do not quote speed-ups you did not measure; label estimates as estimates.
{{> guardrails/verify-before-done}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Current complexity
Time and space in named sizes, with the lines responsible, and the estimated cost at real sizes.
## Better approach
The algorithm or data structure, its complexity, and why it fits these inputs.
## Diff
The change as a diff, plus any tests added.
## Measurement
Benchmark method and results for old and new at several sizes.
## Trade-offs
Memory, setup cost, readability, and the input size below which the old code was fine.
</output_format>
