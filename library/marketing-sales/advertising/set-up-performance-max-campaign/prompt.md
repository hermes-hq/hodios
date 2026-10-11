---
schema: 1
id: set-up-performance-max-campaign
kind: prompt
title: Set up a Performance Max campaign
description: Plans a Google Performance Max campaign with asset groups, audience signals, search themes, brand exclusions, feed use, guardrails and how to read results without being misled.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, marketer, consultant]
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
tags: [google-ads, performance-max, asset-groups, audience-signals, brand-exclusions, merchant-feed]
pairs_with:
  prompts: [optimize-shopping-feed, decide-brand-keyword-bidding, plan-ad-conversion-tracking, calculate-break-even-roas]
  personas: [paid-media-specialist]
  workflows: [ad-campaign-launch-track]
args:
  - name: business
    description: What you sell, online shop or lead generation, product range or services, margins or average order value, and countries targeted.
    type: text
    required: true
  - name: goal
    description: The result to optimise for and the target (for example "purchases at 400% ROAS", "qualified leads at 80 USD") and whether new customers matter more than repeat ones.
    type: string
    required: true
  - name: budget
    description: Daily or monthly budget for this campaign and the currency.
    type: string
    required: true
  - name: existing_campaigns
    description: Other Google Ads campaigns running (brand search, non-brand search, Shopping) with rough spend and results. Optional.
    type: text
  - name: assets_and_data
    description: Merchant Center feed status, conversion actions tracked, customer lists, available images, videos, logos and copy. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Campaign settings, Asset groups, Audience signals and search themes, Exclusions and guardrails, How to read results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants to launch or rebuild a Google Performance Max (PMax) campaign. PMax buys across search, Shopping, YouTube, display, Discover, Gmail and Maps from one budget, guided by conversion goals, assets, a product feed and audience signals. What experts know: audience signals are hints, not targeting, so they do not limit who sees ads; PMax readily takes credit for branded searches and existing customers who would have bought anyway, so brand exclusions and a separate brand search campaign matter; it optimises toward whatever is marked as a primary conversion, so a soft action (page view, any form) left as primary produces cheap, worthless results; for shops, the feed decides most of the inventory, so feed quality beats asset polish; asset groups should split by product theme or margin band, not by audience; and reporting is limited, so you judge it on business results, incrementality and the channel and search-term insights Google provides. Lead generation PMax attracts spam leads unless optimisation is tied to qualified leads.
</context>

<task>
Business: {{business}}
Goal: {{goal}}
Budget: {{budget}}
{{#existing_campaigns}}Existing campaigns: {{existing_campaigns}}{{/existing_campaigns}}
{{#assets_and_data}}Assets and data: {{assets_and_data}}{{/assets_and_data}}

1. Fit check: say whether PMax suits this account now. Warn if conversion tracking is weak, conversion volume is very low for the budget, a lead business has no way to feed back lead quality, or the feed has many disapprovals. Recommend fixes first, or a standard search or Shopping campaign instead, when that is the better start.
2. Campaign settings: conversion goals (which are primary for this campaign), bid strategy and whether to start with a target or without, budget, locations and languages, new customer acquisition setting if relevant, final URL expansion on or off with the reason, and URL exclusions (blog, careers, support pages).
3. Asset groups: propose 2 to 5 split by product category, margin band or service line, with the listing group or feed filter for each, and the assets each needs (headlines, long headlines, descriptions, images in each aspect ratio, logos, videos). Note that without a supplied video Google may auto-generate one, and recommend supplying one.
4. Audience signals and search themes: per asset group, which customer lists, site visitors, custom segments from search terms or competitor sites, and search themes to supply, and why.
5. Exclusions and guardrails: brand exclusions and how to pair with a brand search campaign, negative keywords at account level if available, placement or content exclusions, customer list exclusion or new-customer settings, and how PMax interacts with existing search and Shopping campaigns.
6. How to read results: the minimum run time before judging (a few conversion cycles, not days), the reports to check (channel performance, search term insights, asset and listing group performance), how to spot brand or retargeting cannibalisation (blended results, brand search trend, new versus returning customers), and the decision rules for raising budget or targets.
</task>

<constraints>
- Do not quote asset counts, character limits, image sizes or feature availability as fixed; list what is needed and tell the user to confirm limits in Google's current help pages, since PMax features change often.
- Do not promise results or invent ROAS, CPA or conversion rate figures. Use the user's numbers or labelled assumptions.
- Judge success on business outcomes (revenue, profit, qualified leads, new customers), not platform-reported conversions alone.
- If the user has no conversion tracking, do not proceed to a full plan; give the tracking steps first.
</constraints>

<output_format>
## Fit check
Verdict in one line, then blockers and fixes.

## Campaign settings
A table: Setting | Choice | Why.

## Asset groups
A table: Asset group | Products or services | Feed filter | Assets needed | Landing page.

## Audience signals and search themes
Per asset group, bullets.

## Exclusions and guardrails
Checklist of exclusions and how PMax coexists with other campaigns.

## How to read results
Timeline, reports to check, cannibalisation tests, and decision rules.
</output_format>
