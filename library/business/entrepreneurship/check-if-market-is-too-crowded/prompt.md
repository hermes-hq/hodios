---
schema: 1
id: check-if-market-is-too-crowded
kind: prompt
title: Check if a market is too crowded
description: Judges whether a crowded market still has room for your new business from competitor gaps, customer switching behaviour and underserved segments, and names the angle of entry if there is one.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover]
role: [founder, individual]
requires: [none]
inputs: [text, notes]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [market-saturation, competitor-gaps, switching-costs, underserved-segment, entry-strategy]
pairs_with:
  prompts: [validate-business-idea, analyze-competitors, check-search-demand-for-idea, analyze-competitor-reviews]
  personas: [startup-mentor]
args:
  - name: idea
    description: Your planned business - what you would offer, to whom, where, and at what rough price.
    type: text
    required: true
  - name: competitors
    description: What you know about competitors - names or types, prices, what customers praise and complain about (reviews, forums), how long they have been around, and any that closed recently.
    type: text
    required: true
  - name: your_edge
    description: Anything you think could set you apart - skills, location, access, a cost advantage, a community. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Market picture, Signs of room, Signs of saturation, Underserved segments, Possible angles, Verdict, What to check next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders decide whether a crowded market is worth entering. Many competitors is often a sign of real demand, not a reason to stay out; the question is whether a newcomer can win customers at a sustainable price. Signs of room: customers complain about the same things across competitors, many buyers are dissatisfied but stay because switching is merely inconvenient, segments are ignored (a location, a budget level, a type of customer, a language), incumbents are slow or expensive, and new entrants have recently grown. Signs of saturation: prices are falling and competitors compete mainly on discounts, customers are loyal or locked in by contracts or switching costs, a few players control distribution, advertising costs are high, and recent entrants have closed. A newcomer usually wins by being much better for a narrow segment, not slightly better for everyone.

<idea>
{{idea}}
</idea>

<competitors>
{{competitors}}
</competitors>
{{#your_edge}}
<your_edge>
{{your_edge}}
</your_edge>
{{/your_edge}}
</context>

<task>
1. Market picture: group competitors by type (big players, local independents, low-cost, premium, substitutes such as do-it-yourself) and how they compete (price, quality, convenience, specialisation).
2. Signs of room: list evidence from the founder's information, quoting complaints or gaps.
3. Signs of saturation: list evidence, including price pressure, switching costs, distribution control and recent closures.
4. Underserved segments: customer groups whose needs are poorly met, with the evidence and a rough sense of whether the segment is big enough for the founder's goals.
5. Possible angles of entry: two or three specific positions (for example "the only one serving X", "faster", "for beginners", "a different business model"), each tied to evidence and the founder's edge, with what it would cost competitors to copy.
6. Verdict: room for a focused entrant, room only with a clear angle, or too crowded for this founder now, with reasons.
7. What to check next: the evidence still missing and the cheapest way to get it.
</task>

<constraints>
- Use only the competitor information given. Do not invent competitors, their prices, market shares or reviews; where something matters and is missing, say how to find it.
- Do not conclude "too crowded" from the number of competitors alone.
- An angle must be one the founder can deliver; say if the founder's stated edge is easy to copy.
</constraints>

<output_format>
## Market picture
Table: Competitor type | Examples given | How they compete.
## Signs of room
## Signs of saturation
## Underserved segments
## Possible angles
Table: Angle | Evidence | Fit with your edge | Ease to copy.
## Verdict
## What to check next
</output_format>
