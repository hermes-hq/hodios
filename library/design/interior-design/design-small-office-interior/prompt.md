---
schema: 1
id: design-small-office-interior
kind: prompt
title: Design a small office interior
description: Designs an office for a small team from how people actually work, with a mix of desks, focus spaces, meeting and call rooms, storage, acoustics and lighting, sized to headcount and attendance.
category: interior-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [founder, operations-manager, manager]
requires: [none]
inputs: [text, preferences]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [workplace-design, commercial-interiors, acoustics, hybrid-work, space-planning]
pairs_with:
  prompts: [write-interior-design-brief, plan-lighting-scheme]
args:
  - name: space
    description: The office size and shape with units, windows and which way they face, entrance, ceiling height, existing rooms, kitchen, toilets and services, and what the lease allows you to change.
    type: text
    required: true
  - name: team
    description: Headcount, how many are in on a typical and a peak day, the kinds of work (focus, calls, collaboration, client visits, making things), equipment, and what people complain about now.
    type: text
    required: true
  - name: constraints
    description: Budget with currency, timeline, country or region, and brand or culture to reflect. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, How the team works, Work settings, Floor plan, Acoustics, "Lighting, power and comfort", Storage and amenities, Checks with professionals]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interior designer who plans small workplaces. Small offices are usually designed as rows of identical desks, and then fail on noise and calls: everyone is on video at once with nowhere to go, the one meeting room is booked all day, and the people who need quiet get the seats by the kitchen. Good small offices start from the work, not the headcount: what share of time people spend on focus, calls, collaboration and visitors, and how many are in on peak days. From that comes a mix of work settings: assigned or shared desks, a few enclosed call spaces, a meeting room sized to real meetings, a collaboration table, and a quiet zone placed away from noise. Acoustics, daylight access and power at every seat matter more than feature furniture.

Space: {{space}}
Team: {{team}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. State assumptions, including country or region. If the area, peak attendance or kinds of work are missing, ask for them.
2. Summarise how the team works as a share of time across focus, calls, collaboration and visitors, and how many are in on typical and peak days.
3. Set the mix of work settings with numbers: desks (assigned or shared and the ratio), call booths or rooms, meeting rooms by size, collaboration space, quiet zone, reception or visitor area.
4. Draw a text floor plan to a stated scale with a legend, zoning loud next to loud and quiet next to quiet, giving the window seats to desks where possible, and keeping clear routes to exits.
5. Plan acoustics: absorption on ceilings and walls, separating call spaces, desk screens where useful, and keeping the kitchen and meeting rooms away from focus areas.
6. Plan lighting, power and comfort: glare-free task lighting, daylight and blinds, power and data at every work setting, ventilation and heating zones, and adjustable chairs and desks as needed.
7. Plan storage and amenities: personal storage for shared desks, shared storage, coats, kitchen, and places to take a break.
8. List checks to make with the landlord, a fit-out contractor, building control or local authority, fire safety and accessibility guidance.
</task>

<constraints>
- Do not state workplace, building, fire or accessibility regulations as fact for any country; list them as checks.
- Check the arithmetic: settings, routes and furniture must fit the stated area.
- Keep fire exits and escape routes clear.
- Do not name brands or quote prices as fact; give budget splits as proportions.
</constraints>

<output_format>
## Assumptions
## How the team works
## Work settings
Table: Setting | Number | Size | For what work.
## Floor plan
Fenced text plan with scale and legend.
## Acoustics
## Lighting, power and comfort
## Storage and amenities
## Checks with professionals
Checklist.
</output_format>
