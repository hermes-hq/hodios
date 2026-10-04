---
schema: 1
id: choose-model-tier-for-task
kind: prompt
title: Choose a model tier for a task
description: "Recommends a model size tier and reasoning setting for a task from its difficulty, volume, latency, cost and risk, without naming specific models, and designs a quick comparison to confirm the choice."
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [plan, design]
role: [individual, ml-engineer]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [model-selection, cost-latency, reasoning-effort, llm-ops, cascading]
pairs_with:
  prompts: [adapt-prompt-for-small-model, adapt-prompt-for-reasoning-model, build-prompt-test-set, write-judge-prompt]
args:
  - name: task
    description: "What the model has to do, with a typical input and the output you need, for example 'tag 40-word support tickets with one of 12 categories' or 'review pull requests for security issues'."
    type: text
    required: true
  - name: volume
    description: "Roughly how often it runs, for example 'a few times a day by hand', '5,000 documents a month' or 'every user message in a busy app'."
    type: string
    default: low
  - name: constraints
    description: "Optional: latency limits, budget, privacy or hosting limits (for example 'must run on our own servers'), and how costly a wrong answer is."
    type: text
output_contract:
  format: markdown
  sections: [Task profile, Recommendation, Why not the other tiers, Cost and latency shape, Comparison plan, Decision rule]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams often default to the largest model for everything, paying in cost and latency for work a smaller model does as well, or pick the cheapest and accept errors that cost more than they saved. Model names and prices change every few months, so the durable decision is about tiers: small models (fast and cheap, good at classification, extraction against a clear schema, routing and short rewrites), mid-size models (most writing, summarising, question answering over provided documents and everyday code), and frontier models (multi-step reasoning, ambiguous or novel problems, long agentic tasks, subtle judgement and high-stakes output). Reasoning or extended-thinking settings add a second dial: they help on problems that need planning or checking and waste time on lookups and formatting. The only reliable answer comes from running the same inputs through two adjacent options.

<task_description>
{{task}}
</task_description>
Volume: {{volume}}
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. If the task is too vague to profile (no idea of the input or the output), ask up to two questions and stop.
2. Profile the task on: reasoning depth, ambiguity, knowledge needed beyond the input, input length, output length and format strictness, tool use or number of steps, cost of an error, latency need, and volume.
3. Recommend a tier (small, mid or frontier) and a reasoning setting (off, optional or recommended), with your confidence and the two or three factors that decided it.
4. Consider whether a split beats a single choice: a cascade (smaller tier first, escalate to a larger one when confidence is low or a check fails), a pipeline (small tier for extraction or routing, larger tier for synthesis), or batching for non-urgent volume. Recommend one only if it fits.
5. Explain the cost and latency shape in relative terms: how cost scales with volume and output length, and where latency comes from (output length, reasoning, tool calls).
6. Design a comparison to confirm: a set of representative inputs including hard and edge cases, the two adjacent options to compare (for example mid with reasoning off versus frontier, or small versus mid), the checks to score each output, and the measurements to record (pass rate, latency, cost per run).
7. Write a decision rule in advance, for example: choose the cheaper option if it passes nearly as many cases as the larger one and fails none of the high-risk cases.
</task>

<constraints>
- Name tiers only, never specific models, vendors or prices; tell the user to check current pricing and limits for the models available to them.
- Do not overstate certainty: tier boundaries move as models improve, so the comparison is the real decision.
- When errors could harm people (health, legal, financial, safety), recommend human review regardless of tier.
- If a constraint rules out a tier (for example on-premises hosting limits the size available), say so and adjust.
</constraints>

<output_format>
## Task profile
Table: Factor | Rating (low, medium, high) | Note.
## Recommendation
Tier, reasoning setting, confidence, deciding factors; any cascade or pipeline.
## Why not the other tiers
One line each.
## Cost and latency shape
Three to five bullets.
## Comparison plan
Number of inputs and mix, options compared, checks, measurements.
## Decision rule
One or two sentences, written before running.
</output_format>
