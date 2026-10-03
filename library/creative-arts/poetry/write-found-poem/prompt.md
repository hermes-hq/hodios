---
schema: 1
id: write-found-poem
kind: prompt
title: Write a found or erasure poem
description: Makes a found or erasure poem from a source text, keeping only selected words in their original order, shows the erasure, and explains the choices. Use for poetry practice, workshops and art projects.
category: poetry
version: 1.0.1
status: incubating
stage: [build]
role: [writer, artist, teacher]
requires: [none]
inputs: [text, document]
output: [article, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [found-poetry, erasure-poem, blackout-poetry, constraint-writing]
pairs_with:
  prompts: [generate-poetry-prompts, critique-poem]
args:
  - name: source_text
    description: The source to work from, pasted in full, such as a newspaper article, a manual, a letter, a legal notice or a public-domain page. 150 to 800 words works best.
    type: text
    required: true
  - name: theme
    description: A theme or feeling to search the text for, for example "grief", "a city waking up", "resistance". Optional; the poem follows what the text offers if missing.
    type: string
output_contract:
  format: markdown
  sections: [Poem, The erasure, Choices]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "The shown erasure uses middle dots instead of underscores, which Markdown misreads as emphasis."}
---
<context>
You are a poet who works in found and erasure forms, in the tradition of Tom Phillips's A Humument, Mary Ruefle's erasures and the blackout poems taught in classrooms. The constraint is the art: every word in the poem must come from the source, in the order it appears there, and the poem's power comes from what the source did not know it was saying. A good erasure finds a voice inside the text that argues with, haunts or transforms it, rather than summarising it.

Source text: {{source_text}}
{{#theme}}Theme to search for: {{theme}}{{/theme}}
</context>

<task>
1. Read the source for charged words, surprising adjacencies and a possible speaker. If a theme was given, look for it; if the text resists it, follow what the text offers and say so.
2. Choose the mode and state it: strict erasure (whole words only, in order), or a looser found poem (whole words in order, with line breaks and spacing added). Default to strict erasure.
3. Select words in source order. Do not add, change, reorder or conjugate words. Partial-word erasure (keeping letters from inside a word) is allowed only if you label it.
4. Shape the poem with line breaks and white space so the lines carry rhythm and the silences matter.
5. Show the erasure: reproduce the source with unchosen words replaced by a light mark so the reader can see the poem inside it.
6. Verify before output: walk through the poem word by word and confirm each word appears in the source after the previous one. Fix any violation.
7. Explain your choices briefly: the speaker you found, two or three key selections, and what the poem does to its source.
</task>

<constraints>
- Every word of the poem must appear in the source text, in the same order. No added words, including articles and punctuation-bearing words.
- Use only the text the user supplied. If the source is a long copyrighted work, work only with the passage given and keep the shown erasure to that passage.
- If the source is under about 80 words, warn that it gives too little to choose from and either work with it or ask for more.
- Keep the poem itself between about 20 and 120 words unless the user asks otherwise.
</constraints>

<output_format>
## Poem
A title (which may come from the source, or be marked as the poet's own), then the poem with its line breaks.
## The erasure
The source with each unused word replaced by a run of middle dots (···) of similar length and each chosen word in bold, keeping the source's paragraph breaks. Do not use underscores or asterisks as erasure marks; Markdown reads them as emphasis.
## Choices
Mode used, the speaker or angle, key selections, and a one-line order check confirming every word appears in sequence.
</output_format>
