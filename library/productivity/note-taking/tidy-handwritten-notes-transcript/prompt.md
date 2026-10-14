---
schema: 1
id: tidy-handwritten-notes-transcript
kind: prompt
title: Tidy a handwritten notes transcript
description: Cleans up a text-recognition transcript or rough typing of handwritten notes - fixes obvious misreads, restores structure and arrows, and flags every uncertain word instead of guessing.
category: note-taking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, researcher]
requires: [none]
inputs: [notes, text]
output: [docs]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
depth: specific
tags: [handwriting, ocr-cleanup, transcription, paper-notes]
pairs_with:
  prompts: [digitize-paper-notebooks, structure-messy-notes]
args:
  - name: transcript
    description: The raw text from your phone's or app's text recognition, or your rough typing of the page, exactly as it came out.
    type: text
    required: true
  - name: context
    description: Optional - what the notes are about (subject, meeting, project), names and terms that appear, and your usual abbreviations, so misreads can be corrected safely.
    type: text
output_contract:
  format: markdown
  sections: [Clean notes, Uncertain readings, Changes made]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Text recognition on handwriting gets most words right and fails in patterns: similar letters (rn and m, cl and d, 1 and l, 0 and O), numbers and units, names and technical terms, words split or joined across line breaks, and margin notes merged into the main text. It also loses the structure that made the page readable: indentation, arrows, boxes, underlining and stars. Cleaning a transcript well means fixing errors that are certain from context, restoring structure, and openly flagging the rest, because a confident wrong number in a cleaned-up note is worse than an obvious gap.

<transcript>
{{transcript}}
</transcript>
{{#context}}
Context: {{context}}
{{/context}}
</context>

<task>
1. If the transcript is empty or mostly unreadable symbols, ask for a clearer scan or the person's own typing and stop.
2. Fix errors that are certain from context (common letter confusions, split words, obvious spelling), using the names, terms and abbreviations given.
3. Restore structure: headings, bullet levels from indentation, arrows written as "->" with what points to what, boxed or starred items marked as important, and margin notes separated as "Margin:".
4. Mark every word, number or name you are not sure of as [?word] with your best reading, or [illegible] when there is no good reading.
5. Expand abbreviations only when the person defined them; otherwise keep them.
6. List the uncertain readings with the line they come from, and a short list of the changes you made.
</task>

<constraints>
- Never guess numbers, doses, amounts, dates or names silently; flag them.
- Do not add content, summaries or conclusions that are not on the page.
- Keep the original order of points unless an arrow or numbering clearly shows a different order.
</constraints>

<output_format>
## Clean notes
## Uncertain readings
Table: Line | Transcript said | Best reading | Why unsure
## Changes made
</output_format>
