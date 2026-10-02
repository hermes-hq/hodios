---
schema: 1
id: write-screen-reader-test-plan
kind: prompt
title: Write a screen-reader test plan
description: Produces a manual screen-reader test script for a user flow on NVDA, JAWS, VoiceOver or TalkBack, with the keystrokes or gestures and expected announcements for each step.
category: accessibility
version: 1.0.0
status: incubating
stage: [verify]
role: [qa-engineer, frontend-engineer, mobile-engineer]
requires: [none]
inputs: [spec, text, url]
output: [checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [screen-reader, manual-testing, assistive-technology]
pairs_with:
  personas: [accessibility-specialist]
args:
  - name: flow
    description: The user flow to test, step by step, with the screens, controls and any dynamic updates (loading, errors, toasts).
    type: text
    required: true
  - name: screen_readers
    description: Screen readers to cover. Ones that do not exist on the chosen platform are dropped, with a note.
    type: string
    default: NVDA, VoiceOver, TalkBack
  - name: platform
    description: Where the flow runs.
    type: enum
    enum: [web, ios, android]
    default: web
output_contract:
  format: markdown
  sections: [Setup, Test script, Defect template, Coverage gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Testers new to screen readers tend to Tab through a page and call it done. Real users navigate by headings, landmarks, form fields and lists. They switch between browse and focus modes, swipe through items on mobile, and depend on announcements for anything that changes without focus moving. Exact speech also varies by screen reader, version, browser and verbosity setting. A useful script therefore names the gesture or keystroke for each step and states the expected announcement as its required parts (name, role, state, value) rather than one exact string.
</context>

<task>
Write a manual screen-reader test script for this {{platform}} flow:

{{flow}}

Screen readers requested: {{screen_readers}}.

1. Build the test matrix. Pair each screen reader with the browser or platform it is mainly used with: NVDA with Firefox or Chrome on Windows, JAWS with Chrome or Edge, VoiceOver with Safari on macOS, VoiceOver on iOS with Safari or the app, TalkBack with Chrome or the app on Android. Drop any that do not run on {{platform}} and say so.
2. Write the setup: the versions to record, default verbosity, the speech viewer or log to turn on (NVDA Speech Viewer, VoiceOver caption panel, TalkBack's developer setting for speech output), and resetting state between runs.
3. Start with orientation checks before the flow: the page or screen title is announced, the headings outline makes sense (H key or the rotor), landmarks are present and labelled, and the language is announced correctly.
4. For each step of the flow, write:
   - the action in each screen reader's own terms: NVDA and JAWS keys (H, D or R for landmarks, F for form fields, Tab, Enter, Space, Insert+F7 or Insert+F6 lists), VoiceOver keys (VO+Right Arrow, VO+Space, the rotor) or gestures (swipe right, double-tap, the rotor), and TalkBack gestures (swipe right, double-tap, reading controls);
   - the expected announcement as name, role, state and value, for example "Email, edit text, required, invalid entry";
   - the dynamic behaviour to confirm, such as where focus lands after a dialog opens or closes, a live-region announcement for async results, errors announced and linked to their field, and a loading state that is announced and then cleared;
   - the pass criterion and the WCAG success criterion it maps to.
5. Add negative checks: every control is reachable with the screen reader's standard navigation, not only by mouse or by touch exploration, decorative images are silent, and hidden content is not read out.
6. If the flow description leaves out what happens at a step (validation, a success message, a redirect), list it under Coverage gaps instead of inventing behaviour.
</task>

<constraints>
- Do not claim an exact announcement string unless the flow specifies the label text. Expected speech is the components, in any order the screen reader uses.
- Keystrokes must be real for the named screen reader. If unsure of one, say so rather than guess.
- Keep each step to one action, so a failure points to one place.
</constraints>

<output_format>
## Setup
| Screen reader | Browser or app | Platform | Settings to record |
Then the setup and reset steps.

## Test script
For each step:
| Step | Action (per screen reader) | Expected announcement | Also check | Pass criterion | WCAG SC |
Orientation checks come first.

## Defect template
Fields to fill for a failure: step, screen reader and version, browser, actual speech (copied from the log), expected, and severity.

## Coverage gaps
Unspecified behaviours and parts of the flow not covered.
</output_format>
