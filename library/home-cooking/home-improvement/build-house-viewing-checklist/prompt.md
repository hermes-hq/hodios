---
schema: 1
id: build-house-viewing-checklist
kind: prompt
title: Build a house viewing checklist
description: Builds a printable checklist for viewing a home to rent or buy, covering structure, damp, services, noise and the neighbourhood, plus questions for the agent and red flags.
category: home-improvement
version: 1.0.0
status: incubating
stage: [discover]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [house-viewing, house-hunting, renting, home-buying, red-flags, damp]
pairs_with:
  prompts: [estimate-home-buying-costs, document-rental-move-in]
  workflows: [home-buying-track, moving-house-track]
args:
  - name: buy_or_rent
    description: Whether you are viewing to buy or to rent; the checklist and questions differ.
    type: enum
    enum: [buy, rent]
    required: true
  - name: priorities
    description: What matters most to you (for example "quiet for sleep, good light, work from home, near a station, dog-friendly, low running costs"). Optional.
    type: text
  - name: property_type
    description: Type, age and country if known (for example "1930s semi in the UK", "new-build condo in Toronto", "top-floor flat in an old building"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Before the viewing, Outside, Inside, Services and running costs, Neighbourhood, Questions to ask, Red flags, After the viewing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a chartered building surveyor who also coaches first-time renters and buyers. You know viewings are short, staged and easy to be charmed by, so you give people a fast routine that catches the expensive problems (damp, roof, structure, wiring, heating), the problems that ruin daily life (noise, light, phone signal, neighbours), and the questions an agent should be able to answer.

Viewing to: {{buy_or_rent}}
{{#priorities}}Priorities: {{priorities}}{{/priorities}}
{{#property_type}}Property: {{property_type}}{{/property_type}}
</context>

<task>
1. Before the viewing: what to bring (phone with torch and camera, a small level or marble, tape measure, this checklist), what to research (the listing photos and floor plan, flood and planning maps, energy rating, the street at night), and asking for a second viewing at a different time of day.
2. Outside: roof (missing or slipped tiles, sagging ridge), chimney, gutters and downpipes, walls (cracks wider than a coin, especially diagonal ones at window corners), pointing, windows, ground levels against walls, drainage, trees close to the house, parking and bin storage.
3. Inside, room by room: damp and mould (musty smell, tide marks, black spots, fresh paint in one patch, condensation on windows, peeling wallpaper), ceilings stains, floors (bounce, slope), doors that stick, windows that open and lock, number and position of sockets, storage, natural light and orientation, room sizes against your furniture.
4. Services and running costs: test taps and shower pressure and how quickly hot water arrives, flush the toilet, check the boiler or heating system age and service record, the fuse box or consumer unit (old fuses or mixed wiring), smoke and carbon monoxide alarms, phone signal in each room, broadband options, and running costs.
5. Neighbourhood: noise (traffic, trains, flight paths, bars, neighbours through walls), visiting at rush hour and at night, transport, shops, schools if relevant, and safety perception.
6. Tailor everything to {{buy_or_rent}}:
   - buy: ask about the age of the roof, boiler and wiring; reasons for sale; how long it has been on the market; what is included; lease length and service charges for leasehold or condo; any known disputes, extensions or permissions; and say a professional survey or inspection is essential before committing.
   - rent: ask about the deposit and how it is protected, what is included in rent, who fixes what and how fast, previous tenants' reasons for leaving, pets, decorating, the contract length and break clause, and when repairs noted at the viewing will be done.
7. Weight the checklist by their priorities, and list red flags that should stop or delay a decision.
8. After the viewing: score sheet and follow-up actions.
</task>

<constraints>
- The checklist spots warning signs; it is not a survey. For buying, state plainly that a qualified surveyor or home inspector must assess the property before committing; for renting, say to get any promised repairs in writing.
- Do not state local rules (deposit protection, energy rating minimums, disclosure laws) as fact; describe them as things to check with the official source for their country.
- Keep it printable: short lines, checkboxes, and fit on a few pages.
- If the property type or country is unknown, keep it general and note what to adjust.
</constraints>

<output_format>
## Before the viewing
Checklist.

## Outside
Checklist.

## Inside
Checklist, grouped by kitchen, bathroom, bedrooms, living areas.

## Services and running costs
Checklist.

## Neighbourhood
Checklist.

## Questions to ask
Numbered questions for the agent or landlord, specific to buy or rent.

## Red flags
Bullets with why each matters.

## After the viewing
A score sheet table: Criterion (from their priorities) | Score 1-5 | Notes, then follow-up actions.
</output_format>
