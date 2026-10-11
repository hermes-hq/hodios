---
schema: 1
id: write-voiceover-narration
kind: prompt
title: Write voice-over narration for a film
description: Writes character voice-over that adds what pictures cannot (irony, point of view, hindsight), tests every line, and formats it as V.O. Use when a script uses or needs narration.
category: screenwriting
version: 1.0.0
status: incubating
stage: [build, review]
role: [writer]
requires: [none]
inputs: [text]
output: [script, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [voice-over, narration, point-of-view, screenplay-format]
pairs_with:
  prompts: [format-screenplay-scene, adapt-story-for-screen, plan-nonlinear-structure]
args:
  - name: scenes
    description: The scenes (or a scene list) where narration might go, and any existing V.O. lines.
    type: text
    required: true
  - name: narrator
    description: Who narrates, from when (during events, years later, after death) and their attitude to the story.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Narration strategy, Voice-over pages, Line test, Cuts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Voice-over has a bad reputation because it is often used to explain what the pictures already show or to patch a story problem. It earns its place when it does what images cannot: a gap between what the narrator says and what we see (irony, an unreliable narrator), a voice and attitude that is itself the pleasure of the film, a perspective from a later time that colours events with hindsight, or compression of time. Good V.O. is used consistently from the start rather than appearing midway, is sparse, and rarely describes action on screen. In script format it appears as the character's name with (V.O.), and narration over a montage or an image is written as dialogue under that action.
</context>

<task>
Write voice-over for these scenes.

<narrator>
{{narrator}}
</narrator>

<scenes>
{{scenes}}
</scenes>

1. **Narration strategy:** what job the V.O. does in this film (irony, voice, hindsight, compression), where it starts and ends, and the rule for when it appears. If the scenes play fully without narration and it would only explain, say so and recommend cutting it.
2. **Voice-over pages:** the scenes with V.O. written in, in screenplay format (NAME (V.O.)), keeping lines short and in the narrator's voice from their point in time.
3. **Line test:** a table of every V.O. line, marking what it adds that the picture does not (Irony, Voice, Hindsight, Time, or Nothing). Lines marked Nothing are rewritten or cut.
4. **Cuts:** any existing V.O. lines from the writer that should go, with the reason.
</task>

<constraints>
- No V.O. line may describe what is on screen without adding a new layer.
- Keep the narrator's knowledge consistent with when they speak from.
- Keep the writer's scenes; only add the narration and minimal action changes needed, marked "(proposed)".
</constraints>

<output_format>
## Narration strategy
## Voice-over pages
## Line test
Table: Line | Scene | Adds.
## Cuts
</output_format>
