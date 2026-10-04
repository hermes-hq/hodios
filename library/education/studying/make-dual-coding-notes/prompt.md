---
schema: 1
id: make-dual-coding-notes
kind: prompt
title: Make dual-coded visual notes
description: Redesigns text notes as dual-coded study pages that pair each idea with a simple, meaningful visual described precisely enough to sketch, plus a cover-and-redraw recall check.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
requires: [none]
inputs: [notes, text]
output: [diagram, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [dual-coding, sketchnotes, visual-notes, active-recall]
pairs_with:
  prompts: [build-concept-map, convert-lecture-notes-to-cornell, make-study-guide]
  personas: [study-coach]
args:
  - name: notes
    description: The text notes to redesign, such as lecture notes, a textbook summary or revision notes.
    type: text
    required: true
  - name: visual_style
    description: The kind of visuals to favour. mixed picks the best visual for each idea's structure.
    type: enum
    enum: [flowcharts, timelines, diagrams, mixed]
    default: mixed
output_contract:
  format: markdown
  sections: [Page plan, Study pages, Redraw practice]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Dual coding means presenting an idea both in words and in a visual that shows its structure: a sequence as a flow, change over time as a timeline, parts of a whole as a labelled diagram. It helps every learner, not just "visual learners" (learning styles are not supported by evidence). It fails when the visual is decoration (a lightbulb next to "ideas"), when it is too complex to redraw from memory, when it repeats the text instead of showing relationships, or when the visual type does not match how the idea is organised.

Preferred visual style: {{visual_style}}. With a single style, still switch for an idea that would be distorted by it, and say why.
</context>

<task>
<notes>
{{notes}}
</notes>

1. Group the notes into idea clusters, one per study page (usually 3 to 8 pages). Note any statement that looks wrong; do not draw it.
2. For each cluster, identify its structure and choose the visual that matches:
   - sequence or process: flowchart with arrows
   - change over time: timeline
   - cause and effect: chain or fishbone of arrows
   - parts of a whole or location: labelled diagram
   - hierarchy or classification: tree
   - comparison: two columns or Venn diagram
   - repeating process: cycle
   - quantities or trends: a simple sketched graph with labelled axes
3. Describe each visual precisely enough to draw in under 3 minutes with a pen: layout (left to right, top to bottom, centre), shapes (box, circle, arrow), what each arrow means, and at most 7 labels of 4 words or fewer. Where it helps, add a small text layout in a code block using boxes and arrows.
4. Pair each visual with 2 to 4 short text lines that say what the visual cannot (a definition, a number, an exception).
5. For each page, write one redraw prompt: what to draw from memory and which labels must appear.
</task>

<constraints>
- Every visual element must carry meaning. No icons or images for decoration.
- Use only content from the notes; do not add facts. Flag apparent errors under the relevant page.
- Keep visuals simple enough for a student who "can't draw": boxes, arrows, circles, stick figures, simple icons.
- Do not produce or link images; describe them so the student draws them, because drawing is part of the learning.
- If the notes are too short to split into pages (a sentence or two), ask for more material and stop.
</constraints>

<output_format>
## Page plan
Table: Page | Idea cluster | Structure | Visual type.

## Study pages
For each page, a "### Page N: title" heading, then:
- **Visual:** type and why it fits, in one line.
- **How to draw it:** numbered drawing steps.
- **Layout:** the code-block sketch, when useful.
- **Words that go with it:** 2 to 4 lines.
- **Redraw check:** the prompt.

## Redraw practice
A short routine: cover the page, redraw from memory, compare, add missing parts in a different colour, and redraw again in 2 to 3 days.
</output_format>
