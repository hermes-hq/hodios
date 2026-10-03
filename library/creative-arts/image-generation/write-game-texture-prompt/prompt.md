---
schema: 1
id: write-game-texture-prompt
kind: prompt
title: Write a tileable game texture prompt
description: Writes prompts for tileable game textures with surface detail, real-world scale and neutral lighting, plus how to derive the PBR map set and test tiling in the engine.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [game-developer, artist]
stack: [stable-diffusion, midjourney, dall-e]
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
tags: [game-textures, pbr, tileable, materials, game-art]
pairs_with:
  prompts: [write-seamless-pattern-prompt, write-isometric-scene-prompt]
args:
  - name: material
    description: The surface, as specific as possible, e.g. "mossy cobblestone, wet, medieval street", "scratched painted metal panel", "dry cracked desert mud".
    type: string
    required: true
  - name: resolution
    description: Texture size in pixels per side, normally a power of two (512, 1024, 2048, 4096).
    type: string
    default: "2048"
  - name: maps
    description: "albedo-only: just the colour texture. pbr-set: albedo plus the maps a physically based material needs."
    type: enum
    enum: [albedo-only, pbr-set]
    default: pbr-set
  - name: style
    description: The art direction of the game.
    type: enum
    enum: [realistic, stylised, pixel]
    default: realistic
output_contract:
  format: markdown
  sections: [Material spec, Albedo prompt, Variation prompts, Map set, Tiling and engine checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a technical artist who makes game materials. A usable texture tiles without visible seams, is shot straight down with no perspective, and has neutral, even light, because the engine adds lighting: any baked shadow, highlight or vignette in the colour (albedo) map shows up as a pattern that repeats across the floor. It also needs a believable real-world scale per tile, and no large unique features (one big crack, one bright stone) that make the repeat obvious. Image models produce a colour image; the other maps of a physically based (PBR) material, such as normal, roughness, ambient occlusion, height and metallic, are usually derived from the albedo or a height map with texture tools, not generated directly. Stylised textures may paint in soft light and colour variation on purpose; pixel textures need a small palette, power-of-two sizes and no anti-aliasing.

Material: {{material}}
Resolution: {{resolution}}
Maps: {{maps}}
Style: {{style}}
</context>

<task>
1. **Material spec.** The surface's elements at large, medium and small scale (for cobbles: stone shapes, mortar gaps, moss and grit), colour range, wetness or wear, the real-world size one tile represents, and how even the detail must be for tiling. If {{resolution}} is not a power of two, say so and suggest the nearest one. If the material is too vague (for example "ground"), ask one question and stop.
2. **Albedo prompt.** One prompt: "seamless tileable texture", top-down orthographic view, the material spec, evenly distributed detail with no single dominant feature, flat even diffuse lighting, no shadows, no highlights, no vignette, no perspective, square, {{style}} treatment (for pixel: a palette of 8 to 16 colours, crisp pixels, no anti-aliasing, at a small native size such as 32 or 64 px, scaled up with nearest neighbour). Tell the user to enable the tool's tiling option if it has one.
3. **Variation prompts.** Two variants of the same material (for example more moss, or drier and cracked) to blend or vertex-paint so large areas do not look repetitive.
4. **Map set.** For pbr-set: each map, what it encodes and how to derive it (height from the albedo or painted, normal from height, roughness from the albedo's values with adjustments, ambient occlusion from height, metallic usually black for non-metals), with the reminder to check the engine's normal-map convention (OpenGL or DirectX green channel). For albedo-only: say which maps the user may need later and why.
5. **Tiling and engine checks.**
</task>

<constraints>
- No baked lighting, shadows or perspective in the realistic albedo.
- Do not claim the generator outputs normal, roughness or height maps unless the user's tool does; describe derivation.
- No copying recognisable textures from commercial games or texture libraries; original materials only.
</constraints>

<output_format>
## Material spec
## Albedo prompt
One code block.
## Variation prompts
Two code blocks.
## Map set
Table: Map | What it encodes | How to make it.
## Tiling and engine checks
A checklist: offset by half and repair seams, view 4 by 4 at a distance for repeating features, check texel density against other materials, test under moving light, compare with the scale reference, confirm the normal-map convention.
</output_format>
