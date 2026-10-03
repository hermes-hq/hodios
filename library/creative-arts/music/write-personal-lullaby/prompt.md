---
schema: 1
id: write-personal-lullaby
kind: prompt
title: Write a personal lullaby
description: Writes a gentle lullaby for a child with their name, a simple repeating melody described in plain words or chords, and calm imagery from their own world.
category: music
version: 1.0.0
status: incubating
stage: [build]
role: [parent]
requires: [none]
inputs: [preferences, text]
output: [article, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [lullaby, bedtime, singable, family-song]
pairs_with:
  prompts: [write-song-lyrics, suggest-chord-progressions]
args:
  - name: child_name
    description: The child's name or nickname as you say it at bedtime.
    type: string
    required: true
  - name: details
    description: "Things from the child's world to weave in: a favourite toy, pet, place, person, or bedtime ritual. Optional."
    type: text
  - name: language
    description: Language to write the lullaby in. It is written natively in that language, not translated.
    type: string
    default: English
output_contract:
  format: markdown
  sections: [Lullaby, How it goes, Chords, Singing tips]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lullabies across cultures share a recognisable shape: a slow, rocking pulse; a narrow range a tired parent can sing softly; short phrases that fall at the end; lots of repetition; soft sounds; and imagery that winds the day down toward sleep. A personal lullaby works when it uses the child's name and a few true details from their life, and when someone with no musical training can learn it in two or three hearings.
</context>

<task>
Write a lullaby for {{child_name}} in {{language}}.
{{#details}}

Details from their world: {{details}}
{{/details}}

1. **Lullaby.** Write two or three short verses and a refrain that returns after each verse:
   - lines of 4 to 8 syllables, in a gentle rocking rhythm (lilting groups of three, like a slow waltz, or a slow even two);
   - the name {{child_name}} in the refrain, placed where it falls naturally on a strong beat;
   - imagery that moves from the day toward stillness (the toy goes to sleep, the lights go out, the moon keeps watch), using the details given;
   - soft sounds (m, n, l, s, open vowels) and rhymes that are easy to remember;
   - an ending that slows down and closes on sleep, with the last refrain softer.
   Write natively in {{language}}, with rhythm and rhymes that work in that language rather than translating an English pattern.
2. **How it goes.** Describe the melody so a non-musician can find it: the refrain starts on a comfortable middle note, moves mostly by small steps, stays within a small range, and each line drifts down at its end; mark which words are held longer. If useful, add simple numbers (1 2 3 3 2 1) for the refrain using scale degrees, and explain them in one line.
3. **Chords.** Three easy chords in a gentle key for guitar, piano or ukulele (for example G, C, D7 or C, F, G7), written above the refrain lines, with a note that humming without accompaniment works just as well.
4. **Singing tips.** Two or three: sing quietly and slower each time through, hum a verse instead of singing it, let the refrain repeat as long as needed.
5. Before answering, read the lyric for rhythm (every line in the same pulse), check that nothing in it could frighten a small child (no falling, monsters, being left alone), and that the name appears in every refrain.
</task>

<constraints>
- Keep it calm and safe: no scary imagery, and no promises about the world that a parent might not want to make.
- Use only the name and details given; do not add other personal information.
- If the user asks for a well-known lullaby with the name swapped in, write an original one instead, since lyrics of recent songs are protected; traditional public-domain lullabies may be adapted if the user names one.
</constraints>

<output_format>
## Lullaby
Verses and refrain, refrain marked.
## How it goes
## Chords
Refrain with chord names above the lines.
## Singing tips
</output_format>
