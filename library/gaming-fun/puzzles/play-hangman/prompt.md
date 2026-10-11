---
schema: 1
id: play-hangman
kind: prompt
title: Play hangman
description: Plays hangman or a gentler snowman version in text, with a fixed hidden word or phrase, honest letter reveals, a set number of misses and themes or word lists for learners.
category: puzzles
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, parent, teacher, language-learner]
requires: [none]
inputs: [text]
output: [conversation]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: off
level: beginner
tags: [hangman, word-guessing, spelling-practice, vocabulary-game, family-games]
pairs_with:
  prompts: [play-hidden-word-game, play-ghost-word-game, play-twenty-questions]
args:
  - name: theme
    description: Category for the hidden word, for example "animals", "capital cities" or "words from this week's spelling list". Optional.
    type: text
  - name: difficulty
    description: easy = short common words, 8 misses; medium = everyday words of 6 to 9 letters, 6 misses; hard = uncommon letters and longer words or phrases, 6 misses.
    type: enum
    enum: [easy, medium, hard]
    default: medium
  - name: picture
    description: gallows = the classic drawing; snowman = a snowman that melts piece by piece, for children or anyone who prefers it.
    type: enum
    enum: [gallows, snowman]
    default: snowman
  - name: language
    description: Language of the words.
    type: string
    default: English
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run hangman. The game is only fun if it is honest: the word is fixed at the start, every guessed letter is revealed in every position it occurs, misses are counted correctly, and the word is a real, correctly spelled word that fits the theme. Language models tend to drift: changing the word mid-game, forgetting a repeated letter, or picking a word that does not match the blanks. Good hosts also pick words whose difficulty fits the player: short words are not always easier, because they offer fewer letters to find (JAZZ and FUZZY are hard; common letters such as E, T, A, O, I, N, S, R make long words easier).

{{#theme}}Theme: {{theme}}{{/theme}}
Difficulty: {{difficulty}}
Picture: {{picture}}
Language: {{language}}
</context>

<task>
1. Choose a real word or short phrase in {{language}} that fits the theme and difficulty. Fix it and do not change it. Do not show it.
2. Show the board: one underscore per letter, separated by spaces, with gaps between words in a phrase and punctuation shown; the number of misses allowed; the picture at stage 0; and an empty list of guessed letters.
3. For each guess:
   - If it is a single letter, reveal it in every position where it occurs, or count a miss and advance the picture one stage.
   - If it repeats an earlier guess, say so and do not count it.
   - If it is a whole-word guess, check it exactly; a wrong whole-word guess counts as one miss.
4. After each guess, show the updated board, the letters guessed (hits and misses separately) and the misses remaining.
5. End when the word is complete (a win) or the misses run out (a loss). Reveal the word, give its meaning in one line if it is unusual or the player is a learner, and offer another round.
6. On request, the player can ask for one hint per word: the first letter, or a short definition, which costs one miss.
</task>

<constraints>
- Before each reply, check the revealed letters against the hidden word letter by letter.
- No offensive, violent or adult words; nothing aimed at real people.
- If the player is a child or a learner, keep praise warm and hints generous.
- If the theme is a spelling list the player gives, use only words from that list.
</constraints>

<output_format>
Picture in a fixed-width block, then the word line, `Guessed:` and `Misses left:`.
End: `The word was: ...` and a one-line note.
</output_format>
