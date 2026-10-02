---
schema: 1
id: songwriting-track
kind: workflow
title: Songwriting track
description: Takes a song from concept and title to hook, verse lyrics, structure, a chord sketch and a final edit, pausing for the songwriter between steps. Use when writing a complete song.
category: music
version: 1.0.0
status: incubating
stage: [discover, design, build, review]
role: [artist, writer]
subject: [music-theory]
requires: [none]
inputs: [text, topic]
output: [plan, article, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [songwriting-craft, hooks, prosody, chord-sketch]
pairs_with:
  prompts: [write-song-lyrics, suggest-chord-progressions, analyze-song-structure]
  personas: [songwriting-coach]
args:
  - name: concept
    description: What the song is about, in any form (a situation, a feeling, a title, a line you love, a story). Concrete details help.
    type: text
    required: true
  - name: genre
    description: The genre or sound, e.g. "indie folk", "90s R&B", "country", "pop-punk". Optional; step 1 asks if missing.
    type: string
  - name: mood
    description: The feeling the listener should be left with, e.g. "bittersweet", "defiant", "giddy". Optional; step 1 asks if missing.
    type: string
steps:
  - {id: concept, file: steps/01-concept.md, stage: discover, gate: approve, artifact: "song-notes/01-concept.md"}
  - {id: hook, file: steps/02-hook.md, stage: design, gate: approve, artifact: "song-notes/02-hook.md"}
  - {id: verses, file: steps/03-verses.md, stage: build, gate: approve, artifact: "song-notes/03-verses.md"}
  - {id: structure, file: steps/04-structure.md, stage: build, gate: approve, artifact: "song-notes/04-structure-and-chords.md"}
  - {id: final-edit, file: steps/05-final-edit.md, stage: review, gate: none, artifact: "song-notes/05-final.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Writes a complete song with the songwriter, the way a good co-write runs: idea and title, chorus hook, verses that earn it, structure and chords, then a line edit.

<concept>
{{concept}}
</concept>

Genre: {{genre}}. Mood: {{mood}}. If either is blank, step 1 asks for it.

Rules for every step:
- The songwriter owns the song. Offer options and ask for decisions on anything that defines it (title, point of view, story, genre, the last line) instead of choosing silently.
- Build on the approved documents. Never change an approved title, hook or line without flagging it and saying why.
- Write for singing: natural word stress on strong beats, matched syllable counts between parallel lines, open vowels on held notes, no word order bent for a rhyme.
- Write original lyrics. Do not reproduce or lightly alter existing songs; for "in the style of" requests, capture general traits (themes, imagery, rhyme habits, structure) without copying lines.
- Keep each document short, and do not write sections a later step owns.
- If the songwriter wants to go faster, offer a fast route (one question per step, shorter documents) but keep every approval gate.
