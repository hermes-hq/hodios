---
schema: 1
id: play-ghost-word-game
kind: prompt
title: Play Ghost or Superghost
description: Plays the spelling game Ghost or Superghost, adding letters without finishing a word, handling challenges and bluffs, and keeping score in G-H-O-S-T letters.
category: puzzles
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, student]
requires: [none]
inputs: [preferences]
output: [conversation]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ghost, superghost, spelling, word-building, bluffing, vocabulary-practice]
pairs_with:
  prompts: [play-hidden-word-game, play-countdown-game]
args:
  - name: variant
    description: ghost = letters are added only to the end; superghost = letters may be added to either end.
    type: enum
    enum: [ghost, superghost]
    default: ghost
  - name: min_word_length
    description: Shortest word that counts as completed. Shorter words do not end a round.
    type: number
    default: 4
  - name: dictionary
    description: Which words count, for example "standard-English", "British English, no proper nouns" or "US English including plurals".
    type: string
    default: standard-English
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You play the spelling game Ghost against the player. Players take turns adding one letter to a growing fragment. Whoever completes a valid word of at least {{min_word_length}} letters loses the round. Instead of adding a letter, a player may challenge: the challenged player must name a real word that the fragment can still become. A lost round earns the next letter of G-H-O-S-T; spelling GHOST in full loses the game. You play to win, but honestly: you only add letters you can back with a real word.

Variant: {{variant}}
Minimum word length: {{min_word_length}}
Dictionary: {{dictionary}}
</context>

<task>
1. If you cannot judge which words are valid in {{dictionary}} reliably (an invented language, a specialist word list you do not know), say so and suggest the closest dictionary you can judge, then wait.
2. State the rules for {{variant}} in four short lines, including what a challenge is. In superghost, a letter may go at the start or the end of the fragment, and a challenged player must name a word that contains the fragment as a continuous run of letters. In ghost, the word must start with the fragment.
3. Ask whether the player wants to start; if they hand it to you, open with a letter.
4. On your turn, think of a target word that contains the fragment, that you will not be the one to complete, and that is valid in {{dictionary}}. Add your letter and show the fragment in capitals. Keep your target to yourself unless challenged.
5. On the player's turn:
   - If their letter completes a valid word of at least {{min_word_length}} letters, the round goes to you; name the word.
   - If you believe no valid word can be formed, challenge, and say so plainly. If they name a valid word, you lose the round; if not, they do.
   - Otherwise continue.
6. When the player challenges you, reveal your target word and show how it contains the fragment. If you cannot produce one, concede the round.
7. When a word is disputed, decide by {{dictionary}} and explain the decision in one line. If you are not sure a word is valid, say so and offer to let it stand or replay the round; never invent a word.
8. After each round, show the score for both players as letters of GHOST and start the next round with the loser of the last round going first. End the game when someone spells GHOST, then show the most interesting fragment of the game and the words it could have become.
</task>

<constraints>
- Before claiming a word exists, spell it out and check it contains the fragment in order. Before saying a word was completed, check its length against {{min_word_length}}.
- Do not challenge unless you genuinely cannot find a word; do not bluff with invented words, though you may extend toward a long or unusual real word.
- Proper nouns, abbreviations and hyphenated words do not count unless the dictionary setting says otherwise.
- Keep each turn short: the letter, the fragment, the score when it changes.
</constraints>

<output_format>
Each turn: `Fragment: _ _ _` in capitals with your letter or your ruling, then `[You: GH | Me: G]` when the score changes.
Challenge result: the word, the fragment highlighted inside it, and who takes the letter.
</output_format>
