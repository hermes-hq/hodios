---
schema: 1
id: check-ui-against-platform-conventions
kind: prompt
title: Check UI against platform conventions
description: Checks screens against iOS, Android or web conventions, flagging non-native patterns, missing system behaviours and unsupported accessibility settings, with a fix for each.
category: ui-design
version: 1.0.0
status: incubating
stage: [review]
role: [designer, mobile-engineer, frontend-engineer]
requires: [none]
inputs: [image, text, spec]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [platform-conventions, native-patterns, dynamic-type, system-behaviours, mobile-ui]
pairs_with:
  prompts: [critique-ui-screen, design-app-navigation, write-accessibility-annotations, design-permission-requests]
  personas: [product-designer]
args:
  - name: screens
    description: Screenshots or mockups, or a description of each screen - layout, controls, navigation, gestures, dialogs and how text is sized. Name the screens and the flow between them.
    type: text
    required: true
  - name: platform
    description: The platform to check against.
    type: enum
    enum: [ios, android, web]
    default: ios
output_contract:
  format: markdown
  sections: [Verdict, Findings, System behaviours, Accessibility settings, Intentional deviations, What to check next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cross-platform teams often design once and ship everywhere, which leaves iOS users with Android-style floating buttons and toasts, Android users with an on-screen back arrow that ignores the system back gesture, and web users with mobile pickers and no keyboard support. Non-native patterns cost learning time, break muscle memory and often break accessibility, because system controls come with screen-reader, text-size and contrast support that custom ones lack. A conventions check separates genuine problems from brand choices that are fine to keep, and covers the system behaviours people expect without noticing: back and dismiss gestures, text scaling, dark mode, the keyboard, safe areas, sharing and system permissions.
</context>

<task>
Check these screens against {{platform}} conventions.

<screens>
{{screens}}
</screens>

1. Identify each screen and its job. If you were given images, describe what you see before judging it; if a detail is not visible (for example, how a control behaves on tap), say "not visible" rather than assume.
2. Review against the conventions for {{platform}}:
   - **ios:** navigation bars and large titles, tab bars, back swipe from the edge, sheets and their dismiss gestures, action sheets and alerts, system pickers and menus, swipe actions in lists, SF Symbols-style iconography, safe areas and the home indicator, haptics, share sheet, and placement of primary actions.
   - **android:** top app bars, navigation bar or rail, the system back gesture and predictive back, floating action button use, bottom sheets, snackbars, dialogs, Material-style components and states, edge-to-edge layout with system bar insets, and intents for sharing.
   - **web:** semantic links versus buttons, browser back and URL state, focus styles and keyboard operation, native form controls, hover and focus parity, responsive breakpoints, text selection, opening in new tabs, and no reliance on gestures alone.
3. For each finding, give the screen, the element, the convention it breaks, the effect on users, a severity (high: breaks a task or accessibility; medium: confusing or slow; low: feels foreign), and the native alternative.
4. **System behaviours:** check what the screens show or imply about back and dismiss behaviour, keyboard handling (avoiding covered inputs, correct keyboard types, return key actions), orientation and large screens, dark mode, interruptions (calls, notifications), and system permission prompts.
5. **Accessibility settings:** check support for the platform's text scaling (iOS Dynamic Type, Android font scale, browser zoom to 200% and reflow at 320 CSS px), screen readers (VoiceOver, TalkBack, browser screen readers), reduced motion, increased contrast or forced colours, minimum touch target sizes (44 by 44 pt on iOS, 48 by 48 dp on Android, and at least 24 by 24 CSS px under WCAG 2.2), and colour not being the only signal.
6. **Intentional deviations:** list custom choices that are acceptable brand expression because they keep the expected behaviour, so the team does not "fix" them.
7. Before answering, re-check each high-severity finding against what is actually shown; downgrade or remove anything that rests on an assumption.
8. If the screens are missing or too thin to judge (one vague sentence), ask for screenshots or a fuller description and stop.
</task>

<constraints>
- Describe conventions in general terms and do not cite guideline version numbers; tell the reader to confirm details in the current platform guidelines.
- Do not mark a pattern wrong only because it differs from the default component; judge it by behaviour and user expectation.
- Keep the scope to platform fit; for a broader visual or hierarchy critique, point to a general UI critique instead.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Two or three sentences: how native the screens feel and the most important fix.
## Findings
| Screen | Element | Convention | Effect | Severity | Native alternative |
Sorted by severity.
## System behaviours
A checklist with pass, fail or not visible, and notes.
## Accessibility settings
A checklist with pass, fail or not visible, and notes.
## Intentional deviations
Bullets.
## What to check next
What can only be confirmed on a device or in a prototype.
</output_format>
