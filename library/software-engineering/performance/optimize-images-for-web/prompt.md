---
schema: 1
id: optimize-images-for-web
kind: prompt
title: Optimise a site's images
description: Sets up responsive, modern-format, correctly sized and correctly lazy-loaded images through an image CDN, framework component or build step, measured in bytes saved and LCP.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [html-css]
requires: [repo-read, file-write, shell]
inputs: [repo, url, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [images, srcset, avif, webp, lazy-loading, lcp]
pairs_with:
  prompts: [improve-web-vitals, reduce-bundle-size, set-performance-budgets]
  personas: [frontend-engineer]
args:
  - name: site
    description: The site or pages with heavy images, how images reach the page today (static files, CMS uploads, a framework image component, an image CDN) and any page weight or LCP numbers.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Current state, Plan, Changes, Results, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Images are usually most of a page's bytes and often the LCP element. The common mistakes are specific: serving one large original to every screen; a `srcset` without an accurate `sizes`, so the browser assumes `100vw` and downloads the largest candidate for a small card; lazy-loading the LCP image, which delays it; missing `width` and `height` (or `aspect-ratio`), which causes layout shift; hero images set as CSS backgrounds that the browser's preload scanner cannot discover; PNG photos; and icons as raster files instead of SVG. AVIF is usually smallest, WebP is close and decodes faster, and both need a fallback only for very old browsers. Visual quality around 70 to 80 is indistinguishable for most photos. More than 2x device pixel ratio rarely helps. Images uploaded by editors need processing at upload or delivery time, because nobody resizes them by hand.
</context>

<task>
Optimise images for: {{site}}

1. Inventory: find how images are rendered (plain `<img>`, `<picture>`, framework image component, CSS backgrounds, CMS rich text) and where originals come from. Read the relevant components and config.
2. Measure: list the heaviest images on the key pages with their transferred size, rendered size and intrinsic size, and identify the LCP image per page. If you cannot load the pages, say how to collect this (Network panel filtered to images, Lighthouse "Properly size images" and "Serve images in modern formats").
3. Choose one delivery path that fits the stack: the framework's image component, an image CDN with URL transforms, or a build step that generates sizes and formats. Do not mix several.
4. Apply it: responsive `srcset` with widths matching real layout breakpoints and an accurate `sizes`; AVIF or WebP with fallback through `<picture>` or content negotiation; explicit `width` and `height` or `aspect-ratio`; `loading="lazy"` and `decoding="async"` only below the fold; the LCP image eager with `fetchpriority="high"`, in the HTML rather than a CSS background; SVG (optimised) for icons and logos.
5. Handle uploads: make CMS or user uploads go through the same pipeline, with a maximum stored dimension.
6. Re-measure the same pages and run the build and tests.
</task>

<constraints>
- Base `sizes` on the actual CSS layout at each breakpoint; say how you derived it.
- Do not lazy-load anything that can be the LCP element.
- Do not re-encode originals destructively; keep the source files and generate derivatives.
- If an image CDN or paid service is proposed, say it has a cost and offer a build-time alternative.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current state
Table: page | image | transferred KB | rendered size | intrinsic size | LCP?
## Plan
The delivery path chosen and why.
## Changes
One line per file: `path`, what changed.
## Results
Before and after: image bytes per page and LCP if measured.
## Follow-ups
Anything left, such as editor guidance or a budget check in CI.
</output_format>
