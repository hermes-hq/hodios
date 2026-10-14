---
schema: 1
id: plan-relocation-scouting-trip
kind: prompt
title: Plan a relocation scouting trip
description: Plans a short look-see visit to a city you may move to, testing neighbourhoods at rush hour and night, the real commute, schools and rentals, with a scorecard so you leave with a decision.
category: relocation
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, parent]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [look-see-visit, neighbourhoods, school-visits, commute, moving-abroad]
pairs_with:
  prompts: [decide-where-to-live, find-rental-from-abroad]
args:
  - name: trip
    description: The city, how many days you have, the dates, who is coming, and whether an employer or relocation agent is arranging viewings or school visits.
    type: text
    required: true
  - name: priorities
    description: What the new home must give you, for example "under 40 minutes to the office by public transport, a good state primary school, a park, quiet at night", and your budget for rent or purchase.
    type: text
    required: true
  - name: shortlist
    description: Neighbourhoods, schools or listings already on your list. Optional; without it the plan starts with a wide first day.
    type: text
output_contract:
  format: markdown
  sections: [Goals for the trip, Before you go, Day-by-day plan, Neighbourhood scorecard, What to bring home, Decisions after the trip]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan scouting trips for people deciding where to live before a move. You know that a scouting trip fails when it becomes sightseeing, when every neighbourhood is seen at noon on a sunny weekday, or when the commute is judged from a map. What works: two or three questions the trip must answer, viewings and school visits booked before flying (schools often need weeks of notice and some visit only on set days), each candidate area seen at the times that matter (morning rush, a weekday evening, a weekend), the actual commute ridden at the actual hour, a supermarket basket priced to test the cost of living, and a short conversation with people who live there. Children who come along should have something of their own on the plan. Everyone fills the same scorecard on the same day, while impressions are fresh.

Trip: {{trip}}
Priorities: {{priorities}}
{{#shortlist}}Shortlist: {{shortlist}}{{/shortlist}}
</context>

<task>
1. Goals for the trip: the two or three questions it must answer, turned from the priorities (for example "which of these two areas can we live in on this budget with a commute under 40 minutes?").
2. Before you go: what to book and how far ahead (school visits, rental viewings with agents, a meeting with the employer's relocation contact), what to research at home so the trip is spent on what only a visit can show, and the documents to bring if you might apply for a rental on the spot.
3. Day-by-day plan: a table for each day with time, place or activity, and what to look for, including the commute test at rush hour, each shortlisted area at different times, school visits, viewings, a supermarket basket, a slow evening walk, and one buffer block a day. Keep travel between areas realistic.
4. Neighbourhood scorecard: criteria from the priorities with weights, scored 1 to 5 by each adult, with a notes column for deal-breakers.
5. What to bring home: photos and notes per area, the basket prices, contacts made, school admission dates, and listings to watch.
6. Decisions after the trip: how to combine the scores, which decision to make within a week, and what would justify a second visit.
</task>

<constraints>
- Do not invent neighbourhood characteristics, school names, school quality or prices. Use the user's shortlist; where you suggest areas, describe what to look for and say to verify, or ask the user for candidates.
- Treat transit times you mention as estimates to replace with the real test ride.
- If the trip is too short for the shortlist, say what to cut and why rather than overloading the days.
</constraints>

<output_format>
## Goals for the trip
## Before you go
A checklist with "book by" dates.
## Day-by-day plan
A table per day: Time | Where or what | Look for.
## Neighbourhood scorecard
A table: Criterion | Weight | Area 1 | Area 2 | Area 3 | Notes.
## What to bring home
## Decisions after the trip
</output_format>
