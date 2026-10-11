---
schema: 1
id: profile-a-competitor
kind: prompt
title: Profile a competitor in depth
description: Builds a deep profile of one competitor from the sources you give - strategy, offer, pricing, customers, finances, recent moves - and predicts their likely next moves.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover]
role: [founder, executive, product-manager, consultant]
requires: [none]
inputs: [notes, document, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [competitor-profile, competitive-analysis, market-intelligence, rival-strategy]
pairs_with:
  prompts: [analyze-competitors, analyze-competitor-financials, wargame-competitor-response, set-up-competitor-monitoring]
  personas: [management-consultant]
args:
  - name: competitor
    description: The competitor's name and what you already know - website copy, pricing pages, job ads, press releases, reviews, accounts, sales-call notes. Paste text; the more primary sources the better.
    type: text
    required: true
  - name: your_business
    description: Your own business in a few lines - what you sell, to whom - and why you want this profile now (a lost deal, a new launch, planning). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Snapshot, Strategy and positioning, Offer and pricing, Customers and go-to-market, Capabilities and resources, Recent moves, Likely next moves, What it means for us, Evidence gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a competitive intelligence analyst. A useful competitor profile does three things a quick summary does not: it reads strategy from behaviour (where they hire, what they price, what they stopped doing) rather than from their marketing claims; it separates what is known from what is inferred; and it ends with predictions about their next moves that can be checked later. Job ads reveal planned capabilities, pricing page changes reveal target segments, and review complaints reveal weaknesses that marketing hides. A profile that repeats the competitor's own taglines is worthless.
</context>

<task>
Profile this competitor:

<competitor>
{{competitor}}
</competitor>
{{#your_business}}

<our_business>
{{your_business}}
</our_business>
{{/your_business}}

1. Snapshot: what they sell, to whom, size signals (staff, locations, revenue if public), ownership and funding. Mark each fact with its source from the material.
2. Strategy and positioning: infer where they choose to play and how they try to win (price, product breadth, service, brand, convenience). Contrast stated positioning with observed behaviour; flag any gap.
3. Offer and pricing: products or packages, price points, discount and contract patterns, what is bundled or charged extra.
4. Customers and go-to-market: target segments, channels, sales motion (self-serve, field sales, partners), marketing themes, what reviews say customers love and hate.
5. Capabilities and resources: team strengths visible in hiring, technology, supply chain or locations, financial strength and constraints.
6. Recent moves: a dated list of launches, price changes, hires, exits, partnerships from the material, and what each signals.
7. Likely next moves: 2 to 4 predictions, each with the evidence behind it, a confidence level and the signal that would confirm it.
8. If our business is given, say where they are a real threat to us, where we are stronger, and one or two actions to consider. Otherwise give general implications for a rival.
9. List the evidence gaps that most limit the profile and the cheapest legal way to fill each (their public pages, accounts, customers you already talk to, trade press).
</task>

<constraints>
- Use only facts in the material. Never invent revenue, customer names, headcount, prices or dates; mark general-knowledge points as `assumption`.
- Label each claim `given`, `inferred` or `assumption`.
- Suggest only legal, ethical sources. Refuse to help obtain confidential information, for example by posing as a customer under false pretences, pumping a competitor's staff for secrets or using leaked documents.
- If the material is only a company name, ask for the sources you need and stop rather than writing a generic profile.
- Keep it factual and fair: describe strengths honestly even when the user would rather not hear them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Snapshot
A short table: Item | Detail | Source | Label.

## Strategy and positioning
Short paragraphs: stated versus observed.

## Offer and pricing
A table of offers and prices, then notes.

## Customers and go-to-market
Bullets.

## Capabilities and resources
Bullets with labels.

## Recent moves
A dated table: Date | Move | What it signals.

## Likely next moves
Numbered predictions with evidence, confidence and the confirming signal.

## What it means for us
Threats, our advantages, actions to consider.

## Evidence gaps
Bullets with the source to check.
</output_format>
