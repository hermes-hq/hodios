---
schema: 1
id: structure-meta-ads-account
kind: prompt
title: Structure a Meta ads account
description: Sets up a Meta ads account structure for a business's goal and spend, with campaigns, ad sets, Advantage+ choices, budgets, optimisation events, exclusions and naming.
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
tags: [meta-ads, campaign-structure, advantage-plus, learning-phase, budget-allocation, account-consolidation]
pairs_with:
  prompts: [define-ad-audiences, plan-ad-conversion-tracking, plan-ad-creative-tests, write-social-ad-variations]
  personas: [paid-media-specialist]
  workflows: [ad-campaign-launch-track]
args:
  - name: business
    description: What you sell, to whom, where, average order or deal value, and whether you sell online, take leads or bookings.
    type: text
    required: true
  - name: goal
    description: The business result you want (sales, qualified leads, bookings, app sign-ups) and the target cost per result or ROAS, if known.
    type: string
    required: true
  - name: monthly_budget
    description: Planned monthly spend on Meta and the currency.
    type: string
    required: true
  - name: assets
    description: What you have to work with, for example a product catalogue, customer lists, site traffic volume, pixel and Conversions API status, number of creatives you can produce per month.
    type: text
  - name: current_setup
    description: The current account structure if one exists (campaigns, ad sets, budgets, results). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Account structure, Campaign settings, Audiences and exclusions, Creative per ad set, First 14 days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants a Meta (Facebook and Instagram) ads account set up or rebuilt so the delivery system can learn. Meta's algorithm optimises each ad set toward one event, and it needs a steady volume of that event per ad set per week to leave the learning phase; Meta publishes guidance on that volume, and it changes, so it must be checked. The most common mistake is fragmentation: many small ad sets split by interest, age or placement, each starving for data, with audiences overlapping and competing in the same auctions. Experts consolidate: few campaigns, broad or lightly guided targeting, the creative doing the targeting, and the deepest optimisation event the budget can feed (purchase over add to cart, qualified lead over any lead). Advantage+ options (automated audience, placements, campaign budget, sales campaigns) suit accounts with clean conversion data and enough creative; manual control still helps for strict exclusions, small local radii or regulated categories.
</context>

<task>
Business: {{business}}
Goal: {{goal}}
Monthly budget: {{monthly_budget}}
{{#assets}}Assets: {{assets}}{{/assets}}
{{#current_setup}}Current setup:
<current_setup>
{{current_setup}}
</current_setup>{{/current_setup}}

1. If conversion tracking status is unknown, say that structure depends on it and list what to confirm first (pixel, Conversions API, which events fire, deduplication). Continue with stated assumptions.
2. Work out the data budget: daily budget divided by the expected cost per optimisation event gives events per day. Compare per-ad-set weekly events with Meta's current learning-phase guidance (tell the user to check the figure). If the deepest event cannot reach it, recommend a shallower event or fewer ad sets, and say the trade-off.
3. Propose the structure: number of campaigns (typically a prospecting or sales campaign, a retargeting campaign only if spend and audience size justify it, and an optional creative testing campaign), the ad sets in each, and why. Fewer is the default; justify every split with a different goal, geography, margin or audience that needs a different message.
4. For each campaign give objective, optimisation event, budget level (campaign or ad set) and daily amount, bid strategy (highest volume by default; cost cap only with a reliable target), attribution setting, and whether to use the Advantage+ version, with the condition that would change the answer.
5. Audiences and exclusions: targeting per ad set (broad, Advantage+ audience with suggestions, custom audiences, lookalikes), what to exclude (recent purchasers, existing customers, employees, out-of-area), and how to keep prospecting and retargeting from overlapping. Note any special ad category the business may fall in (housing, employment, credit, social issues) and that it limits targeting.
6. Creative per ad set: how many ads, which angles and formats, and the replacement cadence.
7. Naming convention for campaigns, ad sets and ads so reports can be grouped later.
8. If a current setup was given, map old to new: what to pause, merge or keep, and how to migrate without losing all learning at once.
9. First 14 days: what not to touch, what to check daily, and the conditions for the first change.
</task>

<constraints>
- Do not state Meta thresholds, minimum budgets, specs or policy as fact; describe them and say to confirm in Meta's current help pages. Feature names and options change.
- Do not invent cost per result. If the user gave none, use an explicit assumption and show how the plan changes if it is double.
- Never recommend more ad sets than the budget can feed. Push back on interest-by-interest splits at small budgets and explain why.
- Keep the plan inside the stated budget; show the daily split adds up.
</constraints>

<output_format>
## Assumptions
Bullets: tracking status, cost per event assumed, events per week this implies.

## Account structure
A table: Campaign | Purpose | Ad sets | Daily budget | Optimisation event. Then the naming convention with one example.

## Campaign settings
Per campaign: objective, budget level, bid strategy, attribution, Advantage+ choices, and when to change them.

## Audiences and exclusions
A table: Ad set | Targeting | Exclusions | Overlap note.

## Creative per ad set
Number of ads, angles, formats, refresh cadence.

## First 14 days
A checklist: hands-off rules, daily checks, triggers for the first change. Include migration steps if an old setup existed.
</output_format>
