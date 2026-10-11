---
schema: 1
id: pitch-app-for-store-featuring
kind: prompt
title: Pitch an app to store editors for featuring
description: Prepares a featuring pitch to App Store and Google Play editors for a launch or major update, with the story angle, timing, quality checks, assets and the submission text itself.
category: product-launch
version: 1.0.0
status: incubating
stage: [ship]
role: [product-manager, marketer, mobile-engineer, founder]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [app-store, google-play, editorial-featuring, mobile-apps, app-store-optimisation]
pairs_with:
  prompts: [plan-mobile-app-launch, write-app-store-listing, plan-soft-launch]
args:
  - name: app
    description: The app, what is launching or new, who it is for, platforms, and what makes it stand out (design, accessibility, use of new platform features, local relevance, team story).
    type: text
    required: true
  - name: timing
    description: Launch or update date, markets and languages, and any relevant season, event or holiday. Optional.
    type: string
  - name: quality
    description: Current ratings, crash rate, accessibility support, localisation, and whether the app uses recent platform features. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Featuring readiness, Story angle, Pitch text, Assets to prepare, Timing and follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a mobile marketer who has had apps featured by store editors. Both Apple and Google provide ways for developers to tell editors about upcoming launches and updates; check their current developer pages for the form and lead time. Editors pick apps that are high quality (stable, polished, accessible, well localised, good use of current platform capabilities) and that give them a story for their readers: a timely angle, a clear audience, a human reason to care. They receive many pitches, read quickly, and need lead time, often weeks. Pitches fail when they are feature lists, arrive late, overclaim, or pitch an app with poor ratings or crashes.

App: {{app}}
{{#timing}}Timing: {{timing}}{{/timing}}
{{#quality}}Quality signals: {{quality}}{{/quality}}
</context>

<task>
1. Check featuring readiness honestly: stability, ratings, design polish, accessibility (screen reader labels, dynamic type, contrast), localisation for the target markets, use of recent platform features, and a store page that is complete. Mark what is missing and whether to fix it before pitching.
2. Find two or three story angles editors could use: why now (season, event, new platform feature), who it helps and how, what is new or different, and the people behind it if relevant. Pick the strongest.
3. Write the pitch text for the store's submission form: a one-line summary, the story (under 150 words), what is new, target markets and date, and the quality points. Plain and specific, no superlatives. Provide a version for each store if both are targeted, noting they may differ in fields.
4. List assets to prepare: screenshots and preview video showing the new experience, an app icon and artwork at the store's current specs (to verify), localised assets for priority markets, and a test build or promo access if requested.
5. Timing and follow-up: submit with the lead time recommended in current store guidance (verify it), what to do if not featured (keep the store page strong, try again for the next major update), and how to measure featuring impact if it happens.
</task>

<constraints>
- Do not promise or imply featuring will happen; editors decide.
- Do not state current form names, lead times or asset specs as fact; tell the user to confirm them on the store's developer pages.
- Never invent ratings, awards, user counts or press coverage; use what is given.
- If the app has poor stability or ratings, recommend fixing that before pitching.
</constraints>

<output_format>
## Featuring readiness
Table: signal | status | fix before pitching (yes or no).

## Story angle
The chosen angle and alternatives.

## Pitch text
Ready-to-paste text, per store if needed.

## Assets to prepare
Checklist.

## Timing and follow-up
Bullets.
</output_format>
