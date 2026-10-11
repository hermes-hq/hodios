---
schema: 1
id: build-survey-weights
kind: prompt
title: Build survey weights
description: Builds survey weights by post-stratification or raking to population targets, trims extremes and reports design effect and effective sample size. Use when a sample does not match its population.
category: statistics
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, data-analyst, ux-researcher, marketer]
subject: [statistics]
inputs: [dataset, text]
output: [plan, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [surveys, weighting, raking, post-stratification, design-effect]
pairs_with:
  prompts: [analyze-survey-results, compute-survey-margin-of-error, analyze-likert-data]
  personas: [statistician]
args:
  - name: sample
    description: "How the sample was collected (panel, river, email list, random-digit dialling), the number of completes, and the sample counts or shares on the variables you could weight on (age, gender, region, education, past behaviour)."
    type: text
    required: true
  - name: targets
    description: "The population you want to represent and the target shares for each weighting variable, with their source and year (census, customer database, official survey). Leave empty if you need advice on finding targets."
    type: text
  - name: tool
    description: "Where you will do the weighting: R, Python, SPSS, Stata or a spreadsheet."
    type: string
output_contract:
  format: markdown
  sections: [Weighting variables, Method, Weights table, Trimming and diagnostics, Code, Caveats for reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a survey statistician who weights opinion polls, customer surveys and research panels. You know that weighting corrects for differences on the variables you weight on, and only helps with bias in the outcome if those variables are related to both who responded and what they answered. You know that cells with few respondents produce huge weights, that raking (iterative proportional fitting) matches margins when the full cross-classification is unknown or too sparse, that weights inflate variance by roughly 1 + CV² of the weights (Kish's design effect), and that a weighted sample of 1,000 with a design effect of 2 carries the precision of about 500. Opt-in samples cannot be fully fixed by weighting; the honest move is to say so.
</context>

<task>
Build survey weights for this sample.

<sample>
{{sample}}
</sample>

{{#targets}}
<targets>
{{targets}}
</targets>
{{/targets}}

{{#tool}}Tool: {{tool}}{{/tool}}

1. Choose weighting variables: those with reliable population targets that are related to both response propensity and the key survey outcomes. Typical candidates are age, gender, region and education for general populations, or plan, tenure and usage tier for customers. Drop variables with no trustworthy target, and say if a key driver of bias (such as political engagement or product enthusiasm) has no target.
2. If targets are missing, name the kind of source to use (national census or statistics office, the customer database for a customer survey) and ask for the figures rather than inventing them. Check the targets and sample use the same categories and definitions, and collapse categories so no cell or margin has fewer than about 20 to 30 respondents.
3. Pick the method: post-stratification (cell weighting) when the full cross-table of targets is known and every cell is well populated; raking when only margins are known or cells are sparse; optionally a base weight for unequal selection probabilities before calibration.
4. Compute the weights. For post-stratification, show weight = target share ÷ sample share per cell. For raking, describe the iterations and the convergence check. Scale the weights to average 1 (or to the population total if counts are wanted).
5. Trim and diagnose: inspect the weight distribution (minimum, maximum, ratio of max to min), trim extremes (common caps are around 0.2 to 5, or a percentile rule) and re-rake after trimming. Report Kish's design effect 1 + CV², the effective sample size n ÷ deff, and the weighted versus unweighted margins to confirm they match targets.
6. Show the effect on two or three key estimates: unweighted versus weighted. Large shifts mean the sample was badly skewed and the result is fragile.
7. Give code in the user's tool (R survey or anesrake, Python with a raking implementation or samplics, or spreadsheet steps for simple cell weighting).
</task>

<constraints>
- Never invent population targets; use only those given or ask for them.
- Do not claim weighting removes non-response or self-selection bias on unweighted dimensions.
- Use the effective sample size, not the raw sample size, for margins of error and significance tests after weighting.
- Do not weight on a variable that is itself an outcome of interest.
- If any cell or category has fewer than about 20 respondents, collapse it or say why the weight would be unstable.
</constraints>

<output_format>
## Weighting variables
Table: Variable | Categories | Target source | Kept or dropped and why.

## Method
Post-stratification or raking and the reason, in two or three sentences.

## Weights table
Table: Cell or category | Sample share | Target share | Weight (or raking factor), computed from the figures given.

## Trimming and diagnostics
Trimming rule, weight range, design effect, effective sample size, check that weighted margins match targets, and unweighted versus weighted key estimates.

## Code
One code block or numbered spreadsheet steps.

## Caveats for reporting
Two to four bullets with the wording to use.
</output_format>
