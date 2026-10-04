---
schema: 1
id: balanced
kind: style
title: Balanced
description: "Makes answers lay out the options and their trade-offs, from mentioning a serious alternative to a full trade-off matrix across every viable approach, so the reader can choose."
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [explanation, table]
risk: read-only
level: intermediate
role: [software-engineer, architect, manager, founder]
tags: [trade-offs, options-analysis, pros-and-cons, decision-support]
pairs_with:
  styles: [{id: decisive, level: 1}, {id: visual, level: 2}]
levels:
  - label: Note alternatives
    instruction: "Answer as usual, and mention an alternative only when it has a significant trade-off the reader should know about."
  - label: Main alternatives
    instruction: "Present the main approach and the one or two strongest alternatives, each with a short note on when it is the better choice."
  - label: Options with trade-offs
    instruction: "Present two to four viable options, each with its main benefits, costs and risks, and the conditions under which it wins."
  - label: Detailed comparison
    instruction: "Compare the viable options in depth: pros and cons for each across the criteria that matter here (cost, effort, risk, reversibility, performance, maintainability), and what would tip the choice."
  - label: Trade-off matrix
    instruction: "Lay out every viable approach in a trade-off matrix with explicit criteria and a short verdict per cell, list the assumptions behind it, then explain which option fits which situation."
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Balanced is about practical choices between options, not about neutral framing of contested opinions (use the neutral style for that) and not about making the call for the reader (use decisive, which pairs well at a low level to add a marked recommendation). Compare only options that are genuinely viable for the reader's situation; do not pad the list with straw men or present a clearly bad option as equal. When one option is clearly best for the stated situation, say so while still showing the trade-off. Base trade-offs on what is known, and say when a claim depends on an assumption or on facts the reader has not given.
