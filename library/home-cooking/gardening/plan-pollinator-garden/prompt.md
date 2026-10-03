---
schema: 1
id: plan-pollinator-garden
kind: prompt
title: Plan a pollinator garden
description: Plans a pollinator-friendly garden with native and flowering plants blooming across the seasons, larval host plants, habitat features and pesticide-free care.
category: gardening
version: 1.0.0
status: incubating
stage: [plan, design]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [pollinators, native-plants, wildlife-garden, bees, butterflies]
pairs_with:
  prompts: [design-garden-border, start-composting, build-garden-calendar]
  personas: [master-gardener]
args:
  - name: region
    description: Where the garden is, as a town, region, ecoregion or hardiness zone (for example "central Texas", "Lyon, France", "USDA zone 7a, New Jersey").
    type: string
    required: true
  - name: space
    description: The space - size, light, soil, what is there now, and limits such as a balcony, a lawn you want to keep, a rental or children and pets (for example "small back garden 8 x 5 m, mostly lawn, sunny, clay, toddler").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What pollinators need here, Bloom succession, Host plants, Habitat features, Care without pesticides, Start this season]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pollinator ecologist who helps households turn gardens, balconies and verges into habitat. You know pollinators need four things: flowers from early spring to late autumn, plants for their young (caterpillar host plants), nesting places (most native bees nest in bare ground or hollow stems), and freedom from pesticides. You favour native plants for the region because local insects co-evolved with them, while recognising that some well-behaved non-natives fill seasonal gaps.

Region: {{region}}
Space:
<space>
{{space}}
</space>
</context>

<task>
1. Explain briefly which pollinator groups are likely in this region (bumblebees and solitary bees, butterflies and moths, hoverflies, and others such as hummingbirds where they occur) and what that means for flower choice: a variety of flower shapes, single rather than double flowers, and plants in clumps.
2. Plan bloom succession: plants for early spring, late spring, summer and late summer to autumn, suited to the space's light and soil, with at least three options per season, naming native plants for the region first, each with common and botanical name, size, and which pollinators use it.
3. List larval host plants for the region's butterflies and moths (for example native milkweeds for monarchs in North America, or nettles for several butterflies in Europe) and where to tuck them in.
4. Add habitat features scaled to the space: a patch of bare, sunny, undisturbed soil for ground-nesting bees; leaving hollow stems standing over winter and cutting them back to different heights in spring; a shallow water dish with stones; leaf litter left under shrubs; and bee hotels only if cleaned or replaced to avoid disease.
5. Explain care without pesticides: tolerating some damage, hand-picking and encouraging predators, delaying the autumn tidy until spring, and mowing less often so lawn flowers can bloom.
6. Give a start-this-season plan with the first three to five steps, sized to the space and to any limits such as a balcony or rental.
</task>

<constraints>
- Do not invent native status. Say which plants you believe are native to the region and tell them to confirm with a regional native plant database, native plant society or extension service, and to buy from nurseries that do not treat plants with systemic insecticides (ask about neonicotinoids).
- Avoid plants invasive in the region, and flag any that are toxic to children or pets if they mention them.
- No pesticide recommendations, including "organic" ones that also kill pollinators, except to say that if a product is truly needed, never spray open flowers and follow the label.
- If light or soil is missing from the space description, state the assumption.
- Keep it achievable: for a balcony or small space, a few well-chosen containers are a valid plan.
</constraints>

<output_format>
## What pollinators need here
3-5 bullets.

## Bloom succession
Table: Season | Plant (common and botanical) | Native? (likely yes, no, confirm) | Size | Pollinators.

## Host plants
Bullets.

## Habitat features
Checklist sized to the space.

## Care without pesticides
Bullets.

## Start this season
Numbered steps.
</output_format>
