---
schema: 1
id: prepare-for-formal-observation
kind: prompt
title: Prepare for a formal lesson observation
description: Prepares a teacher for a formal observation by checking the planned lesson against the evaluation rubric, drafting pre-observation conference answers and listing evidence to show.
category: teaching
version: 1.0.0
status: incubating
stage: [review]
role: [teacher]
requires: [none]
inputs: [document, notes]
output: [checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [teacher-evaluation, lesson-observation, appraisal, pre-observation-conference]
pairs_with:
  prompts: [write-lesson-plan, write-teacher-professional-goals, write-lesson-observation-feedback]
  personas: [instructional-coach]
args:
  - name: lesson_plan
    description: The lesson you plan to teach during the observation.
    type: text
    required: true
  - name: rubric
    description: The evaluation rubric or the domains and components the observer uses (paste the relevant parts or name the framework your school uses).
    type: text
    required: true
  - name: class_context
    description: Class context the observer should know, e.g. "mixed class, 4 students with support plans, last unit test results".
    type: text
  - name: concerns
    description: Optional worries, e.g. "behaviour after lunch", "pacing", "my questioning is weak".
    type: text
output_contract:
  format: markdown
  sections: [Rubric alignment, Lesson adjustments, Pre-observation conference, Evidence to have ready, Post-observation reflection]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Observers score what they can see and hear, against specific rubric language. Teachers lose marks not because the teaching is weak but because the evidence is invisible: the objective is not clear to students, differentiation is planned but not visible in the room, checks for understanding happen but the teacher does not visibly adjust, or student-to-student discussion never happens. The best preparation is to teach a normal lesson well, not a show lesson, while making sure each rubric component the observer will look for has visible evidence, rehearsing the riskier transitions, and going into the pre-observation conference able to explain the lesson's place in the unit, how students' needs shaped it and what data will show learning.
</context>

<task>
Help me prepare for a formal observation.
<lesson_plan>
{{lesson_plan}}
</lesson_plan>
<rubric>
{{rubric}}
</rubric>
{{#class_context}}
<class_context>
{{class_context}}
</class_context>
{{/class_context}}
{{#concerns}}
Concerns: {{concerns}}
{{/concerns}}

1. Map the lesson against each rubric component given: where in the lesson the evidence appears, how visible it is to an observer (strong, weak, missing), and the rubric wording it matches. Use only the rubric text provided; if only a framework name was given and you are not sure of its exact wording, describe components in general terms and say the teacher should check against the official text.
2. Suggest the smallest adjustments that make evidence visible: a student-facing objective and success criteria, a planned hinge question with what you do if many get it wrong, student discussion, visible differentiation, a closure that shows learning. Keep the lesson recognisably the teacher's own.
3. Address the concerns given with specific moves (e.g. a structured routine after lunch, timed segments, planned higher-order questions).
4. Draft answers for common pre-observation conference questions: how this lesson fits the unit, what students already know, how you planned for different needs, how you will know students learned, what you want feedback on.
5. List evidence to have ready (seating plan with needs noted for the observer, data, student work samples, the plan) and what to say if something goes wrong mid-lesson.
6. Give 4 or 5 reflection questions for the post-observation conference.
</task>

<constraints>
- Do not suggest staging, rehearsing answers with students, or anything that misrepresents normal teaching.
- Do not invent rubric wording, scores or the school's evaluation rules.
- Keep student information to what the observer needs, without names in shared documents unless school practice requires it.
- Suggestions must fit the lesson's time and the class context.
</constraints>

<output_format>
## Rubric alignment
A table: Component | Where in the lesson | Visibility | Note.
## Lesson adjustments
Numbered changes with reasons.
## Pre-observation conference
Question → draft answer.
## Evidence to have ready
Bullets, including a plan if something goes wrong.
## Post-observation reflection
Questions.
</output_format>
