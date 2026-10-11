---
schema: 1
id: run-faction-turn
kind: prompt
title: Run a faction turn between sessions
description: Advances a tabletop campaign's factions between sessions from what the players did, with each faction's move, clock changes, visible ripples and rumours to seed next session.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [operate]
role: [gamer]
requires: [none]
inputs: [notes, text]
output: [summary, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [factions, sandbox, living-world, game-mastering, progress-clocks]
pairs_with:
  prompts: [design-campaign-arc, write-session-recap]
  workflows: [session-prep-track]
  personas: [dungeon-master]
args:
  - name: factions
    description: The factions or powers in play, each with its goal, resources, current plan and any progress clock (for example "4 of 6 segments toward seizing the harbour").
    type: text
    required: true
  - name: last_session
    description: What happened last session, especially what the players did that touched any faction, and how much in-game time passes before the next session.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What changed, Faction moves, Clocks, Ripples the players can see, Rumours, Next session hooks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a game master's assistant for running a living world. Between sessions, each faction in a sandbox or long campaign should take a turn: pursue its goal with the resources it has, react to what the players did, and sometimes clash with other factions. Two habits make this work. First, consequences are proportional and follow from what the faction knows: not every faction notices the party, and nobody reacts with information they could not have. Second, off-screen changes only matter if players can perceive them, so every move should leave evidence in the world (a new patrol, a price change, a missing person, a rumour). Progress clocks (a circle in segments that fills as a faction advances) keep this honest and visible to the game master.

Factions: {{factions}}
Last session and time passing: {{last_session}}
</context>

<task>
1. If no faction goals or no account of last session is given, ask and stop.
2. What changed: the player actions and events from last session that matter to any faction, and which factions plausibly know about each.
3. Faction moves: for each faction, one move (or two for a dominant faction) that follows from its goal, resources and what it knows: advance the plan, react to the players, strike a rival, consolidate, or recover. Note what the move costs the faction.
4. Clocks: a table of each faction clock before and after, with the reason for each tick, and anything that is now close to completing.
5. Ripples the players can see: for each move, at least one concrete sign the players could encounter next session, and where.
6. Rumours: five to eight rumours the players could hear, mixing accurate, partial and wrong, each marked for the game master.
7. Next session hooks: two or three situations that now pull at specific player characters, plus one warning sign that a clock is about to fill.
</task>

<constraints>
- Factions act only on information they could have; say how they learned of anything the players did.
- Keep consequences proportional; do not undo player victories or punish the party out of scale.
- Not every faction reacts to the party; some pursue their own goals or each other.
- Do not invent new major factions or retcon established facts; flag any gap the game master should decide.
- Keep it short enough to read in five minutes before the next session.
</constraints>

<output_format>
## What changed
## Faction moves
One block per faction: Move, Why, Cost.
## Clocks
Table: Faction | Clock | Before | After | Reason.
## Ripples the players can see
## Rumours
Numbered, each marked accurate, partial or wrong.
## Next session hooks
</output_format>
