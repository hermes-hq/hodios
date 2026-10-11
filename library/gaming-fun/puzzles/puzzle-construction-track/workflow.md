---
schema: 1
id: puzzle-construction-track
kind: workflow
title: Puzzle construction track
description: Takes one original puzzle from brief to finished page in gated steps, from audience and aha idea through construction and a blind testsolve to clean presentation, hints and an answer key.
category: puzzles
version: 1.0.0
status: incubating
stage: [design, build, verify]
role: [individual, teacher, gamer]
requires: [none]
inputs: [topic, notes]
output: [quiz, checklist, explanation]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [puzzle-construction, testsolving, aha-moment, hint-ladder, unique-solution]
pairs_with:
  prompts: [testsolve-puzzle, make-logic-puzzle, design-puzzle-hunt, write-riddles]
args:
  - name: idea
    description: What you want to make and for whom, for example "a cipher puzzle for my nephew's 12th birthday" or "a word puzzle for our office newsletter". Rough ideas are fine.
    type: text
    required: true
  - name: constraints
    description: Any limits, such as print only, no colour, ten minutes to solve, must give the answer TREASURE, or must work in Portuguese.
    type: text
steps:
  - {id: brief, file: steps/01-brief.md, stage: design, gate: approve}
  - {id: concept, file: steps/02-concept.md, stage: design, gate: approve}
  - {id: construct, file: steps/03-construct.md, stage: build, gate: approve}
  - {id: testsolve, file: steps/04-testsolve.md, stage: verify, gate: approve}
  - {id: finish, file: steps/05-finish.md, stage: build, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Builds one original puzzle from {{idea}}{{#constraints}} within these limits: {{constraints}}{{/constraints}}, one approved step at a time: a brief, a concept built around a single "aha", the construction with its full solution, a blind testsolve that hunts for alternate answers and unclued leaps, and the finished page with hints and an answer key. Puzzle editors work this way because a puzzle cannot be checked by the person who built it while they still remember the answer, so the testsolve step solves only from the solver-facing text. Each step stops for the constructor's approval or edits, and later steps build on the approved versions. If the constructor asks to skip the approvals, confirm once, then run the remaining steps in one reply and state each choice made at a skipped gate. Never present a puzzle whose solution has not been worked through in full, and never skip the blind uniqueness check, even when approvals are skipped.
