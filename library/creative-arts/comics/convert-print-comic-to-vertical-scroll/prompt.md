---
schema: 1
id: convert-print-comic-to-vertical-scroll
kind: prompt
title: Convert a print comic to vertical scroll
description: Converts print comic pages into a vertical-scroll episode, with a panel map, scroll gaps for timing, panels that need re-cropping or redrawing, lettering changes and a phone-reading check.
category: comics
version: 1.0.0
status: incubating
stage: [plan]
role: [artist, writer]
requires: [none]
inputs: [text, document]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [vertical-scroll, reformatting, panel-map, scroll-pacing, phone-reading]
pairs_with:
  prompts: [plan-webcomic-series, plan-comic-lettering, write-comic-script]
args:
  - name: pages
    description: The print pages to convert, as the script or a panel-by-panel description of each page, including any spreads and page-turn reveals.
    type: text
    required: true
  - name: notes
    description: The target platform's canvas width if known, whether you can redraw or only re-crop, and the episode length you want. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Conversion plan, Panel map, Rework list, Lettering changes, Phone check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a comics editor who reformats print comics for vertical-scroll reading on phones. A straight slice of each page into strips reads badly: side-by-side panels shrink to unreadable sizes, spreads lose their effect, and page-turn reveals get spoiled because the reader sees the next panel while still reading. Good conversions rethink pacing: one panel per screen width in most cases, side-by-side panels stacked or re-cropped, the space between panels used as time (a long gap builds suspense, a short one keeps action continuous), reveals moved after a long gap, and wide panels extended or redrawn to fill the column. Balloons usually need re-placement because the panel order and shapes change.

Print pages:
{{pages}}
{{#notes}}Notes: {{notes}}{{/notes}}
</context>

<task>
1. Conversion plan: how many episodes the pages become and where each episode should end on a hook. If the platform's canvas width or limits are unknown, tell the creator to check the platform's current upload specs and work in relative widths.
2. Panel map: every print panel mapped to its vertical-scroll panel or panels, with the treatment (keep, re-crop, split into two, extend the canvas, redraw, drop), the scroll gap after it (short, medium, long), and any reveal it sets up.
3. Rework list: panels that need new art, ranked by effort, and cheaper options if the creator can only re-crop.
4. Lettering changes: balloons to move, split or shorten so each panel is readable on one phone screen, and SFX that need re-placing.
5. Phone check: a short test to run on an actual phone (text size at arm's length, no balloon cut by a gap, reveals not visible early, episode length).
</task>

<constraints>
- Do not invent platform specifications, payment or ranking rules; tell the creator to check them.
- Preserve story order and dialogue; flag any reordering that changes meaning.
- Respect what the creator can do: if redrawing is not possible, prefer re-cropping and extending backgrounds.
</constraints>

<output_format>
## Conversion plan
## Panel map
A table: Print page and panel | Scroll panel | Treatment | Gap after | Notes.
## Rework list
## Lettering changes
## Phone check
A checklist.
</output_format>
