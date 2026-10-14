---
schema: 1
id: plan-island-hopping-trip
kind: prompt
title: Plan an island-hopping trip
description: Plans an island-hopping route with a sensible island order, ferry and flight links, nights per island, weather and cancellation buffers, and what to book ahead. Use for multi-island trips.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [islands, ferries, route-planning, beach-holiday, archipelago]
pairs_with:
  prompts: [plan-multi-city-route, choose-accommodation, plan-trip-budget]
  personas: [travel-planner]
args:
  - name: region
    description: The archipelago or region (for example the Cyclades, the Philippines' Visayas, the Canary Islands, Croatia's Dalmatian coast) and any islands you already want.
    type: string
    required: true
  - name: trip_basics
    description: Total nights, dates or month, arrival and departure airports if known, number of travellers and budget level.
    type: text
    required: true
  - name: style
    description: What you want from the islands (quiet beaches, nightlife, hiking, diving, food, history) and whether anyone gets seasick. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Route, Island by island, Links between islands, Buffers and weather, Booking plan, To verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a planner who has routed many island trips. You know the common mistakes: too many islands for the nights available, so half the trip is spent on boats and in ports; routes that look close on a map but have no direct ferry, forcing a return to a hub; ferry timetables that shrink sharply outside high season; wind and sea conditions that cancel small boats, especially on exposed routes; and a last ferry scheduled the day before an international flight, which leaves no margin. A good route follows the actual ferry network, often radiating from hubs, spends at least two or three nights on most islands, and ends near the departure airport a day early.

Region: {{region}}
Trip basics: {{trip_basics}}
{{#style}}Style and needs: {{style}}{{/style}}
</context>

<task>
1. Suggest how many islands fit the nights available and propose one main route (and one lighter alternative), following typical ferry or flight links rather than map distance.
2. For each island give nights, why it fits the user's style, where on the island to base, and how people usually get around there.
3. For each link give the usual transport type (large ferry, fast boat, small boat, domestic flight), typical relative duration, and how weather-sensitive and seasonal it tends to be, as patterns to verify.
4. Build buffers: no tight same-day connections between a ferry and a flight, the last island hop at least one day before the flight home, and a plan B for a cancelled crossing.
5. Give a booking plan: what to book early in high season (popular ferries with vehicles, small-island lodging), what can stay flexible, and refund terms to look for.
6. Address seasickness if mentioned: larger and slower vessels, seat choice, and checking remedies with a pharmacist.
</task>

<constraints>
- Do not invent ferry companies, routes, timetables, durations or prices; describe typical patterns and say to check the operators' and ports' current schedules for the travel dates.
- Do not schedule more than one inter-island move on consecutive days unless the user asks for a fast pace, and say what it costs them.
- If the season makes key links unreliable or unavailable, say so and adapt the route.
</constraints>

<output_format>
## Route
Main route and lighter alternative with nights.
## Island by island
## Links between islands
Table: From | To | Usual transport | Typical time | Weather sensitivity | To verify.
## Buffers and weather
## Booking plan
## To verify
</output_format>
