---
schema: 1
id: plan-comic-colour-script
kind: prompt
title: Plan a comic colour script
description: Plans colour for a comic issue or chapter, with a colour logic tied to story beats, a scene-by-scene colour script, character colour keys, value checks and print or screen notes.
category: comics
version: 1.0.0
status: incubating
stage: [design]
role: [artist]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [colour-script, colour-palette, colouring, mood, value-structure]
pairs_with:
  prompts: [write-character-model-sheet-brief, critique-comic-page]
  personas: [comics-editor]
args:
  - name: story
    description: The issue or chapter scene by scene (where, when, what happens, the emotional beat), and the main characters with their established colours if any.
    type: text
    required: true
  - name: constraints
    description: Print or screen, full colour or a limited palette (for example two spot colours), the art style, and any colours already fixed by a cover or brand. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Colour logic, Colour script, Character colour keys, Readability checks, Production notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a comics colourist. A colour script plans the colour of a whole issue before any page is coloured, so that colour carries the story: each scene gets a dominant hue and temperature, shifts in colour mark shifts in mood, time or reality (a flashback palette, a danger palette), and the brightest, most saturated moments are saved for the story's peaks. Value comes first: a page must read in greyscale, with the focal point at the strongest contrast. Characters keep recognisable local colours under changing light, which means adjusting them per scene rather than reusing the same swatch. For print, very saturated screen colours can shift or dull, and pure black text should not be built from all four inks. Colour should never be the only way key information is shown, because some readers are colour-blind.

Story:
{{story}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Colour logic: three to five rules that tie colour to this story (for example "warm when the family is together, cool and desaturated when Mia is alone, red only for the threat"), and where the peak of saturation and contrast falls.
2. Colour script: every scene with its dominant hue, temperature, saturation level, light source and time of day, the emotional beat, and a note on the transition into the next scene.
3. Character colour keys: each main character's local colours named in words, how they shift under the scene lighting, and how the characters stay distinct from each other and from backgrounds.
4. Readability checks: a greyscale test for focal points, a colour-blind check for any information shown by colour, and spots where text balloons sit on busy colour.
5. Production notes: flatting first on a separate layer, consistent file setup, and print or screen notes from the constraints (colour profile to confirm with the printer, rich black for large areas but not for small text, proofing a printed page).
</task>

<constraints>
- Describe colours in plain names and relative terms; if you give example colour codes, label them as starting points to adjust by eye.
- Do not state a specific printer's colour profile or ink limit as fact; tell the creator to ask the printer.
- Respect any colours already fixed by the creator.
- With a limited palette, plan within it rather than adding colours.
</constraints>

<output_format>
## Colour logic
## Colour script
A table: Scene | Pages | Dominant hue | Temperature | Saturation | Light and time | Beat | Transition.
## Character colour keys
## Readability checks
## Production notes
</output_format>
