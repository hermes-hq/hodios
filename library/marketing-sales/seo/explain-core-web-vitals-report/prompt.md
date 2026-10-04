---
schema: 1
id: explain-core-web-vitals-report
kind: prompt
title: Explain a Core Web Vitals report
description: Translates a page speed or Core Web Vitals report into plain words for a non-developer owner, ranks fixes by impact and effort, and says which a builder setting, an image change or a developer can do.
category: seo
version: 1.0.0
status: incubating
stage: [review]
role: [founder, marketer, individual]
subject: [ecommerce]
requires: [none]
inputs: [text, document]
output: [explanation, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [page-speed, web-vitals, site-builders, plain-language]
pairs_with:
  prompts: [improve-web-vitals, audit-technical-seo]
args:
  - name: report
    description: The report text or numbers - pasted from a page speed test or the webmaster tool's Core Web Vitals report, including field data (real users) and lab data if both are shown, the page tested and mobile or desktop.
    type: text
    required: true
  - name: site_platform
    description: How the site is built (for example Wix, Squarespace, Shopify, WordPress with a theme and plugins, custom), so fixes name who can do them.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [In plain words, Does it matter, Fix list, Ignore for now, How to re-check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain speed reports to shop and small business owners who are not developers and often panic at a red score. Three things they need to know: the score from a lab test is a simulation, while the field data from real visitors is what search engines use for page experience; speed is one signal among many and rarely the reason a useful page does not rank, though slow pages do lose customers; and on hosted site builders many fixes are out of their hands, while images, apps and embeds usually are not. Platform: {{site_platform}}.
</context>

<task>
<report>
{{report}}
</report>

1. Say whether the report shows field data, lab data or both, and for mobile or desktop. If only lab data, say the real-user picture is unknown.
2. Explain each metric in one plain sentence with its result against the thresholds measured at the 75th percentile of visits:
   - Largest Contentful Paint (how fast the main content appears): good up to 2.5 s, poor above 4 s;
   - Interaction to Next Paint (how fast the page reacts to taps and clicks): good up to 200 ms, poor above 500 ms;
   - Cumulative Layout Shift (how much things jump around while loading): good up to 0.1, poor above 0.25.
3. Does it matter: a short, honest judgement for this site (for example "field data is good, the red lab score is not urgent").
4. Translate each diagnostic in the report into a fix and rank fixes by expected effect on the failing metric, then effort. For each fix, say who can do it:
   - owner, content change (resize or compress images, use fewer or smaller hero videos, remove an unused embed);
   - owner, builder or app setting (turn off or remove apps and plugins, lazy loading below the fold, a performance option the platform offers);
   - developer (theme code, scripts, fonts, server or hosting).
5. Name what to ignore for now: items with tiny estimated savings, or that the platform controls and cannot be changed.
6. How to re-check: retest the same page a few times, and note that field data updates over a rolling 28-day window, so improvements show weeks later.
</task>

<constraints>
- Use only the numbers and diagnostics in the report. Do not invent metrics, savings or causes; if a cause is a likely guess, say so.
- Name a builder setting only if you are confident it exists on that platform; otherwise say "look for a setting that ..." or "ask the platform's support".
- Avoid jargon; when a technical term is unavoidable, explain it in brackets.
- If the report is missing or contains no metrics, ask for it and say how to get one (a free page speed test, or the webmaster tool's Core Web Vitals report).
</constraints>

<output_format>
## In plain words
Table: Metric | Your result | Rating (good, needs improvement, poor) | What it means for a visitor.

## Does it matter
Two to four lines.

## Fix list
Table: Fix | Metric it helps | Impact (high, medium, low) | Effort | Who (you, setting, developer).

## Ignore for now
Bullets with a one-line reason each.

## How to re-check
Three bullets.
</output_format>
