---
schema: 1
id: plan-nonlinear-structure
kind: prompt
title: Plan a nonlinear screenplay structure
description: Plans a script told out of order (flashbacks, parallel timelines, reverse chronology) so each jump raises or answers a question. Use when a story jumps in time.
category: screenwriting
version: 1.0.0
status: incubating
stage: [plan, design]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [outline, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [nonlinear-structure, flashbacks, parallel-timelines, story-structure]
pairs_with:
  prompts: [write-beat-sheet, design-plot-twist, adapt-story-for-screen]
  personas: [script-consultant]
args:
  - name: story
    description: The story in chronological order (what actually happens, start to finish), the characters, and the ending.
    type: text
    required: true
  - name: device
    description: The structure you have in mind, e.g. "flashbacks", "two timelines that converge", "reverse chronology", "frame story", or auto to recommend one.
    type: string
    default: auto
  - name: format
    description: feature, series or short.
    type: enum
    enum: [feature, series, short]
    default: feature
output_contract:
  format: markdown
  sections: [Why nonlinear, Chosen device, Timeline map, Order of telling, Orientation, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Telling a story out of order only works when the order creates meaning: a question the audience wants answered, dramatic irony, or a reveal that recontextualises what came before. Each timeline needs its own protagonist goal and its own rising line, or the "past" scenes become exposition that stops the present story. Jumps should land on a cut that rhymes (an object, a line, a question) so the audience is oriented and the cut adds meaning. Common failures are flashbacks that explain what the audience already understood, a timeline that is far weaker than the other, confusing period markers, and a final reveal that the story has not set up. Before choosing an order, writers need the true chronology clear.
</context>

<task>
Plan a nonlinear structure for this {{format}}. Device: {{device}}.

<story>
{{story}}
</story>

1. **Why nonlinear:** what the out-of-order telling gives this story that a linear version would not (a question, irony or recontextualising reveal). If it gives nothing, say so and recommend linear, with flashbacks only where earned.
2. **Chosen device:** if device is auto, compare two options in a line each and pick one; otherwise test the given device against step 1.
3. **Timeline map:** the true chronology as a numbered list of events, labelled by timeline.
4. **Order of telling:** the sequence in which the audience sees them, scene or sequence by sequence, with for each: the timeline, what question it raises or answers, and the cut into the next (the rhyme or hook). Make sure each timeline has its own goal and rising line, and that the timelines converge or pay off at the climax.
5. **Orientation:** how the audience will always know when they are (sluglines with year or label, visual or sound markers, age or costume changes, a consistent rule), written as script conventions the writer can apply.
6. **Risks:** where confusion, a dead timeline or an unearned reveal could happen, and the fix.
</task>

<constraints>
- Keep the writer's events and ending; mark any added event "(proposed)".
- Never let a jump repeat information the audience already has unless the meaning has changed.
- Do not write script pages.
- If the chronology given is unclear or contradictory, ask before ordering it.
</constraints>

<output_format>
## Why nonlinear
## Chosen device
## Timeline map
## Order of telling
Table: # | Timeline | Event | Question raised or answered | Cut into next.
## Orientation
## Risks
</output_format>
