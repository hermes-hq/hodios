---
schema: 1
id: design-unit-plan
kind: prompt
title: Design a unit plan
description: Designs a multi-week unit by backward design, with an essential question, outcomes, a summative performance task, sequenced lessons and formative checks. For teachers planning a topic, not one lesson.
category: teaching
version: 1.0.0
status: incubating
stage: [plan, design]
role: [teacher]
requires: [none]
inputs: [topic, spec, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [unit-planning, backward-design, understanding-by-design, essential-questions, formative-assessment]
pairs_with:
  prompts: [write-lesson-plan, create-rubric, write-learning-objectives, write-multiple-choice-questions]
  personas: [instructional-coach]
args:
  - name: topic
    description: The unit topic, e.g. "ecosystems and energy flow", "persuasive writing", "linear functions", "the Cold War".
    type: string
    required: true
  - name: grade
    description: Grade or year and subject, plus lessons per week and lesson length if known, e.g. "Grade 7 science, 4 x 50-minute lessons a week".
    type: string
    required: true
  - name: weeks
    description: Length of the unit in weeks.
    type: number
    default: 4
  - name: standards
    description: Optional standards or curriculum statements the unit must address, pasted with their codes.
    type: text
output_contract:
  format: markdown
  sections: [Stage 1 Desired results, Stage 2 Evidence, Stage 3 Learning plan, Misconceptions and supports, Materials]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Units planned activity-first drift: the lessons are engaging, but nobody can say what students should understand at the end or how the teacher will know. Backward design (Wiggins and McTighe's Understanding by Design) reverses the order: decide the desired results, then the evidence that would show them, then the lessons that get students there. Formative checks along the way tell the teacher when to adjust before the summative task.
</context>

<task>
Design a {{weeks}}-week unit on {{topic}} for {{grade}}.
{{#standards}}
<standards>
{{standards}}
</standards>
{{/standards}}

1. **Stage 1, desired results:**
   - 1 or 2 essential questions: open-ended, worth arguing about, recurring beyond this unit.
   - 2 or 3 enduring understandings, written as full sentences ("Students will understand that...") stating an insight, not a topic.
   - Knowledge and skills students will acquire, as specific statements.
   - The standards addressed{{#standards}}, citing the codes given{{/standards}}. Only cite standards that were given; otherwise describe the intended outcomes without inventing codes.
2. **Stage 2, evidence:**
   - A summative performance task in a realistic context: the goal, the student's role, the audience, the situation, the product, and the success criteria (the GRASPS frame). It must require the understandings, not just recall.
   - Supporting summative evidence where needed (a short test on knowledge that the task does not cover).
   - A pre-assessment for the first lesson to find what students already know and believe.
   - Rubric criteria for the task: 3 to 5 criteria, each tied to an understanding or skill.
3. **Stage 3, learning plan:** lessons sequenced week by week. Work out the number of lessons from the grade details; if lessons per week are not given, assume 4 and say so. For each lesson: the objective, the main activity, and a formative check (exit ticket, hinge question, mini whiteboard round) with what the teacher does if it shows a gap. Build in: a hook that raises the essential question, explicit teaching before independent practice, spaced review of earlier content, at least one lesson of practice on the performance task's skills, and time to complete and present the task.
4. **Misconceptions and supports:** the common misconceptions for this topic and age, where in the sequence each is addressed, and supports and extensions for different learners.
5. **Materials:** a list of resources to prepare or find, described by type rather than by invented titles.
</task>

<constraints>
- Align everything: every lesson serves an understanding or skill, and every understanding is assessed in Stage 2.
- Fit the time: total lesson count must match {{weeks}} weeks; if the content does not fit, say what to cut or compress.
- Age-appropriate content, tasks and reading load for {{grade}}.
- Do not invent standards codes, textbook titles or website names. Use [placeholders] for specific resources.
- If the topic is too broad for {{weeks}} weeks, propose a narrower focus and explain why.
</constraints>

<output_format>
Use the section headings from the output contract. Stage 1 as lists. The performance task as a short GRASPS block followed by a rubric criteria table. Stage 3 as one table per week: Lesson | Objective | Activity | Formative check | If students struggle.
</output_format>
