---
schema: 1
id: run-crazy-eights
kind: prompt
title: Run a Crazy 8s sketching round
description: Prepares and coaches a Crazy 8s round - eight rough sketches in eight minutes - with a focused prompt, frame-by-frame variation cues, a share-out and a way to pick a direction.
category: brainstorming
version: 1.0.0
status: incubating
stage: [design, discover]
role: [designer, product-manager, frontend-engineer, teacher]
requires: [none]
inputs: [topic, text]
output: [plan, ideas, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [crazy-eights, rough-sketches, design-sprint, rapid-ideation, visual-thinking]
pairs_with:
  prompts: [plan-design-sprint, facilitate-group-brainstorm, write-how-might-we-questions]
args:
  - name: focus
    description: The screen, moment, object or layout to sketch ideas for, and who it is for. For example "the first screen a new user sees after sign-up" or "a poster for our school play".
    type: text
    required: true
  - name: people
    description: Optional - who is sketching (alone, a team of 5, a class) and whether in person or remote.
    type: text
output_contract:
  format: markdown
  sections: [Sketch prompt, Before you start, Frame cues, Share and pick, Common traps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Crazy 8s, popular in design sprints, has each person fold a sheet into eight panels and sketch one idea per panel in one minute each. The time pressure pushes past the first obvious idea, which usually arrives in panels one and two, into stranger variations. It works only when the focus is narrow (one screen, one moment, one object) and people know that rough is the point. It fails when the prompt is too broad, when people redraw the same idea eight times, or when non-designers freeze because they think they cannot draw. Your job is to set it up so anyone can do it, and to give cues that force variation across the eight frames.

<focus>
{{focus}}
</focus>
{{#people}}
Participants:
<people>
{{people}}
</people>
{{/people}}
</context>

<task>
1. Narrow the focus into one sketch prompt: a single screen, moment or object for a named user. If the focus covers a whole product or journey, pick the most important moment, say why, and offer the alternatives.
2. Give the setup: materials (paper folded into eight, thick pen, timer; a remote option if relevant), the rule of one minute per frame, and reassurance that boxes, arrows and stick figures are enough.
3. Write eight frame cues, one per minute, each pushing a different variation: the obvious version, the minimal version, the version for a first-timer, the version with no text, the playful version, the version for someone in a hurry, the version that breaks a convention, and a combination of two earlier frames. Adapt the cues to the focus.
4. Give the share-out: how long each person presents, how others mark favourite elements (not whole sketches) with dots, and how to combine marked elements into one or two directions.
5. List common traps and how the facilitator recovers from each.
</task>

<constraints>
- Keep the round to eight minutes of sketching; share-out timing scales with the number of people.
- Do not produce finished designs or detailed specs; frame cues guide variation, they do not prescribe the answer.
- Keep cues accessible to non-designers; no tool or software is required.
- If the people include anyone who cannot sketch by hand, offer an accessible alternative such as describing each frame in words.
</constraints>

<output_format>
## Sketch prompt
One sentence, plus any alternatives.

## Before you start
Bulleted setup and rules.

## Frame cues
Numbered list 1 to 8, one cue each.

## Share and pick
Numbered steps with timings.

## Common traps
Table: Trap | What to do.
</output_format>
