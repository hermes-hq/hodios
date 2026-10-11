---
schema: 1
id: fix-page-structure-and-landmarks
kind: prompt
title: Fix page structure and landmarks
description: Repairs a page's skeleton for screen-reader navigation, covering title, language, heading outline, landmarks, skip link and list semantics, with corrected markup and a heading and landmark map.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [html-css]
requires: [none]
inputs: [file, text]
output: [code, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [headings, landmarks, skip-link, semantic-html, page-title, screen-reader]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [audit-web-accessibility, fix-spa-route-announcements, preview-screen-reader-announcements]
args:
  - name: markup
    description: The rendered HTML of the page or layout template (header, navigation, main area, sidebars, footer). Rendered output is better than component source when they differ.
    type: text
    required: true
  - name: page_purpose
    description: Optional. What the page is for and its main sections, for example "product listing with filters, results grid and pagination".
    type: text
output_contract:
  format: markdown
  sections: [Current outline, Problems, Fixed markup, Target outline, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Screen-reader users rarely read a page top to bottom. They jump by heading (H key in NVDA and JAWS, the rotor in VoiceOver), by landmark (D or the landmarks list), and they hear the page title first. A page with headings chosen for font size, everything in `div`s, three unlabelled `nav` elements and no `main` is navigable only by tabbing through every link. The relevant criteria are 2.4.2 Page Titled, 3.1.1 Language of Page, 1.3.1 Info and Relationships, 2.4.1 Bypass Blocks and 2.4.6 Headings and Labels. Experts know the details novices miss: one `h1` that names the page, no skipped levels going down, headings for sections not for styled callouts, `header` and `footer` only map to banner and contentinfo when not nested in sectioning elements, repeated landmarks of the same type need distinct labels, a skip link must move focus to a target that exists, and `role="presentation"` on a list or `list-style: none` in Safari can remove list semantics.
</context>

<task>
<markup>
{{markup}}
</markup>
{{#page_purpose}}
Page purpose: {{page_purpose}}
{{/page_purpose}}

1. Extract the current outline as a screen reader would present it: the `title`, the `lang` attribute, every heading with its level and text, and every landmark with its role and accessible name.
2. List the problems: missing or generic title, missing or wrong `lang`, missing or multiple `h1`, skipped levels, headings used for visual style, real section titles that are not headings, missing `main`, content outside any landmark, duplicate unlabelled landmarks, `role` attributes that duplicate native semantics, a missing or broken skip link, and lists or navigation items that lost list semantics.
3. Rewrite the markup with the smallest changes: native elements over ARIA roles, labels on repeated landmarks (`aria-label` or `aria-labelledby` pointing at a visible heading), a skip link as the first focusable element pointing to `main` with `tabindex="-1"` on the target if needed, and visually hidden headings only where a section has no visible title but needs one for navigation.
4. Show the target outline in the same form as step 1 so the difference is obvious.
5. Suggest the page title pattern (unique page name first, then site name) and, for templates, where the title and `lang` come from.
</task>

<constraints>
- Keep the visual design; change element types and attributes, and move CSS onto classes where a heading level changes.
- Do not add ARIA roles that native elements already provide, and do not add `role="application"`.
- Do not invent page content; where a heading text is needed and you cannot infer it, use a clearly marked placeholder.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Current outline
Title, lang, then an indented heading list and a landmark list.

## Problems
Table: # | Element | Problem | Criterion | Fix.

## Fixed markup
The corrected HTML, with comments only where a change is not obvious.

## Target outline
Same format as the current outline.

## Checks
Steps with a screen reader's heading and landmark lists and with a browser accessibility-tree viewer.
</output_format>
