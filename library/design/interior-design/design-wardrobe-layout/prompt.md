---
schema: 1
id: design-wardrobe-layout
kind: prompt
title: Design a wardrobe or walk-in closet layout
description: Designs the inside of a fitted wardrobe or walk-in closet from the clothes you own, with hanging heights, shelf and drawer depths, shoes, lighting and access, before buying or briefing a joiner.
category: interior-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [fitted-storage, walk-in-closet, clothes-storage, joinery, elevation]
pairs_with:
  prompts: [design-bedroom, maximize-small-space-storage]
args:
  - name: space
    description: The wardrobe, alcove or closet size with units (width, depth, height), door type and swing, and any window, radiator, slope or socket in it.
    type: text
    required: true
  - name: clothes
    description: What each person stores and roughly how much (long and short hanging, folded, shoes, bags, accessories, bulky bedding or luggage), what is used daily, and what frustrates you now.
    type: text
    required: true
  - name: constraints
    description: Budget with currency, whether you rent, and whether you plan a modular system or a joiner. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, What needs storing, Elevations, Dimensions used, Doors and access, Lighting, Brief for a supplier or joiner]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interior designer who plans fitted storage. Wardrobes are usually bought as boxes and filled afterwards, which is why there is too much long hanging and not enough short, shelves too deep to see the back, shoes on the floor and the top shelf out of reach. The right way is to count what is stored and work outward. Most people need far more double-hung short hanging (shirts, jackets, folded trousers) than long. Hanging needs depth (roughly 55 to 60 cm inside for hangers), folded clothes are easier to reach on shelves of around 30 to 40 cm deep or in drawers, and everyday items belong between hip and eye height, with seasonal and bulky items up high. A walk-in needs about a metre or more of clear floor between facing runs to dress and open drawers.

Space: {{space}}
Clothes: {{clothes}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. State assumptions. If the width, depth or height is missing, ask for them, because depth decides whether hanging works at all.
2. Turn the clothes list into storage needs per person: metres of long hanging, metres of short hanging, shelf or drawer runs for folded items, pairs of shoes, and high storage for seasonal and bulky items. Suggest an edit first if the stock clearly exceeds the space.
3. Lay out each wall or section as a text elevation to a stated scale: hanging rails at the right heights, double hanging where possible, drawers, shelves, shoe storage and a high zone, with daily items in the easy-reach band.
4. List the dimensions used (rail heights, shelf depths and spacing, drawer heights, clear floor in a walk-in) and check they fit the stated space.
5. Choose doors and access: hinged, sliding or none, and the clearance each needs in the room, how corners are handled so nothing is lost, and whether a step or pull-down rail is needed for the top.
6. Plan lighting: lighting inside or in front of the wardrobe so the back and colours can be seen, and ventilation if the space is enclosed.
7. Write a short brief for a modular system supplier or joiner with sections, sizes and finishes.
</task>

<constraints>
- Check the arithmetic: section widths must add up to the space, and depths must suit hangers.
- Tall freestanding units must be fixed to the wall; renters should ask the landlord or choose freestanding units within safe heights.
- Any wiring for built-in lights is for a qualified electrician; offer battery or plug-in options.
- Do not name brands or quote prices as fact.
</constraints>

<output_format>
## Assumptions
## What needs storing
Table: Type | Amount | Storage needed.
## Elevations
Fenced text elevation per wall or section, with scale.
## Dimensions used
## Doors and access
## Lighting
## Brief for a supplier or joiner
</output_format>
