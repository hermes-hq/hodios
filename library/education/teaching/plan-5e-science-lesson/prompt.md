---
schema: 1
id: plan-5e-science-lesson
kind: prompt
title: Plan a 5E science lesson
description: Plans an inquiry science lesson in the 5E model (engage, explore, explain, elaborate, evaluate) with timings, materials, key questions, safety notes and evidence of learning per phase.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic, preferences]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [physics, chemistry, biology]
tags: [5e-model, inquiry-learning, science-lesson, lesson-design]
pairs_with:
  prompts: [design-science-lab-activity, write-lesson-plan, diagnose-student-misconceptions]
args:
  - name: topic
    description: The science concept, e.g. "series and parallel circuits", "how seeds disperse".
    type: string
    required: true
  - name: grade_level
    description: Grade, age or course.
    type: string
    required: true
  - name: time_available
    description: Total time, e.g. "one 60-minute lesson" or "three 45-minute lessons". 5E often spans more than one lesson.
    type: string
    required: true
  - name: resources
    description: Optional equipment and space available, e.g. "no lab, basic kit only", "class set of multimeters".
    type: text
  - name: standard
    description: Optional curriculum standard or objective to meet.
    type: text
output_contract:
  format: markdown
  sections: [Overview, Phase plan, Explain phase content, Evaluate task, Safety and logistics, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The 5E model (Engage, Explore, Explain, Elaborate, Evaluate) works because students meet the phenomenon before the vocabulary: they explore, notice something that needs explaining, and only then get the formal explanation, which now answers a question they already have. The most common mistakes are explaining before exploring (which turns Explore into a recipe that confirms what students were told), an Explore phase with no clear question so students "play" without noticing the key pattern, and an Elaborate phase that is just more of the same instead of transferring the idea to a new context. Evaluation runs through every phase, not only at the end.
</context>

<task>
Plan a 5E lesson sequence on **{{topic}}** for **{{grade_level}}** in {{time_available}}.
{{#standard}}
<standard>
{{standard}}
</standard>
{{/standard}}
{{#resources}}
<resources>
{{resources}}
</resources>
{{/resources}}

1. Write one or two measurable objectives and the core idea students should be able to explain at the end in one sentence a student could say.
2. Name the two or three misconceptions students commonly hold about this concept; plan the Engage and Explore phases to surface them.
3. Plan each phase with time, what the teacher does, what students do, the key questions the teacher asks, and the evidence of learning the teacher looks or listens for:
   - **Engage:** a phenomenon, discrepant event or question that creates a need to know, plus a quick way to capture initial ideas (prediction, drawing, vote).
   - **Explore:** a hands-on or data-based investigation with a clear investigable question, where students collect observations before any formal explanation. Write the student instructions.
   - **Explain:** students share findings first, then the teacher introduces the scientific explanation and vocabulary, linking each idea to what students observed.
   - **Elaborate:** apply the idea to a new situation or problem that needs the concept, not a repeat of Explore.
   - **Evaluate:** students revisit their Engage ideas and complete a short task that shows whether they can explain the concept.
4. Make the timings fit {{time_available}}; if the sequence spans lessons, mark where each lesson ends with a short closure.
5. Write the Explain phase content (key explanation, a diagram described in words, vocabulary with student-friendly definitions).
6. Write the Evaluate task with a success-criteria checklist and an example strong answer.
7. List safety points and set-up for the equipment used.
</task>

<constraints>
- Do not explain the concept before Explore; Engage may pose the question but must not give the answer.
- Use only equipment in the resources list, or ordinary classroom and household items if none is given; offer a data-based or simulation alternative when hands-on is not possible.
- Science content must be accurate for the level; simplify without teaching something students will have to unlearn, and flag any simplification.
- Include real safety precautions for any practical (heat, chemicals, glass, electricity, sharp tools, allergies); never suggest unsafe activities for the age group. Tell the teacher to follow the school's risk assessment.
- Do not cite specific curriculum codes unless given.
</constraints>

<output_format>
## Overview
Topic, grade, time, objectives, core idea, misconceptions targeted.
## Phase plan
A table: Phase | Time | Teacher does | Students do | Key questions | Evidence of learning. Student instructions for Explore below the table.
## Explain phase content
Explanation, diagram description, vocabulary.
## Evaluate task
Task, success criteria, example strong answer.
## Safety and logistics
Bullets.
## Assumptions
What was assumed about the class, curriculum and equipment.
</output_format>
