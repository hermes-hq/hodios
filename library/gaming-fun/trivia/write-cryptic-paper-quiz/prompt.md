---
schema: 1
id: write-cryptic-paper-quiz
kind: prompt
title: Write a cryptic take-home paper quiz
description: Writes a take-home paper quiz in which each cryptic or punning clue leads to an answer within one theme, such as films or places, with fair clue mechanics, an answer key and explanations.
category: trivia
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent, teacher]
requires: [none]
inputs: [topic, preferences]
output: [quiz, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [paper-quiz, cryptic-clues, puns, take-home, fundraiser-quiz, answer-key]
pairs_with:
  prompts: [write-crossword-clues, review-quiz-questions]
args:
  - name: theme
    description: What every answer is, for example "films", "towns in Yorkshire", "dog breeds" or "songs".
    type: text
    required: true
  - name: clues
    description: Number of clues.
    type: number
    default: 30
  - name: difficulty
    description: How cryptic the clues are.
    type: enum
    enum: [gentle, medium, tough]
    default: medium
output_contract:
  format: markdown
  sections: [Quiz sheet, Answer key, Clue checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write take-home paper quizzes, the kind sold for a small donation and solved over a week by families, often with a theme where every answer is, say, a film or a place. Each clue is a pun, a charade or a sound-alike that leads to the answer (for example, with films as the theme, "Like peas kept for later (6)" leads to Frozen, and "Parts that do the chin-wagging (4)" leads to Jaws). The genre lives or dies on fairness: every clue must point to one answer within the theme, the wordplay must parse when explained, and the answer's letter count helps solvers check themselves.

Theme: {{theme}}
Clues: {{clues}}
Difficulty: {{difficulty}}
</context>

<task>
1. Choose {{clues}} answers within {{theme}} that most solvers will have heard of. Avoid answers so obscure that even the explained clue will not satisfy.
2. Write one clue per answer using a mix of devices: puns, sound-alikes ("sounds like"), charades (parts joined), hidden words, definitions-by-description, and spoonerisms sparingly. Gentle: mostly descriptive with light puns. Medium: a mix. Tough: mostly wordplay.
3. Add the letter count in brackets after each clue, with word breaks, for example (3,4).
4. Order clues randomly, not by difficulty, as is traditional for paper quizzes, but make sure the first three are gentle so people get started.
5. Write an answer key with a one-line explanation of how each clue works.
6. Check every clue: one answer within the theme, wordplay that parses, no clue that works better for a different answer in the theme. Rewrite any that fail.
</task>

<constraints>
- Use only answers you are confident exist and are spelled as given; mark uncertain spellings [verify].
- No clues that rely on crude, cruel or stereotyped humour.
- If the theme is too narrow for {{clues}} well-known answers (for example "towns in a small county"), say so and write as many as it supports.
- Keep each clue under about 12 words.
</constraints>

<output_format>
## Quiz sheet
Title line, a one-line instruction, then numbered clues with letter counts and answer lines, ready to print.
## Answer key
Table: # | Answer | How the clue works.
## Clue checks
Any clues rewritten after checking, and any [verify] items.
</output_format>
