---
schema: 1
id: compete-with-bigger-rival
kind: prompt
title: Compete with a bigger rival
description: Works out how a small business competes when a chain, platform or big rival moves in - where it cannot win, where it can, and the moves to make first.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, operations-manager]
requires: [none]
inputs: [text, notes]
output: [report, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [small-vs-large, differentiation, niche-strategy, local-business, competitive-position]
pairs_with:
  prompts: [plan-competitive-response, assess-competitive-advantage, draw-strategy-canvas, profile-a-competitor]
  personas: [small-business-advisor]
args:
  - name: business
    description: Your business - what you sell, to whom, size, results, what customers say they value, and your costs if you know them.
    type: text
    required: true
  - name: rival
    description: The bigger rival - who they are, what they offer, their prices and opening date if known, and what has already changed (lost customers, footfall, staff poached).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The honest picture, Where you cannot win, Where you can win, Strategy, First 90 days, Signals to watch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise small businesses facing a much larger competitor: a supermarket chain next to a grocer, a national platform entering a local service market, a big-box store near a hardware shop. The instinct is to match the rival's prices, which a small business usually cannot sustain because the rival buys cheaper and can run losses. Small businesses that survive pick the customers and occasions the big rival serves badly: expertise and advice, speed and flexibility, customisation, relationships, local knowledge, niche range, trust. They also cut the parts of the offer where the rival is clearly better, rather than defending everything. Some customers will leave regardless; the plan should say which ones and protect the rest.
</context>

<task>
Work out how this business competes:

<business>
{{business}}
</business>

<rival>
{{rival}}
</rival>

1. The honest picture: which customers and products are most exposed, the rival's structural advantages (buying power, brand, convenience, capital) and anything already lost. Say plainly if the core of the business is at risk.
2. Where you cannot win: name the battles not to fight (usually price on commodity lines, opening hours or range breadth), and what to do with those lines (reprice, shrink, drop, or keep as traffic drivers).
3. Where you can win: score candidate advantages (expertise, service, speed, customisation, relationships, local or niche range, quality, community) on whether customers value it, whether the rival can easily copy it, and whether you can deliver it profitably. Use only advantages supported by the material or mark them as hypotheses to test.
4. Strategy: pick one main position and up to three supporting moves (target customer, offer changes, pricing on non-comparable items, partnerships, channels, loyalty). Include what you will stop.
5. First 90 days: actions with owner, cost range and the measure that shows it is working, ordered by speed of effect on cash.
6. Signals to watch: the leading indicators of whether the strategy is holding and the trigger that would mean a bigger rethink (for example selling, merging or exiting a line).
</task>

<constraints>
- Ground everything in the material; mark assumptions. Do not invent the rival's prices, costs or plans.
- Do not recommend sustained below-cost price matching; if price matters, show the margin effect.
- Do not suggest misleading claims about the rival, fake reviews or comparative advertising that cannot be substantiated.
- Respect the owner's constraints on time and cash.
{{> output/uncertainty}}
</constraints>

<output_format>
## The honest picture
Short paragraph plus exposure table: Customer or product | Exposure (high/medium/low) | Why.

## Where you cannot win
Bullets with what to do with each line.

## Where you can win
Table: Advantage | Customer value | Hard to copy | Profitable | Evidence or test.

## Strategy
Main position, supporting moves, what we stop.

## First 90 days
Table: Action | Owner | Cost | Measure | Week.

## Signals to watch
Bullets with the trigger for a rethink.
</output_format>
