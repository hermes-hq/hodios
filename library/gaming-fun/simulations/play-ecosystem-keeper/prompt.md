---
schema: 1
id: play-ecosystem-keeper
kind: prompt
title: Play a nature reserve keeper
description: Has the player manage a fictional nature reserve over seasons, balancing species, habitat, visitors and budget while food webs respond in ways that teach real ecology.
category: simulations
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher, individual]
subject: [biology]
requires: [none]
inputs: [preferences]
output: [conversation, diagram]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [ecology, food-web, conservation, trophic-cascade, carrying-capacity]
args:
  - name: biome
    description: The reserve's ecosystem.
    type: enum
    enum: [wetland, savanna, temperate-forest, coral-reef]
    default: wetland
  - name: seasons
    description: Number of seasonal turns; four make a year.
    type: number
    default: 8
  - name: difficulty
    description: easy = a resilient system and a generous budget; medium = one invasive threat and a drought or storm; hard = a declining keystone species, a tight budget and visitor pressure.
    type: enum
    enum: [easy, medium, hard]
    default: medium
  - name: show_food_web
    description: true = show the food web as a text diagram at the start and whenever it changes; false = describe relationships only when they matter.
    type: boolean
    default: true
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run an ecology simulation. The player is the keeper of a fictional {{biome}} reserve. The lesson is in the system's response: populations grow toward what the habitat can support, predators and prey rise and fall with a lag, removing or returning one species can ripple down the food web, invasive species spread fastest where native competitors are weak, and most interventions take more than one season to show. You play the ecosystem, the visitors, the funders and the field team.

Biome: {{biome}}
Seasons: {{seasons}}
Difficulty: {{difficulty}}
Show food web: {{show_food_web}}
</context>

<task>
1. Set up the reserve: 8 to 12 species typical of the biome across producers, herbivores, predators and decomposers or filter-feeders, including one keystone species; habitat zones and their condition; a visitor programme that brings income and disturbance; a budget per season; and the current threats sized to the difficulty. Use generic or real species names that fit the biome; keep the reserve itself fictional.
2. Show the model in a short block: each species' population trend follows growth toward carrying capacity, predation, competition, habitat condition and seasonal breeding; interventions have a cost, a delay and side effects. Label it simplified and keep it fixed.
3. Each turn is one season. Report the field survey (population estimates with a rough range, habitat condition, visitor numbers, budget), one seasonal event (breeding, drought, storm, disease, an invasive arrival, a funding offer with strings), then ask for the keeper's actions. Offer three options and accept any reasonable plan within budget: restore habitat, control an invasive, reintroduce or relocate a species, cull, limit or expand visitors, add monitoring, apply for grants.
4. Apply consequences with realistic delays and knock-on effects through the food web. When a cascade or a carrying-capacity limit drives an outcome, name the principle in one sentence.
5. If show_food_web is true, draw the web as a text diagram (prey → predator lines) at the start and whenever a link changes.
6. After season {{seasons}}, debrief: the reserve's health against its starting state, the decisions that mattered, the ecological principles at work, the game's simplifications, and one real-world case of a similar dynamic described carefully, noting where scientists still debate how much it explains.
</task>

<constraints>
- Ecological relationships must follow real principles; no species behaves in a way its real counterpart could not.
- Survey numbers are estimates with uncertainty, as real surveys are; the true populations are tracked privately and revealed in the debrief.
- Culls and deaths are described factually, not graphically.
- Keep each season's report to about 150 words plus the dashboard.
- Before each turn, check that populations, budget and habitat follow from the previous season, the event and the actions.
</constraints>

<output_format>
Each season: a header "[Season n of {{seasons}}: spring, year 1 | Budget: …]", the field survey as a table with columns Species, Role, Estimate, Trend (↑ ↓ →), then habitat and visitor lines, then the event, then the options.
Food web diagram, when shown, in a fenced text block.
Debrief headings: Reserve health, Decisions that mattered, Ecology at work, Simplifications, A real case.
</output_format>
