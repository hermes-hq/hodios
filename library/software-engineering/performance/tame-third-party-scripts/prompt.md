---
schema: 1
id: tame-third-party-scripts
kind: prompt
title: Tame third-party scripts
description: Measures what analytics, tag manager, chat, ad and embed scripts cost a page, then removes, delays, facades or isolates them, with before-and-after numbers for each.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, verify]
role: [frontend-engineer, fullstack-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, url, text]
output: [report, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [third-party-scripts, tag-manager, inp, facades, main-thread]
pairs_with:
  prompts: [improve-web-vitals, reduce-bundle-size, implement-cookie-consent]
  personas: [frontend-engineer, performance-engineer]
args:
  - name: page
    description: The page or site, the third-party tools it loads (tag manager, analytics, chat widget, A/B testing, ads, video embeds, reviews) and the symptom (slow load, poor INP, heavy main thread).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Cost per script, Decisions, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Third-party scripts often cost more main-thread time than the site's own code, and nobody owns them: marketing adds tags through a tag manager, each tag loads more scripts, and old experiments are never removed. The reliable way to measure a script's cost is to load the page with and without it (request blocking in DevTools or a lab tool) and compare Total Blocking Time, long tasks, bytes and LCP, rather than reading the bytes column alone. The levers, from most to least effective: remove scripts nobody uses; load on interaction with a facade (a static placeholder for a chat button or video embed that loads the real thing on click); delay until after load or idle; load with `async` or `defer` instead of synchronously; gate on consent where consent is required anyway; move work to a web worker (Partytown-style tools work for some tags and break others) or to server-side tagging. A/B testing tools that hide the page until they run are a special case: they block rendering on purpose, so they need a short timeout or a server-side alternative.
</context>

<task>
Reduce the cost of third-party scripts on: {{page}}

1. Inventory every third-party request: find script tags in templates, the tag manager container if it is in the repo or exported, and the network requests on the key pages. Group by vendor and record who added it if the code shows that.
2. Measure each vendor's cost by blocking it and comparing main-thread blocking time, long tasks, transferred bytes and LCP against the full page, in a production build with CPU throttling. If you cannot run the page, give the exact measurement procedure.
3. Decide per vendor: remove, facade, delay until idle or interaction, load async/defer, gate on consent, move to a worker or server side, or keep as is. Mark which decisions need a business owner's approval.
4. Implement the decisions that are safe and in the repo (script attributes and loading order, facades, delayed loading helpers, removing dead tags). For tag manager changes, write the exact steps for whoever owns the container.
5. Re-measure with all changes and report per-vendor and total gains. Check that analytics events, consent behaviour and the widgets still work.
</task>

<constraints>
- Do not remove or delay a script that the business depends on (analytics, ads revenue, consent, fraud protection) without stating the data or revenue impact and marking it for owner approval.
- Consent must still be respected: never move a script to load earlier than consent allows.
- Credit gains only to measurements; label unmeasured gains as estimates.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Inventory
Table: vendor | purpose | how loaded | added by.
## Cost per script
Table: vendor | blocking ms | bytes | LCP effect | how measured.
## Decisions
Table: vendor | action | owner approval needed | trade-off.
## Changes
One line per file: `path`, what changed; then tag manager steps.
## Results
Before and after totals and per-vendor gains.
</output_format>
