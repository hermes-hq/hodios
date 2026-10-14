---
schema: 1
id: plan-quiz-league-season
kind: prompt
title: Plan a recurring quiz league season
description: Plans a weekly or monthly quiz league for a pub, café or club - season length, round rotation, standings that forgive missed weeks, question-writing workload, prizes and how to keep new teams coming.
category: trivia
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, gamer]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [quiz-league, weekly-quiz, standings, round-rotation, pub-quiz, regulars]
pairs_with:
  prompts: [host-trivia-night, design-quiz-scoring-rules]
  workflows: [quiz-night-track]
args:
  - name: venue
    description: The venue and who comes, for example "neighbourhood pub, Tuesday nights, 8 to 15 teams, mostly regulars".
    type: text
    required: true
  - name: frequency
    description: How often the quiz runs.
    type: enum
    enum: [weekly, fortnightly, monthly]
    default: weekly
  - name: hosts
    description: Who writes and hosts, for example "just me" or "three of us taking turns". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Season shape, Round rotation, Standings, Writing workload, Keeping it welcoming, Season calendar]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan recurring quiz leagues. A one-off quiz needs good questions; a league also needs to survive months of weekly writing and keep both regulars and newcomers coming back. The common failures: the host burns out writing 50 questions a week, one strong team wins every week and newcomers stop showing up, standings punish teams for one missed week, and the format grows stale. Leagues that last use fixed recurring round types (so writing is a template), "best N of M weeks" standings, a separate prize for best newcomer or most improved, and short seasons with a clear finale.

Venue: {{venue}}
Frequency: {{frequency}}
{{#hosts}}Hosts: {{hosts}}{{/hosts}}
</context>

<task>
1. Set the season shape: length (for example 10 to 12 sessions for weekly), a finale night, a break between seasons.
2. Design a round rotation: a fixed core (for example general knowledge, picture handout, a themed round that changes weekly, a connections or "on this day" round, a finale round) and a list of 12 or more themed round ideas to rotate.
3. Standings: points per night by finishing position or raw score scaled, counting each team's best N nights, with a rule for ties and for team names that change.
4. Writing workload: questions per week, a template per round, a bank-building routine (write two rounds ahead, keep a "reserve" round), a rota if there are several hosts, and a quick self-check before each night.
5. Keeping it welcoming: a newcomer or most-improved prize, a cap on team size, a beginner-friendly first round, a rule for teams that dominate (for example a champions' handicap or a "beat the champions" bonus), and how to handle disputes and phones.
6. Season calendar: a table of session dates by number, the themed round for each, and notes for the finale.
</task>

<constraints>
- If the league charges entry or gives cash prizes, note that paid games and prize draws can be regulated in some places and the venue should check; do not state local law.
- Do not invent the venue's prices, licences or days; use what the person gave and placeholders otherwise.
- Keep the system simple enough to update standings in ten minutes after each night.
</constraints>

<output_format>
## Season shape
Bullets.
## Round rotation
Core rounds, then a table of themed round ideas.
## Standings
The rules, with a worked example for three teams.
## Writing workload
Bullets.
## Keeping it welcoming
Bullets.
## Season calendar
Table: Session | Date placeholder | Themed round | Notes.
</output_format>
