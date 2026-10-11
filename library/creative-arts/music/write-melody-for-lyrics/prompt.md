---
schema: 1
id: write-melody-for-lyrics
kind: prompt
title: Write a melody for existing lyrics
description: Sets existing lyrics to a singable melody written as note names with rhythm per syllable, matching word stress to strong beats and giving the chorus a contrasting, higher hook.
category: music
version: 1.0.0
status: incubating
stage: [build]
role: [artist]
subject: [music-theory]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [melody-writing, prosody, topline, songwriting-craft]
pairs_with:
  prompts: [suggest-chord-progressions, write-song-lyrics, critique-song-lyrics]
args:
  - name: lyrics
    description: The lyrics with section labels. A verse and chorus is enough to start.
    type: text
    required: true
  - name: style
    description: Genre, tempo or feel, e.g. "mid-tempo country ballad, 76 bpm, 4/4" or "upbeat pop, 118 bpm".
    type: string
    required: true
  - name: key_and_range
    description: The key and the singer's comfortable range, e.g. "G major, singer range B2 to E4". Optional.
    type: string
  - name: chords
    description: An existing chord progression to fit the melody to. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Stress map, Plan, Melody, Chords, Singability, How to hear it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a topline writer. A melody for words succeeds when the words are understood and the hook is remembered. That comes from prosody: stressed syllables on strong beats or longer notes, unstressed syllables on weak beats or pickups, and the most important word of a line on the highest or longest note. Experts contrast sections: verses sit lower, use more notes per beat and narrower range, closer to speech; the chorus lifts (often starting a third to a fifth higher), uses longer notes and repetition, and lands the title on a stable chord tone. Common failures are melodies that ignore word stress ("be-LIEVE" sung as "BE-lieve"), that wander without a repeating motif, that put long notes on closed vowels or consonant-heavy syllables, and that exceed a real singer's range.

<lyrics>
{{lyrics}}
</lyrics>
Style: {{style}}
{{#key_and_range}}Key and range: {{key_and_range}}
{{/key_and_range}}{{#chords}}Chords to fit: {{chords}}
{{/chords}}</context>

<task>
1. **Stress map.** For the first verse line and every chorus line, mark the natural stressed syllables in capitals (for example "i KEPT the KEYS"). Note the key word of each line.
2. **Plan.** Choose meter and tempo from {{style}}, the key and range (if no range is given, assume about an octave and a third and say so), and the section contrast: verse register and rhythm, chorus starting pitch, where the highest note falls. Name the core motif (a short rhythm-and-interval idea) that the chorus will repeat.
3. **Melody.** For each section, a table per line: syllable, note name with octave, duration (e.g. quarter, eighth, dotted half), and beat position, with bar lines. Stressed syllables fall on beats 1 or 3 or on longer notes; the title lands on a stable tone (root, third or fifth of the chord under it).
4. **Chords under it.** If chords were given, show which chord sits under each bar and confirm that strong-beat notes are chord tones or deliberate tensions. If none were given, suggest a simple progression that supports the melody.
5. **Singability check.** Range used (lowest and highest notes) against the singer's range, long notes on open vowels, places to breathe, and any leap larger than a sixth.
6. **How to hear it.** A short note on how to try it: sing it slowly on a neutral syllable, or enter the notes into any notation or piano-roll app, plus one variation to try on the chorus.
</task>

<constraints>
- Write an original melody; do not borrow a recognisable melody from an existing song, and if a phrase you write closely matches a well-known one, change it.
- Every note must be inside the stated range; say so if the lyric forces a compromise.
- Do not change the lyrics; if a line will not sit well in any melody, point it out and suggest a small wording option separately.
</constraints>

<output_format>
## Stress map
## Plan
## Melody
One table per section: Bar | Syllable | Note | Duration | Beat.
## Chords
## Singability
## How to hear it
</output_format>
