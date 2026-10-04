---
schema: 1
id: plan-travel-for-older-adults
kind: prompt
title: Plan travel for older adults
description: Plans a trip for older travellers with a gentler pace, easier transport and rooms, insurance points, medicine and rest planning, and simple ways to keep family informed.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [older-travellers, senior-travel, slow-travel, travel-insurance, family-travel]
pairs_with:
  prompts: [plan-accessible-trip, choose-travel-insurance, travel-with-medication, plan-itinerary, teach-older-relative-smartphone]
  personas: [travel-planner]
args:
  - name: travellers
    description: Ages, how far each can comfortably walk and for how long, stairs, heat or cold tolerance, sleep habits, any health conditions or medicines that affect planning, and who is travelling with them.
    type: text
    required: true
  - name: destination
    description: Where they want to go, or "help us choose" with a region.
    type: string
    required: true
  - name: days
    description: Length of the trip in days.
    type: number
    required: true
  - name: interests
    description: What they enjoy, for example gardens, music, history, food, grandchildren's activities. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Trip shape, Day by day, Getting there, Where to stay, Health and insurance prep, Staying in touch, If plans change]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Older travellers rarely need a different destination; they need a different shape of day. Trips go wrong through early starts after long flights, tight connections, hotels up a hill or without a lift, cobbles and stairs in old towns and metro stations, too many activities per day, heat, and medicines packed in the wrong bag. Insurance gets harder with age and pre-existing conditions. Families worry when they cannot reach anyone. You plan a trip that keeps energy for the good parts. Disability-specific access needs, such as wheelchair routes or sensory access, belong to an accessibility-focused plan; mention it if the details call for one.

Travellers: {{travellers}}
Destination: {{destination}}
Days: {{days}}
{{#interests}}Interests: {{interests}}{{/interests}}
</context>

<task>
1. If walking ability, stairs or health details that change the plan are missing, ask for them in a short "Need from you" list and plan with sensible assumptions marked [ASSUMED].
2. Trip shape: how many bases (fewer moves is gentler), a realistic daily rhythm (one main activity per half day, a rest block after lunch, evenings light), arrival and departure days kept empty, and the best season for comfortable temperatures.
3. Day by day for {{days}} days: morning, afternoon and evening, each with an energy level (low, medium, high), walking estimate, seating or rest options, and an easy swap for a tired day. Fit the interests.
4. Getting there: direct flights or trains where possible, daytime travel, longer connections, airport and station assistance requested in advance (often free; check with the carrier), luggage that is easy to manage or sent ahead, and seat choices for legroom and aisle access.
5. Where to stay: a checklist (lift, ground-floor or low-floor room, walk-in shower and grab rails, step-free entrance, distance to a taxi rank or public transport, quiet room, bed height), and questions to email the property before booking.
6. Health and insurance prep: a pre-trip check with their doctor (fitness to fly, vaccinations, long-flight circulation advice), medicines in carry-on with a list of generic names and extra days' supply, insurance that covers their age and declared conditions with medical evacuation (read exclusions), and heat or cold precautions.
7. Staying in touch: a shared itinerary, an agreed daily check-in time, an emergency contact card in the wallet and on the phone's lock screen, phone set up for roaming or a local plan, and a simple plan if a phone is lost.
8. If plans change: what to do if someone feels unwell, a missed connection, or a day that is too much.
9. Before writing, check that no day exceeds the walking ability described.
</task>

<constraints>
- Do not give medical advice; health questions go to their doctor or pharmacist.
- Never assume frailty from age alone; plan to the abilities described.
- Prices, assistance services and senior discounts vary; mark them "check with the provider".
- Warm, respectful tone; write for the travellers themselves or for a family member planning with them.
</constraints>

<output_format>
Only if decisive facts are missing, start with "Need from you".

## Trip shape
Four or five lines.

## Day by day
Table: Day | Morning | Afternoon | Evening | Energy | Walking | Easy swap.

## Getting there
## Where to stay
Checklist, then questions to send the property.
## Health and insurance prep
Checklist.
## Staying in touch
## If plans change
</output_format>
