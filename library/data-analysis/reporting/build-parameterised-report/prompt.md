---
schema: 1
id: build-parameterised-report
kind: prompt
title: Build a parameterised report for many segments
description: Builds one report template in Quarto, R Markdown or Jupyter that renders a separate version per region, client or team, with a driver script, data isolation checks and output verification.
category: reporting
version: 1.0.0
status: incubating
stage: [build, verify]
role: [data-analyst, data-scientist, data-engineer]
stack: [r, jupyter]
requires: [repo-read, file-write, shell]
inputs: [repo, dataset, text]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [quarto, rmarkdown, papermill, batch-rendering, report-automation]
pairs_with:
  prompts: [automate-recurring-report, generate-docx-report-from-template, apply-small-number-suppression]
args:
  - name: report_goal
    description: "What each version shows, the parameter that varies (region, client, team, school), where the list of values comes from, the output format (HTML, PDF, Word) and who receives each version."
    type: text
    required: true
  - name: existing_code
    description: The path to the existing notebook, script or report this should build on, if any. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Plan, Template, Driver, Checks, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When the same report is needed for forty regions or two hundred clients, copying a notebook forty times guarantees drift. The robust pattern is one template with declared parameters and a driver that renders it once per value. Quarto takes parameters from the document's YAML params for the knitr engine, or from a cell tagged "parameters" for the Jupyter engine, and renders with `quarto render report.qmd -P region:North`. R Markdown renders with `rmarkdown::render()` and a `params` list. Plain notebooks are parameterised with papermill, which injects values after the cell tagged "parameters". The failure modes are specific. Data from one segment leaking into another's file, which is serious when versions go to different clients, usually because a filter was applied to one chart but not to a table or a cached object. Segments with no data or very few rows that produce empty charts, division by zero or identifiable small numbers. Parallel renders writing to the same intermediate files. Output names built from raw values with spaces or slashes. Every run should log what was rendered, skipped and why, and be checked before anything is sent.
</context>

<task>
<report_goal>
{{report_goal}}
</report_goal>
{{#existing_code}}

Existing code: {{existing_code}}
{{/existing_code}}

1. Read the existing code and the project's environment files (requirements, renv or conda files, Quarto config) first. Reuse its data loading, styling and conventions; note the language and tool already used and stay with it unless it cannot do the job.
2. Write a short plan: the parameters, where the value list comes from, the output format and naming scheme, and where outputs go.
3. Build the template: declare parameters with safe defaults, apply the segment filter once at data load (in the query or the first data step) so every table and chart uses the filtered data, and handle empty or small segments explicitly (skip with a log entry, or show a clear message; apply the suppression rule given or flag the need for one).
4. Build the driver: read the value list, sanitise output file names, render one version per value into its own output path, run renders serially or isolate working directories if parallel, continue past a failed render and record it, and write a run log (value, status, rows used, output path, time).
5. Add checks: each output exists and is non-empty; each output's key total matches the source for that segment; no other segment's identifiers appear in the output (search the rendered text for the other values); counts of rendered, skipped and failed match the value list.
6. Render a small sample (two or three values, including the smallest segment) first, inspect the results, then run the full set.
7. Report what was built, how to run it, the run log summary and the check results.
</task>

<constraints>
- Do not send, upload or email any output; delivery is for the user to do after review.
- Do not overwrite or delete existing reports or output folders without asking; write to a new dated output folder.
- Do not hardcode credentials; use the project's existing configuration for data access.
- Keep the change focused on the template, the driver and the checks.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Plan
Parameters, value source, naming and output location.

## Template
File path and what it contains.

## Driver
File path and the command to run it.

## Checks
Each check and its result on the sample and full run.

## Verification
Commands run, counts rendered, skipped and failed, and anything still to review by hand.
</output_format>
