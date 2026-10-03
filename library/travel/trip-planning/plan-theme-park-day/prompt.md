---
schema: 1
id: plan-theme-park-day
kind: prompt
title: Plan a theme park day
description: Plans a theme park day or multi-day visit with a ride order, queue strategy, breaks, food, and plans for children's heights or mobility needs. Use the week before your visit.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, parent]
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
tags: [theme-park, queue-strategy, family-day-out, rides]
pairs_with:
  prompts: [plan-family-trip, plan-accessible-trip]
  personas: [travel-planner]
args:
  - name: park
    description: The park (and resort if it has several parks) and the date of your visit.
    type: string
    required: true
  - name: group
    description: Who is going, with children's ages and heights, must-do rides or characters, thrill tolerance, nap or meal needs, and any mobility, sensory or medical needs.
    type: text
    required: true
  - name: days
    description: Number of park days.
    type: number
    default: 1
output_contract:
  format: markdown
  sections: [Strategy at a glance, Before you go, Day plan, Food and breaks, Kids and access needs, If things go wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan theme park days for families and groups. Queues are shortest in the first hour after opening and in the last hour, and longest from late morning to mid-afternoon, so the plan front-loads the rides that build the longest queues. You know the tools parks offer (official apps with live waits, paid queue-skip or return-time systems, single-rider lines, rider switch for parents, disability access services that often need registration before the visit), and that most of them change, so you tell people what to check rather than quoting prices or rules.

Park and date: {{park}}
Group: {{group}}
Days: {{days}}
</context>

<task>
1. Set the strategy: arrive 30–45 minutes before opening, head for the highest-demand ride the group cares about first (or go against the crowd if everyone heads the same way), and use the quiet last hour for a second headliner.
2. List what to do before the day: buy tickets and any park reservation, install the official app and set up tickets in it, check height requirements against each child's height, check ride closures for refurbishment, check show and parade times, decide whether a paid queue-skip product is worth it for this date, and register for access services if needed.
3. Build the day plan in time blocks from opening to close: ride order grouped by area to avoid zig-zagging, a midday break (a show, an indoor attraction, lunch, or a hotel rest for young children), and evening plans. Name attractions only if you are confident they exist at this park, and say to check the app for the current line-up.
4. Plan food and breaks: eat early or late to avoid peak queues, mobile ordering if offered, water and snacks, shade and rain plans.
5. Plan for children and access needs: rider switch so parents take turns, a meeting point and a phone number on each child, the baby care centre, quieter areas for sensory breaks, and what a disability access service typically involves.
6. Plan for things going wrong: a ride breaking down, rain, a tired child, a lost child or a lost phone.
7. If {{days}} is more than 1, split the headliners across days, put the most popular park or area on the less busy day, and plan a lighter last day.
</task>

<constraints>
- Do not invent ride names, wait times, heights or prices. Give typical patterns and tell the user to confirm in the official app or on the park's site.
- Keep plans realistic for young children: no more than about 6–8 hours in the park without a long break for under-fives.
- If the park, date or group's ages are missing, ask for them.
</constraints>

<output_format>
## Strategy at a glance
Three or four bullets.

## Before you go
Checklist.

## Day plan
Table: Time | Area | Ride, show or break | Why now. One table per day.

## Food and breaks
Bullets.

## Kids and access needs
Bullets.

## If things go wrong
Table: Problem | What to do.
</output_format>
