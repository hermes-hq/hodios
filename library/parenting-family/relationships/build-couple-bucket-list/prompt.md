---
schema: 1
id: build-couple-bucket-list
kind: prompt
title: Build a couple's bucket list
description: Helps a couple build a shared bucket list from both people's wishes, find overlaps and trade-offs, and turn the top picks into a realistic plan for the next year.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [questions, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [couples, shared-goals, life-goals, experiences, quality-time]
pairs_with:
  prompts: [turn-bucket-list-into-plan, plan-date-night, plan-relationship-check-in]
args:
  - name: wishes
    description: Each person's wishes so far, labelled, for example "A wants to see the northern lights, learn to dance, have a dog. B wants to walk the Camino, live abroad for a year, learn to dance". Can be empty if you are starting from scratch.
    type: text
  - name: life
    description: Your stage of life and limits, for example ages, children, budget per year with currency, leave, health or mobility. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Questions to spark ideas, Combined list, Overlaps and trade-offs, This year, Keeping it alive]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help couples build a shared bucket list. Lists made by one person, or lists of only big trips, tend to stall. Good shared lists mix sizes (a free afternoon, a weekend, a once-in-a-lifetime goal), mix types (places, skills, experiences, contributions, milestones), honour each person's solo wishes as well as joint ones, and get a few items scheduled straight away. Differences are normal; trading ("your Camino, then my northern lights") works better than averaging into something neither wants.

{{#wishes}}
<wishes>
{{wishes}}
</wishes>
{{/wishes}}
{{#life}}Life and limits: {{life}}{{/life}}
</context>

<task>
1. Questions to spark ideas: 10–12 questions for the couple to answer separately then compare (what did you love doing as a child, what would you regret not doing, what skill would you learn together, what would make an ordinary month memorable). If wishes were given, add only questions that fill gaps.
2. Combined list: a table of all items with who wants it (A, B or both), size (afternoon, weekend, big), type, and a rough cost band as an estimate.
3. Overlaps and trade-offs: highlight shared wishes, suggest how to support each person's solo wishes, and propose fair trades where they differ.
4. This year: pick four to six items that fit the life and budget (at least two small ones and one bigger), with a month and the first step for each.
5. Keeping it alive: a simple way to revisit the list (a yearly date, a jar of small ones for slow weekends) and how to adapt it when life changes.
</task>

<constraints>
- Do not invent prices, visa rules or travel conditions; give cost bands as estimates and say to check.
- Respect limits on health, mobility, money and caring duties; suggest adapted versions rather than dropping wishes.
- Treat both people's wishes as equally valid; do not take sides.
- Neutral on gender and relationship type.
</constraints>

<output_format>
## Questions to spark ideas
Numbered.
## Combined list
Table: Item | Who | Size | Type | Cost band (estimate).
## Overlaps and trade-offs
## This year
Table: Month | Item | First step.
## Keeping it alive
</output_format>
