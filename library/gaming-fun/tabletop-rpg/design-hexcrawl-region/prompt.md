---
schema: 1
id: design-hexcrawl-region
kind: prompt
title: Design a hexcrawl region
description: Designs a wilderness hexcrawl region with a keyed hex map, travel and navigation procedure, encounter and weather tables, landmarks seen from afar, and secrets to discover.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [design]
role: [gamer]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [hexcrawl, wilderness-travel, sandbox, game-mastering, exploration]
pairs_with:
  prompts: [design-random-tables, design-dungeon, design-campaign-arc]
  personas: [dungeon-master]
args:
  - name: region
    description: The kind of land (marsh, highland, frontier forest), its history, who lives there, the party level, and what the campaign wants players to find or do there.
    type: text
    required: true
  - name: size
    description: Rough region size. Small is about 20 hexes, medium about 40, large about 80 (only part of a large map is keyed).
    type: enum
    enum: [small, medium, large]
    default: small
  - name: system
    description: Game system, for example dnd-5e, pathfinder-2e, an old-school system, or "any fantasy system".
    type: string
    default: any fantasy system
output_contract:
  format: markdown
  sections: [Region overview, Map layout, Hex key, Travel procedure, Encounter table, Weather, Rumours, Running notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a game master who runs wilderness sandboxes where travel is play, not a montage. A hexcrawl works when players make informed choices about where to go: landmarks visible from neighbouring hexes, rumours that point somewhere, and terrain that changes speed and danger. It fails when every hex is empty forest or when every hex holds a full dungeon. Experienced designers key a moderate share of hexes, layer each keyed hex (what anyone sees, what a search finds, a secret), tie contents to a few factions and an underlying history, and run travel with a simple, repeatable procedure: choose a direction, check navigation, check encounters per watch, track supplies and time.

Region: {{region}}
Size: {{size}}
System: {{system}}
</context>

<task>
1. If the party level or the kind of land is missing, ask and stop. State the hex scale you use (default six miles across) and your other assumptions.
2. Region overview: the history in three or four sentences, two or three factions or powers with what they want, and the region's central secret.
3. Map layout: a coordinate grid description (for example columns A to F and rows 1 to 6) giving terrain per hex or band, rivers, roads and where the players enter, clear enough to draw from.
4. Hex key: key about a third to a half of the hexes, up to 20 entries. For each: coordinate, name, what anyone passing sees, what searching finds, and a secret or hook. Mark which landmarks are visible from adjacent hexes.
5. Travel procedure: movement rate by terrain, how navigation and getting lost work, encounter checks per watch or day, foraging and supplies, using {{system}} rules where they exist and a simple stated procedure where they do not.
6. Encounter table: a d12 or 2d6 table mixing creatures, faction patrols, travellers, omens and environmental events, each with a hint of why it is there.
7. Weather: a short table or rule for the season and how weather affects travel.
8. Rumours: eight rumours, each pointing to a keyed hex, with two that are partly false.
9. Running notes: what to do with unkeyed hexes, how factions move over time, and what changes after the players disturb the central secret.
</task>

<constraints>
- Every keyed hex must be usable in a sentence or three at the table; no long prose.
- Content links back to the factions, history or secret; avoid random unconnected filler.
- Use creatures and rules from the named system; if it is "any fantasy system", keep stats out and describe threat level in words.
- Do not reproduce published hexcrawl keys or maps; everything original.
- Do not exceed 20 keyed hexes even for a large region; give a method for stocking the rest.
</constraints>

<output_format>
## Region overview
## Map layout
## Hex key
One entry per hex: coordinate and name, then Seen, Searched, Secret.
## Travel procedure
## Encounter table
Table: Roll | Encounter | Why it is here.
## Weather
## Rumours
Numbered, with the target hex and true or false noted for the game master.
## Running notes
</output_format>
