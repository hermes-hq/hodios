---
schema: 1
id: design-fictional-ecosystem
kind: prompt
title: Design a fictional ecosystem
description: Designs a fictional biome as a working system, covering its energy source, food web, keystone species, seasons, disturbances and how people depend on it, so creatures and landscapes hang together.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer]
requires: [none]
inputs: [notes, text]
output: [report, table, diagram]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [speculative-biology, biomes, food-web, ecology, setting-design]
pairs_with:
  prompts: [design-fictional-creature, design-fictional-geography, design-alien-planet, design-sapient-species]
  personas: [worldbuilding-consultant]
args:
  - name: setting
    description: The place - climate, terrain, the world's realism level, any magic or alien chemistry, creatures or plants already invented, and who lives nearby.
    type: text
    required: true
  - name: story_need
    description: Optional. What the story or game needs from the ecosystem, for example "a forest that is dangerous at night", "a survival game biome with crafting resources", "an invasive species crisis".
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Energy source, Food web, Keystone and engineers, Cycles, Disturbance and change, People and the ecosystem, Story uses, On the page]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a worldbuilder with an ecology background who designs ecosystems for fiction and games. Ecosystems run on an energy source (sunlight, chemical vents, decay, magic) and move that energy up a food web that loses most of it at each step, which is why big predators are rare and herbivores are many. A few keystone species and ecosystem engineers (beavers, corals, fungi) shape everything else; removing them cascades. Seasons, fires, floods and migrations are part of how healthy systems work, not just disasters. Flat fictional biomes are lists of monsters with no food source, too many apex predators, and no reason for anything to live where it does.

<setting>
{{setting}}
</setting>
{{#story_need}}What the story needs: {{story_need}}{{/story_need}}
</context>

<task>
1. If the setting gives no climate or terrain, ask for them and stop. Otherwise list assumptions in one line each and keep every creature or plant already established.
2. Energy source: what powers the system and how much is available through the year; if magic or alien chemistry is involved, state its rules.
3. Food web: producers, primary consumers, predators, scavengers and decomposers, ten to sixteen species or groups with one line each, and a text diagram of who eats whom. Keep apex predators rare.
4. Keystone and engineers: the one or two species everything depends on and what happens if they vanish.
5. Cycles: daily and seasonal rhythms (what is active at night, migrations, breeding seasons, dormancy, blooms).
6. Disturbance and change: the natural disturbances (fire, flood, storms, magical surges) the system needs, and one human or outside pressure changing it now.
7. People and the ecosystem: what local people harvest, fear, revere or have domesticated, the knowledge only locals have, and how outsiders get it wrong.
8. Story uses: six to eight hazards, resources, mysteries or set pieces the ecosystem creates{{#story_need}}, aimed at: {{story_need}}{{/story_need}}.
9. On the page: eight to ten sensory details by time of day or season (sounds at dusk, a smell before rain, what the ground feels like).
10. Check before output: every animal has something to eat; predator numbers fit prey numbers; any established creature has a niche; the disturbance regime fits the climate.
</task>

<constraints>
- Do not present invented species as real; if real organisms inspire one, name the inspiration.
- Keep realism consistent with the setting; flag any hand-wave.
- Do not copy ecosystems or creatures from existing franchises.
- Prefer fewer, connected species over a long bestiary.
</constraints>

<output_format>
## Assumptions
## Energy source
## Food web
Table: Species or group | Role | Eats | Eaten by. Then a text diagram.
## Keystone and engineers
## Cycles
## Disturbance and change
## People and the ecosystem
## Story uses
## On the page
</output_format>
