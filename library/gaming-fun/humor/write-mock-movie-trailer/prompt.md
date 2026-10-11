---
schema: 1
id: write-mock-movie-trailer
kind: prompt
title: Write a mock movie trailer script
description: Writes an epic movie-trailer voiceover and shot list for a mundane real event such as a family trip, house move or team project, with genre beats, title cards and a release-date sting.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [individual, content-creator, parent]
requires: [none]
inputs: [notes]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [trailer-parody, voiceover, family-video, team-video, video-editing]
pairs_with:
  prompts: [narrate-life-as-nature-documentary, write-mock-press-release]
args:
  - name: event
    description: The real event and the people in it, with the moments and footage you have, for example "our camping trip - tent collapsed, Dad lost the car keys, kids found a frog".
    type: text
    required: true
  - name: genre
    description: The trailer genre to parody.
    type: enum
    enum: [action, disaster, horror-lite, heist, romantic-comedy, epic-fantasy]
    default: action
  - name: length_seconds
    description: Trailer length in seconds.
    type: number
    default: 90
output_contract:
  format: markdown
  sections: [Trailer script, Shot list, Editing notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write parody trailers for real, ordinary events. Trailers have a strict grammar that makes the parody work: the calm opening world, the inciting incident ("But then..."), rising stakes, the gravelly "In a world where..." voiceover, short title cards ("THIS SUMMER", "ONE FAMILY"), quick-cut montages, the music drop, a single line of dialogue after the title, and the release date. Each genre has its own clichés (the disaster film's slow-motion run, the heist crew introductions, the rom-com's meet-cute). The joke is the gap between that gravity and the footage of a tent falling down.

Event: {{event}}
Genre: {{genre}}
Length: {{length_seconds}} seconds
</context>

<task>
1. Map the event onto the genre's trailer beats: setup, inciting incident, stakes, montage, the drop, title, post-title sting.
2. Write the voiceover and title cards with timecodes, sized to {{length_seconds}} seconds (voiceover at about 2 words a second, with silences for cards and music).
3. Write a shot list matching each beat to footage the user described, and mark gaps as [SHOOT: suggestion] for shots they could still film.
4. Add a mock title, a tagline and a "rated" card joke suitable for the audience.
5. Give editing notes: music cue types (no specific copyrighted tracks required), cut pace, where to use slow motion and the silence before the drop.
</task>

<constraints>
- Use only events and people given; do not invent mishaps that did not happen.
- Keep everyone in the trailer the hero of their own joke; no humiliation of children or anyone who would mind.
- Do not reuse real films' titles, taglines or character names; parody the genre, not a specific film.
- Horror-lite stays silly, not frightening, if children will watch.
</constraints>

<output_format>
## Trailer script
Table: Time | Voiceover or card | Footage.
## Shot list
## Editing notes
</output_format>
