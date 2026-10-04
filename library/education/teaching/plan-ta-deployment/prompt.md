---
schema: 1
id: plan-ta-deployment
kind: prompt
title: Plan teaching assistant deployment
description: Plans how a teacher deploys a teaching assistant across a week, with a role for each lesson, which pupils, scaffolding not doing, interventions, briefing time and feedback loops.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, manager]
subject: [education-sector]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [teaching-assistants, support-staff, independence, interventions, weekly-timetable]
pairs_with:
  prompts: [write-teaching-assistant-briefing, plan-intervention-group, plan-one-to-one-support-session]
  personas: [classroom-assistant-mentor]
args:
  - name: timetable
    description: The class's weekly timetable, and the teaching assistant's hours, breaks and any fixed commitments (lunch duty, other classes).
    type: text
    required: true
  - name: pupil_needs
    description: Pupils who need support and what their needs and targets are, initials only, plus any statutory or funded hours attached to a pupil.
    type: text
    required: true
  - name: ta_profile
    description: Optional. The assistant's experience, strengths and training (e.g. "trained in a phonics intervention, confident in maths, new to the school").
    type: string
output_contract:
  format: markdown
  sections: [Principles for this class, Weekly deployment, Roles by lesson type, Interventions, Briefing and feedback, Review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A class teacher or SENCO wants to plan how a teaching assistant (TA) is used across the week. Evidence on deploying TAs (summarised in widely used school guidance on making best use of teaching assistants) is clear: TAs used as an informal teacher for the lowest-attaining pupils, sitting beside the same pupils every lesson, can leave those pupils making less progress, because they get less teacher time and become dependent. TAs add most when they supplement rather than replace the teacher, help pupils become independent learners, are prepared for each lesson, and deliver well-structured interventions they are trained in, linked back to class learning.
</context>

<task>
<timetable>
{{timetable}}
</timetable>

<pupil_needs>
{{pupil_needs}}
</pupil_needs>
{{#ta_profile}}TA profile: {{ta_profile}}{{/ta_profile}}

1. Principles for this class: four or five rules written for this teacher and TA (the teacher works with the pupils needing most support in every lesson for part of the time; the TA prompts before helping; the TA roves as well as sits; pupils try first).
2. Weekly deployment: for every timetabled session, the TA's role chosen from: roving and prompting independence, a focus group (named by initials, rotating across the week), working with the rest of the class while the teacher takes a focus group, delivering a structured intervention, observing and recording, or preparation. Respect pupils' statutory or funded support exactly as stated.
3. Roles by lesson type: for input, guided practice, independent work and plenary, what the TA does and says. Include a short prompting ladder: wait, prompt to self-help, hint, model a similar example, and only then step in.
4. Interventions: which pupils, which programme the school already uses (do not invent named programmes), when it runs without missing the same lesson every week, how it links back to class teaching, and how progress is checked.
5. Briefing and feedback: when the teacher and TA meet (a fixed 10 to 15 minutes, with a fallback written briefing), what the TA needs before each lesson, and a quick feedback form after lessons.
6. Review: what to look at after half a term (pupil independence, intervention progress, TA confidence) and how to adjust.
</task>

<constraints>
- Initials only. Use only the needs given; do not add diagnoses.
- The teacher stays responsible for the learning of every pupil, including those with SEND; never plan a pupil to be taught mainly by the TA.
- Hours, breaks and TA contract limits as stated; if missing, ask and mark the plan [hours to confirm].
- Do not invent intervention programmes, evidence statistics or guidance quotes.
</constraints>

<output_format>
## Principles for this class
Numbered list.

## Weekly deployment
Table: Day | Session | TA role | Pupils | Notes.

## Roles by lesson type
Table: Lesson phase | TA does | TA says.

## Interventions
Table: Intervention | Pupils | When | Link to class | How progress is checked.

## Briefing and feedback
Bullets and a short feedback form.

## Review
Bullets.
</output_format>
