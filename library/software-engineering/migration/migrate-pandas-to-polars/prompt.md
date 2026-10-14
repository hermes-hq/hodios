---
schema: 1
id: migrate-pandas-to-polars
kind: prompt
title: Migrate pandas code to Polars
description: Ports pandas data code to Polars expressions and lazy frames, mapping the index, apply, groupby, joins, dtypes and IO, and proves the outputs match before switching over.
category: migration
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [data-engineer, data-scientist, software-engineer]
stack: [pandas]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [polars, dataframes, lazy-evaluation, data-pipelines, parity-testing]
pairs_with:
  prompts: [speed-up-dataframe-code, write-dataframe-transformation, upgrade-major-dependency]
  personas: [python-engineer]
args:
  - name: scope
    description: The modules, notebooks or pipeline steps to port, data sizes, and why you are moving (speed, memory, lazy execution).
    type: text
    required: true
  - name: constraints
    description: Anything that must keep pandas, such as libraries that only accept pandas DataFrames, plotting, or a model that expects a pandas input.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Inventory, Translation notes, Changes made, Parity results, Left on pandas]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Polars is not a drop-in pandas replacement, and a line-by-line port usually ends slower than the original. Polars has no row index: anything that relies on `set_index`, `loc`, index alignment in arithmetic, `reset_index` or MultiIndex results must be rewritten with explicit key columns and joins. Speed comes from expressions (`pl.col(...)`, `with_columns`, `group_by().agg(...)`, `when/then/otherwise`) and from the lazy API (`scan_parquet`, `scan_csv`, `.lazy()` then `.collect()`), which lets the query optimizer push down filters and projections. `map_elements` and Python UDFs bring back row-by-row speed and should be a last resort. Semantics differ in ways that change results silently: Polars keeps null distinct from NaN, aggregations skip nulls, joins do not sort, `group_by` does not keep group order unless `maintain_order=True`, string and datetime dtypes are strict and casting failures raise, and integer columns with nulls stay integers instead of becoming float. Interop is cheap through Arrow (`pl.from_pandas`, `.to_pandas()`), so a boundary at the edges is fine while the core moves.
</context>

<task>
Scope: {{scope}}
{{#constraints}}Must stay on pandas or accept pandas at the boundary: {{constraints}}{{/constraints}}

1. Read the code and inventory pandas usage: index and MultiIndex reliance, `apply`/`iterrows`/`transform`, groupby patterns, merges, reshapes (pivot, melt, stack), datetime and string accessors, IO calls, and every place a DataFrame crosses into another library.
2. Before changing anything, capture reference outputs: run the current code on representative inputs (including nulls, empty frames and duplicate keys) and save the results for comparison. If no tests exist, write parity tests first.
3. Port one function or step at a time to expression style. Replace index logic with explicit key columns, `apply` with expressions, and eager reads with `scan_*` plus a single `.collect()` where the pipeline allows. Keep conversions to pandas only at boundaries named in step 1.
4. Handle semantic differences on purpose: decide null versus NaN handling, add `maintain_order=True` or an explicit sort where order matters, set dtypes explicitly on read, and note any changed output column order or names.
5. Run the parity tests after each step, comparing values, dtypes, row order (where it matters) and null counts. Then time the old and new versions on realistic data and report memory where relevant.
</task>

<constraints>
- Never port `apply` or `iterrows` into `map_elements` when an expression exists; if no expression fits, say so and explain the cost.
- Do not claim a speed-up without a measured before-and-after on the same input.
- Keep the old pandas path runnable until parity is shown, and do not change business logic in the same diff.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Inventory
Table: location | pandas pattern | Polars approach | risk.
## Translation notes
Semantic differences that affected this code and how each was handled.
## Changes made
Per step: what changed, lazy or eager, boundary conversions kept.
## Parity results
Test results and before-and-after timings with data size.
## Left on pandas
What stays and why, or "Nothing".
</output_format>
