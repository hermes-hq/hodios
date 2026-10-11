---
schema: 1
id: fix-pandas-merge-and-index-bugs
kind: prompt
title: Fix pandas merge, index and dtype bugs
description: Fixes pandas code that gives wrong numbers or warnings, such as merges that multiply rows, misaligned indexes, SettingWithCopyWarning, NaN from alignment and dtype surprises.
category: debugging
version: 1.0.0
status: incubating
stage: [build, verify]
role: [data-scientist, data-analyst, data-engineer]
stack: [pandas]
requires: [none]
inputs: [file, dataset, stack-trace, text]
output: [explanation, diff]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [dataframes, merges, index-alignment, dtypes, data-quality]
pairs_with:
  prompts: [speed-up-dataframe-code, write-dataframe-transformation]
args:
  - name: code
    description: The pandas code that misbehaves, with the pandas version if known.
    type: text
    required: true
  - name: symptom
    description: What is wrong, for example "row count goes from 10,000 to 13,412 after the merge", "new column is all NaN", "SettingWithCopyWarning", "sum is a string". Include df.head(), df.dtypes or df.info() output if you have it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What goes wrong, Checks to run, Fix, Guard against a repeat]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a data engineer who debugs pandas by checking keys, index and dtypes before reading the logic. The bugs that give wrong numbers without an error:
- Merge fan-out: duplicate keys on the right side multiply rows, so sums and counts inflate. `validate="one_to_one"` or `"many_to_one"` turns this into an error; `indicator=True` shows unmatched rows.
- Keys that look equal but are not: int versus string ids, trailing spaces, case, float ids like `1001.0` after a NaN appeared, mixed time zones in datetime keys.
- Index alignment: assigning a Series to a column or doing arithmetic between frames aligns on the index, not position. After filtering, sorting or `groupby`, indexes no longer line up, and the result is NaN or the wrong row. `reset_index(drop=True)` or `.to_numpy()` show intent.
- SettingWithCopyWarning: assigning to a slice that may be a view or a copy, so the change may be lost. The fix is `.loc[row_mask, col] = ...` on the original or `.copy()` when a separate frame is intended. Copy-on-Write (default from pandas 3.0) changes the behaviour, so the version matters.
- Dtypes: numbers read as `object` because of one bad value, `int` columns becoming `float` when NaN appears, dates parsed day-first versus month-first, nullable dtypes (`Int64`, `string`) behaving differently from NumPy ones.
- `groupby` dropping NaN keys by default (`dropna=True`), and `count` versus `size`.
- Chained `inplace=True` calls and `apply` with side effects that do not do what they look like.
</context>

<task>
Fix this pandas bug.

Code:
{{code}}

Symptom:
{{symptom}}

1. If you can read the repository or run the notebook, look at the data loading code and the dtypes of the columns involved before answering.
2. Say exactly where the result goes wrong and why, pointing to the line.
3. Give short checks that confirm it on the real data: `df[key].duplicated().sum()` on each side of a merge, `df.dtypes`, comparing key types and sample values, `merge(..., indicator=True)` value counts, row counts before and after each step. If the cause cannot be decided from the input, ask for their output and stop.
4. Give the fix as a diff: deduplicate or aggregate the right side before merging with `validate=` set, normalise key dtypes and whitespace, use `.loc` on the original frame or an explicit `.copy()`, align or reset indexes on purpose, parse dates with an explicit format, or choose nullable dtypes.
5. Add one or two assertions that would have caught it (row count unchanged after a lookup merge, no unexpected NaN, key uniqueness), so a repeat fails loudly.
</task>

<constraints>
- Do not silence warnings with `pd.options.mode.chained_assignment = None` or `warnings.filterwarnings`; fix the assignment.
- Do not drop duplicates or NaN rows to make counts match without saying which rows are lost and whether that is correct for the data.
- Say when behaviour depends on the pandas version.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## What goes wrong
The line and the mechanism.
## Checks to run
Short snippets and what each result means.
## Fix
Diff.
## Guard against a repeat
Assertions to add.
</output_format>
