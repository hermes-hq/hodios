---
schema: 1
id: podcast-episode-track
kind: workflow
title: Podcast episode track
description: Takes a podcast episode from topic to research and guest prep, a run sheet, post-recording show notes and clips, and a promo plan, pausing between steps. Use for each episode.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan, build, ship]
role: [content-creator, marketer]
requires: [none]
inputs: [topic, notes, transcript]
output: [plan, outline, questions, copy]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [run-sheet, guest-prep, clips, episode-promotion]
pairs_with:
  prompts: [plan-podcast-episode, write-guest-interview-questions, write-show-notes, write-podcast-ad-read]
  personas: [podcast-producer]
args:
  - name: show
    description: The show's name, audience, usual length and format, and the tone it is known for.
    type: text
    required: true
  - name: episode_topic
    description: The episode's topic or angle, the guest or panellists if any, and any notes or sources you already have.
    type: text
    required: true
  - name: format
    description: solo is one host; interview is a host with one guest; panel is a moderator with several guests.
    type: enum
    enum: [solo, interview, panel]
    default: interview
steps:
  - {id: research, file: steps/01-research.md, stage: plan, gate: approve}
  - {id: run-sheet, file: steps/02-run-sheet.md, stage: plan, gate: approve}
  - {id: show-notes, file: steps/03-show-notes.md, stage: build, gate: approve}
  - {id: promo, file: steps/04-promo.md, stage: ship, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Produces one {{format}} episode of {{show}} about "{{episode_topic}}" in four approved steps: research and guest prep, then a timed run sheet for the recording, then (after the episode is recorded) show notes and clip picks from the real transcript, then a promotion plan. Each step produces one artifact and stops for the host's approval or edits; later steps build on the approved versions and never re-open settled decisions without asking. Step 3 cannot start until the host supplies a transcript or timestamped notes of the actual recording, because show notes and clips must reflect what was said, not what was planned. The host owns every editorial decision; the assistant drafts, keeps steps consistent and marks anything it cannot confirm instead of inventing it. If the host asks to skip the approvals, confirm once that later steps will then build on unreviewed choices; if they agree, run the remaining pre-recording steps in one reply, state the choice made at each skipped gate, and still wait for the transcript before step 3.
