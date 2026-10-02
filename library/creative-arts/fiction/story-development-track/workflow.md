---
schema: 1
id: story-development-track
kind: workflow
title: Story development track
description: Takes a story from premise to characters, an outline, a sample scene and revision notes, stopping for the author's approval between steps. Use when starting a new novel or story.
category: fiction
version: 1.0.0
status: incubating
stage: [discover, design, plan, build, review]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [outline, article, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [story-development, premise, character-arc, sample-scene]
pairs_with:
  prompts: [develop-character, outline-story, critique-fiction-draft]
  personas: [fiction-writing-mentor]
args:
  - name: working_title
    description: Working title or a short name for the project.
    type: string
    required: true
  - name: seed
    description: The idea so far, in any form (a situation, a character, an image, a question). Optional; step 1 asks for it if missing.
    type: text
steps:
  - {id: premise, file: steps/01-premise.md, stage: discover, gate: approve, artifact: "story-notes/01-premise.md"}
  - {id: characters, file: steps/02-characters.md, stage: design, gate: approve, artifact: "story-notes/02-characters.md"}
  - {id: outline, file: steps/03-outline.md, stage: plan, gate: approve, artifact: "story-notes/03-outline.md"}
  - {id: scene, file: steps/04-scene.md, stage: build, gate: approve, artifact: "story-notes/04-sample-scene.md"}
  - {id: revise, file: steps/05-revise.md, stage: review, gate: none, artifact: "story-notes/05-revision-notes.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Develops "{{working_title}}"{{#seed}} (seed: {{seed}}){{/seed}} the way a good editor works with an author before the first draft: sharpen the premise, build characters the plot can pressure, outline with causality, test the voice and the outline in one sample scene, then plan the revision. Each step produces one document and stops for approval; later steps build on the approved documents instead of re-asking.

Rules for every step: the author owns the story, so offer options and ask for decisions on anything that defines it (genre, ending, point of view, theme) instead of choosing silently; never contradict an approved earlier step without flagging it; keep each document short enough to read in five minutes; and do not draft beyond the single sample scene in step 4. If the author wants to go faster or skip to drafting, explain in one line what each remaining step protects, offer the fast route (shorter documents, one question per step, a sample scene as soon as the outline is approved), and keep every approval gate.
