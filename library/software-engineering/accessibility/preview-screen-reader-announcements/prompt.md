---
schema: 1
id: preview-screen-reader-announcements
kind: prompt
title: Preview screen reader announcements
description: Predicts what a screen reader would announce as you tab and arrow through markup or a component, explains why, and flags confusing announcements. For learning, not a substitute for real testing.
category: accessibility
version: 1.0.0
status: incubating
stage: [learn, build]
role: [frontend-engineer, designer, student]
stack: [html-css]
requires: [none]
inputs: [file, text]
output: [explanation, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [accessible-name, accessibility-tree, aria, nvda, voiceover, talkback]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [write-screen-reader-test-plan, build-aria-widget, audit-web-accessibility]
args:
  - name: markup
    description: The HTML or component code to preview (JSX, Vue or Svelte templates are fine), with any ARIA attributes and the CSS that hides or shows content.
    type: text
    required: true
  - name: reader
    description: The screen reader to approximate. Generic gives the shared role, name and state model.
    type: enum
    enum: [generic, nvda, voiceover, talkback]
    default: generic
output_contract:
  format: markdown
  sections: [Accessibility tree, Announcements, What sounds wrong, Try it for real]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Developers who have never used a screen reader write markup by how it looks. They do not hear that an icon button reads "button" with no name, that `aria-label` on a `div` is often ignored, that a placeholder is a poor label, that `display: none` hides content from everyone while a `.sr-only` class hides it only from sight, or that "Read more, link" repeated ten times is useless when someone lists all links. Predicting the announcement teaches the model behind it: every element exposes a role, a name (computed by the accessible name algorithm: `aria-labelledby`, then `aria-label`, then native label or content, then `title`), states and a description. Screen readers then phrase and order these differently, and verbosity settings change the words, so a prediction is a teaching aid, not proof.
</context>

<task>
Preview what a {{reader}} screen reader user would hear for this markup:

<markup>
{{markup}}
</markup>

1. Build the accessibility tree as a short indented outline: role, accessible name and where it came from, states (expanded, checked, selected, disabled, invalid, required, current), and description. Skip generic containers that are not exposed. Mark anything hidden (`hidden`, `display: none`, `aria-hidden="true"`, `inert`) and anything visually hidden but exposed.
2. Walk through it twice, as a user would:
   - Tab order: each focusable element in order, with the announcement.
   - Reading order (arrow keys or swipe): every exposed item, including headings, landmarks and plain text.
   Write announcements in the typical form for {{reader}} (for example NVDA: "Search, edit, required"; VoiceOver: "Search, required, search text field"; TalkBack: "Search, edit box, required"). For generic, use "name, role, state".
3. Mention the quick-navigation lists a user would see: headings list, landmarks, links list, form fields.
4. Explain each announcement that would surprise a sighted developer, in one or two sentences: why it sounds that way and which rule or attribute causes it.
5. Flag problems in plain language: missing or duplicate names, names that do not match the visible label, roles that lie about behaviour, missing states, content read twice, important content hidden, and noise (decorative icons or emoji read aloud). Give the minimal fix for each.
</task>

<constraints>
- Do not claim exact output: wording, punctuation and order vary by reader version, browser and verbosity settings. Say so once, not on every line.
- Explain in plain words; define role, name and state the first time you use them.
- If behaviour depends on script you cannot see (for example a state that changes on click), describe the state before and after and say what you assumed.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Accessibility tree
An indented outline, at most 30 lines.

## Announcements
Table: Step | Key (Tab, Down arrow, swipe) | Announcement | Why.

## What sounds wrong
Numbered: problem, who it confuses, minimal fix as a code snippet.

## Try it for real
Three to five steps to check the prediction with the real {{reader}} screen reader (or NVDA on Windows and VoiceOver on macOS for generic): how to start it, the keys to use, and the browser's accessibility inspector.
</output_format>
