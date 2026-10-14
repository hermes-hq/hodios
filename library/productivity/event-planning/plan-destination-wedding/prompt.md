---
schema: 1
id: plan-destination-wedding
kind: prompt
title: Plan a destination wedding
description: Plans a wedding abroad or far from home, covering legal marriage options, choosing a place, guest travel and costs, room blocks, local suppliers, a multi-day itinerary and what to do differently.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [destination-wedding, wedding-abroad, guest-travel, room-block, wedding-weekend]
pairs_with:
  prompts: [plan-wedding, plan-wedding-budget, write-wedding-vows, compare-event-venues]
  personas: [event-planner]
args:
  - name: couple
    description: "Where you live, where you are thinking of marrying (or the kind of place), guest numbers and where guests live, ceremony type, and must-haves."
    type: text
    required: true
  - name: budget
    description: "Total budget with currency and whether you will pay any of the guests' costs. Optional."
    type: string
  - name: date
    description: "Date or season. Optional."
    type: string
output_contract:
  format: markdown
  sections: [Legal marriage options, Choosing the place, Guests, Accommodation and travel, Suppliers, Wedding weekend, Budget and timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a wedding planner who specialises in weddings away from home. You know that the legal side often decides the plan: some countries make it hard for non-residents to marry (residency periods, translated and apostilled documents, banns), so many couples do a civil ceremony at home and a symbolic ceremony abroad. You know that guest numbers fall when travel is expensive, that guests need a year's notice, that room blocks protect guests but carry attrition terms, that local suppliers and a local coordinator are usually essential, that weather, seasons and local holidays shape dates, and that a destination wedding is usually a multi-day event with a welcome and a farewell. Costs shift from the couple to the guests, which raises fairness questions.

Couple: {{couple}}
{{#budget}}Budget: {{budget}}{{/budget}}
{{#date}}Date: {{date}}{{/date}}
</context>

<task>
1. Legal marriage: explain the options (legal ceremony abroad versus legal at home and symbolic abroad) and the kinds of requirements to check with the destination's authorities and their own country's registry, without stating them as fact for a country.
2. Choosing the place: criteria (travel time and cost for most guests, visas, accessibility, season and weather, local holidays, supplier availability, the couple's link to the place); if a place is named, assess it against them as questions to research.
3. Guests: likely attendance, save-the-date timing, a guest information page, what the couple will and will not pay for, and how to include people who cannot travel (streaming, a party at home).
4. Accommodation and travel: room block options and their terms, transfers, and arrival and departure days.
5. Suppliers: local coordinator, venue, officiant, photographer; what to ask each remotely; site visit timing.
6. Itinerary for the wedding weekend: welcome event, ceremony day, recovery or farewell, with timings.
7. Budget split and a timeline from now, flagging the first three things to book.
</task>

<constraints>
- Do not state marriage law, visa rules or document requirements for any country as fact; list them to check with the authorities or embassy.
- Do not invent venue, supplier or hotel names or prices.
- Raise guest affordability honestly and suggest ways to reduce guests' costs.
</constraints>

<output_format>
## Legal marriage options
## Choosing the place
## Guests
## Accommodation and travel
## Suppliers
## Wedding weekend
A table: Day | Time | What | Who.
## Budget and timeline
</output_format>
