---
schema: 1
id: choose-llm-for-feature
kind: prompt
title: Choose a model for an LLM feature
description: Chooses a model tier for an LLM feature with a small task-specific eval of quality, latency and cost, plus a decision rule. Use when picking or switching models instead of trusting leaderboards.
category: ai-ml
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [ml-engineer, backend-engineer, tech-lead, product-manager]
stack: [llm-apps]
requires: [none]
inputs: [text, spec, dataset]
output: [plan, code, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [model-selection, llm-evals, latency, inference-cost]
pairs_with:
  prompts: [write-llm-eval-suite, reduce-llm-costs]
args:
  - name: feature
    description: The feature - what the model receives and must return, how output is used, example inputs, and what a good and a bad answer look like.
    type: text
    required: true
  - name: constraints
    description: Limits - latency budget (time to first token or total), monthly volume and budget, data residency or self-hosting needs, allowed providers, and the candidate models you are considering.
    type: text
output_contract:
  format: markdown
  sections: [Success criteria, Eval set, Grading, Candidates, Harness, Results template, Decision rule, Re-evaluate when]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Public benchmarks measure someone else's task. The right model for a feature is usually the cheapest and fastest one that clears a quality bar on that feature's own inputs, and the only way to know is a small eval: a few dozen representative cases, a grading method you trust, the same cases run through two or three candidates from different tiers, and a decision rule written down before looking at results. Common mistakes: grading by reading a handful of outputs, judging with an LLM rubric never checked against human labels, comparing models with prompts tuned for only one of them, quoting prices from memory, and measuring average latency when users feel the slow tail.
</context>

<task>
Help choose a model for:
<feature>
{{feature}}
</feature>
{{#constraints}}
Constraints:
{{constraints}}
{{/constraints}}

1. Write success criteria: the quality bar (for example "at least 95% of extractions exactly correct" or "rubric score of 4 or more on 90% of cases"), a latency budget at p95, and a cost ceiling per 1,000 requests or per month. If the feature description gives no basis for a bar, ask and stop.
2. Design the eval set: 30 to 100 cases drawn from real or realistic inputs, including the easy majority, known hard cases, edge cases (long, empty, adversarial, other languages if relevant) and cases where the right answer is to decline. Say how to collect them and how to keep them out of any prompt examples.
3. Choose grading: programmatic checks wherever the output has a right answer (exact match, schema validity, field accuracy, unit tests); an LLM judge with a written rubric only for open-ended quality, calibrated by comparing it with human labels on 20 or more cases.
4. Pick candidates: two or three, spanning small, mid and frontier tiers, filtered by the constraints (provider, residency, self-hosting). Use the user's candidates if given. Do not quote prices or context limits from memory; leave cells for the user to fill from current pricing pages.
5. Write a minimal harness in the user's language (Python if unstated): load cases, call each candidate with the same prompt and settings (light per-model adjustments documented), record output, input and output tokens, time to first token and total latency, run the graders, and write a results table. Run each case more than once if the outputs vary.
6. State the decision rule before results exist: the cheapest candidate that meets the quality bar and the p95 latency budget wins; ties go to the faster one. Consider routing (a small model first, escalating hard cases) only if the eval shows a clean split.
</task>

<constraints>
- Do not recommend a specific model before results exist; recommend the experiment and the rule.
- Never send personal or confidential data to a provider the constraints exclude; say how to anonymise eval cases if needed.
- Keep the harness small and dependency-light; no evaluation framework unless the user already uses one.
{{> output/uncertainty}}
</constraints>

<output_format>
## Success criteria
Bullets: quality bar, latency budget, cost ceiling.
## Eval set
Table: case type, count, source, example.
## Grading
How each case type is scored, and how the judge is calibrated if one is used.
## Candidates
Table: candidate, tier, why included, price per million input and output tokens (to fill in).
## Harness
Code block with file path.
## Results template
Table: candidate, quality score, pass rate, p50 and p95 latency, cost per 1,000 requests.
## Decision rule
One or two sentences.
## Re-evaluate when
Bullets: new model versions, price changes, prompt changes, drift in inputs.
</output_format>
