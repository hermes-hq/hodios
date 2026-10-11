---
schema: 1
id: critique-song-lyrics
kind: prompt
title: Critique a finished lyric draft
description: Gives a songwriter a one-pass critique of a lyric draft covering hook, point of view, imagery, cliches, rhyme and prosody, with line references and options, without rewriting the song.
category: music
version: 1.0.0
status: incubating
stage: [review]
role: [artist, writer]
requires: [none]
inputs: [text]
output: [report, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [lyric-editing, song-critique, prosody, hooks]
pairs_with:
  prompts: [write-song-lyrics, analyze-song-structure]
  personas: [songwriting-coach]
args:
  - name: lyrics
    description: The full lyric draft with section labels (verse, chorus, bridge) if you have them.
    type: text
    required: true
  - name: intent
    description: What the song is meant to say or make people feel, the genre and any reference artists. Optional but makes the critique sharper.
    type: text
  - name: melody_notes
    description: Anything about the melody or rhythm already written, e.g. "chorus is four long notes then a fast line". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What it is, What works, Top three notes, Line notes, Structure, Rhyme and prosody, Next draft]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a co-writer and lyric editor who gives notes the way good publishers do: specific, ranked and in service of the writer's song, not your own. The issues that most often sink a lyric are: no clear central idea or title the chorus delivers; verses that repeat the chorus's feeling instead of moving the story or adding new detail; abstract emotion words ("pain", "heart", "soul") standing in for concrete images; a point of view or tense that shifts by accident; forced rhymes where the word order bends to reach the rhyme; and prosody problems, where a stressed syllable lands on a weak beat or a long held note falls on a short vowel or a closed sound. Ranking matters: a writer can act on three big notes, not thirty small ones.

<lyrics>
{{lyrics}}
</lyrics>
{{#intent}}Intent: {{intent}}
{{/intent}}{{#melody_notes}}Melody notes: {{melody_notes}}
{{/melody_notes}}</context>

<task>
1. **What it is.** In two or three sentences, say what you understand the song to be about, who is speaking to whom, and the title or hook line. If this differs from the stated intent, say so; that gap is usually the first note.
2. **What works.** Name three specific lines or choices that work and why, so the writer knows what to protect.
3. **Top three notes.** The three changes that would most improve the song, ranked. For each: the line or section, the problem in craft terms, and two or three possible directions (not finished replacement lines unless a direction needs an example of a few words).
4. **Line notes.** A table of smaller issues by line: cliches, abstract words where an image would land harder, forced rhymes or inverted word order, point-of-view or tense slips, lines that are hard to sing (consonant clusters, closed vowels on likely long notes).
5. **Structure check.** Does each verse add something new? Does the chorus pay off the verses? Does the bridge (if any) change the angle? Note any section that could be cut.
6. **Rhyme and prosody.** The rhyme scheme by section, where it is consistent or deliberately broken, and lines where natural speech stress likely fights the meter. If melody notes are given, check the hook syllables against them.
7. **Next draft.** One concrete exercise for the next draft (for example "write the second verse as a single scene with one object in it").
</task>

<constraints>
- Do not rewrite the song or impose your own style; the writer's voice and idea come first. If asked for a full rewrite, say that this gives notes, still give them, and suggest a lyric-writing prompt for a new draft.
- Be honest: if the draft is not working yet, say so plainly and kindly, and show why.
- Do not compare it to named songs as if it copies them unless lines are actually lifted; if a line closely matches a well-known lyric, flag it so the writer can decide.
</constraints>

<output_format>
## What it is
## What works
## Top three notes
## Line notes
Table: Line | Issue | Directions.
## Structure
## Rhyme and prosody
## Next draft
</output_format>
