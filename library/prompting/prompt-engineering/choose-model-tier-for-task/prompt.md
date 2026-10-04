---
schema: 1
id: choose-model-tier-for-task
kind: prompt
title: Choose a model tier for a task
description: "Picks a first-choice model tier and reasoning setting for a task from its difficulty, volume, latency, cost and risk, with signs to step up or down and a check sized to the stakes. No model names."
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
tags: [model-selection, cost-latency, reasoning-effort, cascading, thinking-mode]
pairs_with:
  prompts: [choose-llm-for-feature, adapt-prompt-for-small-model, adapt-prompt-for-reasoning-model, build-prompt-test-set]
args:
  - name: task
    description: "What the model has to do, with a typical input and the output you need, for example 'tag 40-word support tickets with one of 12 categories', 'draft replies to tenant emails' or 'review pull requests for security issues'."
    type: text
    required: true
  - name: setting
    description: "Where the choice is made. chat-app: picking a model or a thinking mode in an assistant you type into. api: a model and reasoning parameter in code or an automation. agent: a coding or task agent that works through many steps. unsure: the answer covers the likely cases."
    type: enum
    enum: [chat-app, api, agent, unsure]
    default: unsure
  - name: volume
    description: "Roughly how often it runs, for example 'a few times a week by hand', '5,000 documents a month' or 'every message in a busy app'."
    type: string
    default: "occasional, by hand"
  - name: constraints
    description: "Optional: latency limits, budget or usage caps, privacy or hosting limits (for example 'must run on our own servers'), and how costly a wrong answer is."
    type: text
output_contract:
  format: markdown
  sections: [Task profile, Recommendation, Step up or down when, Cost and latency, Quick check, Decision rule]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most people use one model for everything: the largest, paying in waiting time, cost and usage caps for work a smaller model does as well, or the default, and then trust it on work it gets wrong. Model names and prices change every few months, so the durable decision is the tier:
- small: fast and cheap; classification into fixed labels, extraction against a clear schema, routing, short rewrites and formatting;
- mid: most writing and editing, summarising, answering from documents you provide, everyday code and spreadsheet formulas;
- frontier: multi-step reasoning, ambiguous or novel problems, long agentic work, subtle judgement and output where a mistake is expensive.
A reasoning or thinking setting is a second dial. It helps when the answer needs planning, maths, weighing evidence or checking its own work, and only adds delay to lookups, rewrites and formatting.

This gives a reasoned first choice and a check sized to the stakes. A production feature that needs measured success criteria, latency percentiles and a test harness needs a full evaluation, not this shortcut.

Setting: {{setting}}
Volume: {{volume}}

<task_description>
{{task}}
</task_description>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. If you cannot tell what goes in and what must come out, ask up to two questions and stop.
2. Profile the task on: reasoning depth, ambiguity, knowledge needed beyond the input, input length, output length and how strict its format is, number of steps or tool calls, cost of an error, latency need and volume. Rate each low, medium or high.
3. Recommend one tier and one reasoning setting (off, on for hard cases only, or on), with your confidence (low, medium or high) and the two or three factors that decided it. Lean towards the smaller tier when volume or latency matters and errors are cheap or caught downstream; lean larger when one error costs more than many runs.
4. Say how to apply it in the setting: in a chat app, which kind of option to pick (the fast everyday model or the most capable one, thinking on or off), described generically; in an API or automation, the tier and the reasoning parameter; for an agent, whether a larger tier should plan while a smaller one carries out routine steps. If the setting is unsure, cover the chat-app and API cases in one line each.
5. Recommend a split only when it clearly pays: a cascade (small first, escalate when a check fails or the model is unsure), a pipeline (small for extraction or routing, larger for synthesis), or batching for work that is not urgent.
6. List the signs during use that mean step up (repeated misreadings, invented details, broken format, skipped steps) or step down (the larger option gives the same answers, waiting time or usage limits hurt).
7. Size a quick check to the volume and risk:
   - occasional use by hand: run three to five real, recent examples through both options side by side, including one hard one, and compare against what you would have accepted;
   - recurring or automated work: 20 to 50 representative inputs including edge cases, scored by a stated check, through the recommended option and the adjacent one, recording pass rate and rough time and cost per run; move to a full evaluation if it becomes a product feature.
8. Write the decision rule before the check is run.
</task>

<constraints>
- Name tiers only, never specific models, vendors, prices or limits; tell the user to check what their tool or account currently offers.
- Tier boundaries move as models improve. State your confidence honestly; the quick check, not this recommendation, makes the decision.
- When errors could harm people (health, legal, financial or safety decisions, or decisions about individuals), recommend human review of the output whatever the tier.
- If a constraint rules out a tier, such as self-hosting limiting model size or a usage cap, say so and adjust.
- Keep the answer short enough to act on in a few minutes.
</constraints>

<output_format>
## Task profile
Table: Factor | Rating | Note.
## Recommendation
Tier, reasoning setting, confidence and deciding factors in three or four lines, then how to apply it in the setting and any split.
## Step up or down when
Two short bullet lists: step up, step down.
## Cost and latency
Two to four bullets in relative terms: what scales the cost and where the waiting comes from.
## Quick check
Numbered steps sized to the volume.
## Decision rule
One or two sentences, written before running.
</output_format>
