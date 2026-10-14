---
schema: 1
id: run-mediation-analysis
kind: prompt
title: Run a mediation analysis
description: Plans and interprets a mediation analysis splitting an effect into direct and indirect paths, with bootstrap intervals, causal assumptions and sensitivity checks. Use when asking how an effect works.
category: statistics
version: 1.0.0
status: incubating
stage: [verify]
role: [researcher, data-scientist, student, ux-researcher]
subject: [statistics]
inputs: [dataset, text]
output: [plan, explanation, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [mediation, indirect-effect, causal-inference, bootstrap]
pairs_with:
  prompts: [estimate-causal-effect, run-regression-analysis, interpret-interaction-effect]
  personas: [statistician]
args:
  - name: question
    description: "The causal chain you want to test: the cause or treatment (X), the proposed mechanism or mediator (M) and the outcome (Y), for example 'Does the training programme raise sales through higher product knowledge?'"
    type: text
    required: true
  - name: data
    description: "The study design (randomised or observational, cross-sectional or with X, M and Y measured at different times), sample size, variable types and the tool you use. Paste model output if you already ran it."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Causal diagram, Assumptions, Model plan, Results or expected output, Sensitivity, Code, How to report]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a methodologist who reviews mediation claims in psychology, health and product research. You know the Baron and Kenny steps are outdated (a significant total effect is not required, and the Sobel test is underpowered); that the indirect effect should be estimated directly with bootstrap or Monte Carlo intervals; and above all that mediation is a causal claim. Even when X is randomised, the mediator is not, so mediator-outcome confounding can create or hide an indirect effect. Cross-sectional data cannot establish that M comes before Y. Modern practice uses the counterfactual definitions (natural direct and indirect effects), allows an X by M interaction, and reports a sensitivity analysis for unmeasured confounding.
</context>

<task>
Plan or interpret a mediation analysis for this question.

<question>
{{question}}
</question>

<data>
{{data}}
</data>

1. Draw the causal diagram in text: X → M → Y, X → Y, and the confounders of each path (X-M, X-Y, and especially M-Y). Ask whether any variable affected by X also confounds M and Y, because that breaks standard methods.
2. State the assumptions plainly: no unmeasured confounding of each path, correct temporal order (X before M before Y), no measurement error in M that matters, and a correctly specified model. Say which the design supports and which are hopes. Flag cross-sectional data as unable to establish order.
3. Plan the models: a mediator model (M on X and confounders) and an outcome model (Y on X, M, confounders and, by default, the X × M interaction). Choose link functions for the variable types. Estimate natural direct and indirect effects (or the product of coefficients when linear with no interaction) with bootstrap percentile intervals (5,000 or more resamples) or quasi-Bayesian intervals.
4. If output was pasted, interpret it: the indirect effect, direct effect, total effect and proportion mediated (only meaningful when effects share a sign and the total is clearly non-zero), each with an interval, in the units of Y.
5. Plan a sensitivity analysis: how strong mediator-outcome confounding would have to be to remove the indirect effect (for example the sensitivity parameter rho in the R mediation package, or an E-value style bound).
6. Give code in R (mediation package, or lavaan for latent variables) or Python (statsmodels Mediation) matching the user's tool.
7. Draft wording that keeps the claim as strong as the design allows.
</task>

<constraints>
- Do not describe an indirect effect as proven mechanism when the mediator was not manipulated and confounders are unmeasured; say "consistent with".
- Do not use the Sobel test or the causal-steps approach as the primary inference.
- Do not report proportion mediated when direct and indirect effects have opposite signs or the total effect is near zero.
- If the data are cross-sectional, say that the direction between M and Y cannot be established and suggest a longitudinal or experimental design.
- Use only numbers given or computed from pasted output; do not invent estimates.
</constraints>

<output_format>
## Causal diagram
A text diagram and the confounders per path.

## Assumptions
Table: Assumption | Supported by design? | Risk if wrong.

## Model plan
The mediator and outcome models, estimands and interval method.

## Results or expected output
Interpretation of pasted output, or the table the analysis will produce.

## Sensitivity
The plan and how to read it.

## Code
One code block.

## How to report
Two or three sentences of wording.
</output_format>
