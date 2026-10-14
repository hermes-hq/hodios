---
schema: 1
id: caption-family-photos
kind: prompt
title: Caption family photos
description: Writes captions and short stories for family photos, slides or an album from what you know about each one, marking what is unknown and listing who to ask before the knowledge is lost.
category: life-writing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
requires: [none]
inputs: [notes, image]
output: [copy, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [family-photos, photo-album, captions, family-stories, keepsake]
pairs_with:
  prompts: [write-family-history, interview-relative-for-oral-history, build-life-timeline]
args:
  - name: photos
    description: For each photo, a number and what you know - who is in it (left to right), where, when, the occasion, any writing on the back, and any story attached. Images can be attached too.
    type: text
    required: true
  - name: use
    description: Where the captions will go, for example a printed album, a memorial slideshow, a family archive, or a gift book for a birthday.
    type: string
    required: true
  - name: style
    description: "brief: archival captions with who, where and when. story: a caption plus two to four sentences of story for photos that have one."
    type: enum
    enum: [brief, story]
    default: story
output_contract:
  format: markdown
  sections: [Captions, Unknowns to resolve, Questions for relatives, Archive tips]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families caption their photographs, often while the people who can name the faces are still alive. Archivists caption with the five Ws in a consistent order (who, left to right; what occasion; where; when, with "about" for estimates; and the source of the information), because the most common loss in family archives is a box of beautiful photos nobody can identify. A caption that reads "Gran and friends" is almost useless in fifty years; "Left to right: Edna Ward (née Holt), unknown woman, Gladys Holt, at Blackpool, about 1952 (identified by Edna's son, 2026)" is a record. Story captions add what the photo cannot show: what happened that day, what the people meant to each other, what became of the place.

<photos>
{{photos}}
</photos>
Use: {{use}}
Style: {{style}}
</context>

<task>
1. Captions: for each photo, in order, a caption in a consistent format: number, people left to right with full names where known (and maiden names), occasion, place, date or "about" date, and the source of the identification. In story style, add two to four sentences of story only from what the notes give, in a warm plain voice suited to the use. Mark unknowns as [unknown] rather than guessing.
2. Unknowns to resolve: a list by photo of each unknown person, place or date, with clues in the notes (clothes, cars, buildings, ages of known people) that could narrow it, framed as possibilities to check.
3. Questions for relatives: a short list of questions grouped by the relative most likely to know, starting with the oldest or the ones whose knowledge would be lost first.
4. Archive tips: four or five brief tips for this use (write on the back in soft pencil, not ballpoint; keep a digital caption file alongside scans; record who identified each person; how to handle captions for a slideshow, where shorter is better).
</task>

<constraints>
- Never invent names, dates, places, relationships or stories. Estimates must say "about" and the reason.
- If images are attached, describe only what is visible and do not identify people from their faces; rely on what the family says.
- Keep captions consistent in order and format across all photos.
- Treat photos of people who have died with care; avoid jokes in captions unless the notes set that tone.
</constraints>

<output_format>
## Captions
## Unknowns to resolve
## Questions for relatives
## Archive tips
</output_format>
