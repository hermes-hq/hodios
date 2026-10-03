---
schema: 1
id: plan-departure-day
kind: prompt
title: Plan departure day
description: Plans departure day door to gate with a timeline that works back from the flight through gate close, bag drop, security and the journey there, with buffers. Use the day before you fly.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [airport, departure-timeline, check-in, flight-day]
pairs_with:
  prompts: [build-packing-list, plan-airport-layover, plan-flying-with-baby]
  personas: [travel-planner]
args:
  - name: flight_time
    description: Departure time and date, domestic or international, and whether you are checking bags.
    type: string
    required: true
  - name: airport
    description: Departure airport and terminal if known.
    type: string
    required: true
  - name: travelers
    description: Who is travelling (children, anyone needing assistance, pets), and whether you have checked in online or have fast-track security. Optional.
    type: text
  - name: transport
    description: How you will get to the airport and from where (for example "drive from home 50 km away and park", "train from the city centre", "taxi from the hotel"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Timeline, Night before, Morning of, At the airport, If you are running late]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan travel days backwards from the flight, the way experienced travellers and travel managers do. The departure time is not the deadline: the gate usually closes 15–30 minutes before departure, and bag drop often closes 45–60 minutes before a domestic flight and earlier for international flights. Security and passport queues vary a lot by airport, day and time. You add buffers for the things that commonly go wrong (traffic, a late train, a long queue, a child who needs the toilet) so the traveller is calm at the gate instead of running.

Flight: {{flight_time}}
Airport: {{airport}}
{{#travelers}}Travellers: {{travelers}}{{/travelers}}
{{#transport}}Getting there: {{transport}}{{/transport}}
</context>

<task>
1. Work out the deadlines backwards from departure: gate close, boarding start, bag drop or check-in close (use typical values and say to confirm with the airline), the time needed for security and passport control at this airport at this time of day, and walking or train time to the gate in large terminals.
2. Add the journey to the airport with a buffer of at least 25–50% on the usual travel time (more at rush hour or with a single train connection), plus parking and shuttle time if driving, or terminal transfer time.
3. Turn that into a timeline from wake-up to boarding with clock times. Show the buffer explicitly. If the result means leaving very early or the night before, say so and suggest alternatives (an airport hotel, an earlier train, a taxi booked in advance).
4. Write a night-before checklist: online check-in and boarding passes saved offline, passports and documents in one place, liquids bag packed, bags weighed, chargers, transport booked or checked for disruptions, alarms set, and a check of the flight status.
5. Write a morning-of checklist: flight status, the last items (phone, wallet, passport, medicine, keys), and leaving on time.
6. Give tips at the airport: which steps to do first, assistance or family lanes if relevant, and when to head to the gate.
7. Give a plan if running late: who to call, whether to go straight to the desk, and what happens if the bag drop or gate has closed.
</task>

<constraints>
- Do not state an airline's or airport's exact cut-off or queue times as fact; use typical values, label them, and say to check the airline's and airport's sites.
- If the flight time, domestic or international, or checked bags are unknown, ask, because they change the timeline. If only some details are missing, make a clearly stated assumption and continue.
</constraints>

<output_format>
## Timeline
Table: Time | What | Buffer or note. Earliest step at the top.

## Night before
Checklist.

## Morning of
Checklist.

## At the airport
Bullets.

## If you are running late
Numbered steps.
</output_format>

<examples>
Input: an international flight at 10:40 with a checked bag, a 45-minute drive with airport parking, a busy hub on a Monday morning.
Timeline extract: 10:40 departure → 10:10 gate closes (typical; check) → 09:40 airside, a 30-minute buffer → 08:40 bags dropped, then about 60 minutes for security and passport control on a Monday morning (bag drop typically closes 60 minutes before an international departure; check) → 08:20 at the terminal (parking shuttle about 15 minutes) → 07:20 leave home (45-minute drive plus a 20-minute traffic buffer) → 06:30 wake up.
</examples>
