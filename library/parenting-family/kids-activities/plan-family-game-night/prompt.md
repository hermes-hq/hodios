---
schema: 1
id: plan-family-game-night
kind: prompt
title: Plan a family game night
description: Plans a family game night for a mixed-age group, with games that suit everyone, fairness tweaks for younger players, a running order, snacks and a chooser rotation.
category: kids-activities
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, table, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [family-game-night, board-games, card-games, mixed-ages, cooperative-games, quality-time]
pairs_with:
  prompts: [invent-learning-game, plan-rainy-day-activities, handle-sibling-conflict]
args:
  - name: ages
    description: Who is playing, for example "me, my partner, kids 4, 8 and 13, and grandma who doesn't like complicated rules".
    type: text
    required: true
  - name: games_owned
    description: Games you already have, or "none". Optional.
    type: text
    default: none listed
output_contract:
  format: markdown
  sections: [The plan, Games for your group, Fairness tweaks, Running order, Snacks, Chooser rotation, Handling big feelings]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan family game nights that everyone wants to repeat. Mixed ages make it tricky: the youngest cannot follow long rules, teenagers are bored by baby games, and a sore loser can end the evening. What works: short games first and the longest in the middle, cooperative games where everyone wins or loses together, teams that pair a young child with an adult, handicaps that level the field without being obvious, and a regular slot so it becomes a ritual. The age on a box is a guide; house rules can bring a game down or up an age band.

Players: {{ages}}
Games owned: {{games_owned}}
</context>

<task>
1. The plan: when, how long (usually 60–90 minutes for young children), where, phones away, and one ritual that makes it special (a name for the night, a trophy, a winner picks dessert).
2. Games for your group: five to seven games, starting with the ones they own, plus widely known games or no-equipment games (charades, picture-drawing guessing games, word games, simple card games with a standard deck). For each: who it suits, length, why it works for this group, and a fairness tweak. Do not invent commercial games; if you suggest buying one, describe the kind of game (a short cooperative game, a quick matching game) and mention a well-known example only if you are sure it exists.
3. Fairness tweaks: general ways to even things out across ages (teams, head starts, open hands for young players, simplified scoring, letting younger players have an extra turn or hint), with the rule to keep tweaks agreed and not secret from older children.
4. Running order: a timed sequence for the evening, with a warm-up game, a main game, a snack break and a short closer, ending before the youngest is too tired.
5. Snacks: easy, non-greasy snacks that will not ruin cards, served away from the board.
6. Chooser rotation: a fair rotation for who picks the main game, a simple chart, and what to do when someone hates the pick.
7. Handling big feelings: how to prepare a sore loser (talk beforehand, model losing gracefully, praise good sportsmanship, short cooperative games after a loss), a calm script for a meltdown, and how to handle a teenager who is too cool to play (give them a role such as host, rule-maker or scorekeeper).
</task>

<constraints>
- Every game must be playable by the youngest player, either as is or with a tweak or a team partner; say which.
- Respect anyone with limited mobility, vision or reading: include options that do not need fine motor skills or reading.
- If the ages are missing, ask for them.
- Keep it light and short; this is fun, not a project.
</constraints>

<output_format>
## The plan
## Games for your group
Table: Game | Best for | Length | Why it works | Fairness tweak.
## Fairness tweaks
## Running order
Table: Time | Activity.
## Snacks
## Chooser rotation
## Handling big feelings
</output_format>
