---
schema: 1
id: run-chase-scene
kind: prompt
title: Run a chase scene
description: Builds a tabletop chase or pursuit with a distance track, terrain zones, a complications table, action options for every character and clear end conditions for both sides.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [design]
role: [gamer]
stack: [dnd-5e]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [chase, pursuit, set-piece, game-mastering, session-prep]
pairs_with:
  prompts: [balance-combat-encounter, write-read-aloud-text]
  personas: [dungeon-master]
args:
  - name: situation
    description: Who is chasing whom, why, where (rooftops, market, forest road, sewer), the party's level and characters, and what happens if the quarry escapes or is caught.
    type: text
    required: true
  - name: system
    description: Game system and edition, for example dnd-5e, pathfinder-2e, or "rules-light".
    type: string
    default: dnd-5e
output_contract:
  format: markdown
  sections: [Setup, Track, Turn procedure, Complications, Ending the chase, Running notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a game master who makes chases exciting rather than a sequence of speed comparisons. Run with exact movement, most chases are decided before they start by whoever is faster, or they drag on as everyone dashes every round. Chases work when distance is abstracted into a short track, each round offers a choice (push hard, take a shortcut, hinder the other side, help an ally), the terrain throws complications that test different characters' abilities, and both sides have clear end conditions. D&D 5e's Dungeon Master's Guide has optional chase rules (dash limits tied to Constitution, exhaustion, a complications table); other systems have their own subsystems or none.

Situation: {{situation}}
System: {{system}}
</context>

<task>
1. If it is unclear who is chasing whom or what is at stake, ask and stop.
2. Setup: the stakes on both sides, the starting gap, how many rounds the chase should last at most (usually five to eight), and why it is fun here.
3. Track: a distance track (for example zones or a numbered gap from 0, caught, to 6, escaped), the terrain zones the chase passes through in order, with one defining feature each.
4. Turn procedure: what each character can do on their turn (sprint, shortcut, hinder, spot, help, attack at a cost), the check and difficulty for each in {{system}} terms, how the gap changes on success and failure, and how fatigue or exhaustion limits repeated sprinting. Include something for slow or non-athletic characters to do.
5. Complications: a table of eight complications tied to the terrain zones, each with the check to avoid it and the cost on failure, plus a few that help whoever triggers them.
6. Ending the chase: what happens at each end of the track, what happens if the round limit is reached, and a twist option (the quarry leads them into a trap, a third party intervenes).
7. Running notes: how to describe pace and tension each round, how to keep turns fast, and how to handle the party splitting up.
</task>

<constraints>
- Every character must have a meaningful option each round, not only the fastest.
- Use the named system's checks and terms; if you adapt the D&D 5e optional chase rules, say what you changed.
- The chase must not be decided by a single roll, and failure must lead somewhere interesting, not just "they got away" with nothing else.
- Keep it to one chase; do not write the surrounding adventure.
</constraints>

<output_format>
## Setup
## Track
A one-line track and the zones in order.
## Turn procedure
Table: Action | Check | Success | Failure.
## Complications
Table: Roll | Zone | Complication | Avoid with | Cost.
## Ending the chase
## Running notes
</output_format>
