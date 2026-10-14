---
schema: 1
id: check-draft-for-patchwriting
kind: prompt
title: Check a draft for patchwriting
description: Compares a draft with the source passages it used and flags wording or structure that is too close, missing quotation marks or missing citations, with ways to quote or rewrite each.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [student, researcher, writer]
requires: [none]
inputs: [text, document]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [academic-integrity, patchwriting, citations, source-use, essays]
pairs_with:
  prompts: [paraphrase-with-attribution, integrate-quotes-into-prose, format-citations]
args:
  - name: draft
    description: Your draft, or the sections that use sources.
    type: text
    required: true
  - name: sources
    description: The source passages you read and used, each labelled with its author and page or URL label.
    type: text
    required: true
  - name: context
    description: Course or publication and citation style, for example "first-year history essay, Chicago notes". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Flagged passages, How to fix, What this check cannot do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Patchwriting is copying a source and changing a few words, swapping synonyms or shuffling clauses while keeping its sentence structure and order. Most students who do it are not trying to cheat; they are still learning to paraphrase. Plagiarism checkers catch exact strings but are inconsistent on synonym swaps, and a human marker reading the source will see the borrowed skeleton immediately. The useful check compares the draft with the specific sources it used, looking for runs of identical wording without quotation marks, the same sentence structure with substituted words, the same sequence of ideas paragraph by paragraph, distinctive phrases or coined terms used without quotation marks, and borrowed ideas or data with no citation. Common knowledge (widely known facts available in many general sources) does not need a citation, but specific data, interpretations and arguments do.

{{#context}}Context: {{context}}{{/context}}
<draft>
{{draft}}
</draft>
<sources>
{{sources}}
</sources>
</context>

<task>
1. If the draft or the sources are missing, ask for them and stop. Explain that the check only works against the sources supplied.
2. Compare each sentence of the draft that uses source material with the sources. Look for: identical runs of about five or more words without quotation marks; synonym substitution with the same structure; the same order of clauses or ideas; distinctive phrases or terms coined by the source; ideas, data or examples taken without citation.
3. Rate each flagged passage: high (would likely be treated as plagiarism if marked strictly), medium (patchwriting a marker would question), low (close but probably acceptable, or a technical term that cannot be reworded).
4. For each flag, show the draft text, the matching source text, and what makes them too close.
5. For each flag, give the fix options: quote it exactly with a citation if the wording matters; or paraphrase by working from understanding (close the source, say the idea aloud, write it in your own structure, then check); or summarise at a higher level. Give one short model of a properly restructured version only for the first flag, so the writer sees the technique, and coach them to rewrite the others themselves.
6. Note passages where the writer has paraphrased well, so they know what to keep doing.
</task>

<constraints>
- Do not accuse the writer of misconduct or predict an institution's decision; integrity policies differ, so point to the course or publication's own policy.
- Do not claim the draft is free of plagiarism overall; you only checked the sources given.
- Do not rewrite the whole draft for the writer.
- Technical terms, names, titles and standard phrases ("the Treaty of Versailles", "climate change") are not flagged as copying.
</constraints>

<output_format>
## Summary
Two or three sentences: how many passages flagged at each level and the main pattern.
## Flagged passages
Table: # | Level | Draft text | Source text (author, page) | Why it is too close.
## How to fix
For each #: the recommended fix (quote, paraphrase, summarise, cite), with one worked model for the first flag only.
## What this check cannot do
Two or three bullets on its limits.
</output_format>
