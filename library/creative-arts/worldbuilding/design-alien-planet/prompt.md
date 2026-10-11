---
schema: 1
id: design-alien-planet
kind: prompt
title: Design an alien planet
description: Designs an alien planet from its star and orbit through gravity, atmosphere, day length, climate and surface, showing how each physical choice shapes life, settlement and the story.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer]
requires: [none]
inputs: [notes, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [science-fiction, planetary-science, hard-sf, exoplanets, setting-design]
pairs_with:
  prompts: [design-fictional-geography, design-fictional-ecosystem, design-sapient-species, design-fictional-calendar]
  personas: [worldbuilding-consultant]
args:
  - name: premise
    description: What the planet is for in the story - who is there (natives, colonists, a crashed crew), the tone, and any features you already want (a ring, permanent storms, two suns, low gravity).
    type: text
    required: true
  - name: realism
    description: hard (stay within known physics and say where it is speculative), plausible (bend physics only where the story needs it, and name the bend), or soft (science-fantasy, physics is flavour).
    type: enum
    enum: [hard, plausible, soft]
    default: plausible
output_contract:
  format: markdown
  sections: [Assumptions, Star and orbit, Body, Atmosphere and water, Climate and seasons, Surface, Life, Living there, Story consequences, Science notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a worldbuilder with a planetary-science background who designs planets for science fiction. A planet's features are linked: the star's type sets the habitable distance, the light colour and the flare risk; a close orbit around a red dwarf likely means tidal locking; mass and radius set gravity, which sets how thick an atmosphere it can hold and how tall mountains and creatures can be; axial tilt, not distance, drives seasons; day length shapes weather and the rhythm of life. Novices pick features one at a time and end up with an Earth with a purple sky, or a planet whose parts contradict each other.

<premise>
{{premise}}
</premise>
Realism: {{realism}}.
</context>

<task>
1. If the premise gives no reason the planet exists in the story (who is there, or what happens there), ask for it and stop. Otherwise list assumptions in one line each and keep every requested feature, flagging any that conflict with {{realism}} realism.
2. Star and orbit: star type and what it means for light colour, brightness and flares; orbital distance and year length; whether there are moons, companions or rings; tidal locking yes or no and why.
3. Body: size and surface gravity relative to Earth, and the knock-on effects (horizon distance, how far you can jump, mountain heights, building styles).
4. Atmosphere and water: pressure, breathable or not and why, sky colour, how much surface water, and the main dangers (radiation, toxins, low oxygen).
5. Climate and seasons: day length, axial tilt and seasons, wind and storm patterns, and the climate zones that result.
6. Surface: four to six regions with terrain, hazards and resources, and the one landform visitors remember.
7. Life: whether there is native life, what its chemistry and energy source likely are, and how gravity, light and seasons shape it (no Earth animals with extra legs unless the realism is soft).
8. Living there: what a newcomer struggles with first, what they need to survive, where settlement makes sense, and what the planet offers that justifies being there.
9. Story consequences: six to eight conflicts, scenes or mysteries that the physics creates, tied to the premise.
10. Science notes: which choices are well-supported, which are speculative, and which are deliberate bends for story. For {{realism}} realism, list the bends explicitly.
11. Check before output: every feature is consistent with the star, orbit and gravity chosen; seasons come from tilt or orbit shape, not distance alone; the life fits the conditions.
</task>

<constraints>
- Do not invent precise figures as if they were measured facts about a real exoplanet; if the user names a real one, say what is actually known and what is invented.
- Give numbers as approximate and show the reasoning, rather than false precision.
- Keep jargon explained in a clause the first time it appears.
- Do not copy planets from existing franchises.
</constraints>

<output_format>
## Assumptions
## Star and orbit
## Body
## Atmosphere and water
## Climate and seasons
## Surface
Table: Region | Terrain | Hazards | Resources.
## Life
## Living there
## Story consequences
## Science notes
Three lists: Well-supported, Speculative, Deliberate bends.
</output_format>
