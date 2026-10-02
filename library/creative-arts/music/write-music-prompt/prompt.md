---
schema: 1
id: write-music-prompt
kind: prompt
title: Write a prompt for an AI music generator
description: Writes AI music generator prompts with genre, instrumentation, tempo, vocal and production details, plus lyrics marked up with structure tags. Use before generating a song in Suno, Udio or similar.
category: music
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, artist, marketer]
stack: [suno]
requires: [none]
inputs: [text, topic]
output: [prompt]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [text-to-music, style-prompt, structure-tags, ai-music]
pairs_with:
  prompts: [write-song-lyrics, suggest-chord-progressions]
args:
  - name: idea
    description: "The track you want: genre or references described in words, mood, use (podcast intro, game loop, full song), length, vocals or instrumental."
    type: text
    required: true
  - name: tool
    description: The music generator, e.g. suno, udio, or a text-to-audio model. Syntax and limits differ by tool and version.
    type: string
    default: suno
  - name: lyrics
    description: Your lyrics, if the track has vocals. Optional; without them the track is instrumental unless the idea asks for vocals, in which case short placeholder lyrics are written.
    type: text
output_contract:
  format: markdown
  sections: [Style prompt, Lyrics with tags, Settings, Variations, Tips]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Music generators respond to the vocabulary producers use: subgenre and era, tempo in BPM, the instruments and how they are played, the vocal type and delivery, the mix and production character, and the energy curve. Vague prompts ("happy upbeat song") give generic results, artist names are often blocked and are a poor way to describe a sound, and lyrics without section tags produce songs with no clear chorus or ending.
</context>

<task>
Write a {{tool}} prompt for this idea:

<idea>
{{idea}}
</idea>
{{#lyrics}}
<lyrics>
{{lyrics}}
</lyrics>
{{/lyrics}}

1. Decide the sound in producer terms: genre and subgenre, era or decade, tempo in BPM, key or mode if it matters, time feel (straight, swung, half-time), lead and supporting instruments with playing style, vocal type and delivery (or instrumental), production (lo-fi, polished, live room, tape saturation, reverb character), and the energy arc.
2. **Style prompt:** write a dense, comma-separated description, most important descriptors first. Describe references by their sound rather than by artist names, since many tools block them. Keep it within the tool's style-field limit (check the current limit for your version; older Suno versions allowed only about 120 to 200 characters, newer ones far more). If the tool supports excluding styles, list exclusions separately.
3. **Lyrics with tags:** put structure tags in square brackets on their own line before each section: [Intro], [Verse 1], [Pre-Chorus], [Chorus], [Bridge], [Instrumental Break] or a named solo, [Outro], and [End] to help the track finish cleanly. You may add short performance cues in tags (for example [Whispered], [Build], [Drop], [Guitar Solo]), but keep them sparse; tools treat them as hints, not commands. If the user gave lyrics, keep their words exactly and only add tags and section breaks. If their lyrics are too short for the song the idea describes (for example four lines for a full song with a big chorus), do not pad them with new words silently: assign their lines to the sections they fit best, repeat their chorus lines where a song would, and say how many more lines a fuller structure needs, offering marked placeholder lines the user can replace. If they gave none and the track has vocals, write short placeholder lyrics and say they are placeholders.
4. For instrumentals: use only structure and instrument tags, say "instrumental" in the style prompt, and for loops note that the tool may not produce a seamless loop, so the user should plan to edit one.
5. **Settings:** a track title, and the options this tool exposes that matter here (for Suno: custom mode, the instrumental switch and the model version; other tools have their own equivalents). Name settings to check rather than inventing controls the tool may not have.
6. **Variations:** two alternative style prompts that each change one dimension (tempo and energy, or instrumentation, or era), with a note on what each changes.
7. For tools without a lyrics field (text-to-audio models), write a single descriptive prompt with BPM, instruments, mood and duration, and say that vocals with specific words are not supported there.
</task>

<constraints>
- Never put a real artist's name, or the title of an existing song, in the prompt. Describe the sound instead.
- Do not write lyrics that copy existing songs.
- Do not claim the tool will follow every tag or exact BPM. Tell the user to generate several takes and pick.
</constraints>

<output_format>
## Style prompt
Code block. Then an "Exclude:" code block if relevant.
## Lyrics with tags
Code block, or "Instrumental: structure tags only" with the tags.
## Settings
## Variations
Two code blocks, each with a one-line note.
## Tips
2 to 3 tips for fixing common results with this track (too busy, wrong vocal, weak ending).
</output_format>

<examples>
<example>
Idea: "chill instrumental for a study stream, rainy night feel".
Style prompt: "lo-fi hip hop, instrumental, 72 BPM, swung drums with soft vinyl crackle, mellow Rhodes chords, muted jazz guitar licks, warm upright bass, rain ambience, tape saturation, relaxed and nocturnal"
</example>
</examples>
