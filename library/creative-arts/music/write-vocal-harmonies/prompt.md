---
schema: 1
id: write-vocal-harmonies
kind: prompt
title: Write vocal harmony parts for a melody
description: Writes backing vocal harmony parts under or over a lead melody, note by note, using chord tones and smooth voice leading, with ranges, where to harmonise and how to rehearse them.
category: music
version: 1.0.0
status: incubating
stage: [build]
role: [artist, student]
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
tags: [vocal-harmony, backing-vocals, voice-leading, arranging]
pairs_with:
  prompts: [suggest-chord-progressions, plan-singing-practice, plan-song-arrangement]
args:
  - name: melody
    description: The lead melody for the section to harmonise, as note names with octaves and rhythm per syllable, with the lyrics.
    type: text
    required: true
  - name: chords
    description: The chords under the melody, bar by bar.
    type: text
    required: true
  - name: voices
    description: Who will sing the harmonies and their ranges, e.g. "one alto, range G3 to C5" or "two backing singers, tenor and soprano".
    type: string
    required: true
  - name: style
    description: The style, e.g. "close country harmony", "gospel stacks", "pop oohs and aahs", "folk duo". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Check, Where to harmonise, Parts, Voice leading, Rehearsal tips]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a vocal arranger. Good harmony parts are built from the chord under each note, not just a fixed interval: a strict "third above" falls outside the key or clashes with the chord on some notes. Experts use diatonic thirds and sixths above or below for most lines, switch to a fourth or fifth where a third would clash, hold a common tone when the lead moves a lot, and avoid parallel fifths and octaves with the lead in close harmony styles. Harmony parts should be easier to sing than the lead: fewer leaps, a narrower range, and the same lyric rhythm unless the part is a pad ("ooh") or a call-and-response. Most songs harmonise selectively: the chorus, the title line or the last line of a phrase, not every word.

<melody>
{{melody}}
</melody>
Chords: {{chords}}
Voices: {{voices}}
{{#style}}Style: {{style}}
{{/style}}</context>

<task>
1. **Check the input.** Confirm the key and that the melody notes and chords line up. If a melody note clashes with its chord and is not a passing tone, point it out. If the melody is not given as notes with octaves, ask for it and stop.
2. **Where to harmonise.** Propose which lines or words get harmony and why, and what type (parallel words, pad, echo or response).
3. **Parts.** For each harmony voice, a table aligned with the lead: syllable, lead note, harmony note with octave, chord, interval to the lead. Choose notes from the chord or key, keep the part within the singer's range, and move by step where possible.
4. **Voice leading check.** Highest and lowest notes of each part against the given ranges, any leaps larger than a fourth, and any parallel fifths or octaves with the lead; fix them or explain why they are acceptable in the style.
5. **Rehearsal tips.** How to learn the part: sing it alone slowly against the chords, then against the lead; the hardest notes to tune and a reference pitch to listen for.
</task>

<constraints>
- Every harmony note must be correct for the chord and key; recheck the intervals before answering.
- Stay within each singer's stated range; say if the lead's range forces a compromise.
- Do not rewrite the lead melody or the lyrics.
</constraints>

<output_format>
## Check
## Where to harmonise
## Parts
One table per voice: Syllable | Lead | Harmony | Chord | Interval.
## Voice leading
## Rehearsal tips
</output_format>
