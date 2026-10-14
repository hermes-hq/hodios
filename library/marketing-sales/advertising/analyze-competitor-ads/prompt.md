---
schema: 1
id: analyze-competitor-ads
kind: prompt
title: Analyse competitors' ads
description: Analyses competitors' ads from public ad libraries and search results for angles, offers, formats, hooks and longevity, then finds gaps and turns them into ads to test.
category: advertising
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [marketer, founder, consultant]
requires: [none]
inputs: [text, image, notes]
output: [report, table, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [competitor-research, ad-library, creative-angles, offer-analysis, positioning-gaps]
pairs_with:
  prompts: [analyze-competitors, plan-ad-creative-tests, write-ad-creative-brief, write-social-ad-variations]
  personas: [ad-creative-strategist]
  workflows: [ad-campaign-launch-track]
args:
  - name: competitor_ads
    description: Notes, transcripts or screenshots of competitors' ads, with for each the competitor, platform, start date or how long it has run, format, copy, offer and landing page.
    type: text
    required: true
  - name: your_business
    description: What you sell, your price and positioning, your proof, and the angles you already run.
    type: text
    required: true
  - name: market
    description: Country or region and platforms reviewed. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What was reviewed, Competitor patterns, Long runners, Gaps and openings, Tests to run]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user has collected competitors' ads (from public ad libraries such as Meta's Ad Library, Google's Ads Transparency Center, LinkedIn's ad library and TikTok's creative and ad library tools, or from search results) and wants to learn from them. What experts know: an ad that has run for months is a better signal than one that just launched, because advertisers rarely keep paying for losers, but longevity is still a proxy, not proof; the useful unit is the angle and offer, not the visual style; patterns across competitors show what the market has converged on and therefore where everyone sounds the same; gaps (objections nobody answers, audiences nobody speaks to, proof nobody shows, formats nobody uses) are where a challenger can stand out; and copying a competitor's creative or trademark is both risky and pointless.
</context>

<task>
<competitor_ads>
{{competitor_ads}}
</competitor_ads>
Your business: {{your_business}}
{{#market}}Market: {{market}}{{/market}}

1. What was reviewed: count ads per competitor and platform, date range, and what is missing (for example no search ads, no landing pages). If the sample is small, say conclusions are tentative.
2. Code each ad: competitor, angle (problem, outcome, comparison, social proof, price, urgency, founder, demonstration), hook, offer, format, length, call to action, landing page type, and how long it has run.
3. Competitor patterns: for each competitor, their main angles, offers and formats, and what that suggests about their positioning. Then patterns shared across the market.
4. Long runners: the ads running longest, what they have in common, and the caveat that longevity is a proxy.
5. Gaps and openings: angles, objections, audiences, proof types, offers and formats underused by competitors that fit the user's strengths.
6. Tests to run: 5 to 8 ad concepts for the user, each with the gap it fills, the hook, the format, and the result that would confirm it, written in the user's own voice and proof.
</task>

<constraints>
- Describe only what is in the supplied ads; do not invent competitors' spend, results or targeting. Ad libraries generally do not show performance; say so.
- Do not recommend copying competitors' creative, slogans or trademarks; recommend differentiated concepts.
- Do not invent proof for the user's concepts; use what they supplied and mark where proof is needed.
- Comparative claims about named competitors carry legal risk; flag them for review against local advertising rules.
</constraints>

<output_format>
## What was reviewed
Bullets and a coverage note.

## Competitor patterns
A table: Competitor | Main angles | Offers | Formats | Positioning read.
Then shared market patterns.

## Long runners
A table: Ad | Competitor | Running since | Angle | Why it may work.

## Gaps and openings
Bullets, each with evidence.

## Tests to run
A table: Concept | Gap filled | Hook | Format | Success signal.
</output_format>
