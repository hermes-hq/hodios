---
schema: 1
id: outline-literature-review
kind: prompt
title: Outline a literature review from your sources
description: Chooses an organising scheme for a literature review (thematic, chronological, methodological or debate) from the user's notes and outlines sections with sources mapped to each.
category: literature-review
version: 1.0.0
status: incubating
stage: [plan, build]
role: [student, researcher]
requires: [none]
inputs: [notes, document]
output: [outline, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [thesis, synthesis, review-structure, organising-scheme]
pairs_with:
  prompts: [write-literature-review-section, build-literature-matrix, audit-literature-review-draft]
  personas: [academic-writing-coach]
args:
  - name: question
    description: The research question or aim the review serves.
    type: text
    required: true
  - name: notes
    description: Your sources with short notes, or a literature matrix, one source per line or row. Include author, year and the key finding or argument.
    type: text
    required: true
  - name: setting
    description: Where the review sits and its length, for example "PhD thesis chapter, 8,000 words" or "introduction of a journal article, 1,200 words".
    type: string
    default: thesis chapter
output_contract:
  format: markdown
  sections: [Organising scheme, Argument line, Outline, Source map, Gaps and loose ends]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most weak literature reviews are weak before the first sentence: they are organised source by source, so each paragraph summarises one paper and the reader has to do the synthesis. Strong reviews pick an organising scheme that serves the argument. Thematic is the default (one section per idea or finding, sources grouped under it). Chronological suits fields where thinking changed in clear phases. Methodological suits fields where results depend on how they were studied. Debate-based suits topics with clear camps. The review should also tell a story that ends in the gap the study fills, so the outline needs an argument line before headings, and every section needs enough sources to synthesise, not one paper in a heading of its own.
</context>

<task>
Outline a literature review for this {{setting}}.
<question>
{{question}}
</question>
<notes>
{{notes}}
</notes>

1. Read the notes and give each source a short ID (author and year).
2. Weigh the possible organising schemes for these sources and this question, and choose one (or a justified hybrid, such as thematic sections with a short historical opening). Say why the others fit less well.
3. Write the argument line: four to six sentences that run from the broad context, through what is known and debated, to the gap the study addresses.
4. Build the outline: sections and subsections with a working heading, the claim each makes, a word budget fitting the stated length, and the synthesis move it makes (agreement, contradiction, development over time, methodological contrast).
5. Map every source to the sections where it will be used; a source can appear in more than one. Mark sources that fit nowhere.
6. Flag thin sections (one or two sources), sections that are summaries rather than claims, and places where the notes suggest a missing kind of source (recent work, other contexts, opposing evidence).
</task>

<constraints>
- Use only the sources in the notes. Where a section needs more evidence, say what kind, not which paper.
- No section built around a single source, unless it is a landmark study the review must discuss at length; say so if you make that exception.
- Headings state ideas, not author names.
- Respect the length: word budgets add up to the stated total.
- If the notes are too sparse to organise (only titles, or fewer than about five sources for a thesis chapter), say what is needed and give a provisional scheme only.
</constraints>

<output_format>
## Organising scheme
The choice and why, in a short paragraph.
## Argument line
Four to six sentences.
## Outline
Numbered headings with claim, word budget and synthesis move.
## Source map
Table: source ID | sections used in | role (core, supporting, contrast, background).
## Gaps and loose ends
Bullets.
</output_format>
