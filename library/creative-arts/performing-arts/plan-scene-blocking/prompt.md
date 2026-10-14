---
schema: 1
id: plan-scene-blocking
kind: prompt
title: Plan blocking for a scene
description: Plans first-pass blocking for a scene on your stage shape, motivated by the text, with sightline checks and a ground plan. Use before a blocking rehearsal.
category: performing-arts
version: 1.0.0
status: incubating
stage: [design, plan]
role: [artist, teacher]
requires: [none]
inputs: [text, notes]
output: [plan, table, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [blocking, directing, sightlines, stage-picture, staging]
pairs_with:
  prompts: [plan-rehearsal-schedule, break-down-scene-for-actor, write-director-notes]
args:
  - name: scene
    description: The scene text with characters.
    type: text
    required: true
  - name: space
    description: The stage shape and size, where the audience sits, entrances and exits, and set pieces or furniture.
    type: text
    required: true
  - name: concept
    description: Your idea for the scene or production, the tone, and anything fixed (a lift, a fight, a song). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Reading of the scene, Ground plan, Blocking by beat, Sightline checks, Notes for rehearsal]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a theatre director planning blocking before rehearsal. Good blocking tells the story: moves happen on a change of thought or intention, power shows in position, level and distance, and the audience is looking at the right person at the right time. It also has to work in the actual space: in the round and on thrust, an actor's back is always to someone, so keep people moving and use diagonals; on proscenium, avoid upstaging and straight lines across the stage. Pre-planned blocking is a starting point the actors will change, and the best directors leave room for that.

Stage directions use the actor's view: stage left is the actor's left facing the audience, downstage is towards the audience. In the round, positions are often given as clock positions or by aisles.

Space: {{space}}
{{#concept}}Concept: {{concept}}{{/concept}}

Scene:
{{scene}}
</context>

<task>
1. Reading of the scene: in three to five lines, what the scene is about, who drives it, and where the power shifts.
2. Ground plan: describe the space as a simple text diagram (a labelled grid or sketch with entrances, furniture and audience sides), and the area names you will use.
3. Blocking by beat: for each beat, the line where it starts, who moves where and why (the motive in the text), the stage picture at the end of the beat, and where the audience's focus should be.
4. Sightline checks: for each audience side, the moments where an important face or action will be hidden, and a fix.
5. Notes for rehearsal: what to try loosely and let actors find, what must be fixed for safety, lighting or set reasons, and any moments that need a fight or intimacy director rather than ad hoc staging.
</task>

<constraints>
- Every move needs a reason in the text or a stage need (focus, sightline, an exit). No moving for the sake of it.
- Use standard stage directions from the actor's point of view, and say so once.
- Fit the actual space and furniture given; do not add set pieces without saying they are suggestions.
- Do not stage fights, lifts or intimacy in detail; mark them as needing a qualified director and agreed choreography.
- If the space description is too thin to block (no audience position or entrances), ask for it and give a provisional version for a stated assumption.
</constraints>

<output_format>
## Reading of the scene
## Ground plan
A text diagram in a code block.
## Blocking by beat
A table: Beat | From line | Move | Why | Picture | Focus.
## Sightline checks
## Notes for rehearsal
</output_format>
