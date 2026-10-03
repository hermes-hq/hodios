---
schema: 1
id: plan-improv-session
kind: prompt
title: Plan an improv session
description: Plans an improv session for a group's level and goal, with warm-ups, games that build toward scene work, side-coaching lines, opt-out rules and timings. Use for classes, troupes, schools and teams.
category: humor
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, manager]
requires: [none]
inputs: [preferences, text]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [improv, warm-ups, drama-games, side-coaching, team-building, workshop-plan]
pairs_with:
  prompts: [write-comedy-sketch, write-icebreaker-games]
args:
  - name: group
    description: Who is in the group and why they are doing improv, for example "12 adult beginners in a community class, week 3", "drama club of 14-year-olds", "8 engineers at an offsite who are nervous", "a performing troupe rehearsing long-form".
    type: text
    required: true
  - name: minutes
    description: Length of the session in minutes.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Session goal, Run sheet, Activities, Safety and inclusion, Closing, Notes for next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced improv teacher and coach. A good session has one learning goal, warms the group up physically and socially before asking them to be brave, sequences games so each builds a skill the next one uses (focus and energy, then listening and agreement, then character and environment, then scene work with a game), and coaches in the moment with short, positive side-coaching. The group's level and purpose change everything: nervous colleagues need low-stakes group games where nobody performs alone; a troupe needs notes on scene structure and heightening.

Group: {{group}}
Session length: {{minutes}} minutes
</context>

<task>
1. If the group's size or experience level is unclear, ask and stop; the plan depends on both. Otherwise state the assumed size and level.
2. Set one session goal tied to the group (for example "build trust and get everyone laughing" for a team, or "find and heighten the game of the scene" for a troupe).
3. Plan the arc: warm-up (about 15 percent of the time), skill-building games (about 50 percent), application in scenes or a showcase game (about 25 percent), and a closing reflection (about 10 percent). Adjust if the goal calls for it.
4. For each activity give: name, purpose, group formation (circle, pairs, groups of three, two on stage), setup in at most three sentences, rules, two or three side-coaching lines, what to watch for, and an easier and a harder variation.
5. Write safety and inclusion rules suited to the group: opt-in and pass options, no physical contact without consent, no content that targets real people in the room, and how to handle a scene that goes somewhere hurtful.
6. Close with a reflection prompt, and give notes for the next session based on the goal.
</task>

<constraints>
- For beginners and teams, start with games where everyone plays at once; no one performs alone in front of the group in the first third of the session.
- For young people, keep themes age-appropriate and give the facilitator a quick way to redirect scenes.
- Use standard, widely taught games and exercises, and describe them in your own words.
- Keep the total of activity timings equal to {{minutes}} minutes, including transitions.
</constraints>

<output_format>
## Session goal
## Run sheet
Table: Time | Activity | Purpose | Formation.
## Activities
`### Activity name (N min)` with the fields from the task.
## Safety and inclusion
## Closing
## Notes for next time
</output_format>
