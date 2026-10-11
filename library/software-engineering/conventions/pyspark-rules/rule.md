---
schema: 1
id: pyspark-rules
kind: rule
title: PySpark rules
description: Standing rules for PySpark jobs covering explicit schemas, the DataFrame API over Python UDFs, no collect on large data, partitioning, skew, broadcast joins, caching and idempotent writes.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [data-engineer]
stack: [spark, python]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [dataframe-api, udfs, partitioning, data-skew, broadcast-join]
applies_to: ["**/*.py", "**/*.ipynb"]
pairs_with:
  rules: [python-style-rules]
  prompts: [write-pyspark-job, tune-spark-job]
  personas: [data-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change PySpark code in this project:

**Know the platform first**
- Check the Spark version and the platform (Databricks, EMR, Dataproc, Synapse, local), the table format (Delta, Iceberg, Hudi, Parquet) and how jobs are configured. Adaptive Query Execution, available functions and write options differ by version and platform.

**Reading and schemas**
- Define explicit schemas (`StructType`) for CSV and JSON sources. Do not use `inferSchema` in production jobs; it scans the data and guesses types differently run to run.
- Filter and select columns as early as possible so predicate and column pruning reach the source.

**Transformations**
- Use built-in functions from `pyspark.sql.functions` (imported as `F`) and the DataFrame API. Use a Python UDF only when no built-in can do the job, and then prefer a vectorised pandas UDF. Plain Python UDFs serialise every row to Python and block optimisation.
- Never call `collect()`, `toPandas()` or `count()` on large DataFrames to inspect or loop over data on the driver. Use `limit()` for samples and keep work distributed.
- Do not iterate over rows or columns in Python loops that add one `withColumn` per step for many columns; use a single `select` with a list of expressions.
- Reference columns with `F.col("name")`, and alias results explicitly. Avoid ambiguous column names after joins by selecting or renaming.

**Joins, partitioning and skew**
- Broadcast small dimension tables (`F.broadcast(df)`) when they fit comfortably in executor memory; do not broadcast large ones.
- Check join keys for nulls and skew. For skewed keys, rely on AQE skew handling where enabled, or salt the key.
- Repartition by the key you aggregate or write on when it reduces shuffles; use `coalesce` to reduce partition count before writing small outputs. Avoid producing thousands of tiny files.
- Partition output tables by low-cardinality columns that queries filter on (date), never by high-cardinality ids.

**Caching and actions**
- Cache or persist only a DataFrame reused by several actions, and unpersist it after. Know which lines trigger actions; each one recomputes the lineage.
- Avoid `UDF`-driven nondeterminism (random, current time) inside transformations that may be retried; it produces inconsistent results.

**Writes and idempotency**
- Make jobs safe to re-run: overwrite a partition (dynamic partition overwrite) or `MERGE` on a key, not blind `append` that duplicates data on retry.
- Write with an explicit mode and format. Never overwrite a whole table when the job processes one partition.
- Destructive operations (dropping tables, overwriting production paths, `VACUUM` with short retention) need explicit confirmation from a person.

**Config and code shape**
- Do not hard-code credentials or cluster settings in code; use the platform's secret scope and job config.
- Keep transformations as functions that take and return DataFrames so they can be tested with a small local SparkSession.

**Before you finish**
- Run unit tests on small DataFrames, check `explain()` for unexpected shuffles or Python UDFs, and validate output row counts and key uniqueness on a sample run. Say what you ran.
