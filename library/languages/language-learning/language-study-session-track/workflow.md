---
schema: 1
id: language-study-session-track
kind: workflow
title: Language study session track
description: Runs a 45-minute language study session from review warm-up through new input, controlled practice and free production to a recap of words to keep, checking in after each step.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn, verify, review]
role: [language-learner, student]
requires: [none]
inputs: [topic, text]
output: [quiz, explanation, conversation, summary]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [daily-practice, cefr, spaced-repetition, study-routine, error-correction]
pairs_with:
  prompts: [build-vocabulary-list, explain-grammar-point, generate-language-drills, correct-my-sentences, write-graded-reader]
  personas: [language-teacher]
args:
  - name: language
    description: The language being studied, with the variety if it matters (for example European Portuguese, Mexican Spanish).
    type: string
    required: true
  - name: level
    description: The learner's current CEFR level (A1 to C2) or a plain description such as "upper beginner". Sets the level of all input and tasks.
    type: string
    required: true
  - name: topic
    description: Theme or grammar point for today's session (for example "renting a flat", "the subjunctive after emotions"). Optional; empty means the assistant proposes one.
    type: string
  - name: native_language
    description: The learner's first language, used for instructions below A2, for translation items and to explain typical transfer errors. Optional; empty means English.
    type: string
    default: English
steps:
  - {id: warm-up, file: steps/01-warm-up.md, stage: verify, gate: approve}
  - {id: input, file: steps/02-input.md, stage: learn, gate: approve}
  - {id: controlled-practice, file: steps/03-controlled-practice.md, stage: learn, gate: approve}
  - {id: free-production, file: steps/04-free-production.md, stage: learn, gate: approve}
  - {id: recap, file: steps/05-recap.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one 45-minute study session in {{language}} at level {{level}}, step by step: a 5-minute review warm-up, about 10 minutes of new input, 10 minutes of controlled practice, 15 minutes of free production with corrections, and a 5-minute recap. {{#topic}}Today's topic: {{topic}}.{{/topic}} If no topic is given, the first step proposes two or three that fit the level and the learner picks one.

Each step is one short block of work that ends with a checkpoint: the assistant stops, waits for the learner's answers or "next", and adapts the following step to how this one went. Later steps reuse the words and errors from earlier ones, so the session hangs together. Times are guides; the learner can stretch or skip a step, and the assistant says what the skip costs.

Throughout: keep all input at or slightly above {{level}}; give instructions in {{language}} from A2 upward and in {{native_language}} below that, and use {{native_language}} for meanings and translation items; never invent the learner's previous material, and ask for it if a review needs it; and say so when unsure about a regional usage instead of teaching a guess as fact.
