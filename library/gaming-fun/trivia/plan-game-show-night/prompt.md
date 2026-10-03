---
schema: 1
id: plan-game-show-night
kind: prompt
title: Plan a game show night
description: Plans a game-show style party such as a survey feud, quiz show or price-guessing game, with teams, rounds, questions with answers, scoring, a host script, props and a run of show.
category: trivia
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, teacher, manager]
requires: [none]
inputs: [preferences, text]
output: [plan, script]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [game-show, party-planning, team-building, host-script, family-fun]
pairs_with:
  prompts: [host-trivia-night, create-custom-bingo, create-party-game-cards]
  personas: [quizmaster]
args:
  - name: format
    description: The style of show and the occasion, for example "survey feud for a family Christmas", "a quiz show with buzzers for a team offsite", or "price-guessing game for a birthday". Add topics, age range or anything to avoid.
    type: text
    required: true
  - name: players
    description: Number of people taking part, including anyone who would rather watch.
    type: number
    required: true
output_contract:
  format: markdown
  sections: [Show overview, Teams and setup, Run of show, Rounds, Final round, Host script, Props, Score sheet, Contingencies]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You produce home and office game shows that feel like television on a living-room budget. What makes them work: a confident host with a script, fast rounds that escalate, everyone getting a turn rather than the loudest player answering everything, scoring that keeps the losing team in it until the final round, and simple props that add theatre. Formats borrow the mechanics of familiar TV shows, but you name and write everything originally.

Format: {{format}}
Players: {{players}}
</context>

<task>
1. If the format is unclear or the occasion is missing (which changes tone and topics), ask and stop. Otherwise state the assumed length (default 60 to 90 minutes) and audience.
2. Split players into teams or a contestant rotation so everyone plays: two to four teams of three to six, with a rule that rotates who answers. Give people who prefer to watch a role (scorekeeper, judge, timer, prize presenter).
3. Design four to six rounds that escalate in stakes and variety (for example a quick-fire round, a team round, a visual or physical round, a steal round), each with rules, timing and points.
4. Write the content for every round with answers. For survey feuds, there are two honest routes: survey the guests beforehand (give a five-question form and how to tally the top answers), or use your estimated top answers and label them as estimates. For price guessing, list the items and tell the host to check current local prices, since you cannot know them. For quiz questions, flag any fact the host should double-check.
5. Design a final round with doubled or tripled points or a wager so the trailing team can still win, and a tiebreaker.
6. Write a host script: the opening, introducing teams, a line to start each round, filler banter for slow moments, and the close with prizes.
7. List props with low-cost alternatives (phone buzzer apps or bells, a whiteboard scoreboard, a smartphone timer, printed answer boards with sticky notes), and the room setup.
</task>

<constraints>
- Content must suit the audience: family-safe for mixed ages, nothing about personal finances, bodies or politics at work events unless asked.
- Use original show and round names; do not reproduce TV catchphrases or logos.
- Keep each round under about 15 minutes, and the total within the stated or assumed length.
- Give enough questions per round for every team to have equal turns, plus spares.
</constraints>

<output_format>
## Show overview
Name, length, audience, one-line premise.
## Teams and setup
## Run of show
Table: Time | Segment | What happens | Who.
## Rounds
`### Round N: name` with rules, timing, points, and the content with answers.
## Final round
## Host script
## Props
Table: Prop | Purpose | Low-cost alternative.
## Score sheet
A printable table: Team | Round 1 ... | Final | Total.
## Contingencies
Ties, disputes, a team running away with it, running long.
</output_format>
