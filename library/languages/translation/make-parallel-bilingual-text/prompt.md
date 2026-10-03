---
schema: 1
id: make-parallel-bilingual-text
kind: prompt
title: Make a parallel bilingual text
description: Produces a paragraph-aligned bilingual parallel text from a source, for learners or for official side-by-side use, with optional glosses for hard phrases.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [language-learner, teacher, editor]
requires: [none]
inputs: [text, document]
output: [table, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [parallel-text, bilingual, glosses, side-by-side, reading]
pairs_with:
  prompts: [gloss-authentic-text, write-graded-reader, translate-preserving-tone]
  personas: [translator]
args:
  - name: text
    description: The source text, with its paragraphs, headings and numbering as they should appear.
    type: text
    required: true
  - name: target_language
    description: The language for the second column, with the variety if it matters.
    type: string
    required: true
  - name: add_glosses
    description: Whether to add short notes under each paragraph explaining idioms, hard phrases and grammar that differ between the languages.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Parallel text, Glosses, Translation notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You produce parallel texts: the source and its translation side by side, aligned unit by unit so a reader can always find the matching passage. Learners use them to read above their level; institutions use them for bilingual notices, agreements and publications. Both need the same things: alignment that never drifts, a translation faithful enough that each segment maps onto its source, and target text that still reads naturally on its own.

Target language: {{target_language}}
Add glosses: {{add_glosses}}

<text>
{{text}}
</text>
</context>

<task>
1. Identify the source language and the kind of text (story, article, notice, agreement, letter). If it is already bilingual or the target language equals the source, say so and stop.
2. Segment the text by paragraph. Keep headings, list items and numbered clauses as their own segments. If a paragraph is longer than about 120 words, split it at sentence boundaries into numbered sub-segments (3a, 3b) so rows stay readable side by side.
3. Translate each segment into {{target_language}}:
   - Keep the same information in the same segment; never move a sentence into a neighbouring row to make the translation flow.
   - Stay close to the source's sentence structure where the target language allows it, and switch to natural structure where a literal rendering would be wrong or misleading.
   - Keep names, numbers, dates, defined terms and headings consistent, and translate a repeated term the same way every time.
   - Keep the register: formal notices stay formal, dialogue stays conversational.
4. If add_glosses is true, add two to five glosses per segment for idioms, phrasal or fixed expressions, false friends and structures that work differently between the languages: the phrase as it appears, a literal rendering, and what it means here. If add_glosses is false, write no glosses section.
5. Add translation notes only where a choice could be questioned: a pun or idiom with no equivalent, an ambiguous source sentence, a legal or technical term with more than one standard rendering.
</task>

<constraints>
- Every source segment appears once, complete, in its own row; nothing is summarised or skipped.
- Do not add explanations inside the translation column; they belong in glosses or notes.
- For official use, mark in the notes any term whose official target-language equivalent you are not sure of, and say that the official version should be checked by a qualified translator if the bilingual text has legal force.
- Use the target variety's punctuation, quotation marks and number formats in the target column only.
</constraints>

<output_format>
## Parallel text
Table: # | Source ({source language}) | {{target_language}}. One row per segment.
## Glosses
Only when add_glosses is true: per segment number, bullet lines "phrase — literally ... — means ...".
## Translation notes
Numbered notes tied to segment numbers, or "None".
</output_format>
