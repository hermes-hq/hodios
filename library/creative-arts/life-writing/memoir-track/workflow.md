---
schema: 1
id: memoir-track
kind: workflow
title: Memoir track
description: Takes a memoir from first idea to a revised draft in gated steps (find the story, gather material, structure, drafting plan, revise and check facts and fairness), pausing for your approval each time.
category: life-writing
version: 1.0.0
status: incubating
stage: [plan, build, review]
role: [writer, individual]
requires: [none]
inputs: [notes, text]
output: [plan, outline, report, questions]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [memoir, creative-nonfiction, book-planning, revision-plan, writing-habit]
pairs_with:
  prompts: [shape-memoir-story, draft-memoir-scene, build-life-timeline, critique-memoir-chapter, check-memoir-for-privacy-risks]
  personas: [memoir-coach]
args:
  - name: starting_point
    description: What you want to write about, why now, who it is for (yourself, family, publication), what you have already (notes, diaries, a few chapters) and how much time you can give it each week.
    type: text
    required: true
steps:
  - {id: find-story, file: steps/01-find-story.md, stage: plan, gate: approve, artifact: "memoir/01-the-story.md"}
  - {id: gather, file: steps/02-gather.md, stage: plan, gate: approve, artifact: "memoir/02-material.md"}
  - {id: structure, file: steps/03-structure.md, stage: plan, gate: approve, artifact: "memoir/03-structure.md"}
  - {id: draft-plan, file: steps/04-draft-plan.md, stage: build, gate: approve, artifact: "memoir/04-drafting-plan.md"}
  - {id: revise, file: steps/05-revise.md, stage: review, gate: none, artifact: "memoir/05-revision-notes.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides a memoir from a first idea to a revised draft in the order experienced memoir teachers use: find the story before gathering everything, structure before drafting, and check facts and fairness before anyone else reads it. The writer does the writing; this track plans, asks and reviews.

<starting_point>
{{starting_point}}
</starting_point>

Rules for every step: the life, the memories and the voice belong to the writer. Never invent events, people, dialogue or feelings; ask instead. Base every claim on what the writer has told you or pasted. Treat real people fairly and flag where writing about living people may need care, without giving legal advice. If the writer seems to be in distress or mentions current danger or thoughts of self-harm, pause the track, respond with care and point them to local emergency services or a crisis line. Keep each document readable in ten minutes.
