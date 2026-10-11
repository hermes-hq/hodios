---
schema: 1
id: build-costume-plot
kind: prompt
title: Build a costume plot
description: Builds a costume plot from a script, showing each character's looks scene by scene, quick changes with the time available, pieces to source or make, and a running order for wardrobe.
category: performing-arts
version: 1.0.0
status: incubating
stage: [plan, design]
role: [artist, designer]
requires: [none]
inputs: [text, notes]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [costume-design, quick-changes, costume-supervision, scene-breakdown, production-planning]
pairs_with:
  prompts: [build-props-list, plan-rehearsal-schedule, plan-community-theatre-production]
args:
  - name: script
    description: The script or a scene breakdown with characters, settings, time of day and passage of time, and any costume mentioned in the text.
    type: text
    required: true
  - name: production
    description: Cast size and doubling, period and concept, budget and currency, whether you will borrow, buy, hire or make, and backstage space. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Script requirements, Costume plot, Quick changes, Sourcing list, Running order for wardrobe, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a costume supervisor. A costume plot is a grid of characters against scenes that shows what each person wears when, and it is the tool that reveals the problems early: a change with no time to make it, an actor doubling two roles with a 30-second gap, a costume that must be torn or soaked each night (so needs duplicates), or a look the script requires (a uniform, a wedding dress, blood) that the budget forgot. Changes are measured in the time actually available offstage, not the scene length; under about a minute is a quick change needing rigging (hidden fastenings, pre-set pieces, a dresser) and a place to do it. The text gives hard requirements (a character says "nice hat"); the concept and period give the rest. Amateur companies often borrow and adapt, so the sourcing list should say what can be pulled from stock or bought cheaply.

Script: {{script}}
{{#production}}Production: {{production}}{{/production}}
</context>

<task>
1. Script requirements: every costume item the text requires or implies (mentioned garments, changes of season or time, stains, damage, disguise), with the page or scene.
2. Costume plot: a grid with characters as rows and scenes as columns, each cell naming the look (Look A, Look B) or a dash when offstage. Below it, describe each look briefly.
3. Quick changes: every change with the time available offstage (estimate from the script and mark it), the actor, from and to, and how to make it work (rigging, pre-set location, dresser). Flag impossible ones with options.
4. Sourcing list: each piece to pull from stock, borrow, buy, hire or make, with duplicates for anything damaged nightly. Leave cost blanks unless prices are given.
5. Running order for wardrobe: per scene, what is pre-set where, and who helps whom.
6. Questions: decisions needed from the director or designer.
</task>

<constraints>
- Base requirements on the script; label design suggestions separately.
- Do not invent prices; leave blanks or use only figures given.
- Mark estimated change times as estimates to confirm in a run.
- Flag safety issues: long hems on stairs, footwear on raked stages, flammable fabrics near flame effects.
</constraints>

<output_format>
## Script requirements
## Costume plot
A grid table, then look descriptions.
## Quick changes
A table: Actor | From | To | Time available | Plan.
## Sourcing list
A table: Item | Character | Source | Duplicates | Cost.
## Running order for wardrobe
## Questions
</output_format>
