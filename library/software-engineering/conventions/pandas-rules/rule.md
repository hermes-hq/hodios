---
schema: 1
id: pandas-rules
kind: rule
title: pandas rules
description: Standing rules for pandas code covering vectorised operations, no chained assignment, explicit dtypes on load, method chaining, copy semantics, validated merges and missing data.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [data-scientist, data-analyst, data-engineer]
stack: [pandas]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [dataframes, vectorization, dtypes, merges, missing-values]
applies_to: ["**/*.py", "**/*.ipynb"]
pairs_with:
  rules: [python-style-rules]
  prompts: [review-pandas-transformation-code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change pandas code in this project:

**Know the versions first**
- Check the pandas version. Copy-on-Write is the default in pandas 3 and optional in 2.x, `inplace` is discouraged, and some APIs (`append`, `swapaxes`) are gone. Write code that works on the project's version and does not raise deprecation warnings.

**Loading data**
- Pass `dtype=` (or a schema) when reading CSV and similar files: ids and codes with leading zeros as `string`, categories as `category`, and dates with `parse_dates` or a later `pd.to_datetime(..., format=...)`. Do not let pandas guess types for columns that matter.
- Use `usecols` to read only needed columns from wide files, and nullable dtypes (`Int64`, `boolean`, `string`) where missing values must not turn integers into floats.
- After loading, check shape, dtypes and nulls on the columns you use, and assert key uniqueness where you rely on it.

**Transformations**
- Use vectorised operations, `np.where`, `.map` with a dict, `.str` and `.dt` accessors, and `groupby` with built-in aggregations. Do not use `iterrows`, `itertuples` loops or `apply(axis=1)` for work that can be vectorised.
- Prefer method chains with `.assign`, `.query`, `.pipe` and `.loc` that return new frames; avoid `inplace=True`.
- Use named aggregation (`.agg(total=("amount", "sum"))`) so output columns are explicit.

**Indexing and copies**
- Never use chained assignment (`df[df.a > 0]["b"] = 1`); it may change a copy and do nothing. Use `df.loc[mask, "b"] = 1`.
- When you take a subset you will modify, take an explicit `.copy()`.
- Select columns by name, not by position, so the code survives column order changes.

**Joins and reshaping**
- Pass `validate=` to `merge` (`"one_to_one"`, `"many_to_one"`) and check row counts before and after. An unexpected many-to-many join silently multiplies rows.
- Use `how=` explicitly and `indicator=True` when you need to know what did not match.
- Check that join keys have the same dtype on both sides; `int` versus `string` keys match nothing.

**Missing data and numbers**
- Decide missing-value handling per column and write it down in code (`fillna` with a reason, `dropna(subset=...)`). Do not call `dropna()` on the whole frame by reflex.
- Remember that `groupby` drops NaN keys by default (`dropna=False` keeps them) and `sum` of all-NaN is 0.
- Do not compare floats for exact equality; round money explicitly or use integer cents.

**Performance and size**
- For large data, downcast numerics, use `category` for low-cardinality strings, and read in chunks or with `pyarrow` engine where supported. If data does not fit in memory, say so rather than writing code that will crash.

**Before you finish**
- Run the code on the real or sample data, show the resulting shape and a few rows, and run tests or assertions on row counts, key uniqueness and null counts. Say what you checked.
