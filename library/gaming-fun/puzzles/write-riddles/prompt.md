---
schema: 1
id: write-riddles
kind: prompt
title: Write riddles
description: Writes original riddles graded by difficulty and pitched to the solvers' age, each with one fair answer, two hints that narrow it down and a check that no other answer fits.
category: puzzles
version: 1.0.0
status: incubating
stage: [build]
role: [parent, teacher, individual]
requires: [none]
inputs: [topic, preferences]
output: [quiz, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [riddle-writing, brain-teasers, word-play, party-game, treasure-hunt]
pairs_with:
  prompts: [create-escape-room-puzzles, make-logic-puzzle, write-crossword-clues]
args:
  - name: theme
    description: A theme or set of answers to build riddles around, for example "kitchen objects", "the ocean", "Halloween", or clues for a treasure hunt in a house. Optional.
    type: string
    default: everyday objects and nature
  - name: age
    description: Who will solve them, for example "6-year-olds", "9 to 11", "teens", "adults at a party", "mixed family".
    type: string
    default: mixed family, ages 8 and up
  - name: count
    description: How many riddles to write.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Riddles, Hints, Answers, Notes for the host]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write riddles. A good riddle describes something truthfully in a misleading way: every line is literally true of the answer, but suggests something else until the solver sees it. It has one best answer that, once heard, makes the solver groan or laugh because it was fair. The classic techniques are personification ("I have a face but no eyes"), double meanings of words (a "bark", "keys", a "bank"), paradox ("the more you take, the more you leave behind"), and describing a familiar thing from an unusual angle. Younger solvers need concrete objects and simple wordplay; older solvers enjoy abstract answers and layered double meanings.

Theme: {{theme}}
Solvers: {{age}}
Number of riddles: {{count}}
</context>

<task>
1. Write {{count}} original riddles on the theme, ordered from easiest to hardest, roughly a third easy, a third medium and a third hard for this age group. Label each with its difficulty.
2. Use a mix of techniques and forms: short rhyming riddles, "I am…" riddles, "What has…?" riddles, and one or two that need lateral thinking. Keep them short: two to four lines.
3. For each riddle, write two hints: the first narrows the field (where you find it, what category it is), the second nearly gives it away.
4. Check each riddle for fairness before including it: every clue must be true of the answer, and no other common answer should fit all the clues equally well. If another answer fits, add a line that rules it out or replace the riddle. Note any acceptable alternative answer.
5. Add notes for the host: which riddles work best read aloud, which suit a treasure hunt or a party round, and how to reveal answers to keep it fun.
</task>

<constraints>
- Original riddles only. Do not reproduce well-known traditional riddles (for example the Sphinx's riddle, "What has keys but can't open locks?" or "The more you take, the more you leave behind") unless the user asks for classics; if a new riddle is close to a famous one, rework it.
- Vocabulary and references must suit the age; for young children, avoid wordplay that depends on words they will not know.
- Nothing scary, gross or mean beyond what the age and theme suit (Halloween can be spooky; not gory for young children).
- Keep answers to a common word or short phrase solvers know.
- If the theme is a treasure hunt, make each answer a real place or object in the setting described and note the order.
</constraints>

<output_format>
## Riddles
Numbered, each with its difficulty in brackets.
## Hints
Numbered to match: Hint 1, Hint 2.
## Answers
Numbered to match, with any acceptable alternative.
## Notes for the host
</output_format>
