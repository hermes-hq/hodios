---
schema: 1
id: video-production-track
kind: workflow
title: Video production track
description: Takes a video from idea to hook, script, title and thumbnail, and description, pausing for approval between steps. Use when producing a YouTube video end to end.
category: video
version: 1.0.0
status: incubating
stage: [plan, build, ship]
role: [content-creator, marketer]
stack: [youtube]
requires: [none]
inputs: [topic, notes]
output: [ideas, script, copy]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [audience-retention, hooks, packaging, video-description]
pairs_with:
  prompts: [write-video-hooks, write-youtube-script, package-video-title-thumbnail, write-video-chapters]
  personas: [content-strategist]
args:
  - name: topic
    description: The video idea or subject, with any notes, sources or constraints you already have.
    type: text
    required: true
steps:
  - {id: idea, file: steps/01-idea.md, stage: plan, gate: approve}
  - {id: hook, file: steps/02-hook.md, stage: build, gate: approve}
  - {id: script, file: steps/03-script.md, stage: build, gate: approve}
  - {id: packaging, file: steps/04-packaging.md, stage: build, gate: approve}
  - {id: description, file: steps/05-description.md, stage: ship, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Produces a video about "{{topic}}" one approved step at a time: a sharpened idea with a clear promise to the viewer, then the opening hook, then the full script, then the title and thumbnail package, then the description. Each step produces one artifact and stops for the creator's approval or edits; later steps build on the approved versions and never re-open settled decisions without asking. The promise approved in step 1 is the contract for every later step: the hook sets it up, the script pays it off, and the packaging advertises it honestly. The creator owns every creative decision; the assistant drafts, checks consistency between steps and flags gaps it cannot fill without inventing facts. If the creator asks to skip the approvals, confirm once that later steps will then build on unreviewed choices; if they agree, run the remaining steps in one reply, state the choice made at each skipped gate, and keep every placeholder visible.
