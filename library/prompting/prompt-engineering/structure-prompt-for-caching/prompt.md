---
schema: 1
id: structure-prompt-for-caching
kind: prompt
title: Structure a prompt for prompt caching
description: Reorders a long prompt into a stable prefix and a variable tail so provider prompt caching hits, lists the code changes, and estimates the cost and latency saving from your traffic.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, ml-engineer, backend-engineer, tech-lead]
requires: [none]
inputs: [text, file]
output: [prompt, report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [prompt-caching, llm-cost, latency, llm-api, prompt-layout]
pairs_with:
  prompts: [compress-prompt, choose-sampling-settings, reduce-llm-costs]
args:
  - name: prompt
    description: The full prompt as your code assembles it (tool definitions, system prompt, documents, examples, history, user message), marking which parts change per request, per user or per day.
    type: text
    required: true
  - name: traffic
    description: Optional - provider and model, requests per hour, typical prompt and output size in tokens, and the input, cached-input and output prices you pay.
    type: text
output_contract:
  format: markdown
  sections: [What changes per request, Cache-friendly layout, Code changes, Savings estimate, How to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Provider prompt caching reuses work for the start of a prompt that is identical to a recent request. It only matches an exact prefix: one changed character early in the prompt, such as today's date, the user's name, a request id or tools listed in a different order, means nothing after it is reused. So the layout is: everything stable first (tool definitions, system instructions, reference documents, examples), then things that change slowly (per-user context), then the conversation, then the latest message. Serialisation must be deterministic: the same key order in JSON, the same whitespace, the same example order. Caches expire after a short idle time, so low-traffic endpoints get few hits, and there is usually a minimum prefix length before caching applies. Some providers cache automatically, others need explicit cache markers, and cache writes can cost more than normal input. The response usually reports how many input tokens were served from cache, which is how you confirm it works.

<prompt_under_test>
{{prompt}}
</prompt_under_test>
{{#traffic}}
Traffic and prices: {{traffic}}
{{/traffic}}
</context>

<task>
1. Label each part of the prompt as static, slow-changing (per user, per day, per deployment) or per-request, and find anything that breaks the prefix early: timestamps, ids, user names, randomised or reordered examples, unstable tool or key order.
2. Propose the new order with the stable prefix first, and show it as an outline with approximate token counts per part.
3. Move volatile details out of the prefix: put the date or user details in the user turn or a late context block, and rewrite any instruction that refers to them so it still reads correctly.
4. List the code changes: deterministic serialisation, fixed tool and example order, where cache markers go if the provider needs them, and logging the cached-token field from responses.
5. Estimate savings if traffic and prices are given: expected hit rate given request rate and cache lifetime, cached tokens per request, and saving per request = hit rate x cached tokens x (input price - cached input price) per token, minus any cache-write premium on misses; note latency gains for long prefixes. Show the arithmetic. If prices are missing, give the formula with placeholders.
6. Say how to confirm: send two identical requests a few seconds apart and check the cached-token count on the second, then monitor the hit rate in production.
</task>

<constraints>
- Do not state a provider's prices, minimum lengths, cache lifetimes or parameter names as fact unless the user gave them; mark them "check current docs".
- Do not change the meaning of the prompt; reordering must keep instructions correct and examples intact.
- If the prompt is short or traffic too low for caching to matter, say so and stop at a short recommendation.
</constraints>

<output_format>
## What changes per request
Table: Part | Static, slow or per-request | Approx tokens | Breaks prefix?
## Cache-friendly layout
Outline in order, then the reordered prompt in a fenced block if it fits.
## Code changes
Numbered.
## Savings estimate
Arithmetic shown, with assumptions.
## How to confirm
Numbered steps.
</output_format>
