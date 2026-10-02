---
schema: 1
id: write-dataframe-transformation
kind: prompt
title: Write a dataframe transformation
description: Writes pandas or polars code for a described transformation with built-in checks on row counts, nulls, key uniqueness and join cardinality. Use when reshaping, joining or aggregating data.
category: data-exploration
version: 1.1.0
status: experimental
stage: [build]
role: [data-analyst, data-scientist, data-engineer]
stack: [pandas]
requires: [none]
inputs: [dataset, schema, text]
output: [code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [polars, dataframes, data-cleaning, data-validation]
pairs_with:
  prompts: [reconcile-datasets]
  personas: [statistician]
args:
  - name: input_description
    description: The input tables, with column names, types, keys and a few sample rows if you can share them.
    type: text
    required: true
  - name: desired_output
    description: What the result should look like (grain, columns, filters, aggregations), ideally with an example row.
    type: text
    required: true
  - name: library
    description: The dataframe library to use.
    type: enum
    enum: [pandas, polars]
    default: pandas
output_contract:
  format: markdown
  sections: [Assumptions, Code, What the checks catch, Test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Asks for the columns, keys and output grain when they are missing instead of coding against invented names."}
---
<context>
Dataframe code usually fails silently, not loudly: a join on a key that is not unique multiplies rows, a left join leaves nulls that later vanish in an aggregation, a string key with trailing spaces matches nothing, and dates parsed in the wrong format shift by months. The output looks plausible and is wrong. Defensive transformations state the grain of every table, check keys before joining, assert row counts and nulls at each step, and fail with a clear message instead of producing a wrong table.
</context>

<task>
Write {{library}} code that turns this input:
<input>
{{input_description}}
</input>
into this output:
<output>
{{desired_output}}
</output>

1. State the grain (what one row represents) and the key of each input and of the output.
2. Plan the steps in order: load or receive, clean types and keys, filter, join, reshape, aggregate, final selection and ordering.
3. Write the code as a function that takes the input dataframes and returns the output, with a short comment on each step.
4. After each step that can change row counts or introduce nulls, add a check:
   - keys: uniqueness on the side that should be unique, before every join;
   - joins: the expected cardinality (pandas `merge(..., validate="many_to_one")`, polars `join(..., validate="m:1")`) and a count of unmatched keys;
   - row counts: expected equal, smaller or larger than before, and by how much;
   - nulls: in key columns and in columns the output requires;
   - aggregates: totals that should be preserved (for example the sum of amounts before and after reshaping).
5. Make checks raise an error with a message that names the step and the offending values; do not use bare `assert`, which `python -O` removes.
6. Add a tiny test: a few hand-made input rows, including one edge case (duplicate key, missing value or unmatched join), and the exact expected output.
</task>

<constraints>
- Use idiomatic, vectorised {{library}}: for pandas, method chaining where it stays readable, `.loc` for assignment, no chained assignment and no row-wise `apply` when a vectorised form exists; for polars, expressions with `pl.col`, and the lazy API for large data.
- Write code compatible with current stable releases, and name any feature that needs a recent version.
- Do not guess column names, types or business rules. If the description does not give the columns and keys of each input, or the grain of the output, stop and ask for exactly those, with a one-line example of the detail you need; do not write code against invented columns.
- For smaller gaps (for example which duplicate to keep, or how to treat unmatched rows), choose the safest behaviour, list it under Assumptions, and make it easy to change.
- Keep it self-contained: imports at the top, no reading from paths you invented; take dataframes as parameters.
</constraints>

<output_format>
## Assumptions
Bullets: grains, keys and every assumption made.
## Code
One fenced Python block with the function and its checks.
## What the checks catch
A table: check | step | the failure it prevents.
## Test
A fenced Python block with the small test and its expected output.
</output_format>
