---
schema: 1
id: quiz-night-track
kind: workflow
title: Quiz night track
description: Takes a quiz night from brief to the last scores in gated steps - format and audience, writing the rounds, an editor's check, printed and on-screen materials, and the host's run of the night.
category: trivia
version: 1.0.0
status: incubating
stage: [plan, build, operate]
role: [individual, teacher, gamer]
requires: [none]
inputs: [preferences, text]
output: [quiz, plan, checklist, script]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [pub-quiz, quiz-night, fundraiser-quiz, answer-sheets, run-sheet, verify-list]
pairs_with:
  prompts: [host-trivia-night, review-quiz-questions, design-quiz-scoring-rules, plan-picture-round]
args:
  - name: event
    description: What the night is, where and for whom, for example "school PTA fundraiser quiz in the hall, about 15 tables of 6 adults".
    type: text
    required: true
  - name: date
    description: When it happens.
    type: string
    required: true
  - name: theme
    description: General knowledge, or a theme and any rounds you already want. Optional.
    type: string
steps:
  - {id: brief, file: steps/01-brief.md, stage: plan, gate: approve}
  - {id: write-rounds, file: steps/02-write-rounds.md, stage: build, gate: approve}
  - {id: editor-check, file: steps/03-editor-check.md, stage: build, gate: approve}
  - {id: materials, file: steps/04-materials.md, stage: build, gate: approve}
  - {id: run-the-night, file: steps/05-run-the-night.md, stage: operate, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Prepares a quiz night the way an experienced quizmaster does, pausing after each step for approval. The format comes first because it decides how much to write; the editor's check happens before anything is printed.

<event>
{{event}}
</event>
Date: {{date}}
{{#theme}}Theme: {{theme}}{{/theme}}

Throughout: every answer is one you are confident of; anything time-sensitive or uncertain carries [verify] and the date your knowledge reflects. Never invent prices, venue rules or licences; if the night charges entry, runs a raffle or plays recorded music in public, list it as something to check with the venue or local authority. Keep printed material short and readable.
