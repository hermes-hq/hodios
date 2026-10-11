---
schema: 1
id: write-vfx-element-prompts
kind: prompt
title: Write VFX element prompts
description: Writes prompts for generated effects elements such as smoke, fire, sparks, dust or rain on black or a key colour, matched to your plate's light and perspective so they composite cleanly.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, artist, designer]
requires: [none]
inputs: [text, image]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [vfx-elements, compositing, chroma-key, stock-elements]
pairs_with:
  prompts: [write-video-generation-prompt, write-b-roll-prompts, plan-generated-video-finishing]
args:
  - name: plate
    description: "The shot the element goes into: what is in frame, camera angle and lens, light direction and colour, whether the camera moves."
    type: text
    required: true
  - name: element
    description: "The effect you need, e.g. 'thin smoke rising from a smouldering log', 'sparks from a grinder', 'dust kicked up by a landing'."
    type: text
    required: true
  - name: background
    description: "Background for extraction: black (for screen or add blending of light, fire, smoke), green-key or blue-key (for solid elements you will key)."
    type: enum
    enum: [black, green-key, blue-key]
    default: black
output_contract:
  format: markdown
  sections: [Element spec, Prompts, Compositing notes, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Compositors use stock elements shot in isolation: fire, smoke, sparks and light effects on pure black, which blend with a screen or add mode with no keying, and solid elements on an even green or blue screen for keying. Generated elements are useful for this only if they behave like stock: locked-off camera, nothing else in frame, no floor or horizon, an even background with no gradient or vignette, the element fully in frame or leaving cleanly, and lit and angled to match the plate. Common failures are a background that is not truly flat, an element cut off at the frame edge, a camera move that does not match the plate, light coming from the wrong side, and green spill or green-coloured elements on a green key.
</context>

<task>
Write element prompts for this plate.

<plate>
{{plate}}
</plate>

<element>
{{element}}
</element>

Background: {{background}}.

1. **Element spec.** Define: the element's size in frame and where it starts and exits; perspective (seen from the plate's camera height and angle); light direction and colour matching the plate; speed and behaviour (rising, billowing, falling, drifting); length, generated a few seconds longer than needed for trimming.
2. **Background check.** Confirm {{background}} suits the element. Light-emitting or semi-transparent elements (fire, smoke, sparks, glows, rain) belong on black; solid opaque elements belong on a key colour. If the element is green or blue, or {{background}} is wrong for it, say so and switch.
3. **Prompts.** Write a main prompt and two variants (different density or intensity). Each states: locked-off camera; element only, isolated; pure, flat, evenly lit {{background}} background with no floor, horizon, vignette or other objects; the element spec from step 1.
4. **Compositing notes.** How to blend it: screen or add for black backgrounds, key and spill suppression for key colours; scale and position to match; a colour match to the plate; motion matching if the plate camera moves (track the plate and attach the element); adding a little blur or grain to match.
5. **Checks.** A checklist to run on each take: background flat and clean, no extra objects, element not cut at edges unless intended, no camera drift, light direction matches.
6. Before answering, check the perspective and light direction in every prompt match the plate.
</task>

<constraints>
- Elements depicting real disasters, real people or weapons used against people are out of scope; keep to effects.
- No tool, model or version names; describe blend modes and keying generically.
</constraints>

<output_format>
## Element spec
Table: Property | Value.
Then one line on the background choice.
## Prompts
Three code blocks: main and two variants.
## Compositing notes
Bullets.
## Checks
Checklist.
</output_format>
