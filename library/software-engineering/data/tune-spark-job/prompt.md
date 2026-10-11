---
schema: 1
id: tune-spark-job
kind: prompt
title: Tune a slow Spark job
description: Diagnoses a slow, failing or expensive Spark job from the Spark UI, query plans and logs, then fixes skew, oversized shuffles, spills, small files and executor sizing one measured change at a time.
category: data
version: 1.0.0
status: incubating
stage: [operate]
role: [data-engineer]
stack: [spark]
requires: [repo-read, file-write, shell]
inputs: [logs, repo, config, text]
output: [report, code, config]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [spark-ui, data-skew, shuffle, executor-memory, small-files, query-plan]
pairs_with:
  prompts: [write-pyspark-job, speed-up-batch-job, design-lakehouse-table-layout]
  personas: [data-engineer]
args:
  - name: symptoms
    description: What is wrong (run time, failures such as OOM or lost executors, cost), and what changed recently.
    type: text
    required: true
  - name: evidence
    description: What you have, such as Spark UI stage and task metrics, the physical plan from explain(), executor logs, cluster config and the job code location.
    type: text
    required: true
  - name: platform
    description: Spark version and platform (Databricks, EMR, Dataproc, Kubernetes), and whether adaptive query execution is on.
    type: string
output_contract:
  format: markdown
  sections: [Diagnosis, Evidence, Fixes in order, Measured results, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Spark tuning by guessing config values rarely works. The Spark UI usually points to one dominant cause. Skew shows as a stage where the max task time is many times the median and one task reads far more shuffle data. Spills to disk and long garbage collection show as executor memory pressure. Too few shuffle partitions give huge tasks, too many give overhead; adaptive query execution (`spark.sql.adaptive.enabled`) coalesces partitions and can split skewed joins, but only for shuffle joins, and its thresholds matter. A sort-merge join of a large table against a small one that should have been broadcast is common after statistics go stale or a filter is applied late. Reading millions of small files makes listing and scheduling dominate. Python UDFs, `collect()`, repeated recomputation of a DataFrame used by several actions (cache it, then unpersist), and wide transformations repeated in loops are code causes. Executor sizing (cores per executor, memory and overhead) should follow the evidence, and more nodes often hide the problem rather than fix it.
</context>

<task>
Symptoms: {{symptoms}}
Evidence: {{evidence}}
{{#platform}}Platform: {{platform}}{{/platform}}

1. Read the job code and its configuration. From the evidence, find the slowest stages and, for each, compare max, median and min task time, input and shuffle sizes, spill and GC time. If key metrics are missing, say exactly which Spark UI pages or `explain("formatted")` output to collect.
2. Name the dominant cause for each slow stage (skew, wrong join strategy, too few or too many partitions, spill, small files, driver bottleneck, UDF, recomputation) with the evidence that shows it.
3. Propose fixes in order of expected impact and risk: code and plan fixes first (filter and prune early, broadcast hints, skew handling, caching a reused DataFrame, replacing UDFs), then data layout (compaction, partitioning, file sizes), then configuration (AQE settings, shuffle partitions), and executor sizing last.
4. Make the changes one at a time, on a representative input if possible, and record run time, shuffle size and cost after each.
5. Check results are unchanged: row counts and a checksum or sample diff of the output before and after.
</task>

<constraints>
- Do not change many settings at once; each change needs its own measurement.
- Do not run experiments that overwrite production tables. Write to a scratch location.
- Do not recommend more or bigger nodes as the fix unless the evidence shows the job is genuinely resource bound after code and layout fixes.
- State which settings depend on the Spark version or platform.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Diagnosis
The dominant cause per slow stage, in one or two sentences each.
## Evidence
The metrics that support it, or the exact metrics still needed.
## Fixes in order
Numbered, each with the change (code or config block), expected effect and risk.
## Measured results
Table: change | run time | shuffle | cost | output unchanged? Or "not measured" with the reason.
## Open questions
Numbered, or "None".
</output_format>
