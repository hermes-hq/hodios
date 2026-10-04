---
schema: 1
id: plan-overland-border-crossing
kind: prompt
title: Plan an overland border crossing
description: Plans an overland border crossing by car, bus, bike or on foot, with crossing choice, documents, vehicle permits, money, the sequence at each post and scams to expect.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [border-crossing, overland-travel, vehicle-permits, visa-on-arrival, road-trip-abroad]
pairs_with:
  prompts: [check-travel-requirements, plan-road-trip, check-destination-safety, roleplay-border-interview]
  personas: [travel-planner]
args:
  - name: from_country
    description: Country you are leaving.
    type: string
    required: true
  - name: to_country
    description: Country you are entering.
    type: string
    required: true
  - name: mode
    description: How you will cross.
    type: enum
    enum: [car, bus, bike, foot]
    default: bus
  - name: nationality
    description: The passport you will use (and any second one you carry).
    type: string
    required: true
  - name: crossing_point
    description: The specific border post or the towns on either side, if you know them. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Choosing the crossing, Documents, Vehicle paperwork, Money, At the border step by step, Scams and pressure, Timing, Verify before you go]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Land borders differ from airports in ways that strand travellers: some crossings are closed to foreigners or to vehicles, some do not issue the visa-on-arrival that the airport does, some e-visas are valid only at listed ports of entry, posts keep limited hours and close on holidays, and the exit post and entry post may be kilometres apart. Vehicles add a second layer: registration papers, an owner's authorisation if the driver is not the owner, local or international insurance, temporary import permits or a carnet in some regions, and rental contracts that forbid crossing. Bus passengers usually take their luggage through themselves, and buses do not always wait. You plan the crossing so nothing is a surprise.

From: {{from_country}}
To: {{to_country}}
Mode: {{mode}}
Passport: {{nationality}}
{{#crossing_point}}Crossing: {{crossing_point}}{{/crossing_point}}
</context>

<task>
1. Choosing the crossing: if a crossing is named, say what to check about it (open to foreigners and to this mode, hours, visa issuing, e-visa port list). If none is named, say what makes a crossing suitable and list the main ones you are confident exist, marked verify.
2. Documents: passport validity and blank pages, the visa or entry permission for a {{nationality}} passport (to verify on official sources, never asserted), exit requirements from {{from_country}} (exit stamp, departure fees, overstay fines), onward ticket or proof of funds if commonly requested, health certificates such as yellow fever if the route needs them, and copies.
3. Vehicle paperwork, only for car or bike (motorbike or bicycle as applicable): registration, owner's authorisation, licence and International Driving Permit, insurance valid in {{to_country}} or bought at the border, temporary import permit or carnet if used in the region, rental permission, and what happens if you leave without the vehicle. For a bicycle, keep it to what is relevant (rules on cycling through the crossing zone, transporting it).
4. Money: currency to carry for fees, exchanging small amounts, rates near borders, card availability, and keeping official receipts for every fee.
5. At the border step by step for {{mode}}: exit post, any no-man's land, entry post, customs, and for buses what happens to luggage and the bus.
6. Scams and pressure: unofficial helpers, fake fees or forms, money changers, "closed border" stories, with how to respond politely.
7. Timing: arrive early in the day, avoid holidays and weekend peaks, buffers for queues, and the last onward transport.
8. Before writing, check that no visa or permit rule is stated as current fact and that vehicle sections appear only for car or bike.
</task>

<constraints>
- Visa, permit and insurance rules change and depend on nationality; mark them "verify on the official immigration or customs source of both countries" and the traveller's own government travel advice.
- Never suggest bribes, unofficial crossings, or understating goods or vehicle status at customs.
- If official travel advice for the border region warns against travel, say so first and suggest checking it.
- Do not invent border post names, hours or fees.
</constraints>

<output_format>
## Choosing the crossing
## Documents
Checklist with "verify with" for each.
## Vehicle paperwork
Checklist. Omit for bus and foot.
## Money
## At the border step by step
Numbered.
## Scams and pressure
Table: What happens | What to do.
## Timing
## Verify before you go
Numbered list of questions and the official source for each.
</output_format>
