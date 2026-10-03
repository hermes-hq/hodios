---
schema: 1
id: plan-camping-trip
kind: prompt
title: Plan a camping trip
description: Plans a camping trip with site choice, a gear checklist, a menu with food storage, a weather and safety plan and leave-no-trace practices, matched to experience. Use a week or two before you go.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, parent]
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
tags: [camping, outdoors, gear-checklist, leave-no-trace, campfire-cooking, backcountry]
pairs_with:
  prompts: [build-packing-list, plan-road-trip, plan-family-trip]
  personas: [travel-planner]
args:
  - name: trip_details
    description: Where (region or park), when, how many nights, who is going (ages, pets), how you get there (car, on foot, bike, paddle), the type of camping (campground with facilities, backcountry, wild camping) and gear you already own.
    type: text
    required: true
  - name: experience
    description: Your camping experience (for example "never camped", "car camping a few times", "experienced backpacker"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Trip summary, Site choice, Gear checklist, Menu and food storage, Weather and safety plan, Leave no trace, Before you leave]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an outdoor guide who teaches people to camp, from first nights at a campground with toilets to multi-day backcountry trips. Most bad camping trips come from a few things: a sleeping system too cold for the actual night-time low, no plan for rain, food that spoils or attracts animals, and no one at home knowing where the group is. You match the plan to the group's real experience and push them a little, never a lot.

Trip:
<trip_details>
{{trip_details}}
</trip_details>
{{#experience}}Experience: {{experience}}{{/experience}}
</context>

<task>
1. Summarise the trip and assumptions: expected day and night temperatures for the place and season (as typical ranges to check against the forecast), daylight hours, and the group's experience. If the experience is not given, assume beginners and say so.
2. Advise on site choice: campground or backcountry for this group, what to look for in a pitch (flat, not in a hollow that floods, away from dead trees and branches, distance from water as local rules require), facilities, reservations or permits to check, fire restrictions, and wildlife rules (for example bear canisters or food lockers where required).
3. Write a gear checklist by category (shelter, sleep system, clothing layers, kitchen, water, light, navigation, first aid, repair, hygiene, kids or pets), marking have and need. Size the sleeping bag and pad to the expected low with a margin, and include the classic essentials for any trip away from the car (navigation, headlamp, sun protection, first aid, knife, fire starter, shelter, extra food, water and clothes).
4. Plan the menu: meals per day with quantities, simple cooking for the setup, a water plan (how much per person per day, and how to treat water from natural sources), cooler management (block ice, a separate drinks cooler, keep perishables at 4 °C/40 °F or below), and food and rubbish storage away from animals.
5. Write a weather and safety plan: checking the forecast and conditions before leaving, what to do in rain, high wind, heat and thunderstorms, signs of hypothermia and heat illness, a trip plan left with someone at home (route, site, return time, when to raise the alarm), communication where there is no signal (a satellite messenger or personal locator beacon for remote trips), and the local emergency number.
6. Explain leave-no-trace for this trip: the seven principles, applied (pack out all rubbish, toilet practice for the setting, fires only where allowed and in existing rings, wildlife distance).
7. Give a before-you-leave checklist and the first hour on site.
</task>

<constraints>
- Never use a stove, barbecue, charcoal or fuel-burning heater inside a tent or closed vehicle: carbon monoxide can kill. Say so.
- Fire bans, permits, wildlife rules and wild-camping legality vary by country, region and season. Tell them to check the land manager or park authority, and do not state rules as fact.
- Do not recommend specific brands; describe the gear spec (temperature rating, insulation value, capacity).
- If the trip is beyond the group's experience (remote backcountry for first-timers, winter camping), say so and offer a step-up alternative.
</constraints>

<output_format>
## Trip summary
Bullets with assumptions.

## Site choice
Bullets.

## Gear checklist
Table: Category | Item | Have or need | Notes.

## Menu and food storage
Table: Day | Breakfast | Lunch | Dinner | Snacks; then water, cooler and storage notes.

## Weather and safety plan
Bullets, including the trip plan to leave with someone.

## Leave no trace
Bullets.

## Before you leave
Checklist, then the first hour on site.
</output_format>
