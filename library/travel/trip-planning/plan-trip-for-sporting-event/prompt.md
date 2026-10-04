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
    description: The event and its date or dates, for example "Berlin Marathon, 27 September 2026" or "Champions League final, late May". Add the venue if you know it.
    type: string
    required: true
  - name: taking_part
    description: Whether you are watching or competing.
    type: enum
    enum: [spectator, participant]
    default: spectator
  - name: host_city
    description: Host city, or "not announced yet".
    type: string
    required: true
  - name: travelling_from
    description: Where you are travelling from. It decides jet lag, travel options and how early to arrive.
    type: string
    required: true
  - name: ticket_status
    description: Whether you already hold a ticket or race entry. not-yet includes ballots you have not entered; in-ballot means you are waiting for a result.
    type: enum
    enum: [have-it, in-ballot, not-yet]
    default: not-yet
  - name: budget
    description: Total budget per person with currency, and what it should cover.
    type: string
    required: true
  - name: group
    description: Who is coming and any needs, for example "me racing, partner and two kids supporting" or "four friends, one uses a wheelchair". Optional.
    type: text
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
Big events reshape a city for a few days: hotel prices surge and the good rooms go months ahead, roads close, public transport runs special timetables, venues have strict bag and ticketing rules, and the crowd leaving takes longer than the event itself. Tickets carry their own risks: many events sell only through official channels and an official resale exchange, tie tickets to a name or an app, and cancel tickets bought on unofficial sites, and scams spike before finals. Participants add more: ballots or qualifying times, medical certificates or ID at some races, in-person bib or accreditation pickup before the day, sleep and food before the start, and recovery before a long flight. You plan the trip around the event so the event itself goes well.

Event: {{event}}
Taking part as: {{taking_part}}
Host city: {{host_city}}
Travelling from: {{travelling_from}}
Ticket or entry: {{ticket_status}}
Budget: {{budget}}
{{#group}}Group: {{group}}{{/group}}
</context>

<task>
1. Tickets or entry, by status:
   - have-it: what to check on it (name on the ticket, app transfer, ID matching, bag policy, entry gate or start wave, transfer or deferral rules for a race entry) and nothing about buying.
   - in-ballot: the result date to watch, what to book now as fully refundable, and the fallback if the ballot fails (official resale, charity places for races, fan zones or another fixture).
   - not-yet: the legitimate routes (official sale, ballot, official resale exchange, hospitality packages sold by the organiser or its authorised agents; for races, ballot, qualifying time, charity place, authorised tour operator), any deadline that is close, how to spot scams, and why unofficial resale may be cancelled or breach the terms. Mark every rule verify for this event.
2. When to arrive and leave: from {{travelling_from}}, work out whether this is long-haul with a big time difference. Participants in an endurance event usually arrive early enough to adjust and to make the bib pickup (often two or more days for long-haul) and avoid a long flight within about a day of finishing; spectators avoid arriving on the event day and plan around road closures. Suggest dates.
3. Where to stay: book refundable early; staying near the venue or start versus a good transit line further out; quiet rooms and early breakfasts for participants. If the host city is not announced, say what to do on announcement day.
4. Event day plan: a timeline from waking to getting back, with transport (special services, walking routes, closures), security and bag policy, the entry gate or start corral, a meeting point if the group splits and a plan if phones die, food, water and weather, and the exit crowd. For participants, add breakfast already tested in training, kit laid out the night before, and where supporters can stand and how they move between spots. If the group includes children or access needs, plan for them explicitly (accessible entrances and seating are often booked in advance; verify).
5. Recovery and the rest of the trip: for participants, easy days after, walking, eating and sleeping well, and moving regularly on the flight home; for spectators, fan zones, other matches and sightseeing on quieter days.
6. Budget: split across ticket or entry, travel, accommodation at event-week prices, food, local transport and extras, with a buffer, and compare with {{budget}}. All figures are estimates to verify.
7. Before writing, check that the arrival and departure dates match the role and the distance from {{travelling_from}}, and that nothing in the tickets section applies to a different status.
</task>

<constraints>
- Never state ticket prices, resale rules, entry deadlines, bag policies or transport arrangements as fact; mark them "verify on the official event site".
- Never suggest buying from touts or unofficial resellers, using another person's ticket or bib, or getting round entry or ID checks.
- Training, pacing, nutrition and medical questions for participants go to their coach or doctor; heart conditions, heat illness risk or a recent injury need medical advice before racing.
- Do not invent venues, fan zones or transport services; describe what to look for instead.
</constraints>

<output_format>
## Tickets or entry
Bullets for this status only, starting with any urgent deadline.

## When to arrive and leave
Two or three lines with suggested dates.

## Where to stay
Bullets.

## Event day plan
Table: Time | What | Notes.

## Recovery and the rest of the trip
## Budget
Table: Item | Estimate | Notes, then the total against the budget.
## Verify before you go
Numbered.
</output_format>
