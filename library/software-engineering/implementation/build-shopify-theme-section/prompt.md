---
schema: 1
id: build-shopify-theme-section
kind: prompt
title: Build a Shopify theme section
description: Builds a Shopify theme section in Liquid with a schema for merchant settings and blocks, responsive accessible markup and performance-friendly images, styles and scripts.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer]
stack: [shopify]
requires: [repo-read, file-write, shell]
inputs: [repo, spec, image]
output: [code, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [liquid, theme-editor, section-schema, responsive-images, storefront-performance]
pairs_with:
  personas: [frontend-engineer]
  prompts: [improve-web-vitals, audit-web-accessibility]
args:
  - name: section_purpose
    description: What the section shows and why, for example "a testimonial slider with customer quotes, star ratings and an optional photo, for the home page".
    type: text
    required: true
  - name: theme_notes
    description: The theme it goes into and its conventions (base theme, CSS approach, existing snippets, color schemes, how JavaScript is loaded). Leave empty to infer them from the repo.
    type: text
  - name: settings
    description: The controls the merchant needs in the theme editor, for example "heading, background color scheme, autoplay on or off, up to 8 testimonials".
    type: text
output_contract:
  format: markdown
  sections: [Section summary, Files, Merchant settings, Accessibility and performance, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Theme sections go wrong in predictable ways: a schema with no presets, so the section never appears in the theme editor's Add section list; settings with no defaults, so a new section renders empty or broken; full-size images with no `srcset`, lazy-loading on the hero image that should load first; CSS that leaks into the rest of the theme because it is not scoped to the section instance; sliders that trap keyboard users and ignore reduced-motion preferences; JavaScript that breaks when the merchant edits the section live in the editor; merchant text printed into attributes without escaping; and hard-coded English strings in a theme that is translated. A good section looks right with no configuration, gives merchants a few clear controls, and costs the storefront almost nothing.
</context>

<task>
Build a theme section for this purpose:

<purpose>
{{section_purpose}}
</purpose>

{{#theme_notes}}
Theme notes: {{theme_notes}}
{{/theme_notes}}
{{#settings}}
Merchant controls requested: {{settings}}
{{/settings}}

1. Inspect the theme: the folder structure (`sections/`, `snippets/`, `blocks/`, `assets/`, `locales/`), two or three existing sections to copy their conventions (class naming, color schemes, spacing settings, how CSS and JavaScript are included, translation keys in schema), and whether the theme uses section groups or theme blocks. If the purpose or controls are unclear enough to change the schema, ask and stop.
2. Design the schema: section-level settings and repeatable blocks with sensible types (text, rich text, image picker, URL, select, range with min, max and step, checkbox, and the theme's color scheme setting if it has one), a default for every setting, a block limit where a large number would hurt layout or performance, presets so merchants can add the section with sample content, and template restrictions if the section only makes sense on some pages. Use translation keys for labels if the theme does.
3. Write the markup in Liquid: semantic HTML with a heading level the merchant can choose where it matters; responsive images through the `image_url` and `image_tag` filters with widths and `sizes` matched to the layout; lazy loading except for an image likely to be above the fold; alt text from the image with a sensible fallback; a tidy placeholder or blank state when no content is set; and `| escape` on merchant text used in attributes. Use `render` (not `include`) for snippets.
4. Style it: scope every rule to the section instance (for example via the section id) or a unique section class, follow the theme's spacing and typography tokens, design mobile first, and do not override global styles.
5. Add JavaScript only if the section needs behaviour: a small custom element or module loaded deferred, no jQuery or new dependencies, re-initialised on the theme editor's section load and unload events and cleaned up on unload, and, for sliders, keyboard controls, visible focus, pause controls, `prefers-reduced-motion` respected, and autoplay off by default.
6. Verify: run the theme's linter (Theme Check through the Shopify CLI, if installed), preview the section on a development theme, add it from the theme editor, try every setting including empty and maximum content, check keyboard navigation and a mobile viewport, and run a Lighthouse check on the page if possible. Report what you could and could not run.
</task>

<constraints>
- Work on a development or unpublished theme only. Never push to or publish the live theme.
- Change only the new section's files, plus locale strings and one shared snippet if needed; say if anything else must change, and why.
- No third-party scripts, tracking, app embeds or external fonts unless asked.
- Never hard-code store-specific content, prices or URLs in the section; everything a merchant might change is a setting or block.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Section summary
Two or three sentences: what the section does and where it can be used.
## Files
One line per file created or changed.
## Merchant settings
Table: setting or block, type, default, what it controls.
## Accessibility and performance
Bullets on image loading, CSS scoping, JavaScript weight and keyboard and screen-reader behaviour.
## Verification
Each check run and its real result, and anything not run with the reason.
</output_format>
