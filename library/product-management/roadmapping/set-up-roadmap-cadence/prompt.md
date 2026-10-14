---
schema: 1
id: set-up-roadmap-cadence
kind: prompt
title: Set up a roadmap cadence
description: Sets up how a roadmap is kept and shared - one source of truth, item fields, status and confidence labels, views per audience, update rhythm and owners - so it stays current without heroics.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [product-manager, manager, founder, operations-manager]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [roadmap-hygiene, source-of-truth, confidence-labels, planning-rhythm, product-operations, audience-views]
pairs_with:
  prompts: [build-outcome-roadmap, write-public-roadmap, write-roadmap-update, set-roadmap-change-rules]
  personas: [product-operations-lead]
args:
  - name: current_situation
    description: How the roadmap lives today (slides, spreadsheets, a tool, several copies), who uses it, how often it goes stale, and the complaints you hear.
    type: text
    required: true
  - name: organisation
    description: Number of teams, planning period (quarters, cycles), audiences who need the roadmap (leadership, sales, support, customers, engineering) and the tools you already have.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Source of truth and fields, Labels, Views per audience, Update rhythm, Owners and first month, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design the operating routine around a roadmap. Roadmaps rarely fail for lack of a template; they fail because there are four copies, nobody owns updates, every item looks equally certain, and sales reads the engineering view as a list of promises. What works is boring: one source of truth, a small set of required fields, labels that show certainty, views generated from that source for each audience, and a light update rhythm tied to meetings that already exist. Tool choice comes last; the same routine works in a spreadsheet.
</context>

<task>
<current_situation>
{{current_situation}}
</current_situation>

<organisation>
{{organisation}}
</organisation>

1. Diagnosis: the two to four reasons the current roadmap goes stale or misleads, from the situation given.
2. Source of truth: where the one master list lives (using a tool they already have) and what happens to the other copies. Define 6-10 required fields per item, such as id, problem or outcome, owner, horizon, status, confidence, size, dependencies, last updated, and any customer commitment link.
3. Labels: a small status set (for example exploring, planned, in build, released, paused, dropped) and a confidence scale with plain definitions, plus the rule that a horizon further out shows lower certainty.
4. Views per audience: for each audience, what it shows and hides, its granularity (themes or items, horizons or date ranges) and the caveat line it carries.
5. Update rhythm: who updates what and when, tied to existing rituals (for example item owners weekly, product lead monthly review of stale items, quarterly full refresh), plus an "older than N weeks" staleness rule.
6. Owners and first month: who owns the routine and a four-week rollout: consolidate, clean, publish the views, retire old copies.
</task>

<constraints>
- Do not recommend buying a new tool unless the current ones truly cannot hold a list with fields and filtered views; say why if you do.
- Keep the routine small enough that a busy team keeps it up: no more than about one hour a week for the owner.
- External or sales views must never show exact dates for items not in build.
- Use only the facts given; ask about audiences or tools that are unclear.
</constraints>

<output_format>
## Diagnosis
Bullets.

## Source of truth and fields
Where it lives, then a table: field | meaning | required or optional.

## Labels
Status table and confidence table with definitions.

## Views per audience
Table: audience | shows | hides | granularity | caveat line.

## Update rhythm
Table: who | what | when | tied to which existing meeting.

## Owners and first month
Owner, then a week-by-week list.

## Questions
What to confirm.
</output_format>
