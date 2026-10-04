---
schema: 1
id: first-search-campaign-track
kind: workflow
title: First search campaign
description: Builds a local business's first search ads campaign in gated steps (services and areas, keywords and negatives, ads and assets, call and conversion tracking, launch settings and a two-week review).
category: advertising
version: 1.0.0
status: incubating
stage: [plan, build, verify, ship, review]
role: [founder, individual, operations-manager]
subject: [construction]
requires: [none]
inputs: [text, dataset]
output: [plan, copy, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [search-campaign, local-services, keyword-planning, call-tracking, launch-checklist, search-terms]
pairs_with:
  prompts: [write-google-ads, triage-search-terms-report, plan-ad-conversion-tracking, schedule-ads-around-phone-hours, audit-search-ads-account]
  personas: [local-ads-advisor]
args:
  - name: business
    description: Your trade or service and the jobs you want more of (and do not want), average job value and what you keep, how many more jobs a month you can take, opening and phone hours, your website or booking page, and reviews or guarantees you can mention.
    type: text
    required: true
  - name: service_area
    description: Towns, postcodes or a radius you cover, and places you do not go, for example "Bath and 15 miles, not Bristol".
    type: string
    required: true
  - name: monthly_budget
    description: What you can spend on clicks per month, for example "600 GBP".
    type: string
    required: true
steps:
  - {id: services-areas, file: steps/01-services-areas.md, stage: plan, gate: approve}
  - {id: keywords, file: steps/02-keywords.md, stage: build, gate: approve}
  - {id: ads, file: steps/03-ads.md, stage: build, gate: approve}
  - {id: tracking, file: steps/04-tracking.md, stage: verify, gate: approve}
  - {id: launch, file: steps/05-launch.md, stage: ship, gate: approve}
  - {id: review, file: steps/06-review.md, stage: review, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Builds a trade or local service business's first search ads campaign one approved step at a time, as an experienced local ads advisor would: decide what to sell where, choose searches, write ads, set up tracking, launch safely, and review the real searches after two weeks.

<business>
{{business}}
</business>

Service area: {{service_area}}
Monthly budget: {{monthly_budget}}

Rules for every step:
- Each step produces one artifact and stops for approval or edits; later steps build on approved versions.
- Use only facts the owner supplied. Mark missing facts `[NEEDED: …]` and ask; label cost-per-click or conversion estimates as assumptions to check in the platform.
- The owner makes every change in the ad account; recommend settings, never claim anything was set up or launched.
- Keep it simple: one campaign unless the services or areas truly differ, plain explanations of every term, settings named as they usually appear but to be confirmed in the platform's current interface.
- No unsupported claims, fake urgency or evasion of platform review. Regulated trades (gas, electrical, legal, health) may need licence details or certification; say what to check.
