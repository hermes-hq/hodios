---
schema: 1
id: testsolve-puzzle
kind: prompt
title: Testsolve a puzzle you wrote
description: Testsolves a puzzle you made by solving it blind first, then reports ambiguities, alternate answers, guess points, errors and difficulty, with concrete fixes before you share it.
category: puzzles
version: 1.0.0
status: incubating
stage: [verify, review]
role: [individual, teacher, gamer]
requires: [none]
inputs: [text]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [testsolving, puzzle-construction, fairness-check, unique-solution, puzzle-editing]
pairs_with:
  prompts: [make-logic-puzzle, write-riddles, design-puzzle-hunt, write-crossword-clues]
args:
  - name: puzzle
    description: The puzzle exactly as solvers will see it, including the title, instructions and any flavour text.
    type: text
    required: true
  - name: intended_answer
    description: Your intended answer and solve path. Kept separate so the blind solve is honest; leave it out to get only the blind solve.
    type: text
  - name: audience
    description: Who will solve it, for example "office puzzle hunt, mixed experience" or "ten-year-olds in class".
    type: string
output_contract:
  format: markdown
  sections: [Blind solve, Answer, Faults found, Difficulty, Fixes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced puzzle testsolver and editor. Testsolving is how puzzle hunts, magazines and escape rooms catch broken puzzles: someone who has not seen the answer solves it cold and reports where they got stuck, what they guessed and what else could be the answer. The common faults are an alternate answer that also fits, a step that only works if you already know the intended idea, a missing or misleading instruction, an arithmetic or spelling error in the data, flavour text that points the wrong way, and an extraction step with no confirmation that the solver is on track. Constructors cannot see these in their own puzzles, which is why the blind solve comes first and the comparison second.

Puzzle as solvers see it:
{{puzzle}}

{{#audience}}Audience: {{audience}}{{/audience}}
</context>

<task>
1. Solve the puzzle blind, using only the text above. Log each step as a solver would: what you noticed, what you tried, where you stalled, and anything you had to guess. If you cannot finish, say where you stopped and why.
2. State your answer, or the candidates you are left with, and how confident you are.
3. {{#intended_answer}}Compare with the constructor's intended answer and path:
{{intended_answer}}
   Note every point where your path differed, and decide for each whether the puzzle or your solve was at fault.{{/intended_answer}}
4. Check for faults: alternate answers that fit all the given information; steps that need a leap the puzzle does not clue; ambiguous instructions or wording; factual, spelling or arithmetic errors in the data; red herrings that are unfair rather than tricky; extraction without confirmation (no checksum, no word that clearly emerges); and accessibility issues such as colour-only information.
5. Estimate difficulty and solve time for the audience (a general puzzle-solving audience if none is given), and say what the satisfying moment is, or that there is none yet.
6. For every fault, propose a specific fix: a reworded instruction, an added constraint, a changed data item, a confirmation step. Keep the constructor's idea; do not redesign the puzzle unless it cannot be saved.
</task>

<constraints>
- Do the blind solve honestly. Never claim you solved a step you only inferred from the puzzle's title or from the intended answer.
- When you say an alternate answer exists, show it in full against the clues; when you say a step is unclued, say what clue would justify it.
- Check facts and arithmetic in the puzzle, and mark anything you cannot verify as "unverified" rather than calling it wrong.
- Be direct about faults and specific about what works. Do not pad with praise.
</constraints>

<output_format>
## Blind solve
## Answer
## Faults found
## Difficulty
## Fixes
</output_format>
