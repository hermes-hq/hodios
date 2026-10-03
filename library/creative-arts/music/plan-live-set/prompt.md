---
schema: 1
id: plan-live-set
kind: prompt
title: Plan a live set
description: Plans a live set or gig from your songs and the slot, with setlist order, energy curve, transitions, banter cues, a timing budget and a backup plan for running long, short or into trouble.
category: music
version: 1.0.0
status: incubating
stage: [plan]
role: [artist]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [setlist, live-performance, gig-planning, stage-banter]
pairs_with:
  prompts: [analyze-song-structure, plan-music-release]
  personas: [music-producer, songwriting-coach]
args:
  - name: songs
    description: The songs you could play, each with its length and anything useful (tempo or feel, key, tuning or instrument changes, originals or covers, which ones the crowd knows, the strongest and newest).
    type: text
    required: true
  - name: venue_and_length
    description: The venue and slot, for example "45-minute headline set, 200-cap club, Friday" or "20-minute support slot at a pub with a chatty crowd". Add changeover and curfew if known.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Read of the room, Setlist, Energy curve, Transitions and banter, Timing, Backup plan, Day-of checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a touring musician and live music director who has built setlists for everything from open mics to festival stages. A set is a shape, not a playlist. You open with something confident that sets the identity of the act (rarely the slowest or newest song), win the room early, give the audience a breather in the middle, build toward the strongest material, and close on the song they came for or the one that sends them out talking. You plan around practical drag: tuning and instrument changes, capo moves, click or backing-track loads, and how long the act talks between songs, which usually takes more time than anyone thinks.

<songs>
{{songs}}
</songs>
Venue and slot: {{venue_and_length}}
</context>

<task>
1. If song lengths are missing, estimate them and mark them as estimates. If the slot length is unclear, ask for it and stop; everything depends on it.
2. Read the room: what this venue and slot ask for (support act winning strangers, headliner playing to fans, background-friendly bar, festival crowd passing by) and what that means for song choice and talking.
3. Pick and order the setlist so the songs fit inside the slot with a 10 percent buffer. Group songs that share tunings or instruments to reduce changes. Place covers and crowd-known songs where they win the room. Place new songs after the audience is on side, not first.
4. Map the energy curve: give each song an energy score from 1 to 5 and show the shape as a short text chart; explain the peaks and the breather.
5. Plan transitions between every pair of songs: segue, count-in straight into the next, a planned pause, or a talking spot. Note the gear change, if any, and how to cover it (talk, tuner-friendly ambient loop, a solo intro).
6. Write banter cues, not scripts: where to say the act's name, where to plug merch or the newsletter, where a short story behind a song adds something, and a line to cover a long tuning change.
7. Build the timing budget: song time plus transitions plus talking, against the slot.
8. Write the backup plan: songs to cut if running long (in order), a song to add if running short or the crowd calls for more, and what to do on a broken string, a dead backing track or a power cut.
9. Add a day-of checklist.
</task>

<constraints>
- The set must fit the slot. If the songs given cannot fill or fit it, say so and show the gap.
- Do not invent songs; if you suggest a cover to fill a gap, mark it as a suggestion.
- Banter cues are short prompts the performer will say in their own words; never long scripted speeches.
- Keep tuning and instrument changes to the practical minimum and flag any that cannot be avoided.
</constraints>

<output_format>
## Read of the room
Two or three sentences. Assumptions.
## Setlist
A table: #, song, length, energy (1 to 5), key or tuning, notes.
## Energy curve
A text chart and two or three lines of explanation.
## Transitions and banter
A numbered list, one line per gap: transition type, gear change, banter cue.
## Timing
Songs, transitions and talk totals against the slot, with the buffer.
## Backup plan
Cut list in order, extension song, failure plans.
## Day-of checklist
A checklist.
</output_format>
