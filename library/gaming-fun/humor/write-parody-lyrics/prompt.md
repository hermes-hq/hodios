---
schema: 1
id: write-parody-lyrics
kind: prompt
title: Write parody lyrics
description: Writes parody lyrics about a personal topic to a well-known tune, matching the original's syllable count, stress and rhyme scheme so it can be sung straight away at a party or celebration.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [individual, writer]
requires: [none]
inputs: [text, topic]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [parody-song, song-lyrics, party-song, celebration, singalong, meter]
pairs_with:
  prompts: [write-roast, write-comedy-bit]
args:
  - name: topic
    description: What the song is about, with specific names, inside jokes, habits and true details, for example "Grandma Rosa's 90th, her lasagne, beating everyone at cards, her scooter". Include the audience and anything off limits.
    type: text
    required: true
  - name: song
    description: The tune to use, with the artist, for example "Dancing Queen by ABBA" or "Happy Birthday". Say which part to cover (whole song, verse and chorus, chorus only).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [The song, Syllable check, Performance notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write parody lyrics for parties, birthdays, weddings, leaving dos and family events. A parody works when people can sing it to the tune without stumbling: each new line has the same number of syllables as the original line, the stressed syllables fall on the same beats, the rhymes land where the original rhymes, and the hook of the chorus keeps its sound (for example, its vowel or the rhythm of its title phrase) so everyone recognises it. The jokes come from specific, true details about the person or topic, and the best line usually lands on the chorus.

Topic: {{topic}}
Tune: {{song}}
</context>

<task>
1. Map the tune: for the part of the song to cover, work out each line's syllable count, where the stresses fall and the rhyme scheme, from your knowledge of how the melody is sung. Do not reproduce the original lyrics; describe the structure with counts, stress patterns and rhyme letters only (for example "Verse line 1: 8 syllables, da-DUM ×4, rhyme A").
2. Plan the content: pick the five to eight best details from the topic, decide which one becomes the chorus hook, and keep the title phrase's rhythm.
3. Write the new lyrics line by line to fit the map exactly, with the funniest or most touching line at the end of each section. Keep it singable: no tongue-twisters, and open vowels on long held notes.
4. Check the fit: for each line, show the syllable count next to the original's count and fix any line that does not match. Mark where a syllable must be stretched or squeezed, and keep that to a minimum.
5. Give performance notes: who sings which part, where the audience can join in, a suggestion to print the lyrics or show them on a screen, and the original key or tempo to look for in a karaoke or instrumental version.
</task>

<constraints>
- Do not reproduce the original song's lyrics beyond its title. The new lyrics must be original; keep only the tune's structure and, if useful, the title phrase or a close play on it.
- Use only facts from the topic. If you need more detail, use a [placeholder] with a question rather than inventing stories about real people.
- Keep it affectionate: tease habits, not appearance, health or anything listed as off limits, and keep it clean if children or a mixed family audience will hear it.
- If you are not confident of the tune's structure, say so, ask for the line lengths or a different well-known tune, and offer a version for a tune you know well.
- Be honest in the syllable check; if a line does not quite fit, say so and offer a fix.
</constraints>

<output_format>
## The song
Section labels ([Verse 1], [Chorus], …), lyrics line by line.
## Syllable check
A table: Line | New lyric syllables | Original syllables | Note.
## Performance notes
</output_format>
