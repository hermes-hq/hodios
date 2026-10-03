---
schema: 1
id: build-creator-rate-card
kind: prompt
title: Build a creator rate card
description: Builds a creator rate card for sponsored posts, videos and bundles from audience size, engagement and usage rights, with negotiation ranges and add-ons. Use when setting or raising brand deal prices.
category: social-media
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
inputs: [dataset, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rate-card, brand-deals, usage-rights, deal-negotiation, sponsorship-pricing]
pairs_with:
  prompts: [write-media-kit, pitch-brand-sponsorship, plan-creator-monetization]
args:
  - name: audience_metrics
    description: Per platform, with the date range - followers, average views or plays per post over the last 10 to 20 posts, engagement, audience location and age, plus past deal prices and any rates peers have shared with you.
    type: text
    required: true
  - name: deliverable_types
    description: What you offer, for example a dedicated YouTube video, a 60-second integration, Reels, stories, TikToks, newsletter placements, and how long each takes you to make.
    type: text
    required: true
  - name: niche
    description: Your niche and audience, for example "personal finance for nurses in the UK".
    type: string
output_contract:
  format: markdown
  sections: [Inputs and assumptions, Base rates, Add-ons, Bundles, Negotiation ranges, Pushback replies, Put in writing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help creators price brand deals. Brands buy attention from a specific audience, so the starting point is what a typical post actually delivers (average views or plays, not followers), adjusted for how engaged and how valuable the audience is, and for what the brand gets beyond the post. The parts that creators most often underprice: usage rights (the brand using the content in its own ads or channels, especially paid ads or whitelisting through the creator's handle), exclusivity (not working with competitors for a period), production time, rush timelines, extra revisions and raw footage. Market rates vary widely by platform, niche, country and audience, and published benchmarks go stale quickly, so a good rate card shows its formula so the creator can recalibrate it with real offers.
</context>

<task>
<metrics>
{{audience_metrics}}
</metrics>

<deliverables>
{{deliverable_types}}
</deliverables>

<niche>
{{niche}}
</niche>

1. **Inputs and assumptions.** List the figures you will use per platform (average views or plays, engagement, audience) and flag any that are missing, stale or follower-only. Choose a reference rate per thousand views for each platform: derived from the creator's past deals or peer rates if given (show the maths), otherwise a clearly labelled placeholder variable `[CPM]` with how to calibrate it.
2. **Base rates.** For each deliverable: base = average views / 1,000 × the rate per thousand, then adjust for engagement versus the creator's own norm, niche value (audiences with high purchase intent or professional buyers usually price higher), and production time. Show the formula, each adjustment and the result. Never present a number as "the market rate".
3. **Add-ons.** Price as a percentage of the base or a fixed fee, with what each covers: organic usage rights on the brand's channels (per 30 days), paid usage or whitelisting (per 30 days), exclusivity (by category and duration), rush delivery, extra revision rounds, raw footage, link in bio or pinned comment duration, and cross-posting to another platform.
4. **Bundles.** Two or three packages that combine deliverables at a modest discount, each with the brand outcome it suits (launch awareness, ongoing presence, conversions).
5. **Negotiation ranges.** For each base rate: the opening ask, the target and the floor (the price below which the creator declines), with the reasoning, plus non-cash trades they could accept instead of dropping price (fewer revisions, shorter usage, no exclusivity).
6. **Pushback replies.** Short replies for "our budget is X", "can you do it for product only", "other creators charge less", and "we need perpetual usage rights".
7. **Put in writing.** The terms every deal confirmation should include.
</task>

<constraints>
- Use only the figures given. Do not inflate reach or invent past deals or peer rates.
- Mark every assumption, and keep the maths visible so the creator can change one input and redo it.
- Remind the creator that sponsored content needs a clear disclosure on every platform, and that tax on income varies by country.
- If the metrics are too thin to price (no views data), say so and give the structure with placeholders and what data to gather.
</constraints>

<output_format>
## Inputs and assumptions
Bullets with the reference rate per platform and its source.

## Base rates
A table: deliverable | platform | average views | formula | adjustments | base rate.

## Add-ons
A table: add-on | price | covers.

## Bundles
A table: bundle | contents | price | best for.

## Negotiation ranges
A table: deliverable | ask | target | floor | trade-offs instead of a discount.

## Pushback replies
Each scenario with a two to three sentence reply.

## Put in writing
A checklist.
</output_format>
