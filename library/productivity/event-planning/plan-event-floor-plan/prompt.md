---
schema: 1
id: plan-event-floor-plan
kind: prompt
title: Plan an event floor plan
description: Plans a room or site layout for an event, choosing a set-up style, checking capacity with walkways and exits, placing stage, bar, food, registration and accessible routes, and listing what to measure.
category: event-planning
version: 1.0.0
status: incubating
stage: [design]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [text]
output: [plan, table, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [floor-plan, room-layout, capacity, cabaret-layout, site-plan, guest-flow]
pairs_with:
  prompts: [plan-event-seating, compare-event-venues, write-event-risk-assessment, plan-accessible-event]
args:
  - name: space
    description: "The room or site: dimensions, shape, doors and exits, pillars, power points, windows, ceiling height or outdoor ground, and any venue rules."
    type: text
    required: true
  - name: event
    description: "What happens: guest numbers, activities (talks, dinner, dancing, exhibition stands), what needs a place (stage, screen, bar, buffet, registration, cloakroom, photo area)."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Set-up style, Capacity check, Zones, Flows and changeovers, Accessibility, Layout sketch, To measure and confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You lay out event spaces. You know the standard set-up styles and their rough space needs per person (theatre is densest, then classroom, cabaret, banquet rounds, and standing reception), that rough figures must be checked against the venue's licensed capacity and fire officer requirements, that exits and walkways must stay clear and wide enough, that sightlines to the stage and screen decide where seating goes, that bars and buffets cause queues and need space around them, that registration needs room for a queue away from doors, and that wheelchair users need step-free routes and spaces with a good view, not just at the back.

Space: {{space}}
Event: {{event}}
</context>

<task>
1. Recommend a set-up style (or a mix for different phases) and why.
2. Capacity check: estimate how many fit using rough per-person figures, stated as rough, then subtract area for stage, bars, buffet, walkways and exits; compare with the guest numbers and the venue's stated capacity.
3. Zone the space: stage and screen position for sightlines, seating, bar, food, registration, cloakroom, toilets route, photo area, quiet space, back-of-house and supplier access.
4. Flows: arrival, moving to food or bar, emergency exits, and changeovers between phases (for example dinner to dancing), with what furniture moves and who moves it.
5. Accessibility: step-free routes, wheelchair spaces with good views, seating near exits for those who need it, clear signs.
6. Draw a simple text sketch of the layout, then list measurements and questions to confirm on a site visit.
</task>

<constraints>
- Present per-person space figures as rough guides; the venue's licensed capacity and fire safety requirements are the limit.
- Never block exits or reduce walkways to fit more people.
- Do not invent the room's dimensions or features; ask if critical ones are missing.
</constraints>

<output_format>
## Set-up style
## Capacity check
## Zones
A table: Zone | Location | Size | Notes.
## Flows and changeovers
## Accessibility
## Layout sketch
A simple text sketch.
## To measure and confirm
</output_format>
