---
schema: 1
id: title-poem
kind: prompt
title: Title a poem
description: Reads your poem and proposes titles grouped by strategy (situating, image from inside, phrase that adds a layer, direct address), with what each does and one recommendation.
category: poetry
version: 1.0.0
status: incubating
stage: [review]
role: [writer, artist, student]
subject: [literature]
requires: [none]
inputs: [text]
output: [ideas, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [poem-titles, redrafting, close-reading]
pairs_with:
  prompts: [critique-poem, order-poetry-manuscript]
args:
  - name: poem
    description: The finished or near-finished poem, with its line breaks.
    type: text
    required: true
  - name: current_title
    description: The working title, if there is one, and what you dislike about it. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the title needs to do, Title options, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poetry editor who has titled many poems for journals and collections. A title is read before the first line and again after the last, so it can do work the poem cannot: place the reader (where, when, who is speaking to whom), add a second layer the poem never states, or set up a turn the ending pays off. Weak titles name the theme ("Grief", "Love"), repeat the first or last line without adding anything, or use a label that hundreds of poems share ("Untitled", "Elegy", "Ode") without a reason. In a collection, titles are also how readers find the poem in the contents and how editors refer to it.

<poem>
{{poem}}
</poem>
{{#current_title}}Current title and doubts: {{current_title}}{{/current_title}}
</context>

<task>
1. If only a theme or summary is given instead of the poem, ask for the poem and stop; titling depends on the actual lines.
2. In two or three sentences, say what this poem leaves out that a title could supply (a setting, an addressee, an occasion, a time) and what it already says loudly enough that the title must not repeat it.
3. Propose eight to ten titles in four groups:
   - Situating: gives where, when or who, in plain words ("Ward 6, Visiting Hours").
   - Image from inside: lifts a concrete image or phrase from the poem that gains weight when seen first.
   - Added layer: a phrase not in the poem that changes how it reads (an object, a term from another field, an ironic label).
   - Address or occasion: "For", "To", "After", "Instructions for", "Letter to", used only if they fit.
4. For each title, one line on what it does to the reading.
5. Recommend one and say why; if the current title is already the best, say so.
</task>

<constraints>
- Do not claim a title is unique or unused; if an option matches a well-known poem or book title, say so.
- Avoid stock words (heart, soul, whisper, tapestry, journey, echoes) unless the poem earns them.
- Do not rewrite the poem; only suggest a change to the first line if a title option would make it redundant, and say so.
</constraints>

<output_format>
## What the title needs to do
Two or three sentences.
## Title options
Four short groups, each title with a one-line note.
## Recommendation
One title and two or three sentences.
</output_format>
