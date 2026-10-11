---
schema: 1
id: make-docs-site-accessible
kind: prompt
title: Make a documentation site accessible
description: Fixes a developer documentation site's code blocks, syntax colours, copy buttons, tabs, search, sidebar navigation and version switcher for keyboard, screen-reader and low-vision users.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, technical-writer, developer-advocate]
stack: [markdown, html-css]
requires: [repo-read, file-write]
inputs: [repo, file, text]
output: [code, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [documentation-site, code-blocks, syntax-highlighting, docusaurus, static-site]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [fix-page-structure-and-landmarks, review-color-contrast, build-aria-widget, add-live-region-announcements]
args:
  - name: site
    description: The docs framework (Docusaurus, MkDocs Material, VitePress, Starlight, Nextra, Sphinx, Hugo or custom), theme customisations and file paths, and any known complaints.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Problems found, Fixes, Content authoring rules, Manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Documentation sites share a small set of components, and each has a known failure. Code blocks: horizontally scrolling `pre` elements that keyboard users cannot scroll (they need `tabindex="0"`, a name and a visible focus style), syntax themes whose comment and punctuation colours fall below 4.5:1, especially in dark mode, and line numbers that screen readers read before every line. Copy buttons: icon-only, unnamed, with no confirmation announced. Code tabs (npm, yarn, pnpm): built as `div`s, or as tabs that do not follow the tabs keyboard pattern, and synced across the page in a way that moves content without warning. Sidebars: deep collapsible trees with no `aria-expanded` and no current-page marker. Search: a modal opened by Ctrl+K or "/" with a combobox that does not announce results. Admonitions such as "Warning" that are coloured boxes with the label in CSS. Headings with anchor links that add "link #" to every heading name. Most docs frameworks fix some of these in their default themes, so the first step is updating the framework and checking which issues come from local theme overrides or custom components.
</context>

<task>
Make this documentation site accessible.

<site>
{{site}}
</site>

1. Identify the docs framework and version and read its accessibility notes or known issues. List local theme overrides ("swizzled" components, custom CSS, plugins), since those are where most regressions live.
2. Check and fix code blocks: scrollable blocks keyboard-focusable with a name, syntax theme contrast in light and dark mode for every token colour used (compute ratios from the theme's values), line numbers hidden from screen readers or excluded from copy, and highlighted lines conveyed by more than colour.
3. Check and fix copy buttons: named ("Copy code"), a polite "Copied" announcement, visible on keyboard focus and not only on hover.
4. Check and fix content tabs: the tabs pattern with arrow keys and `aria-selected`, or plain headings if tabs are not needed; synced tabs that do not move the reader's position unexpectedly.
5. Check navigation and search: sidebar with `aria-expanded`, `aria-current="page"`, a skip link to content, an on-page table of contents in a named `nav`, a search dialog with a name, combobox semantics and an announced result count, and keyboard shortcuts that can be turned off if they are single characters.
6. Check content patterns: admonition labels in real text, heading anchor links that do not pollute heading names, images and diagrams with alt text, and language set on the page.
7. Make the fixes in the smallest place (theme config first, then component overrides). Run the site build and any tests; report results.
8. Write a short list of authoring rules for doc writers covering alt text, heading order, link text and code samples.
</task>

<constraints>
- Prefer framework configuration and upgrades over new overrides; say when an upgrade fixes an issue.
- Do not change documentation content beyond what accessibility requires.
- Do not report contrast ratios you did not compute.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Problems found
Table: component | issue | source (framework default or local override) | WCAG criterion.

## Fixes
Diffs or configuration changes with file paths.

## Content authoring rules
Short bulleted list.

## Manual check
Checklist for keyboard, a screen reader, 200% text and dark mode.
</output_format>
