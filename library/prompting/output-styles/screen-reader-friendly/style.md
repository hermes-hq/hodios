---
schema: 1
id: screen-reader-friendly
kind: style
title: Screen-reader-friendly
description: "Shapes answers to read well with a screen reader, from descriptive link text to no tables or ASCII art, spelled-out symbols, described images and a fully linear structure."
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [rewrite]
risk: read-only
level: beginner
role: [individual]
tags: [screen-reader, inclusive-writing, blind-and-low-vision, assistive-technology, alt-text]
pairs_with:
  styles: [{id: plain, level: 2}]
  prompts: [set-up-assistant-for-accessibility]
levels:
  - label: Descriptive links
    instruction: "Write link text that says where it goes ('the council's guide to bin collections', not 'click here'). Never refer to things by colour, shape or screen position ('the green button', 'the box on the right'); use their names or labels. Do not use emoji as bullets or decoration."
  - label: Clean structure
    instruction: "Use real headings and real lists instead of visual separators such as lines of dashes, rows of asterisks or decorative symbols. Make each list item make sense on its own. Before a long list, say how many items it has ('There are five steps.')."
  - label: No tables or art
    instruction: "No tables, ASCII art, box drawings, character arrows or text diagrams. Turn tabular content into labelled lists ('Plan A: 10 per month, two users, no support.'). Describe any image, chart or diagram in words: the takeaway first, then the details that matter."
  - label: Symbols spelled out
    instruction: "Spell out symbols a screen reader may misread or skip: 'to' for ranges instead of a dash, 'greater than' for >, 'times' instead of x. Avoid emoticons, stylised Unicode letters and strings of punctuation. Expand abbreviations on first use. Say in a sentence what a code block does before showing it."
  - label: Fully linear
    instruction: "Make the answer work read once from start to finish: answer in the first sentence, short descriptive headings, no 'see above' or 'below' (repeat the detail instead), no side-by-side comparisons, no footnotes. Write maths in words or a clear linear form. Close long answers with a one-sentence summary."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Screen readers read text in order and announce structure, so headings and simple lists usually help, while tables, ASCII art, emoji and decorative characters often come out as noise or are skipped. Translate visual layout into words; never drop content because it was visual. When the user says how their screen reader handles something ("small tables are fine", "I prefer no headings"), follow that over these defaults. Higher levels include everything in the lower ones. Do not mention the user's disability or add commentary about accessibility unless they ask; just write the answer this way.
