---
schema: 1
id: write-r-analysis-script
kind: prompt
title: Write an R analysis script
description: Writes a reproducible R (tidyverse) analysis script for a described dataset and question, with import, checks, analysis, plots and saved outputs. Use when you need an analysis others can re-run.
category: statistics
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, data-scientist, researcher, student]
stack: [r]
inputs: [dataset, text]
output: [code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [tidyverse, ggplot2, reproducibility, data-checks]
pairs_with:
  prompts: [choose-statistical-test, write-plotting-code, write-dataframe-transformation]
  personas: [statistician]
args:
  - name: data_description
    description: The data - file name and format, columns with types and meaning, a few sample rows, row count, how missing values are coded, and what one row represents.
    type: text
    required: true
  - name: question
    description: The question the analysis must answer (for example "Do weekly sales differ between stores with and without the new layout, after accounting for store size?").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Script, How to run, What to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an R developer and applied statistician who writes analysis scripts that a colleague can run a year later and get the same answer. That means explicit column types on import, checks that fail loudly when the data is not what the script expects, one clear path from raw data to results, plots that stand on their own, outputs written to files, and comments that explain why rather than what.
</context>

<task>
Write an R script that answers this question:

<question>
{{question}}
</question>

using this data:

<data_description>
{{data_description}}
</data_description>

Structure the script in these sections, each starting with a comment banner:

1. Header comment: purpose, the question, input file, outputs, required packages, and the R version it was written for (4.1 or later, for the native pipe).
2. Setup: library() calls for the packages used (tidyverse, plus only what the analysis needs, such as broom, janitor, lubridate or a modelling package), a fixed seed if anything is random, and a config block with the input path, the output folder, and any thresholds or parameters as named variables.
3. Import: readr::read_csv (or the right reader for the format) with explicit col_types and na values matching the data description; janitor::clean_names if headers are messy.
4. Checks: stopifnot or explicit if-stop checks for expected columns, row count above zero, key uniqueness, allowed values of categorical columns, value ranges, and a printed summary of missing values per column. Each check has a message that says what went wrong.
5. Preparation: filtering, type fixes, derived variables and joins, each with a comment on why, and a row count printed after every step that can drop or duplicate rows.
6. Analysis: the method that answers the question (descriptive summaries, group comparisons, a test, or a model), chosen for the data and stated in a comment, with tidy output through broom where models are used, and an assumption check where the method has assumptions that matter.
7. Plots: ggplot2 charts that answer the question, with a title that states the takeaway, labelled axes with units, a caption with the data source, a colour-blind-friendly palette, and ggsave to the output folder at a stated size.
8. Outputs: write result tables to CSV in the output folder, and end with sessionInfo() so the environment is recorded.
</task>

<constraints>
- Use the column names exactly as described. If a needed column is missing or ambiguous, put a clearly marked placeholder in the config block and list it under Assumptions; never invent columns silently.
- Use relative paths (or the here package); never setwd() or rm(list = ls()), and never install packages inside the script; list them for the user to install once.
- Keep it runnable from top to bottom with Rscript, without interactive steps.
- Prefer clear tidyverse code over clever code; add a comment wherever a choice affects the answer (exclusions, outlier handling, model terms).
- Do not show results or claim what the script will output; it has not been run. Describe what to check when it runs.
</constraints>

<output_format>
## Assumptions
Bullets: column readings, choices made, placeholders to fill.

## Script
One fenced r code block containing the whole script.

## How to run
The packages to install once, the folder layout, and the Rscript command.

## What to check
Four to six bullets: which printed checks and outputs to look at, and what would mean the analysis needs revisiting.
</output_format>
