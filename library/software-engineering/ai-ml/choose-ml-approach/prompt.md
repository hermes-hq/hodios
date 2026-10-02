---
schema: 1
id: choose-ml-approach
kind: prompt
title: Choose between rules, ML and an LLM
description: Recommends rules, classical ML, a hosted LLM or a fine-tuned model for a problem, comparing accuracy, cost, latency and maintenance with the reasoning shown. Use before committing to an approach.
category: ai-ml
version: 1.0.0
status: experimental
stage: [design, plan]
role: [ml-engineer, software-engineer, tech-lead, product-manager]
requires: [none]
inputs: [spec, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [build-vs-buy, trade-offs, cost-modelling, baseline]
pairs_with:
  prompts: [plan-fine-tuning, plan-ml-experiment]
  personas: [ml-engineer]
args:
  - name: problem
    description: The input, the output you need, who or what consumes it, and what happens when it is wrong.
    type: text
    required: true
  - name: data_available
    description: Labelled examples, historical records or none; how many and how reliable.
    type: text
  - name: constraints
    description: Request volume, latency budget, cost ceiling, hosting or privacy rules, explainability needs and team skills.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Problem as stated, Comparison, Validation experiment, Switch triggers, Assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Two defaults waste the most money. Sending every request to a large LLM is slow and costly at volume, and hard to test when the logic is really a dozen rules. Training a custom model when there are fifty examples and the requirements change monthly wastes weeks. The right choice depends on a few facts: whether the logic can be written down, how variable the input is, how much labelled data exists, the cost of an error, volume and latency, explainability requirements, how often the task changes, and who will maintain the result. Hybrids are often best: rules for the clear cases with a model for the rest, or an LLM to label data that then trains a small, cheap model.
</context>

<task>
Recommend an approach for:
{{problem}}
{{#data_available}}

Data available: {{data_available}}
{{/data_available}}
{{#constraints}}

Constraints: {{constraints}}
{{/constraints}}

1. Restate the problem as input, output, volume, latency budget and cost of an error. If volume, latency or labelled data is missing and could flip the recommendation, ask for it. Otherwise state an assumption and continue.
2. Evaluate each option against this problem, not in general:
   - rules or heuristics (including regular expressions, lookups and templates);
   - classical ML (logistic regression, gradient-boosted trees, small text classifiers) on engineered features;
   - a hosted LLM with prompting, few-shot examples and structured output;
   - a fine-tuned or distilled model;
   - the hybrids that fit.
3. For each option, reason about the accuracy you can expect and why, cost per thousand requests as a formula or order of magnitude with stated assumptions, latency, the data required, maintenance work, failure modes and explainability.
4. Recommend one approach, give the cheapest experiment that would confirm it within days, and name the observations that should make the team switch.
</task>

<constraints>
- Show the reasoning that connects each fact about the problem to the recommendation.
- Do not invent accuracy figures. Give expectations as ranges to verify, and say what they rest on.
- Never recommend fine-tuning before a prompted baseline has been measured, or an LLM where a lookup table would do.
- Prefer the option the team can run and debug, all else being equal.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
One paragraph: the approach and the two or three facts that decide it.

## Problem as stated
Input, output, volume, latency, cost of an error, with assumptions marked.

## Comparison
Table: option | expected accuracy | cost per 1,000 | latency | data needed | maintenance | main failure mode.

## Validation experiment
The smallest test that would confirm the choice, and its pass bar.

## Switch triggers
What would make you change approach, and to what.

## Assumptions
Every number or fact you supplied yourself.
</output_format>
