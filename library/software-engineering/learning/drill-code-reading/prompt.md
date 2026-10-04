---
schema: 1
id: drill-code-reading
kind: prompt
title: Drill code reading
description: Runs a code-reading game where the learner predicts what short snippets print or do, then gets the answer and the one concept they missed, with adaptive difficulty and a score.
category: learning
version: 1.0.0
status: incubating
stage: [learn]
role: [student, software-engineer]
subject: [computer-science]
requires: [none]
inputs: [preferences]
output: [quiz, explanation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [code-reading, predict-the-output, tracing, practice-game]
pairs_with:
  prompts: [quiz-big-o-complexity, explain-concept-with-code]
  personas: [coding-mentor]
args:
  - name: language
    description: The language to read, for example Python, JavaScript, Java, C or Go.
    type: string
    required: true
  - name: level
    description: Starting difficulty. beginner covers variables, conditions, loops and functions; intermediate adds references and mutation, scope, closures, exceptions and collections; advanced adds async ordering, generators, operator and equality quirks and concurrency.
    type: enum
    enum: [beginner, intermediate, advanced]
    default: beginner
  - name: rounds
    description: How many snippets to play.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Scorecard, Concepts to revisit]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a code-reading drill. Reading code is a separate skill from writing it, and learners improve fastest by predicting exactly what code does and then seeing where their mental model was wrong. A good snippet has one idea in it, a definite answer and a plausible wrong answer that reveals a misconception (off-by-one ranges, integer division, mutation through a shared reference, variable shadowing, short-circuit evaluation, default arguments, string immutability, event-loop order).

Language: {{language}}
Starting level: {{level}}
Rounds: {{rounds}}
</context>

<task>
1. Explain the rules in three lines: predict the exact output (or say what the function returns or does), give a one-line reason, `:hint` costs half a point, `:skip` reveals the answer, `:stop` ends the game. Then show round 1.
2. Each snippet is 3 to 12 lines of valid {{language}} with deterministic output (no randomness, time or unordered printing unless that is the lesson). Before showing it, trace it yourself line by line to fix the answer key, but do not show the key.
3. Score: exact output with sound reason 1 point; right output with a wrong or missing reason 0.5 (at beginner level, a missing reason still scores 1, but ask for one next time); wrong output 0. Accept trivial formatting differences (spaces, outputs on one line instead of several). If the snippet raises an error, the correct answer names the error and the line. Treat "I don't know", "just tell me" or similar as `:skip` (0 points), and a partial answer (for example the first two of three lines) as wrong but say which part was right.
4. After each answer, reveal the correct output, show a short trace of the lines that matter (variable values at the key steps), and name the one concept involved in a few words. If wrong, explain the misconception that produces their answer.
5. Adapt: after two correct answers in a row, step difficulty up; after two misses on the same concept, give an easier snippet on that concept before moving on. Rotate concepts so no two rounds in a row test the same idea unless remediating.
6. After the last round or `:stop`, show the scorecard and concepts to revisit.
</task>

<constraints>
- One snippet at a time; wait for the answer. Never reveal the answer before the learner answers or skips.
- Every answer key must come from tracing, not from guessing the snippet's shape. If a snippet's output depends on the language version, state the version.
- No trick questions that hinge on typos or deliberately misleading names; the challenge is the semantics.
- Keep feedback under about 120 words per round, encouraging and specific.
- If the learner's answer is ambiguous (for example "1 2 3 i think" when the output is on separate lines), accept the values and note the exact format once.
- If the language is one you cannot trace confidently (rare dialects, unusual versions), say so at the start and suggest a close mainstream language or version instead of guessing answer keys.
</constraints>

<output_format>
Each round: **Round N of {{rounds}}** (current score), the snippet in a code block, then "What does this print?" and wait.
Each reveal: Correct or Not quite (points), the output in a code block, a three to six step trace, and "Concept:" with a short name.

At the end:
## Scorecard
Table: round | concept | your answer | correct | points; then the total.

## Concepts to revisit
Up to three concepts missed, each with one sentence and a tiny practice idea.
</output_format>
