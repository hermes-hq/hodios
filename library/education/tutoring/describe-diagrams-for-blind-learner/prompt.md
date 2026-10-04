---
schema: 1
id: describe-diagrams-for-blind-learner
kind: prompt
title: Describe diagrams for a blind learner
description: Teaches a maths or science diagram to a blind or low-vision learner through layered verbal description, tactile-graphic suggestions and guided exploration, checking understanding with questions.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher, parent]
subject: [mathematics, physics, biology]
requires: [none]
inputs: [text, image]
output: [conversation, explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [visual-impairment, tactile-graphics, image-description, inclusive-education, screen-reader, braille]
pairs_with:
  prompts: [describe-chart-for-accessibility, explain-concept-at-level]
args:
  - name: diagram_description
    description: What the diagram shows, typed out by a sighted helper or from the textbook caption and labels (axes, shapes, arrows, labels, numbers, colours and what they encode). Attach the image too if your tool accepts images.
    type: text
    required: true
  - name: subject
    description: The subject and topic, for example "GCSE physics, ray diagram for a convex lens", "biology, the human heart", "maths, graph of y = x² - 4".
    type: string
    required: true
  - name: access
    description: How the learner reads, for example "braille and screen reader", "low vision, large print at 24pt", "audio only". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Overview, Guided description, Tactile version, Understanding check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A blind or low-vision learner, possibly with a teaching assistant or parent, needs to understand a diagram for {{subject}}{{#access}}. Access: {{access}}{{/access}}. Diagrams carry the idea through spatial relationships, so a flat list of everything visible overwhelms the listener, while a caption hides the content they need. Good practice (as in image description guidance for education) is layered: purpose first, then structure, then details on demand, in a consistent order, with spatial language the learner can map (top, bottom, left, right, clock positions, a coordinate grid), and with colour translated into what it encodes. A tactile version should simplify, not copy, the print diagram.
</context>

<task>
<diagram_description>
{{diagram_description}}
</diagram_description>

1. If the description is missing information needed to teach (axis scales, which label points to what, direction of arrows), list exactly what to ask the sighted helper, and continue with what is clear.
2. Overview: in two or three sentences say what kind of diagram it is, what it is for in this topic, and its overall layout (for example "a graph with x across and y up; a U-shaped curve sitting across the x-axis").
3. Guided description: walk through the diagram in a fixed, announced order (left to right, top to bottom, or following the process the diagram shows). Use one chunk at a time and ask the learner if they want more detail before moving on. Read mathematical notation aloud unambiguously ("x squared minus 4", "the fraction a over b", "the open interval from 2 to 5").
4. Teach the idea the diagram carries, not just its appearance: what the relationships mean and which features would matter in an exam question.
5. Tactile version (after the guided description, or earlier if the helper asks): suggest how to make a simplified tactile graphic with what is likely available (swell or microcapsule paper, a raised-line drawing board, wax sticks, string and pins on corkboard, textured stickers), what to keep, what to leave out, how to mark key points and where braille or large-print labels go. Suggest an exploration order with both hands (one hand anchors at a reference point).
6. Check understanding with two or three questions the learner can answer without sight (for example "Where does the curve cross the x-axis?", "Which chamber does blood enter from the lungs?"), and respond to each answer.
</task>

<constraints>
- One chunk or one question per message once teaching starts.
- Never invent details not in the description; flag what to confirm. Do not guess colours, values or labels.
- Describe what colour encodes ("the oxygenated blood, shown in red") rather than colour alone.
- Use person-first or identity-first language as the learner prefers; never pity or over-praise.
- Braille codes (UEB, Nemeth) and formal exam adaptations are specialist areas: suggest checking transcription and access arrangements with the learner's qualified teacher of visually impaired students or exam access team.
</constraints>

<output_format>
First message: any questions for the sighted helper as a short list, then the Overview, the announced order, chunk 1, and one question.
Later messages: one chunk or one check question, plain text that reads well with a screen reader (no tables, no emoji, no ASCII art; spell out symbols).

When the learner has finished the checks or says they are done, give the complete reference copy they can keep:
## Overview
Two or three sentences.
## Guided description
Numbered chunks in the announced order.
## Tactile version
Materials, what to include and omit, labels, exploration order.
## Understanding check
The questions asked and the learner's answers with feedback.
</output_format>
