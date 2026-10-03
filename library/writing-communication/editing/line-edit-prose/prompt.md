---
schema: 1
id: line-edit-prose
kind: prompt
title: Line-edit prose
description: Line-edits fiction or non-fiction prose for rhythm, precision, word choice and sentence variety while preserving the author's voice, showing each edit with a brief reason and the habits behind them.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, editor, content-creator, student]
requires: [none]
inputs: [text]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [line-editing, sentence-rhythm, word-choice, voice-preservation, prose-style]
pairs_with:
  prompts: [tighten-prose, edit-for-structure, copyedit-to-style-guide, capture-writing-voice]
  personas: [editor]
args:
  - name: text
    description: The passage to line-edit, ideally a scene, section or chapter up to a few thousand words.
    type: text
    required: true
  - name: author_voice_notes
    description: What makes your voice yours and what to leave alone, for example "long, looping sentences are deliberate; keep the Scottish dialect in dialogue; first person present".
    type: text
  - name: depth
    description: Light touches only what clearly weakens a sentence; medium also improves rhythm and precision; heavy reworks most sentences that can be better, still in your voice.
    type: enum
    enum: [light, medium, heavy]
    default: medium
output_contract:
  format: markdown
  sections: [Edited text, Edit notes, Patterns, Left alone]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A line edit works sentence by sentence on how the prose sounds and what each word does: rhythm and sentence variety, precision of word choice, clarity of reference, repetition, clichés, filter words, weak verbs propped up by adverbs, and the movement from one sentence to the next. It does not reorganise the piece (that is a structural or developmental edit) or enforce mechanics (that is copyediting). The risk with any line edit, and especially with a machine one, is flattening: every sentence nudged toward the same competent, neutral, medium-length style until the author's voice disappears. A good line editor improves the author's prose on the author's own terms: a writer of long sentences gets better long sentences, not short ones.
</context>

<task>
Line-edit the text below at {{depth}} depth.{{#author_voice_notes}}

<author_voice_notes>
{{author_voice_notes}}
</author_voice_notes>{{/author_voice_notes}}

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop.
2. Before editing, read the whole passage and write down (for yourself) the voice markers to protect: point of view and tense, typical sentence length and shape, diction (plain, lyrical, technical, regional), humour, recurring images, dialect in dialogue. Treat the voice notes as binding.
3. Edit at the chosen depth:
   - **light:** fix only what clearly weakens a sentence: unclear reference, accidental repetition, a cliché, a misused word, a clumsy construction. Expect to touch no more than about one sentence in five.
   - **medium:** also improve rhythm (vary length and openings where a run of sentences sounds the same), precision (the exact noun or verb instead of a general one plus modifiers), and transitions.
   - **heavy:** rework any sentence that can be meaningfully better, including reordering clauses for emphasis and cutting redundancy, while keeping every event, fact, argument and image.
4. Never change meaning, plot facts, claims, names, dialogue content or the order of paragraphs. In dialogue, edit only for clarity; keep the character's way of speaking.
5. Number each edited sentence in the notes and give a short reason in craft terms ("ends on the stronger word", "three sentences in a row opened with 'She'", "'very big' → 'vast' for precision").
6. Identify the author's three to five recurring habits worth knowing about, with an example from the text and a one-line technique to use when self-editing.
7. List what you deliberately left alone because it is voice, not error.
</task>

<constraints>
- Keep the author's spelling variety, terminology and formatting.
- Do not add new images, jokes, facts or flourishes. A line edit sharpens what is there.
- Length: the edited text should be within about 10% of the original unless the depth is heavy and cutting redundancy shortens it; report the word counts.
- If the passage is very short (under about 50 words), edit it but note that habits cannot be judged from so little.
</constraints>

<output_format>
## Edited text
The full edited passage, with edited sentences marked by a bracketed number after them, for example "…the door. [3]".
## Edit notes
Numbered list matching the markers: original → edited, with the reason.
## Patterns
Three to five recurring habits, each with an example and a self-editing technique.
## Left alone
Bullets: features that look editable but are voice, and why they stay. Then "Words: before N, after M".
</output_format>

<examples>
Original: "She walked slowly across the room and sat down heavily in the chair, feeling very tired."
Light: unchanged (no clear error).
Medium: "She crossed the room and sank into the chair, tired." [reason: "walked slowly" and "sat down heavily" become verbs that carry the manner; "feeling very" is a filter plus an intensifier]
</examples>
