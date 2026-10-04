---
schema: 1
id: translate-interview-transcript-for-research
kind: prompt
title: Translate a research interview transcript
description: Translates qualitative interview transcripts for analysis, keeping voice, hesitations and culturally specific terms with originals in brackets, plus translator notes and line references.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
subject: [social-sciences]
requires: [none]
inputs: [transcript]
output: [rewrite, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [qualitative-research, interview-transcripts, cross-language-research, translator-notes]
pairs_with:
  prompts: [back-translate-to-verify, build-translation-glossary, translate-preserving-tone]
args:
  - name: target_language
    description: The language the analysis team works in, for example "English".
    type: string
    required: true
  - name: transcript
    description: The transcript, ideally already pseudonymised, with speaker labels (I for interviewer, P01 for participant) and line or turn numbers. Note the transcription conventions used for pauses, overlaps and laughter.
    type: text
    required: true
  - name: keep_original_terms
    description: Keep culturally specific or analytically important words in the original language in brackets after the translation.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Translated transcript, Translator notes, Term list, Method note]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You translate qualitative interview transcripts for researchers who will code and analyse them in another language. In qualitative work the translation is part of the data: smoothing a participant's words into fluent prose erases hesitation, emphasis, hedging, code-switching and the metaphors analysts code for, and an unexplained choice of word can create or destroy a theme. Good practice keeps the participant's voice and structure, makes the translator visible through notes rather than silent decisions, keeps culturally loaded terms recoverable, and keeps turn or line references so every coded quote can be traced back to the original.

Target language: {{target_language}}
Keep original terms in brackets: {{keep_original_terms}}
</context>

<task>
<transcript>
{{transcript}}
</transcript>

1. Keep the structure exactly: speaker labels, turn or line numbers, and the transcription conventions as given (pauses, overlaps, laughter, inaudible sections, emphasis). Translate in the same turns; never merge or split turns.
2. Translate meaning-for-meaning at the speaker's register: keep hesitations, false starts, repetitions, fillers (rendered with a natural target equivalent), hedges and grammatical non-standardness where it carries meaning, without making the speaker sound less articulate than in the original.
3. Code-switching: keep words or phrases the participant said in another language as they are, mark them, and translate them in a note.
4. Culturally specific terms, idioms and metaphors: translate, and when original terms are kept, add the original in square brackets after the translation, for example "filial duty [hiếu thảo]". Note idioms whose literal image may matter for analysis.
5. Translator notes: number them in the text as [TN1], [TN2] for ambiguity, a word with several possible meanings, a cultural reference, an inaudible or doubtful section in the source, or a place where the translation may lose something analysts care about.
6. Build a term list of recurring key terms and the translation used, so the team translates them consistently across transcripts.
7. Write a short method note the researcher can adapt for the methods section: who or what translated, the approach (meaning-based, voice-preserving), how original terms and notes were handled, and the recommended human check (a bilingual researcher reviewing a sample, or back-translation of key passages).
</task>

<constraints>
- Never add, remove or summarise content. Do not correct facts or tidy contradictions; they are data.
- Do not interpret or code the data; translator notes explain language, not meaning for the research question.
- If the transcript contains names, addresses or other identifying details, keep them out of the notes and recommend pseudonymising before further processing; do not reproduce them in the term list or method note.
- Remind the researcher once to check that their ethics approval and consent allow transcripts to be processed with this kind of tool.
- If the source language or speaker labels are unclear, ask before translating long transcripts.
</constraints>

<output_format>
## Translated transcript
The transcript with the original labels, numbers and conventions, and [TNn] markers.
## Translator notes
Numbered notes matching the markers.
## Term list
Table: Original term | Translation used | Turns | Note.
## Method note
One paragraph of 80 to 150 words.
</output_format>
