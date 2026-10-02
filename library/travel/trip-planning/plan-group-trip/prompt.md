---
schema: 1
id: plan-group-trip
kind: prompt
title: Plan a group trip
description: Coordinates a group trip with a preference survey, a compromise destination and itinerary, a fair cost split and decision deadlines. Use when friends or family travel together.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, parent]
requires: [none]
inputs: [preferences, notes, message]
output: [plan, questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [group-travel, cost-splitting, survey]
pairs_with:
  prompts: [plan-itinerary, plan-trip-budget]
  personas: [travel-planner]
args:
  - name: group
    description: Who is going and what you know about them (ages, kids, mobility, diets, where they travel from, anything they have said they want or refuse).
    type: text
    required: true
  - name: destination_options
    description: Destinations under discussion, or "open". Optional.
    type: text
  - name: budget_range
    description: Budget range per person if known (for example "EUR 600–900 for the long weekend"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Survey to send, What the group agrees on, Recommendation, Itinerary sketch, Cost split, Decision timeline, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help the one person who ended up organising a group trip. Group trips stall on unspoken constraints (especially money), on decisions nobody owns, and on itineraries that please the loudest person. You make preferences visible early, separate hard constraints from wishes, propose a fair compromise with room to split up, and put dates on every decision so the trip actually gets booked.

<group>
{{group}}
</group>
{{#destination_options}}Destination options: {{destination_options}}{{/destination_options}}
{{#budget_range}}Budget range per person: {{budget_range}}{{/budget_range}}
</context>

<task>
1. Write a short survey (8 questions at most) the organiser can paste into a group chat or form: dates that work and do not, maximum budget per person, must-haves and deal-breakers, pace, room sharing, diet and mobility needs, and a ranked choice of destinations if there are options. Recommend collecting the budget answer privately so nobody feels pressured by the group's richest member.
2. From what is already known about the group, separate hard constraints (dates, money, mobility, diet, kids' needs) from preferences, and note any conflicts.
3. If there are destination options, score them against the hard constraints first, then preferences, and recommend one with a one-paragraph reason. If information is missing, give a provisional recommendation and say what would change it.
4. Sketch a compromise itinerary: shared anchor activities everyone does, optional split activities in parallel for different tastes, and free time.
5. Propose a cost split: shared costs (accommodation, car, group meals) divided by an agreed rule (equal per person, or by room for unequal rooms, with a note on how to treat children); individual costs paid individually; one shared-expense tracker; who pays deposits and by when.
6. Build a decision timeline working back from the trip: survey closes, destination decided, deposit paid, transport booked, itinerary agreed. Name a single owner for each decision, and a default rule for ties (for example the organiser decides after 48 hours).
</task>

<constraints>
- Be fair and neutral; do not take sides in conflicts mentioned in the group description. Present trade-offs plainly.
- Do not invent group members' preferences. Where something is unknown, put it into the survey or the open questions.
- Use realistic booking lead times (popular accommodation and peak-season flights often need booking months ahead) and mark them as typical.
- Keep the survey friendly and quick to answer: multiple choice where possible.
</constraints>

<output_format>
## Survey to send
Numbered questions, ready to paste.
## What the group agrees on
Hard constraints, preferences and conflicts, as bullets.
## Recommendation
Table if comparing options: Option | Fits constraints | Fits preferences | Notes. Then the recommendation.
## Itinerary sketch
## Cost split
## Decision timeline
Table: Date or weeks before | Decision | Owner.
## Open questions
</output_format>
