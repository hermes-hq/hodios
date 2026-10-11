---
schema: 1
id: thumbnail-comic-page
kind: prompt
title: Thumbnail a comic page
description: Turns a scripted comic page into two or three thumbnail layouts with panel sizes, reading path, balloon zones and a rough text grid, and picks the one that reads best. Use before pencilling a page.
category: comics
version: 1.0.0
status: incubating
stage: [design]
role: [artist, writer]
requires: [none]
inputs: [text]
output: [diagram, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [page-layout, thumbnails, panel-layout, reading-flow, balloon-placement]
pairs_with:
  prompts: [write-comic-script, critique-comic-page, plan-comic-lettering]
  personas: [comics-editor]
args:
  - name: script_page
    description: The script for one page, panel by panel with dialogue, or a plain description of what has to happen on the page.
    type: text
    required: true
  - name: page_setup
    description: "Page shape and reading direction, for example \"US comic page, left to right\", \"manga page, right to left\", \"square webcomic page\". Say whether this is a left or right page in print."
    type: string
    default: "Portrait comic page, left to right"
output_contract:
  format: markdown
  sections: [Page reading, Thumbnail options, Recommended layout, Checks, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a comic artist who thumbnails pages for a living. You know that a page is designed as a whole before any panel is drawn: the most important panel gets the most space, the reader's eye should travel the page without doubt (a Z path for left-to-right comics, mirrored for right-to-left manga), the first balloon of each panel sits top-left (top-right in manga) so speaker order matches reading order, and balloons need planned space or they will cover faces and hands. Tier structure controls rhythm: equal panels read as steady time, a wide panel slows down, thin vertical panels speed up. A panel border that lines up across tiers can make the eye jump the wrong way, and a page's last panel should lead into the next page.

Script page:
{{script_page}}

Page setup: {{page_setup}}
</context>

<task>
1. Page reading: in two or three lines, say what the page has to do in the story, which panel is its key moment, and how many words of lettering it carries. If the page has more than about seven panels or more than about 250 words, flag it and suggest what to merge or move.
2. Thumbnail options: give two or three different layouts. For each, draw a rough text grid with boxes labelled by panel number and relative size, then list every panel with its shape, shot size and camera angle, what is in the foreground, and where its balloons go.
3. Show the reading path for each option and point out any place where the eye could go the wrong way, such as aligned gutters, a tail crossing a panel, or a balloon reading before the panel that should come first.
4. Recommended layout: pick one and explain why it serves the key moment and the page-level pacing. Describe how the last panel hands off to the next page (or to the page turn if this is a right-hand page).
5. Checks: 180-degree rule across panels with the same characters, establishing shot where the location changes, enough variety in shot size, and room for every balloon at a readable size.
</task>

<constraints>
- One moment per panel. If the script packs two actions into one panel, split them and say so.
- Respect {{page_setup}}: mirror reading order and balloon order for right-to-left pages.
- Do not add story events or dialogue; flag script gaps under Questions.
- Keep grids simple text boxes; they are thumbnails, not finished art.
</constraints>

<output_format>
## Page reading
## Thumbnail options
For each option: a text grid in a code block, then a table: Panel | Shape and size | Shot and angle | Foreground | Balloon zone.
## Recommended layout
## Checks
A checklist.
## Questions
</output_format>
