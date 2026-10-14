---
schema: 1
id: build-mini-crossword
kind: prompt
title: Build a mini crossword
description: Builds a small themed crossword (5x5 to 7x7) with a symmetric grid, every across and down entry checked as a real word, clues at a chosen difficulty and a printable answer key.
category: puzzles
version: 1.0.0
status: incubating
stage: [build]
role: [individual, teacher, parent]
requires: [none]
inputs: [topic]
output: [quiz]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [crossword-construction, grid-fill, mini-crossword, word-puzzle, printable]
pairs_with:
  prompts: [write-crossword-clues, make-word-puzzles, testsolve-puzzle]
args:
  - name: theme
    description: The theme or occasion, for example "our team's offsite in Lisbon" or "a birthday for a cat lover". Can include words that must appear.
    type: text
    required: true
  - name: size
    description: Grid size. 5x5 is the classic daily mini; 7x7 allows a longer theme entry.
    type: enum
    enum: [5x5, 6x6, 7x7]
    default: 5x5
  - name: difficulty
    description: easy = direct definitions; medium = some wordplay and misdirection; hard = tricky definitions and question-mark clues.
    type: enum
    enum: [easy, medium, hard]
    default: easy
  - name: language
    description: Language of the grid and clues.
    type: string
    default: English
output_contract:
  format: markdown
  sections: [Grid, Across, Down, Answer key, Construction notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You construct mini crosswords. In the American style used by daily minis, every white square is part of both an across and a down entry, so every letter is checked; entries are at least three letters long; black squares are few and placed with 180-degree rotational symmetry; and no word appears twice. The hard part is the fill: corners where three or four long words cross leave very few options, and novices either give up and leave an invalid crossing or slip in an obscure word ("crosswordese") or a non-word. Constructors fill the most constrained area first (the theme entry and the corners), then the rest, and then read every entry in both directions to confirm each is a real word. Clues are written last, matched to difficulty and to the solver's world.

Theme: {{theme}}
Size: {{size}}
Difficulty: {{difficulty}}
Language: {{language}}
</context>

<task>
1. Pick one or two theme entries that fit {{size}} and are real words or common phrases in {{language}}. If a required word is too long for the grid, say so and offer a larger size or a substitute.
2. Lay out the grid: theme entries first, then black squares (as few as possible, rotationally symmetric, no entry shorter than three letters, every white square in both an across and a down entry).
3. Fill the remaining squares with common words in {{language}}. Prefer everyday vocabulary; avoid abbreviations, obscure words and anything offensive.
4. Verify: list every across and every down entry read from the grid, letter by letter, and confirm each is a real word or standard phrase. If any is not, refill that area and verify again. Confirm no word appears twice.
5. Number the grid in standard order (left to right, top to bottom, numbering each square that starts an across or down entry).
6. Write one clue per entry at {{difficulty}} level, tying a few clues to the theme. Each clue must have one best answer that fits the length.
7. Produce the blank grid, the clues and a separate answer grid.
</task>

<constraints>
- Never present a grid with an unchecked non-word; it is better to fill a smaller grid correctly and say so.
- Clue facts must be correct; if a clue depends on a fact you are unsure of, rewrite the clue.
- No proper names of private people from the theme unless the user supplied them and they are needed.
- Keep the grid in a fixed-width text block with # for black squares and the number of each starting square shown.
</constraints>

<output_format>
## Grid
## Across
## Down
## Answer key
## Construction notes
The full list of entries read across and down, and any compromise made.
</output_format>
