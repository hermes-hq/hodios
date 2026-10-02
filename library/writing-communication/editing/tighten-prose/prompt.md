---
schema: 1
id: tighten-prose
kind: prompt
title: Tighten prose
description: Tightens prose by cutting filler, redundancy and weak verbs toward a target reduction while keeping the author's voice, meaning and necessary qualifiers, and reports what it cut.
category: editing
version: 1.0.0
status: experimental
stage: [review]
role: [writer, editor, student, individual]
requires: [none]
inputs: [text]
output: [rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [concision, line-editing, word-count]
pairs_with:
  prompts: [proofread-text, rewrite-for-tone, simplify-to-plain-language]
  personas: [editor]
args:
  - name: text
    description: The text to tighten.
    type: text
    required: true
  - name: target_reduction
    description: How much shorter to make it, as a percentage ("20%") or a word count ("under 300 words").
    type: string
    default: 20%
output_contract:
  format: markdown
  sections: [Tightened text, Word count, What was cut, Kept on purpose]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tightening is line editing for length: the same message, said with fewer words. Done badly, it flattens the author's voice into generic prose, deletes qualifiers that made a claim true ("most", "in the trial", "so far"), or cuts the rhythm and the one vivid detail that made the piece worth reading. Done well, the author reads the result and thinks it sounds like them on a good day.
</context>

<task>
Tighten the text below by about {{target_reduction}}.

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop. If it is under about 40 words, tighten it but say that a percentage target means little at that length.
2. Read it once for meaning and voice. Note the author's markers you must keep: person (I, we, you), register, signature phrases, sentence rhythm, humour, dialect spelling.
3. Cut in this order, stopping when you reach the target:
   - throat-clearing and announcements ("It is important to note that", "In this section I will");
   - redundancy: doubled words ("each and every", "first and foremost"), repeated points, words the context already implies ("past history", "end result");
   - filler and stacked hedges ("really", "very", "quite", "basically", "I think it may possibly");
   - weak constructions: nominalisations back into verbs ("make a decision" → "decide"), "there is/are… that", needless passive where the actor matters, verb plus adverb where one strong verb exists;
   - long phrases with short equivalents ("in order to" → "to", "due to the fact that" → "because", "at this point in time" → "now").
4. Do not cut: facts, numbers, names, qualifiers that limit a claim, technical terms, quotations, deliberate repetition used for emphasis, or a concrete example that carries the argument.
5. If reaching the target would remove meaning, stop at the largest safe cut and say how far you got and what further cuts would cost.
</task>

<constraints>
- Keep the order of ideas and paragraphing unless a cut merges two sentences naturally.
- Do not add new content, transitions or flourishes.
- Do not change spelling variety (US or UK) or the author's terminology.
- Count words honestly; do not pad the "after" figure.
</constraints>

<output_format>
## Tightened text
The full edited text.
## Word count
"Before: N words · After: M words · Reduction: X%" and whether the target was met.
## What was cut
Grouped by type (redundancy, filler, weak verbs, wordy phrases, throat-clearing), with two or three before → after examples per group.
## Kept on purpose
Bullets: phrases that look cuttable but carry meaning or voice, and why you kept them. "None" if not applicable.
</output_format>

<examples>
Before (41 words): "It is important to note that, at this point in time, the team has made the decision to basically postpone the launch due to the fact that most of the testing has not yet been fully completed."
After (16 words): "The team has decided to postpone the launch because most of the testing is unfinished."
Kept: "most" (the claim is about most of the testing, not all of it).
</examples>
