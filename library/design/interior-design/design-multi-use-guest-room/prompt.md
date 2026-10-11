---
schema: 1
id: design-multi-use-guest-room
kind: prompt
title: Design a guest room that does another job
description: Designs a spare room that works as a guest room a few nights a year and an office, hobby or exercise room the rest, with the right sleeping option, storage and a quick changeover routine.
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
tags: [guest-room, spare-room, sofa-bed, dual-purpose, furniture-layout]
pairs_with:
  prompts: [set-up-home-office, plan-room-layout]
args:
  - name: room
    description: Room size with units, where the door, window, radiator and sockets are, and any built-in storage.
    type: text
    required: true
  - name: uses
    description: The everyday use (office, crafts, music, exercise, storage), how often and how long guests stay, who they are (older parents, children, couples), and what you need to keep in the room.
    type: text
    required: true
  - name: constraints
    description: Budget with currency, renting or owning, and furniture you are keeping. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Which use leads, Sleeping options, Floor plan, Storage, Guest comforts, Changeover routine, Shopping order]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interior designer who plans spare rooms. A room that tries to be a full guest room and a full office at once usually does neither: a double bed eats the floor for 360 days to serve 5, or the guest sleeps among work papers. The design starts by deciding which use leads, from how many days a year each happens, and then picks a sleeping option for the guests you actually get. Sofa beds, daybeds with trundles, wall beds and good folding beds differ a lot in comfort, height and the floor space they need when open. Older guests need a bed at a sensible height and a clear route to the bathroom at night; couples need a real double. Guests also need a place for a case, hooks, a surface, a lamp by the bed and somewhere the host's things are put away.

Room: {{room}}
Uses: {{uses}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. State assumptions. If the room size or the guests' needs are missing, ask for them.
2. Decide which use leads from the days per year of each, and say what that means for the plan.
3. Compare sleeping options for these guests (sofa bed, daybed with trundle, wall bed, futon, good folding bed, inflatable kept as backup), with floor space closed and open, comfort, height and how hard it is to set up. Recommend one.
4. Draw a text floor plan in both modes, everyday and guest, to a stated scale, checking that the bed opens fully without hitting the desk or door and that routes stay clear.
5. Plan storage so the everyday use can be closed away: a cupboard or closing desk, lidded boxes, a cleared drawer or rail for guests.
6. List guest comforts: bedside surface and lamp, hooks or a rail, a luggage spot, a mirror, blackout, a night light for the route to the bathroom, a socket for charging.
7. Write a changeover routine with how long each step takes, for before and after a stay.
8. Give a shopping order.
</task>

<constraints>
- Check the arithmetic in both modes: an open sofa bed or wall bed plus clearances must fit with everything else in the room.
- Wall beds must be fixed to a suitable wall per the maker's instructions; renters should ask the landlord.
- Keep work equipment and cables away from where a guest walks at night, and keep the route to the door clear.
- Do not name brands or quote prices as fact.
</constraints>

<output_format>
## Assumptions
## Which use leads
## Sleeping options
Table: Option | Floor space closed | Floor space open | Comfort | Set-up effort | Fits these guests?
## Floor plan
Two fenced text plans, everyday and guest mode, with scale and legend.
## Storage
## Guest comforts
Checklist.
## Changeover routine
## Shopping order
</output_format>
