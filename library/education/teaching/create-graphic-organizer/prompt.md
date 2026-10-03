---
schema: 1
id: create-graphic-organizer
kind: prompt
title: Create a graphic organizer
description: Designs a graphic organizer matched to a thinking task (compare, cause and effect, argument, sequence), with a modelled example, a blank printable version and sentence frames.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [topic, text]
output: [table, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [graphic-organizer, learning-scaffolds, thinking-skills, sentence-frames, printable]
pairs_with:
  prompts: [differentiate-lesson, design-classroom-activity, create-practice-worksheet]
args:
  - name: task_and_content
    description: The thinking task and the content, e.g. "compare and contrast frogs and toads", "causes and effects of the Dust Bowl", "plan an argument essay on school uniforms".
    type: text
    required: true
  - name: grade_level
    description: Grade, age or course, e.g. "Grade 2", "Year 8", "adult literacy".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Organizer choice, Modelled example, Blank organizer, Sentence frames, How to use it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A graphic organizer helps when its structure matches the thinking students need to do: a comparison matrix with criteria makes students compare point by point, where a Venn diagram often produces two unrelated lists; a cause-and-effect chain makes students show the links, not just name causes; an argument organizer separates claim, evidence and reasoning. Organizers backfire when they become fill-in-the-boxes busywork, when the boxes are too small for real thinking, or when the teacher's filled example gives away the answers to the very task students are about to do.
</context>

<task>
Create a graphic organizer for **{{grade_level}}**.

<task_and_content>
{{task_and_content}}
</task_and_content>

1. **Choose the organizer** that matches the thinking: for example a comparison matrix or double bubble for compare and contrast, a cause-and-effect chain or fishbone for causes, a claim-evidence-reasoning frame for argument, a flow chart or timeline for sequence, a concept map for relationships, a story map for narrative structure. Say in one or two sentences why it fits better than the usual alternative.
2. **Modelled example:** fill the organizer for a parallel example on different but similar content (for instance compare cats and dogs when the task compares frogs and toads), so students see the thinking without being given their answers. Include at least one entry that shows the deeper thinking you want (a link, a criterion, a "because").
3. **Blank organizer** for the actual task, printable in black and white: a Markdown table or clearly labelled boxes, with headings and the criteria or prompts already in place, and enough rows for the content. Add a final box that asks students to synthesise (a summary sentence, a conclusion, "the most important difference is… because…").
4. **Sentence frames** at two levels: basic frames for students who need language support, and stretch frames for students ready to write more complex sentences.
5. **How to use it:** 3 or 4 steps for the teacher (model, partner work, independent, turn the organizer into writing or talk).
</task>

<constraints>
- Fit language, number of boxes and box size to {{grade_level}}: fewer, larger boxes and picture cues for young students; criteria-based matrices for older students.
- The modelled example uses different content from the task and must be accurate.
- Keep the organizer to one printed page.
- If the task does not need an organizer (for example a single recall question), say so briefly and suggest a better scaffold.
- If the thinking task is unclear, pick the most likely one, say what you assumed, and design for it.
</constraints>

<output_format>
## Organizer choice
Type and why.
## Modelled example
The filled organizer for the parallel content.
## Blank organizer
The printable organizer for the task.
## Sentence frames
Basic · Stretch.
## How to use it
Numbered steps.
</output_format>
