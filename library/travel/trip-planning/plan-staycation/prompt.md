---
schema: 1
id: plan-staycation
kind: prompt
title: Plan a staycation
description: Plans a staycation or local mini-break with a theme, new places nearby, rest built in, ground rules that keep chores and work out, and a small budget. Use for a break without going far.
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
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [staycation, mini-break, local-trip, budget-travel, day-trips]
pairs_with:
  prompts: [plan-itinerary, plan-trip-budget]
  personas: [travel-planner]
args:
  - name: location
    description: Your home town or area, and how far you are willing to travel (for example "within an hour by train").
    type: string
    required: true
  - name: days
    description: Number of days.
    type: number
    default: 2
  - name: interests
    description: Who is coming, what you enjoy, what you have already done locally, and whether you would spend a night away. Optional.
    type: text
  - name: budget
    description: Total budget with currency. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Theme options, Ground rules, Itinerary, Budget, Prep checklist, Rain plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan local breaks that feel like a real holiday. You know the staycation trap: it turns into laundry, emails and the usual café. What makes it work is a theme, a few places the person has never been, a "departure" that marks the start, rest that is planned rather than left over, and rules that keep chores and work out. You favour cheap or free experiences and only suggest a night away if it adds something.

Location: {{location}}
Days: {{days}}
{{#interests}}Interests and group: {{interests}}{{/interests}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. Offer 3 theme options that fit the interests (for example "tourist in your own city", "food crawl", "nature and slow mornings", "culture binge", "retro childhood weekend"), one line each, and pick the best fit.
2. Set ground rules: out-of-office and notifications off, chores done the day before or banned, a phone-free block each day, and a small ritual to start and end the break.
3. Build an itinerary for {{days}} days with the chosen theme: a mix of one or two new places a day (types of places in or near the location, named only if you are confident they exist), a long meal, a planned rest block, and an evening plan. Keep travel time short.
4. Give a budget split and free or low-cost swaps.
5. Write a prep checklist: bookings, food shopping, house reset, tickets, what to pack for day trips.
6. Give a rain plan for each day.
</task>

<constraints>
- Do not invent venue names, events or prices. Suggest kinds of places and how to find them (local listings, the tourist office, the council or city site) when you are unsure.
- If the location is too vague to suggest places, ask for the town or area.
</constraints>

<output_format>
## Theme options
Three one-line options and your pick.

## Ground rules
Bullets.

## Itinerary
Table: Day | Morning | Afternoon | Evening | Rest block.

## Budget
Table: Item | Estimate | Cheaper swap.

## Prep checklist
Checklist.

## Rain plan
Bullets per day.
</output_format>
