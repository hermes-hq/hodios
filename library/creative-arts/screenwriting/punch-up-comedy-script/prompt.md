---
schema: 1
id: punch-up-comedy-script
kind: prompt
title: Punch up a comedy script
description: Punches up a comedy scene like a writers' room, finding soft spots, pitching joke alts in character, keeping the story and adding a button. Use when a comedy scene falls flat.
category: screenwriting
version: 1.0.0
status: incubating
stage: [review, build]
role: [writer]
requires: [none]
inputs: [text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [punch-up, joke-alts, sitcom, comedy-writing]
pairs_with:
  prompts: [write-comedy-sketch, format-screenplay-scene, plan-table-read]
args:
  - name: scene
    description: The comedy scene in script form.
    type: text
    required: true
  - name: show_tone
    description: The comedy style and limits, e.g. "warm family multi-cam", "dry single-cam workplace", "edgy adult animation", plus anything off-limits.
    type: string
    required: true
  - name: characters
    description: One line per main character on their comic voice and point of view. Optional but improves the alts.
    type: text
output_contract:
  format: markdown
  sections: [Scene read, Soft spots and alts, New button, Punched-up scene]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In a writers' room, punch-up means pitching alternatives ("alts") for lines that are not landing, then choosing the best. Good alts come from character: the funniest line is the one only this character would say, from their point of view, about this situation. Most soft spots are structural rather than verbal: a joke buried mid-sentence instead of on the last word, a setup that runs too long, a straight line that steps on the laugh, a joke that contradicts what a character wants, or a scene that ends on a flat line instead of a button. Generic wordplay and references that could appear in any show are the weakest alts. Punch-up must keep the scene's story beats and timing.
</context>

<task>
Punch up this scene. Tone: {{show_tone}}.

<scene>
{{scene}}
</scene>
{{#characters}}
<characters>
{{characters}}
</characters>
{{/characters}}

1. **Scene read:** in three lines, the scene's comic engine (what is funny about the situation), each character's want in it, and where it currently gets its biggest laugh.
2. **Soft spots and alts:** list the lines that are not landing, quoting the shortest snippet, with the reason (buried joke word, long setup, off-character, generic, stepping on a laugh). For each, pitch three alts in different directions (character-based, situation-based, a callback or physical beat) and mark your pick.
3. **New button:** three options for the scene's final line or action, with your pick.
4. **Punched-up scene:** the full scene with your picks applied, in script format, the same story beats and roughly the same length.
</task>

<constraints>
- Keep every story beat and each character's want; do not change who wins the scene.
- Jokes must fit each character's voice and the stated tone and limits.
- No jokes that punch down at a group for who they are.
- Do not lift jokes or catchphrases from existing shows.
</constraints>

<output_format>
## Scene read
## Soft spots and alts
Table: Line | Why soft | Alt 1 | Alt 2 | Alt 3 | Pick.
## New button
## Punched-up scene
</output_format>
