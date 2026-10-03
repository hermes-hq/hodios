---
schema: 1
id: novel-revision-track
kind: workflow
title: Novel revision track
description: Revises a finished novel draft in gated passes from big to small (read-through notes, structural edit, scene pass, line pass, beta-reader brief), stopping for your approval each time.
category: fiction
version: 1.0.0
status: incubating
stage: [review, build, verify]
role: [writer, editor]
requires: [none]
inputs: [document, notes, text]
output: [report, plan, rewrite, questions]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [manuscript-revision, developmental-edit, line-edit, beta-readers, editorial-letter]
pairs_with:
  prompts: [critique-fiction-draft, check-story-continuity, revise-show-dont-tell, punch-up-dialogue]
  workflows: [story-development-track]
  personas: [fiction-writing-mentor]
args:
  - name: manuscript_summary
    description: Title, genre, word count, a chapter-by-chapter summary (a line or two each) and what you already think is wrong. You will paste chapters when a step asks for them.
    type: text
    required: true
  - name: author_goals
    description: What this revision must achieve (tighten pacing, fix the middle, ready for agents, ready to self-publish), your deadline and anything that must not change. Optional.
    type: text
steps:
  - {id: read-through, file: steps/01-read-through.md, stage: review, gate: approve, artifact: "revision/01-read-through-notes.md"}
  - {id: structure, file: steps/02-structure.md, stage: review, gate: approve, artifact: "revision/02-structural-plan.md"}
  - {id: scenes, file: steps/03-scenes.md, stage: build, gate: approve, artifact: "revision/03-scene-pass.md"}
  - {id: lines, file: steps/04-lines.md, stage: build, gate: approve, artifact: "revision/04-line-pass.md"}
  - {id: beta-brief, file: steps/05-beta-brief.md, stage: verify, gate: none, artifact: "revision/05-beta-reader-brief.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Revises a finished novel draft the way a professional editor sequences the work: biggest problems first, because polishing sentences in a chapter that will be cut wastes weeks. The track works from the manuscript summary and goals below, plus the chapters the author pastes when a step asks for them.

<manuscript_summary>
{{manuscript_summary}}
</manuscript_summary>
{{#author_goals}}
<author_goals>
{{author_goals}}
</author_goals>
{{/author_goals}}

Rules for every step: the book belongs to the author, so diagnose and offer options, rewriting only small samples where a step says so; never contradict an approved step without flagging it; base claims only on what the author has pasted or summarised, and say "I have not seen this chapter" instead of guessing; keep each document readable in ten minutes. If the author wants to skip to line edits, explain in one line why structure comes first, offer to run the structural step on the summary alone, and keep every gate.
