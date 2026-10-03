---
schema: 1
id: write-isometric-scene-prompt
kind: prompt
title: Write an isometric scene prompt
description: Writes prompts for isometric illustrations of rooms, buildings, cities or product scenes with the angle locked, one light direction and modular pieces for assembling larger scenes.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [designer, game-developer]
stack: [midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [text]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [isometric, diorama, game-art, modular-assets, illustration]
pairs_with:
  prompts: [write-game-texture-prompt, write-icon-set-prompt, write-fantasy-map-prompt]
args:
  - name: scene
    description: What the scene shows and where it will be used, e.g. "a cosy studio flat cut away to show the rooms, for a website hero", "a small harbour town, as game tiles".
    type: text
    required: true
  - name: palette
    description: Colours (names or hex codes) or a palette mood such as pastel, earthy, neon night.
    type: string
    default: pastel
  - name: detail
    description: How much small detail to include. Low suits icons and small sizes; high suits hero images viewed large.
    type: enum
    enum: [low, medium, high]
    default: medium
output_contract:
  format: markdown
  sections: [View spec, Style block, Scene prompt, Module prompts, Assembly notes, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an illustrator who specialises in isometric scenes. Isometric art uses a parallel projection: no vanishing points, every parallel edge stays parallel, verticals stay vertical, and the ground plane sits at a fixed angle (true isometric uses 30 degrees; the 2:1 pixel ratio of about 26.6 degrees is common in games and on screens). That fixed angle is what lets separate pieces snap together into one larger scene. Generators slip into perspective, mix angles between objects, light each object from a different side and crowd scenes with tiny clutter. So the prompt states the projection explicitly, fixes one light direction for every piece, keeps a consistent cube or diorama base, and builds larger scenes from separately generated modules placed on a shared grid.

<scene>
{{scene}}
</scene>
Palette: {{palette}}
Detail: {{detail}}
</context>

<task>
1. **View spec.** Projection (true isometric or 2:1 game isometric, chosen for the use, with the reason), camera direction (which corner faces the viewer), light from the top-left with shadows falling to the bottom-right, and the base (floating diorama block, cut-away room, or ground tile). If the scene is too vague to break into parts, ask one question and stop.
2. **Style block.** Rendering (flat vector, soft 3D clay, low-poly, pixel), outline rule, the palette ({{palette}}; name four to six colours), shading rule, and the {{detail}} level of detail. One block to paste into every prompt.
3. **Scene prompt.** One prompt for the whole scene: "isometric view, orthographic, no perspective", the projection angle, the base, every key element with its position on the base, the light, the style block, plain background, no text.
4. **Module prompts.** For scenes that need to grow or be reused: one prompt per module (a building, a room, a tree cluster, a tile) on a plain background, same angle, light and style block, sized to the grid (for example one module per square of the base).
5. **Assembly notes.** How to align modules on an isometric grid in an editor or engine, layering order (back to front), and shared shadow direction.
6. **Checks.** What to inspect before using the images.
</task>

<constraints>
- Every prompt states the same projection, angle and light direction.
- No text, signs with lettering, or logos in the images; add signage later if needed.
- No recognisable buildings, products or characters owned by others unless the user supplies licensed references.
</constraints>

<output_format>
## View spec
## Style block
One code block.
## Scene prompt
One code block and the aspect ratio.
## Module prompts
One code block per module, or "Not needed" for a single image.
## Assembly notes
## Checks
A checklist: parallel edges stay parallel, no vanishing points, every piece at the same angle, light and shadows from one direction, palette consistent, detail readable at the display size.
</output_format>
