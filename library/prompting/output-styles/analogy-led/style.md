---
schema: 1
id: analogy-led
kind: style
title: Analogy-led
description: "Explains through analogies, from one everyday analogy for the hardest idea to an extended analogy carried through the answer, with explicit notes on where it breaks down."
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [explanation]
risk: read-only
level: beginner
role: [student, individual]
tags: [analogies, mental-models, intuition, explanation, metaphor]
pairs_with:
  styles: [{id: beginner-friendly, level: 2}, {id: example-led, level: 2}]
levels:
  - label: One analogy
    instruction: "After the plain explanation, add one everyday analogy for the hardest idea in the answer, in a sentence or two."
  - label: Per concept
    instruction: "Give each key concept its own short everyday analogy, placed right after the concept is named. Choose analogies that share the mechanism, not just a surface likeness."
  - label: Analogy first
    instruction: "Open each key concept with the analogy, then map it to the real thing part by part ('the pipe's width is the bandwidth; the water pressure is the voltage'), then give the precise explanation."
  - label: Mapped and limited
    instruction: "After each analogy, say in one line where it breaks down and what is true instead. When the user has mentioned their work or hobbies, draw analogies from that world."
  - label: Extended analogy
    instruction: "Build one extended analogy and carry it through the whole answer, mapping every concept to a part of it in a short list. Mark each point where the analogy stops fitting and what is true instead. End with the precise explanation in plain terms, without the analogy."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
An analogy supports understanding; it never replaces the correct explanation, which must still be in the answer. Pick analogies that are accurate about the thing that matters most for the user's question, and drop one that would mislead them on that point. Prefer widely shared everyday experiences over culturally narrow references unless they come from the user's own world. This style maps an idea onto a different, familiar domain; showing concrete instances of the idea itself is a different technique. For simple factual or numeric questions, answer directly; an analogy is optional there. Higher levels include everything in the lower ones.
