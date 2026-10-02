---
schema: 1
id: write-data-quality-checks
kind: prompt
title: Write data-quality checks for a table
description: "Writes data-quality checks for a table (freshness, volume, schema, validity, uniqueness, referential integrity, distribution) with severities, thresholds and owners. Use when a table feeds decisions."
category: data
version: 1.0.0
status: experimental
stage: [verify, operate]
role: [data-engineer, data-analyst, sre]
requires: [none]
inputs: [schema, dataset, text]
output: [code, tests, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [data-quality, data-observability, alerting, data-tests]
pairs_with:
  prompts: [write-dbt-model, design-data-pipeline, write-data-dictionary]
  personas: [data-engineer]
args:
  - name: table
    description: The table name, its DDL or column list, what one row means, how and when it is loaded, and who uses it.
    type: text
    required: true
  - name: sample_rows
    description: A few dozen representative rows, or summary statistics such as daily row counts and null rates.
    type: text
  - name: tool
    description: Where the checks will run.
    type: enum
    enum: [sql, dbt, great-expectations, soda]
    default: sql
output_contract:
  format: markdown
  sections: [Table grain and assumptions, Checks, Implementation, Tuning plan, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most bad data is not a failed job. It is a job that succeeded with half the rows, a column that turned null after an upstream release, a duplicated load, or an enum value nobody had seen before. Useful checks cover the dimensions that catch these (freshness, volume, schema, validity, uniqueness, referential integrity, distribution and business rules), distinguish failures that must block publishing from ones that only warn, and route every alert to a named owner with a first action. A check nobody owns, or one that fires every day, gets muted and then protects nothing.
</context>

<task>
Write data-quality checks in {{tool}} for this table:
{{table}}
{{#sample_rows}}

Sample or statistics:
{{sample_rows}}
{{/sample_rows}}

1. State the grain ("one row per …"), the key, the load cadence and the consumers. If the grain or cadence is unclear, ask, or state the assumption.
2. Write checks across these dimensions, skipping any that do not apply and saying why:
   - freshness: the newest load or event timestamp against the expected cadence;
   - volume: today's row count against the same weekday over recent weeks, as a ratio or z-score;
   - schema: expected columns and types;
   - validity: nulls in required columns, accepted values for categorical columns, numeric ranges, formats;
   - uniqueness of the key;
   - referential integrity: orphaned foreign keys;
   - distribution: drift in null rate, mean or percentiles, and category shares;
   - business rules across columns, such as end after start, or a total equal to the sum of its lines.
3. Give each check a severity: block (stop downstream publishing) or warn. Give a threshold derived from the sample where possible, or an explicit starting value marked to be tuned. Name an owner role or a placeholder, and give the first action on failure.
4. Implement the checks in {{tool}}:
   - sql: one query per check that returns failing rows or a single failing metric, so zero rows means pass;
   - dbt: generic tests in properties YAML plus singular tests, naming any package a test needs;
   - great-expectations: an expectation suite using the GX Core 1.x API (say which version you assumed);
   - soda: SodaCL checks in YAML.
5. Explain how to tune thresholds after two to four weeks of history, and when to retire a check that never fires.
</task>

<constraints>
- Do not invent columns. Checks must reference only columns in the table definition.
- Avoid checks that will alert on normal variation. Weekly seasonality and month-end peaks belong in the threshold.
- Keep each check independent, so one failure does not hide another.
{{> output/uncertainty}}
</constraints>

<output_format>
## Table grain and assumptions
Grain, key, cadence, consumers, and assumptions.

## Checks
Table: check | dimension | severity | threshold | owner | first action on failure.

## Implementation
The code for {{tool}} in fenced blocks, one per file.

## Tuning plan
How and when to adjust thresholds.

## Gaps
What these checks cannot catch, and what would.
</output_format>
