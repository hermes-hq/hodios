---
schema: 1
id: plan-youtube-ads-campaign
kind: prompt
title: Plan a YouTube ads campaign
description: Plans YouTube ads with campaign type and format choice, targeting, bidding, budget, creative lengths, brand safety exclusions and how to measure views, lift and conversions.
category: advertising
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, consultant]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
stack: [youtube]
tags: [google-ads, video-campaigns, custom-segments, brand-safety, view-through]
pairs_with:
  prompts: [write-video-ad-script, plan-media-budget, define-ad-audiences, design-geo-holdout-test]
  personas: [paid-media-specialist, ad-creative-strategist]
  workflows: [ad-campaign-launch-track]
args:
  - name: business
    description: What you sell, to whom, where, price point, and whether you sell online, by lead or in stores.
    type: text
    required: true
  - name: goal
    description: What the campaign must achieve, for example awareness in a region, consideration before a launch, or direct sales or leads, with any target cost.
    type: string
    required: true
  - name: budget
    description: Budget and flight dates, with currency.
    type: string
    required: true
  - name: creative
    description: Videos you have or can make (lengths, horizontal or vertical, captions), or "none yet".
    type: text
  - name: audience
    description: Who should see the ads, known customer lists, and topics or channels your audience watches. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goal and campaign type, Targeting, Bidding and budget, Creative plan, Brand safety and exclusions, Measurement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants to run YouTube ads through Google Ads. The first decision is the job: reach and frequency (awareness), views and engagement (consideration), or conversions. Each maps to a different campaign type, bid strategy and creative, and mixing them in one campaign produces muddy results. Google reorganises YouTube campaign types often (for example, conversion-focused video has been moving into Demand Gen), so the current options must be checked in the account. What experts know: skippable ads must earn the first few seconds, show the brand and the problem early, and work with sound off via captions; short bumpers support reach, not persuasion; vertical creative is needed for Shorts inventory; custom segments built from people's search terms and competitor sites usually outperform broad topic targeting for performance goals; content and placement exclusions protect the brand, especially on children's and sensitive content; and view-through conversions overstate impact, so lift studies or geo tests are the honest measure for upper-funnel spend.
</context>

<task>
Business: {{business}}
Goal: {{goal}}
Budget: {{budget}}
{{#creative}}Creative: {{creative}}{{/creative}}
{{#audience}}Audience: {{audience}}{{/audience}}

1. Goal and campaign type: map the goal to the campaign type and formats (skippable in-stream, non-skippable, in-feed, Shorts, bumpers) and say why. If the user wants both awareness and conversions, split into separate campaigns and say how budget divides.
2. Targeting: build audiences from customer lists, site visitors, custom segments from search terms and competitor or category sites, in-market or life-event segments where relevant, and placements or topics only when they add something. Say which audiences to exclude (existing customers for acquisition, recent converters).
3. Bidding and budget: bid strategy per campaign matched to its goal, daily budget and flight, frequency caps for reach campaigns, and the minimum run time before judging.
4. Creative plan: which lengths and aspect ratios to produce, what must happen in the first five seconds, captions and end screen, how many versions to rotate, and what to do if no video exists yet (simple formats that can be made cheaply).
5. Brand safety and exclusions: content types, sensitive categories, made-for-kids content, live streams or embedded players to exclude, and a placement report review routine.
6. Measurement: primary metrics per campaign (reach and frequency, view rate and cost per view, conversions and cost per conversion), how to treat view-through conversions, whether a brand lift or search lift study is worth requesting (check eligibility with Google), and a geo or holdout option for honest incrementality.
</task>

<constraints>
- Do not state CPVs, CPMs, view rates, minimum budgets for lift studies or format specs as fact; tell the user to confirm current figures and campaign types in Google Ads.
- Do not promise sales from awareness spend; separate what each campaign can and cannot show.
- If there is no creative and no budget to make it, say that the creative is the bottleneck before planning media.
</constraints>

<output_format>
## Goal and campaign type
A table: Campaign | Goal | Campaign type and formats | Share of budget.

## Targeting
Per campaign: audiences, exclusions, and why.

## Bidding and budget
Bid strategy, budget, frequency caps, run time before judging.

## Creative plan
A table: Version | Length | Aspect ratio | First five seconds | Placement.

## Brand safety and exclusions
Checklist.

## Measurement
Metrics per campaign, view-through stance, lift or geo test option, review schedule.
</output_format>
