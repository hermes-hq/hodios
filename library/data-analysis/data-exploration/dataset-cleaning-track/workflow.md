---
schema: 1
id: dataset-cleaning-track
kind: workflow
title: Clean a dataset with a scripted, auditable pipeline
description: Cleans a dataset with a repeatable script in gated steps, profiling, proposing rules, applying and validating them, and exporting with an auditable cleaning log. Use for data that will be reused.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, plan, build, verify]
role: [data-analyst, data-engineer, data-scientist]
requires: [repo-read, file-write, shell]
inputs: [dataset, file]
output: [code, table, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [data-cleaning, data-profiling, reproducible-pipeline, cleaning-log, data-validation]
pairs_with:
  prompts: [explore-dataset, clean-messy-spreadsheet, clean-survey-export, deduplicate-records, write-data-quality-checks]
  personas: [data-analyst]
args:
  - name: input_path
    description: Path to the raw data file or folder in the project (CSV, Excel, JSON, Parquet).
    type: string
    required: true
  - name: output_format
    description: Format of the cleaned file.
    type: enum
    enum: [csv, parquet, xlsx]
    default: csv
  - name: rules
    description: Known business rules and definitions, for example "order_id is unique; amounts are in EUR cents; region must be one of EMEA, AMER, APAC; test accounts have emails ending in @example.com". Without them, problems are flagged rather than dropped.
    type: text
steps:
  - {id: profile, file: steps/01-profile.md, stage: discover, gate: none, artifact: "cleaning/01-profile.md"}
  - {id: propose-rules, file: steps/02-propose-rules.md, stage: plan, gate: approve, artifact: "cleaning/02-rules.md"}
  - {id: apply, file: steps/03-apply.md, stage: build, gate: none}
  - {id: validate-export, file: steps/04-validate-export.md, stage: verify, gate: none, artifact: "cleaning/04-cleaning-log.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Turns the raw data at `{{input_path}}` into a clean {{output_format}} file through a script anyone can rerun, with a log that says what changed, why and how many rows each rule touched. Cleaning by hand, or with a script that silently drops rows, produces numbers no one can defend later. Here every rule is proposed with evidence, approved before it removes anything, applied in code from the untouched raw file, and checked by validations that run with the pipeline.

Rules for every step:
- Never modify the raw file. Read it, and write everything else to a separate output folder.
- Every count in an artifact comes from code that ran. Do not estimate.
- Dropping rows or overwriting values requires an approved rule. Without one, add a flag column and leave the decision to the user.
- Use the language and libraries the project already uses (for example Python with pandas or Polars, or R with the tidyverse); otherwise ask, defaulting to Python.
- Do not print personal data into artifacts; refer to rows by key or row number.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
