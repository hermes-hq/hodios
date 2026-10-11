---
schema: 1
id: plan-musical-song-spots
kind: prompt
title: Plan song spots for a musical
description: Spots where songs go in a musical (I want, conflict, eleven o'clock), who sings each, what changes, and which scenes stay spoken. Use when building a musical.
category: screenwriting
version: 1.0.0
status: incubating
stage: [plan]
role: [writer, artist]
requires: [none]
inputs: [text, notes]
output: [table, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [musical-theatre, song-spotting, musical-book, i-want-song]
pairs_with:
  prompts: [outline-full-length-play, write-beat-sheet]
args:
  - name: story
    description: The musical's story or outline, its characters, and the musical world or style (pop, folk, jazz, operetta) if known.
    type: text
    required: true
  - name: song_count
    description: Rough number of songs you expect, or "auto". Many full-length musicals have around 12 to 20 numbers.
    type: string
    default: auto
  - name: medium
    description: "stage: a theatre musical. screen: a film or TV musical, where songs often run shorter and fewer."
    type: enum
    enum: [stage, screen]
    default: stage
output_contract:
  format: markdown
  sections: [Musical spine, Song spot list, Spoken scenes, Score shape, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In a musical, characters sing when emotion is too big to speak, and a song must move the story: the character who starts the song is not the same as the one who ends it. Spotting is deciding where songs go before writing them. Well-built musicals use song types for jobs: an opening that sets the world and rules, an early "I want" song that gives the lead's desire, comedy or charm songs for relief, conflict duets or ensemble numbers where wants collide, an act one finale that spins the story into the interval, and a late "eleven o'clock" number where the lead faces the truth. Reprises work when the meaning of a song has changed. Common failures are songs that repeat what the scene just said, two ballads in a row, a lead with no want song, and songs placed where a scene of dialogue would be stronger.
</context>

<task>
Spot songs for this {{medium}} musical. Song count: {{song_count}}.

<story>
{{story}}
</story>

1. **Musical spine:** the lead's want, the obstacle, the turning point at the end of act one (or midpoint for screen), and what the lead learns. If the story has no clear lead or want, ask up to three questions and stop.
2. **Song spot list:** in story order, for each spot: a working title, the song type and job, who sings it, the situation, what changes between the first and last line (the turn), and a suggested feel (tempo and style in plain words). Include reprises only where meaning changes.
3. **Spoken scenes:** list the moments that should stay as dialogue (plot logistics, exposition, jokes that rely on timing) and why.
4. **Score shape:** check the sequence for variety (no two similar ballads back to back), that every principal has a solo or featured moment proportionate to their role, the act one finale lands, and the eleven o'clock number (or screen equivalent) exists. Mark each OK or Flag.
5. **Questions:** up to three decisions for the book writer and composer.
</task>

<constraints>
- Do not write lyrics or music; working titles only.
- Keep the writer's story and characters; mark added scenes "(proposed)".
- For screen, keep songs fewer and shorter and allow for songs that play under montage.
- Do not suggest borrowing songs from existing shows.
</constraints>

<output_format>
## Musical spine
## Song spot list
Table: # | Working title | Type and job | Who | Situation | Turn | Feel.
## Spoken scenes
## Score shape
## Questions
</output_format>
