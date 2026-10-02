---
schema: 1
id: improve-web-vitals
kind: prompt
title: Improve Core Web Vitals
description: Diagnoses poor Core Web Vitals (LCP, INP, CLS) from a Lighthouse, field-data or trace report and ranks fixes by expected improvement. Use when a page fails the vitals thresholds.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, verify]
role: [frontend-engineer, fullstack-engineer]
stack: []
requires: [none]
inputs: [document, url, file]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [core-web-vitals, lighthouse, lcp, inp, cls]
args:
  - name: report
    description: Lighthouse JSON or text, PageSpeed Insights output, field data (CrUX or RUM) or a performance trace summary for the page.
    type: text
    required: true
  - name: framework
    description: Front-end framework and rendering mode, e.g. "Next.js 15 app router, SSR", "Vite + React SPA", "WordPress".
    type: string
output_contract:
  format: markdown
  sections: [Status, Root causes, Fixes, Not worth doing now, Measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Core Web Vitals are judged at the 75th percentile of real users: LCP good at 2.5 s or less, INP at 200 ms or less, CLS at 0.1 or less. Lighthouse is a lab test on one simulated device. It cannot measure INP (Total Blocking Time is only a proxy) and often disagrees with field data. Teams waste weeks chasing a lab score while the failing field metric is untouched, or apply a generic checklist without finding which part of the metric is slow.
</context>

<task>
Diagnose and prioritise fixes for this report{{#framework}} on a {{framework}} site{{/framework}}:
{{report}}

1. Identify whether each number is lab or field data. Prioritise metrics that fail in the field. If only lab data is given, say so and treat INP conclusions as provisional.
2. LCP: identify the LCP element, then break the time into its four parts (time to first byte, resource load delay, resource load duration, element render delay) and find the largest. Typical fixes: make the LCP image discoverable in the initial HTML, never lazy-load it, set `fetchpriority="high"`, serve it in the right size and a modern format, reduce render-blocking CSS and JavaScript, cache HTML at the edge, and fix slow server responses.
3. INP: find the long tasks and the interactions they block. Typical fixes: break up long tasks and yield to the main thread, reduce hydration and re-render work, defer non-critical third-party scripts, avoid layout thrashing in input handlers, and show visual feedback before the expensive work.
4. CLS: find the shifting elements and their causes. Typical fixes: set width and height or aspect-ratio on images, video and embeds, reserve space for ads, banners and late content, use font fallbacks with matched metrics, and animate with transforms.
5. If a framework is given, use its own mechanisms (for example its image component, script loading strategy or streaming) rather than hand-rolled ones.
6. Rank fixes by expected improvement on a failing metric, divided by effort.
</task>

<constraints>
- Cite the report's own audits, elements and numbers for every root cause. Do not recommend fixes for metrics that already pass.
- Expected improvements are estimates; give a range and say what it depends on.
- If the report is missing the LCP element, the long-task breakdown or the shifting elements, list what to capture instead of guessing.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Status
A table: metric, value, lab or field, threshold, pass or fail.
## Root causes
One subsection per failing metric, with the evidence from the report.
## Fixes
Numbered, ranked: the change (with a code or config snippet where it helps), metric affected, expected improvement, effort (S/M/L).
## Not worth doing now
Audits that look alarming but will not move a failing metric.
## Measure
How to verify: which field metric to watch, for how long, and the lab check to run before release.
</output_format>
