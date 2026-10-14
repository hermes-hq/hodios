---
schema: 1
id: review-pandas-transformation-code
kind: prompt
title: Review pandas or polars transformation code
description: Reviews pandas or polars code for silent row loss or duplication in merges, chained-assignment bugs, dtype coercion, NaN and null handling errors and groupby keys that vanish.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [data-engineer, data-analyst, data-scientist]
stack: [pandas]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [dataframes, polars, joins, missing-values, pull-request]
pairs_with:
  personas: [data-engineer]
  prompts: [review-pull-request, write-dataframe-transformation, review-pipeline-code-change]
args:
  - name: diff
    description: The diff with file paths, plus a sample or schema of the input frames (column names, dtypes, a few rows) if available.
    type: text
    required: true
  - name: context
    description: pandas or polars version, expected row counts or keys of the inputs and output (one row per customer, per order line), and what consumes the result.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Dataframe code rarely crashes when it is wrong; it returns a frame with the wrong number of rows and plausible numbers. Merges cause most of it. A join on a key that is not unique on the side you assumed multiplies rows (a many-to-many merge), and every sum downstream inflates; `validate="many_to_one"` turns that into an error. An inner join silently drops rows without a match; `indicator=True` shows how many. Keys that look equal often are not: `int` versus `str` (`1` versus `"1"`), leading zeros lost when a CSV column was read as a number, trailing spaces, case. In pandas, NaN keys match each other in `merge`, unlike SQL. `groupby` drops rows whose key is NaN by default (`dropna=True`), `sum` of an all-NaN group returns 0, and `mean` skips NaN, so a "clean" aggregate can hide missing data. Chained assignment (`df[df.x > 0]["y"] = 1`) may modify a temporary copy and do nothing; under copy-on-write (default in pandas 3.0) it never works, so `.loc` is required. Assigning a Series aligns on the index, not position, so misaligned indexes produce NaN. An integer column with one missing value becomes float, which changes ids like `1234` into `1234.0` when written out. `pd.to_datetime` with ambiguous day-first strings, or `errors="coerce"`, quietly turns bad values into NaT. `fillna(0)` makes missing look like zero. In polars, null and NaN are different, joins default to inner, and lazy frames run nothing until `collect()`.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open each changed file in full, plus where the input frames are loaded and where the output is consumed, before judging any hunk. If sample data is available, check row counts and key uniqueness at each step instead of guessing, and report the numbers. If you only have the diff, say which conclusions depend on data you could not see.
2. Track the grain: for each step, state what one row represents before and after (per order, per customer, per day). Flag any step where the grain changes without the author intending it.
3. Check every merge or join: key uniqueness on each side, join type, `validate` and `indicator` use, key dtypes and formatting (int versus string, leading zeros, whitespace, case), NaN or null keys, and suffix collisions that rename columns downstream code expects.
4. Check assignment and indexing: chained assignment, assignments that align on a mismatched index, `inplace=True` on a slice, `reset_index` dropped or added in a way that shifts rows, and `iloc` versus `loc` confusion.
5. Check missing values and dtypes: `groupby` dropping NaN keys, aggregates over NaN, `fillna` that changes meaning, ints becoming floats, object columns hiding mixed types, date parsing ambiguity and `errors="coerce"` hiding failures, and polars null versus NaN.
6. Check the output contract: column names, types and row counts the consumer expects, duplicates after `concat` or `drop_duplicates` on the wrong subset, sort order relied on without sorting, and assertions (row counts, unique keys, non-null checks) that should guard the step.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (rows silently lost or duplicated, totals wrong, ids corrupted), medium (missing values hidden as zero or dropped from groups, fragile parsing), low (slow row-wise `apply` on small data).
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- State the library and version you assumed (pandas copy-on-write, polars API changes) for version-dependent findings.
- Every finding gives a small concrete input (two or three rows) that produces the wrong output, and the wrong versus expected result.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the step, the defect, a two- or three-row input that triggers it and the wrong versus expected output, the fix in one or two sentences.
## Missing tests
Bullets naming the data checks to add (row count before and after, key uniqueness, null counts) and the fixture rows for each, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
