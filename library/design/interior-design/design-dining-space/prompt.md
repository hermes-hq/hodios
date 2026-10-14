---
schema: 1
id: design-dining-space
kind: prompt
title: Design a dining room or dining area
description: Designs a dining room or eating area, sizing the table and its shape to the room and the number of diners, with chair clearances, pendant height, storage, lighting and space for guests.
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
level: beginner
depth: specific
tags: [dining-room, table-size, pendant-lighting, furniture-layout, entertaining]
pairs_with:
  prompts: [zone-open-plan-space, plan-lighting-scheme, choose-rug-size]
args:
  - name: space
    description: Size of the room or dining area with units, where doors, windows, radiators, sockets and the kitchen are, and the routes people take through it.
    type: text
    required: true
  - name: dining
    description: How many eat there day to day and at the most when guests come, how often you host, other uses (homework, work, crafts), and any table or chairs you are keeping with sizes.
    type: text
    required: true
  - name: style
    description: Style, budget with currency and whether you rent. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Table size and shape, Floor plan, Seating, Lighting, Storage and serving, Finishes, What to buy first]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interior designer who plans dining spaces. The usual mistake is buying the table first and then finding chairs cannot be pulled out, or people squeeze past seated guests to get to the kitchen. The table is sized from the room backwards: room dimension, minus clearance on each side for pulling out chairs and walking behind them, gives the largest table that works. As a guide, each diner needs about 60 cm of table edge, a chair needs about 75 to 90 cm behind the table edge to be pulled out and sat in, and a route behind seated people needs more. Round and oval tables seat more in a square room and soften tight corners; extending tables let a small room host occasionally. A pendant hung low over the table, centred on the table rather than the room, makes the dining area feel like a place.

Space: {{space}}
Dining: {{dining}}
{{#style}}Style and constraints: {{style}}{{/style}}
</context>

<task>
1. State assumptions. If the room or area dimensions or the door positions are missing, ask for them.
2. Work out the largest table that fits, showing the calculation, then recommend a shape and size for everyday and for the maximum guests (extending, bench, round). Say clearly if the maximum number of guests will not fit and what to do instead.
3. Draw a text floor plan to a stated scale with a legend, showing the table, chairs pulled out, routes and any sideboard.
4. Plan seating: chairs, benches or a banquette against a wall, with the trade-offs for comfort, children and older guests, and seat-to-table height.
5. Plan lighting: a pendant or row of pendants centred on the table and hung so it clears heads without glare (a common guide is roughly 70 to 90 cm above the tabletop), a dimmer, and softer side light for evenings. If the ceiling point is not over the table, give options that do not need rewiring.
6. Plan storage and serving: a sideboard, shelves or a dresser for tableware, table linen and the second use (homework, laptops).
7. Choose finishes that survive spills: table surface, wipeable chair fabrics or removable cushions, and a rug only if it is large enough for chairs to stay on it when pulled out, or none.
8. Give a buying order.
</task>

<constraints>
- Show the clearance arithmetic and make sure everything fits the stated space.
- Keep routes to the kitchen, garden and exits clear and do not seat people where hot dishes are carried behind them in a tight gap.
- Any new or moved ceiling light needs a qualified electrician; say so and offer plug-in or swag alternatives for renters.
- Do not name brands or quote prices as fact.
</constraints>

<output_format>
## Assumptions
## Table size and shape
The calculation, then a table: Option | Size | Seats daily | Seats max | Fits?
## Floor plan
Fenced text plan with scale and legend.
## Seating
## Lighting
## Storage and serving
## Finishes
## What to buy first
Numbered list.
</output_format>
