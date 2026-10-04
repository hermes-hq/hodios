---
schema: 1
id: prepare-for-sports-tryout
kind: prompt
title: Prepare for a sports tryout
description: Prepares a teen or adult for a team tryout with what coaches look for, a skill and fitness plan for the weeks left, a tryout-day routine and how to handle not making the team.
category: sports
version: 1.0.0
status: incubating
stage: [plan]
role: [student, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [tryout, team-selection, sports-trial, coachability, rejection-resilience]
pairs_with:
  prompts: [plan-youth-athlete-training, design-warm-up, plan-sports-nutrition]
args:
  - name: sport
    description: The sport and the team or level, for example "high school basketball JV", "club rugby first team", "university volleyball", "county cricket U15 trial".
    type: string
    required: true
  - name: weeks_until_tryout
    description: Weeks left before the tryout.
    type: number
    default: 4
  - name: position
    description: The position you are trying out for, or "any".
    type: string
    default: any
  - name: background
    description: Optional - age, experience, current training, strengths and weaknesses, what you know about the tryout format, and any injury.
    type: text
output_contract:
  format: markdown
  sections: [What selectors look for, Your plan for the weeks left, The days before, Tryout day, If you make it, If you don't]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help players get ready for a team tryout or trial. Selectors at tryouts see each player for a short time, so they judge a few visible things: fundamentals under pressure, effort and attitude between drills, communication, how quickly players take on coaching, and fitness late in the session. In a few weeks a player cannot transform their skill level, but they can sharpen the fundamentals that will be tested, arrive fresh, show what selectors value, and handle the outcome well either way.

Sport and level: {{sport}}
Weeks until tryout: {{weeks_until_tryout}}
Position: {{position}}
{{#background}}Background: {{background}}{{/background}}
</context>

<task>
1. If the sport or level is unclear, ask and stop. If the background mentions a current injury or pain, tell the player to get it assessed before adding training load, and plan around it.
2. What selectors look for: the skills and qualities usually assessed at this level and position, the typical tryout format (drills, small-sided games, fitness tests), and the visible behaviours that stand out (first to the drill, talking on the field, applying feedback straight away, encouraging others).
3. Your plan for the weeks left: a weekly plan for {{weeks_until_tryout}} weeks that sharpens the fundamentals likely to be tested, includes game-speed practice, keeps fitness work sport-specific and moderate, and has rest days. Reduce volume in the final week so the player arrives fresh. If fewer than two weeks remain, focus on sharpness and rest, not new fitness.
4. The days before: sleep, food and water habits in general terms, kit checklist, knowing the venue and time, and a short mental routine (picturing good reps, a cue word, a plan for mistakes).
5. Tryout day: arrival, warm-up, how to introduce yourself to coaches, how to recover from a mistake in front of selectors, and what to do during breaks.
6. If you make it: the first weeks on the team and how to keep earning minutes.
7. If you don't: how to ask the coach for specific feedback politely, how to process the disappointment, other routes to keep playing (second team, another club, a later trial), and a plan to try again. For a parent reading this, add two lines on how to support without adding pressure.
8. Before answering, check that the plan has exactly {{weeks_until_tryout}} weeks, tapers at the end and includes rest days.
</task>

<constraints>
- Age-appropriate load: for players under 18, no maximal lifting or extreme conditioning; point to a youth training plan for strength work.
- General nutrition and sleep habits only; no supplements, weight-cutting or diets.
- Honest and encouraging: do not promise selection.
- Not a conditioning programme; keep fitness work brief and sport-specific.
</constraints>

<output_format>
## What selectors look for
## Your plan for the weeks left
Table: Week | Focus | Sessions | Rest.
## The days before
Checklist.
## Tryout day
## If you make it
## If you don't
</output_format>
