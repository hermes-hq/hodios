---
schema: 1
id: fix-tense-and-point-of-view-shifts
kind: prompt
title: Fix tense and point-of-view shifts
description: Finds accidental shifts in tense, grammatical person and point of view across a draft, decides which form to keep and why, and fixes each shift while leaving deliberate changes alone.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [student, writer, editor, individual]
requires: [none]
inputs: [text, document]
output: [rewrite, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [verb-tense, grammatical-person, consistency, narrative-voice, grammar-check]
pairs_with:
  prompts: [proofread-text, line-edit-prose, unify-voice-in-multi-author-document]
  personas: [editor]
args:
  - name: text
    description: The draft to check, such as an essay, story, report, procedure or web page.
    type: text
    required: true
  - name: intended_forms
    description: "The tense and person you meant to use, if you know, for example \"past tense, third person\" or \"address the reader as you\"."
    type: string
output_contract:
  format: markdown
  sections: [Forms to keep, Shifts found, Edited text, Shifts kept on purpose]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Accidental shifts are among the most common errors in drafts and among the hardest for writers to see: a story told in past tense that slides into present during the exciting part; a report that switches between "we", "the team" and "I"; instructions that address "you", then "the user", then "one"; an essay that moves from "students" to "you" mid-argument. Not every shift is an error. Tense correctly changes for general truths ("Darwin argued that species change"), for events at different times, and in academic convention (literature in present or past, methods in past, results in past, implications in present). A story may deliberately shift to present for a flashback frame. The job is to find the dominant intended forms, separate errors from justified shifts, and fix only the errors.
</context>

<task>
Find and fix accidental tense and point-of-view shifts in this text.
{{#intended_forms}}Intended forms: {{intended_forms}}{{/intended_forms}}

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop.
2. Decide the forms to keep: the intended forms if given; otherwise the dominant tense and person in the text and the genre's convention. State them and why.
3. Go through the text and list every shift in tense, grammatical person (I, we, you, they, one) and point of view (whose perspective narrates). Quote each.
4. Classify each shift: an error to fix, or justified (time change, general truth, genre convention, quoted speech, deliberate frame). Explain the justified ones briefly.
5. Fix the errors, changing as few words as possible. Adjust any linked words (pronouns, possessives, time expressions such as "now" and "then") so sentences stay grammatical.
6. Return the full edited text.
</task>

<constraints>
- Fix only tense, person and point-of-view errors and the words that must change with them. No other edits.
- Do not flatten justified shifts into one tense.
- Keep quotations and dialogue exactly as written.
- Keep the author's spelling variety.
</constraints>

<output_format>
## Forms to keep
One or two lines: tense, person and point of view, and why.
## Shifts found
A table: Quote | Shift (from → to) | Error or justified | Fix.
## Edited text
The full edited text.
## Shifts kept on purpose
Bullets with reasons. "None" if none.
</output_format>
