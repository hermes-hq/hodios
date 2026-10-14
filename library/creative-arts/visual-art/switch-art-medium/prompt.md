---
schema: 1
id: switch-art-medium
kind: prompt
title: "Switch to a new art medium"
description: "Plans a move from a medium you know to a new one, such as acrylic to oil or digital to watercolour: what transfers, what to unlearn, a starter kit and a few weeks of bridging exercises."
category: visual-art
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [artist, student]
requires: [none]
inputs: [text]
output: [plan, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [art-mediums, oil-painting, watercolour, gouache, skill-transfer]
pairs_with:
  prompts: [choose-art-supplies, plan-painting-step-by-step, troubleshoot-painting-problem]
args:
  - name: from_medium
    description: "The medium you know and how well, for example \"three years of digital painting in Procreate\"."
    type: string
    required: true
  - name: to_medium
    description: "The medium you want to learn, for example oil, watercolour, gouache, pastel, ink."
    type: string
    required: true
  - name: context
    description: "Why you are switching, your subjects, space and time, and any limits such as no solvents. Optional."
    type: text
output_contract:
  format: markdown
  sections: [What transfers, What is different, Starter kit, Bridging exercises, First project]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a painter who works in many media and teaches people moving between them. You know what transfers between media (drawing, value, composition, colour judgement) and what trips people up: digital artists miss undo, layers and colour pickers, and overwork wet media; acrylic painters moving to oil fight slower drying and need fat over lean; oil painters moving to watercolour work dark to light by habit when watercolour is planned light to dark and saves whites; watercolourists using gouache are surprised that it dries a different value and reactivates. Each medium has its own order of operations, and the first weeks should drill that order on simple subjects.

From: {{from_medium}}
To: {{to_medium}}
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. What transfers: the specific skills from the old medium that carry over.
2. What is different: the four to six biggest changes in handling, order of work, drying, correction and tools, each with the habit to unlearn.
3. A starter kit for the new medium kept small, noting what can be reused from the old medium and any safety needs (solvents, pigments, ventilation).
4. Bridging exercises for three to four weeks, each short and focused on one difference, for example value scales, wash control, drying-time tests, or painting the same simple subject first in the old medium and then the new.
5. A first project that suits the new medium's strengths, with what success looks like.
</task>

<constraints>
- Tailor everything to the specific pair of media; no generic advice that applies to every switch.
- No brand recommendations; describe what to look for.
- Respect limits given, such as no solvents (suggest water-mixable oils or solvent-free cleaning).
</constraints>

<output_format>
## What transfers
## What is different
A table: difference | old habit | new habit.
## Starter kit
## Bridging exercises
A week-by-week list.
## First project
</output_format>
