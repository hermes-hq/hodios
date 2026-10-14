---
schema: 1
id: design-focus-indicators
kind: prompt
title: Design focus indicators for a design system
description: Designs consistent keyboard focus indicators across a design system's components and themes, with focus tokens, WCAG contrast and size checks, and tricky cases like inputs and cards.
category: design-systems
version: 1.0.0
status: incubating
stage: [design, build]
role: [designer, frontend-engineer]
requires: [none]
inputs: [text, spec, image]
output: [docs, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [focus-visible, keyboard-navigation, wcag, contrast, focus-ring]
pairs_with:
  prompts: [fix-keyboard-navigation, support-forced-colors-mode, review-color-contrast]
  personas: [accessibility-specialist, design-systems-lead]
args:
  - name: context
    description: Themes and their background colours, the brand or accent colours, the components in scope, and the current focus style (or that there is none).
    type: text
    required: true
  - name: target_level
    description: Optional. Conformance target, e.g. "WCAG 2.2 AA" (default) or "WCAG 2.2 AAA where practical".
    type: string
output_contract:
  format: markdown
  sections: [Summary, Focus style, Tokens, Contrast checks, Component cases, Implementation notes, Testing, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Focus indicators are where design systems most often fail keyboard users: the browser default is removed for looks, each component invents its own ring, rings vanish on dark or brand-coloured surfaces, or they are clipped by `overflow: hidden` and hidden under sticky headers. The relevant WCAG 2.2 criteria are 2.4.7 Focus Visible (AA), 2.4.11 Focus Not Obscured (Minimum) (AA), 2.4.13 Focus Appearance (AAA, which asks for an indicator at least as large as a 2 CSS pixel perimeter with at least 3:1 contrast between focused and unfocused states), and 1.4.11 Non-text Contrast (AA, 3:1 for the indicator against adjacent colours). A two-tone ring (an outline in one colour with a contrasting gap or outer ring) stays visible on any background. Implementation details matter: `:focus-visible` shows rings for keyboard users without showing them on every click, `outline` survives Windows forced colors mode while `box-shadow` rings disappear, and `outline-offset` keeps the ring off the component's own border.
</context>

<task>
Design the focus indicators.

<context_from_user>
{{context}}
</context_from_user>

{{#target_level}}Target: {{target_level}}.
{{/target_level}}If no target is given, aim for WCAG 2.2 AA and meet the AAA focus appearance criterion where practical.

1. **Focus style.** One system-wide indicator: shape, width, offset, colours, and whether it is single or two-tone. Justify the choice against the themes and surfaces given.
2. **Tokens.** Semantic tokens for focus colour, inner or outer colour, width and offset, with values per theme. Mark proposals.
3. **Contrast checks.** Compute contrast of the indicator against every background in the context, per theme, and against the component's unfocused state. Show pass or fail and fix every failure.
4. **Component cases.** Buttons (including on brand-coloured backgrounds), text inputs (focus versus error versus hover, so focus is not just a border colour change), checkboxes and radios, links in text, cards and clickable rows, tabs, menu items (where focus may be shown as a highlighted item), and composite widgets with a roving focus.
5. **Implementation notes.** `:focus-visible`, outline versus box-shadow and forced colors mode, clipping by `overflow: hidden` and how to avoid it, `scroll-padding` for sticky headers so focus is not obscured, and focus within dialogs.
6. **Testing.** Keyboard walkthrough per theme, a forced colors check, zoom to 200 percent, and screenshots of each component's focus state for visual regression.
</task>

<constraints>
- Never recommend removing focus indicators or showing them only on hover.
- Compute contrast only from colours given; if colours are missing, ask for them or show the method and mark the result as unverified.
- Do not rely on colour change alone for focus on inputs; add a thickness or outline change.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Tokens and contrast checks as tables; a CSS excerpt in a fenced block. End with Open questions.
</output_format>
