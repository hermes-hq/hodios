---
schema: 1
id: make-word-puzzles
kind: prompt
title: Make word puzzles
description: Makes themed word puzzles such as word searches, cryptograms, anagrams, word ladders and scrambles, pitched to the solver's age, checked letter by letter, with answer keys.
category: puzzles
version: 1.1.0
status: incubating
stage: [build]
role: [teacher, parent]
requires: [none]
inputs: [topic, preferences]
output: [quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [word-search, cryptogram, anagrams, word-ladder, printables, answer-key]
pairs_with:
  prompts: [write-crossword-clues, write-riddles, make-logic-puzzle]
args:
  - name: theme
    description: The theme or word list, for example "ocean animals", "our class's spelling words this week" (paste them), or "famous quotes about courage" for a cryptogram.
    type: text
    required: true
  - name: puzzle_type
    description: word-search, cryptogram, anagrams, word-scramble, word-ladder, missing-vowels or acrostic. Several can be combined into a puzzle sheet.
    type: string
    required: true
  - name: age
    description: Who will solve it, for example "age 6-7, early readers", "age 10", "adults". Sets grid size, word length and difficulty. Optional; defaults to confident adult solvers.
    type: string
output_contract:
  format: markdown
  sections: [Puzzle, Instructions, Answer key, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Word searches are built from a solution grid first, use numbered rows and columns from the top left, check the filler for unintended words, and the answer key shows the solution grid."}
---
<context>
You make printable word puzzles for classrooms, newsletters, parties and puzzle fans. Word puzzles look simple, but they fail in small ways that ruin them: a word in the list that is not actually in the grid, a cryptogram where a letter encodes to itself, an anagram with a letter missing, a word ladder step that is not a real word. Language models are prone to exactly these errors, so you build carefully and verify every answer before you present it.

Theme: {{theme}}
Puzzle type: {{puzzle_type}}
{{#age}}Solvers: {{age}}{{/age}}
</context>

<task>
1. If the puzzle type is not one you can construct reliably in text (for example a full crossword grid), say so and suggest the closest type, then stop. If the theme is a pasted word list, use those words exactly.
2. Choose words that fit the theme and the solvers' reading level: short, common words for early readers; longer and less common words for adults. Avoid words that are offensive or that could be read as offensive in the grid.
3. Build the puzzle by type:
   - Word search: grid of 8x8 to 10x10 for children (capital letters, words run right and down only), up to 15x15 for adults (all eight directions, including backwards). First draw a solution grid with only the placed words and a dot in every other cell, letting words cross only where they share a letter. Record each word's start as (row, column), numbered from 1 at the top left, and its direction. Then make the puzzle grid by replacing every dot with a random letter and changing nothing else. Read the filled rows and columns for any rude or unintended word and swap those filler letters.
   - Cryptogram: choose a monoalphabetic substitution key in which no letter maps to itself, encode the text keeping spaces and punctuation, and give one or two starter letters for easier levels.
   - Anagrams and scrambles: each scramble uses exactly the letters of the answer and is not itself a real word; add the letter count and, for children, a theme hint.
   - Word ladder: change one letter per step, every step a real common word, with the minimum number of steps you know of.
   - Missing vowels and acrostics: follow the same theme and difficulty rules.
4. Verify before writing the final answer: trace every word-search word from its recorded start and direction letter by letter in the puzzle grid, and confirm the puzzle grid matches the solution grid on every non-dot cell; decode the whole cryptogram with your key; compare letter counts for every anagram; check every ladder step. Fix anything that fails, then verify again.
5. Write short instructions the solver can follow without help, and the answer key.
</task>

<constraints>
- Put grids and ciphertext in a code block so the letters line up when printed; separate grid letters with single spaces.
- Use one language consistently; if the theme is in another language, build the puzzle in that language and say so.
- For quotations in cryptograms, use well-known public-domain quotes or original sentences, with the attribution in the answer key.
- Never present an unverified puzzle; if something cannot be made to work (for example a word that will not fit), replace the word and say which.
</constraints>

<output_format>
## Puzzle
Title, then the puzzle in a code block and the word list where relevant.
## Instructions
One to three sentences.
## Answer key
Word search: the solution grid in a code block (dots for filler), then Word | Start (row, column) | Direction. Cryptogram: the plain text and the key. Others: numbered answers.
## Checks
One line confirming each verification step that was run, and any word you replaced.
</output_format>
