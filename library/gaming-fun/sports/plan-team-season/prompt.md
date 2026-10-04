---
schema: 1
id: plan-team-season
kind: prompt
title: Plan a team season
description: Plans a youth or amateur team season with goals, phases, weekly practice themes, a playing-time policy, parent communication with a welcome letter, volunteer roles, logistics and safeguarding.
category: sports
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, teacher, manager]
requires: [none]
inputs: [text, preferences]
output: [plan, message]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [youth-sports, coaching, season-planning, parent-communication, playing-time, volunteer-coach]
pairs_with:
  prompts: [plan-youth-sports-practice]
args:
  - name: sport
    description: The sport, for example football (soccer), basketball, netball, cricket, volleyball or softball.
    type: string
    required: true
  - name: team
    description: The team and season, for example "U10 recreational, 14 players, mixed experience, 12-week season, one practice and one game a week, I'm a first-time parent coach with one assistant" or "adult social league, 10 players, want to stop losing every week".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Season overview, Goals, Season calendar, Weekly practice themes, Playing time and positions, Parent and player communication, Roles and logistics, Safety and safeguarding, Mid-season and end-of-season]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help coaches, often first-time volunteers, plan a whole season so it runs smoothly and every player has a good experience. Most season problems are predictable and preventable with early decisions: unclear goals (winning versus development), playing-time disputes, parents who were never told what to expect, one adult doing every job, and practices with no thread connecting them. For youth teams, development, fun and safety come before results; for adult amateur teams, the balance is whatever the team agrees.

Sport: {{sport}}
Team: {{team}}
</context>

<task>
1. Identify the age group, level (recreational or competitive), roster size, season length and weekly schedule. If the age group or season length is missing, ask and stop; the plan depends on both. Otherwise state assumptions for anything else.
2. Set three to five season goals mixing development, enjoyment and team culture (and results if competitive), each with how you will know it was met.
3. Divide the season into phases (pre-season, early, mid, late, and playoffs or end-of-season event) and lay out a week-by-week calendar of practices, games and key dates.
4. Assign a practice theme to each week that builds skills in a logical order and revisits earlier themes, suited to the age and level.
5. Write a playing-time and positions policy: equal or near-equal playing time and position rotation for young and recreational teams; for competitive teams, a transparent policy based on effort and attendance as well as ability, communicated before the first game.
6. Plan communication: a pre-season parent (or player) meeting agenda, a welcome letter draft covering goals, schedule, playing time, expectations of players and spectators, how to raise concerns (a 24-hour cooling-off rule after games), and the weekly update rhythm and channel.
7. Define volunteer roles (assistant coach, team manager, kit and equipment, snacks or refreshments rota, first aider, carpool coordinator) and the logistics: equipment list, fees, uniforms, venue access, weather cancellation process.
8. Write a safety checklist. For adult teams, cover the emergency action plan, first aid kit, injury and heat policies. For youth teams, add safeguarding: background checks and any training the league requires, never being alone one-on-one with a child, approved channels for messaging minors (include parents), an emergency action plan and first aid kit, concussion and heat policies following the league or governing body, and photo consent.
9. Plan a mid-season review and an end-of-season wrap-up (celebration, individual player notes, feedback from families).
</task>

<constraints>
- Keep the youth focus on development and fun; never suggest cutting playing time as punishment for mistakes in recreational youth play.
- Defer to the league's and governing body's rules on safeguarding, concussion, playing time and contact; tell the coach to check them, since they vary by country and organisation.
- Make the plan realistic for a volunteer: reuse templates, delegate, and keep weekly coach admin under about an hour.
- Write the welcome letter in a warm, plain style that families will actually read.
</constraints>

<output_format>
## Season overview
## Goals
Table: Goal | How we will know.
## Season calendar
Table: Week | Phase | Practice theme | Game or event | Notes.
## Weekly practice themes
Short rationale for the progression.
## Playing time and positions
## Parent and player communication
Meeting agenda, then the welcome letter draft, then the update rhythm.
## Roles and logistics
## Safety and safeguarding
Checkbox list.
## Mid-season and end-of-season
</output_format>
