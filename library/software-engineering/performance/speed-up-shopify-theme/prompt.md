---
schema: 1
id: speed-up-shopify-theme
kind: prompt
title: Speed up a Shopify storefront
description: Speeds up a Shopify storefront by removing leftover app code, controlling app scripts, fixing slow Liquid loops, and serving responsive images and lighter theme assets.
category: performance
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [shopify]
requires: [repo-read, file-write, shell]
inputs: [repo, url, text]
output: [report, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [liquid, theme-performance, app-scripts, theme-inspector, lcp]
pairs_with:
  prompts: [build-shopify-theme-section, tame-third-party-scripts, optimize-images-for-web]
  personas: [frontend-engineer]
args:
  - name: store
    description: The theme (name and version, customised or not), installed and previously uninstalled apps, which pages are slow (home, collection, product, cart), and any Lighthouse, field or Theme Inspector numbers.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Findings, Ranked fixes, Changes, Results, Needs the merchant]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Shopify hosts and caches the storefront, so server tuning is not available; the levers are the theme and what apps add to it. The biggest problems are usually apps: each one can inject scripts and styles on every page, and apps that were uninstalled often leave snippets and `{% render %}` calls in `theme.liquid` and templates. Theme app extensions (app embeds and app blocks) can be switched off per theme without code. In Liquid, slow server render comes from nested loops over large collections, looping over `collections.all` or all products to find a few, repeated filters inside loops, and very large `paginate` sizes; the Shopify Theme Inspector browser extension shows Liquid render time per file. On the front end, the usual issues are images output at full size instead of through `image_url` with a width and `image_tag` with `widths` and `sizes`, lazy loading applied to the first product image, large theme JavaScript bundles and sliders loaded on every page, and custom fonts. Lab scores vary between runs; field data and the admin's web performance report are the numbers the merchant sees.
</context>

<task>
Speed up this storefront: {{store}}

1. Pull or read the theme code. List every app-related snippet, script tag and app embed, and match each to an installed app; flag code from apps that are no longer installed.
2. Profile Liquid render on the slow templates with Theme Inspector if you can run it; otherwise read the templates and sections for nested loops, loops over all products or collections, filters inside loops and large page sizes.
3. Check front-end weight on the key pages: images (sizes, formats, lazy loading of the first image), theme JavaScript and CSS loaded globally that only some pages need, fonts, and third-party scripts.
4. Rank fixes by expected gain. Implement the theme-side ones on a duplicate or development theme: remove orphaned app code, load page-specific assets only where used, rewrite slow Liquid loops, output responsive images with correct `sizes` and eager loading for the first above-the-fold image.
5. Re-measure the same pages on the development theme and check the storefront still works: product options, add to cart, cart drawer, search, and every app the merchant still uses.
</task>

<constraints>
- Work on a duplicate or development theme, never directly on the live theme.
- Do not remove code for an app that is still installed without the merchant confirming they no longer need its feature on that page.
- Do not promise a specific Lighthouse score; report measured changes and say that lab scores vary between runs.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Findings
App code inventory (app, installed or not, where injected), Liquid hotspots and front-end weight.
## Ranked fixes
Table: fix | page types | expected gain | effort | needs merchant.
## Changes
One line per file: `path`, what changed.
## Results
Before and after on the development theme, plus the functional checks done.
## Needs the merchant
App decisions and settings only the merchant can change.
</output_format>
