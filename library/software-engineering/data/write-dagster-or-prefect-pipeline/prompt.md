---
schema: 1
id: write-dagster-or-prefect-pipeline
kind: prompt
title: Write a Dagster or Prefect pipeline
description: Writes a Dagster asset graph or a Prefect flow with partitions or parameters, retries, resources or blocks for secrets, schedules, idempotent outputs and local tests, following the tool's own model.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [data-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [dagster, prefect, orchestration, software-defined-assets, scheduling]
pairs_with:
  prompts: [write-airflow-dag, design-data-pipeline, move-cron-jobs-to-orchestrator]
  personas: [data-engineer]
args:
  - name: pipeline
    description: What the pipeline does step by step (sources, transforms, destinations), its schedule and dependencies.
    type: text
    required: true
  - name: orchestrator
    description: Which tool to use.
    type: enum
    enum: [dagster, prefect, recommend]
    default: recommend
  - name: setup
    description: Tool version, where it runs (self-hosted, cloud offering, Kubernetes) and existing code locations or deployments.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Pipeline code, Tests, Deployment, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Dagster and Prefect are not Airflow with different syntax, and porting Airflow habits into them loses their benefits. Dagster is asset-centric: you declare the data assets a pipeline produces and their dependencies, with partitions (daily, static, dynamic) that make backfills and reruns precise, resources for connections and config, IO managers for storage, and asset checks for quality; jobs and schedules select assets. Prefect is flow-centric: Python functions decorated as flows and tasks, with parameters, retries, caching, concurrency limits, blocks or variables for configuration and secrets, and deployments with schedules on work pools. Shared lessons apply in both: tasks or assets must be idempotent and keyed to a partition or parameter, not to the current time; secrets belong in the tool's secret mechanism; heavy imports and I/O must not run at module import time; and the logic should be plain functions that can be tested without the orchestrator. APIs differ between major versions of both tools, so the installed version matters.
</context>

<task>
Pipeline: {{pipeline}}
Orchestrator: {{orchestrator}} (if "recommend", choose from the pipeline's shape and the setup, and say why in two sentences)
{{#setup}}Setup: {{setup}}{{/setup}}

1. Read the existing orchestration code and dependency files to find the installed version and conventions. List assumptions about schedule, data arrival and outputs.
2. Model the pipeline in the tool's own terms: for Dagster, assets with dependencies, a partitions definition, resources and an asset job with a schedule or sensor; for Prefect, a flow with tasks, parameters for the run date or range, retries with delays, and a deployment with a schedule.
3. Make every output idempotent for its partition or parameter (overwrite or merge), and pass references between steps rather than large data in memory.
4. Put credentials in Dagster resources configured with `EnvVar`, or in Prefect blocks, variables or environment variables. Keep imports and connections out of module top level.
5. Add data checks: Dagster asset checks or Prefect tasks that validate row counts and keys and fail the run clearly.
6. Write tests: pure functions with pytest, plus a materialisation or flow run test with test resources. Run them and report.
7. Describe how to deploy and backfill a date range.
</task>

<constraints>
- Use only APIs that exist in the installed version; if unknown, say which version the code targets.
- Do not deploy or trigger runs against production; give the commands.
- Do not mirror an Airflow DAG one-to-one if the tool's model expresses it better; explain the mapping.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Assumptions
Numbered, including the tool choice if recommended.
## Pipeline code
Code blocks with file paths.
## Tests
Code blocks and results.
## Deployment
Deploy, schedule and backfill commands.
## Open questions
Numbered, or "None".
</output_format>
