---
schema: 1
id: build-causal-diagram
kind: prompt
title: Build a causal diagram
description: Builds a causal diagram (DAG) for an exposure and outcome, then uses it to choose a minimal adjustment set and to name colliders and mediators that must not be adjusted for.
category: research-methods
version: 1.0.0
status: incubating
stage: [design]
role: [researcher, data-scientist, student]
requires: [none]
inputs: [text]
output: [diagram, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [dag, causal-inference, confounding, collider-bias, adjustment-set, epidemiology]
pairs_with:
  prompts: [design-quasi-experimental-study, estimate-causal-effect, plan-secondary-data-analysis, run-mediation-analysis]
  personas: [research-methodologist]
args:
  - name: question
    description: The exposure, the outcome, the population, and the variables you have or are thinking of adjusting for, plus anything you know about how they relate.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Causal question, Diagram, Paths, Adjustment set, Do not adjust for, Assumptions to defend]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Adjust for everything available" is a common and harmful habit. A directed acyclic graph makes the causal assumptions explicit so adjustment can be chosen by reasoning rather than by p-values or by what is in the dataset. Confounders (common causes of exposure and outcome) open backdoor paths that must be blocked; mediators lie on the causal path and adjusting for them removes part of the effect being estimated; colliders (common effects) are closed paths that adjustment or selection opens, creating bias, as in selecting a sample by hospital admission; descendants of the outcome and of mediators behave similarly. The backdoor criterion gives the sets that suffice, and there is often more than one; choosing among them depends on which variables are measured well. The diagram is only as good as the subject-matter knowledge behind each arrow, and the absence of an arrow is the stronger assumption.
</context>

<task>
Build a causal diagram for:
<question>
{{question}}
</question>

1. State the causal question precisely: exposure, outcome, population, time ordering, and the effect of interest (total or direct).
2. List candidate variables, including important unmeasured ones, and place each in time relative to exposure and outcome.
3. Draw the DAG as a list of directed edges, and also in DAGitty-style text syntax the user can paste into a DAG tool, with a one-line justification for each arrow and for key missing arrows.
4. Enumerate the paths from exposure to outcome and classify each as causal or backdoor, open or closed.
5. Derive a minimal sufficient adjustment set (and alternatives if more than one), noting which require unmeasured variables.
6. List variables that must not be adjusted for, with the reason: mediator, collider, descendant of outcome, or instrument-like variable that only adds variance or bias.
7. Flag selection into the sample as a possible collider, unmeasured confounding that remains, and sensitivity analyses to plan (for example E-values or negative control outcomes).
</task>

<constraints>
- Every arrow must have a stated reason; mark contested ones as assumptions for the user to defend from subject knowledge.
- Do not choose adjustment by statistical significance or change-in-estimate rules.
- If the exposure-outcome timing is unclear or reverse causation is likely, say so before drawing.
- Do not claim the adjustment set removes bias if key confounders are unmeasured.
</constraints>

<output_format>
## Causal question
Exposure, outcome, population, timing and estimand.
## Diagram
Edge list with justifications, and the DAG in a code block in DAGitty-style syntax.
## Paths
A table: path | type | open or closed.
## Adjustment set
The minimal set(s) and which are measurable.
## Do not adjust for
A table: variable | role | why.
## Assumptions to defend
Bullets, plus sensitivity analyses.
</output_format>
