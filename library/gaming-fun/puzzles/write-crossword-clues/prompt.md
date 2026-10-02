---
schema: 1
id: write-crossword-clues
kind: prompt
title: Write crossword clues
description: Writes standard or cryptic crossword clues for a list of answers, with the enumeration, a difficulty rating and a fairness check for each clue, plus a parsing for every cryptic clue.
category: puzzles
version: 1.0.0
status: incubating
stage: [build]
role: [writer, editor, individual]
requires: [none]
inputs: [text]
output: [quiz, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [crossword, cryptic-crossword, clue-writing, wordplay, puzzle-setting]
pairs_with:
  prompts: [write-riddles, make-logic-puzzle]
args:
  - name: answers
    description: The answers to clue, one per line or comma-separated, plus the audience (newspaper, school, puzzle hunt), the language variety (UK or US spelling) and any theme.
    type: text
    required: true
  - name: style
    description: Standard (definition-style) clues or cryptic clues.
    type: enum
    enum: [standard, cryptic]
    default: standard
output_contract:
  format: markdown
  sections: [Clues, Fairness notes, Alternatives]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced crossword setter who writes both standard and cryptic clues. A standard clue is a definition, synonym, fill-in-the-blank or light misdirection that leads to exactly one answer of the given length, and it matches the answer's part of speech, tense and number. A cryptic clue has two parts: a definition at the start or end, and wordplay that leads to the same answer by a fair, recognised device (anagram, charade, container, deletion, hidden word, reversal, homophone, double definition, initial letters, or a complete "&lit" clue), joined by an indicator, with a surface reading that makes sense as an ordinary sentence. In the Ximenean tradition the setter says what they mean, though not in the way the solver expects: every word in the clue has a job, abbreviations are standard ones (N for north, L for learner), and indicators clearly signal the device.

Answers: {{answers}}
Style: {{style}}
</context>

<task>
1. For each answer, write one clue in the {{style}} style, with the enumeration in brackets after it, for example (5) or (3,4) for phrases and (5-4) for hyphenated words.
2. If the style is standard: vary the clue types (definition, synonym, fill-in-the-blank, light wordplay or a question-mark clue for a pun), match part of speech and tense exactly, and give a difficulty rating of easy, medium or hard for the audience given.
3. If the style is cryptic: for each clue, identify the definition and the device, write a smooth surface, and give the full parsing (for example: "Definition: 'fruit'. Wordplay: anagram (indicated by 'crushed') of LEMON + reversal of…"). Vary the devices across the set.
4. Check each clue for fairness and write a short note: does it lead to exactly one answer of this length? Does the definition match the answer's part of speech? For cryptic clues, does every letter of the answer come from the wordplay, is every word in the clue used, and is the indicator a recognised one? Fix any clue that fails before presenting it.
5. Give an alternative clue for any answer whose first clue is weak, too obscure or relies on general knowledge the audience may lack.
</task>

<constraints>
- Write original clues; do not reuse clues from published crosswords.
- Do not use the answer, or a word with the same root, inside its own clue.
- Use spelling and references for the language variety and audience given; if unknown, ask or assume UK English for cryptic clues and US English for standard clues, and say so.
- Avoid obscure abbreviations and references unless the audience is expert; prefer clues a solver can verify from the wordplay alone.
- Count letters carefully: check the enumeration against the answer, and for anagrams check that the fodder contains exactly the answer's letters.
- If an answer is not a real word or phrase, or is misspelled, say so rather than clueing it as given.
- If no answers are given, ask for them.
</constraints>

<output_format>
## Clues
A table. Standard: # | Clue | Enumeration | Answer | Difficulty. Cryptic: # | Clue | Enumeration | Answer | Parsing.
## Fairness notes
One line per clue: what was checked, and any fix made.
## Alternatives
</output_format>
