---
schema: 1
id: write-background-music-cues
kind: prompt
title: Write background music cue prompts
description: Writes music-generation prompts for background cues under video, podcasts, games or presentations, with length, a mood arc, loop points and room left for voice.
category: music
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, game-developer]
requires: [none]
inputs: [text, notes]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [underscore, music-bed, game-loop, loop-points]
pairs_with:
  prompts: [build-music-sound-kit, write-music-prompt, write-sound-effect-prompts]
args:
  - name: use
    description: "Where the music sits: video (under narration or b-roll), podcast (intro, beds and outro), game-loop (repeating level or menu music), presentation (quiet bed under a talk or slides)."
    type: enum
    enum: [video, podcast, game-loop, presentation]
    default: video
  - name: moods
    description: "The mood for each section in order, with timings if you have them, e.g. '0:00 curious, 0:30 tense build, 0:50 relief'."
    type: text
    required: true
  - name: seconds
    description: Total length of the cue in seconds. For a game loop, the loop length; for a podcast, the length of the bed that sits under speech (stings and the outro are sized separately).
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Cue sheet, Musical frame, Cue prompts, Voice space, Edit and loop notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Background music has a different job from a song: it supports something else. Under speech it must leave the voice's frequency range and attention free, which means no lead vocals, no busy melody in the midrange, steady dynamics and few surprises. In games it must loop for minutes without fatigue and without a click at the loop point. In video it must change mood exactly where the picture does. Generators default to songs with a vocal hook and a big ending, so cue prompts have to ask explicitly for restraint, structure in bars and clean edit points.
</context>

<task>
Write background music cue prompts for {{use}}, {{seconds}} seconds in total.

<moods>
{{moods}}
</moods>

1. If the moods give no order or no sense of where changes happen, ask once for the sequence (and timings, for video) and stop.
2. **Musical frame.** Pick one tempo in BPM that suits all sections, the meter, and compute seconds per bar (60 / BPM × beats per bar). Round each section to a whole number of bars and show the arithmetic, so edit points fall on bar lines. Adjust BPM slightly if it makes {{seconds}} seconds a whole number of bars, and say so.
3. **Cue sheet.** A table of sections with start time, bars, mood, energy (1 to 5), and what changes musically (instrument enters, filter opens, drums drop out).
4. **Cue prompts.** Per use:
   - video: one prompt for the whole cue if the tool can follow a structure, otherwise one prompt per section designed to crossfade at bar lines; mood shifts on the timings given.
   - podcast: an intro sting (5 to 15 seconds), a loopable bed for under speech, a transition stinger, and an outro, all sharing instruments and key.
   - game-loop: a main loop of whole bars that ends harmonically where it starts, with no reverb tail or crash cymbal at the end; plus an optional intensity layer (same tempo and key) for tension states, and a short stinger for wins or fails.
   - presentation: a single quiet bed with very low dynamic range and no strong melody.
   Each prompt states: instrumental, BPM, key or mode, instruments and their register, mood, energy curve, and "no vocals, no lead melody competing with speech" where speech is present.
5. **Voice space.** For cues under speech: keep instruments out of the core speech range or playing sustained parts there, use warm low end and airy highs, avoid sudden hits, and suggest mixing the bed well below the voice and ducking it under speech in the editor.
6. **Edit and loop notes.** Where to cut, how to test a loop (play it ten times; listen for clicks, tail cut-offs and fatigue), and that generators often add endings or fade-outs, so trim to the bar and crossfade a few milliseconds at the loop point.
7. Before answering, check that section bars add up to {{seconds}} seconds at the chosen BPM within one bar (for a podcast, the bed alone; stings and outro are listed with their own lengths), and that every prompt names BPM, key and instrumental.
</task>

<constraints>
- No artist names or song titles in prompts; describe the sound.
- Remind the user to confirm that the music tool's licence allows their use (commercial video, podcast, game), since terms differ and change.
- No tool, model or version names.
</constraints>

<output_format>
## Cue sheet
Table: Section | Start | Bars | Mood | Energy | Musical change.
## Musical frame
BPM, meter, seconds per bar and the arithmetic.
## Cue prompts
One code block per cue or section, each with its length.
## Voice space
## Edit and loop notes
</output_format>
