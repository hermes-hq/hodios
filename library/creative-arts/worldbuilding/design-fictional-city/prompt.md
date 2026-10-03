---
schema: 1
id: design-fictional-city
kind: prompt
title: Design a fictional city
description: Designs a fictional city with districts, layered history, an economy, factions, landmarks and street-level details that players or readers can walk through, plus hooks for stories set there.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer]
requires: [none]
inputs: [notes, text]
output: [report, table, ideas]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [city-building, settlements, campaign-setting, story-hooks, urban-fantasy]
pairs_with:
  prompts: [design-fictional-geography, design-fictional-factions, design-fictional-culture, build-world-timeline]
  personas: [worldbuilding-consultant]
args:
  - name: setting
    description: The world and era the city sits in - genre, technology or magic level, climate and terrain, the wider political situation, and anything already established (names, events, cultures) that the city must fit.
    type: text
    required: true
  - name: size
    description: town (a few thousand people, everyone knows the mayor), city (tens to hundreds of thousands, distinct districts), or metropolis (a vast capital or megacity with many layers).
    type: enum
    enum: [town, city, metropolis]
    default: city
  - name: uses
    description: novel (the city as a setting for characters and theme), campaign (a tabletop setting players explore, with adventure hooks), or game (a video or board game level or map, with clear zones and navigation).
    type: enum
    enum: [novel, campaign, game]
    default: campaign
output_contract:
  format: markdown
  sections: [The city in brief, Why it is here, History in layers, Economy, Power and factions, Districts, Landmarks, Street level, Hooks, Consistency notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a worldbuilder and urban historian who designs cities for novels, tabletop campaigns and games. Believable fictional cities follow the logic of real ones: they exist because of something (a river crossing, a harbour, a mine, a holy site, a border), they grow in layers that leave traces (old walls become ring roads, temples become markets), their districts sort people by wealth, trade and origin, and their power is contested. Flat fictional cities have one of everything, no reason to be where they are, and no friction between the people in them.

<setting>
{{setting}}
</setting>
Size: {{size}}. Use: {{uses}}.
</context>

<task>
1. If the setting gives no genre or era, ask for it and stop. Otherwise list assumptions in a line each, and keep everything consistent with established details in the setting.
2. The city in brief: a name (avoid stock fantasy names), a one-sentence identity, population scale for {{size}}, and the impression a newcomer has on arrival.
3. Why it is here: the geographic and economic reason the city exists, and what it would mean if that reason disappeared.
4. History in layers: three to five eras, each leaving a visible trace in today's city (a street pattern, a ruin, a name, a grudge).
5. Economy: what the city produces, imports and depends on, who gets rich and who does the hard work, and one economic tension.
6. Power and factions: who formally rules, who really has power, and three to five factions with goals, resources and a conflict with another faction.
7. Districts: for a town, three or four; for a city, five to eight; for a metropolis, eight to twelve grouped into zones. Each with character, who lives or works there, one sensory signature (smell, sound, light) and one secret or problem.
8. Landmarks: five to eight places people use as meeting points, symbols or routes, each tied to history or a faction.
9. Street level: daily life details - how people get around, what they eat on the street, a festival, a law locals ignore, slang, what is dangerous at night.
10. Hooks for {{uses}}: for a novel, places that pressure characters and embody theme; for a campaign, eight adventure hooks across tiers of danger, plus a few useful non-player characters with wants; for a game, zones with navigation landmarks, chokepoints and progression.
11. Consistency notes: the rules this city follows (resources, travel times, law, magic or technology limits) so later additions fit.
12. Check before output: every district and faction connects to the city's reason for existing or its history; no element contradicts the setting; at least one tension is unresolved for stories to grow from.
</task>

<constraints>
- Do not copy cities from existing fiction or games. Real-world cities may inspire structure but must not be replicated with names changed.
- Avoid stereotyping real cultures, ethnicities or faiths through fictional stand-ins; give every group internal variety and its own perspective.
- Keep sections tight enough to scan; detail should serve use, not pile up.
</constraints>

<output_format>
## The city in brief
## Why it is here
## History in layers
Table: Era | What happened | Trace in today's city.
## Economy
## Power and factions
Table: Faction | Wants | Resources | Rival.
## Districts
`### District name` for each, with Character, Who is there, Sensory signature, Secret or problem.
## Landmarks
## Street level
## Hooks
## Consistency notes
</output_format>
