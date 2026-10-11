---
schema: 1
id: define-ai-feature-metrics
kind: prompt
title: Define AI feature metrics
description: Defines product metrics for an AI or LLM feature - task success, acceptance and edit rates, retries, fallbacks to manual, sampled quality, harm signals and cost per successful task - with guardrails.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, ml-engineer, data-analyst, founder]
requires: [none]
inputs: [text, spec]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ai-features, llm-product, acceptance-rate, quality-sampling, cost-per-task, human-review]
pairs_with:
  prompts: [define-feature-success-metrics, define-guardrail-metrics, write-tracking-plan]
args:
  - name: feature
    description: What the AI feature does, where it appears, who uses it, what the user does with the output (accept, edit, copy, send, ignore) and what happens when it is wrong.
    type: text
    required: true
  - name: goal
    description: The outcome the feature is meant to improve (time saved, tickets resolved, conversion) and any current baseline.
    type: text
    required: true
  - name: constraints
    description: Optional. Budget per request or per month, privacy limits on logging content, regulated domain notes, and review capacity.
    type: text
output_contract:
  format: markdown
  sections: [Outcome metric, Behaviour signals, Quality measurement, Harm and risk signals, Cost, Guardrails and decision rules, Instrumentation and privacy, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You define how a product team will know whether an AI feature is working. Usual metrics mislead here: clicks on a sparkle button measure curiosity, thumbs-up rates come from a tiny self-selected minority, and an offline eval score says little about whether users' tasks got done. Good measurement layers four kinds of evidence. Behaviour: what users do with the output (accepted as is, edited heavily, regenerated, abandoned, did the task manually instead). Quality: a small, regular, blinded human review of sampled outputs against a rubric, because behaviour can hide confident wrong answers users did not catch. Harm: rare but severe failures (unsafe, private, biased or legally risky output) tracked separately, not averaged away. Cost: spend per successful task, not per request, since retries and failures cost too.

{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
<feature>
{{feature}}
</feature>

<goal>
{{goal}}
</goal>

1. Outcome metric: the one metric tied to the goal (for example median time to complete the task, resolution rate), with baseline and how to compare AI-assisted against non-assisted work fairly (holdout or randomised rollout).
2. Behaviour signals: three to six signals with exact definitions, such as acceptance rate (output used with less than a set edit distance), heavy-edit rate, regenerate rate, abandonment, manual fallback rate, repeat use. Say what each can and cannot tell you.
3. Quality measurement: a sampling plan (how many outputs per week, stratified by use case), a short rubric with 3-5 criteria, who reviews, blinding, and how to check reviewer agreement.
4. Harm and risk signals: the severe failure types for this feature, how each is detected (reports, classifiers, review), a zero-tolerance or threshold rule, and an escalation owner.
5. Cost: cost per successful task, including retries and failed calls, with the formula.
6. Guardrails and decision rules: thresholds that pause or roll back the feature, and what result would justify expanding it.
7. Instrumentation and privacy: events and fields to log, what content is stored, for how long and with what consent; prefer logging metadata over raw content where possible.
</task>

<constraints>
- Do not treat thumbs-up rates or offline benchmark scores as the success metric.
- Do not invent baselines, costs or thresholds; mark proposed thresholds as starting points to calibrate.
- Respect the given privacy limits; if none are given, assume user content is sensitive and recommend minimal logging.
- If the feature or goal is too vague to define a task, ask and stop.
</constraints>

<output_format>
## Outcome metric
Definition, baseline, comparison method.

## Behaviour signals
Table: signal | definition | tells you | does not tell you.

## Quality measurement
Sampling plan, rubric table, reviewer process.

## Harm and risk signals
Table: failure type | detection | rule | owner.

## Cost
Formula and inputs needed.

## Guardrails and decision rules
Bullets: pause, roll back, expand.

## Instrumentation and privacy
Events, fields, retention, consent.

## Questions
What to confirm.
</output_format>
