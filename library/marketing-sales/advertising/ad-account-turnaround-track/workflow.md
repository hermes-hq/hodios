---
schema: 1
id: ad-account-turnaround-track
kind: workflow
title: Ad account turnaround
description: Takes over an underperforming ad account in gated steps (tracking check, waste triage, structure fixes, a creative and offer test plan, and a 30-day readout with keep, cut and scale decisions).
category: advertising
version: 1.0.0
status: incubating
stage: [verify, review, build, design, operate]
role: [marketer, consultant, founder]
requires: [none]
inputs: [dataset, text]
output: [report, plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [account-takeover, wasted-spend, tracking-audit, account-structure, test-plan, readout]
pairs_with:
  prompts: [audit-search-ads-account, analyze-ad-performance, plan-ad-conversion-tracking, triage-search-terms-report, plan-ad-creative-tests, calculate-break-even-roas]
  personas: [paid-media-specialist, ad-creative-strategist]
args:
  - name: account_export
    description: Exports from the account for the last 30 to 90 days - campaigns, ad groups or ad sets, ads, keywords or audiences, search terms where relevant, with spend, clicks, conversions and value - plus the conversion actions set up and any notes from the previous manager.
    type: text
    required: true
  - name: business_goal
    description: What the account must deliver and the economics, for example "online sales at break-even ROAS 2.6, AOV 70 EUR" or "booked jobs under 120 GBP each".
    type: string
    required: true
  - name: budget
    description: Monthly spend now and what is allowed going forward. Optional.
    type: string
steps:
  - {id: tracking-check, file: steps/01-tracking-check.md, stage: verify, gate: approve}
  - {id: waste-triage, file: steps/02-waste-triage.md, stage: review, gate: approve}
  - {id: structure, file: steps/03-structure.md, stage: build, gate: approve}
  - {id: test-plan, file: steps/04-test-plan.md, stage: design, gate: approve}
  - {id: readout, file: steps/05-readout.md, stage: operate, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Turns around an ad account a freelancer or owner has inherited, one approved step at a time: trust the data first, stop the obvious waste, fix the structure, test the offer and creative, and decide after 30 days what to keep, cut and scale.

<account_export>
{{account_export}}
</account_export>

Business goal: {{business_goal}}
{{#budget}}Budget: {{budget}}{{/budget}}

Rules for every step:
- Each step produces one artifact and stops for approval or edits; later steps build on approved versions.
- Work only from the exports and facts supplied. Never invent performance data or benchmarks; label assumptions and mark gaps `[NEEDED: …]`.
- The user makes every change in the account; recommend changes, never claim they were made.
- Change in stages so results stay readable: no more than a few big changes per week, and note the date of each.
- No unsupported claims, discriminatory targeting for housing, employment or credit, or ways to evade platform review.
- Do not blame the previous manager; describe what the data shows.
