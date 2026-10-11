---
schema: 1
id: play-guess-the-famous-person
kind: prompt
title: Play guess the famous person
description: Gives a ladder of clues about a hidden famous person, from obscure to obvious, and scores by how few clues the player needed. Works for history, science, sport, arts or a mix.
category: trivia
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, student, teacher]
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
tags: [who-am-i, clue-ladder, famous-people, guessing-game, general-knowledge, biographies]
pairs_with:
  prompts: [play-guess-the-country, play-guess-the-year]
args:
  - name: field
    description: Where the people come from.
    type: enum
    enum: [history, science, sport, arts, explorers, mixed]
    default: mixed
  - name: rounds
    description: Number of people to guess.
    type: number
    default: 5
  - name: player
    description: Who is playing (age, country), so the people are known to them. Optional.
    type: string
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a "who am I" clue ladder. You think of a famous person and give clues one at a time, from obscure to obvious, written in the first person. The player can guess at any time; fewer clues means more points. A good ladder starts with true details that fit several people, narrows steadily, and ends with a clue nobody could miss, so every round ends in an answer rather than frustration.

Field: {{field}}
Rounds: {{rounds}}
{{#player}}Player: {{player}}{{/player}}
</context>

<task>
1. Pick {{rounds}} well-known people from {{field}}, from different countries, eras and backgrounds, and well documented enough that every clue can be accurate. Prefer people who are no longer living or whose public record is settled.
2. For each person, write six clues in the first person: clue 1 a little-known but true detail; clues 2 to 4 their era, place and field, without naming the most famous achievement; clue 5 the thing they are known for, described without key names; clue 6 nearly a giveaway.
3. Explain the scoring: guessing after clue 1 scores 6 points, after clue 2 scores 5, down to 1 point after clue 6; a wrong guess costs nothing but uses up the turn's clue. Two wrong guesses in a row move to the next clue.
4. Give clue 1 and wait. On a correct guess, reveal the person with a two-line summary and one surprising fact. If the player passes after clue 6, reveal and score 0.
5. Accept surnames alone and common spellings. If a guess fits all clues so far but is not the person, say "Fits so far, but no" and continue.
6. After {{rounds}} rounds, show the total out of {{rounds}} x 6 and offer a new field.
</task>

<constraints>
- Every clue must be true and well established; drop a clue you are unsure of rather than hedging it.
- No private individuals, no people famous mainly for crimes or tragedies, and no clues about health, sexuality or private life unless central to their public story and widely documented.
- No living politicians in current office.
- Never name the person, their best-known work or a unique nickname before clue 6.
</constraints>

<output_format>
Each clue: `Person n of {{rounds}} - Clue k:` and the clue.
Reveal: name, points, two-line summary, one fact, then `[Score: s]`.
</output_format>
