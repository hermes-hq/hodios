---
schema: 1
id: design-work-placement-curriculum
kind: prompt
title: Design a placement learning plan for hosts
description: Designs a host's learning plan for a student placement or internship, with weekly learning goals, supervised tasks, observation and feedback points, an assessment sign-off and a final review.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [manager]
requires: [none]
inputs: [text, spec]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [work-placement, internships, workplace-mentoring, supervision, work-based-learning, host-employer]
pairs_with:
  prompts: [design-onboarding-curriculum, design-apprenticeship-plan]
args:
  - name: placement_field
    description: The field and type of placement, e.g. "civil engineering summer internship", "social work student placement", "Year 12 work experience in a vet practice", "software sandwich-year placement".
    type: string
    required: true
  - name: weeks
    description: Length of the placement in weeks.
    type: number
    default: 8
  - name: course_requirements
    description: Optional. What the student's course or college requires - learning outcomes, competencies to evidence, forms, hours, visits by a tutor - and the student's level and any agreed adjustments.
    type: text
output_contract:
  format: markdown
  sections: [Placement goals, Week-by-week plan, Supervision and feedback, Assessment and sign-off, Induction and safety, Final review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Placement hosts often have goodwill but no plan: the student spends week one reading policies, then does whatever is lying around, gets feedback only at the end, and the university form is filled in from memory on the last day. Good placements give a clear progression from observing to doing with support to doing independently, real work with a purpose, regular short feedback, evidence collected as it happens, and a named supervisor with protected time. The host's plan has to fit the course's requirements without turning the placement into paperwork.

Field: {{placement_field}}. Length: {{weeks}} weeks.
</context>

<task>
{{#course_requirements}}
<course_requirements>
{{course_requirements}}
</course_requirements>
{{/course_requirements}}

1. **Placement goals:** four to six learning goals for {{placement_field}}, mapped to the course requirements where given, each with what the student will be able to do by the end.
2. **Week-by-week plan:** for each of the {{weeks}} weeks, the focus, real tasks (moving from observe, to assist, to lead with supervision, to independent where safe), who they work with, and the evidence the week produces. Include a meaningful small project with a real audience in the second half.
3. **Supervision and feedback:** named supervisor and day-to-day contacts, a 15-minute weekly check-in agenda (what went well, one thing to improve, next week's goals), points where the supervisor observes a task with a short observation form, and how the student can raise a concern.
4. **Assessment and sign-off:** how evidence is collected during the placement (observation notes, work samples, reflective logs), a mid-point review, and what the supervisor signs, using the course's forms where given. Separate observed facts from judgement.
5. **Induction and safety:** a first-day and first-week plan covering people, tools and access, health and safety, confidentiality, and for under-18s or vulnerable settings the safeguarding and supervision rules to confirm [check with the course and local law].
6. **Final review:** an end-of-placement conversation guide, a short reference or feedback statement template, and what the host learns for next time.
</task>

<constraints>
- Real, useful work: no placements made of filing and shadowing only; but no unsupervised tasks beyond the student's competence or legal limits.
- Do not invent the course's forms, required hours, pay or employment law; mark them [check with the university or college] or [check local law].
- Respect any adjustments the student has agreed, and do not ask for disability or health details beyond what the student chooses to share.
- Feedback language is specific and behavioural, never about personality.
- If the field is unclear, ask and stop. If the student's level or year is not given, assume the most likely one from the field, state it at the top of Placement goals and list it under questions to confirm, then continue.
- If the request is really for unsupervised cover or free labour, say plainly that a placement needs a named supervisor and learning goals, note that pay and employment rules must be checked locally, and plan useful supervised work instead.
</constraints>

<output_format>
## Placement goals
Table: Goal | By the end the student can | Course requirement.
## Week-by-week plan
Table: Week | Focus | Tasks | Level of independence | Evidence.
## Supervision and feedback
Bullets, weekly check-in agenda and observation form.
## Assessment and sign-off
Bullets.
## Induction and safety
First-day and first-week checklist.
## Final review
Conversation guide, statement template, and any assumptions or questions to confirm with the course.
</output_format>
