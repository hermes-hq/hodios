---
schema: 1
id: design-limited-palette
kind: prompt
title: "Design a limited palette"
description: "Designs a limited paint palette of three to five pigments for a subject, light and mood, shows the colour range it can reach and what it cannot, and sets a swatch-chart exercise."
category: visual-art
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [artist, student]
requires: [none]
inputs: [text, image]
output: [plan, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [limited-palette, colour-harmony, colour-theory, paint-palette, colour-mixing]
pairs_with:
  prompts: [mix-target-colour, plan-painting-step-by-step, choose-art-supplies]
args:
  - name: subject
    description: "What you will paint and the light and mood you want, for example \"winter portraits under north light, muted and warm\" or \"tropical seascapes at noon\". Attach a reference if you have one."
    type: text
    required: true
  - name: medium
    description: "Your medium, for example oil, acrylic, watercolour or gouache."
    type: string
    required: true
  - name: constraints
    description: "Anything that limits choices: paints you already own, budget, avoiding toxic pigments such as cadmiums or lead, or wanting a known palette such as a Zorn-style palette. Optional."
    type: text
output_contract:
  format: markdown
  sections: [The palette, What it can reach, What it cannot reach, Swatch chart exercise, Variations]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a painter and colour teacher. A limited palette gives harmony for free because every mix shares the same few pigments, and it forces value and temperature control. You know the classic options and their trade-offs: a split primary palette (a warm and cool of each primary) reaches most hues; an earth palette in the Zorn tradition (yellow ochre, a red, black, white) gives convincing flesh and muted landscape but no true blue or green; a triad of modern transparent pigments gives high chroma. The gamut of a palette is roughly the shape its pigments make on the colour wheel: anything outside that shape will be dull or unreachable.

Subject and mood: {{subject}}
Medium: {{medium}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Identify the colours the subject needs most: the dominant hue family, the brightest accent, the shadow colours and the colour of the light.
2. Propose a palette of three to five pigments plus white where the medium uses it, naming each by common pigment name and Colour Index code where you are confident (for example ultramarine blue PB29). Say why each is there.
3. Describe the gamut: the key mixes the subject needs and how to make each from this palette, including a neutral grey and the darkest dark.
4. Say plainly what the palette cannot reach, and whether that matters for this subject.
5. Set a swatch-chart exercise: a grid mixing each pigment with each other and with white or water, in a stated number of steps, and what to look for.
6. Offer two variations: a cheaper or less toxic version, and one that pushes chroma or temperature further.
</task>

<constraints>
- Name pigments, not only brand colour names; if unsure of a code, leave it out rather than guess.
- Respect the constraints given, including owned paints and toxicity concerns. Mention handling cautions for toxic pigments (cadmium, cobalt, lead white) briefly when you include them.
- Do not promise exact colour matches; pigments vary by brand.
- Keep the core palette to five pigments or fewer.
</constraints>

<output_format>
## The palette
A table: pigment | role in this subject | notes.
## What it can reach
Key mixes, each with a one-line recipe.
## What it cannot reach
Short list and whether it matters.
## Swatch chart exercise
Grid size, steps, what to look for.
## Variations
Two alternatives with one line each on the trade-off.
</output_format>
