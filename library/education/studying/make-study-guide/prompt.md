---
schema: 1
id: make-study-guide
kind: prompt
title: Make a study guide from notes
description: Turns lecture notes or a chapter into a study guide of key concepts, definitions, relationships, common confusions and likely exam questions. Use when revising a unit.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
requires: [none]
inputs: [notes, document, transcript]
output: [summary, questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [revision-notes, concept-map]
pairs_with:
  prompts: [make-flashcards, generate-practice-exam]
args:
  - name: material
    description: Lecture notes, a chapter or a lecture transcript. Paste the text itself.
    type: text
    required: true
  - name: course_level
    description: Optional course level, e.g. "Year 10 GCSE", "first-year university", "graduate seminar". Sets the depth of the questions.
    type: string
output_contract:
  format: markdown
  sections: [Big picture, Key concepts, How it connects, Procedures and formulas, Common confusions, Likely exam questions, Gaps and possible errors]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A study guide is not a shorter copy of the notes. Its value is in what notes do not show: which ideas matter most, how they depend on each other, which ones students mix up, and what an examiner is likely to ask. The student will use it to test themselves, so it must separate questions from answers and point back to where each answer lives.
</context>

<task>
Build a study guide from the material below{{#course_level}} for a {{course_level}} course{{/course_level}}.

<material>
{{material}}
</material>

1. Read everything first. Identify the 3 to 5 central ideas the rest hangs on.
2. Extract the key concepts. For each, write a definition in plain words (not copied verbatim unless it is a formal definition the student must quote) and one line on why it matters.
3. Map the relationships: what causes what, what is a type of what, what contrasts with what, and what must be understood first.
4. Pull out any procedures, formulas or step sequences, with what each symbol means and when the procedure applies.
5. List the pairs of ideas students commonly confuse here, with the one-line distinction.
6. Write likely exam questions: a mix of recall, explanation and application, weighted toward the central ideas. Order them from easiest to hardest. Scale the number to the material: about one per key concept, between 4 and 12.
7. Note the gaps: terms the notes use without explaining, steps that are skipped, and statements that look wrong.
</task>

<constraints>
- Stay faithful to the material. If you add a clarification from general knowledge, mark it "[added]" so the student can check it against the course.
- If something in the material looks wrong, do not repeat it as fact anywhere in the guide. Flag it under Gaps and possible errors with the correction marked "[added]".
- If the material is only a topic name or a title with no content ("Mitosis", "Chapter 5"), ask for the notes or chapter text and stop. Short but real notes are fine: build a proportionally short guide.
- Do not pad. A section with nothing to say gets one line ("None in this material"). For long material, aim for a guide a third of its length or less; for short notes, the guide may be longer because the questions and connections are new.
- If you know the material only covers part of a unit (it stops mid-topic, or refers to sections that are not included), say so in Gaps rather than filling them in.
</constraints>

<output_format>
## Big picture
3 to 5 sentences: what this unit is about and the central ideas.
## Key concepts
A table: Concept | Definition in plain words | Why it matters.
## How it connects
An indented list showing dependencies and contrasts, using "→ causes", "⊂ is a type of" and "vs." labels.
## Procedures and formulas
Numbered steps or formulas with symbol meanings. Write "None in this material" if there are none.
## Common confusions
Bullets: "A vs. B: the difference in one line".
## Likely exam questions
4 to 12 numbered questions. After each, in italics, the section of this guide that answers it, not the answer itself.
## Gaps and possible errors
Bullets, each starting "Gap:" or "Possible error:", or "None found".
</output_format>
