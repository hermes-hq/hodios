---
schema: 1
id: plan-manga-one-shot
kind: prompt
title: Plan a manga one-shot
description: Plans a complete manga one-shot for a contest or portfolio within a fixed page count, with the hook in the first pages, a page budget per act, character appeal, the climax spread and a name check.
category: comics
version: 1.0.0
status: incubating
stage: [plan, design]
role: [artist, writer]
requires: [none]
inputs: [topic, notes]
output: [outline, plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [manga-contest, one-shot, contest-entry, short-comics, story-structure]
pairs_with:
  prompts: [thumbnail-comic-page, write-comic-script, write-character-model-sheet-brief]
  personas: [comics-editor]
args:
  - name: idea
    description: The premise, the main character, the genre and the audience, as much or as little as you have.
    type: text
    required: true
  - name: page_count
    description: The page limit, the reading direction, and the contest or publication rules you know of (such as a deadline or theme). Check the actual rules; this prompt does not know them.
    type: string
    default: "31 pages, right to left"
output_contract:
  format: markdown
  sections: [Core of the story, Character appeal, Page budget, Page-by-page plan, Climax spread, Name check, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a manga editor who coaches new creators on one-shots. A one-shot must stand alone in a fixed page count, and editors judging contests read many of them, so the first two or three pages must show who the protagonist is, what they want and what makes this story different. Common failures: a long world-building opening, too many named characters, a premise built for a series that cannot resolve in the page count, and a climax squeezed into the last two pages. Strong one-shots have one protagonist with a clear desire and a visible, likable quality, one conflict, a turning point around two thirds in, a climax given a spread or a large panel, and a short resolution that shows how the character changed. The "name" (the rough storyboard of the whole story with dialogue) is where pacing is fixed before any finished art. Reading direction, page turns and right or left page placement affect where reveals land.

Idea: {{idea}}
Page count and rules: {{page_count}}
</context>

<task>
1. Core of the story: protagonist, their desire, the obstacle, what is at stake, and the change by the end, in five lines. If the idea is too big for {{page_count}}, say what to cut to make it a one-shot.
2. Character appeal: what makes the protagonist memorable on sight (design hook, a habit, a line of dialogue), and the smallest cast that works.
3. Page budget: pages per section (hook, setup, rising conflict, turn, climax, resolution) adding up exactly to {{page_count}}.
4. Page-by-page plan: one line per page with its beat, the page-turn reveal where there is one, and whether it is a left or right page.
5. Climax spread: describe the climax image or spread and how the pages before it build to it.
6. Name check: a checklist to apply to the rough name: hook by page 3, desire stated, one conflict, turn in place, climax given space, an ending that resolves.
7. Questions: anything unclear about the idea or the rules.
</task>

<constraints>
- Fit exactly within {{page_count}}; show the arithmetic.
- Do not claim to know a specific contest's rules, judges or prizes; tell the creator to check them.
- Keep the creator's premise and characters; label any added element as a suggestion.
- Respect the reading direction for page-turn placement.
</constraints>

<output_format>
## Core of the story
## Character appeal
## Page budget
A table: Section | Pages | Purpose.
## Page-by-page plan
A table: Page | Side | Beat | Reveal.
## Climax spread
## Name check
A checklist.
## Questions
</output_format>
