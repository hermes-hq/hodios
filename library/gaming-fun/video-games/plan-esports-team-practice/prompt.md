---
schema: 1
id: plan-esports-team-practice
kind: prompt
title: Plan esports team practice
description: Plans weekly practice for an amateur or school esports team with scrims, replay review, role drills, communication habits, rest and a match-day routine.
category: video-games
version: 1.0.0
status: incubating
stage: [plan]
role: [gamer, student, teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [esports, team-practice, scrims, vod-review, school-esports]
pairs_with:
  prompts: [review-gameplay-replay, plan-game-strategy]
args:
  - name: game
    description: The game the team plays, for example "Rocket League", "League of Legends", "Valorant" or "Overwatch 2".
    type: string
    required: true
  - name: players
    description: Number of players on the roster, including substitutes.
    type: number
    default: 5
  - name: hours_per_week
    description: Total team practice hours per week, not counting official matches.
    type: number
    default: 8
  - name: level
    description: school = a school or college club, often with a teacher or coach; amateur = an adult community team; semi-pro = a team competing in organised leagues for prizes.
    type: enum
    enum: [school, amateur, semi-pro]
    default: amateur
output_contract:
  format: markdown
  sections: [Weekly shape, Session template, Replay review method, Role drills, Comms habits, Rest and health, Match-day routine, How you'll know it's working]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach amateur and school esports teams. Teams that only play scrims plateau, because nobody stops to look at why rounds were lost. Teams improve when each session has one objective, when scrims are reviewed while they are fresh, when individual role skills get dedicated time, and when communication is a practised habit rather than a shouting match. Players are also young or busy, so rest, screen breaks and sleep before match day are part of the plan, not an afterthought.

Game: {{game}}
Players: {{players}}
Hours per week: {{hours_per_week}}
Level: {{level}}
</context>

<task>
1. If the team size for the game is unclear from {{game}}, state the starting lineup size you assume. If {{players}} is more than the lineup, plan rotation for substitutes so everyone gets scrim time.
2. Check the load. For school level, keep practice to a sensible after-school load and flag anything over about 6 hours a week for discussion with parents and the school. For any level, flag more than about 3 hours in one sitting. If {{hours_per_week}} exceeds these, say so and plan within a healthier total first, with the full total as an option.
3. Split the week across scrims, replay review, individual and role drills, and strategy (set plays, map or draft prep). Shift the balance by level: more fundamentals and drills for school, more scrims and opponent prep for semi-pro.
4. Write a session template: warm-up, a focus block with one objective, a scrim judged against that objective, and a short review.
5. Describe a replay review method: who picks the clips, how long, how to talk about mistakes without blame, and how each review ends with one action per player.
6. Give two drills per role, each with a measurable target.
7. Set communication habits: short callouts with information not emotion, one shot-caller per phase, a reset phrase after a lost round, and a rule that criticism waits for review.
8. Cover rest and health: breaks every 45 to 60 minutes, eye breaks, hand and wrist stretches, water, and sleep before match days.
9. Write a match-day routine from two hours before to the post-match debrief.
10. Before answering, add up the weekly minutes and confirm they do not exceed {{hours_per_week}} hours (or the healthier total you proposed).
</task>

<constraints>
- Mark advice about the current meta, agents, heroes or maps as "patch-dependent".
- For school teams, keep content and behaviour expectations suitable for students, mention the game's age rating should match the players, and leave the safeguarding policy to the school.
- Keep feedback language about decisions, never about a player's worth.
- No energy-drink or caffeine-loading advice.
</constraints>

<output_format>
## Weekly shape
Table: Day | Block | Minutes | Focus | Who. End with the total minutes.
## Session template
## Replay review method
## Role drills
Table: Role | Drill | Target.
## Comms habits
## Rest and health
## Match-day routine
Table: Time | What.
## How you'll know it's working
Two or three measures to track weekly.
</output_format>
