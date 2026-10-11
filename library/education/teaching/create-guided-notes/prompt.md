---
schema: 1
id: create-guided-notes
kind: prompt
title: Create guided notes
description: Turns lesson slides or notes into fill-in guided notes for students, with blanks on key ideas, worked examples to complete, a summary prompt and a teacher answer copy.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [document, notes]
output: [docs]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [guided-notes, fill-in-notes, learning-support, student-handout]
pairs_with:
  prompts: [create-graphic-organizer, convert-slides-to-handout, differentiate-lesson]
args:
  - name: lesson_content
    description: The slide text, lecture notes or lesson outline to build the notes from.
    type: text
    required: true
  - name: grade_level
    description: Grade, age or course.
    type: string
    required: true
  - name: support_level
    description: How much is pre-filled. standard leaves key terms and ideas blank; more-support gives word banks and fewer blanks; less-support leaves whole sentences and examples for students to write.
    type: enum
    enum: [standard, more-support, less-support]
    default: standard
output_contract:
  format: markdown
  sections: [Student guided notes, Teacher answer copy, Notes for the teacher]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Guided notes keep students listening and processing instead of copying slides word for word, and they are a standard accommodation for students who struggle to take notes. They work when the blanks fall on the ideas that matter (key terms, relationships, the step in a method students get wrong), not on random words like "the" or easy-to-guess filler. Good guided notes follow the order of the lesson exactly, leave enough space to write, include at least one worked example where students complete the steps, and end with a short summary or question that makes students use what they wrote.
</context>

<task>
Create {{support_level}} guided notes for **{{grade_level}}** from this lesson content.
<lesson_content>
{{lesson_content}}
</lesson_content>

1. Follow the order and headings of the lesson content exactly so students can track along.
2. Choose blanks on key vocabulary, definitions, cause-effect links and the critical steps in any method. Aim for roughly one blank per key idea; mark each blank with a numbered underscore line (e.g. ____(1)____).
3. Apply the support level:
   - standard: key terms and short phrases blank;
   - more-support: fewer blanks, a word bank for each section, partial first letters for hard terms;
   - less-support: whole sentences, summaries and example steps for students to write.
4. Turn each worked example into a partially completed one with the first step shown and later steps for students.
5. Add a short "Check yourself" question per section and a 2 to 3 sentence summary prompt at the end.
6. Produce a teacher answer copy with every blank filled, numbered to match.
</task>

<constraints>
- Use only the content given; do not add new facts. If the content has an error or a gap, point it out in the teacher notes instead of filling it.
- Blanks must be answerable from the lesson; no trick blanks.
- Keep the layout printable: short lines, clear headings, room to write.
</constraints>

<output_format>
## Student guided notes
The notes with numbered blanks, worked examples to complete, check questions and summary prompt.
## Teacher answer copy
Numbered answers and completed examples.
## Notes for the teacher
Any errors or gaps found in the content, and tips for using the notes.
</output_format>
