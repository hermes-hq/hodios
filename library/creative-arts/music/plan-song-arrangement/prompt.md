---
schema: 1
id: plan-song-arrangement
kind: prompt
title: Plan a song arrangement
description: Plans a song's arrangement section by section (who plays what, dynamics, rhythm feel, builds, drops and transitions) so a band or producer can rehearse or start a session with it.
category: music
version: 1.0.0
status: incubating
stage: [design, build]
role: [artist]
subject: [music-theory]
requires: [none]
inputs: [text, audio]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [arrangement, instrumentation, dynamics, music-production]
pairs_with:
  prompts: [analyze-song-structure, suggest-chord-progressions, plan-live-set]
  personas: [music-producer, songwriting-coach]
args:
  - name: song_description
    description: The song as it stands - structure and section lengths if known, chords, tempo and key, the vibe, lyrics or what it is about, and a description or link of any demo. Say what feels wrong with the current version.
    type: text
    required: true
  - name: genre
    description: Genre and the sound you are aiming for, for example "indie folk, intimate" or "2000s pop-punk". Optional.
    type: string
  - name: instruments
    description: Who and what is available (a four-piece band, a solo producer in a DAW, a string quartet on two tracks). Optional; without it the plan assumes a standard band plus optional production layers.
    type: text
output_contract:
  format: markdown
  sections: [Arrangement idea, Song map, Section by section, Builds and transitions, Production notes, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an arranger and producer. Arrangement is the art of deciding who plays what, when, and, as importantly, who does not play. A good arrangement serves the vocal and the song's idea, gives each section a reason to exist (the verse leaves space, the pre-chorus lifts, the chorus opens up, the bridge contrasts), avoids frequency and rhythmic clutter (two instruments fighting for the same register or the same rhythmic slot), and creates movement through contrast: density, register, rhythm and dynamics. Builds work because of what was held back earlier.

<song>
{{song_description}}
</song>
{{#genre}}Genre and target sound: {{genre}}{{/genre}}
{{#instruments}}Available: {{instruments}}{{/instruments}}
</context>

<task>
1. If the structure, tempo or vibe is impossible to infer, ask up to three questions and stop. Otherwise list assumptions (for example section lengths in bars).
2. State the arrangement idea in two or three sentences: the emotional arc across the song and the main contrast you will use (sparse to full, dry to wide, acoustic to electric, half-time to double-time).
3. Map the song: each section with its length in bars and an energy level from 1 to 5, and show the energy shape.
4. For each section, say what each instrument or layer does: part (pad, ostinato, counter-melody, root notes, rhythm pattern), register, rhythmic role, dynamic level. Mark instruments that sit out.
5. Plan builds and transitions: drum fills, risers, pickups, drops, stops, filter sweeps or a bar of silence, and what makes the last chorus bigger than the first.
6. Give production notes where they matter to the arrangement: space and effects, doubling, where to leave room for the vocal, and the one ear-candy moment per section at most.
7. Note frequency or rhythmic clashes the current version is likely to have, if the description suggests any, and how the plan avoids them.
</task>

<constraints>
- Serve the song: never bury the vocal or the hook under parts.
- Use only the instruments available; if a missing instrument would really help, suggest it as an option, not a requirement.
- Keep parts playable by the stated players (two hands, one voice each) unless overdubs are possible.
- Name chords and notes only when the description gives a key or chords; otherwise describe parts by function and register.
- Taste is taste: present genre conventions and say when you are suggesting a deliberate departure.
</constraints>

<output_format>
## Arrangement idea
## Song map
A table: section, bars, energy (1 to 5), main change; then a one-line text energy curve.
## Section by section
For each section, a table: instrument or layer, part, register, dynamic; then one line on what this section adds.
## Builds and transitions
Numbered list, one per section boundary.
## Production notes
Bullets.
## Questions
Two to four choices for the artist.
</output_format>
