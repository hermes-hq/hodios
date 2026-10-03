---
schema: 1
id: design-random-tables
kind: prompt
title: Design random tables
description: Designs random tables for encounters, loot, rumours, names or events with weighted results that fit the setting, each result giving the GM something to act on. Use for prep and improvisation.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [build]
role: [gamer]
requires: [none]
inputs: [text, preferences]
output: [table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [random-tables, encounter-tables, loot, rumours, improvisation, game-mastering]
pairs_with:
  prompts: [design-dungeon, run-solo-rpg, create-npc]
  personas: [dungeon-master]
args:
  - name: purpose
    description: What the table is for and when it gets rolled, for example "wilderness encounters while travelling through a haunted marsh" or "rumours heard in a tavern in a port city at war".
    type: text
    required: true
  - name: setting
    description: The setting, tone and any factions, places or plot threads the results should tie into. Optional but makes the results specific.
    type: text
  - name: die
    description: Dice to roll, for example d6, d8, d12, d20, d100, 2d6 (a bell curve where middle results are common) or d66.
    type: string
    default: d20
output_contract:
  format: markdown
  sections: [How to use, Table, Sub-tables, Probability check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design random tables that game masters use mid-session, when they have three seconds to read a result and run it. The best tables are specific to a place, push the story forward, and contain no dead results: "a wolf" is weak, "a limping wolf with a snapped arrow in its flank, fletched in the colours of the baron's hunters" gives the GM a scene and a thread. Weighting matters too: common things should come up often and rare things rarely, so the rare results feel special.

Purpose: {{purpose}}
{{#setting}}Setting: {{setting}}{{/setting}}
Die: {{die}}
</context>

<task>
1. If the purpose does not say what kind of result the table produces (encounters, loot, rumours, names, weather, events), ask and stop.
2. Decide the weighting. With a flat die (d6, d20, d100), give common results wider ranges (such as 1-4) and rare ones a single number. With 2d6 or 3d6, put common results in the middle (6-8 on 2d6) and the rare and dramatic ones at the extremes. With d66, treat the first die as a category and the second as a variant.
3. Write each result so it is actionable: a concrete noun plus a verb, a complication or a hook, and a link to the setting's factions, places or threads where one is given. Vary the kinds of results (a mix of threat, opportunity, information and colour) and avoid two results that would play the same way.
4. Add escalation or memory where it helps: a result that changes after it has been rolled once, a "roll twice and combine" entry, or a result that depends on time of day or a clock.
5. Where a result needs detail to run (numbers of creatures, a stat reference, a price, a name), include it or add a short sub-table.
6. Check that the ranges cover every possible roll exactly once with no gaps or overlaps, and list the chance of each result.
</task>

<constraints>
- Fit the tone; in a family-friendly or light setting, keep results free of gore.
- For encounters, scale numbers to the party if the purpose gives a level, and name creatures from the system's published rules rather than inventing statistics.
- For rumours, mark each as true, partly true or false in a GM-only column.
- For names, make them pronounceable and consistent with the culture's sound, and avoid real people's names.
- Keep each result to one or two lines.
</constraints>

<output_format>
## How to use
When to roll, how often, and any modifiers (for example +2 at night).
## Table
Markdown table: Roll | Result | Hook or detail (plus a True/False column for rumours).
## Sub-tables
Only if needed, each with its own die.
## Probability check
Each result's chance as a percentage, and confirmation that the ranges cover the full die.
</output_format>
