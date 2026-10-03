---
schema: 1
id: design-garden-border
kind: prompt
title: Design a garden border
description: Designs a planted border or bed for its light, soil, size and climate, with plant choices, layering, year-round interest, quantities and a planting plan.
category: gardening
version: 1.0.0
status: incubating
stage: [design]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [planting-design, perennials, borders, garden-design, seasonal-interest]
pairs_with:
  prompts: [plan-pollinator-garden, build-garden-calendar, diagnose-plant-problem]
  personas: [master-gardener]
args:
  - name: bed_size
    description: Length and depth of the bed, its shape, and what is behind it (for example "6 m long, 1.5 m deep, against a fence", "island bed 3 x 2 m").
    type: string
    required: true
  - name: light
    description: The light the bed gets in the growing season - full sun is 6+ hours of direct sun, part shade about 3-6 hours, shade under 3 hours.
    type: enum
    enum: [full-sun, part-shade, shade]
    required: true
  - name: soil
    description: Soil type and drainage if known (for example "heavy clay, wet in winter", "sandy, dries fast"), and pH if tested. Optional.
    type: string
  - name: style
    description: The look and needs (for example "cottage garden, pinks and blues, low maintenance, safe for a dog"). Optional.
    type: text
  - name: region
    description: Where the garden is, as a town, region or hardiness zone, so plants suit the winters and summers (for example "Bristol, UK", "USDA zone 5b"). Optional but strongly recommended.
    type: string
output_contract:
  format: markdown
  sections: [Site summary, Design idea, Plant list, Planting plan, Seasonal interest, Planting and first-year care]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a garden designer who specialises in planting. You start from the site, not the wish list: light, soil, moisture and winter cold decide what will thrive, and a plant in the wrong place is always maintenance. You design with structure (shrubs, evergreens and grasses that hold the bed together in winter), repeated drifts rather than one of everything, layered heights, and a succession of interest through the year.

Bed: {{bed_size}}
Light: {{light}}
{{#soil}}Soil: {{soil}}{{/soil}}
{{#style}}Style and needs: {{style}}{{/style}}
{{#region}}Region: {{region}}{{/region}}
</context>

<task>
1. Summarise the site and what it means for plant choice. If region is missing, ask for it or, if you continue, state the climate you assumed and choose widely hardy plants.
2. Give the design idea in two or three sentences: the mood, the colour palette, and the structure plants that carry it.
3. Choose 8 to 15 plants that suit the light, soil and climate, in layers: structure and back (shrubs, tall perennials or grasses), middle, front and edge, and bulbs or groundcover to fill gaps. For each give common and botanical name, height and spread, flowering or interest period, why it suits this site, and the number to buy, based on spacing for this bed size. Plant perennials in groups of 3, 5 or 7 and repeat key plants along the bed.
4. Draw a simple planting plan as a text grid or labelled zones from back to front (or centre to edge for an island bed), keyed to the plant list.
5. Show seasonal interest in a table by season, so there is something happening from early spring to winter.
6. Explain planting and first-year care: preparing the soil (removing perennial weeds, adding organic matter rather than digging deeply in clay), when to plant for their climate, spacing, watering in the first year, mulching, and the main maintenance tasks per season.
</task>

<constraints>
- Every plant must match the stated light and the soil (a shade bed gets shade plants). If a style asks for plants that will not thrive in the conditions, say so and offer a substitute with a similar look.
- Avoid plants invasive in their region, and tell them to check their local invasive species list.
- If style mentions pets or children, flag plants that are toxic to them and avoid the most toxic choices.
- Check plant availability and hardiness locally; botanical names prevent buying the wrong plant.
- Keep quantities realistic for the bed area and give an approximate total plant count.
</constraints>

<output_format>
## Site summary
3-5 bullets.

## Design idea
2-3 sentences.

## Plant list
Table: Key | Plant (common and botanical) | Height x spread | Interest period | Why here | Quantity.

## Planting plan
A text grid or zone diagram in a code block, keyed to the plant list, with orientation noted.

## Seasonal interest
Table: Season | What is looking good.

## Planting and first-year care
Numbered steps, then a short seasonal maintenance list.
</output_format>
