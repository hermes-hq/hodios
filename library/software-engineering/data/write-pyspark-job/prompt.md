---
schema: 1
id: write-pyspark-job
kind: prompt
title: Write a PySpark job
description: Writes a PySpark batch job with explicit input schemas, DataFrame transformations instead of Python UDFs, a deliberate join strategy, partitioned idempotent output and a small local test.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [data-engineer]
stack: [spark, python]
requires: [repo-read, file-write, shell]
inputs: [spec, schema, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [dataframes, joins, partitioned-output, batch-processing]
pairs_with:
  prompts: [tune-spark-job, design-lakehouse-table-layout, unit-test-data-transformations]
  personas: [data-engineer]
args:
  - name: job
    description: What the job reads, the transformation in business terms, what it writes, and how often it runs.
    type: text
    required: true
  - name: platform
    description: Where it runs and the Spark version, for example Databricks runtime, EMR, Dataproc or spark-submit on Kubernetes, and the table format (Parquet, Delta, Iceberg).
    type: text
    required: true
  - name: data_sizes
    description: Approximate size of each input, so join strategy and partitioning can be chosen.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Job code, Test, Run and verify, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
PySpark code that looks fine in a notebook often runs badly at scale. Schema inference scans the data and silently changes types when a file has an odd value, so production jobs declare schemas. Python UDFs move every row between the JVM and Python; built-in functions in `pyspark.sql.functions` (or pandas UDFs when unavoidable) are much faster. `collect()`, `toPandas()` and `count()` in the middle of a job pull data to the driver or force extra passes. Joins of a large table to a small one should broadcast the small one; joins of two large tables need matching keys without skew. Output written with `mode("append")` duplicates data when the job reruns; overwrite specific partitions with dynamic partition overwrite, or `MERGE` into Delta or Iceberg tables. Partitioning output by a high-cardinality column creates millions of tiny files. Timestamps need an explicit session time zone. Logic should live in functions that take and return DataFrames so it can be tested with a local SparkSession on a handful of rows.
</context>

<task>
Job: {{job}}
Platform: {{platform}}
{{#data_sizes}}Data sizes: {{data_sizes}}{{/data_sizes}}

1. Read existing jobs in the repo and follow their structure, configuration and packaging. List assumptions about inputs, grain, late data and run frequency.
2. Declare the schema for each input with `StructType`, and read only the columns and partitions needed (filter on partition columns early).
3. Write the transformation as pure functions over DataFrames using built-in functions; avoid Python UDFs, and if one is unavoidable, use a pandas UDF and say why.
4. Choose join strategies from the data sizes: broadcast small dimensions, and note keys at risk of skew and how the job handles them.
5. Write output idempotently for the platform: dynamic partition overwrite or `MERGE` on a key, a partition column with sensible cardinality, controlled file sizes, and the session time zone set.
6. Parameterise the run date or range, so reruns and backfills target exact partitions.
7. Write a pytest test with a local SparkSession and a few hand-made rows, including nulls and a duplicate key. Run it and report.
</task>

<constraints>
- No `collect()`, `toPandas()` or driver-side loops over data except on tiny, bounded results.
- No schema inference in the production read path.
- Do not run the job against production storage; give the command for the user.
- Use only APIs available in the stated Spark version and platform; say when a feature is platform-specific (for example Delta `MERGE`).
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Assumptions
Numbered.
## Job code
Code blocks with file paths.
## Test
Code blocks with file paths.
## Run and verify
Submit command, parameters, checks after a run, and test results.
## Open questions
Numbered, or "None".
</output_format>
