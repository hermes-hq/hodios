---
schema: 1
id: analyze-ai-feature-feedback
kind: prompt
title: Analyse feedback on an AI feature
description: Analyses thumbs-down ratings, comments, edits and regenerations on an AI feature's outputs into failure modes with frequency, root causes, fixes and new eval cases.
category: user-feedback
version: 1.0.0
status: incubating
stage: [verify, operate]
role: [product-manager, ml-engineer, data-scientist]
requires: [none]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [ai-product, llm-quality, thumbs-down, failure-modes, eval-cases]
pairs_with:
  prompts: [define-ai-feature-metrics, write-ai-feature-requirements, build-llm-feedback-loop]
args:
  - name: feature
    description: What the AI feature does, who uses it, what inputs it takes, and what a good output looks like.
    type: text
    required: true
  - name: feedback_data
    description: Ratings, thumbs-down reasons and comments, and where available the user input, the output, edits made and regeneration or abandon signals, with counts.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Data and limits, Failure modes, By use case, Root causes, Fixes, Eval cases to add, Metrics to watch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You analyse user feedback on AI-generated outputs. Explicit ratings are sparse and skewed: most users never click thumbs up or down, and those who do are often reacting to the worst cases. Implicit signals are far more plentiful: regenerating, heavy editing, copying the output, or abandoning the result. A thumbs-down comment only makes sense read alongside the input and the output; "wrong" can mean a factual error, an ignored instruction, a missing piece of context the system never retrieved, a format problem, or a correct answer the user did not expect. Failure modes also split by cause: model behaviour, prompt or system design, retrieval or data, and UX or expectation setting. The useful outcome is a ranked list of failure modes with frequency, examples, likely cause and a fix, plus eval cases so the fix can be measured.

Feature:

<feature>
{{feature}}
</feature>

Feedback data:

<feedback_data>
{{feedback_data}}
</feedback_data>
</context>

<task>
1. Describe the data and its limits: volumes, rating response rate if known, which implicit signals exist, and the biases (who rates, which outputs get rated, missing input or output context).
2. Build a failure mode taxonomy from the data: for example factual error, ignored instruction, missing context or retrieval failure, wrong format or length, tone, over-refusal or unsafe output, latency, and expectation mismatch. Define each in one line, count it, and give one or two short examples with input, output and comment where available.
3. Break failure modes down by use case, input type or user segment where the data allows, and point out concentrated problems.
4. For the top failure modes, name the likely root cause (model, prompt or instructions, retrieval or data, UX or expectations) with the evidence, and what would confirm it.
5. Propose fixes per failure mode, ordered by impact and effort, including UX changes such as showing sources, clarifying scope or offering an edit path, not only model changes.
6. Write eval cases to add: for each top failure mode, two or three test inputs with what a passing output must do, drawn from the real examples with personal data removed.
7. List metrics to watch after fixes: rate of the failure mode, regeneration and edit rates, thumbs-down rate per thousand outputs, and task completion, with the caveat that rating rates shift with UI changes.
</task>

<constraints>
- Use only the examples and counts given; do not invent outputs or numbers.
- Remove or mask personal data in any example you reproduce.
- Do not claim a fix works without an eval or test showing it.
- Do not treat thumbs-down rate alone as a quality measure.
</constraints>

<output_format>
## Data and limits
Bullets.

## Failure modes
A table: failure mode | definition | count | example.

## By use case
Bullets or a table.

## Root causes
Bullets per top failure mode.

## Fixes
A table: failure mode | fix | type | effort | expected impact.

## Eval cases to add
A table: failure mode | test input | pass criteria.

## Metrics to watch
Bullets.
</output_format>
