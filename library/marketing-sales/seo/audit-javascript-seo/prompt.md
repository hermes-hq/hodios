---
schema: 1
id: audit-javascript-seo
kind: prompt
title: Audit JavaScript SEO
description: Audits a JavaScript-rendered site for search, comparing raw and rendered HTML, links, metadata, lazy content, status codes and routing, and recommends server rendering or prerendering where needed.
category: seo
version: 1.0.0
status: incubating
stage: [review, verify]
role: [frontend-engineer, fullstack-engineer, marketer]
stack: [react, vue, angular]
requires: [none]
inputs: [text, url, config]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [javascript-rendering, single-page-apps, server-side-rendering, crawlability, prerendering]
pairs_with:
  prompts: [audit-technical-seo, diagnose-page-not-indexed]
args:
  - name: site
    description: The framework and rendering mode (client-only SPA, SSR, static, hybrid), routing approach, and the page types that matter for search.
    type: text
    required: true
  - name: evidence
    description: For one or more key pages, the raw HTML from the server (view-source or a curl fetch) and the rendered HTML or screenshot from URL Inspection or a headless browser, plus any Search Console indexing statuses. Summaries are fine.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Rendering summary, Findings, Fix options, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a technical SEO who works with front-end teams. Google renders JavaScript with an evergreen Chromium, but rendering may happen later than crawling, needs every script and API call to succeed for the bot, and does not click, scroll or type. Other search engines and many AI crawlers are reported to render JavaScript less reliably or not at all, so content and links present only after client-side rendering are at risk outside Google.

The recurring failures: links built as `onClick` handlers or buttons instead of `<a href>`; hash-based routes (`/#/page`) that are not separate URLs; content loaded only after a user action (tabs that fetch on click, infinite scroll without paginated URLs); titles, canonicals and meta robots set or changed by JavaScript after load (and a raw-HTML `noindex` that JavaScript later removes, which Google may never render); every route returning 200 with an in-app "not found" view (soft 404s); API calls blocked by robots.txt or failing for bots; and a blank shell when scripts error. Server-side rendering or static generation is the robust fix; dynamic rendering for bots is described by Google as a workaround rather than a long-term solution.
</context>

<task>
Audit this site's JavaScript SEO.

<site>
{{site}}
</site>

<evidence>
{{evidence}}
</evidence>

1. **Rendering summary:** for each page supplied, what is in the raw HTML versus only in the rendered HTML: main content, title, meta description, canonical, meta robots, structured data, internal links, images. Say what this means for Google and for crawlers that do not render.
2. **Findings:** check each failure mode in the context above against the evidence. For each finding: the evidence, the impact, and the severity. List checks you could not do with the evidence given under "Not checked".
3. **Fix options:** recommend the right approach for this framework: server-side rendering or static generation for indexable routes (name the framework's mechanism), real `<a href>` links, history-API routes, server-set metadata, proper 404 and 410 status codes, paginated URLs for infinite lists, robots.txt access to required scripts and APIs. Explain trade-offs, and treat dynamic rendering as a stopgap.
4. **Verify:** how to confirm fixes: URL Inspection live test with rendered HTML and screenshot, comparing a curl fetch with JavaScript disabled, checking that internal links appear in raw HTML, and monitoring indexed page counts and rendering errors.
</task>

<constraints>
- Base findings on the supplied evidence; label anything else as a hypothesis to check.
- Never recommend serving bots different content from users (cloaking). Prerendered or server-rendered output must match what users see.
- Do not claim exact rendering delays or crawler capabilities; describe them as variable and reported.
- Keep fixes proportional: a marketing site may only need static generation for a handful of routes, not a full rewrite.
</constraints>

<output_format>
## Rendering summary
A table: Page | Element | Raw HTML | Rendered | Risk.

## Findings
Numbered, each with evidence, impact and severity, then a "Not checked" list.

## Fix options
Bullets per finding, with trade-offs.

## Verify
A checklist.
</output_format>
