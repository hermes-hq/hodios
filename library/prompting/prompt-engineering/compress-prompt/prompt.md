---
schema: 1
id: compress-prompt
kind: prompt
title: Compress a prompt
description: Shortens a long prompt while preserving its behaviour, maps every original instruction to where it now lives, reports the real size reduction and lists test inputs to check nothing changed.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [ml-engineer, software-engineer, individual]
inputs: [text]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [prompt-compression, token-cost, behaviour-preservation, regression-tests]
pairs_with:
  personas: [prompt-engineer]
  prompts: [improve-prompt, diagnose-prompt-failures]
args:
  - name: prompt
    description: The full prompt to shorten, including examples and placeholders.
    type: text
    required: true
  - name: target_reduction
    description: How much shorter it should be, as a percentage or a word or token budget.
    type: string
    default: 40%
output_contract:
  format: markdown
  sections: [Behaviour inventory, Compressed prompt, What was cut, Size, Test inputs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Long prompts cost tokens and latency, and they often bury their important instructions under repetition and filler. But a shorter prompt is only better if it behaves the same. Compression is safe when every behaviour of the original is listed first and checked off at the end, and when test inputs exist to compare the two versions.

<original_prompt>
{{prompt}}
</original_prompt>
Target reduction: {{target_reduction}}
</context>

<task>
1. Build a behaviour inventory: every distinct thing the prompt makes the model do or avoid (role, steps, rules, edge-case handling, output format, tone, examples and what each example teaches). Number them B1, B2 and so on.
2. Find what can go without changing behaviour: repetition, filler and politeness, emphasis words, explanations that do not change behaviour, instructions that restate model defaults, and examples that teach the same thing as another example.
3. Keep what carries behaviour: reasons that shape judgement in unforeseen cases, edge-case rules, the output format, placeholders, and examples that cover distinct cases.
4. Rewrite the prompt more tightly: merge overlapping rules, turn paragraphs into short lists where that is clearer, and keep the original order of priority.
5. Map each inventory item to where it now lives in the compressed prompt, or mark it as deliberately removed with the reason.
6. Report the size before and after in words (and an approximate token count), and the actual reduction. If the target cannot be met without losing behaviour, stop at the safe size and say which behaviours you would have to drop to go further.
7. Write five to eight test inputs that exercise the behaviours most at risk, each with the observable result both versions must produce.
</task>

<constraints>
- Preserve every placeholder, variable, delimiter tag name and required output field exactly.
- Never drop a safety, privacy or honesty instruction to save space.
- Do not change what the prompt does. Improvements you notice go in a separate "Possible improvements" line, not into the compressed prompt.
- You cannot run the tests. Present them for the user to run on both versions side by side.
</constraints>

<output_format>
## Behaviour inventory
Numbered list B1, B2...
## Compressed prompt
Fenced code block.
## What was cut
Bullets: what and why it was safe.
## Size
Before → after in words and approximate tokens, and the reduction as a percentage. Then a table: Behaviour | Where it lives now (or "removed: reason").
## Test inputs
Table: Input | Behaviours tested | Expected in both versions.
Possible improvements: one line, or "None".
</output_format>
