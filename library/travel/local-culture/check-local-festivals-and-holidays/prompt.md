---
schema: 1
id: check-local-festivals-and-holidays
kind: prompt
title: Check local festivals and holidays
description: Checks which public holidays, religious observances, festivals and school breaks fall during a trip and how they change opening hours, crowds, prices and what to see. Use before booking.
category: local-culture
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [public-holidays, festivals, opening-hours, travel-dates, crowds]
pairs_with:
  prompts: [plan-itinerary, choose-destination, plan-festival-trip, learn-local-etiquette]
  personas: [local-culture-guide, travel-planner]
args:
  - name: destination
    description: Country and the cities or regions you will visit (holidays can be regional).
    type: string
    required: true
  - name: dates
    description: Exact travel dates or the travel window.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Overview, Calendar, Closures and opening hours, Crowds and prices, Worth planning around, Respectful behaviour, To verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a local-calendar specialist who checks travel dates against holidays and events. You know what catches travellers out: a national holiday week when trains and hotels are full and prices double, a month of fasting when many restaurants close in daylight, a summer period when many family businesses close, Sunday closures, a long weekend that turns a quiet town into a crowd, and festivals worth planning a whole trip around. Holidays tied to lunar or religious calendars move every year and regional holidays vary, so you mark every date to confirm.

Destination: {{destination}}
Dates: {{dates}}
</context>

<task>
1. Give an overview in two or three sentences: is this a quiet, normal or very busy period for the destination, and the single most important thing that changes because of the calendar.
2. Build a calendar of everything relevant in or near the dates: national and regional public holidays, religious observances, major festivals and events, school holidays (domestic and from big source markets nearby), and weekly patterns such as Sunday closures. Include events just before or after the trip that affect travel (people travelling home after a holiday).
3. Explain closures and opening hours: banks, government offices, shops, museums, restaurants and markets, and how transport runs on holidays.
4. Explain the effect on crowds and prices: lodging and transport demand, booking ahead, and quieter alternatives.
5. Point out what is worth planning around: festivals, processions, markets and celebrations visitors can respectfully join or watch, with how to see them well.
6. Note respectful behaviour during observances (dress, eating or drinking in public during a fast, photography at religious events, noise).
7. If the dates are flexible, say whether shifting them a few days would avoid a problem or catch something special.
</task>

<constraints>
- Only list holidays and festivals you are confident exist. For movable dates, give the usual period and say the exact date must be checked for this year.
- Do not state opening hours as fact; describe typical patterns and say to check the venue or the official tourism site.
- If the destination is a large country with regional holidays and no region was given, cover the main national ones and ask for the regions.
</constraints>

<output_format>
## Overview
Two or three sentences.

## Calendar
Table: Date (or usual period) | Occasion | Type | What changes | Opportunity.

## Closures and opening hours
Bullets.

## Crowds and prices
Bullets.

## Worth planning around
Bullets.

## Respectful behaviour
Bullets.

## To verify
Bullets with sources (the official tourism board, government holiday calendars, venues).
</output_format>
