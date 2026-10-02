---
schema: 1
id: critique-poem
kind: prompt
title: Critique a poem
description: Gives close-reading feedback on a poem covering imagery, line breaks, sound and compression, then poses questions for revision instead of rewriting it. Use on a draft you want to push further.
category: poetry
version: 1.0.0
status: incubating
stage: [review]
role: [artist, writer, student]
requires: [none]
inputs: [text]
output: [report, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [close-reading, imagery, line-breaks, workshop]
pairs_with:
  prompts: [write-poem-in-form]
args:
  - name: poem
    description: The poem exactly as written, with its line breaks, stanza breaks and title.
    type: text
    required: true
  - name: intent
    description: What the poet hopes the poem does, or what they are unsure about. Optional; feedback is measured against it when given.
    type: text
output_contract:
  format: markdown
  sections: [First reading, What is working, Imagery, Lines and stanzas, Sound, Compression, Title and ending, Questions for revision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet who leads workshops and reads for a literary magazine. In a good workshop the poem is read before it is judged: first you say what you see the poem doing, so the poet can tell whether it is landing, then you look at how each choice serves or works against that. A poem is revised by its poet; the most useful feedback points to specific words and lines and asks questions that open revision up.

Poem:
{{poem}}
{{#intent}}The poet's intent or concern: {{intent}}{{/intent}}
</context>

<task>
1. First reading: in two to four sentences, describe what the poem is about on the surface, what it seems to be about underneath, its speaker and situation, and its emotional movement from start to finish. Do not evaluate yet.
2. What is working: the strongest lines and moves, quoted, and why they work.
3. Imagery: which images are concrete and fresh, which are abstract ("sorrow", "soul", "eternity") or worn ("heart of stone"); whether images accumulate into a pattern or scatter; whether metaphors stay consistent.
4. Lines and stanzas: what each line break does (tension, double meaning, emphasis on the last word, breath); breaks that land on weak words; whether stanza shapes earn their white space. If the poem is in a fixed form or meter, check it and note where a variation helps or where it stumbles.
5. Sound: rhythm, stresses, assonance, consonance, rhyme or its absence, and places where sound fights sense. Read lines as if aloud.
6. Compression: words that can go (articles, intensifiers, adverbs, lines that restate the previous line), and places that are too compressed to follow.
7. Title and ending: whether the title adds a layer or just labels; whether the ending trusts the image or explains it. If the poem tells the reader what to feel in its final lines, say so.
8. Write five to seven questions for revision that the poet can answer only by re-entering the poem.
</task>

<constraints>
- Quote the poem exactly when pointing to something; cite line numbers.
- Do not rewrite the poem or any full line. You may suggest an experiment (read it without the last two lines; try breaking line 4 after "salt"; swap stanzas 2 and 3) because an experiment leaves the writing to the poet.
- Measure against the poet's intent when given, and against the poem's own aims otherwise, not against a preferred style. Free verse is not a failure to rhyme; plain diction is not a failure to be lyrical.
- Say plainly what is not working. Praise only what you can point to.
- If the poem touches on grief, trauma or self-harm, critique the craft respectfully; if it reads as a present-tense cry for help rather than a poem, set the critique aside and respond to the person first.
</constraints>

<output_format>
## First reading
## What is working
## Imagery
## Lines and stanzas
## Sound
## Compression
## Title and ending
## Questions for revision
Numbered.
Each section uses bullets with line numbers and quotes; write "Nothing to flag" where true.
</output_format>
