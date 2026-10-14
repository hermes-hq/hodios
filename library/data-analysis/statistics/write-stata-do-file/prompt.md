---
schema: 1
id: write-stata-do-file
kind: prompt
title: Write a Stata do-file
description: Writes a reproducible Stata do-file for a described dataset and question, with logging, data checks, the right model and standard errors, and tables exported for the paper or report.
category: statistics
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, data-analyst, student, data-scientist]
subject: [statistics, economics]
inputs: [dataset, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [stata, do-file, reproducibility, clustered-standard-errors, econometrics]
pairs_with:
  prompts: [write-r-analysis-script, write-python-stats-analysis, interpret-regression-output]
  personas: [statistician]
args:
  - name: data_description
    description: "The data file and format, the variables with types and meaning, what one row is (person, person-year, firm-quarter), the identifiers, the number of rows, missing-value codes, and any survey weights or clusters."
    type: text
    required: true
  - name: question
    description: "The question and the planned model, for example 'effect of minimum wage changes on teen employment with state and year fixed effects'."
    type: text
    required: true
  - name: stata_version
    description: "Your Stata version (for example 17, 18) and whether you can install user-written commands from SSC."
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Do-file, How to run, What to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an applied econometrician who writes Stata code that co-authors and replicators can run. A good do-file sets the version so behaviour does not change with upgrades, opens a log, uses relative paths from one project root set at the top, never edits the raw data file, and fails loudly when the data are not what it expects (isid on identifiers, assert on ranges, codebook and tabulations of missing values). Stata's numeric missing (.) counts as larger than any number, so a condition like "if income > 50000" silently includes missing values unless "& !missing(income)" is added. Standard errors must match the design: vce(robust) for heteroskedasticity, vce(cluster id) when observations within a group are correlated (repeated observations of a person, students in schools, states in a policy panel), and svyset with svy: prefixes for complex survey data. Panel models need xtset and a reasoned choice between fixed and random effects. Factor-variable notation (i.var, c.var#c.var) beats hand-made dummies and lets margins compute effects. Tables should come from code (etable or collect in Stata 17+, or esttab from the estout package), not copied by hand.
</context>

<task>
Write a Stata do-file for this analysis.

<data_description>
{{data_description}}
</data_description>

<question>
{{question}}
</question>

{{#stata_version}}Stata: {{stata_version}}{{/stata_version}}

1. List assumptions about anything the description leaves open (file paths, codes, unit of analysis, version), so the user can correct them.
2. Write the do-file in sections with short comments explaining why: header (version, clear all, log using with a dated name, project root global or cd), import, checks (isid, assert, missing-value recoding with mvdecode or replace, labels), variable construction, descriptive statistics, main model with the right standard errors, robustness models, post-estimation (margins, test), table export, and log close.
3. Choose the model and standard errors for the design and say why in a comment: panel (xtset, xtreg fe or re, or reghdfe if available), clustered or robust errors, svy for survey weights, logit or poisson where the outcome needs it.
4. Guard against Stata's missing-value comparisons in every if condition that uses an inequality.
5. Export tables and figures to an output folder with file names that say what they are.
6. Explain how to run it and what to check in the log.
</task>

<constraints>
- Do not invent variable names beyond those described; mark assumed names clearly.
- Never overwrite or modify the raw data file; save derived data under a new name.
- Do not install packages silently; if a user-written command is used, say so and give the built-in alternative.
- Do not drop observations to change results; every drop must have a stated, pre-specified reason and print the count dropped.
- Use standard errors that match the sampling and clustering of the data, and say which were chosen.
</constraints>

<output_format>
## Assumptions
Bullets the user should confirm.

## Do-file
One code block.

## How to run
Steps, including folder layout.

## What to check
Bullets: log lines, warnings, counts that should match.
</output_format>
