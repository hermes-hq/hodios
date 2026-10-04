---
schema: 1
id: plan-farm-open-day
kind: prompt
title: Plan a farm open day
description: Plans an open farm day or school visit with route and zones, handwashing and animal-contact hygiene, parking, activities, staff roles, signage and a wet-weather plan.
category: farming
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual, teacher, operations-manager]
subject: [agriculture, education-sector]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [open-farm-day, school-visits, animal-contact-hygiene, visitor-safety, farm-education]
pairs_with:
  prompts: [write-farm-safety-induction, plan-pick-your-own-opening, plan-farm-volunteer-days]
  workflows: [community-event-planning-track]
args:
  - name: farm
    description: The farm and site - animals and crops visitors could see, buildings, yards and machinery, water, toilets and wash points, parking, staff and helpers, and what you want visitors to learn or take away.
    type: text
    required: true
  - name: visitor_type
    description: Who is coming - the public, school groups, or both on different days.
    type: enum
    enum: [public, schools, both]
    required: true
  - name: expected_visitors
    description: Optional. Number of visitors expected, or number of pupils and adults per school group.
    type: number
output_contract:
  format: markdown
  sections: [Plan at a glance, Route and zones, Hygiene, Activities, Staff roles, Parking and arrival, Signage, Wet-weather plan, Checklist and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a farm plan an open day or school visit that is memorable and safe. The serious risks are well known: infections such as E. coli O157 and cryptosporidium picked up from animals, their pens and droppings, which can make young children very ill; children wandering into machinery yards, slurry stores or water; vehicles moving where people walk; and animals that are not suited to contact. Hand gels alone are not enough after touching animals; washing with soap and running water is. Pregnant visitors should avoid lambing ewes and newborn lambs. Good visits are planned as a route with zones (contact, look-only, no-go, eating), staffed at the points where things go wrong, and have a wet-weather version.

Visitor type: {{visitor_type}}
{{#expected_visitors}}Expected visitors: {{expected_visitors}}{{/expected_visitors}}
</context>

<task>
<farm>
{{farm}}
</farm>

1. Plan at a glance: date options, timings, capacity, the three things visitors should remember.
2. Route and zones: a one-way route from arrival to exit; zones marked contact, look-only, no-go (yards with machinery, slurry and grain stores, chemical store, ponds and reservoirs, bulls and cows with calves) and eating; where barriers are needed.
3. Hygiene: wash stations with soap, running water and paper towels at every exit from animal areas and before the eating area, enough for the busiest moment (one tap per 10 people at peak as a planning rule to adjust); no eating, drinking or dummies in animal areas; clean, signed eating area; advice for pregnant visitors and people with weakened immunity; footwear cleaning; what to do if a child becomes ill after the visit.
4. Activities: matched to the visitor type. For schools, link to the curriculum topics the teacher names, with group rotations, timing per station and a simple worksheet idea; for the public, short talks or demonstrations, tractor display with engines off and keys out, a trail for children.
5. Staff roles: who runs each zone, car park, wash points, first aid, lost child point, with supervision ratios for schools agreed with the school (the school stays responsible for its pupils).
6. Parking and arrival: separate cars from pedestrians, drop-off for coaches, accessible parking, what to do if it is full.
7. Signage: wording for each zone and wash point, in words and pictures.
8. Wet-weather plan: what moves under cover, what is cancelled, a decision time, how visitors are told.
9. Checklist for the week before and on the day, and the items to confirm.
</task>

<constraints>
- Use only the farm details given; mark missing facilities or people `[CONFIRM]`.
- Insurance, food sales, licences, visitor and child safety duties vary by country; list them as `[CHECK locally]`, and say a written risk assessment should be done before the day.
- Never plan animal contact with sick animals, animals under treatment, or animals not used to handling.
- If the farm description is missing, ask and stop.
</constraints>

<output_format>
## Plan at a glance
Bullets.

## Route and zones
Numbered route; table: zone | type (contact / look-only / no-go / eating) | controls.

## Hygiene
Checklist plus wash station count and locations.

## Activities
Table: activity | zone | duration | staff | age suitability.

## Staff roles
Table: role | person [CONFIRM] | where | when.

## Parking and arrival
Bullets.

## Signage
Table: sign | where | wording.

## Wet-weather plan
Bullets with decision time.

## Checklist and questions
Week-before and on-the-day checklists, then every `[CONFIRM]` and `[CHECK locally]` item.
</output_format>
