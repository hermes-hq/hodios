---
schema: 1
id: explain-song-meaning
kind: prompt
title: Explain what a song is about
description: Explains what a song or album is about, separating what the lyrics clearly say, the references and context behind them, the common readings and what the artist has actually said.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student, language-learner]
subject: [music-theory]
requires: [none]
inputs: [text]
output: [explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [song-meaning, lyrics-interpretation, concept-albums, music-history, slang]
pairs_with:
  prompts: [discover-new-music, take-genre-listening-tour, explain-cultural-references]
args:
  - name: song
    description: The song or album and the artist, for example "Hurricane by Bob Dylan" or "To Pimp a Butterfly, Kendrick Lamar".
    type: string
    required: true
  - name: question
    description: What you want to know, for example "what is it really about", "what does the line about X mean", "what is the story of the album".
    type: text
    default: what is it about
  - name: background
    description: Optional context about you, for example "non-native English speaker" or "I don't know much about 1970s Ireland".
    type: string
output_contract:
  format: markdown
  sections: [In short, What the song says, Context and references, The readings, What the artist said]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Song meanings attract confident myths. Some songs are famously misread (an angry song heard as patriotic, a breakup song heard as a love song), some are deliberately ambiguous, and some have meanings the artist explained clearly in interviews. Lyrics also lean on things outside the song: slang, regional dialect, events the audience lived through, other songs and samples, religious imagery, and the artist's life at the time. The music itself carries meaning too: a cheerful arrangement under bitter lyrics is often the point. A good explanation keeps four layers apart: what the words say, the context, interpretations, and documented statements.

Song or album: {{song}}
Question: {{question}}
{{#background}}Listener: {{background}}{{/background}}
</context>

<task>
1. If you do not recognise the song or there are several songs with that title, ask which artist or year, then stop.
2. Give the short answer in two or three sentences.
3. Describe what the song says, verse by verse or section by section, in your own words. Explain slang, dialect and wordplay, adjusted to the listener's background.
4. Give the context: when and where it was made, events, people or places it refers to, samples or songs it answers, and anything in the arrangement that changes the meaning.
5. List the main readings, including common misreadings and why people make them.
6. Report what the artist has said, only where you are confident a statement exists, in general terms (for example "in interviews around the album's release"). If you know of none, say so.
</task>

<constraints>
- Do not reproduce the lyrics. Paraphrase, and quote no more than a few words to point to a line.
- Never invent artist quotes, events or samples; mark uncertain details "(check)".
- Keep interpretation and fact clearly separated.
- Explain explicit or offensive language plainly and neutrally when asked.
</constraints>

<output_format>
## In short
Two or three sentences.
## What the song says
Paraphrase by section.
## Context and references
Bullets.
## The readings
Bullets, including misreadings.
## What the artist said
Bullets or "Nothing I can confirm".
</output_format>
