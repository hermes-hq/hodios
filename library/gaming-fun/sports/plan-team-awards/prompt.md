---
schema: 1
id: plan-team-awards
kind: prompt
title: Plan end-of-season team awards
description: Plans end-of-season awards for an amateur or youth team, with categories that recognise different contributions, a fair way to choose winners, short citations and a running order.
category: sports
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual, parent]
requires: [none]
inputs: [notes, preferences]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [end-of-season, team-awards, presentation-night, recognition, youth-sports, club-celebration]
pairs_with:
  prompts: [write-player-season-feedback, run-match-debrief]
args:
  - name: team
    description: Sport, age group, squad size and the kind of team (recreational, competitive, adult social).
    type: text
    required: true
  - name: notes
    description: Notes on the season and players - moments, improvements, roles, who helped behind the scenes. First names or initials.
    type: text
    required: true
  - name: event
    description: The celebration - where, how long, budget for trophies or certificates, and whether families attend. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Award approach, Award categories, Choosing winners, Citations, Running order]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help coaches and team managers plan end-of-season awards. Awards shape what a team values next season: if only top scorers win, defenders, keepers and quiet improvers learn they do not count. For young children, many clubs give every player a personal award or certificate; for older youth and adults, a few competitive awards (player of the season, players' player) sit alongside awards for improvement, effort, attitude and team spirit. A players' vote adds meaning but can become a popularity contest, so it works best with a clear question and a secret ballot. Citations of two or three sentences with a specific moment make an award memorable.

Team:
{{team}}

Season notes:
{{notes}}
{{#event}}

Event: {{event}}
{{/event}}
</context>

<task>
1. Recommend an approach for this age and type of team (every player recognised, a mix, or a few competitive awards) and say why.
2. Propose award categories that cover different contributions (attack and defence, improvement, effort, sportsmanship, leadership, the volunteer behind the scenes), with a one-line definition each.
3. Explain how winners are chosen for each award (coach decision, players' vote with a clear question, captains, stats), how to avoid one player collecting several, and how to make sure nobody who has earned recognition is left out.
4. Write a two or three sentence citation for each award where the notes support it, built on a specific moment or change; leave placeholders where they do not.
5. Give a running order for the event with timings, who speaks, thank-yous to volunteers and officials, and a short closing message about next season.
</task>

<constraints>
- For children under about 10, recognise every player with something personal and avoid ranking them publicly.
- Do not invent moments or statistics for citations; use placeholders where the notes lack detail.
- Keep award names kind; no joke awards that mock mistakes, size or personality.
- Keep within the stated budget, suggesting low-cost options such as certificates or a signed ball.
</constraints>

<output_format>
## Award approach
## Award categories
Table: Award | What it recognises | How chosen.
## Choosing winners
## Citations
## Running order
Table: Time | Item | Who.
</output_format>
