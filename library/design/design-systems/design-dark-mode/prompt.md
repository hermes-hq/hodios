---
schema: 1
id: design-dark-mode
kind: prompt
title: Design a dark theme
description: Designs a dark theme from an existing light palette, covering surface elevation, semantic colour mapping, contrast checks, images, charts and token changes. Use when a design system adds dark mode.
category: design-systems
version: 1.0.0
status: incubating
stage: [design]
role: [designer, frontend-engineer, mobile-engineer]
requires: [none]
inputs: [text, config]
output: [table, config, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [dark-mode, theming, color-contrast, semantic-tokens, wcag]
pairs_with:
  prompts: [define-design-tokens, create-color-palette, audit-design-consistency]
  personas: [product-designer]
args:
  - name: light_palette
    description: The current palette with hex values - primitives (brand and neutral scales) and, if they exist, semantic tokens (background, surface, text, border, primary, status colours) and where each is used.
    type: text
    required: true
  - name: platforms
    description: Where the theme ships (web, iOS, Android, desktop, email) and whether users choose light, dark or follow the system. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Surfaces and elevation, Semantic token mapping, Contrast checks, Brand and status colours, Images and illustrations, Data visualisation, Platform notes, Rollout and QA]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Dark themes made by inverting colours fail in familiar ways: pure black backgrounds with pure white text that glare and smear on OLED screens, saturated brand colours that vibrate against dark grey, shadows that vanish so cards lose their edges, logos that disappear, charts whose colours become indistinguishable, and contrast that nobody measured. A dark theme is a second mapping of the same semantic roles, built on surfaces that express elevation and checked pair by pair for contrast.
</context>

<task>
Design a dark theme for this palette.

<light_palette>
{{light_palette}}
</light_palette>
{{#platforms}}
<platforms>
{{platforms}}
</platforms>
{{/platforms}}

1. **Approach.** If the palette has no semantic tokens, propose the semantic layer first (background, surface levels, text primary, secondary and disabled, border, primary and on-primary, focus, success, warning, danger, info, overlay) and map the light theme onto it, so both themes switch at the semantic level and components never reference primitives directly.
2. **Surfaces and elevation.** Choose a dark base that is a very dark grey, not pure black, unless the user wants a true-black OLED option (offer it as a variant). Define 3 to 5 surface levels where higher elevation is lighter, because shadows are hard to see on dark backgrounds; add subtle borders where adjacent surfaces need separation. Tint the neutrals slightly with the brand hue only if the light theme does.
3. **Semantic token mapping.** For every semantic token, give the light value, the dark value (reusing existing primitives where possible, or a new primitive marked "(new)"), and the reason. Text should not be pure white on large areas; use an off-white for primary text and lower-emphasis values for secondary text that still pass contrast.
4. **Contrast checks.** Compute the WCAG 2 contrast ratio for every text and UI pair in the dark theme: text on each surface level, on primary buttons, links, placeholder and disabled text, borders of inputs, focus rings and status colours on surfaces. Use relative luminance (linearise each sRGB channel: c/12.92 if c is 0.04045 or less, otherwise ((c + 0.055) / 1.055) ^ 2.4; L = 0.2126 R + 0.7152 G + 0.0722 B; ratio = (L1 + 0.05) / (L2 + 0.05)). Targets: 4.5:1 for normal text, 3:1 for large text and for UI components and meaningful graphics. Show each ratio to one decimal place, mark pass or fail, and fix every failure. Recommend confirming the final values with a contrast checker.
5. **Brand and status colours.** Use lighter, slightly less saturated tones of brand and status colours on dark surfaces so they keep contrast without vibrating. Check that on-primary text still passes on the adjusted primary. Keep the hue recognisable.
6. **Images and illustrations.** Logo variants for dark backgrounds, transparent images and icons with dark strokes, screenshots and product shots, illustrations that need a dark version, and whether to reduce the brightness of large photos.
7. **Data visualisation.** Re-check categorical and sequential chart palettes on the dark surface (distinguishability and 3:1 against the background), gridlines and axes at low emphasis, and that no chart relies on colour alone.
8. **Platform notes.** For the platforms given: on web, a theme attribute plus the `prefers-color-scheme` media query and the `color-scheme` property, and avoiding a flash of the wrong theme on load; on iOS and Android, mapping to the system's semantic or dynamic colours where the product uses them; email clients that invert colours unpredictably. Offer the choice of light, dark or system in settings.
9. **Rollout and QA.** Token changes to make, components most likely to break (anything with hard-coded colours, shadows or images), and a test checklist: each component in every state in both themes, dim and bright environments, OLED devices, increased-contrast settings and screenshots in documentation.
10. If the palette has no hex values, ask for them and stop; do not guess the colours.
</task>

<constraints>
- Do not claim a contrast ratio you did not compute from the hex values. If a value is unknown, write "to check".
- Do not invert the light theme; map each role deliberately.
- Keep the brand recognisable; do not introduce new hues without a reason.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections as `##` headings. The mapping as a table:
| Semantic token | Light | Dark | Primitive | Note |
The contrast checks as a table:
| Foreground | Background | Ratio | Target | Pass/fail | Fix |
End "Rollout and QA" with the token changes as a code block in the format the user's tokens use, or as JSON if unknown.
</output_format>
