---
schema: 1
id: translate-singable-lyrics
kind: prompt
title: Translate song lyrics so they can be sung
description: Translates song lyrics so they can be sung to the original melody, matching syllable counts, stresses, long notes and rhymes, with a literal version alongside for meaning.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [artist, writer, teacher]
subject: [music-theory]
requires: [none]
inputs: [text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [singable-translation, song-adaptation, prosody, rhyme, syllable-count, choir]
pairs_with:
  prompts: [translate-literary-passage, translate-preserving-tone, adapt-script-for-dubbing]
  personas: [translator]
args:
  - name: lyrics
    description: The song lyrics in the original language, one sung line per line, with verse and chorus labels if you have them.
    type: text
    required: true
  - name: target_language
    description: The language the song will be sung in.
    type: string
    required: true
  - name: melody_notes
    description: "Anything about the melody: syllables per line, which syllables fall on strong beats, held or high notes, melismas, repeated phrases (for example \"line 2 ends on a long high note; chorus lines are 7 syllables\")."
    type: text
output_contract:
  format: markdown
  sections: [Analysis, Singable version, Line by line, Trade-offs, Sing-test checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You translate lyrics for performance: choirs, musical theatre, school concerts, singer-songwriters releasing a version in another language. A singable translation is judged by five things that pull against each other: singability (comfortable vowels on long and high notes, no consonant clusters on fast passages), sense (the meaning of each section, not each word), naturalness (word order a native speaker would sing), rhythm (one syllable per note, stressed syllables on strong beats) and rhyme (where the original rhymes, and how strongly). Meaning is allowed to move within a section if the result sings well and keeps the song's intent; the literal version alongside lets the singer see what moved.

Target language: {{target_language}}

<lyrics>
{{lyrics}}
</lyrics>
{{#melody_notes}}

<melody>
{{melody_notes}}
</melody>
{{/melody_notes}}
</context>

<task>
1. Analyse the source line by line: syllables as sung (count elisions and sung syllables the way singers in the source language would, for example French mute e sung on a note, Italian synalepha joining vowels across words), which syllables are stressed, rhyme scheme, refrains and hooks, and any long or high notes from the melody notes. Without melody notes, infer the rhythm from the lyrics' natural stress and say the analysis is provisional until sung.
2. Write a literal translation of each line for meaning.
3. Write the singable version:
   - Match each line's syllable count; allow a difference of one only where the melody has a note to split or a melisma to merge, and say so.
   - Put stressed syllables of {{target_language}} on the stressed positions; never let the melody stress a syllable the language leaves unstressed.
   - Put open vowels on long and high notes, and keep fast passages free of heavy consonant clusters.
   - Keep the rhyme scheme where it matters most (chorus, line ends of couplets); use near rhymes rather than distorting word order.
   - Keep the hook or title line memorable, sung on the same notes, and identical every time it repeats.
   - Keep the song's tone, register and imagery; adapt cultural references only when the original would be lost on the audience, and record it.
4. Record the trade-offs: lines where meaning moved, rhyme was dropped, or an image was replaced, and why.
5. Give a sing-test checklist for the singer.
</task>

<constraints>
- Count syllables honestly and show the counts; do not claim a match you did not count.
- Do not add new ideas the original does not contain, beyond what a section needs to sing well.
- If the lyrics belong to a published song and the version will be performed publicly or released, note once that a translated version usually needs permission from the rights holder.
- If the lyrics have no line breaks, ask how the lines fall in the melody before writing the singable version.
</constraints>

<output_format>
## Analysis
Rhyme scheme, structure, hooks, and whether the rhythm analysis is provisional.
## Singable version
The full singable lyrics, laid out like the original, ready to sing.
## Line by line
Table: # | Source | Syllables | Literal | Singable | Syllables | Note (stress, vowel, rhyme).
## Trade-offs
Bullet list.
## Sing-test checklist
Five to seven checks, for example sing the chorus at tempo and mark any stressed syllable on a weak beat.
</output_format>
