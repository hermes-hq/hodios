---
schema: 1
id: plan-worldschooling-term
kind: prompt
title: Plan a worldschooling term
description: Plans a term of homeschooling while a family travels, with a portable core routine, place-based learning for each stop, light kit, offline resources and records that travel.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [worldschooling, family-travel, place-based-learning, offline-resources, travel-journal]
pairs_with:
  prompts: [plan-homeschool-year, build-homeschool-portfolio]
args:
  - name: trip
    description: "Where, for how long, in what order, how you travel and stay, and internet access."
    type: text
    required: true
  - name: children
    description: "Each child's age, level in reading and maths, and interests."
    type: text
    required: true
  - name: home_requirements
    description: "Optional: what is required of you as home educators where you are resident, as you understand it."
    type: text
output_contract:
  format: markdown
  sections: [Portable core, Learning by stop, Jobs for the children, Kit, Records on the road, Coming home, Check before you go]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families who homeschool while travelling for weeks or months: long trips, a sabbatical, seasonal work or full-time travel. Travel is rich in learning but the core skills (reading, writing, maths) slip if nobody protects them, because days fill with logistics. Families that make it work keep a small, portable daily core (about 30 to 90 minutes depending on age) that survives travel days, and let each place carry the rest: history, geography, language, food, nature, money and planning tasks the children can own. They pack light and offline: e-reader, downloaded lessons, one maths book, a notebook per child. Records are a photo log and a short weekly note. Home education rules where the family is resident still apply while away, and rules can also apply where they stay for long periods; both need checking with official sources.

Trip: {{trip}}
Children: {{children}}
{{#home_requirements}}Requirements at home: {{home_requirements}}{{/home_requirements}}
</context>

<task>
1. Set the portable core: per child, what is done most days, for how long, with which resources, including a travel-day minimum.
2. For each stop or phase of the trip, give place-based learning ideas tied to subjects, with one small prepared piece before arriving (a book, a map task, a few phrases) and one output after (a journal page, a photo story, a budget review).
3. Give the children real jobs that teach: budgeting a day, navigating, translating, planning a meal, keeping the trip log.
4. List the kit: what to pack, what to download, and what to leave at home.
5. Set up records: a weekly note template and how to keep dated samples and photos organised by subject.
6. Plan the return: how to pick up the home routine and use the trip for a project.
7. List what to confirm before going: home education obligations at home while away, and any rules for long stays abroad.
</task>

<constraints>
- Do not state any country's education, visa or residency rules as fact; list them as checks with official sources.
- Keep the core small enough to survive travel days; flag if the family's plan is too ambitious.
- Ideas must fit the actual places named; do not invent sites, museums or events, and suggest the family verify opening times and access.
- Mind safety: no ideas that need children to go off alone in unfamiliar places.
</constraints>

<output_format>
## Portable core
Table: Child | Daily core | Time | Resources | Travel-day minimum.
## Learning by stop
One subsection per stop.
## Jobs for the children
## Kit
## Records on the road
## Coming home
## Check before you go
</output_format>
