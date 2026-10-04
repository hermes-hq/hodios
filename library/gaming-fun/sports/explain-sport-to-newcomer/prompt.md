---
schema: 1
id: explain-sport-to-newcomer
kind: prompt
title: Explain a sport to a newcomer
description: Explains a sport to someone about to watch or play it for the first time, with the objective, how scoring works, the few rules that matter, what to watch for and the jargon fans use.
category: sports
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, traveler]
requires: [none]
inputs: [topic, preferences]
output: [explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [sport-rules, first-match, spectator-guide, sports-jargon, newcomer]
pairs_with:
  prompts: [explain-sports-stat, learn-new-sport-as-adult]
args:
  - name: sport
    description: The sport, as specific as you can, for example "cricket (a T20 match)", "American football", "ice hockey" or "padel". Name the format or league if you know it.
    type: string
    required: true
  - name: context
    description: watching = you will be a spectator; playing = you will take part in a casual game; both = covers the two.
    type: enum
    enum: [watching, playing, both]
    default: watching
  - name: depth
    description: five-minute = the essentials to enjoy your first time; full = a fuller guide including tactics and less common rules.
    type: enum
    enum: [five-minute, full]
    default: five-minute
output_contract:
  format: markdown
  sections: [The game in one breath, How you win and score, The rules that matter, What to watch for, Words you will hear, Your first time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain sports to people who have never followed them: a partner dragged to their first match, a traveller with tickets to a local game, a new colleague joining the office team. Newcomers get lost in the same places in every sport: they do not know what the players are trying to do at any moment, how points are counted, why play keeps stopping, or what the crowd is reacting to. A good explanation starts with the objective and the flow of play, then gives only the rules that explain what they will actually see, and saves the rest for later.

Sport: {{sport}}
Context: {{context}}
Depth: {{depth}}
</context>

<task>
1. If the sport is ambiguous (for example "football", "rugby" or "hockey" without a country or code), state which version you are explaining in one line and offer the other. If you do not know the sport well enough to explain it accurately, say so and ask for a rules summary or link text instead of guessing.
2. The game in one breath: two or three sentences on who plays, where, for how long, and what each side is trying to do.
3. How you win and score: every way to score with its value, how a match is won (including draws, overtime, tie-breaks or innings), and how long a match usually lasts in real time.
4. The rules that matter: the few rules that explain most stoppages and crowd reactions (for example offside, fouls, out of bounds, the shot clock). For five-minute depth, at most five; for full, up to ten, plus the common formats or competitions.
5. What to watch for: where to look during play, the moments that build tension, and one or two simple tactical ideas that make the game more interesting once you notice them.
6. Words you will hear: a short glossary of the jargon fans and commentators use, each with a plain meaning.
7. Your first time: for watching, spectator etiquette, when to cheer or stay quiet, and what to bring; for playing, the basic positions or roles, safety basics and how to join in without slowing the game; for both, cover the two briefly.
8. Before answering, check that the scoring values and match structure you gave are consistent with each other and with the version of the sport you named.
</task>

<constraints>
- Do not state current-season facts (standings, players, transfers, rule changes from a particular year) unless the user supplied them; rules evolve, so suggest checking the governing body or league for recent changes.
- Use plain language and one concrete example per rule rather than legal wording.
- Explain any term the first time it appears.
- Keep five-minute depth readable in about five minutes; never pad.
- Not a board-game teach or a coaching plan: explain the sport so the person can follow and enjoy it.
</constraints>

<output_format>
## The game in one breath
## How you win and score
A table: Way to score | Value | How it happens.
## The rules that matter
Numbered, each with a one-line example of what it looks like.
## What to watch for
## Words you will hear
Table: Term | Plain meaning.
## Your first time
</output_format>

<examples>
Rule written well, for basketball: "Shot clock: a team has 24 seconds to shoot. If you hear a buzzer and play stops while nobody scored, the attacking team ran out of time and the ball goes to the other side."
</examples>
