---
schema: 1
id: plan-wildlife-watching-trip
kind: prompt
title: Plan a wildlife watching trip
description: Plans an ethical wildlife trip such as a safari, whale watching or birding holiday, with timing by season, operator vetting, welfare red flags, gear and photography etiquette.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [wildlife, safari, whale-watching, birding, responsible-travel, animal-welfare]
pairs_with:
  prompts: [plan-adventure-trip, plan-national-park-visit, choose-ethical-volunteer-trip, choose-travel-insurance]
  personas: [travel-planner]
args:
  - name: wildlife
    description: What you want to see, for example "gorillas", "humpback whales", "big cats", "puffins and seabirds", "the wildebeest migration".
    type: string
    required: true
  - name: region
    description: Region or country if you have one in mind. Leave empty to get suggestions.
    type: string
  - name: days
    description: Days available on the ground.
    type: number
    required: true
  - name: budget
    description: Total budget per person with currency, and what it should cover.
    type: string
    required: true
  - name: photography
    description: Whether photography is a main goal, which adds lens, light and etiquette advice.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Where and when, Trip outline, Choosing an operator, Welfare red flags, Gear, Photography, Realistic expectations]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Wildlife trips succeed on timing and the operator. Animals follow seasons (migrations, breeding, wet and dry seasons, whale calving), and the same place can be superb one month and empty the next. Operators range from guides who keep distance, limit vehicles at a sighting and fund conservation, to outfits that chase, bait, crowd or handle animals for photos. Activities that involve touching, riding, feeding, walking with or posing with wild animals, or cub petting, are welfare red flags whatever the marketing says, and so are "sanctuaries" that breed or allow contact. You plan a trip with the best chance of good sightings that also does no harm.

Wildlife: {{wildlife}}
{{#region}}Region: {{region}}{{/region}}
Days: {{days}}
Budget: {{budget}}
Photography focus: {{photography}}
</context>

<task>
1. Where and when: if no region is given, suggest two or three regions known for {{wildlife}}, with the best months for each, the trade-offs (crowds, price, weather, accessibility) and how {{budget}} fits. If a region is given, give the best months there and what changes across the year. Mark seasonal patterns as typical; animals do not follow calendars.
2. Trip outline for {{days}} days: arrival and rest, number of locations, number of outings (dawn and dusk matter for many species), travel between parks or sites, and a spare half-day for weather.
3. Choosing an operator: questions that reveal practice (guide training and local employment, group and vehicle size, distance and approach rules they follow, time limits at sightings, how they handle crowding, permits, conservation and community contributions), and what good answers sound like.
4. Welfare red flags: a list specific to {{wildlife}} plus the general ones, and the regulations or codes of conduct that commonly apply (for example approach distances for marine mammals), to verify locally.
5. Gear: binoculars, clothing in muted colours, layers for cold dawn drives, sun and rain protection, seasickness options for boats (discuss medicines with a pharmacist), a field guide or identification app, and what to leave behind.
6. Photography, only if {{photography}} is true: focal lengths that suit the species, light at dawn and dusk, beanbag or monopod in vehicles, no flash on nocturnal animals, no drones without permits, not asking guides to break distance rules, and sharing sightings fairly with other vehicles. If false, give two lines on etiquette only.
7. Realistic expectations: sightings are not guaranteed; how to make the most of quiet days.
8. Before writing, check that nothing in the plan involves contact with, baiting of or chasing wildlife.
</task>

<constraints>
- Never recommend activities that involve touching, riding, feeding or posing with wild animals, or facilities that breed or sell animals for tourism.
- Mark permits, park fees, seasons and operator claims as "verify"; gorilla and similar permits can be limited and sell out.
- Health topics such as malaria prevention or vaccinations go to a travel clinic; mention them only as a step.
- Do not invent operators, park names or regulations.
</constraints>

<output_format>
## Where and when
Table if several regions: Region | Best months | Why | Trade-offs | Fit with budget.

## Trip outline
Table: Day | Where | Activity | Notes.

## Choosing an operator
Questions with what a good answer sounds like.

## Welfare red flags
Bullets.

## Gear
Checklist.

## Photography
Bullets.

## Realistic expectations
Two or three lines.
</output_format>
