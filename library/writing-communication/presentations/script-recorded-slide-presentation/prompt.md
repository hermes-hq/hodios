---
schema: 1
id: script-recorded-slide-presentation
kind: prompt
title: Script a recorded slide presentation
description: Writes a narration script for recording a deck to watch later, such as a conference submission, a course module or an async update, with per-slide timings, chapter breaks and recording notes.
category: presentations
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, researcher, manager, student]
requires: [none]
inputs: [document, notes]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [narration, voiceover, async-video, pre-recorded-talk, timing, captions]
pairs_with:
  prompts: [write-speaker-notes, shorten-presentation-for-time, make-presentation-accessible]
  personas: [presentation-designer]
args:
  - name: deck
    description: The slides in order with their content and any notes you already have.
    type: text
    required: true
  - name: target_minutes
    description: Required or desired length of the recording in minutes.
    type: number
    required: true
  - name: purpose
    description: Where the recording goes and who watches it, for example "pre-recorded conference talk, max 12 minutes" or "module 3 of an onboarding course".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Plan, Narration script, Chapters, Recording notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write narration for slide presentations that are recorded and watched later. A recording is not a live talk: there is no audience energy to lean on, viewers can pause, skip or speed up, attention drops faster, and anything said aloud is easy to caption and hard to edit afterwards. Good recorded narration is written for the ear in short sentences, at roughly 130 to 150 spoken words per minute, with a clear promise in the first 20 seconds, signposts at each section so a viewer who skipped can re-orient, no references to "this room" or "raise your hand", and no dates or phrases that age badly ("next week"). Recording slide by slide makes retakes cheap, so each slide's narration should stand alone with a clean start and end.

<deck>
{{deck}}
</deck>

Target length: {{target_minutes}} minutes
Purpose: {{purpose}}
</context>

<task>
1. Give a plan: the one thing the viewer should take away, the word budget (target minutes times about 140 words), and the per-slide time allocation. If the deck clearly cannot fit {{target_minutes}} minutes, say which slides to merge or cut.
2. Write the narration per slide in plain spoken sentences, each slide starting and ending cleanly so it can be recorded as a separate take. Open with what the viewer will get and how long it takes.
3. Add a short signpost at each section change, and on slides with charts tell the viewer where to look.
4. Remove live-only phrasing, time-bound references and anything that would need the speaker to see the audience.
5. Suggest chapter markers with titles and approximate timestamps.
6. Give recording notes: pronunciation of names or terms in the deck if spelled out, pauses, where to show the cursor or zoom, and a reminder to provide captions and a transcript, which this script can seed.
</task>

<constraints>
- Use only the content in the deck and notes; mark gaps as [add detail] rather than inventing facts.
- Per-slide timings must add up to the target length; show the total.
- Keep sentences short enough to read aloud in one breath.
</constraints>

<output_format>
## Plan
Takeaway, word budget, and a table: Slide | Seconds | Words.

## Narration script
For each slide: **Slide N - title (mm:ss)**, then the narration.

## Chapters
List: timestamp, chapter title.

## Recording notes
Bullets.
</output_format>
