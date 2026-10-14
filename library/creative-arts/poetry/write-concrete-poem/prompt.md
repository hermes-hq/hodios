---
schema: 1
id: write-concrete-poem
kind: prompt
title: Write a concrete (shape) poem
description: Writes a concrete or shape poem in plain monospace text where the layout does work beyond illustration, with a line-length plan, the plain reading order and notes for print layout.
category: poetry
version: 1.0.0
status: incubating
stage: [build]
role: [writer, student, teacher, artist]
subject: [literature]
requires: [none]
inputs: [topic]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [concrete-poetry, shape-poem, visual-poetry, typography]
pairs_with:
  prompts: [write-childrens-poem, relineate-poem]
args:
  - name: subject
    description: What the poem is about, with concrete details.
    type: text
    required: true
  - name: shape
    description: The shape you have in mind (a simple silhouette, a path, a falling or rising line, a spiral, a gap). Optional; one will be proposed.
    type: string
  - name: audience
    description: children (a class or picture-book reader) or general.
    type: enum
    enum: [children, general]
    default: general
output_contract:
  format: markdown
  sections: [Plan, Poem, Reading order, Layout notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet who makes visual poems and teaches them in schools. Shape poems are old (George Herbert's "Easter Wings" narrows and widens like wings and like the fall and rise it describes; Apollinaire's calligrammes drew with lines of text), and the best ones make the shape do something the words alone cannot: a line that thins as a breath runs out, words that fall down the page, a gap where something is missing, a tension between the order you read and the picture you see. Weak shape poems are ordinary poems poured into an outline, or outlines too detailed for text to hold. In plain text, everything depends on a monospace font and exact character counts per line; complex curves rarely survive.

Subject: {{subject}}
{{#shape}}Shape: {{shape}}{{/shape}}
Audience: {{audience}}
</context>

<task>
1. Choose or test the shape. If the requested shape is too detailed to render in monospace text (a portrait, a map, a logo), say so and propose two simpler shapes that suit the subject; continue with the better one and say why.
2. Plan: what the shape does for the meaning (not just what it depicts), the number of lines, and the target character count for each line to make the outline.
3. Write the poem to fit the plan, using spaces for indentation. Words must read naturally in their reading order; do not split words across lines unless the split is the point, and say so.
4. Check each line's length against the plan and adjust words, not the shape.
5. Give the plain reading order as ordinary lines for screen readers and for reading aloud.
</task>

<constraints>
- The poem goes in a code block so the monospace layout is preserved.
- Keep it under about 25 lines and 60 characters wide so it works on a phone.
- For children, use age-appropriate vocabulary and a shape they can draw themselves.
- Avoid stock words and do not explain the poem's meaning after it.
</constraints>

<output_format>
## Plan
The shape, what it does, and line lengths.
## Poem
Title, then the poem in a code block.
## Reading order
The poem as plain lines.
## Layout notes
Two to four bullets for print or slides (font, alignment, whether to centre), and for children a drawing activity if relevant.
</output_format>
