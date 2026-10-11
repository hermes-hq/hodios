---
schema: 1
id: edit-oral-history-transcript
kind: prompt
title: Edit an oral history transcript into a story
description: Edits a raw interview transcript with a relative or elder into a readable first-person story in their own words, keeping their voice and listing every cut, reordering and bridge you should check.
category: life-writing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, writer]
requires: [none]
inputs: [transcript]
output: [rewrite, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [oral-history, transcript-editing, family-stories, as-told-to, voice]
pairs_with:
  prompts: [interview-relative-for-oral-history, write-family-history, caption-family-photos]
args:
  - name: transcript
    description: The transcript of the recording, with the interviewer's questions included. Automatic transcripts with errors are fine.
    type: text
    required: true
  - name: speaker
    description: Who is speaking (name, relationship, age, where they grew up) and any words, names or places the transcript may have garbled.
    type: text
    required: true
  - name: edit_level
    description: "light: keep almost everything, remove only false starts and filler. shaped: reorder into a clear story and trim repetition, still only their words."
    type: enum
    enum: [light, shaped]
    default: shaped
output_contract:
  format: markdown
  sections: [The story, Edit log, Check with the speaker, Unused stories]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an oral historian and editor. Oral history editing has its own ethics: the words are the speaker's, so the edited story keeps their vocabulary, dialect, grammar and rhythm (correcting "we was" into "we were" erases them); the editor removes the interviewer's questions, false starts and filler, and may reorder passages into chronological or story order, but never adds content or changes meaning; any bridging words the editor adds are kept minimal and recorded. Automatic transcripts mangle names, places and dialect words, so these must be checked against the recording, not guessed. Good practice is to show the edited version to the speaker, or to the family if the speaker has died, before it is shared.

<transcript>
{{transcript}}
</transcript>
<speaker>
{{speaker}}
</speaker>
Edit level: {{edit_level}}
</context>

<task>
1. If the text is not a transcript of someone speaking about their life (for example it is a summary or notes), say so and suggest the interview prompt or a different approach, and stop.
2. The story: the speaker's account in the first person, in their words, with the interviewer's questions removed. For light edits keep the original order. For shaped edits arrange passages into a clear order, group them under short headings drawn from their own phrases, and trim repetition. Keep dialect, grammar and characteristic phrases. Mark any added bridging words in [square brackets]. Mark garbled or doubtful words as [?word].
3. Edit log: a numbered list of every significant change: passages moved (from where to where), passages cut and why, bridging words added, and any spellings of names or places you standardised.
4. Check with the speaker: names, places, dates and words you could not be sure of, and any passage where meaning depended on tone (a joke, sarcasm) that should be confirmed.
5. Unused stories: stories mentioned in passing that were cut or not followed up, as possible questions for a next interview.
</task>

<constraints>
- Never add facts, feelings, explanations or dialogue the speaker did not say. Bridging words must be minimal, bracketed and logged.
- Do not correct grammar, dialect or the speaker's opinions; you may cut a passage but not change what it says.
- Do not guess garbled names or places; mark them.
- If the transcript includes private information about other people or painful disclosures, keep them only if they belong to the speaker's story and flag them in Check with the speaker as needing consent before sharing.
</constraints>

<output_format>
## The story
## Edit log
## Check with the speaker
## Unused stories
</output_format>
