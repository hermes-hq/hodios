---
schema: 1
id: write-plot-first-comic-script
kind: prompt
title: Write a plot-first comic script
description: Writes a plot-style comic script, page by page with story beats and key moments but no final dialogue, for artists who stage pages themselves, with a later dialogue pass planned in.
category: comics
version: 1.0.0
status: incubating
stage: [build]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [script, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [plot-style-script, writer-artist-collaboration, page-breakdown, pacing, scripting]
pairs_with:
  prompts: [script-dialogue-over-drawn-pages, write-comic-script, review-comic-script]
args:
  - name: story
    description: The story or outline for the issue or chapter, with characters and what must happen.
    type: text
    required: true
  - name: pages
    description: Page count, format and reading direction.
    type: string
    default: "20 pages, print, left to right"
  - name: artist_notes
    description: What the artist is strong at or wants freedom with, and anything fixed (a splash, a reveal on a page turn). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Plot script, Must-haves for the artist, Dialogue pass plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write comics in the plot-first method, where the writer gives the artist page-by-page story beats and the artist decides panel count and staging, and final dialogue is written afterwards over the drawn pages. It suits artists who are strong storytellers, and it gives them room, but it fails when the plot is vague about what each page must accomplish, when key information the dialogue will need has no space planned, or when a page-turn reveal is not protected. A good plot script says per page: what happens, the emotional beat, any must-show moment or object, roughly how much talking the page will hold (so the artist leaves balloon room), and where reveals land. It suggests rather than dictates panel counts. Sample lines can be included where the artist needs to act a specific line.

Story: {{story}}
Pages: {{pages}}
{{#artist_notes}}Artist notes: {{artist_notes}}{{/artist_notes}}
</context>

<task>
1. Approach: in a few lines, the issue's spine (what changes from page one to the last page) and where the big moments fall across {{pages}}.
2. Plot script: for each page, a heading with the page number and side, then a short paragraph of story beats in present tense, the emotional beat, any must-show moment, a talk level (silent, light, medium, heavy) so the artist leaves room for balloons, and a suggested panel range. Include a sample line only where the acting depends on it.
3. Must-haves for the artist: a list of fixed elements (reveals on page turns, objects to plant for later, continuity details, character appearances) the artist must not change.
4. Dialogue pass plan: what the dialogue must do on each page when it is written over the art, including any information that must be stated in words.
</task>

<constraints>
- Stay within {{pages}} and keep the given story events; flag gaps instead of inventing major plot.
- Do not write full dialogue; sample lines only where needed and marked as such.
- Talk levels must leave enough room for the information the dialogue pass needs.
- Mark right and left pages so page-turn reveals land correctly.
</constraints>

<output_format>
## Approach
## Plot script
PAGE headings with side, then beats, emotion, must-show, talk level, panel range.
## Must-haves for the artist
## Dialogue pass plan
A table: Page | What the words must do.
</output_format>
