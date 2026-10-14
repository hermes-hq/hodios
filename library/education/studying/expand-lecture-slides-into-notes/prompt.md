---
schema: 1
id: expand-lecture-slides-into-notes
kind: prompt
title: Expand lecture slides into notes
description: Expands terse lecture slides into full study notes that explain each bullet, connect the slides into one argument and mark what the slides leave unexplained.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
requires: [none]
inputs: [document, notes]
output: [explanation, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [lecture-slides, lecture-notes, missed-lecture, self-explanation]
pairs_with:
  prompts: [prime-for-next-lecture, turn-lecture-transcript-into-notes, make-study-guide, review-notes-for-gaps]
  personas: [study-coach]
args:
  - name: slides
    description: The slide text in order, with slide numbers, copied or exported from the slide deck. Include speaker notes if the deck has them.
    type: text
    required: true
  - name: own_notes
    description: Optional notes you took in the lecture, so the expansion uses what the lecturer actually said where possible.
    type: text
  - name: course_context
    description: Optional course name, level and set textbook, so explanations pitch at the right level and point to the right reading.
    type: string
output_contract:
  format: markdown
  sections: [The lecture's argument, Slide-by-slide notes, How the slides connect, What the slides leave unexplained, Check questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Slides are written as cues for the lecturer, not as notes for the student. A bullet like "Market failure: externalities, public goods" means something to the person who spoke for ten minutes around it and almost nothing to a student revising from it three weeks later. Students who revise from bare slides memorise the words without the reasoning, and they miss that the slides form an argument: each section sets up the next. Expanding slides well means explaining each bullet in full sentences, making the links explicit, and being honest about where the slides alone cannot show what the lecturer meant, so the student knows what to check in the reading or ask about.
</context>

<task>
Expand these lecture slides into full study notes.

<slides>
{{slides}}
</slides>
{{#own_notes}}
<own_notes>
{{own_notes}}
</own_notes>
{{/own_notes}}
{{#course_context}}
Course context: {{course_context}}
{{/course_context}}

1. Read all the slides first and state the lecture's overall question or claim and the sequence of steps it goes through, in 3 to 6 sentences.
2. For each slide or group of related slides, write notes that turn each bullet into a full explanation: what it means, why it is true or matters, and a short example. Where the student's own notes say what the lecturer said, use that and mark it "(your notes)".
3. Mark each explanation by source: from the slides, from your notes, or "standard explanation" where you add textbook-level background. Keep added background to what is needed to make the bullet make sense.
4. Write the links: how each section leads to the next, and which earlier idea a later slide depends on.
5. List what the slides leave unexplained: bare diagrams, undefined symbols, claims without reasons, examples named but not given, and places where several readings are possible. For each, say where to look (the set reading, the recording, or a question for the lecturer).
6. Write 5 to 8 check questions that test understanding of the argument, not recall of slide wording, with short model answers.
</task>

<constraints>
- Never present added background as something the lecturer said. Label it "standard explanation".
- Where a slide is ambiguous and the explanation depends on the course's own framing (a definition that varies between textbooks, a model with several versions), give the common reading, flag the ambiguity and send the student to the course material.
- Do not invent data, study results, dates or names a slide only hints at.
- If the slide text is too thin to expand (titles only, or images with no text), say so and list what is needed.
- Keep the student's terminology and notation as used on the slides.
</constraints>

<output_format>
## The lecture's argument
## Slide-by-slide notes
A heading per slide or slide group (with slide numbers), explanations marked by source.
## How the slides connect
## What the slides leave unexplained
A table: Slide | What is missing | Where to look.
## Check questions
Numbered, each with a short model answer.
</output_format>
