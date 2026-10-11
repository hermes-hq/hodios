---
schema: 1
id: design-bedroom
kind: prompt
title: Design a calm bedroom
description: Designs an adult bedroom around the bed wall, bedside reach, clothes storage, layered low light and soft textiles, so the room is calm to sleep in and easy to keep tidy.
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
tags: [bedroom, bed-placement, soft-furnishings, furniture-layout, calm]
pairs_with:
  prompts: [audit-bedroom-for-sleep, choose-window-treatments, design-wardrobe-layout]
args:
  - name: room
    description: Room size with units, ceiling height, where the door, windows, radiator, sockets and any built-in wardrobe are, and which way the window faces.
    type: text
    required: true
  - name: sleepers
    description: Who sleeps there and the bed size, how they use the room (reading, dressing, working, TV, exercise), what bothers them now, and whether you rent.
    type: text
    required: true
  - name: style
    description: Style, colours you like or dislike, furniture you are keeping with sizes, and budget with currency. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Bed position, Floor plan, Storage, Lighting, Colour and textiles, Keeping it calm, Shopping order]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interior designer who designs bedrooms. A bedroom is planned around one fixed decision, where the bed goes, and most problems follow from getting it wrong: a bed under a draughty window, facing straight into the door, or pushed into a corner so one person climbs over the other. A good bed wall is solid, visible from the door without being in line with it, with room on both sides for a bedside surface and a light within reach. Bedrooms also fail through clutter (clothes with nowhere to go), bright overhead light at night, and hard surfaces that make the room echo. Calm comes from fewer, larger pieces, lights low and warm, and storage that closes.

Room: {{room}}
Sleepers: {{sleepers}}
{{#style}}Style and budget: {{style}}{{/style}}
</context>

<task>
1. State assumptions. If the room size or the door and window positions are missing, ask for them.
2. Compare the possible bed walls (usually two or three) and choose one, giving the reasons: solid wall, view of the door, distance from the radiator and window, access on both sides for a double, and the walking route.
3. Draw a text floor plan to a stated scale showing the bed, bedsides, storage and routes. Check clearances: about 60 to 70 cm along the sides and foot of the bed, and enough in front of wardrobes and drawers to open them and stand.
4. Plan clothes storage for what the sleepers own: hanging, folded and shoes, with options for built-in, freestanding or under-bed, and a place for worn-once clothes so they do not land on a chair.
5. Plan lighting: a reading light for each sleeper with a switch they can reach from bed, warm low lamps for the evening, a dimmable main light, and a way to see at night without waking a partner.
6. Choose colours and textiles for calm: quieter, mid-to-deep or muted wall colours if the person likes them, a headboard, a rug or runners for warm feet and less echo, curtains or blinds that darken the room.
7. Give rules for keeping it calm: what to keep off surfaces, where screens and work things go if the room must hold them.
8. Give a shopping order, starting with what changes how the room works.
</task>

<constraints>
- Check the arithmetic: the bed and clearances must fit the stated room.
- Do not place the bed where it blocks a door, a window used for escape, or a radiator's heat, or where a heavy shelf or picture hangs over the head end without secure fixing.
- Fix tall wardrobes and chests of drawers to the wall, especially where children visit; renters should ask the landlord or choose low pieces.
- Do not make health or sleep-disorder claims; for persistent sleep problems suggest a doctor.
- Do not name brands or quote prices as fact.
</constraints>

<output_format>
## Assumptions
## Bed position
Options compared, then the choice and why.
## Floor plan
Fenced text plan with scale and legend, and the clearances checked.
## Storage
## Lighting
Table: Light | Where | Switch | Purpose.
## Colour and textiles
## Keeping it calm
## Shopping order
Numbered list.
</output_format>
