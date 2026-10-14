---
schema: 1
id: run-readability-check
kind: prompt
title: Run a readability check
description: Diagnoses why a text is hard to read, flagging long sentences, nominalisations, passive load, jargon, dense paragraphs and buried points per paragraph, and ranks the fixes without rewriting the text.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, technical-writer, editor, manager]
requires: [none]
inputs: [text, document]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [readability, sentence-length, nominalisation, passive-voice, reading-ease, diagnostics]
pairs_with:
  prompts: [simplify-to-plain-language, tighten-prose, define-jargon-and-acronyms]
  personas: [editor]
args:
  - name: text
    description: The text to check.
    type: text
    required: true
  - name: reader
    description: "Who reads it and how, for example \"members of the public reading on a phone\" or \"engineers reading a design doc carefully\"."
    type: text
output_contract:
  format: markdown
  sections: [Overall verdict, Measures, Paragraph diagnosis, Top fixes, What already works]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Readability formulas (Flesch, grade level) only count sentence and word length, so they miss most of what makes text hard: nouns made from verbs ("the implementation of the review of the process"), passive sentences that hide who does what, stacked noun phrases, jargon the reader does not share, sentences that hold the main verb until the end, paragraphs that cover three ideas, and the key point buried in the middle. Average sentence length matters less than the long outliers: one 60-word sentence stops a reader more than ten 20-word ones. Plain-language guidance commonly aims for an average of 15 to 20 words per sentence for general readers. A diagnosis that points to the exact sentences lets the writer fix their own text and learn the pattern, which a silent rewrite does not.
</context>

<task>
Check how readable this text is.
{{#reader}}Reader: {{reader}}{{/reader}}

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop. If no reader was given, assume an educated general reader and say so.
2. Measure: word count, sentence count, average sentence length, the longest sentences (quote their first words and give their length), and paragraph lengths. Say the figures are approximate.
3. For each paragraph, flag the specific problems with the sentence quoted: sentences over about 30 words, nominalisations, passive voice hiding the actor, noun stacks, jargon or acronyms this reader may not know, the main point placed late, more than one idea per paragraph, and missing signposts.
4. Rate each paragraph: clear, needs work, or hard.
5. Rank the fixes by how much they would help this reader, naming the pattern and one before → after example for each of the top fixes only.
6. Note what already works so it is not "fixed" by accident.
</task>

<constraints>
- Diagnose; do not rewrite the whole text. Give at most one example rewrite per top fix.
- Judge against the stated reader. Terms a specialist reader shares are not jargon for them.
- Do not treat every passive sentence as a fault; passive is fine when the actor is unknown or unimportant.
- Do not report a formula score as precise.
</constraints>

<output_format>
## Overall verdict
Two or three sentences: how hard this is for the reader and the main reason.
## Measures
Bullets: words, sentences, average sentence length, longest sentences, paragraph lengths.
## Paragraph diagnosis
A table: Paragraph | Rating | Problems (with quoted evidence).
## Top fixes
Numbered, most impact first: pattern, where it occurs, one before → after example.
## What already works
Bullets.
</output_format>
