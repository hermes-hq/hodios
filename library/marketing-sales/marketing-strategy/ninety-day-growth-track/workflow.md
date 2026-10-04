---
schema: 1
id: ninety-day-growth-track
kind: workflow
title: Ninety-day local marketing plan
description: Runs a 90-day marketing reset for a small local business in gated steps - audit what exists, choose three channels, build the calendar, produce first assets, and review at day 30.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [discover, plan, build, review]
role: [founder, marketer, consultant]
requires: [none]
inputs: [text, notes]
output: [plan, table, copy, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [local-marketing, ninety-day-plan, marketing-audit, content-calendar, keep-change-drop]
pairs_with:
  prompts: [choose-marketing-channels, plan-weekly-promotion-routine, design-attribution-survey, set-promotion-budget-for-small-business, write-local-business-profile]
  personas: [main-street-growth-advisor]
args:
  - name: business
    description: What you sell, prices and margin if known, where you are, your best customers, how customers find you today, your busy and quiet times, and who does the marketing and for how many hours a week.
    type: text
    required: true
  - name: current_marketing
    description: Everything you do or have now - map listing, website, social accounts, email list, reviews, ads, leaflets, directories, signs, partnerships - with rough results. Optional.
    type: text
  - name: budget
    description: Money available for marketing over the 90 days, in your currency. Optional.
    type: string
    default: not set
steps:
  - {id: audit, file: steps/01-audit.md, stage: discover, gate: approve, artifact: "marketing-90/01-audit.md"}
  - {id: channels, file: steps/02-choose-channels.md, stage: plan, gate: approve, artifact: "marketing-90/02-channels.md"}
  - {id: calendar, file: steps/03-calendar.md, stage: plan, gate: approve, artifact: "marketing-90/03-calendar.md"}
  - {id: assets, file: steps/04-first-assets.md, stage: build, gate: approve, artifact: "marketing-90/04-first-assets.md"}
  - {id: review, file: steps/05-day-30-review.md, stage: review, gate: none, artifact: "marketing-90/05-day-30-review.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a 90-day marketing reset for a small local business the way a practical advisor would: look at what exists and what works, fix the leaks, commit to three channels the owner can sustain, plan the 90 days week by week, produce the first assets, and judge results at day 30 with keep, change or drop decisions. Each step writes one artifact and stops for approval.

<business>
{{business}}
</business>

{{#current_marketing}}<current_marketing>
{{current_marketing}}
</current_marketing>{{/current_marketing}}

Budget for 90 days: {{budget}}

Rules for every step:
- Use only facts the owner gave or confirmed. Ask for missing essentials (what sells, where customers come from, hours available) and mark gaps as [X].
- Never invent results, benchmarks, review counts, prices or competitor data; label rules of thumb as such.
- Fit everything to the owner's real hours per week; show the minutes.
- No fake reviews, rewarded reviews, fake urgency, or contacting people without consent; flag local rules (permits, marketing consent) as things to check.
- End each artifact with open questions.
