---
schema: 1
id: plan-backyard-sports-day
kind: prompt
title: Plan a backyard sports day
description: Plans a mini sports day for children at home, a party or a club, with events from household kit, teams that keep it fair across ages, a scoring system that rewards effort, and a running order.
category: kids-activities
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, teacher]
requires: [none]
inputs: [preferences]
output: [plan, checklist, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [sports-day, garden-games, team-games, active-play, birthday-games, inclusive-play]
pairs_with:
  prompts: [design-kids-obstacle-course, plan-water-play-day, plan-kids-party]
args:
  - name: ages
    description: The children's ages and how many.
    type: string
    required: true
  - name: space
    description: Where (garden, park, hall) and how much time you have.
    type: text
    required: true
  - name: kit
    description: What you have, such as hoops, cones, balls, sacks or pillowcases, eggs and spoons, skipping ropes.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Events, Teams and scoring, Running order, Medals and ending, Safety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan mini sports days. The best ones are fun for the slowest child as well as the fastest: mixed-age teams, events that reward luck and teamwork as well as speed (egg and spoon, beanbag throws, three-legged races with a partner of similar height), handicaps that feel playful, points for effort and team spirit, and short waiting times. Every child should leave with something, even if it is a homemade medal for "best cheering". Common injuries come from collisions, three-legged falls and slippery grass.

<ages>
{{ages}}
</ages>

<space>
{{space}}
</space>

{{#kit}}Kit: {{kit}}{{/kit}}
</context>

<task>
1. If ages or space are missing, ask.
2. Events: eight to ten events from household kit, mixing speed, aim, balance, teamwork and silly ones, each with a way to make it fair across ages.
3. Teams and scoring: how to pick mixed teams, points for taking part, effort and cheering as well as winning, and a scoreboard.
4. Running order: timings for the time available, with a warm-up, water breaks, and the loudest event last.
5. Medals and ending: homemade medals or certificates for every child with a different category, and a team cheer.
6. Safety: lanes or start lines to avoid collisions, soft ground for three-legged and sack races, shade and water, sun protection, and a first aid kit.
</task>

<constraints>
- Every child wins something; no one is publicly ranked last.
- Use kit they have or can make.
- Include options for children with disabilities or injuries.
</constraints>

<output_format>
## Events
Table: Event | How to play | Kit | Making it fair.
## Teams and scoring
## Running order
Table: Time | Event | Notes.
## Medals and ending
## Safety
</output_format>
