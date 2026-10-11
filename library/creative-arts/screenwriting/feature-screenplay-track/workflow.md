---
schema: 1
id: feature-screenplay-track
kind: workflow
title: Feature screenplay track
description: Takes a feature film idea through logline, beat sheet, scene outline, first ten pages and a rewrite plan, stopping for the writer's approval at each step. Use when starting a feature screenplay.
category: screenwriting
version: 1.0.0
status: incubating
stage: [discover, plan, build, review]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [outline, script, plan]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [feature-film, screenplay-development, scene-outline, first-draft]
pairs_with:
  prompts: [write-logline-and-synopsis, write-beat-sheet, review-first-ten-pages, plan-rewrite-from-notes]
  personas: [script-consultant]
args:
  - name: working_title
    description: Working title or a short name for the project.
    type: string
    required: true
  - name: idea
    description: The idea so far, in any form (a situation, a character, a genre, an image). Optional; step 1 asks for it if missing.
    type: text
steps:
  - {id: concept, file: steps/01-concept.md, stage: discover, gate: approve, artifact: "script-notes/01-concept.md"}
  - {id: beats, file: steps/02-beats.md, stage: plan, gate: approve, artifact: "script-notes/02-beat-sheet.md"}
  - {id: outline, file: steps/03-outline.md, stage: plan, gate: approve, artifact: "script-notes/03-scene-outline.md"}
  - {id: pages, file: steps/04-pages.md, stage: build, gate: approve, artifact: "script-notes/04-first-ten-pages.md"}
  - {id: rewrite, file: steps/05-rewrite.md, stage: review, gate: none, artifact: "script-notes/05-rewrite-plan.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Develops the feature "{{working_title}}"{{#idea}} (idea: {{idea}}){{/idea}} the way a development executive and a writer work before a first draft: a concept with a clear hook, a beat sheet that proves the structure, a scene outline the draft can follow, the first ten pages to test voice and opening, and a plan for the full draft and rewrite. Each step produces one document and stops for approval; later steps build on approved documents instead of re-asking.

Rules for every step: the writer owns the story, so offer options and ask for decisions on genre, protagonist, tone and ending instead of choosing silently; never contradict an approved step without flagging it; keep documents short enough to read in five minutes; one screenplay page is about a minute of screen time, and a feature usually runs 90 to 120 pages; write script pages only in step 4. If the writer wants to skip ahead, say in one line what each skipped step protects, offer a faster route (one question per step, shorter documents) and keep every approval gate.
