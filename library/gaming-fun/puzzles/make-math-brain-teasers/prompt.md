---
schema: 1
id: make-math-brain-teasers
kind: prompt
title: Make math brain teasers
description: Makes number and maths brain teasers for a chosen age, from magic squares to weighing puzzles, each checked for one answer, with hints, worked solutions and no ambiguous number sequences.
category: puzzles
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, parent, individual]
requires: [none]
inputs: [topic]
output: [quiz, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [math-puzzles, number-puzzles, brain-teaser, enrichment, puzzle-of-the-week]
pairs_with:
  prompts: [make-logic-puzzle, explain-puzzle-answer, write-riddles]
args:
  - name: audience
    description: Who will solve them, for example "8 to 9 year olds", "secondary school maths club" or "adults at a puzzle night". Sets the maths allowed.
    type: string
    required: true
  - name: count
    description: How many puzzles to make.
    type: number
    default: 6
  - name: types
    description: Optional puzzle types to include or avoid, for example "magic squares, weighing, age problems, no algebra".
    type: text
output_contract:
  format: markdown
  sections: [Maths allowed, Puzzles, Answers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write maths brain teasers for classrooms, clubs and puzzle nights. Good ones need only the maths the audience knows but reward insight over grinding: a magic square solved from the magic constant, a coin-weighing puzzle solved by splitting into three groups, a handshake problem that clicks when you count pairs. The two classic failures are wrong answer keys and ambiguous puzzles. "What comes next: 2, 4, 8, ...?" has no single answer (16 by doubling, 14 by adding increasing even numbers, and infinitely many others fit), so sequence puzzles must state the rule's family or give enough terms that one simple rule clearly wins. Word problems also hide ambiguity in phrases like "twice as old as she was when" or "between 1 and 10"; careful constructors state these exactly.

Audience: {{audience}}
Number of puzzles: {{count}}
{{#types}}Types: {{types}}{{/types}}
</context>

<task>
1. Decide the maths allowed for {{audience}} (for example, times tables but no fractions; or algebra and basic probability) and state it in one line.
2. Choose a varied set of puzzle types{{#types}}, following the types given{{/types}}: magic squares or number grids, missing-digit sums, weighing and measuring (jugs, scales), counting (handshakes, routes, combinations), age or coin problems, number properties (divisibility, primes), and visual-in-text puzzles such as number pyramids. Order from easiest to hardest.
3. Write each puzzle with exact wording: units, ranges ("from 1 to 10 inclusive") and what counts as an answer.
4. Solve each puzzle fully, then check: is the answer unique? Does any other reading of the wording give a different answer? For sequences, does another simple rule fit the terms given? Revise until each has one defensible answer.
5. Write a hint for each that points to the key idea without the calculation.
6. Write the answer key with a worked solution at the audience's level, plus one extension question for fast finishers.
</task>

<constraints>
- Every number in the answer key must be recomputed, not recalled.
- No puzzle may depend on a trick of wording the audience cannot be expected to spot, or on cultural knowledge (currency, measures) the audience may not share; use neutral units or say which are assumed.
- Keep reading load low for young children: short sentences, small numbers.
- Do not copy famous competition problems verbatim; adapt or write originals.
</constraints>

<output_format>
## Maths allowed
## Puzzles
Numbered, each with `Hint:` underneath.
## Answers
Numbered: answer, worked solution, extension.
</output_format>
