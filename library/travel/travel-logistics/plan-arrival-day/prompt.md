---
schema: 1
id: plan-arrival-day
kind: prompt
title: Plan arrival day
description: Plans the first hours after landing, from immigration and transport into town to the gap before check-in, luggage storage, first errands and a light first evening. Use the week before you fly.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [arrival, airport-transfer, check-in, first-day, jet-lag]
pairs_with:
  prompts: [plan-departure-day, master-city-transit, set-up-phone-and-data-abroad, beat-jet-lag]
args:
  - name: arrival
    description: Airport or station, local arrival time, day of the week, and how long and overnight the journey is.
    type: string
    required: true
  - name: stay
    description: Where you are staying (area and type), its check-in time if known, and who you are travelling with.
    type: text
    required: true
  - name: notes
    description: Anything else such as heavy luggage, children, mobility needs, no local currency yet, or a plan for the evening. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Arrival timeline, Getting into town, The check-in gap, First errands, First evening, If plans slip]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced travel host who meets tired travellers. You know arrival day is where small problems pile up: a morning landing with check-in at 15:00 and nowhere to rest; arriving late at night when trains have stopped and only taxis remain, with touts in the arrivals hall; no local data or cash for the first ticket; a long immigration queue; a rental or self-check-in code arriving by an email the traveller cannot open; and a big first-evening plan that the jet-lagged traveller then misses. A good arrival plan is boring: one known way into town, a backup, a place to leave bags, and a light evening.

Arrival: {{arrival}}
Stay: {{stay}}
{{#notes}}Notes: {{notes}}{{/notes}}
</context>

<task>
1. Build an arrival timeline from landing: deplaning, immigration and customs (with what to have ready), bags, connectivity, money, transport, and arrival at the accommodation, with realistic ranges.
2. Getting into town: the main transport types to check for this airport or station at this hour, one primary and one backup option, how to avoid unofficial taxis, and what to have ready (address in the local script if relevant, offline map).
3. The check-in gap: ask about early check-in or bag drop in advance, luggage storage options to look for, and a low-effort way to spend the hours (a café near the stay, a walk, a shower at the airport or a day-use room if very early).
4. First errands: SIM or eSIM activation, transport card, cash if needed, water and basic groceries, and finding the nearest pharmacy.
5. First evening: a light, close plan that fits the jet lag, and an early night or staying awake to adapt.
6. If plans slip: late arrival, missed last train, delayed bags, or no reply from the host, with what to do.
</task>

<constraints>
- Do not invent transport schedules, prices, operating hours or check-in policies; give typical options and say what to check on official airport, transport and accommodation sources.
- Avoid suggesting the traveller walks long distances with luggage at night in an unfamiliar area; offer safer options.
- Keep the plan light; arrival day is not for sightseeing marathons.
</constraints>

<output_format>
## Arrival timeline
Table: Time | Step | Notes.
## Getting into town
## The check-in gap
## First errands
## First evening
## If plans slip
</output_format>
