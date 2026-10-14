---
schema: 1
id: document-data-pipeline
kind: prompt
title: Document a data pipeline
description: Documents a batch or streaming data pipeline with its sources and sinks, schedule, lineage, owners, failure handling, backfill and rerun instructions, checked against the orchestration code.
category: docs
version: 1.0.0
status: incubating
stage: [build, operate]
role: [data-engineer, sre]
stack: []
requires: [repo-read, file-write]
inputs: [repo, config, text]
output: [docs, diagram]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [data-lineage, orchestration, backfill, airflow, etl]
pairs_with:
  prompts: [write-dataset-documentation, write-service-readme]
args:
  - name: pipeline
    description: The pipeline to document (DAG or job name and path) and the orchestrator (Airflow, Dagster, Prefect, cron, Spark jobs, a streaming job).
    type: string
    required: true
  - name: team_notes
    description: Facts not in code - owners, consumers, SLAs, alert routing.
    type: text
    default: none given
output_contract:
  format: markdown
  sections: [Document written, Lineage, Operational risks, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pipeline docs are read when something went wrong: a table is late, numbers look off, or a job failed overnight. The reader needs to know what the pipeline reads and writes, when it runs and what it waits for, what each task does, who consumes the output, whether a rerun is safe (idempotent overwrite of a partition versus an append that duplicates rows), how to backfill a date range, what happens on partial failure, where the logs and alerts go, and who owns it. The most dangerous undocumented facts are non-idempotent steps, side effects outside the warehouse (emails sent, APIs called, files deleted), and implicit dependencies on another pipeline finishing first.
</context>

<task>
Document the pipeline `{{pipeline}}`.

Team notes:
<team_notes>
{{team_notes}}
</team_notes>

1. Read the DAG or job definition, each task's code, connection and config names, schedule, sensors or triggers, retries and timeouts, and alerting callbacks.
2. Write an overview: purpose, owner, schedule and time zone, expected duration, and SLA if known.
3. Write the lineage: sources (tables, files, APIs, topics) and sinks, with a Mermaid flowchart of tasks and data stores.
4. Write a task table: task, what it does, inputs, outputs, idempotent or not, side effects, retries.
5. Write "Failure handling and reruns": which tasks are safe to rerun, how to clear and rerun, how to backfill a date range with the orchestrator's real command, and steps that must not be rerun without cleanup.
6. Write "Monitoring": logs, alerts and where they route, data quality checks.
7. Write "Consumers and dependencies": upstream pipelines it waits on and downstream users.
</task>

<constraints>
- Every table, connection, schedule and command must match the code. Mark unknowns "to confirm".
- Mark non-idempotent tasks and external side effects prominently.
- Do not run, clear or backfill the pipeline.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the document. Then reply with:
## Document written
Path and sections.
## Lineage
Sources and sinks as a short list.
## Operational risks
Non-idempotent steps, missing alerts or retries, implicit dependencies. Write "None" if there are none.
## Questions for the owners
Facts to confirm (owners, consumers, SLA).
</output_format>
