---
schema: 1
id: write-silent-comic-sequence
kind: prompt
title: Write a silent comic sequence
description: Scripts a wordless comic sequence where the art carries the story, with acting, props and timing per panel, a readability test and where a single caption or sound might be justified.
category: comics
version: 1.0.0
status: incubating
stage: [build]
role: [writer, artist]
requires: [none]
inputs: [text, notes]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [wordless-comics, visual-storytelling, panel-transitions, character-acting, pacing]
pairs_with:
  prompts: [write-comic-script, thumbnail-comic-page, review-comic-script]
args:
  - name: sequence
    description: What has to happen in the sequence, who is in it, what the reader must understand by the end, and how it fits the story around it.
    type: text
    required: true
  - name: length
    description: Pages or panels available and the format (print page or vertical scroll).
    type: string
    default: "2 pages, print"
output_contract:
  format: markdown
  sections: [What the reader must get, Visual devices, Script, Readability test, Words to consider]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write wordless comic sequences. Without dialogue or captions, every piece of information must be visible: an emotion has to show in the face and body, a passage of time in light, weather or a clock, a decision in where a character looks and what they pick up. Writers of silent pages fail in predictable ways: they script thoughts ("she realises he lied") that cannot be drawn, they skip the beat that shows cause, or they rely on a detail too small to read. Strong silent sequences plant an object or gesture early and pay it off, use repeated framing so a small change between panels carries the meaning, and control time with panel count: more panels for a slow, tense moment, fewer for a jump. Moment-to-moment and action-to-action transitions read most clearly without words; bigger jumps need a visual anchor.

Sequence: {{sequence}}
Length: {{length}}
</context>

<task>
1. What the reader must get: list the facts and feelings the reader needs by the end, in order. Each one becomes something drawable.
2. Visual devices: choose the tools that carry those facts (a planted object, repeated framing, a light change, an eyeline, a background clock or sign without dialogue) and say which fact each carries.
3. Script: write the sequence panel by panel in full-script style within {{length}}. For each panel give the moment, shot and angle, the acting (face, hands, posture), and the detail the reader must notice, written so an artist can draw it. No balloons or captions.
4. Readability test: retell the sequence as a reader who sees only the pictures would, panel by panel. Mark any panel where that reader could misread, and fix it in the script.
5. Words to consider: if one fact still cannot be made visible, say which and offer the smallest fix (a sign in the background, a sound effect, one caption), and say what is lost by using it.
</task>

<constraints>
- Every description must be drawable: no thoughts, backstory or off-panel information in panel descriptions.
- Do not add story events beyond {{sequence}}; flag gaps instead.
- Keep important details large enough to read at print or phone size; say when a close-up is needed for that.
- Stay within {{length}}; say what to cut if it does not fit.
</constraints>

<output_format>
## What the reader must get
A numbered list.
## Visual devices
## Script
PAGE and PANEL headings, description only.
## Readability test
A table: Panel | What a reader sees | Risk | Fix.
## Words to consider
</output_format>
