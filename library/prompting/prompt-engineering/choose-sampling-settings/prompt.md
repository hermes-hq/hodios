---
schema: 1
id: choose-sampling-settings
kind: prompt
title: Choose temperature and other generation settings
description: Picks temperature, top-p, maximum output length, stop sequences and seed for an API task, explains each choice and gives a quick repeat-run test for consistency versus variety.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, ml-engineer, data-scientist, individual]
requires: [none]
inputs: [text, config]
output: [config, table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [temperature, sampling-parameters, llm-api, output-consistency, max-tokens]
pairs_with:
  prompts: [choose-model-tier-for-task, run-prompt-regression-tests, write-structured-output-prompt]
args:
  - name: task
    description: What the model does in your app, for example "extract invoice fields to JSON", "write five ad headline variants", "answer support questions".
    type: text
    required: true
  - name: setup
    description: Optional - the provider and model, the settings you use now, and whether it is a reasoning model.
    type: text
  - name: problem
    description: Optional - what goes wrong now, for example "answers vary between runs", "outputs all sound the same", "responses get cut off".
    type: text
output_contract:
  format: markdown
  sections: [Recommended settings, Why, Quick test, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Generation settings are often copied from a tutorial and never revisited. What practitioners know: temperature trades consistency for variety, so extraction, classification, code and grading want it low, while brainstorming and creative variants want it higher. Change temperature or top-p, not both, because they interact. Low temperature reduces variation but does not stop made-up facts, and does not make output fully repeatable; a seed, where offered, is best-effort only. Maximum output tokens is a ceiling, not a length control: a low value truncates answers mid-sentence, so check the finish reason and control length in the prompt. Stop sequences end output at a marker. Frequency and presence penalties help with repetition in long creative text but can damage structured output. Many reasoning models fix or ignore sampling settings and expose a reasoning effort setting instead. Defaults and allowed ranges differ by provider and change over time.

<task_description>
{{task}}
</task_description>
{{#setup}}
Setup: {{setup}}
{{/setup}}
{{#problem}}
Problem: {{problem}}
{{/problem}}
</context>

<task>
1. Classify the task by what it needs: one correct answer, consistent format, controlled variety, or open creativity. If it mixes these (for example creative text inside strict JSON), say so; splitting into two calls may help.
2. Recommend settings: temperature (or top-p, not both), maximum output tokens with headroom over the longest expected answer, stop sequences if useful, seed if repeatability matters and the provider offers it, penalties only if repetition is a problem. Give values as a starting range, not a magic number.
3. If the model is a reasoning model, say which settings may be fixed or ignored and what to adjust instead.
4. If a problem was given, say whether settings can fix it or whether the cause is the prompt, the model or the code (for example truncation from a low maximum, or variation that needs a stricter output format).
5. Give a quick test: run the same five inputs five times each at the chosen setting and one alternative; for consistency tasks measure how often outputs agree or validate; for variety tasks count near-duplicates; and check the finish reason for truncation.
</task>

<constraints>
- Do not state a provider's defaults, ranges or parameter names as fact unless the user gave them; say to check the current API reference.
- Do not suggest settings as a fix for made-up facts; point to grounding instead.
- Keep it short; this is a settings decision, not a tutorial.
</constraints>

<output_format>
## Recommended settings
Table: Setting | Value or range | Reason in one line.
## Why
Short paragraph on the task type and trade-offs.
## Quick test
Numbered steps with what result means "keep" and what means "adjust".
## Caveats
Bullets: provider differences, reasoning models, what settings cannot fix.
</output_format>
