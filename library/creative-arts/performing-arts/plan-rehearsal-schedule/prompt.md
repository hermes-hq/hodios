---
schema: 1
id: plan-rehearsal-schedule
kind: prompt
title: Plan a rehearsal schedule
description: Plans rehearsals from read-through to opening from a scene breakdown, calling actors only when needed, with off-book, run, tech and dress milestones. Use when directing a show.
category: performing-arts
version: 1.0.0
status: incubating
stage: [plan]
role: [artist, project-manager]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rehearsal-schedule, stage-management, call-sheet, tech-week, scene-breakdown]
pairs_with:
  prompts: [plan-scene-blocking, plan-community-theatre-production, write-cue-sheet]
args:
  - name: show
    description: The show and its scenes with the characters in each (a scene breakdown), or the script. Include songs and dances for a musical.
    type: text
    required: true
  - name: dates
    description: First rehearsal, tech, dress and opening dates, and which days and hours are available for rehearsal.
    type: text
    required: true
  - name: conflicts
    description: Cast members' known unavailability, rooms, and other limits (for example children's hours or a shared venue). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Overview, Scene breakdown, Milestones, Weekly schedule, Conflicts and risks, Call notice template]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced stage manager. A good rehearsal schedule starts from a scene breakdown (which characters are in which scenes, or "French scenes" that change when someone enters or leaves), so actors are called only when they work, and it sequences the work: read and table work, blocking (often hardest or largest scenes first), working scenes, an off-book date, stumble-through, runs, technical rehearsal and dress. Musicals add music calls and choreography, which usually run in parallel rooms. Volunteer and youth casts need fewer, shorter calls and earlier off-book dates than professionals. Tech always takes longer than planned.

Show: {{show}}
Dates: {{dates}}
{{#conflicts}}Conflicts and limits: {{conflicts}}{{/conflicts}}
</context>

<task>
1. Overview: total rehearsal hours available against a rough need, and whether the time is enough. If it is tight, say what to cut (fewer full runs early, parallel calls, tighter calls) and what not to cut (tech, at least two full runs before tech).
2. Scene breakdown: a table of scenes (or French scenes) by character, with an estimated length, and groupings of scenes that share cast.
3. Milestones: read-through, blocking complete, off-book date, first stumble-through, first full run, tech, dress, opening. Place off-book before runs begin.
4. Weekly schedule: day by day, with times, scenes or numbers to work, and who is called. Keep calls tight; avoid actors waiting for hours. Put large-cast scenes on the best-attended days.
5. Conflicts and risks: show where known conflicts collide with the schedule and how you solved them; list risks (understudies or cover, illness, room access) and a response for each.
6. Call notice template: a short weekly notice the stage manager sends to cast.
</task>

<constraints>
- Use only the scenes, characters and dates given. If the breakdown is missing, build it from the script or ask for it; do not invent scenes.
- Respect stated conflicts and any limits on children's hours or safeguarding rules; say to check local rules for child performers.
- Build in breaks: no call longer than the group can sustain, with a break at least every 80–90 minutes for long calls and a meal break in long days.
- Do not overpromise: if the dates cannot produce a ready show, say so plainly.
</constraints>

<output_format>
## Overview
## Scene breakdown
A table: Scene | Length | Characters.
## Milestones
## Weekly schedule
A table per week: Day | Time | Work | Called.
## Conflicts and risks
## Call notice template
</output_format>
