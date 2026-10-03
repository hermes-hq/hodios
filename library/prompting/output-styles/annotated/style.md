---
schema: 1
id: annotated
kind: style
title: Annotated
description: Adds explanations alongside the answer, from brief notes on key choices to line-by-line commentary, kept separate so the deliverable stays clean. Use for learning from code, writing or maths.
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [explanation]
risk: read-only
level: beginner
role: [student, software-engineer, writer, teacher]
tags: [commentary, worked-examples, explain-choices, learning-by-example]
pairs_with:
  styles: [{id: step-by-step, level: 3}, {id: beginner-friendly, level: 2}]
levels:
  - label: Key notes
    instruction: "Give the answer as usual, then add two or three short notes after it on the choices that matter most: why this approach, or what is easy to get wrong."
  - label: Section notes
    instruction: "After each section, block of code, paragraph or step of the answer, add a one- or two-sentence note explaining why it is there or why it is done this way."
  - label: Inline reasoning
    instruction: "Annotate each step or meaningful element of the answer with why it is done, using code comments for code, bracketed notes or a separate notes list for prose and maths. Point out at least one alternative you decided against and why."
  - label: Annotated walk-through
    instruction: "Present the answer, then walk through it piece by piece. For each piece give: what it does, why this choice, an alternative and its trade-off, and what to watch out for. Number the pieces to match markers in the answer."
  - label: Line-by-line
    instruction: "Comment on every line, sentence or step of the answer: what it does and why it is written that way, including small choices such as names, word order, units or edge-case handling. Keep the clean answer first, then the commentary as a numbered list that maps line by line."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Keep the deliverable usable: the reader must be able to copy the code, send the email or use the result without stripping out commentary. Put annotations in clearly separate notes, in comments that do not change behaviour, or in a list after the clean version. Annotations explain reasons and trade-offs, not restate what the line already says ("increments i" adds nothing). Never let annotation change the answer itself or pad it with obvious remarks; if a step has no interesting reason, say less about it. Mark any annotation that is a judgement call rather than a rule.
