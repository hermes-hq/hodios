---
schema: 1
id: prepare-interview-transcripts
kind: prompt
title: Prepare interview transcripts
description: Sets transcription conventions and turns raw interview transcripts into clean, consistently formatted and pseudonymised text ready for qualitative coding, with a log of every change.
category: research-methods
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [transcript, text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [transcription, pseudonymisation, de-identification, qualitative-data, interview-data, data-protection]
pairs_with:
  prompts: [build-qualitative-codebook, run-thematic-analysis, write-data-management-plan, translate-interview-transcript-for-research]
  personas: [research-methodologist]
args:
  - name: transcript
    description: The raw transcript text, for example from automatic transcription or a transcriber.
    type: text
    required: true
  - name: conventions
    description: Your analysis approach and any conventions already agreed (speaker labels, pauses, non-verbal cues, how much to keep verbatim), and what must be pseudonymised under your ethics approval.
    type: text
  - name: participant_code
    description: The participant code to use, for example P07.
    type: text
    default: P01
output_contract:
  format: markdown
  sections: [Conventions used, Prepared transcript, Pseudonymisation log, Queries for the researcher]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Transcription is an analytic decision, not a clerical one. Conversation and discourse analysis need detailed notation (pauses, overlaps, intonation), while thematic and framework analysis usually use intelligent verbatim that keeps meaning, hesitations that matter and emotional cues, and drops filler. Automatic transcripts introduce errors that change meaning (negations, names, technical terms, misattributed speakers), so they need checking against the audio by the researcher. De-identification needs care: direct identifiers (names, places, employers, dates) are replaced with consistent bracketed descriptors such as [colleague 1] or [city in north], and indirect identifiers (rare job titles, unusual events, combinations of details) can identify someone in a small community. A pseudonymisation key is kept separately from transcripts. Over-cleaning destroys data; under-cleaning risks a breach.
</context>

<task>
Prepare this transcript for coding:
<transcript>
{{transcript}}
</transcript>
{{#conventions}}
Conventions and ethics requirements: {{conventions}}
{{/conventions}}
Participant code: {{participant_code}}

1. State the conventions you will apply: speaker labels (I for interviewer, the participant code for the participant), verbatim level, notation for pauses, laughter, crosstalk, inaudible sections with timestamps if present, and emphasis. If none were given, default to intelligent verbatim and say so.
2. Clean the format: consistent speaker turns, paragraph breaks, numbered lines or turns for later referencing, and remove automatic-transcript artefacts that are clearly not speech.
3. Do not change the participant's words or grammar beyond the chosen verbatim level. Where the text looks like a transcription error, keep it and flag it as a query for checking against the audio.
4. Pseudonymise direct identifiers with consistent bracketed descriptors that keep analytic meaning, and flag indirect identifiers that could identify the person in combination, suggesting a generalisation.
5. Log every replacement in a pseudonymisation log, to be stored separately from the transcript.
6. List queries for the researcher: suspected mishearings, unclear speakers, sections to verify.
</task>

<constraints>
- Never invent or fill in inaudible speech; mark it as [inaudible] with the timestamp if available.
- Do not summarise, paraphrase, correct grammar or tidy dialect beyond the stated verbatim level.
- Do not store or repeat real identifiers anywhere except the log, and remind the user that the log must be kept separately and securely.
- Remind the user that the final check against the audio is theirs.
</constraints>

<output_format>
## Conventions used
A short list of the notation applied.
## Prepared transcript
The full cleaned, pseudonymised transcript with numbered turns.
## Pseudonymisation log
A table: original | replacement | type (direct or indirect) | location.
## Queries for the researcher
Numbered queries with turn numbers.
</output_format>
