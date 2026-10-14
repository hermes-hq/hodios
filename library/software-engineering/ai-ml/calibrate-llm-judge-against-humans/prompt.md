---
schema: 1
id: calibrate-llm-judge-against-humans
kind: prompt
title: Calibrate an LLM judge against human labels
description: Measures how well an LLM-as-judge agrees with human labels, finds its biases (length, position, self-preference, leniency), revises it and re-measures on a held-out set.
category: ai-ml
version: 1.0.0
status: incubating
stage: [verify]
role: [ml-engineer, data-scientist, researcher, software-engineer]
stack: [llm-apps]
requires: [none]
inputs: [dataset, text]
output: [report, prompt, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [llm-as-judge, inter-rater-agreement, eval-reliability, cohens-kappa]
pairs_with:
  prompts: [write-judge-prompt, grade-response-with-rubric, judge-pairwise-responses, write-llm-eval-suite]
args:
  - name: judge_prompt
    description: The current judge prompt and the model it runs on.
    type: text
    required: true
  - name: labelled_results
    description: Items with the human label and the judge's label (and score or rationale if available), ideally 100 or more, plus who labelled them and how.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Agreement, Disagreement analysis, Biases found, Revised judge, Validation plan, Verdict]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An LLM judge is a measuring instrument, and an uncalibrated one gives confident numbers that mean little. Raw percent agreement hides problems when classes are imbalanced: a judge that passes everything agrees 90% of the time if 90% of items are good. What matters is agreement beyond chance (Cohen's kappa for two raters, or the true-positive and true-negative rates on the failure class you care about) and where the disagreements cluster. Known judge biases: preferring longer answers, preferring the first option in pairwise comparison, favouring outputs from its own model family, leniency on vague criteria, and being swayed by confident tone. Revising the judge on the same items you measure on overfits; keep a held-out split. The human labels themselves can be inconsistent, so check human-human agreement where possible.
</context>

<task>
Calibrate this judge.

Judge prompt:
{{judge_prompt}}

Labelled results:
{{labelled_results}}

1. Compute agreement: confusion matrix, percent agreement, Cohen's kappa (or weighted kappa for ordinal scores), and the judge's true-positive and true-negative rates on the failure class. Show the arithmetic. If there are fewer than about 50 items, say the estimates are rough.
2. Split the items into a development set and a held-out test set (for example 60/40, stratified by label) if this was not done, and report which numbers come from which.
3. Read every disagreement in the development set and code why the judge differed: criterion unclear, judge too lenient, too strict, misread the input, length or tone effect, position effect (pairwise), or human label looks wrong.
4. Test for biases with the data available: agreement by output length bucket, by position in pairwise items, by which model produced the output. Say which tests the data cannot support.
5. Revise the judge prompt to address the coded causes: binary or narrow-scale criteria, definitions with pass and fail examples from the development set, a rationale before the verdict, and instructions that neutralise length and position. Suggest swapping positions and averaging for pairwise judging.
6. Give the validation plan: run the revised judge on the held-out set, the agreement target that would make it trustworthy for this use, and how often to re-check as the product changes.
7. Verdict: trust the judge for this purpose, trust it only with human spot checks, or do not use it.
</task>

<constraints>
- Do not report agreement numbers you did not compute from the given labels. If you cannot compute them reliably in your head, show the formula and the counts and say the user should run it.
- Do not tune the judge on the held-out items.
- Flag human labels that look wrong instead of silently treating them as truth.
{{> output/uncertainty}}
</constraints>

<output_format>
## Agreement
Confusion matrix, metrics and arithmetic, split by development and held-out.
## Disagreement analysis
Table: item id | human | judge | coded reason.
## Biases found
Each bias tested, the evidence, and the tests the data could not support.
## Revised judge
The full revised judge prompt.
## Validation plan
Held-out run, target agreement and re-check cadence.
## Verdict
One paragraph.
</output_format>
