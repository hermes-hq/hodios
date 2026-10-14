---
schema: 1
id: write-airflow-dag
kind: prompt
title: Write an Airflow DAG
description: Writes an Apache Airflow DAG with idempotent tasks keyed on the data interval, sensible retries, catchup and backfill behaviour, sensors that do not hog workers, secrets in connections and a DAG test.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [data-engineer]
stack: [python]
requires: [none]
inputs: [spec, text]
output: [code, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [airflow, dag, orchestration, idempotency, backfill, scheduling]
pairs_with:
  prompts: [design-data-pipeline, convert-notebook-to-pipeline, move-cron-jobs-to-orchestrator]
  personas: [data-engineer]
args:
  - name: pipeline
    description: What the DAG must do step by step (sources, transforms, destinations), schedule, expected run time, and dependencies on other DAGs or files arriving.
    type: text
    required: true
  - name: airflow_version
    description: Airflow version and executor, plus providers available, for example "Airflow 2.10, Celery executor, Google and Postgres providers".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, DAG code, Design notes, Test, Operating notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Airflow schedules runs for data intervals, not wall-clock moments: a daily run for 2026-10-10 starts after that interval ends and should process exactly that interval's data, read from the run's context (`data_interval_start` and `data_interval_end`), never from `now()`. That one rule makes retries, reruns and backfills safe, together with idempotent writes (overwrite a partition, or merge on a key, never blind append). Other common mistakes: heavy work or database calls at the top level of the DAG file (run on every scheduler parse), `catchup` left on by default creating hundreds of runs on first deploy, a `start_date` set to a dynamic value, sensors in poke mode holding worker slots for hours instead of reschedule mode or deferrable operators, large data passed through XCom, secrets in code instead of connections or a secrets backend, retries without a timeout, and one giant task that cannot be rerun partially. Features, import paths and some defaults (for example how cron schedules map to data intervals, and the catchup default) differ between Airflow 2.x and 3.x, so the version matters.
</context>

<task>
Airflow version and setup: {{airflow_version}}

<pipeline>
{{pipeline}}
</pipeline>

1. List assumptions about data arrival, interval, time zone, run time and destinations.
2. Write the DAG: a fixed `start_date`, the schedule, `catchup` set deliberately with the reason, `max_active_runs`, default args with retries, retry delay and `execution_timeout`, tasks split at rerunnable boundaries, and dependencies.
3. Make every task idempotent: read and write only the run's data interval, write by overwriting a partition or merging on keys, and use templated or context values rather than the current time.
4. Use reschedule mode or deferrable operators for waits on files, partitions or other DAGs, with timeouts and a clear failure.
5. Keep secrets in Airflow connections or a secrets backend, keep top-level code light, and pass references (paths, table names) through XCom, not data.
6. Add failure handling: alerts on failure and on SLA or duration breach as supported by the version, and what a human does next.
7. Write a test that loads the DAG bag without import errors and checks the task graph, plus a way to run one task for one interval locally.
8. Note how to backfill a date range safely and what to check before doing it.
</task>

<constraints>
- Use operators and import paths that exist in the stated version; if unsure, say so and show the version-neutral alternative (for example a TaskFlow `@task` with a client library).
- Do not hard-code credentials, hostnames or account ids; use placeholders and connections.
- Do not use `datetime.now()` or `days_ago()` for logic or start dates.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets.

## DAG code
One Python code block.

## Design notes
Bullets on idempotency, catchup, waits and retries.

## Test
Python test code and the command to run one task.

## Operating notes
Backfill steps, alerts, and what to check when it fails.
</output_format>
