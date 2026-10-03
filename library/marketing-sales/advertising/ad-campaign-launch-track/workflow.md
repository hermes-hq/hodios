---
schema: 1
id: ad-campaign-launch-track
kind: workflow
title: Ad campaign launch track
description: Launches a paid ad campaign in gated steps (brief, audiences, creative, tracking QA, launch settings and a seven-day review), pausing for approval between steps. Use to launch a campaign end to end.
category: advertising
version: 1.0.1
status: incubating
stage: [plan, build, verify, ship, review]
role: [marketer, founder]
requires: [none]
inputs: [text, spec, dataset]
output: [plan, copy, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [campaign-launch, paid-media, tracking-qa, launch-checklist, campaign-review]
pairs_with:
  prompts: [define-ad-audiences, plan-ad-creative-tests, check-ad-policy-compliance, analyze-ad-performance, plan-media-budget]
  personas: [paid-media-specialist]
args:
  - name: offer
    description: What you advertise, price and offer terms, who buys and why, proof you can use, the landing page, customer value and gross margin, and any past ad results.
    type: text
    required: true
  - name: platform
    description: The ad platform and countries (for example Meta in Spain and Portugal, Google Search in the US, TikTok in the UK, LinkedIn in DACH).
    type: string
    required: true
  - name: budget
    description: The budget and period (for example "4,500 EUR for the first month"), plus any target cost per acquisition or ROAS.
    type: string
    required: true
steps:
  - {id: brief, file: steps/01-brief.md, stage: plan, gate: approve}
  - {id: audiences, file: steps/02-audiences.md, stage: plan, gate: approve}
  - {id: creative, file: steps/03-creative.md, stage: build, gate: approve}
  - {id: tracking-qa, file: steps/04-tracking-qa.md, stage: verify, gate: approve}
  - {id: launch, file: steps/05-launch.md, stage: ship, gate: approve}
  - {id: review, file: steps/06-review.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Tighter wording so the paste-in form fits the 8,000-character limit."}
---
Launches a paid ad campaign one approved step at a time, as a senior paid media specialist would: campaign brief with the economics, audiences, creative, tracking QA, launch settings, then a review after seven days of real data.

<offer>
{{offer}}
</offer>

Platform: {{platform}}
Budget: {{budget}}

Each step produces one artifact and stops for approval or edits; later steps build on approved versions without reopening them unasked. Use only facts the marketer supplied: label benchmarks, conversion rates and cost estimates as assumptions, and mark missing facts `[NEEDED: …]`. The marketer makes every change in the ad account; you recommend settings and never claim anything was launched or changed. Never propose unsupported claims, fake urgency, personal-attribute wording, discriminatory targeting for housing, employment or credit ads, or ways to evade platform review. If the marketer asks to skip approvals, confirm once that later steps will build on unreviewed choices; if they agree, run the steps up to launch settings in one reply, stating each skipped gate's choice. The review always waits for real data.
