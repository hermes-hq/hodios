---
schema: 1
id: play-hidden-word-game
kind: prompt
title: Play a hidden word guessing game
description: Runs a daily-style hidden word game with exact letter feedback after each guess, any language and word length, real-word checks and a short note on the word at the end.
category: puzzles
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, language-learner]
requires: [none]
inputs: [preferences]
output: [conversation]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [word-guessing, letter-feedback, vocabulary-practice, daily-puzzle, guessing-game]
pairs_with:
  prompts: [play-ghost-word-game, play-word-grouping-puzzle]
args:
  - name: word_length
    description: Letters in the hidden word, from 4 to 8.
    type: number
    default: 5
  - name: language
    description: Language of the hidden word and of valid guesses, for example "English", "Spanish" or "German".
    type: string
    default: English
  - name: guesses
    description: How many guesses the player gets.
    type: number
    default: 6
  - name: hard_mode
    description: When true, every letter already marked as correct or present must be used in later guesses, correct letters in the same position.
    type: boolean
    default: false
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a hidden-word guessing game of the daily-puzzle kind: the player guesses a word of fixed length and, after each guess, every letter is marked as in the right place, in the word but elsewhere, or not in the word. The game is only fun if the marking is exactly right, so you check each letter deliberately rather than at a glance, and you treat repeated letters by the standard rule.

Word length: {{word_length}}
Language: {{language}}
Guesses: {{guesses}}
Hard mode: {{hard_mode}}
</context>

<task>
1. If the word length is outside 4 to 8, or the language is one you cannot judge reliably, say so and suggest the nearest workable setting before starting.
2. Choose a common {{word_length}}-letter word in {{language}}: a dictionary word a confident speaker knows, not a proper noun, abbreviation or obscure inflection. Spell it out to yourself letter by letter to confirm the length.
3. Seal it: print `Sealed word (ROT13): ...`, encoding each letter with ROT13, and decode it back to check. If the language uses a non-Latin script, skip the seal and say so. Never change the word afterwards.
4. Explain the marks in one line: 🟩 right letter, right place; 🟨 in the word, wrong place; ⬛ not in the word.
5. For each guess:
   - Reject it without using a guess if it is the wrong length or not a real {{language}} word, and say why in a few words.
   - If hard mode is true, reject a guess that drops a revealed letter or moves a green one, and name the missing letter.
   - Mark it by the standard two-pass rule: first mark every exact position match green; then, left to right, mark a remaining letter yellow only if the hidden word still has an unmatched copy of that letter; everything else is grey. A letter guessed twice that appears once in the word gets one mark at most.
   - Before printing, check each position against the sealed word one letter at a time.
6. After each guess show the board so far and a letter tracker: letters confirmed in the word, letters ruled out.
7. On a correct guess or after the last guess, reveal the word, give its meaning in one line, one example sentence, and for a non-English game the English gloss. Show the result as a compact grid of squares the player could share, and offer another word.
</task>

<constraints>
- Never hint unless the player asks; a hint names one letter that is in the word and costs nothing but is noted in the result.
- Do not use the name of any commercial word game.
- Accented letters count as distinct letters only in languages where they are distinct in the alphabet (for example Spanish ñ); say which rule you apply at the start.
- Keep each turn to the board, the tracker and the guesses left.
</constraints>

<output_format>
Opening: settings, the seal line, the one-line key.
Each turn:
```
1. C R A N E
   ⬛ 🟨 ⬛ ⬛ 🟩
```
In the word: R, E | Ruled out: C, A, N | Guesses left: n
Ending: the word, meaning, example sentence, the shareable grid.
</output_format>
