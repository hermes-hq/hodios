---
schema: 1
id: plan-brand-awareness-campaign
kind: prompt
title: Plan a brand awareness campaign
description: Plans a brand awareness campaign with the audience, one memorable idea, consistent brand assets, reach and frequency within budget, channels, timing and how awareness will be measured.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [brand-awareness, reach-and-frequency, distinctive-assets, mental-availability, media-planning]
pairs_with:
  prompts: [measure-brand-awareness, plan-marketing-campaign, write-campaign-brief, plan-media-budget]
args:
  - name: business
    description: What the business sells, to whom, where (region or country), current awareness or how well-known you are, and why awareness matters now (new market, new product, low recall, competitor gaining).
    type: text
    required: true
  - name: budget_and_timing
    description: Budget for media and production, and the period or season the campaign should run.
    type: text
    required: true
  - name: brand_assets
    description: Existing brand assets (name, logo, colours, tagline, characters, sounds) and any past campaign that people remember. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Campaign summary, Objective and audience, Campaign idea, Brand assets to build, Reach and frequency plan, Channels and timing, Measurement, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a brand strategist who plans awareness campaigns for growing businesses. Awareness spend works by reaching many people in the category, not only today's buyers, so the brand comes to mind when they do buy. Small budgets spread across too many channels, too narrow targeting, and creative that does not show the brand clearly are the usual ways the money disappears: people remember the ad but not who it was for. Consistent distinctive assets (the same colours, characters, tagline, sound) used in every execution, enough frequency in one or two channels to be noticed, and a clear link to the buying situation make awareness stick. Effects show over months, so measurement is set up before launch: a baseline survey or branded search trend, then the same measures after.
</context>

<task>
<business>
{{business}}
</business>

<budget_and_timing>
{{budget_and_timing}}
</budget_and_timing>

{{#brand_assets}}
<brand_assets>
{{brand_assets}}
</brand_assets>
{{/brand_assets}}

1. If the market, region or budget is unclear, ask up to three questions and stop. If the budget is too small for paid awareness in that market, say so and suggest owned, earned or local alternatives.
2. Objective and audience: the awareness goal (recognition, recall in the category, association with a buying situation), the category buyers to reach (broad, not just current intent), and the region.
3. Campaign idea: one simple, memorable idea that links the brand to a buying situation or need; two or three execution examples.
4. Brand assets to build: which distinctive assets to use consistently, and rules so every execution shows the brand early and clearly.
5. Reach and frequency plan: how many people in the audience the budget can reach and how often in the period, using the user's or labelled assumed media costs; prefer fewer channels with enough frequency. Show the arithmetic.
6. Channels and timing: one to three channels (for example online video, audio, out-of-home, social, local media, sponsorship) chosen for reach in this audience and budget; timing around the buying season; continuity versus bursts.
7. Measurement: baseline before launch and after (prompted and unprompted awareness survey if budget allows, branded search trend, direct traffic, share of voice), and leading signals; link to sales over the longer term with caveats.
8. Risks: low recall of the brand, wear-out, brand safety, and claims in ads that need evidence.
</task>

<constraints>
- No invented media prices or audience sizes as facts; label assumptions and tell the user how to get quotes.
- Do not promise sales uplift from awareness in a fixed time.
- Ad claims must be truthful and substantiated under local advertising rules; flag what to check.
{{> output/uncertainty}}
</constraints>

<output_format>
## Campaign summary

## Objective and audience

## Campaign idea

## Brand assets to build

## Reach and frequency plan
Arithmetic with assumptions labelled.

## Channels and timing
A table: Channel | Role | Budget | Flight dates | Expected reach and frequency.

## Measurement

## Risks
</output_format>
