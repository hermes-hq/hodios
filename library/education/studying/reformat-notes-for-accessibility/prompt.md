---
schema: 1
id: reformat-notes-for-accessibility
kind: prompt
title: Reformat notes for accessibility
description: Reformats study notes for a learner's access need (dyslexia, screen reader, low vision, visual stress or attention) without dropping content, with a check that every point survived.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher]
requires: [none]
inputs: [notes, document, text]
output: [rewrite, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [dyslexia-friendly, screen-reader, alt-text, readable-layout]
pairs_with:
  prompts: [adapt-study-for-learning-difference, review-notes-for-gaps]
args:
  - name: notes
    description: The notes to reformat, pasted as text. Describe any diagrams, images or tables in words if they did not paste.
    type: text
    required: true
  - name: need
    description: The access need to format for. dyslexia (chunked, plain layout), screen-reader (structure and described images), low-vision (large, simple, high contrast), visual-stress (low clutter, spacing), attention (short blocks with checkpoints).
    type: enum
    enum: [dyslexia, screen-reader, low-vision, visual-stress, attention]
    default: dyslexia
output_contract:
  format: markdown
  sections: [Reformatted notes, Content check, Settings to apply, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A learner, or someone supporting them, wants study notes reformatted for an access need: {{need}}. The job is to change form, not content. Reformatting fails when it simplifies away the technical terms the learner will be examined on, drops points to make the page shorter, describes diagrams with invented details, or applies generic "accessible" advice that helps one need and hurts another (a coloured background helps some readers with visual stress but is not a screen-reader fix).
</context>

<task>
<notes>
{{notes}}
</notes>

1. List every distinct point in the original (facts, definitions, steps, examples, formulas) so you can check none is lost.
2. Reformat for the need:
   - dyslexia: short paragraphs of one to three sentences, one idea per bullet, key terms in bold (never italics, underline or capitals for emphasis), each technical term kept and glossed in plain words the first time, numbered steps for processes, left-aligned text, a short summary box at the top. Follow the spirit of published dyslexia style guides.
   - screen-reader: a real heading hierarchy (one top heading, then level 2 and 3, no skipped levels), lists marked as lists, tables only for real tabular data with a header row and no merged cells, no meaning carried by colour, position, emoji or symbols alone, formulas written out in words or as plain linear notation, and each image or diagram replaced by a short alt text plus a longer description of what it shows.
   - low-vision: short lines, generous headings, no more than three columns in any table, key information first in each section, no small print or footnotes; recommend 16-18 point or larger and high contrast.
   - visual-stress: plenty of white space, short blocks, no dense tables or striped layouts, no capitals, consistent structure on every page; suggest the learner try their own preferred background tint.
   - attention: a "what this is about" line at the top, chunks of five to ten minutes each with a heading, a checkbox to tick after each chunk, the one thing to remember from each chunk, and a two-question self-check at the end.
3. Keep the original order unless reordering clearly helps understanding; say if you reordered.
4. Diagrams: describe only what the notes or the user's description state. If a diagram is mentioned but not described, insert [Diagram: describe what it shows] and ask.
5. Run the content check: every point from step 1 appears in the new version.
</task>

<constraints>
- Do not remove, merge away or soften content, terms, numbers or formulas. If something in the original is unclear or looks wrong, keep it, mark it [check], and ask.
- Do not diagnose or comment on the learner's condition; format for the stated need only.
- Do not add facts that are not in the notes.
- The markdown must be clean: real headings and lists, no decorative symbols.
</constraints>

<output_format>
## Reformatted notes
The notes in the new format.

## Content check
Table: Original point (short) | Where it is now | Changed how (glossed, split, described, unchanged).

## Settings to apply
Three to six bullets for the learner's editor, reader or printer (font type and size, spacing, background, heading styles, reading-aloud tools), specific to the need.

## Questions
Undescribed diagrams, unclear points and anything marked [check].
</output_format>
