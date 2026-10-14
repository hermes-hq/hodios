---
schema: 1
id: write-golden-shovel
kind: prompt
title: Write a golden shovel
description: Writes a golden shovel poem, where each word of a source line becomes the end word of each new line in order, so the source can be read down the right margin, with a margin check and credit.
category: poetry
version: 1.0.0
status: incubating
stage: [build]
role: [writer, student, teacher]
subject: [literature]
requires: [none]
inputs: [text, topic]
output: [article, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [golden-shovel, received-forms, intertextuality, writing-practice]
pairs_with:
  prompts: [write-cento, write-poem-in-form, critique-poem]
args:
  - name: source_line
    description: The line or short passage to use, exactly as written, with poet and poem. One line of eight to fifteen words works best.
    type: text
    required: true
  - name: subject
    description: What your poem is about, with concrete details. It can answer, argue with or extend the source.
    type: text
    required: true
  - name: variant
    description: single (end words in source order) or double (forward, then the source again in reverse order).
    type: enum
    enum: [single, double]
    default: single
output_contract:
  format: markdown
  sections: [Poem, Margin check, Credit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet who teaches contemporary forms. The golden shovel was created by Terrance Hayes in his poem "The Golden Shovel", built on Gwendolyn Brooks's "We Real Cool": every word of a source line, in order, becomes the last word of a line in the new poem, so reading down the right margin spells the source. The form is a conversation with an earlier poem, so the strongest ones talk back to, extend or turn the source rather than ignoring it. The craft problem is the small words: lines that must end on "the", "of", "a" or "and" force enjambment, which can be a gift (suspense, double meaning) if handled, or limp if not.

<source_line>
{{source_line}}
</source_line>
<subject>
{{subject}}
</subject>
Variant: {{variant}}.
</context>

<task>
1. Check the source. If it is longer than about twenty words, suggest a shorter excerpt and proceed with one. If no poet or poem is given, ask for the credit and stop. If the source is from a poem still in copyright, use only the line the user pasted.
2. List the source words in order with a number for each; these are the end words.
3. Plan: how the new poem relates to the source (answer, argue, extend, shift the scene), and where the hardest end words (articles, prepositions) fall.
4. Write one line per source word (two per word for the double variant: forward, then reversed). Lines may be any length; stanzas are your choice. Use enjambment on the small-word endings so they create suspense or a second meaning.
5. Check the margin: the last word of each line must exactly match the source word in order.
</task>

<constraints>
- End words are the source words exactly, in order, with no changes in spelling, tense or number. Punctuation after an end word may differ.
- Do not alter the source line to make the poem easier; if the user asks to, explain that the form depends on the exact words.
- Credit the source poet and poem, conventionally in the title or an epigraph.
- Do not explain the poem's meaning after it.
</constraints>

<output_format>
## Poem
Title, an epigraph with the source line and its credit, then the poem.
## Margin check
A numbered table: source word, last word of the line, match.
## Credit
One line giving the source poet and poem, and one line noting the form's origin with Terrance Hayes.
</output_format>
