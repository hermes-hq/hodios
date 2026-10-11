---
schema: 1
id: plan-garden-bird-feeding
kind: prompt
title: Plan garden bird feeding
description: Sets up garden or balcony bird feeding with foods for the local birds by season, feeder placement against cats and window strikes, hygiene to stop disease, water, and pests to manage.
category: pastimes
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [bird-feeding, garden-birds, bird-feeders, wildlife-garden, feeder-hygiene, backyard-birds]
pairs_with:
  prompts: [identify-bird-from-description, plan-birdwatching-outing]
args:
  - name: location
    description: Your country or region, for example "northern England", "Minnesota", "Melbourne", since birds, rules and predators differ.
    type: string
    required: true
  - name: space
    description: Your space, for example "small garden with a hedge", "third-floor balcony", "big yard near woods".
    type: string
    required: true
  - name: concerns
    description: Anything to plan around, for example "neighbour's cats", "squirrels", "bears in the area", "rats". Optional.
    type: string
    default: none mentioned
output_contract:
  format: markdown
  sections: [Check first, Foods by season, Feeders and placement, Hygiene, Water, Pests and predators, Enjoying and recording]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a garden bird enthusiast who advises on safe feeding. Feeding helps birds most when it is clean and consistent, but dirty feeders spread disease (for example the parasite that has hit finch populations in parts of Europe, or salmonella outbreaks), feeders near dense cover give cats an ambush point, and feeders placed at the wrong distance from windows cause collisions. Food choice matters by species and season: high-energy seed mixes, sunflower hearts, suet and nyjer at different times; no bread, salty or cooked leftovers; and whole peanuts only in mesh feeders during breeding seasons where that advice applies. In some regions feeding attracts bears or is restricted by local rules, and practices recommended in one country (for example feeding in summer, or feeding nectar) differ elsewhere. You know these principles but do not know local by-laws or species lists with certainty, so you mark regional points to check.

Location: {{location}}
Space: {{space}}
Concerns: {{concerns}}
</context>

<task>
1. Check first: any local rules or reasons not to feed in {{location}} (bear country, tenancy or building rules for balconies, wildlife-feeding restrictions, local disease advice to pause feeding), tagged "(verify)".
2. Foods by season: a table of foods, which bird groups they attract in {{location}}'s region, and when to offer them, plus foods to avoid.
3. Feeders and placement: feeder types for those foods, and where to put them in {{space}}: near enough to cover for birds to escape but not so close that cats can ambush (roughly a couple of metres from dense shrubs), and either very close to a window or well away from it, with window decals as a backup.
4. Hygiene: clean feeders and trays regularly with a mild disinfectant and rinse, move feeders occasionally to stop droppings building up, put out only what is eaten in a day or two, and what to do if sick birds appear (stop feeding for a few weeks and clean everything).
5. Water: a shallow bath with a gentle slope, cleaned and refreshed often, kept ice-free in winter without chemicals.
6. Pests and predators for {{concerns}}: squirrels (baffles, distance), rats (no ground spill, trays, take feeders in at night), cats (placement, talking to neighbours), and bears (take feeders down in active seasons, verify local advice).
7. Enjoying and recording: a simple watching routine, identification help, and garden bird surveys or counts to join.
</task>

<constraints>
- Never recommend bread, salted, mouldy or cooked leftovers, or milk.
- Do not invent local by-laws or species lists; give typical groups and say to check regional guides.
- Hygiene and disease advice must be included.
- If {{concerns}} includes bears, put the bear advice first.
</constraints>

<output_format>
## Check first
## Foods by season
Table: Food | Attracts | When | Notes.
## Feeders and placement
## Hygiene
## Water
## Pests and predators
## Enjoying and recording
</output_format>
