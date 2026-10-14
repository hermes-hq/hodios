---
schema: 1
id: build-accessible-slider
kind: prompt
title: Build an accessible single or range slider
description: Builds or fixes a single-value or range slider with native input where possible, full keyboard steps, readable value text, labels and a typed input alternative for precise values.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer]
stack: [javascript]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [code, tests]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [slider, range-input, aria-apg, keyboard, price-filter]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [build-aria-widget, audit-motor-accessibility, make-search-and-filters-accessible]
args:
  - name: slider
    description: What the slider controls (volume, price range, rating, zoom), min, max and step, single or range, and the existing component code or library.
    type: text
    required: true
  - name: framework
    description: The UI framework.
    type: string
    default: react
output_contract:
  format: markdown
  sections: [Approach, Implementation, Keyboard model, Tests and manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A native `input type="range"` already has the slider role, keyboard support and value reporting, and can be styled in all current browsers; it is the right start for single-value sliders. Custom sliders fail in the same places: the thumb is a `div` with no role or name; arrow keys do nothing; the value is read as a raw number when it means "£250" or "4 stars" (fix with `aria-valuetext`); Page Up and Page Down, Home and End are missing; the thumb is too small to grab; and the only way to set a value is dragging, which fails WCAG 2.5.7 (dragging movements) unless a single-pointer alternative exists, such as clicking the track or a typed input. Range sliders need two thumbs, each a separate slider with its own name ("Minimum price", "Maximum price"), whose min and max constrain each other without trapping the thumbs on top of each other. For precise values (prices, years), pairing the slider with labelled number inputs is the most usable option for everyone. Value changes while dragging should not trigger heavy work or announcements on every step; commit on release or after a pause.
</context>

<task>
Build or fix an accessible slider in {{framework}} for:

<slider>
{{slider}}
</slider>

1. Read the existing component or library. State the approach: native range input, two native range inputs for a range, or a custom ARIA slider, and why.
2. Implement names and values: a visible label, `aria-valuetext` (or a native equivalent) that reads the value in its real units, and min and max exposed.
3. Implement the keyboard model: arrows by one step, Page Up and Page Down by a larger step, Home and End to min and max; for range sliders, each thumb constrained by the other.
4. Provide single-pointer alternatives to dragging: clicking the track, plus labelled number or text inputs kept in sync for precise values. Make thumbs at least 24 by 24 CSS px with visible focus.
5. Debounce expensive updates (filtering results, network calls) until the user pauses or releases; keep announcements to the final value.
6. Check forced-colors mode and zoom; the track, thumb and focus must remain visible.
7. Write tests for names, value text, each key and the synced inputs; run them and report results.
</task>

<constraints>
- Do not build a custom slider when a native range input meets the requirements.
- Do not make dragging the only way to set a value.
- Do not add a new slider library without explaining why the native input or the current library cannot do it.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
Two or three sentences.

## Implementation
Code with file paths.

## Keyboard model
Table: key | action.

## Tests and manual check
Test code, command result, short manual steps with a screen reader and with keyboard only.
</output_format>
