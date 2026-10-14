---
schema: 1
id: set-up-travel-planning-assistant
kind: prompt
title: Set up an assistant project for trip planning
description: Sets up an assistant project for planning trips with your travel style, budget, mobility and diet needs, a documents checklist and a living itinerary file that each chat updates.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual, parent]
requires: [none]
inputs: [preferences, text]
output: [prompt, checklist, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [travel-profile, living-itinerary, entry-requirements, accessible-travel]
pairs_with:
  prompts: [build-project-instructions, plan-itinerary, check-travel-requirements]
  personas: [travel-planner]
args:
  - name: travel_style
    description: Who travels, how you like to travel (pace, comfort, food, interests), typical budget level, and any mobility, diet or health needs that affect plans.
    type: text
    required: true
  - name: trip
    description: "Optional: the trip you are planning now, with dates, places, passports held and what is already booked."
    type: text
  - name: home_country
    description: Country you travel from, which affects visas, entry rules and insurance.
    type: string
output_contract:
  format: markdown
  sections: [Travel profile, Project instructions, Itinerary file, Documents checklist, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Trip planning in a chat drifts: the assistant forgets what was booked, re-suggests things already rejected, crams six sights into a day with a toddler, or states opening hours, prices, train times and visa rules that are out of date or invented. Experienced planners keep one living itinerary (what is booked, what is planned, what is still open), plan around energy and travel time rather than lists of sights, and verify anything that can change on official sources close to departure. Entry requirements depend on the passport, not where someone lives, and change often. An assistant project with a travel profile, an itinerary file and firm rules about time-sensitive facts gives better plans every trip.

<travel_style>
{{travel_style}}
</travel_style>
{{#trip}}
<trip>
{{trip}}
</trip>
{{/trip}}
{{#home_country}}
Home country: {{home_country}}
{{/home_country}}
</context>

<task>
1. Write a travel profile: travellers (ages, not names), pace, interests, food and diet, comfort level, budget band, mobility or health needs that affect plans, things to avoid. Mark gaps [CONFIRM].
2. Write project instructions, ready to paste, that:
   - read the profile and itinerary file before answering;
   - plan days with realistic travel times, rest and meals, at the profile's pace;
   - mark every time-sensitive fact (prices, opening hours, timetables, entry and visa rules, health requirements) as [VERIFY] with the kind of official source to check, and never state them as current;
   - base entry rules on the passports held and say to check the destination's official government sources and the carrier;
   - suggest plan B options for weather and closures;
   - return changes to the itinerary file as a short "update" block at the end.
3. Write the itinerary file template: trip, dates, travellers, booked (with references masked), planned, open questions, budget so far, and a dated "last updated" line. If a trip was given, fill it in from the input only.
4. Write a documents checklist: passports and validity, visas or travel authorisations, insurance, driving permits, health documents, copies, bookings, money cards, with each marked [VERIFY] where rules vary.
5. Give four tests, including a visa question and a request to add a sight that is closed on the planned day.
</task>

<constraints>
- Do not state visa, entry, health or price facts as current; mark them [VERIFY].
- Do not invent bookings, hotels or restaurants; suggestions are labelled as ideas to check.
- Keep booking references and passport numbers out of the files; use the last few characters if needed.
</constraints>

<output_format>
## Travel profile
Bullets with [CONFIRM] gaps.
## Project instructions
One fenced block, ready to paste.
## Itinerary file
A template in a fenced block.
## Documents checklist
A checklist.
## Tests
Four bullets: prompt and pass condition.
</output_format>
