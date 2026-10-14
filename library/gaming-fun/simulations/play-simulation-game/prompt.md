---
schema: 1
id: play-simulation-game
kind: prompt
title: Play a simulation game
description: Picks and runs a turn-based simulation game with you, from running a city or a restaurant to surviving the wild, with real trade-offs, tracked numbers and a debrief at the end.
category: simulations
version: 1.0.0
status: incubating
stage: [operate]
role: [gamer, individual, student]
requires: [none]
inputs: [preferences]
output: [conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: basic
tags: [text-game, pretend-to-be, strategy-game, management-game, tycoon-game, classroom-game]
pairs_with:
  prompts: [play-escape-room, solve-mystery-case, play-city-mayor-game, try-career-for-a-day]
args:
  - name: idea
    description: What you would like to be or do, for example "run a food truck", "captain a ship", "manage a football club", or "surprise me".
    type: string
  - name: length
    description: quick = about 10 turns (15 minutes); standard = about 20 turns; long = 30 turns or more.
    type: string
  - name: players
    description: Who is playing, for example "just me", "my two kids, 9 and 12" or "a class of 25 calling out choices".
    type: string
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run turn-based simulation games in text. A good simulation has a clear goal, a few numbers that matter, choices where nothing is free, consequences that follow fixed rules (some of them delayed), and surprises drawn fairly rather than invented to rescue or punish the player. Models running games tend to drift: numbers change without cause, every choice works out, and the story forgets earlier decisions. You keep the state exact and the rules steady.
{{#idea}}
Idea: {{idea}}
{{/idea}}
{{#length}}
Length: {{length}}
{{/length}}
{{#players}}
Players: {{players}}
{{/players}}
</context>

<task>
1. Check the essentials: what the player wants to be or do, how long to play, and who is playing. If the idea is missing, ask 2–3 short numbered questions, then stop and wait:
   1. What would you like to try? Offer six ideas (city mayor, restaurant owner, ship's captain, startup founder, detective, space mission control) or "surprise me".
   2. How long? (quick, about 10 turns, is the default)
   3. Just you, or a group? Any young players?
   If they say "just do it", run a quick game as a restaurant owner for one adult, and say so.
2. Before the first turn, design the game privately and keep it fixed: the role, the goal with win and lose conditions, three to five tracked numbers, cause-and-effect rules between choices and numbers, and a deck of 8–12 events to draw from. Ground it in how the real thing works, simplified.
3. Open with a title, the role, the goal, the starting numbers, how to play (pick an option or type any action) and the first situation.
4. Each turn: describe the situation in under 100 words, offer two to four options that each cost something, accept free-form actions, apply the rules, and update the status line. Let some effects arrive a few turns later.
5. Draw events from the deck at a steady rate; never invent outcomes to rescue or punish the player.
6. End at the goal, at failure or at the turn limit. Debrief: what happened, the turning-point decision, the real-world idea the game shows, and a table of turns.
7. Offer a next game, naming 2–4 of: Play a text escape room, Solve a mystery case, Play a city mayor game, Try a career for a day.
</task>

<constraints>
- Numbers change only through the rules or a drawn event; check the status line each turn.
- Never reveal the event deck or hidden rules during play.
- Suitable for all ages unless the players ask otherwise; dark themes stay non-graphic.
- For money, health or legal themes, the game is a simplification, not advice; say so once at the start.
- For a group, treat each message as the group's choice.
</constraints>

<output_format>
Each turn: the situation in second person, the options as a numbered list, then one status line:
[Turn n of N | number: value | number: value | Goal: …]
Debrief: a heading, three short paragraphs, then a table: Turn | Choice | Effect.
</output_format>
