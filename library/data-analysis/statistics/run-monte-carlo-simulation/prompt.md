---
schema: 1
id: run-monte-carlo-simulation
kind: prompt
title: Run a Monte Carlo simulation
description: Builds a Monte Carlo simulation for a decision or forecast with justified input distributions, correlations and code or spreadsheet steps. Use when a single-number estimate hides the risk.
category: statistics
version: 1.0.0
status: incubating
stage: [plan, build]
role: [financial-analyst, data-analyst, project-manager, business-analyst]
subject: [statistics]
inputs: [text]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [monte-carlo, risk-analysis, simulation, uncertainty]
pairs_with:
  prompts: [run-what-if-analysis, make-calibrated-forecast, forecast-time-series]
args:
  - name: model
    description: "The quantity you want to understand and how it is calculated from its inputs (for example 'profit = units × (price − unit cost) − fixed costs'), plus the decision or target it informs."
    type: text
    required: true
  - name: uncertain_inputs
    description: "Each uncertain input with what you know about it: a range, a most likely value, historical data, or an expert's minimum, likely and maximum. Note any inputs that move together."
    type: text
    required: true
  - name: tool
    description: Where the simulation will run.
    type: enum
    enum: [python, excel, r]
    default: python
output_contract:
  format: markdown
  sections: [Model, Input distributions, Simulation, How to read the results, Limits]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a decision analyst who builds simulation models for budgets, project schedules and business cases. You know a simulation is only as good as its input distributions and its correlations, that a model run at average inputs does not give the average outcome when the model is non-linear, and that the value of the exercise is the answer to "how likely is it that we miss the target?", not a more precise-looking point estimate.
</context>

<task>
Design a Monte Carlo simulation in {{tool}} for this model.

<model>
{{model}}
</model>

<uncertain_inputs>
{{uncertain_inputs}}
</uncertain_inputs>

1. Restate the output metric, its formula and the decision threshold (target, budget, break-even). If the formula is unclear or an input in it has no information at all, ask for it and stop; do not invent ranges.
2. For each uncertain input choose a distribution and justify it in one line:
   - expert minimum, most likely and maximum: PERT (or triangular when the user wants simplicity);
   - positive and right-skewed (costs, durations): lognormal fitted to two stated percentiles;
   - a proportion or rate between 0 and 1: beta;
   - an event that happens or not: Bernoulli with a stated probability, times its impact;
   - counts: Poisson or negative binomial;
   - historical data available: resample it (bootstrap) or fit and check the fit;
   - normal only when the input is symmetric and cannot plausibly go negative.
   Treat a range given as "between a and b" as a P10 to P90 range unless the user says it is an absolute minimum and maximum, and say which you assumed.
3. Correlations: identify inputs that move together (price and volume, schedule tasks sharing a resource). Model them with a shared driver or a rank correlation; explain that ignoring them usually understates the spread of the outcome.
4. Write the simulation: a fixed random seed, 10,000 iterations by default, and a convergence check (P10, P50 and P90 stable to the precision that matters when iterations double).
   - python: numpy and pandas, with the inputs in one clearly editable block at the top.
   - r: base R or tidyverse, same structure.
   - excel: one row per iteration with RAND()-based inverse-distribution formulas (NORM.INV, LOGNORM.INV, BETA.INV, and the triangular inverse formula written out), summary cells with PERCENTILE.INC and COUNTIF for probabilities, and a note that results change on every recalculation unless calculation is set to manual.
5. Define the outputs: mean, P10, P50, P90, the probability of missing the threshold, a histogram and cumulative curve, and a sensitivity ranking of inputs by rank correlation with the output (shown as a tornado chart).
6. Compare with the deterministic base case (all inputs at their most likely values) and explain why the two can differ.
</task>

<constraints>
- Do not present simulated results you have not run. Describe what the code will produce, and if you can run code, run it and report the actual numbers with the seed.
- Keep units consistent and label every input with its unit.
- Flag inputs whose range drives most of the output variance; those are worth more research before deciding.
- Warn when a distribution's tail produces impossible values (negative prices, probabilities above 1) and fix it with a bounded distribution rather than by clipping silently.
- Keep the model as simple as the decision allows; more inputs with guessed ranges add false confidence, not accuracy.
</constraints>

<output_format>
## Model
The output metric, formula and decision threshold.

## Input distributions
Table: Input | Unit | Distribution | Parameters | Why | Correlated with.

## Simulation
The {{tool}} code or spreadsheet layout in one block, followed by a convergence note.

## How to read the results
Bullets on each output (percentiles, probability of missing the threshold, tornado chart) and the sentence a decision-maker should take away, written as a template with placeholders if the results were not run.

## Limits
Up to four bullets: assumptions that most affect the answer and what would improve them.
</output_format>
