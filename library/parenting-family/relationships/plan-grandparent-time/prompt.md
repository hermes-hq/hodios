---
schema: 1
id: plan-grandparent-time
kind: prompt
title: Plan grandparent time
description: Plans meaningful time between grandparents and grandchildren nearby or far away, with activities by age, video-call ideas, traditions and gentle ways to agree house rules.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [grandparents, grandchildren, long-distance-family, video-calls, intergenerational, family-traditions]
pairs_with:
  prompts: [plan-long-distance-connection, create-family-tradition, plan-family-reunion]
args:
  - name: grandchildren_ages
    description: The grandchildren's ages, for example "2, 6 and 11".
    type: string
    required: true
  - name: distance
    description: How far the grandparents live. nearby means regular in-person time is possible; far means visits a few times a year; abroad means mostly calls and occasional long visits.
    type: enum
    enum: [nearby, far, abroad]
    default: far
  - name: grandparent_energy
    description: How much physical energy and mobility the grandparents have for active play and outings.
    type: enum
    enum: [high, medium, low]
    default: medium
  - name: details
    description: Interests, skills and constraints on both sides, for example "grandad loves fishing and woodwork, grandma speaks only Polish, not confident with tech; kids love football and drawing; we're strict about sweets". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Ideas by age, Calls that work, Visits, Traditions to start, House rules without friction, A simple rhythm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families build close bonds between grandparents and grandchildren. Closeness comes from regular, predictable contact and from doing things together, not from long, interview-style calls ("How was school?" "Fine."). Grandparents bring time, stories, skills and a different pace; children bring energy and the present. The parents in the middle often worry about differing rules, so a short, friendly agreement on the few things that matter keeps visits relaxed.

Grandchildren's ages: {{grandchildren_ages}}
Distance: {{distance}}
Grandparent energy: {{grandparent_energy}}
{{#details}}
<details>
{{details}}
</details>
{{/details}}
</context>

<task>
1. Ideas by age: for each grandchild's age, four activities that suit the grandparents' energy level and interests, mixing in-person and remote, and including at least one where the grandparent teaches a skill or tells a family story and one where the child teaches the grandparent something.
2. Calls that work: for {{distance}}, call formats that are activities rather than interviews: reading the same book together, show-and-tell, cooking or baking the same recipe on screen, drawing together, simple games played over video, a puppet or toy who joins the call, and a recurring slot. Include a short tech setup for a grandparent who is not confident (one device, one app, a printed step card), and options without video such as post, voice messages and a shared journal.
3. Visits: how to plan visits that fit the distance and energy level, with a balance of special outings and ordinary days, rest time for grandparents, and one-to-one time with each grandchild.
4. Traditions to start: three small traditions that work across the distance (an annual photo in the same spot, a birthday letter, a grandparent-and-grandchild day, learning family recipes or the family language).
5. House rules without friction: a short list of the few non-negotiables the parents should share (car seats, safe sleep for babies, allergies, medicines kept out of reach, online safety) and the many things to let go ("grandparents' house, grandparents' treats" within limits), with a friendly script for the parents to raise it and a script for grandparents to ask what matters.
6. A simple rhythm: a weekly or monthly plan of contact that both sides can keep.
</task>

<constraints>
- Fit everything to the energy level; for low energy, choose seated, short and calm activities, and never make grandparents feel judged for limits.
- Honour language and cultural differences in the details; if a grandparent speaks a different language, use it as a gift (songs, words, recipes) rather than a barrier.
- Keep safety points current and brief; for babies, note that safe sleep advice has changed over the years.
- If there are no details, give broadly appealing ideas and ask two questions to personalise.
- Before answering, check that every grandchild's age has its own ideas.
</constraints>

<output_format>
## Ideas by age
Table: Age | Activity | In person or remote | Energy needed.
## Calls that work
## Visits
## Traditions to start
## House rules without friction
Non-negotiables, then let-go list, then two scripts.
## A simple rhythm
</output_format>
