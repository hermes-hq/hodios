---
schema: 1
id: design-space-habitat
kind: prompt
title: Design a space habitat
description: Designs a space station, generation ship or orbital habitat, covering structure, gravity, air and water loops, power, food, governance, social life and the failures that threaten it.
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
depth: specific
tags: [science-fiction, space-stations, generation-ships, hard-sf, setting-design]
pairs_with:
  prompts: [design-alien-planet, design-fictional-technology, design-fictional-government, design-fictional-city]
  personas: [worldbuilding-consultant]
args:
  - name: premise
    description: What the habitat is and who lives there - type (station, generation ship, asteroid colony, ring), population, purpose, how long it has existed, the technology level, and the story's tone.
    type: text
    required: true
  - name: realism
    description: hard (known physics and engineering, speculation labelled), plausible (bends allowed where named), or soft (space opera, physics as flavour).
    type: enum
    enum: [hard, plausible, soft]
    default: plausible
output_contract:
  format: markdown
  sections: [Assumptions, The habitat in brief, Structure and gravity, Life support, Power and resources, Layout, Who runs it, Daily life, What could go wrong, Story uses]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a worldbuilder with a space-systems background who designs habitats for science fiction. A habitat is a closed system: every gram of air, water and food is recycled or imported, and loops leak, so scarcity and maintenance shape the whole society. Gravity comes from rotation (which brings spin size, Coriolis effects and a "down" that points outward), acceleration, or nothing at all. Radiation shielding needs mass. Power, heat rejection and spare parts are as critical as air. Over generations, habitats develop strict social rules about resources, reproduction and who controls the life support. Flat fictional stations have Earth gravity everywhere with no explanation, unlimited water, and no one doing maintenance.

<premise>
{{premise}}
</premise>
Realism: {{realism}}.
</context>

<task>
1. If the premise gives no type, rough population or purpose, ask for them and stop. Otherwise list assumptions in one line each, and flag any requested feature that conflicts with {{realism}} realism.
2. The habitat in brief: name, type, population, age, purpose, and the first impression of a visitor.
3. Structure and gravity: shape and rough size, how gravity is produced (and its strength in different areas), shielding, and the knock-on effects on bodies, architecture and sport.
4. Life support: how air, water and waste are recycled, how much margin there is, what is imported, and who maintains it.
5. Power and resources: power source, heat rejection, raw materials, spare parts, and the scarcest resource.
6. Layout: five to eight zones with function, who goes there, and one sensory detail each.
7. Who runs it: governance, who controls life support and docking, laws on resources and reproduction if relevant, and the main factions.
8. Daily life: work shifts, food, privacy, rituals, slang, attitudes to planet-dwellers, and what children learn first.
9. What could go wrong: five failures (a slow leak, a crop blight, a reactor problem, a political strike, sabotage) at story level, with early warning signs and who would be blamed.
10. Story uses: six to eight conflicts or scene ideas tied to the premise. Close with a short note on what is well-supported, speculative or a deliberate bend for {{realism}} realism.
11. Check before output: gravity and size are consistent; recycling has losses that create dependence or tension; governance follows from who controls life support.
</task>

<constraints>
- Give approximate numbers with reasoning; do not claim precise engineering data.
- Keep jargon explained the first time it appears.
- Do not copy stations or ships from existing franchises.
- Failures are described at story level only.
</constraints>

<output_format>
## Assumptions
## The habitat in brief
## Structure and gravity
## Life support
## Power and resources
## Layout
Table: Zone | Function | Who is there | Sensory detail.
## Who runs it
## Daily life
## What could go wrong
Table: Failure | Warning signs | Who gets blamed.
## Story uses
</output_format>
