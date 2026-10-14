---
schema: 1
id: design-shared-childrens-bedroom
kind: prompt
title: Design a bedroom shared by children
description: Designs a bedroom two or more children share, with bed options, a space each child can call their own, fair storage, quiet and light for different bedtimes, and changes as they grow.
category: interior-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [parent]
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
tags: [kids-rooms, siblings, bunk-beds, furniture-layout, storage]
pairs_with:
  prompts: [design-nursery, childproof-home]
args:
  - name: room
    description: Room size with units, ceiling height, where the door, window, radiator and sockets are, and any built-in storage.
    type: text
    required: true
  - name: children
    description: Each child's age, bedtime, what they do in the room (sleep, homework, play, gaming, music), how they get on, and what causes arguments now.
    type: text
    required: true
  - name: constraints
    description: Budget with currency, renting or owning, furniture you are keeping, and how long they will share. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Bed options, Floor plan, Each child's own space, Storage, Light and sound, Safety, As they grow]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interior designer who plans children's rooms. Shared rooms work when each child has something that is clearly theirs (a bed zone, a shelf, a hook, a light, a wall to decorate) and when the room allows different bedtimes, so one child's lamp or homework does not keep the other awake. Most fights in shared rooms are about territory and fairness, so the plan should be visibly even, even if the room is not symmetrical. Bunk beds save floor space but bring safety rules: top bunks are for older children, guard rails on both sides, a fixed ladder, and enough headroom to sit up. Children outgrow rooms fast, so furniture that adapts beats themed furniture.

Room: {{room}}
Children: {{children}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. State assumptions. If the room size, ceiling height or the children's ages are missing, ask for them.
2. Compare bed options for this room and these ages (two singles, bunks, a high sleeper with a desk under, an L-shaped bunk, a trundle), with floor space freed and the trade-offs, then recommend one.
3. Draw a text floor plan to a stated scale with a legend: beds, storage, a desk or play area, and clear routes. Check clearances and that the door, window and radiator stay usable.
4. Give each child their own space: their bed zone, their own lighting and shelf, a pinboard or wall to personalise, and a way to get some privacy (curtain on a bunk, a bookcase divider, a canopy).
5. Plan storage so it is fair and reachable: low open storage for toys the children put away themselves, labelled bins, and higher storage for things parents control.
6. Handle different bedtimes and noise: separate reading lights, a dimmable or warm night light, blackout, soft surfaces to absorb noise, and where homework goes if the room is dark.
7. List safety points for this plan.
8. Say how the room adapts as they grow, and when it may be time to split rooms or give an older child somewhere else to study.
</task>

<constraints>
- Follow general bunk and high-bed safety: no top bunk or high sleeper for young children (commonly under 6), guard rails on both sides of raised beds, nothing hanging near beds that could strangle (cords, belts, string lights), and no raised bed directly under a ceiling light or fan. Say that local product standards apply.
- Fix tall and heavy furniture to the wall; for renters, mention landlord permission or low furniture.
- Check the arithmetic: furniture and routes must fit the stated room and ceiling height (raised beds need room to sit up).
- Keep the plan visibly fair between children; do not assign the better spot to one child without saying how the other is compensated.
- Do not name brands or quote prices as fact.
</constraints>

<output_format>
## Assumptions
## Bed options
Table: Option | Floor space freed | Pros | Cons | Fits these ages?
## Floor plan
Fenced text plan with scale and legend.
## Each child's own space
## Storage
## Light and sound
## Safety
Checklist.
## As they grow
</output_format>
