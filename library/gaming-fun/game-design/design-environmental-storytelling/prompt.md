---
schema: 1
id: design-environmental-storytelling
kind: prompt
title: Design environmental storytelling for a level
description: Designs environmental storytelling for a game space - the story beneath it, vignettes and props that reveal it, the order players find them, and set-dressing notes for artists.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, game-developer, writer]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [narrative-design, environmental-narrative, set-dressing, vignettes, level-art, props]
pairs_with:
  prompts: [design-game-level, write-game-quest]
args:
  - name: space
    description: The location, its layout or path through it, and what the player is doing there (combat, exploration, puzzle, hub).
    type: text
    required: true
  - name: story
    description: What happened here and what the player should come to understand, plus the game's tone. If you do not know yet, say what kind of story you want.
    type: text
    required: true
  - name: constraints
    description: Art budget, reuse of existing assets, whether there is text or voice, and the camera. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The story beneath, What the player should conclude, Vignettes, Discovery order, Supporting details, Set-dressing notes, Playtest questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design environmental storytelling: story told through the space rather than through dialogue. Players piece together what happened from arrangements of objects (a barricaded door with scratches on the inside, a table set for four with one chair knocked over), changes in state (fresh versus old damage), and contrast between spaces. It works when each vignette makes one clear point, is placed where players naturally look or pause, and when the clues add up to a conclusion the player reaches themselves. It fails when props are random clutter, when meaning depends on a note nobody reads, or when the story contradicts what the level asks the player to do.

Space:
{{space}}

Story:
{{story}}
{{#constraints}}

Constraints:
{{constraints}}
{{/constraints}}
</context>

<task>
1. Write the story beneath the space in a short paragraph: what happened, in what order, to whom.
2. State what the player should conclude by the end, and what should stay ambiguous on purpose.
3. Design four to eight vignettes: location, composition (objects, state, lighting or sound), the single point it makes, and how it connects to the others.
4. Plan the discovery order along the critical path and optional areas, using sightlines, landmarks and pauses (doors, lifts, safe rooms) where players will look.
5. Add supporting details: repeated motifs, before-and-after contrasts, and one optional text or audio item that rewards attentive players without being required.
6. Write set-dressing notes for artists: key props, reusable assets, lighting cues, and what must not be cluttered so the vignette reads.
7. Give playtest questions to check whether players reached the intended conclusion without prompting.
</task>

<constraints>
- Keep each vignette to one clear point; avoid clutter that hides it.
- Do not rely on notes or logs for information the player needs.
- Fit the art budget and reuse existing assets where stated.
- Keep content consistent with the game's tone and rating; handle violence or tragedy with restraint unless the game's tone requires otherwise.
</constraints>

<output_format>
## The story beneath
## What the player should conclude
## Vignettes
Table: Location | Composition | Point it makes | Links to.
## Discovery order
## Supporting details
## Set-dressing notes
## Playtest questions
</output_format>
