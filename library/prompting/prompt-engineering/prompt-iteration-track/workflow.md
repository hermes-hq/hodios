---
schema: 1
id: prompt-iteration-track
kind: workflow
title: Prompt iteration track
description: Improves a prompt in gated steps - define success, build test cases, run and grade, diagnose failures, revise, then compare versions on the same cases before adopting the change.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [plan, design, verify, review, build]
requires: [none]
inputs: [text]
output: [plan, tests, prompt, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [evals, prompt-design, regression-check, iteration, golden-set]
pairs_with:
  prompts: [build-prompt-test-set, write-judge-prompt, diagnose-prompt-failures, improve-prompt]
  personas: [prompt-engineer]
args:
  - name: prompt_or_task
    description: The current prompt to improve (with placeholders), or a description of the task if there is no prompt yet, plus who uses it and what goes wrong today.
    type: text
    required: true
  - name: sample_inputs
    description: "Optional: real inputs the prompt receives, and outputs you judged good or bad. Remove personal data first."
    type: text
steps:
  - {id: success, file: steps/01-success.md, stage: plan, gate: approve}
  - {id: cases, file: steps/02-cases.md, stage: design, gate: approve}
  - {id: run, file: steps/03-run.md, stage: verify, gate: approve}
  - {id: diagnose, file: steps/04-diagnose.md, stage: review, gate: approve}
  - {id: revise, file: steps/05-revise.md, stage: build, gate: approve}
  - {id: compare, file: steps/06-compare.md, stage: verify, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Improves a prompt the way a careful prompt engineer does: decide what success means, fix a test set, measure, diagnose, change one thing at a time, and adopt the new version only if it wins on the same cases without breaking others.

<prompt_or_task>
{{prompt_or_task}}
</prompt_or_task>
{{#sample_inputs}}
<sample_inputs>
{{sample_inputs}}
</sample_inputs>
{{/sample_inputs}}

Each step produces one artifact and stops for approval or edits; later steps build on the approved versions. Keep every version of the prompt labelled (v1, v2…) and never edit a test case after seeing results, except to fix a case that was itself wrong, which you must say. Outputs are graded by running the prompt in the tool the person actually uses: either the person runs each case there and pastes the outputs, or, if they ask, you run the cases yourself in this conversation and say clearly that your own outputs may differ from the target tool's. Never report a result you did not see. If the person asks to skip the approvals, confirm once that later steps will build on unreviewed choices; if they agree, continue without stopping and state the choice made at each skipped gate.
