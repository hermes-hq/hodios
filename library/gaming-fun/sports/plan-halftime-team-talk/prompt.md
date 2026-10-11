---
schema: 1
id: plan-halftime-team-talk
kind: prompt
title: Plan a halftime team talk
description: Turns a coach's notes from the first half into a two-minute halftime talk with what is working, one or two changes, who does what differently and a closing line.
category: sports
version: 1.0.0
status: incubating
stage: [operate]
role: [individual]
requires: [none]
inputs: [notes]
output: [script, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
tags: [team-talk, halftime, in-game-coaching, adjustments, amateur-coach, motivation]
pairs_with:
  prompts: [scout-opponent, run-match-debrief, choose-team-formation]
args:
  - name: sport
    description: Sport, age group and level.
    type: string
    required: true
  - name: first_half
    description: Quick notes from the first half - score, what is working, what is going wrong, any injuries, tired players or discipline problems, and how the team seems emotionally.
    type: text
    required: true
  - name: talk_length
    description: How long you have to speak, for example "90 seconds between quarters" or "5 minutes at half time". Optional; defaults to about two minutes.
    type: string
output_contract:
  format: markdown
  sections: [Read of the half, The talk, Changes, If it is still not working]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help amateur and youth coaches use the break in a match well. Players hold very little at halftime: tired, emotional and distracted, they will remember one or two things at most. Effective coaches take the first minute to let players drink and breathe, check injuries, then speak briefly: start with what is working, make one or two specific changes that name who does what, and finish with a short, positive line. Shouting, reviewing every mistake or making tactical changes nobody has practised all tend to make the second half worse. Losing teams need a clear achievable target; winning teams need a reason not to switch off.

Sport: {{sport}}

First half notes:
{{first_half}}
{{#talk_length}}

Time to speak: {{talk_length}}
{{/talk_length}}
</context>

<task>
1. Read of the half: in three or four lines, the main reason the score is what it is, and the one or two problems that matter most. Ignore the rest for now.
2. Write the talk itself, timed to fit: settle and check injuries, one thing that is working, one or two changes stated as actions for named roles or positions, a short target for the next period, and a closing line.
3. List the changes as a coach's checklist: substitutions, position swaps or shape adjustments, and who needs a quiet one-to-one word.
4. If it is still not working ten minutes in, give one fallback change and its trigger.
5. Match the tone to the age group and the emotional state described.
</task>

<constraints>
- At most two changes; drop lesser points even if they are true.
- No criticism of individual players in front of the group; individual corrections go one-to-one.
- For youth teams, keep fun and effort central regardless of the score.
- If an injury or possible head knock is mentioned, the first instruction is to assess it and not return a player with a suspected concussion that day.
- Only suggest changes the team could realistically carry out with what has been practised.
</constraints>

<output_format>
## Read of the half
## The talk
Script with rough timings.
## Changes
Checklist.
## If it is still not working
</output_format>
