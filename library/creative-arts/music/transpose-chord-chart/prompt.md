---
schema: 1
id: transpose-chord-chart
kind: prompt
title: Transpose a chord chart to a new key
description: Transposes a chord chart or lyric sheet to a new key or to fit a singer's range, with correct enharmonic spelling, capo options and the lyrics kept aligned.
category: music
version: 1.0.0
status: incubating
stage: [build]
role: [artist, student]
subject: [music-theory]
requires: [none]
inputs: [text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [transposition, capo, vocal-range, chord-sheets]
pairs_with:
  prompts: [suggest-chord-progressions, plan-singing-practice]
args:
  - name: chart
    description: The chord chart, lead sheet or lyrics with chords above the words, in its current key.
    type: text
    required: true
  - name: target
    description: Where to move it, e.g. "up a minor third", "to D major", or a singer's comfortable range such as "lowest note G3, highest note D5" with the melody's lowest and highest notes if known.
    type: string
    required: true
  - name: instrument
    description: The instrument the chart is for, so capo and shape advice fit.
    type: string
    default: guitar
output_contract:
  format: markdown
  sections: [Key and interval, Mapping, Transposed chart, Capo options, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a session musician who rewrites charts for singers every week. Transposing is simple arithmetic that goes wrong in predictable ways: wrong enharmonic spelling (A# major instead of Bb major, which nobody reads), slash-chord bass notes left untransposed, chord qualities changed by accident (a sus4 or m7b5 dropped), and lyrics that slide out from under their chords when chord names change length. To fit a singer, what matters is the melody's lowest and highest notes, not the key name: a song whose melody spans A3 to E5 moved down a whole step spans G3 to D5. On guitar, a capo lets the player keep familiar open shapes in the new key; the best capo fret is usually the one that gives open shapes from the C, A, G, E or D families.
</context>

<task>
Transpose this chart for {{instrument}}.

<chart>
{{chart}}
</chart>
Target: {{target}}

1. **Key and interval.** Identify the current key from the chords (say if it is ambiguous). Work out the target key and the interval in semitones. If the target is a vocal range, compare it with the melody's range if given; if the melody's range is not given, ask for the song's lowest and highest sung notes, or give the best estimate from the key and say it is an estimate. Choose the key that puts the melody inside the range with a little room at the top.
2. **Mapping table.** Every distinct chord in the original mapped to its new name, including slash chords (transpose both chord and bass) and extensions, spelled for the new key (flat keys use flats, sharp keys use sharps).
3. **Transposed chart.** Rewrite the full chart with the new chords, keeping each chord above the same syllable as the original. Keep section labels, repeats and notes.
4. **Capo options** (guitar, ukulele and similar): one or two capo positions that give easy open shapes, the shapes to play, and which sounds closer to the original voicing. For other instruments, note any chord that becomes awkward and a simpler substitute.
5. **Check.** Confirm the number of semitones applied to every chord, and that no chord quality changed.
</task>

<constraints>
- Spell chords for the target key; never write mixed spellings like A# and Db in the same key.
- Change only chord names; do not edit lyrics, structure or chord qualities.
- If the original chart has chords that do not fit any single key, transpose them literally and say so instead of "correcting" them.
</constraints>

<output_format>
## Key and interval
## Mapping
Table: Original | New.
## Transposed chart
One code block, monospaced so chords stay over the right words.
## Capo options
## Check
</output_format>
