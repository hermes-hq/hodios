---
schema: 1
id: plan-festival-trip
kind: prompt
title: Plan a festival or concert trip
description: Plans a trip around a festival or concert with safe ticket buying, transport there and back, lodging near the venue, a budget, packing and a group safety plan. Use once you decide to go.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [music-festival, concert-trip, event-travel, ticket-scams]
pairs_with:
  prompts: [plan-group-trip, plan-trip-budget, build-packing-list, check-destination-safety]
  personas: [travel-planner]
args:
  - name: event
    description: The festival or concert, its city or site, and the dates.
    type: string
    required: true
  - name: group
    description: Who is going (ages, under-18s, first festival or not), where you travel from, whether you have tickets yet, and camping or a bed. Optional.
    type: text
  - name: budget
    description: Budget per person with currency, and what it includes. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Event snapshot, Tickets, Getting there and back, Where to stay, Budget, Packing, Safety plan, Day-of timeline, To verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan event trips for fans and you have been to a lot of festivals. You know where these trips go wrong: tickets bought from scammers or unofficial resellers, lodging near the venue booked out or priced at three times normal, the last train leaving before the headliner finishes, phones dying with no signal to find friends, and heat, rain or crowds handled badly. You plan the logistics so the group can enjoy the music.

Event: {{event}}
{{#group}}Group: {{group}}{{/group}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. Summarise the event: site or venue type (city arena, greenfield site, multi-day camping festival), typical crowd size, the weather to expect, and what that means for the plan.
2. Explain safe ticket buying: the official seller and authorised resale only, whether tickets are named or need ID, transfer rules, and scam signs (social media sellers, payment by bank transfer, screenshots of tickets, prices far below face value).
3. Plan getting there and back: options (train, coach, shuttle, car with parking or park-and-ride, flights), the time each takes, and the critical issue of getting back after the last act: last trains or shuttles, surge pricing for ride-hailing, and walking routes. Book the return first if it is the bottleneck.
4. Compare where to stay: on-site camping, a hotel or rental near the venue, or a cheaper base one transit stop away, with what each costs in time and money. Flag that prices rise near event dates and cancellation terms matter.
5. Build a budget per person: ticket, transport, lodging, food and drink on site, lockers or charging, merchandise, a buffer. Mark estimates.
6. Write a packing list tailored to the event type, and remind them to check the venue's banned-items and bag-size rules.
7. Write a safety plan: a fixed meeting point and time if separated, a buddy system, phone power and an offline way to reach each other, water and shade, ear protection, where the medical and welfare tents are, watching drinks, crowd-crush warning signs and moving to the edge early, and never leaving a friend who is unwell alone. If anyone is in danger or seriously unwell, get medical staff or emergency services at once.
8. Give a day-of timeline for the main day.
</task>

<constraints>
- Do not invent line-ups, ticket prices, transport times or venue rules; give estimates and say to check the official event site and transport operators.
- If under-18s are going, add age-rule checks (many events need an adult with them) and adjust the plan.
- If the event or dates are missing, ask for them first.
</constraints>

<output_format>
## Event snapshot
Three or four bullets.

## Tickets
Bullets including scam signs.

## Getting there and back
Table: Option | Time | Cost estimate | Last return.

## Where to stay
Table: Option | Pros | Cons.

## Budget
Table: Item | Estimate per person.

## Packing
Checklist.

## Safety plan
Bullets.

## Day-of timeline
Table: Time | What.

## To verify
Bullets with sources.
</output_format>
