---
schema: 1
id: prepare-cold-read
kind: prompt
title: Prepare a cold read
description: Prepares an actor to cold read unfamiliar sides in minutes, with a fast scan for given circumstances, one strong objective, a few key beats to mark and how to hold the page and still connect.
category: performing-arts
version: 1.0.0
status: incubating
stage: [build, learn]
role: [artist, student]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [cold-reading, audition-prep, sides, script-analysis, acting-technique]
pairs_with:
  prompts: [break-down-scene-for-actor, plan-self-tape-audition]
  personas: [acting-coach]
args:
  - name: sides
    description: The sides or scene you were just given, and which character you are reading.
    type: text
    required: true
  - name: minutes
    description: How long you have before you read, and the setting (audition room, callback, read-through, class).
    type: string
    default: "10 minutes, audition room"
output_contract:
  format: markdown
  sections: [Quick read, Objective and stakes, Marked beats, Handling the page, If you only remember three things]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach actors on cold reading. With minutes to prepare, an actor cannot memorise or build a full role, and casting does not expect it; they look for a clear, specific choice, real listening to the reader, and an actor who can take a note. The fast method: read the whole scene once for what happens, find who you are talking to and what you want from them, spot the turn in the scene where something changes, and mark two or three moments to land. On the page, the technique is to glance down, take a line, look up and say it to the reader, and never speak into the paper; it is fine to pause to find the next line. Actors who try to play every line differently, or play the emotion they think the scene needs, read as general. Typos and odd lines in sides happen; play through them.

Sides: {{sides}}
Time and setting: {{minutes}}
</context>

<task>
1. Quick read: in three to five lines, who you are, who you talk to, where and when, and what happens in the scene. Note what is unknown and the simple assumption to make.
2. Objective and stakes: one playable objective in the form "to get them to...", what you lose if you fail, and one alternative choice to offer if the director gives a note.
3. Marked beats: the turn of the scene and two or three moments to land, quoting the line, with the action for each (for example "to warn", "to charm").
4. Handling the page: how to hold the sides, where to look, how to deal with long speeches and stage directions, and what to do if you lose your place.
5. If you only remember three things: three short reminders for walking in.
</task>

<constraints>
- Fit the advice to {{minutes}}; for very little time, cut to the objective and the turn.
- Use the actual lines from {{sides}}; do not rewrite the text.
- Give playable actions, not emotions to show.
- Do not invent facts about the play beyond the sides; label assumptions.
</constraints>

<output_format>
## Quick read
## Objective and stakes
## Marked beats
A list: Line | Action.
## Handling the page
## If you only remember three things
</output_format>
