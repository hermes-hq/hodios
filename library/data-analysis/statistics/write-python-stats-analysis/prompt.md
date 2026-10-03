---
schema: 1
id: write-python-stats-analysis
kind: prompt
title: Write a Python statistical analysis
description: Writes a reproducible Python analysis with statsmodels and scipy for a described dataset and question, with data checks, assumption checks and effect sizes. Use when others must re-run it.
category: statistics
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, data-scientist, researcher, student]
subject: [statistics]
stack: [pandas]
inputs: [text, schema]
output: [code, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [statsmodels, scipy, reproducible-analysis, assumption-checks]
pairs_with:
  prompts: [write-r-analysis-script, choose-statistical-test, interpret-regression-output]
  personas: [statistician]
args:
  - name: dataset_description
    description: "File format and location, one row per what, the columns with types and units, how the data were collected, known quirks (missing codes, duplicates), and the rough number of rows."
    type: text
    required: true
  - name: question
    description: "The question in plain words, the outcome and the comparison or predictors of interest, and any covariates or groupings you know matter."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Plan, Script, How to run, Reading the output, If assumptions fail]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a research software engineer with a statistics background. You write analysis scripts that a colleague can run a year later and get the same numbers: pinned dependencies, a fixed seed, explicit data checks that fail loudly, and models specified from the question rather than discovered by trying things. You prefer statsmodels' formula interface for models because its output shows coefficients, intervals and diagnostics, and scipy for simple tests.
</context>

<task>
Write a Python analysis script for this dataset and question.

<dataset_description>
{{dataset_description}}
</dataset_description>

<question>
{{question}}
</question>

1. Restate the question as an estimand: the outcome, the comparison or predictor, the population and the effect measure (difference in means, odds ratio, slope). Choose the simplest model that answers it, and say why. If the outcome type or unit of analysis is unclear, ask before writing code, or state the assumption at the top of the script.
2. Structure the script in clearly commented sections:
   - configuration: file path, column names and constants at the top, so nothing is buried in the code; a fixed random seed;
   - load with explicit dtypes and missing-value codes;
   - validate with assertions: expected columns, value ranges, uniqueness of the unit id, row count, missingness per column; stop with a clear message if a check fails;
   - describe: summary statistics by group and one or two plots of the raw data;
   - model: the test or model from step 1 (statsmodels formula API or scipy.stats);
   - check assumptions: residual plots, normality (Q-Q plot, not only a test), equal variance, influential points (Cook's distance), multicollinearity (VIF) for regressions, and independence (clustered or repeated observations);
   - report: effect size with a 95% confidence interval first, the p-value second, in the units of the outcome;
   - save tables to CSV and figures to PNG in an outputs folder.
3. Handle the known complications: robust (HC3) standard errors when variance is unequal; cluster-robust standard errors or a mixed model when rows are grouped; a non-parametric or bootstrap alternative when assumptions clearly fail; logistic or count models for binary or count outcomes.
4. List dependencies with versions in a requirements block.
</task>

<constraints>
- Use only the columns described. Where a name is unknown, use a clearly marked constant such as OUTCOME_COL = "TODO_outcome" rather than guessing.
- Do not run several tests and keep the significant one. If there are several outcomes or comparisons, pre-specify them and apply a correction (Holm by default).
- Never drop rows silently: log how many rows each filter removes and why.
- Do not print results you have not computed; if you can execute code, run it and report actual output.
- Keep the script in plain Python (a .py file with # %% cell markers works in notebooks too).
</constraints>

<output_format>
## Plan
The estimand, chosen method and why, in up to five bullets.

## Script
One Python code block with the full script.

## How to run
Install and run commands in a short code block.

## Reading the output
Which numbers answer the question, and a template sentence for the result.

## If assumptions fail
A table: Check | Sign of trouble | What to do instead.
</output_format>
