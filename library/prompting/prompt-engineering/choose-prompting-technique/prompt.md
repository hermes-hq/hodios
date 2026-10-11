---
schema: 1
id: choose-prompting-technique
kind: prompt
title: Choose the right prompting technique for a task
description: Matches a real task to the prompting techniques that fit it - examples, decomposition, attached sources, step-by-step reasoning, structured output or a tool - explains why, and writes a first draft.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, ml-engineer, product-manager, content-creator]
requires: [none]
inputs: [text]
output: [explanation, prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [prompting-techniques, few-shot, task-decomposition, chain-of-thought, technique-selection]
pairs_with:
  personas: [prompt-engineer]
  prompts: [write-task-prompt, design-prompt-chain, create-few-shot-examples]
args:
  - name: task
    description: The real task you want an AI assistant to do, with an example input and what a good result looks like if you have them.
    type: text
    required: true
  - name: attempts
    description: Optional - what you have tried so far and what went wrong.
    type: text
output_contract:
  format: markdown
  sections: [Task diagnosis, Recommended techniques, Not needed, First draft, How to tell it works]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Prompting techniques solve specific problems, and stacking all of them makes prompts longer without making them better. The useful mapping: when the model does not know what "good" looks like or must match a style, show examples; when the task has several distinct jobs, split it into steps or separate prompts; when it needs facts it cannot know (your data, recent events, internal policy), attach or retrieve the source; when it involves multi-step logic, let it reason before answering or use a reasoning model; when code or a spreadsheet will read the output, ask for structured output; when it involves exact arithmetic, counting or lookups, use a tool such as code execution; when the input is long, ask for relevant quotes first; when many items must be handled the same way, fix a rubric and a format. Role prompts ("you are an expert") add little on their own; the context and the definition of done do the work.

<task_description>
{{task}}
</task_description>
{{#attempts}}
<attempts>
{{attempts}}
</attempts>
{{/attempts}}
</context>

<task>
1. Diagnose the task: what makes it hard (unclear standard, several jobs, missing facts, reasoning, exact calculation, long input, machine-read output, consistency across many items, tone or style), and what the attempts show if given. If the task is too vague to diagnose, ask up to three questions and stop.
2. Recommend at most three techniques, each tied to a difficulty you found, with a one-line reason.
3. List techniques that look relevant but are not needed here, and why, so the prompt stays short.
4. Write a first draft prompt applying the chosen techniques, with placeholders for the user's material.
5. Say how to tell it works: two or three test inputs and what to look for, and what to try next if it fails.
</task>

<constraints>
- Recommend no more than three techniques; each must address a named difficulty.
- If the task cannot be done well by prompting alone (needs live data, exact calculation at scale, actions in other systems), say so and name the kind of tool needed.
- Use plain names for techniques and explain each in one sentence; avoid jargon without explanation.
- Keep the first draft under about 300 words.
</constraints>

<output_format>
## Task diagnosis
Bullets: what makes this hard.
## Recommended techniques
Table: Technique | Difficulty it fixes | How it shows up in the prompt.
## Not needed
Bullets with reasons.
## First draft
Fenced code block.
## How to tell it works
Numbered tests and the next step if they fail.
</output_format>
