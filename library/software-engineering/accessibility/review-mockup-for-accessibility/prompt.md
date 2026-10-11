---
schema: 1
id: review-mockup-for-accessibility
kind: prompt
title: Review a design mockup for accessibility before build
description: Reviews a design mockup or prototype before it is built for contrast, focus order, target size, missing states, heading structure and the annotations engineers will need.
category: accessibility
version: 1.0.0
status: incubating
stage: [design, review]
role: [designer, frontend-engineer, product-manager]
requires: [none]
inputs: [image, spec, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [design-review, wcag, contrast, focus-order, target-size, shift-left]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [write-accessibility-annotations, review-color-contrast, critique-ui-screen, write-accessibility-acceptance-criteria]
args:
  - name: design
    description: The mockup as an image or screenshots, or a written description of each screen with colours (hex values), text sizes and component names.
    type: text
    required: true
  - name: purpose
    description: What the screen or flow is for and who uses it, for example "checkout step 2 for returning customers on mobile".
    type: string
    required: true
  - name: design_system
    description: The design system or component library the build will use, if any, so known-good components are not re-reviewed.
    type: string
output_contract:
  format: markdown
  sections: [Blocking issues, Issues to fix before handoff, Missing states and screens, Questions for the designer, Annotations engineering will need]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most accessibility bugs that reach an audit were decided in the design file: grey placeholder text at 2.5:1, a red outline as the only error signal, an icon-only toolbar with no names, a card where the whole surface and a button inside it are both clickable, a focus order the layout cannot express. Fixing them in design costs minutes; fixing them after build costs a sprint. A static mockup cannot show everything, so a good review also lists what is missing: focus, hover, error, disabled, loading and empty states, the 320 px reflow, zoomed text, and what a screen reader should announce. Contrast must be checked on real hex values, not by eye: 4.5:1 for body text, 3:1 for large text (24 px, or 18.66 px bold) and for UI component boundaries, icons and focus indicators that carry meaning. Target size under WCAG 2.2 (2.5.8) is 24 by 24 CSS px minimum or enough spacing; 44 px is the comfortable figure most platform guidelines use.
</context>

<task>
Review this design for accessibility before it is built.

Purpose: {{purpose}}
{{#design_system}}
Design system: {{design_system}}
{{/design_system}}

<design>
{{design}}
</design>

1. Describe in two or three lines what you can see and what you cannot (for example "no hex values given", "only the default state shown"). Base every finding on what is in the design; mark anything you infer.
2. Check text and non-text contrast for each colour pair you can identify, with the ratio when hex values are given and "needs measuring" when they are not. Include placeholder text, disabled-looking but active controls, text over images, focus indicators and input borders.
3. Check use of colour: is any status, error, required field, selected state, link or chart series shown by colour alone?
4. Check structure: one clear page heading, a heading hierarchy that matches the visual one, obvious landmark regions (header, navigation, main, footer), and a reading and focus order that follows the layout. Flag layouts where the visual order and the likely DOM order will disagree.
5. Check controls: visible labels on inputs (not placeholder-only), icon-only buttons that need a name, link text that makes sense out of context, target size and spacing, nested clickable areas, custom controls that imitate native ones.
6. Check content: instructions that rely on shape, position or colour ("click the green button on the right"), text inside images, motion or autoplay, time limits, and plain language on errors.
7. List the states and screens the design must add before handoff: focus, hover, active, disabled, error, success, loading, empty, long text and translation overflow, 200% text and 320 px width.
8. Rank findings: blocking (someone cannot complete the task), fix before handoff, and nice to have. Give a concrete design change for each.
9. List the annotations engineering will need (a short list here, not the full handoff annotation set): accessible names for icon buttons, heading levels, focus order where it is not obvious, what gets announced on dynamic changes, and which native element each custom control should be.
</task>

<constraints>
- Do not report a contrast ratio you did not compute from given values; say "needs measuring" instead.
- Do not redesign the screen; propose the smallest change that keeps the designer's intent and brand.
- Do not claim WCAG conformance for a design; a design review reduces risk, the built product is what conforms or not.
- Name the WCAG 2.2 success criterion for each finding where one applies.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Blocking issues
Numbered: issue, where on the screen, who it blocks, WCAG criterion, design change.

## Issues to fix before handoff
Same format, ranked.

## Missing states and screens
Checklist.

## Questions for the designer
Bullets, only for decisions the design does not show.

## Annotations engineering will need
Bullets grouped by component.
</output_format>
