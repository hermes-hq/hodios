---
schema: 1
id: fix-wordpress-site-accessibility
kind: prompt
title: Audit and fix a WordPress site for accessibility
description: Audits and fixes a WordPress site's theme, blocks, page builder output and plugins for accessibility, separating theme code fixes from editor content fixes and plugins to replace.
category: accessibility
version: 1.0.0
status: incubating
stage: [verify, build, maintain]
role: [frontend-engineer, fullstack-engineer, consultant]
stack: [wordpress, php, html-css]
requires: [repo-read, file-write]
inputs: [repo, file, url, text]
output: [code, report, checklist]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [wordpress-theme, gutenberg, page-builder, plugins, small-business-site]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [audit-web-accessibility, fix-page-structure-and-landmarks, fix-form-accessibility]
args:
  - name: site
    description: The theme (block theme, classic theme, child theme), page builder if any (Elementor, Divi, WPBakery, Beaver Builder), key plugins (forms, sliders, cookie consent, e-commerce), and theme files or scan results.
    type: text
    required: true
  - name: editors
    description: Who edits content and how comfortable they are, so content guidance fits them.
    type: string
output_contract:
  format: markdown
  sections: [Where the problems come from, Theme fixes, Plugin decisions, Content fixes for editors, Manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
On a WordPress site, accessibility problems come from four places, and the fix differs for each. The theme controls landmarks, skip links, menus, focus styles, heading structure in templates and colour; fix it in a child theme or the block theme's `theme.json`, never in the parent theme directly, or updates will wipe the work. Page builders produce deep `div` structures, headings chosen for size rather than level, icon boxes without names and sliders that auto-rotate; some issues are fixable in builder settings, others need a different widget. Plugins (contact forms, sliders, popups, cookie banners, galleries, booking widgets) are often the worst offenders and the cheapest fix is replacing the plugin with an accessible one; form plugins often have accessibility or markup settings that are worth checking before replacing them. Content added by editors (image alt text, heading levels, link text, tables, PDFs) needs editor training and block patterns, not code. Themes tagged "accessibility-ready" in the WordPress directory meet a baseline, which is a good sign but not a guarantee once customised. Overlay plugins that promise one-line compliance do not fix the underlying markup.
</context>

<task>
Audit and fix this WordPress site.

<site>
{{site}}
</site>
{{#editors}}
Editors: {{editors}}
{{/editors}}

1. Identify the theme type, whether a child theme exists, the page builder and the plugins that output front-end UI. If there is no child theme for a classic theme, propose creating one before changing templates.
2. Classify each problem by source: theme, page builder, plugin or editor content. Mark inferences.
3. Theme fixes: skip link, landmarks, menu as accessible disclosure navigation, visible focus styles, heading levels in templates, link underlines in content, colour tokens in `theme.json` or the customizer that meet contrast, `lang` attribute, and search form label. Make the changes in the child theme or block theme files, with file paths.
4. Page builder: list fixable settings (heading tags, image alt sources, slider autoplay) and widgets to replace.
5. Plugins: for each front-end plugin, decide keep and configure, replace, or remove. Name the settings to change; when suggesting a replacement, describe what to look for and how to test it rather than vouching for a specific plugin's conformance.
6. Content: write short guidance and, where helpful, block patterns for editors covering alt text, heading order, link text, tables, buttons versus links, and embedded media captions.
7. Run any available build, linter or test, and give a manual check with keyboard, a screen reader and 400% zoom on the home page, a content page, the contact form and the checkout if WooCommerce is present.
</task>

<constraints>
- Never edit a parent theme or plugin files directly.
- Do not recommend an accessibility overlay as a fix.
- Do not claim that any theme or plugin is conformant; recommend testing.
- Confirm before deactivating or removing any plugin on a live site, and suggest doing it on staging first.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Where the problems come from
Table: issue | source (theme, builder, plugin, content) | WCAG criterion | severity.

## Theme fixes
Diffs with child theme or block theme file paths.

## Plugin decisions
Table: plugin | problem | keep and configure, replace or remove | what to do.

## Content fixes for editors
Short guidance the editors can follow.

## Manual check
Checklist per key page.
</output_format>
