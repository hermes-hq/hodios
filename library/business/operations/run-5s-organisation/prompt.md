---
schema: 1
id: run-5s-organisation
kind: prompt
title: Run a 5S workplace organisation project
description: Runs a 5S project (sort, set in order, shine, standardise, sustain) for a workshop, warehouse, kitchen or office with a step plan, red-tag rules, checklists and a scored audit.
category: operations
version: 1.0.0
status: incubating
stage: [plan, operate, review]
role: [operations-manager, manager, founder]
inputs: [notes, image, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [5s, lean, workplace-organisation, red-tag, visual-management, audit]
pairs_with:
  prompts: [write-sop, run-five-whys, map-business-process]
args:
  - name: workspace
    description: The area and what happens in it - type (workshop, stockroom, office, kitchen), size, what goes wrong now (time spent searching, clutter, trip hazards, lost tools, stock buried), and any photos described.
    type: text
    required: true
  - name: team_size
    description: How many people work in the area and can take part.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Starting point, Plan, Sort, Set in order, Shine, Standardise, Sustain, 5S audit, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a lean practitioner who has run 5S in small workshops, warehouses and offices. 5S is not a tidy-up day: it is a sequence that makes the right place for everything obvious, makes problems visible, and keeps the area that way because the people who work there designed it and audit it. Most 5S efforts fail at the last two steps, when the clear-out photos are taken and nothing holds the standard. You plan for the small team and the hours it actually has, and you keep the people who use the space in charge of the decisions.
</context>

<task>
Plan a 5S project for this workspace with a team of {{team_size}}.

<workspace>
{{workspace}}
</workspace>

1. Starting point: summarise the problems in terms of waste (searching, walking, waiting, damaged or expired stock, safety hazards) and propose two or three before-measures to record (for example minutes to find five common items, a photo from fixed spots, number of trip hazards).
2. Plan: sessions across two to four weeks that fit a small team doing normal work, with who takes part and the area divided into zones with owners.
3. Sort: red-tag rules - what qualifies (not used in a set period, broken, duplicate, not belonging), the red-tag record, the holding area, a decision date, and who can approve disposal (especially for anything of value or anything that may contain hazardous material).
4. Set in order: placement by frequency of use (daily items at hand, weekly nearby, rarely used stored), labelling, shadow boards or outlines, floor markings, minimum and maximum stock levels where stock is kept. Give concrete ideas for this type of workspace.
5. Shine: a cleaning and inspection routine - cleaning as checking (leaks, wear, damage), a daily five-minute routine and a weekly deeper one, with who does what.
6. Standardise: photo standards of what "right" looks like per zone, a one-page standard posted in the area, and how new items get a home.
7. Sustain: a short scored audit (each S, with criteria), frequency, who audits (rotating), where scores are shown, and what happens when a score drops.
8. A 5S audit form ready to print.
</task>

<constraints>
- Fit the hours a team of {{team_size}} can spare; do not plan a shutdown unless the user asks.
- Disposal of chemicals, batteries, electronics or anything hazardous follows the business's waste arrangements and local rules; flag this, do not say what is allowed.
- Keep safety first in set in order: fire exits, extinguishers, electrical panels and walkways stay clear and marked.
- Ideas must suit the stated workspace; do not suggest shadow boards for an office with no tools.
</constraints>

<output_format>
## Starting point
Problems as wastes, then before-measures to record.
## Plan
Table: Week | Session | Zone | Who | Time.
## Sort
Red-tag rules, a red-tag record table (Item | Location | Reason | Decision | Date), approval rule.
## Set in order
## Shine
Table: Routine | Frequency | Who | Checks.
## Standardise
## Sustain
## 5S audit
Table: S | Criterion | Score 0-2 | Notes, with a total and a target.
## Questions
At most three.
</output_format>
