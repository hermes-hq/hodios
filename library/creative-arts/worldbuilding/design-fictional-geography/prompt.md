---
schema: 1
id: design-fictional-geography
kind: prompt
title: Design a fictional geography
description: Designs a world's geography from tectonics to climate, rivers, resources and settlements, how it shapes cultures and conflict, and a description to draw the map from. Use for fantasy settings.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer]
subject: [geography]
requires: [none]
inputs: [text, notes]
output: [report, table, diagram]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [fantasy-maps, climate, plate-tectonics, settlements]
pairs_with:
  prompts: [design-fictional-culture, build-magic-system, build-world-timeline, write-setting-description]
  personas: [dungeon-master]
args:
  - name: world_premise
    description: The world and story or campaign it serves, such as genre, technology level, any magic or unusual physics that affect the land, peoples and conflicts you already have, and places or features that must exist.
    type: text
    required: true
  - name: scale
    description: The area to design, e.g. "a single island", "a region the size of France", "a continent", "a whole planet".
    type: string
    default: continent
output_contract:
  format: markdown
  sections: [Assumptions, Landforms, Climate, Water, Biomes and resources, Settlements and routes, How the land shapes people, Map description, Sanity check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Readers and players sense when a map was drawn for looks: mountain ranges scattered at random, rivers that split as they flow to the sea or run between two oceans, deserts next to rainforests with no reason, and cities in places nobody would settle. Real geography is causal. Plate boundaries raise mountains and volcanic arcs; latitude and prevailing winds set climate; mountains cast rain shadows; water runs downhill, merges and reaches the sea or a closed basin; resources cluster where geology puts them; settlements grow at fords, confluences, harbours and passes; and trade routes, borders and wars follow the land. Building in that order gives a world that feels true and hands the author ready-made conflicts. Magic or invented physics can bend these rules, but only by stated rules with consequences.
</context>

<task>
Design the geography for a {{scale}} in this world:

<world>
{{world_premise}}
</world>

1. **Assumptions:** the scale in rough distances, the latitudes the area spans and its hemisphere, an Earth-like planet unless the premise says otherwise, the technology level, and any magic or unusual physics that alter geography, each stated as a rule with its consequences. If the premise is too thin to anchor the design (no genre or story purpose at all), ask up to three questions and stop. Keep every feature the author named, and place it where it makes physical sense.
2. **Landforms:** plate boundaries and what they produce (fold mountains at collisions, volcanic arcs and trenches at subduction zones, rift valleys and new seas where plates pull apart, island chains over hotspots), plus old worn mountains, plains, plateaus and coastlines. Name the major features.
3. **Climate:** prevailing winds by latitude (trade winds in the tropics, westerlies in the mid-latitudes, polar easterlies), where rain falls and where rain shadows create dry land, the effect of warm and cold ocean currents on coasts, and the seasons. Describe each climate zone and where it lies.
4. **Water:** major rivers from source to mouth (they start in high, wet ground, merge as they descend, and end in the sea or an inland lake; deltas are the only place they split), lakes, marshes, closed basins with salt lakes, and navigable stretches.
5. **Biomes and resources:** biomes that follow from climate and terrain, and the resources that follow from geology and biome (metal ores near mountains and old volcanic rock, coal and salt in sedimentary basins, fertile floodplains and volcanic soils, timber, fisheries, rare materials if the premise has them), with which are scarce.
6. **Settlements and routes:** where the main cities and towns grow and why (river crossings, confluences, natural harbours, mountain passes, oases, resource sites), the main trade routes, and the chokepoints (straits, passes, bridges, river mouths) that whoever controls them grows rich from.
7. **How the land shapes people:** for each major region, how its geography shapes livelihoods, diet, architecture, outlook and power; which resources and chokepoints neighbours would fight over; natural borders and barriers; and hazards (floods, eruptions, droughts, monsoons) that drive history. Give at least five concrete story or campaign hooks rooted in the geography.
8. **Map description:** a layout an artist could draw from: the outline of the land, the position of every named feature by compass direction and approximate distance, a suggested scale bar, and a list of labels. Add a simple text sketch if helpful.
9. **Sanity check:** confirm that rivers never split except at deltas, never cross mountain ranges or connect two seas, rain shadows sit on the lee side, deserts and forests have reasons, and settlements have water and a reason to exist. List any deliberate exceptions and the rule that explains each.
</task>

<constraints>
- Be physically plausible unless the premise establishes a rule; when you break real-world geography, say which rule allows it.
- Keep the author's existing places, peoples and conflicts; add, do not override.
- Use invented names that fit the premise's tone and languages; avoid names that are real places or famous fictional ones.
- Keep it usable: favour the features a story or campaign will actually visit, and say what can be left vague.
</constraints>

<output_format>
Use the sections in order as level-two headings. Settlements and routes includes a table: Place | Why it is there | Resource or role | Tension.
</output_format>
