---
schema: 1
id: speed-up-dataframe-code
kind: prompt
title: Speed up dataframe code
description: Speeds up slow pandas or Polars code by replacing row loops and apply with vectorised operations, fixing dtypes, chunking or pushing work to the database, measured on your data size.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [data-scientist, data-analyst, researcher, data-engineer]
stack: [pandas]
requires: [none]
inputs: [file, text]
output: [code, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [vectorization, polars, dtypes, memory-usage, duckdb]
pairs_with:
  prompts: [write-dataframe-transformation, read-flame-graph]
args:
  - name: code
    description: The slow code (a notebook cell, function or script), what it does, how long it takes now, and a few sample rows or the column dtypes (`df.dtypes`, `df.info()` output).
    type: text
    required: true
  - name: data_size
    description: Rows, columns and memory of the data, and the machine it runs on, for example "12 million rows, 30 columns, 4 GB CSV, laptop with 16 GB RAM".
    type: string
    default: "not given; ask if it changes the advice"
output_contract:
  format: markdown
  sections: [Why it is slow, Faster version, Equivalence check, Timing plan, If still too slow]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user writes data code to get answers, not to be a performance engineer, and a step that takes minutes or runs out of memory is blocking their work. Data size: {{data_size}}.

Dataframe code is almost always slow for a handful of reasons: Python-level loops (`iterrows`, `itertuples` in a loop, `apply(axis=1)`, list comprehensions over rows) instead of column operations; repeated concatenation in a loop (quadratic); `object` dtype strings and Python objects where categoricals, numeric or Arrow-backed types would do; reading the whole file when only some columns or rows are needed; merges that explode rows because of duplicate keys; and `groupby().apply` with a Python function where a built-in aggregation exists. The fix must give the same answer: subtle differences in NaN handling, integer overflow, sort order and time zones are the usual way a "faster" version is wrong.
</context>

<task>
<code>
{{code}}
</code>

1. Explain why it is slow, pointing at the exact lines, and estimate the complexity (for example "Python function called once per row: 12 million calls").
2. Rewrite it, in order of impact:
   - Replace row loops and `apply(axis=1)` with vectorised column operations, `np.where` or `np.select` for conditionals, `.str` and `.dt` accessors, `map` with a dict or a merge for lookups, `groupby().agg` or `transform` with built-in functions, and `cumsum`, `shift` or `rolling` for running calculations.
   - Build lists and concatenate once instead of appending in a loop.
   - Fix dtypes: categoricals for repeated strings, downcast numerics where safe, parse dates once on read, nullable or Arrow-backed dtypes where helpful.
   - Read less: `usecols`, `dtype` on read, filters pushed into the reader, Parquet instead of CSV for repeated reads.
   - If the data is larger than memory or the operation is heavy, show the Polars lazy equivalent (with `scan_csv` or `scan_parquet`, and `collect`), DuckDB SQL over the file, chunked processing, or pushing the aggregation into the source database, and say which fits their size.
3. Keep the result identical, or state each intentional difference.
4. Give an equivalence check: run old and new on a sample and compare with `pandas.testing.assert_frame_equal` (or Polars `assert_frame_equal`), with tolerance for floats and explicit sorting.
5. Give the timing plan: time both versions on a representative sample (for example 1% and 10% of rows) to see how runtime grows, with `%timeit` or `time.perf_counter`, and peak memory with `memory_usage(deep=True)` or a memory profiler; then the full run. Do not claim a speedup you have not measured; give the expected order of magnitude as an estimate.
6. Say what to do if it is still too slow: profile with a line profiler, check for an exploding merge, move to Polars or DuckDB, or run on a bigger machine.

If the code depends on functions or columns not shown, ask for them or mark assumptions [ASSUMED].
</task>

<constraints>
- The rewrite must produce the same output as the original on the same input, including NaN handling, dtypes and row order, unless a difference is stated.
- Keep the code readable for an analyst; comment non-obvious vectorised tricks in one line.
- Do not invent column names or data values.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Why it is slow
Bullets with line references and rough call counts.
## Faster version
The rewritten code, in one block.
## Equivalence check
Code that compares old and new.
## Timing plan
Code and what to record; estimated gain labelled as an estimate.
## If still too slow
Up to three options with when to choose each.
</output_format>
