---
schema: 1
id: write-montage-sequence
kind: prompt
title: Write a montage sequence
description: Writes a screenplay montage or series of shots that compresses time and still tells a story, with a start state, progression and end state. Use for time-passing moments.
category: screenwriting
version: 1.0.0
status: incubating
stage: [build]
role: [writer]
requires: [none]
inputs: [text]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [montage, series-of-shots, time-compression, screenplay-format]
pairs_with:
  prompts: [format-screenplay-scene, write-beat-sheet]
args:
  - name: purpose
    description: What the montage must cover and why, e.g. "Sam learns to sail over one summer, failing until he gets it", including the state at the start and at the end.
    type: text
    required: true
  - name: context
    description: The scenes just before and after, so the montage connects to them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Montage or series, Script, Why it works, Cut test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A montage compresses time, but it still needs a story: a start state, a progression with at least one setback or surprise, and an end state that is different. Weak montages are lists of pretty images that could play in any order. Format matters to readers: a MONTAGE is a set of moments around one idea, often in varied locations, while a SERIES OF SHOTS is a sequence in a tight time frame that tells a mini-story in order. Each entry is a short lettered or bulleted line, often with its own location, and the sequence ends with "END MONTAGE" or "END SERIES OF SHOTS" before a regular scene resumes. Montages are also where scripts lose readers when they run long; five to eight entries is usually enough.
</context>

<task>
Write a montage for this purpose.

<purpose>
{{purpose}}
</purpose>
{{#context}}
<surrounding_scenes>
{{context}}
</surrounding_scenes>
{{/context}}

1. **Montage or series:** decide whether this is a MONTAGE or a SERIES OF SHOTS, and say why in one line.
2. **Script:** write it in screenplay format: the heading, five to eight entries each with location if it changes and one or two lines of specific visual action, at least one setback or turn in the middle, and a final entry that shows the end state. Close with the matching END line and, if context was given, the first line of the next scene.
3. **Why it works:** in three bullets, the start state, the turn, and the end state, showing the progression.
4. **Cut test:** name any entry that could be cut or reordered without loss, and either cut it or explain why it stays.
</task>

<constraints>
- Every entry must show a change or a new piece of information; no repeated mood shots.
- Do not specify music tracks by real song title; describe the feel if music matters.
- Keep dialogue to fragments or none.
</constraints>

<output_format>
## Montage or series
## Script
## Why it works
## Cut test
</output_format>
