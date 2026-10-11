---
schema: 1
id: plan-photo-slideshow
kind: prompt
title: Plan a photo slideshow for an event
description: Plans a photo slideshow for a funeral, memorial, wedding, birthday or retirement, with a story order, chapter titles, captions, music cues and a running time that fits the moment.
category: presentations
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [slideshow, memorial, celebration, family-history, music-timing, captions]
pairs_with:
  prompts: [write-talk-openings-and-closings]
args:
  - name: occasion
    description: The event and the person or people it is about, for example "memorial for my grandmother, 92, a nurse and keen gardener".
    type: text
    required: true
  - name: photos
    description: A rough list of the photos you have, by period or theme, with approximate counts, for example "childhood 10, nursing years 15, garden 20, grandchildren 30".
    type: text
    required: true
  - name: setting
    description: Where and how it will be shown, for example "looping on a TV during the reception" or "played once, 5 minutes, during the ceremony".
    type: text
    required: true
  - name: music
    description: Songs you are considering, with their lengths if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Shape and length, Running order, Captions, Music plan, Practical notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people put together a photo slideshow for a life event. These slideshows work when they tell a story rather than dump every photo: a clear order (usually chronological, sometimes by theme), a few chapter title cards, one strong photo held a little longer at the emotional moments, and a closing image chosen on purpose. Five to eight seconds per photo is comfortable; faster feels frantic, slower drags. A slideshow played once during a ceremony should usually be three to seven minutes, while a loop at a reception can be longer and needs a clean restart point. Too many near-identical photos, unflattering pictures and private moments are the common regrets. Music shapes the mood and sets the length, so the slide count should be planned to the music. For a funeral or memorial, be warm and gentle; for celebrations, keep it light and inclusive of the guests.

Occasion: {{occasion}}
Photos available: {{photos}}
Setting: {{setting}}
{{#music}}Music being considered: {{music}}{{/music}}
</context>

<task>
1. Recommend the shape and length for {{setting}}: total running time, seconds per photo, and so the number of photos to use. Say how many to cut from what is available.
2. Propose the running order in chapters (by life stage or theme), with how many photos per chapter, which kinds of photo to choose for each, and where to place the strongest images, including the opening and closing photos.
3. Write short chapter title cards and suggest caption styles (names, years, places), with a few example captions using only details the user gave; mark unknowns as [year] or [place].
4. Plan the music: match tracks to chapters, check total music length against the running time, and say where transitions fall. If no music was given, describe the kind of music for each chapter without naming songs as if they were chosen.
5. Give practical notes: how to choose between similar photos, checking the family is comfortable with sensitive photos, landscape versus portrait framing, testing on the actual screen with sound, a backup copy, and, for public venues or online sharing, a reminder that playing commercial music may need permission.
</task>

<constraints>
- Use only details the user gave about the person; never invent life events, dates or names.
- Keep the tone appropriate to the occasion.
- Keep advice tool-neutral; do not depend on a specific app.
</constraints>

<output_format>
## Shape and length
Running time, seconds per photo, number of photos.

## Running order
Table: Chapter | Photos | What to choose | Notes.

## Captions
Chapter title cards and example captions.

## Music plan
Table: Track or mood | Chapters | Length.

## Practical notes
Bullets.
</output_format>
