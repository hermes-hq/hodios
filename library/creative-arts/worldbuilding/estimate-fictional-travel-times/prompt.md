---
schema: 1
id: estimate-fictional-travel-times
kind: prompt
title: Estimate fictional travel times
description: Estimates how long journeys take in a fictional world by foot, horse, cart, ship, airship or starship, accounting for terrain, weather, rest and supply, and checks a story's timeline against them.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [plan]
role: [writer, gamer, game-developer]
requires: [none]
inputs: [notes, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [travel-times, journeys, map-scale, story-timeline, internal-consistency]
pairs_with:
  prompts: [design-fictional-geography, build-world-timeline, find-worldbuilding-plot-holes, design-fictional-calendar]
  personas: [worldbuilding-consultant]
args:
  - name: journeys
    description: The trips to estimate - start, end, distance or map scale if known, terrain and route, the travellers (a lone rider, an army, a merchant caravan, a crew), and the transport and season.
    type: text
    required: true
  - name: timeline
    description: Optional. Story events that depend on these journeys, for example "the messenger leaves on day 1 and the army must arrive before the siege on day 12", so the estimate can check them.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Speeds used, Journey estimates, Timeline check, What changes the numbers, On the page]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a worldbuilder who checks travel and logistics for fiction and games. Novices assume travellers move at full speed all day every day. In practice, a healthy walker on a decent road covers roughly 30 km a day and less on rough ground; horses are faster for a day or two but must rest and graze, so long horse journeys are not much faster per day than walking unless horses are changed at relay stations; carts and armies are slower still, often 15 to 25 km a day, and large forces are slowed by their baggage and supply; sailing depends on wind and current and varies widely; mountains, rivers, forests, rain, snow and short winter days all cut distance. Messages travel as fast as the fastest relay, which is why news and orders lag. Science-fiction travel has its own constraints (acceleration, fuel, jump rules) that need the same discipline.

<journeys>
{{journeys}}
</journeys>
{{#timeline}}
<timeline>
{{timeline}}
</timeline>
{{/timeline}}
</context>

<task>
1. If no distances, map scale or route descriptions are given and none can be reasonably inferred, ask for distance or a map scale and stop. Otherwise list assumptions in one line each, including any distance you infer.
2. Speeds used: a table of the daily rates you apply for each traveller and transport type, adjusted for terrain and season, with the reasoning. Give ranges, and say these are rough rules of thumb drawn from historical travel, not exact figures.
3. Journey estimates: for each journey, the route broken into legs with terrain, distance, days per leg and rest days, then a fast, typical and slow total.
4. Timeline check{{#timeline}}: test each event in the timeline against the estimates, mark it as fits, tight or impossible, and suggest the smallest change that makes impossible events work (a shortcut, a relay, a delay, a later date){{/timeline}}. If no timeline was given, note that and skip this check.
5. What changes the numbers: the factors most likely to speed up or slow down these particular journeys (weather, river crossings, bandits, a ferry, magic or technology) and by how much.
6. On the page: five to seven details that make the journey's duration felt (blisters, changing horses, rationing, the weather turning, a milestone).
7. Check before output: the totals add up from the legs; armies and caravans are slower than single riders; the season's daylight and weather are reflected.
</task>

<constraints>
- Show the arithmetic so the author can adjust it.
- Do not present rules of thumb as precise historical data; give ranges.
- Respect any travel rules already fixed in the setting (portals, airships, jump drives); apply their limits consistently.
- This is for fiction and games, not real trip planning.
</constraints>

<output_format>
## Assumptions
## Speeds used
Table: Traveller or transport | Terrain | Daily range | Notes.
## Journey estimates
Table per journey: Leg | Terrain | Distance | Days. Then fast, typical and slow totals.
## Timeline check
Table: Event | Needs | Estimate | Verdict | Fix.
## What changes the numbers
## On the page
</output_format>
