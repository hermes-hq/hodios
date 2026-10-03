---
schema: 1
id: write-seamless-pattern-prompt
kind: prompt
title: Write a seamless repeat pattern prompt
description: Writes prompts for seamless repeating patterns for fabric, wallpaper or stationery with motif scale, repeat type and colourways, plus how to build the repeat and test it for visible seams.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [artist, individual]
stack: [midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [topic]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [surface-pattern, seamless-repeat, colourways, textile-design, print-on-demand]
pairs_with:
  prompts: [build-image-style-guide, write-product-mockup-prompt]
args:
  - name: motif
    description: What the pattern is made of and the feel you want, e.g. "lemons and leaves, Mediterranean summer", "tiny geometric stars", "foxes in a winter forest".
    type: string
    required: true
  - name: repeat
    description: "How the tile repeats. block: straight grid. half-drop: each column shifted down by half a tile, which hides the grid. mirror: tile flipped to make symmetrical repeats."
    type: enum
    enum: [block, half-drop, mirror]
    default: half-drop
  - name: colourways
    description: How many colour versions of the same pattern to plan.
    type: number
    default: 3
  - name: use
    description: Where the pattern will be printed. Sets motif scale and file notes.
    type: enum
    enum: [fabric, wallpaper, stationery, print-on-demand]
    default: fabric
output_contract:
  format: markdown
  sections: [Pattern spec, Tile prompt, Colourways, Building the repeat, Seam test, Print notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a surface pattern designer. A repeat pattern sells when the eye sees an all-over design rather than a grid of tiles: motifs in two or three sizes, spacing that avoids clumps and empty holes, no accidental stripes or "tracks", and nothing that betrays the tile edge. Generators produce single images, not repeats. Some tools have a tiling option that makes the edges wrap; without one, the tile must be fixed in an editor with an offset. Half-drop and mirror repeats are built from a finished square tile in an editor, not generated directly. Pattern artwork also needs flat, even light with no perspective, vignette or cast shadows, or the seams show. Scale depends on use: small, dense motifs for clothing and stationery, larger motifs with more breathing room for wallpaper and furnishings.

Motif: {{motif}}
Repeat: {{repeat}}
Colourways: {{colourways}}
Use: {{use}}
</context>

<task>
1. **Pattern spec.** The motifs (one hero, one or two secondary, one small filler), their relative sizes, the density and spacing, the drawing style, a palette of four to six named colours, and the motif scale suited to {{use}} in centimetres or inches at final print size. If the motif is too vague to draw (for example "something pretty"), ask one question and stop.
2. **Tile prompt.** One prompt for a square tile: the motifs and their sizes, "evenly scattered, tossed layout, varied rotation", flat even lighting, flat 2D, top-down, no perspective, no shadows, no vignette, a plain background colour, motifs not cut off at the edges, and "seamless tileable pattern" with the advice to turn on the tool's tiling option if it has one.
3. **Colourways.** {{colourways}} palettes for the same artwork, each with named colours and the background. Keep the value contrast similar across colourways so the pattern reads the same. Suggest recolouring the approved tile in an editor rather than regenerating, so the drawing stays identical.
4. **Building the repeat.** Steps to make the tile seamless (offset by half its width and height, repair the cross-shaped seam, offset back), then how to make a {{repeat}} repeat from it.
5. **Seam test.** How to check: tile the result 3 by 3 or larger and view it at small and full size.
6. **Print notes** for {{use}}: resolution at final size (usually 150 to 300 dpi; check the printer's spec), the repeat size the printer or platform requires, and colour shift between screen and material, with a reminder to order a sample swatch.
</task>

<constraints>
- Original motifs only. No logos, characters or copies of a named designer's or brand's recognisable pattern.
- No directional light, perspective or text in the artwork.
- Do not promise that a generated tile is seamless; always include the offset repair and the seam test.
</constraints>

<output_format>
## Pattern spec
## Tile prompt
One code block.
## Colourways
Table: Colourway name | Background | Motif colours.
## Building the repeat
Numbered steps.
## Seam test
A checklist: no visible tile edges, no stripes or tracks, no clumps or holes, no motif cut oddly, scale right at final size.
## Print notes
</output_format>
