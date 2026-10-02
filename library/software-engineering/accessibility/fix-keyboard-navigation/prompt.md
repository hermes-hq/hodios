---
schema: 1
id: fix-keyboard-navigation
kind: prompt
title: Fix keyboard navigation in a component
description: Finds and fixes keyboard barriers in a UI component, such as broken focus order, traps, invisible focus and mouse-only controls, and adds a keyboard test checklist.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, qa-engineer]
stack: [html-css]
requires: [repo-read, file-write]
inputs: [file]
output: [diff, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [keyboard, focus-management, wcag]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [build-aria-widget, audit-web-accessibility]
args:
  - name: component_code
    description: The component source, with its styles if focus styling is involved.
    type: text
    required: true
  - name: widget_type
    description: What the component is meant to be, for example "dropdown menu", "modal" or "data grid". Leave empty to infer it.
    type: string
output_contract:
  format: markdown
  sections: [Barriers, Fixed code, Keyboard test checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Keyboard access is the base layer for screen-reader users, switch and voice-control users, and people who cannot use a mouse. The barriers are usually small and mechanical: a `div` with a click handler, `outline: none` with no replacement, a positive `tabindex`, focus that falls to the top of the page when a dialog closes, a menu that opens only on hover, or a custom widget that ignores the arrow keys every other app uses for it.
</context>

<task>
Fix keyboard access in this component (widget type: {{widget_type}}; if empty, infer it from the code and say what you inferred):

{{component_code}}

1. Trace the component as a keyboard user would: Tab into it, operate each control with Enter, Space, the arrow keys and Escape as its role demands, and Tab out. Note each place this fails.
2. Check for these, citing the WCAG criterion for each failure:
   - Mouse-only controls (2.1.1): click handlers on non-focusable elements, hover-only reveals, drag-only actions without an alternative (2.5.7).
   - Traps (2.1.2): focus that cannot leave, or a modal that lets focus escape behind it.
   - Focus order (2.4.3): positive `tabindex`, DOM order that differs from visual order, and focusable elements that are hidden off-screen.
   - Focus visible (2.4.7) and not obscured (2.4.11): removed outlines, focus hidden behind sticky headers.
   - Focus management: where focus goes when content opens, closes, is deleted or loads.
   - Composite widgets: the expected keys from the WAI-ARIA Authoring Practices for this widget type, with one Tab stop for the group using roving `tabindex` or `aria-activedescendant`.
   - Single-character shortcuts (2.1.4) and context changes on focus (3.2.1).
3. Fix each barrier, preferring native elements: `button` and `a href` instead of handlers on `div`, `dialog` with `showModal()` for modals, and `inert` for background content. Use `:focus-visible` for focus styles with at least a 2 px outline that contrasts 3:1 with its surroundings.
4. Read keys with `event.key`, not the deprecated `keyCode`. Do not swallow Tab, and do not prevent default on keys you do not handle.
5. Keep the visual design and public API the same unless a fix requires a change. Note any change you had to make.
</task>

<constraints>
- Fix only keyboard and focus issues. List other accessibility problems you notice in one line each at the end.
- Never add `tabindex` greater than 0. Add `tabindex="0"` only to elements that need focus and have a role.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Barriers
| # | Problem | WCAG SC | Location | Fix |

## Fixed code
A unified diff against the given code, or the full component if the changes are extensive.

## Keyboard test checklist
| Step | Key | Expected result |
Covering entering, operating, leaving, and opening and closing every popup or dialog, ready for QA.
</output_format>
