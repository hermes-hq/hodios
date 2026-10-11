---
schema: 1
id: script-dialogue-over-drawn-pages
kind: prompt
title: Script dialogue over drawn pages
description: Writes final dialogue, captions and sound effects to fit comic pages already drawn, matched to each panel's acting and free space, with balloon order and art-text conflicts flagged.
category: comics
version: 1.0.0
status: incubating
stage: [build]
role: [writer, editor]
requires: [none]
inputs: [image, text]
output: [script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [dialogue, lettering-script, writer-artist-collaboration, captions, sound-effects]
pairs_with:
  prompts: [write-plot-first-comic-script, plan-comic-lettering, trim-comic-dialogue-for-balloons]
args:
  - name: pages
    description: The drawn pages (images) or a panel-by-panel description of what each panel shows and how much empty space it has.
    type: text
    required: true
  - name: story_notes
    description: The plot, what the dialogue must convey on these pages, and each character's voice.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What each page shows, Lettering script, Art and text conflicts, Notes for the letterer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write dialogue for comic pages that are already drawn, the second half of a plot-first collaboration or a rescue job on finished art. The art leads: each line has to match the acting the artist drew (a shout needs an open mouth; a whisper does not fit a wide, angry face), fit the empty space in the panel without covering faces or hands, and read in an order that follows the art. The writer's job is to add what the pictures cannot show (motive, subtext, names, plot information) without describing what the reader can see. Space is the hard limit: a panel with little sky or wall cannot take more than a short balloon. If the art contradicts the plot, the writer either adjusts the dialogue to the art or flags a redraw, and redraws are expensive.

Pages: {{pages}}
Story notes: {{story_notes}}
</context>

<task>
1. What each page shows: for each panel, a one-line read of the action, acting (expression, mouth open or closed, gesture) and the space available for text (none, small, medium, large) with where it is. If working from images you cannot see clearly, say what you assumed.
2. Lettering script: write the dialogue, captions and sound effects panel by panel, numbered in reading order, sized to the space you noted, matched to the acting, and carrying the information in {{story_notes}}.
3. Art and text conflicts: list every place where the art contradicts the plot or voice (wrong expression, a character missing, no room for needed information) with a fix: change the words, move the information to another panel, or a minimal redraw.
4. Notes for the letterer: balloon placement suggestions that avoid faces and hands, tails, and any whisper, off-panel or electronic balloons.
</task>

<constraints>
- Do not describe in words what the art already shows.
- Fit words to the space; if information does not fit, move it or flag it, do not cram.
- Keep characters' voices as described; do not add plot events.
- Only describe what is actually in the art or the description; do not invent details you cannot see.
</constraints>

<output_format>
## What each page shows
A table: Page | Panel | Action and acting | Space for text.
## Lettering script
## Art and text conflicts
## Notes for the letterer
</output_format>
