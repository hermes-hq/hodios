---
schema: 1
id: build-accessible-drag-and-drop
kind: prompt
title: Build accessible drag and drop
description: Builds or fixes drag-and-drop reordering, kanban moves or file drops so keyboard, screen-reader, voice and single-pointer users can do the same task, with announcements and a non-drag alternative.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
requires: [none]
inputs: [file, text, spec]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [drag-and-drop, sortable-list, kanban, live-regions, dragging-movements, keyboard]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [audit-motor-accessibility, build-aria-widget, fix-keyboard-navigation]
args:
  - name: interaction
    description: What gets dragged where, for example "reorder rows in a playlist", "move cards between kanban columns" or "drop files to upload". Include the current code if there is any.
    type: text
    required: true
  - name: framework
    description: Optional. UI framework and any drag-and-drop library in use, so the answer fits it.
    type: string
output_contract:
  format: markdown
  sections: [Interaction model, Code, Announcements, Test checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Drag and drop is one of the most common mouse-only barriers. WCAG 2.5.7 Dragging Movements requires a single-pointer alternative to any drag (tap to pick up and tap to place, or move buttons), 2.1.1 Keyboard requires the task to be possible from the keyboard, and 4.1.3 Status Messages applies to the "moved to position 3 of 8" feedback. `aria-grabbed` and `aria-dropeffect` are deprecated and unsupported, so they are not the answer. Patterns that work in practice: an explicit "Move" button or menu per item with "Move up", "Move down", "Move to column..." options; a keyboard pick-up mode (Space to lift, arrows to move, Space to drop, Escape to cancel) with live-region announcements; and for file drop zones a real file input button. Many libraries ship partial support (keyboard sensors, announcement hooks) that is off or incomplete by default. Focus must stay on the moved item after the move, or users lose their place.
</context>

<task>
Interaction: {{interaction}}
{{#framework}}
Framework and library: {{framework}}
{{/framework}}

1. Define the interaction model for each input method: mouse and touch drag (kept), single-pointer alternative without dragging, keyboard (pick up, move, drop, cancel), screen reader (instructions, item position, result) and voice control (visible, named controls).
2. Choose the simplest model that covers all of them. Prefer visible move controls or a menu; add a keyboard drag mode only when frequent reordering makes menus too slow. Say why.
3. Write the code: semantic list or grid markup, buttons with names that include the item ("Move Budget review up"), the keyboard mode if chosen, focus management that keeps focus on the moved item, and a polite live region for status. If a library is in use, use its accessibility hooks and say which defaults must be changed.
4. Write the announcement strings for pick-up, each move, drop, cancel and boundary cases (already at the top, column full), including the position ("3 of 8") and destination name.
5. Handle edge cases: virtualised or paginated lists, moves that fail on the server (announce and restore), and touch screen readers where drag gestures conflict with screen-reader gestures.
6. Give a test checklist for keyboard only, NVDA or JAWS with a browser, VoiceOver on iOS, voice control and a single tap.
</task>

<constraints>
- Do not use `aria-grabbed` or `aria-dropeffect`.
- Do not remove the mouse drag; add alternatives alongside it.
- Do not claim a specific library version supports something unless you are sure; mark it to verify.
- Keep announcements short and specific; no announcement on every pointer move.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Interaction model
Table: Input method | How the user moves an item | Feedback.

## Code
Markup, handlers and focus logic, ready to adapt.

## Announcements
Table: Event | Text.

## Test checklist
Steps per input method.
</output_format>
