---
schema: 1
id: design-dungeon-puzzle
kind: prompt
title: Design a puzzle for a tabletop adventure
description: Designs an in-world puzzle for a tabletop adventure with clues placed in the scene, a solution players can reason out, a hint ladder, a bypass at a cost and handout text.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [design]
role: [gamer]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [puzzle-design, dungeon-design, game-mastering, hint-ladder, session-prep]
pairs_with:
  prompts: [design-dungeon, create-player-handouts]
  personas: [dungeon-master]
args:
  - name: situation
    description: Where the puzzle sits, what it guards, the setting and tone, the party level, and how much your group enjoys puzzles (loves them, tolerates them, gets frustrated fast).
    type: text
    required: true
  - name: difficulty
    description: How hard the puzzle should be for the players themselves.
    type: enum
    enum: [easy, medium, hard]
    default: medium
output_contract:
  format: markdown
  sections: [Concept, What the players see, Solution, Clues, Hint ladder, Bypass and failure, Handout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a game master who puts puzzles in adventures without stalling the session. At the table a puzzle is solved by the players, not their characters, so it has to be solvable from what the game master describes aloud, by people who cannot see what is in the designer's head. Puzzles that fail at the table usually depend on one exact answer, on real-world trivia or wordplay in one language, or on a clue the players never noticed. Good ones belong to the place (the builder had a reason), have clues in more than one spot, accept sensible alternative solutions, and come with a way forward if the group gets stuck: graded hints earned through character checks, and a costly bypass.

Situation: {{situation}}
Difficulty for the players: {{difficulty}}
</context>

<task>
1. If the party level or where the puzzle sits is missing, ask and stop.
2. Concept: the puzzle type (pattern, sequence, logic, physical manipulation, riddle-with-context, environmental), why it exists in the world, and what solving it gives.
3. What the players see: the description to read or paraphrase, with every element they will need named in it, kept to what a game master can say in under a minute.
4. Solution: the intended solution step by step, plus at least one alternative solution you would also accept and how to judge creative attempts.
5. Clues: where each clue is placed (in this room, earlier rooms, an NPC, a handout), with the rule that each key fact appears in at least two places.
6. Hint ladder: three hints from gentle to nearly explicit, each unlocked by a character check, time spent or a resource, so players can trade character skill for progress.
7. Bypass and failure: a brute-force or magical bypass with a real cost (time, noise, damage, a lost reward), and what a wrong attempt does, which should create pressure or information, not just "nothing happens".
8. Handout: a short in-world text or described diagram the game master can give the players, if the puzzle needs one.
9. Self-check: solve the puzzle backwards from the description alone and fix anything that relies on information not given.
</task>

<constraints>
- Solvable from the described scene and clues alone; no real-world trivia, puns that only work in English, or maths beyond simple arithmetic unless the group asked for it.
- Never a single point of failure: the adventure must be able to continue if the puzzle is not solved.
- Match the difficulty requested and the group's patience; for a group that frustrates fast, prefer easy with a fast hint ladder.
- Original puzzles only; do not copy famous published puzzles or riddles word for word.
- One puzzle, not a puzzle dungeon.
</constraints>

<output_format>
## Concept
## What the players see
A short read-aloud or paraphrase block.
## Solution
Numbered steps, then accepted alternatives.
## Clues
Table: Clue | Where it is | What it tells them.
## Hint ladder
Three numbered hints with what unlocks each.
## Bypass and failure
## Handout
</output_format>
