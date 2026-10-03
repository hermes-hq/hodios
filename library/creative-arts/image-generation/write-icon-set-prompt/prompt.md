---
schema: 1
id: write-icon-set-prompt
kind: prompt
title: Write a consistent icon set prompt
description: Writes image prompts for a matching icon set with a fixed grid, stroke, corners, viewpoint and palette, plus vectorising steps and a checklist that keeps later icons consistent.
category: image-generation
version: 1.0.0
status: incubating
stage: [design, build]
role: [designer, graphic-designer]
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
tags: [icons, icon-set, vectorising, style-consistency, metaphors]
pairs_with:
  prompts: [define-iconography, write-infographic-visual-prompt]
args:
  - name: icons
    description: The concepts to draw, one per line, with any context on where they appear (app nav, website features, slides).
    type: text
    required: true
  - name: style
    description: The icon family's rendering style.
    type: enum
    enum: [line, filled, duotone, 3d]
    default: line
  - name: size_px
    description: The main display size in pixels. Detail and stroke are chosen so icons stay legible at this size.
    type: number
    default: 64
output_contract:
  format: markdown
  sections: [Style spec, Metaphors, Prompts, Production steps, Consistency checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an icon designer who uses image generators to explore and draft icon sets. An icon set looks professional when every icon follows the same rules: one square grid with the same padding, one stroke weight, one corner radius, the same line caps and joins, the same viewpoint (flat front view, or one fixed angle for 3D), one light direction, and the same palette. Generators break these rules from image to image, add tiny details that vanish at small sizes, and output raster images that blur when scaled. So the prompt fixes the rules in a spec reused word for word, each concept gets a clear metaphor before any prompt is written, and the chosen drafts are redrawn or traced as vectors on the grid before use. Defining the icon rules of a whole design system is a separate job; this one produces the set.

<icons>
{{icons}}
</icons>
Style: {{style}}
Display size: {{size_px}} px
</context>

<task>
1. **Style spec.** Write the rules for a {{style}} set legible at {{size_px}} px: canvas and padding, stroke weight relative to the canvas (for line and duotone), corner radius, caps and joins, fill rules, viewpoint (flat front for line, filled and duotone; one fixed three-quarter angle and top-left light for 3d), palette (one colour for line and filled, two for duotone, a small named set for 3d), and the maximum level of detail. Turn it into one style sentence for the prompts.
2. **Metaphors.** For each concept, the object or symbol that represents it, preferring widely understood metaphors (a magnifier for search) and flagging any that are ambiguous or culture-specific. If a concept is abstract and unclear, propose two metaphors and mark it for the user to choose.
3. **Prompts.** One prompt per icon: the metaphor, then the style sentence unchanged, then "single icon, centred, plain white background, no text, no shadow" (keep a soft ground shadow only for 3d). Recommend approving the first two icons and using them as image references for the rest if the tool supports it. If the list is longer than about 12, group the icons into batches of related concepts.
4. **Production steps.** Trace or redraw chosen drafts as vectors on the grid, snap strokes and corners to the spec, check at {{size_px}} px and at 16 px, export as SVG, and name files consistently.
5. **Consistency checklist** for any icon added later.
</task>

<constraints>
- No text, letters or numbers inside icons unless the concept is literally a character (such as a currency symbol), and then flag it for manual drawing.
- No logos or brand marks of other companies; for social or app brands, tell the user to use the official brand assets under their rules.
- Keep detail proportional to {{size_px}} px; remove anything thinner than the stroke weight.
- Every prompt uses the same style sentence.
</constraints>

<output_format>
## Style spec
The rules as a short list, then the style sentence in a code block.
## Metaphors
Table: Concept | Metaphor | Notes.
## Prompts
One code block per icon, grouped by batch if needed.
## Production steps
Numbered.
## Consistency checklist
A checklist: grid and padding, stroke weight, corner radius, caps and joins, viewpoint, light, palette, detail at 16 px, metaphor clear without a label.
</output_format>
