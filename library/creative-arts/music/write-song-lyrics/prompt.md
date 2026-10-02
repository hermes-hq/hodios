---
schema: 1
id: write-song-lyrics
kind: prompt
title: Write song lyrics
description: Writes original song lyrics with a clear section structure, a memorable hook, a consistent rhyme scheme and singable meter, from a theme, genre and mood. Use when writing or co-writing a song.
category: music
version: 1.0.0
status: incubating
stage: [build]
role: [artist, writer, content-creator]
requires: [none]
inputs: [text, topic]
output: [article, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [songwriting-craft, rhyme-scheme, prosody, hooks]
pairs_with:
  prompts: [write-music-prompt, suggest-chord-progressions]
args:
  - name: theme
    description: What the song is about, the story or situation, the point of view, and the mood. Concrete details (a place, an object, a moment) help.
    type: text
    required: true
  - name: genre
    description: The genre or sound, e.g. "indie folk", "2000s pop-punk", "country ballad", "UK drill".
    type: string
    required: true
  - name: structure
    description: Section order, comma-separated, using intro, verse, pre-chorus, chorus, post-chorus, bridge, hook, outro.
    type: string
    default: verse, chorus, verse, chorus, bridge, chorus
output_contract:
  format: markdown
  sections: [Concept, Lyrics, Craft notes, Alternatives]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Generated lyrics tend to sound alike: abstract feelings stated outright ("my heart is broken, I feel so lost"), forced rhymes that bend word order, lines of wildly different length that no melody can carry, and choruses with no hook. Good lyrics show the feeling through concrete images, put the title where the ear expects it, move the story forward from verse to verse, and are built to be sung: matched syllable counts between parallel lines, stressed syllables on strong beats, and open vowels on the long notes.
</context>

<task>
Write original {{genre}} lyrics about:

<theme>
{{theme}}
</theme>

Structure: {{structure}}

1. **Concept:** the song's title (which is also the hook), the point of view (I, you, we, a character), the one-sentence emotional arc, and the central image or metaphor. Say how each section will develop it: verse 1 sets the scene, verse 2 moves it forward or deepens it, the chorus states the core idea, the bridge gives a new angle or turn.
2. Match the conventions of {{genre}}: typical line length, rhyme density (perfect rhymes in pop and country, more slant and internal rhyme in hip-hop and indie), vocabulary register, and section lengths.
3. Write the lyrics following the structure exactly:
   - Use concrete, sensory details instead of naming emotions.
   - Put the title in the chorus at the first or last line, or both.
   - Keep a consistent rhyme scheme within each section type (for example ABAB in verses, AABB in choruses), and keep parallel lines within one or two syllables of each other.
   - Place natural word stress on the strong beats; never twist word order to reach a rhyme.
   - Prefer open vowels (as in "go", "way", "free") at the ends of lines that will be held.
   - Avoid stock phrases ("fire in my soul", "end of the road", "dance in the rain") unless twisted into something fresh.
   - Repeat the chorus with the same words, or with one deliberate change in the last chorus.
4. **Craft notes:** the rhyme scheme per section, syllable counts per line for the first verse and chorus, and where the hook lands.
5. **Alternatives:** 2 alternative chorus lines or titles, and the 2 weakest lines in the draft with a replacement for each.
6. If the theme is too vague to find a concrete story (for example "love"), choose a specific angle, state it in the concept, and offer a different angle in one line.
</task>

<constraints>
- Write original lyrics. Do not reproduce or closely paraphrase existing songs. If asked to write "in the style of" an artist, capture general traits (themes, imagery, rhyme habits, structure) without copying their lines or signature phrases.
- Keep content appropriate to the genre and the request; do not add explicit content that was not asked for.
- Label every section in square brackets, e.g. [Verse 1], [Chorus], [Bridge].
</constraints>

<output_format>
## Concept
## Lyrics
Section labels in square brackets, one lyric line per line, a blank line between sections.
## Craft notes
## Alternatives
</output_format>
