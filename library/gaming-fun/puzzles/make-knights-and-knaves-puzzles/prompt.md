---
schema: 1
id: make-knights-and-knaves-puzzles
kind: prompt
title: Make knights and knaves puzzles
description: Writes truth-teller and liar logic puzzles (knights, knaves and optional spies), checks every possible assignment so each has exactly one answer, and adds hints and worked solutions.
category: puzzles
version: 1.0.0
status: incubating
stage: [build]
role: [individual, teacher, gamer]
requires: [none]
inputs: [topic]
output: [quiz, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [knights-and-knaves, truth-tellers-and-liars, deduction, brain-teaser, logic-class]
pairs_with:
  prompts: [make-logic-puzzle, write-lateral-thinking-puzzles, testsolve-puzzle]
args:
  - name: count
    description: How many puzzles to write.
    type: number
    default: 5
  - name: difficulty
    description: easy = two speakers, direct claims; medium = three speakers, claims about each other and "at least one"; hard = three or four speakers, conditionals, counting claims or a spy who may say anything.
    type: enum
    enum: [easy, medium, hard]
    default: medium
  - name: theme
    description: Optional setting, for example "a pirate island" or "a school council". The logic stays standard.
    type: string
output_contract:
  format: markdown
  sections: [Rules, Puzzles, Answers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write knights and knaves puzzles, the genre made famous by Raymond Smullyan: on an island, knights always tell the truth and knaves always lie, and the solver deduces who is which from what they say. Variants add spies (or "normals") who may say anything. The craft is in two things. First, every puzzle must have exactly one consistent assignment, which the constructor proves by checking all of them: with n speakers that are each knight or knave there are only 2^n cases, so there is no excuse for skipping the check. Second, good puzzles use the genre's classic levers: no one can say "I am a knave" (a knight would be lying, a knave would be telling the truth); "we are the same type" said by A about B means B is a knight; and compound claims ("A or B is a knave") reward careful reading of "or". Weak puzzles have no answer, several answers, or one obvious claim that settles everything.

Number of puzzles: {{count}}
Difficulty: {{difficulty}}
{{#theme}}Theme: {{theme}}{{/theme}}
</context>

<task>
1. State the rules once at the top, in plain words, including whether spies or normals appear and what "or" means (inclusive unless stated).
2. For each puzzle, choose the hidden assignment first, then write each speaker's statement so that it is true when spoken by a knight and false when spoken by a knave in that assignment.
3. Verify each puzzle by brute force: list every possible assignment (2^n for knights and knaves; more with spies) in a compact truth table, mark each as consistent or not, and keep the puzzle only if exactly one assignment is consistent. With spies, also check that the spy's statements fit their role as stated in the rules (for example, exactly one spy).
4. If a puzzle has zero or several consistent assignments, change a statement and verify again. Do not present it until the table shows one.
5. Order the puzzles from easiest to hardest and vary the levers: self-reference, claims about others, "same type" claims, "at least one" and "exactly one" counts, and conditionals at hard level.
6. Write a short hint for each puzzle that points at the key statement without solving it.
7. Write the answer key with a short human-style deduction for each, followed by the verification table.
</task>

<constraints>
- Every statement must have a definite truth value in every assignment. No questions, commands or vague claims ("A is kind of honest").
- Keep names short and distinct; no two speakers whose names could be confused.
- Do not reuse Smullyan's published puzzles word for word; write original ones.
- Answers and tables go after all puzzles, not beside them.
</constraints>

<output_format>
## Rules
## Puzzles
Numbered, each with its statements and a `Hint:` line.
## Answers
For each puzzle: the assignment, the deduction in 2 to 5 steps, and the truth table with the single consistent row marked.
</output_format>
