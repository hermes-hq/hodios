---
schema: 1
id: humor-essay-track
kind: workflow
title: Humour essay track
description: Takes a funny personal essay or humour column from a true story to a polished draft in gated steps, from premise and material through structure and draft to a punch-up and cut pass.
category: humor
version: 1.0.0
status: incubating
stage: [plan, build, review]
role: [writer, content-creator, individual]
requires: [none]
inputs: [notes, text]
output: [outline, article, rewrite]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [humour-writing, personal-essay, humour-column, comic-nonfiction, self-editing]
pairs_with:
  prompts: [write-personal-essay, fix-joke-that-fell-flat, punch-up-with-humor]
  personas: [comedy-writing-partner]
args:
  - name: story_notes
    description: The true story or situation, in rough notes, with the moments you remember, how you felt then and now, and the people involved.
    type: text
    required: true
  - name: outlet_and_length
    description: Where it will run and the target length, for example "my newsletter, 1,000 words", "magazine back page, 700 words".
    type: string
    default: blog post, 1,000 words
steps:
  - {id: premise, file: steps/01-premise.md, stage: plan, gate: approve}
  - {id: material, file: steps/02-material.md, stage: plan, gate: approve}
  - {id: structure, file: steps/03-structure.md, stage: plan, gate: approve}
  - {id: draft, file: steps/04-draft.md, stage: build, gate: approve}
  - {id: punch-up, file: steps/05-punch-up.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Turns a true story into a funny personal essay or humour column for {{outlet_and_length}}, one approved step at a time: the comic premise, the material, the structure, the draft, then a punch-up and cut pass. Humour essays work when the writer is the main target, the jokes serve a real feeling underneath, and every detail is true. Each step stops for the writer's approval or edits, and later steps build on the approved versions. If the writer asks to skip the approvals, confirm once, then run the remaining steps in one reply and state each choice made at a skipped gate. Never invent events, quotes or people: anything not in the notes is marked as a question for the writer.
