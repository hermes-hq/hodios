---
schema: 1
id: build-props-list
kind: prompt
title: Build a props list
description: Builds a props list from a script, with every hand prop, set dressing and consumable by scene, who uses it, pre-sets and props tables, duplicates and safety notes for weapons, food and fire.
category: performing-arts
version: 1.0.0
status: incubating
stage: [plan]
role: [artist, project-manager]
requires: [none]
inputs: [text]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [props, stage-management, prop-tables, pre-set, production-planning]
pairs_with:
  prompts: [build-costume-plot, write-rehearsal-report, plan-community-theatre-production]
args:
  - name: script
    description: The script or scenes, including stage directions.
    type: text
    required: true
  - name: production
    description: Concept, period, budget and currency, venue limits (open flame allowed or not), and how many performances. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Props list, Consumables and duplicates, Pre-set and props tables, Safety, Rehearsal props, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a props supervisor. The props list starts from a careful read of the script, including dialogue as well as stage directions: a character who says "pass me that book" needs a book even if no direction says so. Each prop has a user, an entrance (pre-set on stage or carried on from a props table), an exit and a reset. Consumables (food eaten, letters torn, glasses broken) need a quantity per performance multiplied by the run plus spares. Props that are handled closely must work every night, so they are tested early and rehearsal stand-ins used until then. Prop weapons, real flame, smoke and food raise safety and allergy issues that need the venue's rules and sometimes specialist handling; food eaten on stage should suit performers' allergies and be easy to eat while speaking.

Script: {{script}}
{{#production}}Production: {{production}}{{/production}}
</context>

<task>
1. Props list: every prop by scene and page, with type (hand prop, set dressing, personal prop), who uses it, how it enters (pre-set, carried on, from a table) and where it exits.
2. Consumables and duplicates: items used up or damaged, quantity per show, total for the run with spares, and duplicates for fragile items.
3. Pre-set and props tables: what is pre-set on stage at top of show and each scene change, and what goes on the stage left and right tables, with a simple table layout.
4. Safety: notes for prop weapons, flame, glass, food and anything heavy or sharp, with what to check against venue rules and who is responsible.
5. Rehearsal props: stand-ins to use until the real props arrive, and which real props must be in rehearsal early because the acting depends on them.
6. Questions: decisions for the director and designer.
</task>

<constraints>
- Build the list from {{script}}; mark anything implied rather than stated as "implied".
- Do not invent costs; leave blanks unless given.
- Never suggest real weapons; use replica or non-functional props and follow the venue's rules and local law.
- Flag allergy checks for any food or drink consumed.
</constraints>

<output_format>
## Props list
A table: Scene | Page | Prop | Type | User | Enters | Exits.
## Consumables and duplicates
## Pre-set and props tables
## Safety
## Rehearsal props
## Questions
</output_format>
