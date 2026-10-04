---
schema: 1
id: plan-trip-for-sporting-event
kind: prompt
title: Plan a trip for a sporting event
description: Plans a trip to watch or take part in a sporting event abroad, such as a marathon, a final or a tournament, with tickets or entry, timing around the event, transport on the day and recovery.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [sports-travel, marathon, tournament, event-tickets, race-weekend]
pairs_with:
  prompts: [plan-race-day, plan-festival-trip, beat-jet-lag, choose-travel-insurance, plan-itinerary]
  personas: [travel-planner]
args:
  - name: event
    description: The event and its date, for example "Berlin Marathon, 27 September" or "Champions League final".
    type: string
    required: true
  - name: role
    description: Whether you are watching or taking part.
    type: enum
    enum: [spectator, participant]
    default: spectator
  - name: city
    description: Host city, and where you are travelling from.
    type: string
    required: true
  - name: budget
    description: Total budget with currency, and whether you already have a ticket or race entry.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Tickets or entry, When to arrive and leave, Where to stay, Event day plan, Recovery and the rest of the trip, Budget, Verify before you go]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Big events reshape a city for a few days: hotel prices surge and the good ones go months ahead, roads close, public transport runs special timetables, stadiums have bag and ticketing rules, and the crowds leaving take longer than the event itself. Tickets carry their own risks: many events allow resale only through an official exchange, tie tickets to a name or app, and void tickets bought on unofficial sites, and scams spike before finals. Participants add more: registration windows or ballots, medical or ID requirements at some races, in-person bib or accreditation pickup the day before, sleep and food before the start, and recovery before a long flight. You plan the trip around the event so the event goes well.

Event: {{event}}
Role: {{role}}
City: {{city}}
Budget: {{budget}}
</context>

<task>
1. Tickets or entry: for spectators, official sale channels, ballots and official resale; how to spot scams and why unofficial resale may be void or breach the terms (to verify for this event). For participants, entry routes (ballot, qualifying time, charity place, tour operator package), registration deadlines, any medical certificate or ID required by some events, transfer or deferral rules, and pickup rules for bibs or accreditation. If they already hold a ticket or entry, skip to what to check about it.
2. When to arrive and leave: for participants, arrive early enough to handle the time difference and pickup (often two or more days for long-haul), and avoid a long flight right after an endurance event; for spectators, avoid arriving on the event day and plan around road closures.
3. Where to stay: book refundable early; trade-offs between staying near the venue or start and staying on a good transit line further out; noise and early starts for participants.
4. Event day plan: a timeline from waking to getting home, including transport (special services, walking, closures), security and bag policy, entry gate or start corral, meeting points if the group splits, food, water and weather, and the exit crowd. For participants, add breakfast timing tested in training, kit laid out the night before, a plan for supporters along the course.
5. Recovery and the rest of the trip: for participants, gentle days after, walking, eating and sleeping well, and moving regularly on the flight home; for spectators, fan zones or other matches and sightseeing on quieter days.
6. Budget: a split across ticket or entry, travel, accommodation at event prices, food and extras, with a buffer.
7. Before writing, check that the arrival and departure timing matches the role and the distance travelled.
</task>

<constraints>
- Never state ticket prices, resale rules, entry deadlines, bag policies or transport arrangements as fact; mark them "verify on the official event site".
- Never suggest buying from touts, using another person's ticket or bib, or bypassing entry checks.
- Training, nutrition and medical questions for participants go to their coach or doctor; health concerns (heart conditions, heat illness risk) need medical advice before racing.
</constraints>

<output_format>
## Tickets or entry
Bullets, starting with any urgent deadline.

## When to arrive and leave
Two or three lines with suggested dates.

## Where to stay
Bullets.

## Event day plan
Table: Time | What | Notes.

## Recovery and the rest of the trip
## Budget
Table: Item | Estimate | Notes.
## Verify before you go
Numbered.
</output_format>
