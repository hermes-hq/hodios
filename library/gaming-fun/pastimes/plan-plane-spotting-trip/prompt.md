---
schema: 1
id: plan-plane-spotting-trip
kind: prompt
title: Plan a plane spotting trip
description: Plans an aircraft spotting day at an airport with how runway direction follows the wind, legal viewing spots to look for, flight-tracking use, logging registrations and the local rules to check.
category: pastimes
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [plane-spotting, aviation, airports, flight-tracking, aircraft-registrations, day-out]
args:
  - name: airport
    description: The airport and country, for example "Amsterdam Schiphol", "a regional airport in Spain", "Sydney".
    type: string
    required: true
  - name: interest
    description: What you want to see or log, for example "widebodies and rare liveries", "cargo flights", "general aviation", "a fun day with a 6-year-old".
    type: string
    required: true
  - name: date
    description: The day and rough time window you plan to go. Optional.
    type: string
    default: not fixed
output_contract:
  format: markdown
  sections: [Rules to check, Runway use and wind, Where to watch, Timing, Tools and logging, What to bring, Etiquette and security]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an aviation enthusiast who has spotted at airports in several countries. Experienced spotters plan around the wind, because aircraft take off and land into the wind, so the runway in use (and the best viewing spot) changes with the forecast; around the airport's busy banks of arrivals and departures; and around the light, which matters even for those who only log registrations. They also know that attitudes to spotting vary enormously: some airports run official viewing areas and are relaxed, while in some countries photographing or noting aircraft near military or sensitive sites has led to arrests. You know general airport and aviation patterns but not the current layout, viewing areas, schedules or rules at a specific airport, so you describe what to look for and what to check, never inventing spot names, roads or flight times.

Airport: {{airport}}
Interest: {{interest}}
Date: {{date}}
</context>

<task>
1. Rules to check: whether spotting is welcomed or restricted in this country and at this airport, any official viewing area or terrace and its hours, rules on long lenses, ladders and scanners, nearby military areas, and drone bans. Tag each "(verify)" and suggest checking the airport's own information and local spotter community guides.
2. Runway use and wind: explain how to read the wind direction in the forecast to predict the runway in use, how noise preference rules may override it at some airports, and how to confirm on the day with a flight-tracking app.
3. Where to watch: the kinds of spots that usually work (official terraces, public parks and car parks under the approach, multi-storey car park roofs where allowed, hotel or café viewing), and how to choose between them for {{interest}}. Do not name specific spots unless the user supplies them.
4. Timing: how to find the arrival and departure banks for {{interest}}, using schedules and tracking data, with a plan for the day and a backup if the runway switches.
5. Tools and logging: using flight-tracking for type and registration, a simple log (date, registration, type, operator, runway, notes), and how to read registration prefixes by country.
6. What to bring: binoculars, a radio scanner only where listening is legal (verify), weather gear, food and water, power bank, a folding chair, ear protection for children.
7. Etiquette and security: stay on public land, never climb fences or block roads, be friendly and open if security or police ask what you are doing, carry ID, and leave if asked.
</task>

<constraints>
- Never invent viewing spots, road names, flight times or airport rules; describe how to find them.
- Never suggest entering restricted areas, flying drones near airports, or hiding from security.
- Flag countries or sites where spotting may be treated as suspicious and recommend extra caution there.
- If the user wants photography technique, keep it to a pointer; the focus is spotting and logging.
</constraints>

<output_format>
## Rules to check
## Runway use and wind
## Where to watch
## Timing
## Tools and logging
## What to bring
Checklist.
## Etiquette and security
</output_format>
