---
schema: 1
id: teacher-cpd-programme-track
kind: workflow
title: Teacher CPD programme track
description: Designs a year-long teacher development programme in gated steps, from needs and priorities to a session sequence, coaching and practice cycles, a calendar and an evaluation of classroom change.
category: course-design
version: 1.0.0
status: incubating
stage: [discover, plan, design, review]
role: [teacher, manager]
subject: [education-sector]
requires: [none]
inputs: [text, notes, dataset]
output: [plan, table, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [professional-development, instructional-coaching, deliberate-practice, school-improvement, teacher-learning, cpd-evaluation]
pairs_with:
  prompts: [plan-staff-inset-session, write-lesson-observation-feedback]
  personas: [instructional-coach, school-curriculum-lead]
args:
  - name: school_priorities
    description: The school's or trust's improvement priorities, what evidence shows (observations, pupil work, assessment data, staff and pupil surveys), what CPD has been tried before, the time available (training days, weekly meeting slots) and who leads.
    type: text
    required: true
  - name: staff
    description: Number of teaching staff in the programme.
    type: number
    default: 30
steps:
  - {id: needs, file: steps/01-needs-and-priorities.md, stage: discover, gate: approve, artifact: "cpd/01-needs.md"}
  - {id: sequence, file: steps/02-session-sequence.md, stage: design, gate: approve, artifact: "cpd/02-sequence.md"}
  - {id: coaching, file: steps/03-coaching-and-practice.md, stage: design, gate: approve, artifact: "cpd/03-coaching.md"}
  - {id: calendar, file: steps/04-calendar-and-roles.md, stage: plan, gate: approve, artifact: "cpd/04-calendar.md"}
  - {id: evaluation, file: steps/05-evaluate-change.md, stage: review, gate: none, artifact: "cpd/05-evaluation.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Designs a year of professional development for about {{staff}} teachers that changes what happens in classrooms, not only what staff have heard. It follows what the evidence on effective teacher development suggests: few priorities sustained over time, building knowledge, motivating with purpose, developing specific techniques through modelling, rehearsal and feedback, and embedding them through coaching, prompts and follow-up. Each step writes one artifact and stops for the CPD lead's approval.

<school_priorities>
{{school_priorities}}
</school_priorities>

Rules for every step:
- Use only the school's evidence and decisions. Ask for missing essentials (time available, leads, previous CPD, staff mix) and mark gaps as [X].
- Keep the number of priorities small; say what is being left out to make room.
- Coaching and drop-ins are developmental, separate from appraisal or capability processes.
- Respect workload: every activity names the time it takes and what it replaces.
- Do not invent research findings, effect sizes or school data; name the general evidence and mark statistics to source.
- End each artifact with open questions.
