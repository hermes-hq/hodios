---
schema: 1
id: lengthen-draft-without-padding
kind: prompt
title: Lengthen a draft without padding
description: Expands a short draft to a target length by finding what a reader is missing, such as explanation, examples, evidence and steps, and asking for the facts it needs instead of adding filler.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [student, writer, individual, researcher]
requires: [none]
inputs: [text, document]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [word-count, minimum-length, elaboration, no-padding, essay-length]
pairs_with:
  prompts: [expand-notes-into-prose, critique-draft, tighten-prose]
  personas: [editor]
args:
  - name: draft
    description: The draft that is too short.
    type: text
    required: true
  - name: target_length
    description: "The length you need, for example \"1,500 words\" or \"about double\"."
    type: string
    required: true
  - name: purpose_and_reader
    description: "What the text is for and who reads it, for example \"university essay marked on depth of analysis\" or \"blog post for first-time home buyers\"."
    type: text
  - name: extra_material
    description: Optional notes, sources, data or examples you have that are not in the draft yet.
    type: text
output_contract:
  format: markdown
  sections: [Where the draft is thin, Expanded draft, What was added, Facts I need from you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A short draft is usually short because something is missing, not because the sentences are too few. The usual gaps: claims stated without the reasoning behind them, abstract points with no example, steps skipped because the writer knows them, counter-arguments never addressed, consequences never spelled out, and terms never defined. Padding (restating the question, longer synonyms, "in today's world" openings, repeating the conclusion) adds words the reader and any marker notice immediately. Real expansion adds substance, and substance needs facts: an AI that invents studies, statistics, quotes or anecdotes to reach a word count makes the text longer and false.
</context>

<task>
Expand this draft to {{target_length}}.
{{#purpose_and_reader}}Purpose and reader: {{purpose_and_reader}}{{/purpose_and_reader}}

<draft>
{{draft}}
</draft>
{{#extra_material}}
<extra_material>
{{extra_material}}
</extra_material>
{{/extra_material}}

1. If the draft is empty, ask for it and stop. Count its words and work out how much must be added.
2. Diagnose where it is thin, paragraph by paragraph: unexplained claims, missing examples, skipped steps, unanswered objections, undefined terms, consequences left implicit, an abrupt opening or ending.
3. Rank those gaps by how much they would help the reader, and plan the added length across them. Prefer deepening existing points over adding new topics.
4. Expand using only: reasoning the writer's own claims imply, explanation of their own points, examples that are clearly illustrative (hypothetical and marked as such), and anything in the extra material.
5. Where a gap needs a real fact (a figure, a source, a personal example, a date), insert a marker like `[ADD: a real example of a client who…]` instead of inventing it, and list it under Facts I need from you.
6. Count the result. If honest expansion cannot reach the target without the missing facts, stop short, give the count, and say how many words the requested facts would add.
</task>

<constraints>
- No padding: no restating the prompt or thesis to fill space, no throat-clearing openers, no synonyms swapped in for length, no repeated conclusion.
- Never invent statistics, studies, quotes, citations, names or personal anecdotes.
- Keep the author's voice, argument, terminology and spelling variety.
- Keep the original structure unless a missing section is the main gap; then say where it was added.
</constraints>

<output_format>
## Where the draft is thin
Numbered list of gaps, each with its location and what the reader is missing.
## Expanded draft
The full expanded text with `[ADD: …]` markers where real facts are needed.
## What was added
Bullets per gap: what was added and roughly how many words. Then "Before: N words · After: M words · Target: T".
## Facts I need from you
Numbered questions for each marker, with how much length each answer would add. "None" if there are none.
</output_format>
