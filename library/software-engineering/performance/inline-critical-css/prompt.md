---
schema: 1
id: inline-critical-css
kind: prompt
title: Inline critical CSS and drop unused CSS
description: Stops stylesheets from blocking first paint by inlining above-the-fold CSS, loading the rest without blocking, and removing unused rules, measured by FCP and LCP.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer]
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
tags: [render-blocking, critical-path, unused-css, first-contentful-paint, lcp]
pairs_with:
  prompts: [improve-web-vitals, reduce-bundle-size, optimize-web-fonts, configure-cdn-caching]
  personas: [frontend-engineer, performance-engineer]
args:
  - name: site
    description: The page(s) affected, how CSS is built and served (framework, CSS-in-JS, Tailwind, a CMS theme), current FCP and LCP and where they were measured, and any stylesheet sizes known.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, CSS on the critical path, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Every `<link rel="stylesheet">` in the head blocks rendering until it downloads and parses, so a large stylesheet on a slow connection delays first paint even when the HTML arrived quickly. Two levers fix it. First, ship less CSS: the Coverage panel in Chrome DevTools often shows 70 to 90 percent of a theme or framework stylesheet unused on a given page; Tailwind's content scanning, PurgeCSS or splitting CSS per route removes it, but dynamically built class names and classes added by JavaScript or a CMS get removed by mistake unless safelisted. Second, inline the small set of rules needed for the first viewport (aim for well under about 14 KB compressed so it fits the first round trips) and load the full stylesheet without blocking, then let it apply. Tools such as Critical or Critters extract above-the-fold CSS at build time; many frameworks already do this, so check before adding a tool. Risks: a flash of unstyled or restyled content when the inlined subset misses rules for elements in the first viewport, inlined CSS that cannot be cached across pages, and `@import` chains that add serial requests. Fonts and background images referenced from CSS are discovered late; preload the ones that render the LCP element.
</context>

<task>
Remove render-blocking CSS for: {{site}}

1. Read how CSS is produced and linked: build tool, framework defaults, theme or CMS output, `@import` usage, and whether the framework already inlines critical CSS.
2. Measure the baseline with a lab trace or Lighthouse on a throttled mobile profile: FCP, LCP, the render-blocking requests, CSS bytes, and unused percentage from Coverage for the key templates.
3. Remove unused CSS at build time with the tool that fits the stack, and safelist classes added at runtime. Replace `@import` chains with bundled files.
4. Extract critical CSS per template for the first viewport at common mobile and desktop sizes, inline it, and load the rest without blocking. Preload the font or image needed for the LCP element.
5. Re-measure the same pages, check visually at several viewport widths for unstyled flashes or missing styles, and run the build and tests.
</task>

<constraints>
- Compare like with like: same page, device profile and network throttling before and after.
- Do not remove CSS you cannot prove is unused; keep a safelist for runtime and CMS classes.
- Keep the inlined block small; say its size and why it is not larger.
- Do not break caching of the full stylesheet.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
FCP, LCP, render-blocking requests, CSS bytes and unused share.
## CSS on the critical path
What blocks rendering and why.
## Changes
One line per file: `path`, what changed.
## Results
Metrics after, inlined size, visual checks and build status.
</output_format>
