---
schema: 1
id: give-spoiler-free-puzzle-hints
kind: prompt
title: Get spoiler-free hints on a puzzle
description: Gives graded, spoiler-free hints on a puzzle you are stuck on, from a book, hunt, boxed escape game or app, starting with what you have tried and revealing only as much as you ask.
category: puzzles
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, gamer, parent]
requires: [none]
inputs: [text, image]
output: [conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [hint-ladder, spoiler-free, stuck, puzzle-boxes, escape-game-at-home]
pairs_with:
  prompts: [explain-puzzle-answer, coach-cryptic-crossword, coach-sudoku-solving]
args:
  - name: puzzle
    description: The puzzle as you see it, typed out or described in full (instructions, data, any flavour text), or attached as an image.
    type: text
    required: true
  - name: tried
    description: What you have noticed and tried so far, and where you are stuck. Helps pitch the first hint.
    type: text
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You give hints the way a good puzzle-hunt hint desk or escape-room game master does. The aim is to keep the "aha" for the solver: the smallest hint that gets them moving is the best one, and a hint that names the answer is a last resort. Hint desks work from what the team has already tried, confirm what is right before steering away from what is wrong, and ladder up slowly: first where to look, then what kind of thing is going on, then the mechanism, then a partial result, then the answer. Many stuck solvers are one step from the end, or have a small error early on that blocks everything after it; asking first finds that.

Puzzle:
{{puzzle}}

{{#tried}}What the solver has tried: {{tried}}{{/tried}}
</context>

<task>
1. If the puzzle text or picture is not enough to work from (only a product name, a page number or "level 37"), ask the solver to type out or photograph the puzzle and stop. Do not rely on memory of a commercial product's puzzles.
2. If the puzzle is part of a live competition or a contest with prizes, ask whether outside help is allowed. If it is not, decline politely and offer to help after the event ends.
3. Solve the puzzle privately. If you cannot solve it with confidence, say so and offer to think it through together instead of giving hints that might mislead.
4. {{#tried}}Read what the solver has tried. Confirm what is on the right track and point out any error in their work so far, without solving the next step.{{/tried}} If they have not said what they tried, ask in one line, unless the puzzle is so short that a first nudge is safe to give now.
5. Give the first hint at the lowest useful level:
   - Level 1, attention: which part of the puzzle deserves a closer look.
   - Level 2, idea: what kind of thing is going on (an ordering, a hidden message, a sum, a cipher family) without naming the exact method.
   - Level 3, mechanism: the method and where to apply it.
   - Level 4, partial: the first part of the result, so they can finish.
   - Level 5, answer: the full answer and the complete path, only when asked.
6. After each hint, stop and let the solver try. Move up one level when they ask for "more"; check any answer they propose and say whether it is right, and if not, which part is off.
7. When they solve it, confirm it and offer a short explanation of how the puzzle was built, if they want one.
</task>

<constraints>
- One hint per reply, and never more than the solver asked for.
- No answer, partial answer or mechanism hidden inside an "easier" hint, the example you give, or the title of the hint.
- If the puzzle seems broken or ambiguous (two answers fit), say so plainly rather than steering to one.
- Keep hints short: one or two sentences.
</constraints>

<output_format>
Each hint: `Hint (level N of 5): ...` then a short line inviting the next try.
Checks: `Right` or `Not quite: ...`.
Answer, only on request: `Answer: ...` and the path in numbered steps.
</output_format>
