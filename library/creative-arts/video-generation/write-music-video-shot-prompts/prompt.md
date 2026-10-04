---
schema: 1
id: write-music-video-shot-prompts
kind: prompt
title: Write music video shot prompts
description: Plans a beat-synced music video for the creator's own song, mapping each section to visuals with a recurring motif, cut points on the beat and a generation prompt for every shot.
category: video-generation
version: 1.0.0
status: incubating
stage: [plan, build]
role: [artist, content-creator]
requires: [none]
inputs: [text, notes]
output: [plan, prompt, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [music-video, beat-sync, visual-motif, shot-list]
pairs_with:
  prompts: [plan-music-release, turn-storyboard-into-video-shots, write-looping-video-prompt]
args:
  - name: song_structure
    description: "Your song's sections with start times (intro 0:00, verse 0:12, chorus 0:45...), the tempo in BPM if you know it, and the main lyric themes in your own words. Paste your own lyrics if you want lines matched to shots."
    type: text
    required: true
  - name: mood
    description: "The feeling of the song and video, e.g. 'euphoric but lonely', 'slow-burn menace'."
    type: string
    required: true
  - name: concept
    description: "A visual idea if you have one: performance, a story, abstract, a single location, a character. Optional; without it three concepts are proposed."
    type: text
output_contract:
  format: markdown
  sections: [Concept, Beat grid, Section map, Shot list, Shot prompts, Edit notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A music video lands when picture and song move together: cuts fall on beats and bar lines, the visual energy rises and falls with the arrangement, and one image keeps returning and changing so the video feels authored rather than assembled. Generated clips are short and independent, which suits fast cutting but tempts people to string together unrelated pretty shots. Planning the beat grid first, then the sections, then the motif, keeps the video coherent and makes every clip a deliberate length.
</context>

<task>
Plan a music video for this song. Mood: {{mood}}.

<song_structure>
{{song_structure}}
</song_structure>
{{#concept}}

<concept>
{{concept}}
</concept>
{{/concept}}

1. This prompt is for the creator's own music. If the song is someone else's, or section timings are missing, ask in one message (for the creator's own track, or for timings) and stop. If the BPM is missing but timings are given, estimate it from the section lengths and say it is an estimate.
2. **Concept.** If a concept was given, restate it in two lines and name the visual motif. If not, propose three distinct concepts (for example performance, narrative, abstract), each with a motif, and pick the one that best fits {{mood}}, saying why.
3. **Beat grid.** From the BPM, give seconds per beat (60 / BPM) and per bar (4 beats in 4/4, or as the song's meter), and the cut lengths you will use: for example 1 bar for verses, half a bar in the chorus, 2 bars for the intro. Round clip lengths to whole beats.
4. **Section map.** For each section: time range, energy level (1 to 5), what the visuals do (location, action, palette shift), how the motif appears and evolves, and the cut rhythm. Energy and cut rate should rise into choruses and drop for breakdowns; the final chorus or outro should pay off the motif.
5. **Shot list.** Number every shot with section, start time, length in beats and seconds, shot size and camera, action, and which beat the cut lands on (downbeat, snare, the first beat of the bar). Flag the hero shots worth extra takes.
6. **Shot prompts.** One standalone prompt per shot with a fixed look block and fixed character blocks (if any) pasted word for word, one action, camera behaviour and duration.
7. Before answering, check that shot lengths in each section add up to the section's duration within a beat, that the motif appears in at least the intro, every chorus and the ending, and that every prompt reuses the same look block.
</task>

<constraints>
- Do not reproduce lyrics the creator did not paste, and do not quote lyrics from other songs.
- Characters are original or the creator themself (performance shots to be filmed or generated from the creator's own reference with their consent). No real celebrities or other artists' likenesses.
- No readable text generated in frame; titles and lyric captions go in the edit.
- Avoid rapid full-screen flashing (more than three flashes a second) and warn if the concept depends on strobing.
- No tool, model or version names.
</constraints>

<output_format>
## Concept
## Beat grid
## Section map
Table: Section | Time | Energy | Visuals | Motif | Cut rhythm.
## Shot list
Table: # | Section | Start | Beats / seconds | Shot and camera | Action | Cut on.
## Shot prompts
Look block and character blocks in one code block, then one code block per shot.
## Edit notes
Sync tips, where to use speed ramps or holds, and captions.
</output_format>
