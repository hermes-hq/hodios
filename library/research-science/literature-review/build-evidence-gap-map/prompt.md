---
schema: 1
id: build-evidence-gap-map
kind: prompt
title: Build an evidence and gap map
description: Builds an evidence and gap map with an intervention-by-outcome framework, coding rules, a filled matrix from coded studies, and a reading of where evidence clusters and where gaps lie.
category: literature-review
version: 1.0.0
status: incubating
stage: [design, review]
role: [researcher, consultant]
requires: [none]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [evidence-map, gap-map, evidence-synthesis, research-prioritisation, policy-evidence]
pairs_with:
  prompts: [plan-scoping-review, find-research-gaps, plan-umbrella-review, build-literature-matrix]
  personas: [research-librarian, research-methodologist]
args:
  - name: topic
    description: The policy or practice area and the decision the map should inform, for example "youth employment programmes in East Africa, to guide a funder's next research calls".
    type: text
    required: true
  - name: studies
    description: Optional. Coded or uncoded study records (citation, design, population, intervention, outcomes, country). Without them, the prompt builds the framework and coding guide only.
    type: text
output_contract:
  format: markdown
  sections: [Purpose and scope, Framework, Coding guide, Map, Reading the map]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An evidence and gap map (EGM) shows, at a glance, where studies exist and where they do not, usually as a matrix of interventions (rows) by outcomes (columns), with each cell showing the number and type of studies and often their confidence rating. Maps by organisations such as the Campbell Collaboration and 3ie include systematic reviews and impact evaluations, sometimes with filters for population, region and design. A map describes the evidence base; it does not say what works. Its value depends on the framework: categories must be mutually exclusive, exhaustive for the scope, meaningful to the decision-makers, and defined well enough that two coders agree. Common mistakes: reading a dense cell as "effective", counting multiple papers from one study as several studies, mixing reviews and primary studies in one count, and confusing "no studies found" with "no effect".
</context>

<task>
Build an evidence and gap map for:
<topic>
{{topic}}
</topic>
{{#studies}}
<studies>
{{studies}}
</studies>
{{/studies}}

1. State the map's purpose, the decision it informs, the users, and the inclusion scope (study types, populations, regions, dates).
2. Design the framework: intervention categories and subcategories for rows, outcome domains and subcategories for columns, each with a one-line definition. Propose filters (population group, region, study design, confidence rating). Check the categories are mutually exclusive and cover the scope.
3. Write a coding guide: decision rules for ambiguous cases, how one study with several papers is counted, how a study with several interventions or outcomes is placed, and a double-coding plan on a sample with an agreement check.
4. If studies are supplied, code each one and show the coding table, then fill the matrix with counts split by systematic reviews and primary studies. If none are supplied, show the empty matrix and the coding table template.
5. Read the map: clusters, absolute gaps (empty cells relevant to the decision), synthesis gaps (cells with many primary studies but no review), and the limits of the map.
6. Suggest how to present it (interactive matrix with bubbles sized by study count and coloured by confidence, with a static table for reports).
</task>

<constraints>
- Never interpret study counts as effectiveness; say so in the reading.
- Count studies, not papers; flag records that may be duplicates of one study.
- Use only supplied studies; do not invent studies or counts to fill cells.
- Flag where a framework category is ambiguous enough to cause coder disagreement.
</constraints>

<output_format>
## Purpose and scope
Short paragraph and an inclusion list.
## Framework
Two tables: rows (category | definition) and columns (domain | definition), then filters.
## Coding guide
Numbered decision rules and the double-coding plan.
## Map
The coding table (if studies were supplied) and the matrix with counts per cell as "reviews / primary studies".
## Reading the map
Bullets: clusters, absolute gaps, synthesis gaps, limits; then a presentation suggestion.
</output_format>
