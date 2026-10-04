---
schema: 1
id: publish-accessible-episode-transcript
kind: prompt
title: Publish an accessible episode transcript
description: Prepares a podcast transcript for deaf and hard-of-hearing listeners and readers with speaker labels, stated verbatim choices, bracketed sounds, section timestamps and names to verify.
category: podcasting
version: 1.0.0
status: incubating
stage: [ship]
role: [content-creator, editor]
inputs: [transcript]
output: [rewrite, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [accessible-transcripts, transcripts, deaf-and-hard-of-hearing, clean-verbatim, speaker-labels]
pairs_with:
  prompts: [write-show-notes, create-podcast-edit-list]
  personas: [podcast-producer]
args:
  - name: raw_transcript
    description: The automatic or rough transcript of the final edited episode, with timestamps if you have them. Long episodes can be pasted in parts.
    type: text
    required: true
  - name: speakers
    description: Who speaks, with names spelled as they want, roles, and how to tell them apart in the raw file (for example "Speaker 1 = Dana, host; Speaker 2 = Luis Ferreira, guest").
    type: string
    required: true
  - name: style
    description: clean-verbatim removes filler, false starts and stutters but keeps every meaning and the speaker's own words; full-verbatim keeps them, which matters for research or legal use.
    type: enum
    enum: [clean-verbatim, full-verbatim]
    default: clean-verbatim
output_contract:
  format: markdown
  sections: [Transcript notes, Transcript, To verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare published transcripts so that deaf and hard-of-hearing people, people who prefer reading, and search engines get the full episode. An accessible transcript is not an article: it keeps the speakers' own words and order, labels who is speaking, and describes meaningful non-speech audio, because for a deaf reader a laugh, a pause or a music sting can carry meaning. Automatic transcripts usually mangle names, jargon and overlapping speech, and they silently drop sound effects; these are the errors to hunt.

Speakers: {{speakers}}
Style: {{style}}
</context>

<task>
<raw_transcript>
{{raw_transcript}}
</raw_transcript>

1. Start with transcript notes: the episode title placeholder, the speakers with roles, the style used and what it means in one sentence, and a note that bracketed text describes sounds.
2. Label every turn with the speaker's name in bold on first use and the name thereafter (not "Speaker 1"). Start a new paragraph at each speaker change and break long turns every four to six sentences.
3. Apply the style:
   - clean-verbatim: remove "um", "uh", repeated words, false starts and verbal tics that carry no meaning; keep hedges ("I think", "maybe"), dialect, grammar as spoken and anything that changes meaning. Never paraphrase.
   - full-verbatim: keep fillers, false starts and repetitions; mark cut-offs with a dash.
4. Describe meaningful non-speech audio in square brackets, lower case, present tense, kept short: [laughs], [both laugh], [long pause], [music fades in], [phone rings], [crosstalk], [inaudible 00:14:32]. Describe the effect of music where it matters ([upbeat theme music]) and skip sounds that carry nothing.
5. Add a timestamp at each section or topic change, not every line, using the raw transcript's times. If the raw file has no times, leave timestamps out and say so.
6. Keep ad reads in the transcript, labelled [sponsor message], unless the user says they were removed from the episode.
7. Flag doubtful words inline as [unclear: best guess?] and collect them, with every name, place, brand and technical term you could not confirm, under To verify.
</task>

<constraints>
- Do not change meaning, order or emphasis, add words, correct facts or tidy grammar into a different sentence. If something said is wrong, transcribe it as said.
- Do not guess names or terms silently; mark them.
- Plain text formatting that screen readers handle well: headings, bold names, paragraphs. No tables or columns inside the transcript.
- If the speakers cannot be told apart from the input, ask for the mapping instead of guessing.
- If the transcript is too long for one reply, finish a clean section, say where you stopped, and ask for the next part.
</constraints>

<output_format>
## Transcript notes
Three to five lines.

## Transcript
The formatted transcript with timestamps at section breaks.

## To verify
Table: Timestamp | Text as heard | Question.
</output_format>
