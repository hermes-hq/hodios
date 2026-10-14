---
schema: 1
id: estimate-llm-feature-cost
kind: prompt
title: Estimate the cost of an LLM feature
description: Estimates the monthly token cost of a planned LLM feature from traffic, prompt sizes, calls per action, caching and model choice, with the arithmetic shown and a sensitivity table.
category: ai-ml
version: 1.0.0
status: incubating
stage: [plan, design]
role: [ml-engineer, engineering-manager, product-manager, backend-engineer]
stack: [llm-apps]
requires: [none]
inputs: [spec, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [token-costs, cost-model, forecasting-costs, budgeting-ai]
pairs_with:
  prompts: [reduce-llm-costs, choose-llm-for-feature]
args:
  - name: feature
    description: What the feature does and how one user action turns into model calls (retrieval, tool calls, retries, follow-ups), with rough sizes of the system prompt, context and expected output.
    type: text
    required: true
  - name: traffic
    description: Expected users and actions per user per day or month, with a low and high guess if unsure, and growth expectations.
    type: text
    required: true
  - name: prices
    description: The current per-million-token prices for the candidate models (input, cached input, output, batch discount), copied from the provider's pricing page.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Cost per action, Monthly estimate, Sensitivity, Cost levers, What to measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cost estimates for LLM features are usually wrong by multiples, and almost always low, because they price one model call with a short prompt. Real requests carry a system prompt, tool definitions, retrieved chunks and growing chat history on every call; agents make several calls per user action; output tokens cost several times more than input tokens; retries, evals, embeddings and moderation add calls; and a few heavy users dominate usage. Prompt caching and batch discounts can cut cost a lot, but only for the stable prefix and only for traffic that fits their rules. A useful estimate shows the arithmetic, separates per-action cost from volume, and shows which assumption moves the total most.
</context>

<task>
Estimate the cost of this feature: {{feature}}

Traffic: {{traffic}}
{{#prices}}
Prices: {{prices}}
{{/prices}}

1. List every assumption as a numbered line with its value and source (given, derived, or guessed), including tokens per part of the prompt, calls per action, output length, retry rate, cache hit rate and growth of chat history over a session.
2. Compute the cost of one user action: for each call, input tokens (split into cacheable prefix and variable part) times the input or cached price, plus output tokens times the output price. Add embeddings, moderation or reranking calls if the feature uses them. Show the formula and the numbers.
3. Compute monthly cost for low, expected and high traffic, and separately for a heavy-user segment if usage is likely skewed.
4. Sensitivity: vary the five assumptions with the largest effect (for example output length, calls per action, context size, cache hit rate, model choice) one at a time and show the effect on the monthly total.
5. List cost levers with the estimated saving from the model: smaller model for some calls, caching the stable prefix, batching non-interactive work, trimming context, output limits. Mark which need a quality check before use.
6. Say what to measure in a pilot to replace the guessed assumptions with real numbers.
</task>

<constraints>
- If prices were not given, do not quote any from memory: use symbols (P_in, P_cached, P_out) in every formula, and say to fill them from the provider's current pricing page.
- Label every guessed number as a guess. Round the final figures; do not imply precision the inputs do not have.
- Include hidden calls (retries, evals, embeddings, moderation) or state that they are excluded.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Numbered list: assumption | value | source.
## Cost per action
The formula and a table per call: input tokens | cached tokens | output tokens | cost.
## Monthly estimate
Table: scenario | actions per month | cost per month.
## Sensitivity
Table: assumption | low value | high value | monthly cost at each.
## Cost levers
Ranked list with estimated saving and whether a quality check is needed.
## What to measure
The pilot metrics that would firm up the estimate.
</output_format>
