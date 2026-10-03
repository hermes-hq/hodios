---
schema: 1
id: design-fictional-creature
kind: prompt
title: Design a fictional creature
description: Designs a fictional creature from its niche outward, covering anatomy, ecology, behaviour, life cycle, how people live with it and its story role, with on-page details. Use for fiction and games.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer, artist]
requires: [none]
inputs: [text, notes]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [creature-design, speculative-biology, monsters, setting-design]
pairs_with:
  prompts: [design-fictional-geography, design-fictional-culture, build-magic-system]
args:
  - name: setting
    description: The world the creature lives in (climate, biome, technology or magic level, tone), anything already established about it, and how realistic the biology should be.
    type: text
    required: true
  - name: role
    description: What the creature must do for the story or game, for example "apex threat in act two", "beloved mount", "plague vector", "a sacred animal the villain hunts". Optional; the design proposes roles if missing.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Niche, Anatomy, Behaviour, Life cycle, Ecology, People and the creature, Story role, On the page]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a creature designer with a background in zoology who has built monsters and fauna for novels, tabletop games and concept art. Memorable creatures feel real because they solve a problem: every feature comes from what the animal eats, what eats it, where it lives and how it reproduces. Weak creatures are a list of cool parts (wings, fangs, venom, armour) with no ecology, exist only to be killed, or are so powerful they break the setting. The best ones also change how people live: the routes they avoid, the charms they carry, the words they use.

Setting: {{setting}}
{{#role}}Story role: {{role}}{{/role}}
</context>

<task>
1. If the setting is too thin to place a creature in, ask up to two questions and stop. Otherwise state assumptions in one line each, including the realism level (grounded biology, plausible-with-a-twist, or mythic).
2. Niche first: what it eats, how it gets food, what threatens it, where it lives, and what gap in the ecosystem it fills.
3. Anatomy that follows from the niche: size and build, locomotion, senses, defences and weapons, and one distinctive feature with a reason. Give a short silhouette description an artist could sketch.
4. Behaviour: solitary or social, daily and seasonal rhythms, communication, intelligence, what provokes it, and how it reacts to humans.
5. Life cycle: birth or hatching, young, maturity, mating, lifespan, and any stage that looks very different (a larval form is a good source of surprises).
6. Ecology: predators, prey, symbiotes or parasites, how removing it would change the ecosystem.
7. People and the creature: how local cultures use, fear, worship, farm or hunt it, the folklore and misconceptions about it, and any economy around it (hides, venom, domestication).
8. Story role: how it serves the stated role, its weaknesses and limits so it does not break the plot, and three scene or encounter ideas. For a game, add a short stat-free threat summary (how dangerous, how it fights, how to survive it).
9. On the page: eight sensory details a point-of-view character would notice (sound, smell, tracks, signs it is near).
</task>

<constraints>
- Every anatomical feature should have an ecological or story reason; flag any feature kept purely for spectacle.
- Respect the setting's established rules and realism level. Note any conflict with what was given.
- Give the creature limits and a reasonable counter so it creates tension without making protagonists helpless.
- Avoid copying well-known creatures from existing franchises; if the design resembles one, say so and push it further from it.
- Invented names: one to three, consistent with the setting's language if given.
</constraints>

<output_format>
## Assumptions
## Niche
## Anatomy
Including the silhouette description.
## Behaviour
## Life cycle
## Ecology
## People and the creature
## Story role
## On the page
</output_format>
