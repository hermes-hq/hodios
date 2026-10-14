---
schema: 1
id: optimize-web-fonts
kind: prompt
title: Optimise web font loading
description: Cuts web font cost with WOFF2, subsetting, fewer files, targeted preloads, font-display and metric-matched fallbacks so text appears fast without layout shift.
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
depth: specific
tags: [web-fonts, font-display, preload, subsetting, cls]
pairs_with:
  prompts: [improve-web-vitals, check-font-licence, optimize-images-for-web]
  personas: [frontend-engineer]
args:
  - name: fonts
    description: How fonts are loaded today (Google Fonts link, self-hosted @font-face, a framework font helper, Typekit), which families and weights, and the problem you see (invisible text, layout shift, slow first render, heavy downloads).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Changes, Fallback metrics, Results, Licence check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Fonts hurt performance in three ways: bytes (many weights and styles, full Unicode coverage, legacy formats), discovery (a font is only requested after the CSS that references it is parsed and a matching element is found, so it arrives late), and swap (invisible text while waiting, then a layout shift when the web font replaces a fallback with different metrics). What experts do: ship WOFF2 only, since every current browser supports it; replace several static weights with one variable font when the design uses three or more; subset to the scripts the site actually uses; preload only the one or two files used above the fold, with `crossorigin` (required even on the same origin, otherwise the preload is wasted); choose `font-display: swap` for body text or `optional` where a late swap is worse than the fallback; and tune the fallback with `size-adjust`, `ascent-override`, `descent-override` and `line-gap-override` so the swap barely moves anything. Since browsers partition their caches per site, a shared font CDN no longer saves a download, and self-hosting removes a connection. Icon fonts are a common hidden cost; SVG icons are cheaper.
</context>

<task>
Optimise font loading for: {{fonts}}

1. Inventory every font file actually requested on the key pages: family, weight, style, format, size, where it is declared and which elements use it. Find declared faces that no page uses.
2. Remove unused faces and legacy formats. If three or more weights of one family are used, check whether a variable version exists and compare total bytes.
3. Subset to the character ranges the content needs (with `unicode-range` for multi-script sites so other ranges load only when used). Keep a full set if user-generated content can contain any script, and say so.
4. Self-host if fonts come from a third-party CSS link, unless licence or tooling prevents it; use the framework's font helper if the project has one, since it handles self-hosting, preloading and fallbacks.
5. Preload only the files used in above-the-fold text, with `as="font"`, `type="font/woff2"` and `crossorigin`.
6. Set `font-display` per face and add a fallback `@font-face` with metric overrides computed for the chosen system fallback.
7. Re-measure font bytes, the number of font requests before first paint and layout shift caused by fonts. Run the build and tests and check pages visually.
</task>

<constraints>
- Check the font licence before subsetting or self-hosting a commercial font; if unknown, say it must be checked and do not change hosting.
- Do not drop glyphs the content uses (accents, currency symbols, the languages the site supports).
- Do not preload more than the fonts needed for the first screen; extra preloads compete with the LCP resource.
- Give metric override values as computed from the font files or a tool, never as guesses.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Inventory
Table: family | weight/style | format | KB | used on first screen | keep/remove.
## Changes
One line per file: `path`, what changed.
## Fallback metrics
The fallback `@font-face` rules and how the values were obtained.
## Results
Before and after: font bytes, requests and font-related layout shift.
## Licence check
What the licence allows, or what must be confirmed.
</output_format>
