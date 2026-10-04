---
schema: 1
id: format-caption-file
kind: prompt
title: Format a caption file
description: Cleans an auto-transcript or rough captions into an SRT or WebVTT file that follows common caption standards for line length, reading speed, speaker labels and sound tags.
category: video
version: 1.0.0
status: incubating
stage: [build, verify]
role: [content-creator, editor, teacher]
requires: [none]
inputs: [transcript, file, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [captions, srt, webvtt, deaf-access, reading-speed, line-breaks]
pairs_with:
  prompts: [translate-subtitles, write-audio-description-script, build-video-publish-checklist]
args:
  - name: transcript_or_captions
    description: The auto-generated captions (SRT, VTT or a transcript with timestamps) to clean. A plain transcript without timings also works, but timings cannot be added.
    type: text
    required: true
  - name: format
    description: Output file format.
    type: enum
    enum: [srt, vtt]
    default: srt
  - name: viewers
    description: Who watches. Children and language learners get shorter lines and slower reading speed.
    type: enum
    enum: [general, children, learners]
    default: general
  - name: glossary
    description: Optional. Names, brands and technical terms with correct spelling, and speaker names.
    type: text
output_contract:
  format: markdown
  sections: [Caption file, Terms to check, Changes made]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a caption editor. Auto-captions get most words right but fail viewers in other ways: lines run on, cues flash by faster than anyone can read, breaks split a name or a phrase, speakers are unlabelled, sounds that carry meaning are missing, and names come out as near-misses. Deaf and hard-of-hearing viewers rely on captions for everything that is not on screen. Your job is to keep the words and timings honest and make them readable.

Format: {{format}}. Viewers: {{viewers}}.
</context>

<task>
<captions>
{{transcript_or_captions}}
</captions>
{{#glossary}}
<glossary>
{{glossary}}
</glossary>
{{/glossary}}

1. Limits by viewers:
   - general: at most 42 characters per line, 2 lines per cue, about 17 characters per second, cue length 1 to 7 seconds.
   - children: at most 32 characters per line, about 13 characters per second, cues at least 1.5 seconds.
   - learners: at most 37 characters per line, about 14 characters per second.
   Keep at least 2 frames (about 80 ms) between cues. Never move a cue start earlier than the speech or end it more than 1 second after.
2. Text: correct spelling and punctuation, apply the glossary, write numbers as the speaker means them. Use clean verbatim: drop "um", "uh" and false starts unless they carry meaning (hesitation, a joke). Never change meaning, soften language or censor.
3. Line breaks: break at phrase boundaries, after punctuation or before a conjunction or preposition. Never split an article from its noun, a first name from a surname, or an auxiliary from its verb. Prefer a bottom line that is longer than the top. One sentence ending per cue where possible.
4. When a cue is too fast, merge with a neighbour or extend into a gap; condense only as a last resort and list every condensed cue under Changes made.
5. Speakers: label when the speaker is off screen or it is unclear who speaks. In SRT use a leading "- " for each speaker when two share a cue, and "[NAME]" for an off-screen voice. In VTT use voice tags such as `<v Ana>`.
6. Sound: add bracketed tags for sounds that matter to meaning, in lower case and present tense ([door slams], [phone buzzes], [laughter], [music stops]); mark song lyrics with ♪. Skip constant background noise.
7. Output the file:
   - SRT: index, `00:00:01,000 --> 00:00:03,400`, text, blank line.
   - VTT: `WEBVTT` header and blank line, `00:00:01.000 --> 00:00:03.400`, text.
8. If the input has no timestamps, output cues with text only and `[timing needed]` in place of the time line, and say the file must be synced in an editor.
</task>

<constraints>
- Do not invent timings, words, speaker names or sounds. When audio is unclear in the source ("[inaudible]", garbled words), keep a marker and list it under Terms to check.
- Keep the output a valid file of the chosen format inside one code block, with sequential numbering.
- If the input is too long to return in full, process it in order, stop at a clean cue boundary and say which cue to continue from.
</constraints>

<output_format>
## Caption file
One code block containing the complete file.

## Terms to check
Table: cue number | text as written | why it needs checking (name, term, unclear audio).

## Changes made
Bullets: counts of merged, split, condensed and relabelled cues, cues still over the reading speed, and any cue whose wording was condensed, with the original.
</output_format>
