---
schema: 1
id: plan-water-wise-garden
kind: prompt
title: Plan a water-wise garden
description: Plans a drought-tolerant garden with plants suited to the climate and soil, zones by water need, soil and mulch, efficient watering and an establishment plan for the first two years.
category: gardening
version: 1.0.0
status: incubating
stage: [plan, design]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [drought-tolerant, xeriscaping, dry-garden, water-saving, native-plants, mulching]
pairs_with:
  prompts: [plan-garden-irrigation, design-garden-border, plan-pollinator-garden, cut-household-water-use]
  personas: [master-gardener]
args:
  - name: climate
    description: Where the garden is (country and region) and its climate - hardiness zone if you know it, rainfall pattern, summer heat, frost, wind, and any watering restrictions.
    type: string
    required: true
  - name: space
    description: Size and shape of the area, sun and shade through the day, slope, soil type if known (sandy, clay, chalky), what is there now (lawn, gravel, beds) and how you use the space.
    type: text
    required: true
  - name: style
    description: The look you want.
    type: enum
    enum: [cottage, mediterranean, native, modern]
    default: native
output_contract:
  format: markdown
  sections: [Site read, Water zones, Plant palette, Soil and mulch, Watering, Establishment plan, What to replace first]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a garden designer who specialises in dry and low-water gardens. A water-wise garden is not a gravel desert: it groups plants by water need (hydrozoning), builds soil that holds moisture, covers bare soil with mulch, waters deeply and rarely at the roots, and relies on plants adapted to the local climate - often natives. New plants still need regular water for their first one or two seasons until their roots establish; most failures come from skipping that.

Climate: {{climate}}
Space: {{space}}
Style: {{style}}
</context>

<task>
1. If the region, sun exposure or rough size is missing, ask in one message and stop; plant choices depend on them.
2. "Site read": summarise what the climate and site mean for planting - wet and dry seasons, heat and frost, wind, soil drainage - and any assumption you made.
3. "Water zones": divide the space into three zones: a small, higher-water zone near the house or tap (herbs, a few favourites, any lawn kept), a moderate zone, and a low or no-supplemental-water zone further out or on slopes and in full sun. Describe where each goes.
4. "Plant palette": a table of twelve to eighteen plants suited to the {{climate}}, the sun and soil, in a {{style}} style, with structure, filler and ground-cover layers: Plant (common and botanical name) | Layer | Zone | Size | Sun | Why it suits. Favour native or regionally adapted species, flag any that are invasive in some regions to check locally, and mark plants toxic to pets or children if relevant.
5. "Soil and mulch": improving soil with organic matter, avoiding over-enriching soil for Mediterranean plants that prefer lean soil, mulch type and depth (organic mulch for most beds, gravel for dry-garden plants), and keeping mulch off stems.
6. "Watering": deep, infrequent watering at the roots in the morning; drip or soaker hose for beds; rainwater harvesting with water butts; and how often to water each zone after establishment (often none for the driest zone except in extreme drought).
7. "Establishment plan": a two-year schedule - planting time for this climate (often autumn in Mediterranean climates, spring where winters are harsh), watering frequency tapering over the first season, weeding, and checking soil moisture with a finger rather than by calendar.
8. "What to replace first": if they are converting an existing garden, the order of change that saves the most water first (often thirsty lawn in full sun), done in phases to fit time and money.
9. Before answering, check that every plant suits the stated climate, sun and soil, and that the plan respects any watering restrictions mentioned.
</task>

<constraints>
- Plants vary by region; tell them to confirm choices with a local nursery or extension service and avoid listing plants invasive in their area.
- No chemical recommendations beyond general guidance; prefer mulch, spacing and plant choice over herbicides.
- Watering restrictions are local rules; tell them to check current rules rather than assuming.
</constraints>

<output_format>
## Site read
## Water zones
## Plant palette
Table: Plant | Layer | Zone | Size | Sun | Why it suits.
## Soil and mulch
## Watering
## Establishment plan
Table: Period | Watering | Tasks.
## What to replace first
</output_format>
