---
schema: 1
id: design-self-and-peer-assessment
kind: prompt
title: Design self- and peer-assessment
description: Designs self-assessment and peer feedback protocols tied to success criteria, with sentence starters, a feedback form and steps that make students act on the feedback.
category: teaching
version: 1.0.0
status: incubating
stage: [design]
role: [teacher]
requires: [none]
inputs: [text, topic]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [peer-assessment, self-assessment, success-criteria, formative-assessment, student-agency]
pairs_with:
  prompts: [create-rubric, mark-student-work-against-rubric, design-formative-assessment, build-feedback-comment-bank]
args:
  - name: task
    description: The piece of work students will assess, e.g. "a lab report on reaction rates", "a persuasive speech", "a short story opening".
    type: text
    required: true
  - name: success_criteria
    description: The success criteria or rubric for the task, as students see them.
    type: text
    required: true
  - name: grade_level
    description: Grade, year or age, e.g. "Grade 3", "Year 10".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Criteria in student language, Training students, Self-assessment protocol, Peer feedback protocol, Sentence starters, Feedback form, Acting on feedback, Teacher checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Self- and peer-assessment help students learn when they make the success criteria concrete, train students to spot quality in real work, and end with students improving their own work. They fail in familiar ways: "two stars and a wish" becomes "good job, add more detail"; peers give vague praise to friends; criteria are too abstract to apply; and no time is set aside to act on the feedback, so it is never used. Effective protocols are anchored in examples (students first practise on anonymous work the teacher shows), ask students to point to evidence for each criterion, structure feedback as specific, kind and actionable, and build in a step where the writer responds and revises. Peer marks should not count toward grades.
</context>

<task>
Design self- and peer-assessment for **{{grade_level}}** on this task:

<task_text>
{{task}}
</task_text>

<success_criteria>
{{success_criteria}}
</success_criteria>

1. **Criteria in student language:** rewrite each criterion as a "Did I / Did they…?" question a student at this age can check, with what it looks like in the work. If the criteria are vague ("good structure"), make them concrete and note the change for the teacher.
2. **Training students:** a 10 to 15 minute session before the first use, where the teacher models assessing an anonymous example (describe a short example for this task with deliberate strengths and gaps, or tell the teacher what kind of example to use), then students practise and compare their judgements.
3. **Self-assessment protocol:** steps students follow on their own work, for example highlight the evidence for each criterion in a colour, rate their confidence, and write one target. Keep it short enough to do in 5 to 10 minutes.
4. **Peer feedback protocol:** pairing or grouping, the order of steps (read silently first, check each criterion against evidence, one strength with a quote, one specific improvement with a suggestion, one question), timings, and roles. Adapt to the age and task type (for example a gallery walk for posters, a listening protocol for speeches).
5. **Sentence starters:** for praise that names a criterion, for suggesting improvements, and for asking questions. Include starters to avoid ("It's good", "Add more").
6. **Feedback form:** a one-page form with the criteria, an evidence column, the strength, the improvement and a reply space for the author.
7. **Acting on feedback:** a protected 10 to 20 minutes where students choose feedback to act on, make the change, and record what they changed and why; how students can respectfully disagree with feedback.
8. **Teacher checks:** how the teacher checks feedback quality (sample forms, a quick quality rubric), how to handle unkind or unhelpful feedback, and how to support students who find it hard (sentence starters, a feedback partner, oral feedback instead of written).
</task>

<constraints>
- Feedback refers to the work and the criteria, never the person.
- Peer and self-assessment are formative; do not use peer scores for grades.
- Keep the language and form length suitable for {{grade_level}}; very young children use pictures, symbols and spoken feedback.
- If the success criteria do not fit the task, point out the mismatch before building the protocols.
</constraints>

<output_format>
## Criteria in student language
Table: Criterion | Question to check | What it looks like.
## Training students
Steps and the example to use.
## Self-assessment protocol
Numbered steps.
## Peer feedback protocol
Numbered steps with timings and roles.
## Sentence starters
Grouped lists, plus starters to avoid.
## Feedback form
A printable table.
## Acting on feedback
Steps and the response log.
## Teacher checks
Bullets.
</output_format>
