---
schema: 1
id: convert-notebook-to-pipeline
kind: prompt
title: Turn an exploratory notebook into a tested pipeline
description: Converts an exploratory notebook into a parameterised script or pipeline task with functions, config, logging and a test reproducing its key outputs. Use when a notebook moves to production.
category: data
version: 1.0.0
status: incubating
stage: [build, verify]
role: [data-scientist, data-engineer, ml-engineer]
stack: [jupyter]
requires: [repo-read, file-write, shell]
inputs: [file, dataset]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [notebook-refactoring, productionizing, reproducibility, parameterization]
pairs_with:
  prompts: [design-data-pipeline, write-data-quality-checks]
  personas: [data-engineer]
args:
  - name: notebook_path
    description: Path to the notebook in the project.
    type: string
    required: true
  - name: target
    description: What to produce. script is a command-line script; package is an importable module with a thin entry point; pipeline-task wraps the steps for the orchestrator the project uses.
    type: enum
    enum: [script, package, pipeline-task]
    default: script
  - name: test_command
    description: The command that runs the project's tests. Leave empty if the project has no tests yet and one will be set up.
    type: string
output_contract:
  format: markdown
  sections: [Notebook analysis, Structure, Parameters, Reproduction test, Differences from the notebook, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Notebooks hide state. Cells run out of order, variables survive from deleted cells, paths and dates are hard-coded, and results depend on whatever was in memory when the author last ran it. Copying the cells into a script reproduces those problems without the notebook's visibility. A real conversion first proves what the notebook produces when run top to bottom, then restructures the code and shows, with a test, that the new code produces the same results.
</context>

<task>
Convert the notebook at `{{notebook_path}}` into a {{target}}.

1. Run the notebook top to bottom in a fresh kernel without modifying it (for example with nbconvert or papermill writing to a scratch copy). If it fails or gives different results from the saved outputs, record where: that is hidden state, and the saved outputs cannot be the reference.
2. Capture the reference outputs from the clean run: row counts, column lists, summary statistics, key computed values, model metrics, and the output files written. Save them as a small reference file for the test.
3. Analyse the notebook: inputs (files, queries, APIs), hard-coded values that should be parameters (paths, dates, thresholds, credentials), the real pipeline steps, exploratory cells that produce nothing used later, randomness and its seeds, and outputs.
4. Restructure into functions for each step (load, validate, transform, model or aggregate, write), each taking inputs as arguments and returning outputs, with no global state. Keep business logic out of the entry point.
5. Parameters come from command-line arguments or a config file, with the notebook's values as defaults. Credentials come from environment variables or the project's secret mechanism, never from code.
6. Replace prints and displays with logging at sensible levels, including row counts after each step. Drop plots unless they are outputs; write them to files if they are.
7. For pipeline-task, wrap the functions for the orchestrator the project already uses (for example Airflow, Dagster, Prefect, a Makefile or cron) following its existing task conventions; if none is used, say so and produce a package with a CLI instead.
8. Write a test that runs the new code on the same input (or a small fixture derived from it, if the real data is too large or private) and compares with the reference outputs: exact for counts and deterministic values, within a stated tolerance for floating-point and seeded model results. Run it with {{test_command}} or the project's test runner.
9. Leave the original notebook unchanged.
</task>

<constraints>
- The reproduction test compares against outputs captured from the clean notebook run, stored as reference data. Never write the expected values into the pipeline code, and never loosen a tolerance to make the test pass without explaining the difference.
- Do not change the logic. If you find a bug in the notebook's logic, keep the behaviour, make the test pass against the reference, and report the bug; fix it only if the user asks.
- Remove exploratory code only when nothing downstream uses it, and list what was removed.
- If input data is unavailable or needs credentials you do not have, stop and say what is needed.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Notebook analysis
Clean-run result, hidden state found, inputs, outputs, hard-coded values.

## Structure
Files created and the function for each step, one line each.

## Parameters
Table: Parameter | Default (from the notebook) | Source (CLI, config, environment).

## Reproduction test
What it compares, tolerances and why.

## Differences from the notebook
Removed cells, bugs found but kept, and any intended differences.

## Verification
Commands run (notebook clean run, new code run, tests) and real results.
</output_format>
