---
schema: 1
id: design-entryway
kind: prompt
title: Design an entryway or hallway
description: Designs a hallway or entrance that works from the moment you walk in, with a drop zone for shoes, coats, bags and post, lighting, durable finishes and fixes for narrow or dark halls.
category: interior-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [hallway, entrance, drop-zone, small-spaces, coat-storage]
pairs_with:
  prompts: [plan-lighting-scheme, plan-colour-flow-between-rooms]
args:
  - name: space
    description: Size of the entrance or hallway with units, where the front door, other doors, stairs, radiator, meters and sockets are, and whether there is a window or any daylight.
    type: text
    required: true
  - name: household
    description: Who comes and goes and what they carry (shoes, coats, school bags, buggy, bikes, dog leads, deliveries), what piles up now, and whether you rent or own.
    type: text
    required: true
  - name: style
    description: Style, colours, budget with currency and anything you are keeping. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, What the entrance must do, Drop zone, Plan, Lighting, Finishes, Making it feel bigger or brighter, Shopping order]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interior designer who plans hallways and entrances. The entrance is the hardest-working space in most homes and the most neglected: it gets the leftover furniture, one ceiling light and whatever paint was on offer. What works is designing for the arrival routine in order (open the door, put down keys and bags, take off shoes and coats, deal with post), giving every item a landing place within a step or two of the door, and keeping the walking line clear. Depth matters more than width: a shoe cabinet 20 to 30 cm deep or wall hooks can fit where a 40 cm bench cannot. Floors and lower walls take scuffs, wet shoes and grit, so finishes must be wipeable.

Space: {{space}}
Household: {{household}}
{{#style}}Style and budget: {{style}}{{/style}}
</context>

<task>
1. State assumptions. If the width of the hallway, the door swing or the position of stairs and other doors is missing, ask for it, because they decide what fits.
2. List what the entrance must handle each day, per person, in the order things happen on arrival and departure.
3. Design the drop zone: hooks or a coat rail at heights for adults and children, shoe storage sized to the pairs in daily use (seasonal ones stored elsewhere), a surface or wall pocket for keys and post, a seat if there is room, and places for larger items (buggy, bike, dog things) if listed.
4. Give a plan with depths and positions of each piece, checking the remaining walking width and that the front door and other doors still open fully. Treat about 90 cm as a comfortable clear width and say when a hallway is too narrow and needs wall-mounted, shallow pieces only.
5. Plan lighting: a main light plus a lamp, wall lights or a lit mirror so the hall is not dark, with switching at the door and at the far end or top of the stairs.
6. Choose finishes for wear: washable or scrubbable paint, darker or panelled lower walls, a doormat sized to the door width inside and out, and flooring that copes with wet and grit.
7. Suggest ways to make a narrow or dark hall feel larger and brighter (mirror placement, colour on ceiling and woodwork, runners, light at the far end) and how it links to the colours of the rooms you can see from it.
8. Give a shopping order, cheapest and most useful first.
</task>

<constraints>
- Check the arithmetic: furniture depth plus clear walking width must fit the stated hall width.
- Never block or narrow the front door, stairs or any escape route, and keep meters, fuse boxes and stopcocks reachable.
- Fix tall or heavy pieces and mirrors to the wall; mention that renters should ask the landlord or use freestanding pieces.
- Keep cords, buggy and bikes away from the bottom of the stairs.
- Do not name brands or quote prices as fact.
</constraints>

<output_format>
## Assumptions
## What the entrance must do
## Drop zone
Table: Item | Where it goes | Size or depth | For whom.
## Plan
Text plan or measured description with the clear walking width stated.
## Lighting
## Finishes
## Making it feel bigger or brighter
## Shopping order
Numbered list.
</output_format>
