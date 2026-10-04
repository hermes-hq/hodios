---
schema: 1
id: write-accessibility-acceptance-criteria
kind: prompt
title: Write accessibility acceptance criteria
description: Turns a user story or design into testable accessibility acceptance criteria per component, mapped to WCAG success criteria, so QA and developers can check them before merge.
category: accessibility
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, qa-engineer, frontend-engineer, designer]
requires: [none]
inputs: [ticket, spec, image, text]
output: [checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [wcag, definition-of-done, ticket-writing, shift-left, testability]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [write-acceptance-criteria, write-screen-reader-test-plan, audit-web-accessibility]
args:
  - name: story
    description: The user story, ticket or design description, including the components on the screen and what happens when the user acts (errors, loading, success). A design link description or screenshot notes are fine.
    type: text
    required: true
  - name: wcag_level
    description: The conformance level the team targets.
    type: enum
    enum: [AA, AAA]
    default: AA
output_contract:
  format: markdown
  sections: [Components found, Acceptance criteria, Out of scope, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most accessibility bugs are designed in or built in, then found in an audit months later, when they cost ten times more to fix. Teams that write accessibility acceptance criteria on the ticket catch them before merge. Bad criteria fail in two ways: "Must be accessible" or "Meets WCAG 2.2 AA" (untestable; nobody knows what to check), and a pasted list of all 55 success criteria on every ticket (noise; ignored by the second sprint). Good criteria are specific to the components in this story, written as observable behaviour a tester can pass or fail with a keyboard, a screen reader and browser zoom, and each traces to a success criterion.
</context>

<task>
Write accessibility acceptance criteria for this story at WCAG 2.2 level {{wcag_level}}:

<story>
{{story}}
</story>

1. List the components and states in the story: each control, form field, dynamic region, dialog, image, media and message, and the states it passes through (empty, loading, error, success, disabled).
2. For each component, write only the criteria that apply, as Given/When/Then or short "Then" statements a tester can verify. Cover the relevant areas:
   - Keyboard: reachable, operable with the expected keys, logical order, no trap, visible focus, where focus goes after the action.
   - Name, role, state: what a screen reader announces, written as the expected announcement ("Announced as 'Delivery date, edit text, required'").
   - Announcements: what is announced on async changes, errors and success, and with what politeness.
   - Visual: text contrast 4.5:1, non-text contrast 3:1, no meaning by colour alone, target size at least 24 by 24 CSS px, reflow at 320 px and 400% zoom, text spacing.
   - Motion and time: reduced-motion behaviour, no time limits or adjustable ones.
   - Forms: visible labels, instructions, error identification and suggestion, no redundant entry, accessible authentication if a login or code is involved.
   - Content: alt text required for which images, captions or transcript for which media, headings and page title.
   - If the level is AAA, add the AAA criteria that apply (for example 7:1 contrast, 44 by 44 px targets, no timing, re-authentication without data loss).
3. Give every criterion an id (AC-1, AC-2), the WCAG success criterion number, and how to test it (keyboard, screen reader, zoom, contrast tool, automated).
4. Mark which criteria an automated test can enforce and which need a manual check.
5. List what the story does not specify but must decide (for example the error message wording or where focus lands after saving) as questions, not assumptions.
</task>

<constraints>
- Write criteria only for components in the story. No generic WCAG checklist.
- Each criterion is pass or fail by observation; no "should be easy to use".
- Do not invent product behaviour the story does not describe; ask in Questions.
- At most 25 criteria; if the story needs more, say it should be split.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Components found
Bullets: component and its states.

## Acceptance criteria
Grouped by component. Table per component: ID | Criterion | WCAG SC | How to test | Automatable (yes or no).

## Out of scope
One line each: related checks that belong to other tickets (for example site-wide header).

## Questions
Numbered decisions the product owner or designer must make.
</output_format>
