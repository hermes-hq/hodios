---
schema: 1
id: create-anchor-chart
kind: prompt
title: Design a classroom anchor chart
description: Designs the content and layout of a classroom anchor chart for a skill or procedure, with student-friendly wording, examples, a visual plan and how to build it with the class.
category: teaching
version: 1.0.0
status: incubating
stage: [design]
role: [teacher]
requires: [none]
inputs: [topic]
output: [plan, diagram]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [anchor-chart, classroom-display, visual-supports, worked-examples, co-construction]
pairs_with:
  prompts: [write-lesson-plan, create-graphic-organizer, plan-vocabulary-instruction]
args:
  - name: skill
    description: The skill, strategy or procedure the chart supports, e.g. "making an inference", "column subtraction with exchanging", "what to do when you're stuck".
    type: text
    required: true
  - name: grade_level
    description: Grade, year or age, e.g. "Grade 1", "Year 4", "Grade 7".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Purpose, Chart content, Layout plan, Building it with the class, Using it afterwards]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An anchor chart is a reference that students use while they work, so it captures a skill or routine in a form they can read at a glance from their seats. Charts fail when they are crowded with text, copied from the internet instead of built with the class, or so decorative that the key idea gets lost. Strong charts have one clear purpose, a title students recognise, a few steps or criteria in the words students used during the lesson, a worked example in the students' own context, simple icons, and colour used for meaning. Building it with the class over the lesson makes students far more likely to use it later.
</context>

<task>
Design an anchor chart for **{{skill}}** for **{{grade_level}}**.

1. **Purpose:** in one sentence, when students will look at this chart, and which type it is (a process or procedure chart, a strategy chart, a criteria chart, or a reference chart).
2. **Chart content:**
   - A short title, ideally a question or "I can…" statement.
   - 3 to 5 steps, criteria or key points, each under about 8 words for younger students and 12 for older, in student-friendly wording.
   - A worked example or model from a context familiar to {{grade_level}} students, annotated to show each step.
   - Optionally a common mistake to avoid, with a correction, where this skill has a typical error.
   - Sentence starters if the skill involves talking or writing.
3. **Layout plan:** a text sketch of the chart's zones (title, steps, example, icons) as a simple grid, plus colour use (one colour per step or one colour for key words), simple icons for each step that a teacher could draw quickly, and minimum lettering size so it is readable from the back of the room.
4. **Building it with the class:** which parts are prepared before the lesson (title, boxes) and which are added live with students, the questions the teacher asks to get the students' wording, and the point in the lesson each part is added.
5. **Using it afterwards:** how to point students back to it during independent work, a quick routine for using it (for example "check your work against steps 1 to 3"), a smaller copy for desks or notebooks, and when to retire or update it.
</task>

<constraints>
- One chart, one purpose. If {{skill}} is too broad for one chart, choose the most useful focus, say so in Purpose, and list the other charts it could become.
- Keep the total text on the chart short enough to read in under 30 seconds.
- Content must be correct and use the terms and methods that {{grade_level}} students are taught; if methods vary by country (for example subtraction layouts or terminology), say which one you used.
- Use plain words and the language students actually use; avoid jargon unless it is the term students must learn, and then define it on the chart.
- Use icons and visuals that a teacher can draw by hand without design skills.
</constraints>

<output_format>
## Purpose
One sentence and the chart type.
## Chart content
The exact text that goes on the chart, in order, including the worked example.
## Layout plan
A text grid sketch, colour plan, icons and lettering size.
## Building it with the class
Prepared in advance, added live, questions to ask.
## Using it afterwards
Bullets.
</output_format>
