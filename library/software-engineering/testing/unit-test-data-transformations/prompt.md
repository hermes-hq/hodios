---
schema: 1
id: unit-test-data-transformations
kind: prompt
title: Unit test data transformations
description: Writes small-fixture unit tests for SQL, dbt, pandas or Spark transformations with hand-built rows for nulls, duplicates, late records and boundaries that run in seconds in CI.
category: testing
version: 1.0.0
status: incubating
stage: [verify, build]
role: [data-engineer, data-analyst, data-scientist]
stack: [dbt, pandas, spark]
requires: [none]
inputs: [file, text]
output: [tests, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [data-pipelines, fixtures, dbt-unit-tests, late-arriving-data, edge-cases]
pairs_with:
  prompts: [write-dbt-model, write-dataframe-transformation, write-test-data-factories]
args:
  - name: transformation_code
    description: The SQL query, dbt model, pandas function or Spark job to test, plus the input table schemas and what the output should mean (its grain and business rules).
    type: text
    required: true
  - name: engine
    description: Where the transformation runs, which decides the test tooling.
    type: enum
    enum: [sql, dbt, pandas, spark, other]
    default: sql
output_contract:
  format: markdown
  sections: [Rules under test, Edge cases, Fixtures and expected output, Tests, Running in CI, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is a data or analytics engineer whose transformation logic ({{engine}}) is only checked by eyeballing dashboards or by data-quality tests on full production tables. Those catch problems after they land and cannot say which rule broke. Unit tests with a handful of hand-written rows can: they pin each business rule, run in seconds, and fail with a readable diff.

What makes these tests worth having: rows chosen to hit one rule each (not a sample of production), explicit expected output rather than re-implementing the logic in the test, and coverage of the traps of data work: NULLs in join keys and aggregates, duplicate keys that fan out joins, late-arriving and out-of-order records, time zone and day boundaries, empty inputs, and type coercion.
</context>

<task>
<transformation_code>
{{transformation_code}}
</transformation_code>

1. State the output grain and list each business rule the code implements (filters, joins, dedup logic, aggregations, window logic, incremental conditions), one line each.
2. For each rule, design the smallest input rows that prove it, plus the edge cases that apply:
   - NULL in a join key, a grouped column and an aggregated value (COUNT(*) versus COUNT(col), SUM of all NULLs).
   - Duplicate keys on either side of a join; ties in window ordering.
   - Late and out-of-order records, and the incremental boundary (a row exactly at the high-water mark).
   - Boundaries: midnight and month ends, time zones and daylight saving changes, zero and negative amounts, empty input.
3. Write the expected output table by hand for each case. If the expected result is ambiguous from the code (for example which duplicate wins), list it under Questions instead of guessing.
4. Write the tests with the engine's tooling:
   - sql: a test that loads fixture rows into temporary tables or CTEs on the same database engine (or DuckDB when the SQL is portable, saying so) and compares the result.
   - dbt: dbt unit tests (`unit_tests:` with `given` and `expect`) in YAML; mention the minimum dbt version they need.
   - pandas: pytest with small DataFrames built inline and `pandas.testing.assert_frame_equal` with explicit dtypes and sorted rows.
   - spark: pytest with a local SparkSession fixture (session scope, few shuffle partitions) and a DataFrame equality helper that ignores row order.
   - other: the nearest equivalent, stated.
5. Make comparisons exact about what matters: column order, dtypes, row order (sort or compare as sets), float tolerance for computed ratios.
6. Give the CI setup: the command, how long it should take (target under a minute), and no dependency on shared warehouses or production data.
</task>

<constraints>
- Fixture rows are invented, small and obviously synthetic; never copy real customer data.
- One rule per test; name each test after the rule and condition.
- Do not re-implement the transformation in the test to compute expected output.
- If table schemas are missing, ask for them or mark assumed columns as [ASSUMED].
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Rules under test
Numbered list.
## Edge cases
Table: rule # | edge case | why it can break.
## Fixtures and expected output
For each test: input rows and expected output as small tables.
## Tests
Code or YAML.
## Running in CI
Command, runtime target and setup.
## Questions
Ambiguous rules the owner must decide, or "None".
</output_format>
