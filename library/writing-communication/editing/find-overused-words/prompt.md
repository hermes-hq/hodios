---
schema: 1
id: find-overused-words
kind: prompt
title: Find overused words and phrases
description: Audits a draft for crutch words, repeated phrases and repetitive sentence openings with counts and locations, then suggests varied replacements in context or a cut where none is needed.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, student, editor, individual]
requires: [none]
inputs: [text, document]
output: [report, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [crutch-words, repetition, word-frequency, sentence-openings, self-editing]
pairs_with:
  prompts: [line-edit-prose, tighten-prose, build-self-editing-checklist]
  personas: [editor]
args:
  - name: text
    description: The draft to audit.
    type: text
    required: true
  - name: known_crutches
    description: "Words you already suspect you overuse, for example \"just, really, actually\"."
    type: string
output_contract:
  format: markdown
  sections: [Top offenders, Repeated phrases, Sentence openings, Fixes in context, Leave alone]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Every writer has crutch words they cannot see in their own draft: "just", "really", "actually", "very", "that", "however", "significant", "key", a favourite verb such as "leverage" or "ensure", a pet image used three times. Repeated sentence openings ("I", "The", "This", "However,") and the same sentence shape over and over make prose feel monotonous even when each word is fine. A frequency audit makes the pattern visible. The fix is not a thesaurus swap: a synonym for a crutch word is usually still a crutch, and most crutch words should simply go. Some repetition is correct: technical terms, names and defined terms must stay the same every time, and deliberate repetition can be rhetorical.
</context>

<task>
Audit this draft for overused words, phrases and sentence openings.
{{#known_crutches}}Words I suspect I overuse: {{known_crutches}}{{/known_crutches}}

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop. Count its words.
2. Count content words, intensifiers, hedges, connectives and verbs that appear more often than the text's length justifies. Ignore ordinary function words, names and technical terms. Include any suspected crutches the writer named, even if they are not frequent.
3. Find repeated multi-word phrases and repeated images or metaphors.
4. Count sentence openings by their first word and note runs of three or more sentences with the same shape or length.
5. For each top offender, give its count and the locations (quote the sentence start). Pick the instances that hurt most, usually those close together.
6. For those instances, show the sentence and a fix in context: cut it, replace it with a more precise word, or restructure the sentence. Prefer cutting.
7. List repetitions to leave alone: terms of art, defined terms, names, deliberate parallelism.
</task>

<constraints>
- Counts must be real. If the text is too long to count exactly, say the counts are approximate.
- Do not rewrite the whole text; fix only the sampled instances.
- Do not replace a crutch with a synonym that is equally empty ("very" with "extremely").
- Do not vary technical or defined terms for the sake of variety.
</constraints>

<output_format>
## Top offenders
A table: Word | Count | Per 1,000 words | Where (first few locations).
## Repeated phrases
Bullets with counts and locations. "None" if none.
## Sentence openings
The most common openers with counts, and any runs of same-shape sentences.
## Fixes in context
Before → after pairs for the worst instances, with a one-line reason each.
## Leave alone
Repetitions that should stay, and why.
</output_format>
