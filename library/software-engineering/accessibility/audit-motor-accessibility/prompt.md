---
schema: 1
id: audit-motor-accessibility
kind: prompt
title: Audit motor accessibility
description: Audits a web or mobile UI for people using voice control, switch access, head pointers or one hand, covering label-in-name, target size, gestures, dragging and timing, with code fixes.
category: accessibility
version: 1.0.0
status: incubating
stage: [review, build]
role: [frontend-engineer, mobile-engineer, designer]
requires: [none]
inputs: [file, image, text]
output: [report, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [voice-control, switch-access, target-size, gestures, label-in-name, wcag]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [fix-keyboard-navigation, audit-mobile-accessibility, audit-web-accessibility]
args:
  - name: ui_code
    description: The screen or component code, or a description of its controls, gestures, drag interactions and any timeouts. A screenshot description with sizes helps.
    type: text
    required: true
  - name: platform
    description: Where it runs, which sets the target sizes and assistive features to test with.
    type: enum
    enum: [web, ios, android]
    default: web
output_contract:
  format: markdown
  sections: [Summary, Findings, Fixes, Test with assistive input]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Keyboard access is necessary but not enough for people with motor disabilities. Voice-control users (Voice Control on iOS and macOS, Voice Access on Android, Dragon or Windows Voice Access on desktop) say what they see: "Tap Send". If the accessible name is "submit-btn-2" or "Paper plane icon", nothing happens. Switch users scan through every control one by one, so a screen with 60 focusable items is exhausting and a carousel that moves on its own is impossible. People with tremor or using a head pointer miss small, tightly packed targets and cannot complete precise drags, pinches or long presses. A good audit checks these specific barriers, not only tab order.
</context>

<task>
Audit this {{platform}} UI for motor accessibility:

<ui_code>
{{ui_code}}
</ui_code>

1. List interactive elements with their visible label, accessible name, size and spacing (as far as the code shows).
2. Check, citing the criterion:
   - Label in name (2.5.3): the accessible name contains the visible label text, ideally starting with it. Icon-only controls have a short name a user would guess and say ("Search", not "Magnifying glass").
   - Target size (2.5.8, AA): at least 24 by 24 CSS px or enough spacing; recommend 44 by 44 pt on iOS and 48 by 48 dp on Android, and 44 by 44 px for primary web actions (2.5.5, AAA).
   - Pointer gestures (2.5.1): multi-point or path-based gestures (pinch, two-finger swipe, swipe patterns) have a single-pointer alternative such as buttons.
   - Dragging (2.5.7): every drag (reorder, slider, map pan, kanban move) has a non-drag alternative such as move up and down buttons or a menu.
   - Pointer cancellation (2.5.2): actions fire on up-event, so a slip can be undone; no destructive action on down-event.
   - Motion actuation (2.5.4): shake-to-undo or tilt has a button alternative and can be turned off.
   - Timing (2.2.1): toasts with actions, auto-advancing content and timeouts are adjustable or long enough.
   - Scanning load: the number of focus stops before the main action, repeated controls that could be combined, and a skip mechanism.
   - Hover and long-press-only actions: provide a visible control or menu equivalent.
   - Accidental activation: destructive actions are separated from frequent ones and confirm or undo.
3. Fix each issue with code for {{platform}}: names (`aria-label` that starts with the visible text, `accessibilityLabel`, `contentDescription`), size via padding or hit-area extension without changing layout, alternatives for gestures and drags, `onClick` instead of `onPointerDown`, accessibility actions (`accessibilityCustomActions` on iOS, `AccessibilityAction` or Compose `customActions` on Android) for swipe-to-delete.
</task>

<constraints>
- Keep visual design where possible; enlarge hit areas before enlarging visuals.
- Do not remove gestures power users like; add alternatives.
- If sizes or names cannot be determined from the input, mark them "needs measuring" rather than guessing.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Summary
The two or three barriers that would stop a voice or switch user, in two to four sentences.

## Findings
Table: # | Element | Problem | WCAG SC | Who is affected (voice, switch, pointer, one-handed) | Severity.

## Fixes
Code for {{platform}}, grouped by finding number.

## Test with assistive input
Numbered steps for the platform's voice control and switch access, plus a target-size check, with expected results.
</output_format>
