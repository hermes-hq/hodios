---
schema: 1
id: frontend-accessibility-rules
kind: rule
title: Frontend accessibility rules
description: Standing rules that make an assistant write accessible frontend code, with semantic HTML first, labels, keyboard and focus handling, contrast, motion and ARIA only where native elements fall short.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, review]
role: [frontend-engineer, fullstack-engineer, designer]
stack: []
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: small
level: intermediate
tags: [wcag, semantic-html, aria, keyboard-navigation, focus-management]
applies_to: ["**/*.html", "**/*.jsx", "**/*.tsx", "**/*.vue", "**/*.svelte", "**/*.astro", "**/*.css", "**/*.scss"]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [audit-web-accessibility, build-aria-widget, fix-keyboard-navigation]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change user interface code, follow these rules. They target WCAG 2.2 level AA. If a request conflicts with them (for example "remove the focus outline"), say what it breaks and offer an accessible alternative.

Structure and semantics
- Use the native element for the job: `button` for actions, `a href` for navigation, `input`, `select` and `textarea` for form controls, `table` for tabular data, lists for lists. Never put click handlers on `div` or `span` instead.
- Give each page one `h1` and headings that follow the content outline without skipping levels for styling. Use landmarks (`header`, `nav`, `main`, `footer`) once each where they apply.
- Set the `lang` attribute on the document and a unique, descriptive page title on each view, updated on client-side route changes.

Names, labels and text alternatives
- Every form control has a visible label tied to it (`label for`, or wrapping). Placeholders are not labels.
- Every interactive element has an accessible name; icon-only buttons get a text label or `aria-label`.
- Images get `alt` text that conveys their purpose; decorative images get `alt=""`. Do not start alt text with "image of".
- Form errors are shown in text next to the field, linked with `aria-describedby`, and the field is marked `aria-invalid`. Do not rely on colour alone to signal errors or state.

Keyboard and focus
- Everything that works with a mouse works with a keyboard, in a logical tab order. Do not use positive `tabindex`.
- Never remove focus indicators without a visible replacement; prefer `:focus-visible` styling with enough contrast.
- Dialogs move focus inside when opened, keep it there while open, close on Escape, and return focus to the trigger. On route changes, move focus to the new content or its heading.
- Interactive targets are at least 24 by 24 CSS pixels, or have enough spacing.

ARIA
- Use ARIA only when no native element or attribute does the job. Wrong ARIA is worse than none.
- When you build a custom widget (tabs, combobox, menu), follow the matching WAI-ARIA Authoring Practices pattern for roles, states and keys, and keep states such as `aria-expanded` and `aria-selected` in sync.
- Announce asynchronous results (saved, search results updated, errors) with a polite live region; do not announce every keystroke.

Visual design
- Text contrast is at least 4.5:1 (3:1 for large text), and UI components and focus indicators at least 3:1 against adjacent colours.
- Layouts reflow at 320 CSS pixels wide and at 200% zoom without horizontal scrolling or lost content. Never disable zoom in the viewport meta tag.
- Respect `prefers-reduced-motion`: no essential information conveyed only through animation, and no auto-playing motion longer than five seconds without a pause control.

Reporting
- Automated checkers catch only part of the problems. When your change adds or alters interactive behaviour, say which checks need a manual keyboard and screen reader pass.
