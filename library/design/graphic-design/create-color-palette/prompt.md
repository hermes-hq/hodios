---
schema: 1
id: create-color-palette
kind: prompt
title: Create an accessible colour palette
description: Creates a brand colour palette with roles (primary, accents, neutrals, status), tonal scales and computed text-contrast results for every pairing. Use when building a brand or product colour system.
category: graphic-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, graphic-designer, founder, frontend-engineer]
requires: [none]
inputs: [text, preferences]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [color-palette, color-contrast, tonal-scale, brand-colors]
pairs_with:
  prompts: [review-color-contrast, define-design-tokens, pair-typefaces]
args:
  - name: brand_personality
    description: What the brand is, how it should feel, the audience and the industry, plus any colours to avoid.
    type: text
    required: true
  - name: base_colors
    description: Existing brand colours to build around, as hex values, e.g. "#0F766E primary". Optional; without it the palette starts from the personality.
    type: string
output_contract:
  format: markdown
  sections: [Direction, Palette, Scales, Contrast, Usage rules, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Generated palettes often look good as swatches and fail in use: the brand colour cannot carry white text, there is no neutral scale for real interfaces, status colours clash with the brand, and contrast is claimed rather than computed. A usable palette gives every colour a job, provides enough tints and shades to build interfaces and layouts, and shows the contrast of each text pairing with real numbers.
</context>

<task>
Create a colour palette for this brand.

<brand_personality>
{{brand_personality}}
</brand_personality>
Base colours: {{base_colors}} (if empty, choose them from the personality and explain the choice).

1. **Direction:** translate the personality into a colour direction (hue family, saturation, lightness, warm or cool neutrals) in 2 to 3 sentences, noting any colour conventions in the industry or audience to follow or avoid.
2. **Roles:** define primary, 1 to 2 accents, neutrals (slightly tinted towards the primary hue unless a pure grey is wanted), and status colours: success, warning, danger, info. Status colours must be distinguishable from the brand colours and from each other. Keep any given base colours exactly; adjust only the colours you add.
3. **Scales:** build a tonal scale of 10 steps (50 to 900) for primary, neutral and each status hue, spaced evenly in perceived lightness (use OKLCH lightness steps, keeping hue steady), and give hex values.
4. **Contrast:** compute the WCAG 2 contrast ratio for every text pairing you recommend: body text on each background, text on the primary button, link colour on the background, and status text or icons on their tinted backgrounds. Use relative luminance from linearised sRGB (channel c/255; if at most 0.04045 divide by 12.92, else ((c + 0.055) / 1.055) ^ 2.4; L = 0.2126 R + 0.7152 G + 0.0722 B) and ratio = (L1 + 0.05) / (L2 + 0.05). Truncate to two decimals. Mark each pass or fail against 4.5:1 for normal text, 3:1 for large text and UI components.
5. **Fix failures** by choosing a darker or lighter step from the same scale, not by changing the hue.
6. **Usage rules:** proportions (for example mostly neutrals, primary for actions and key moments, accents sparingly), which step to use for text, backgrounds, borders and hover, and what never to do (such as status red for decoration).
7. **Colour-vision check:** say where the palette relies on red versus green or other confusable pairs, and require a second cue (icon, label, pattern) there.
8. If the personality is too vague to pick a direction ("nice colours"), ask 2 to 3 questions about audience, feeling and competitors, then stop.
</task>

<constraints>
- Show computed ratios. If you cannot compute reliably, say so and mark the pair "to verify" instead of guessing.
- Never round a ratio up to a pass (4.47 is a fail).
- Do not describe colours with emotional claims as fact ("blue builds trust"); call them associations that vary by culture.
{{> output/uncertainty}}
</constraints>

<output_format>
## Direction
## Palette
| Role | Name | Hex | Use |
## Scales
One table per hue: | Step | Hex | Typical use |
## Contrast
| Foreground | Background | Ratio | Normal text | Large text and UI |
## Usage rules
## Notes
Assumptions, colour-vision notes, and pairs still to verify.
</output_format>
