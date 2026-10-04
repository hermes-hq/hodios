---
schema: 1
id: plan-staff-inset-session
kind: prompt
title: Plan a staff training day session
description: Plans one school staff training day (INSET or PD day) session on a single teaching priority, with a short evidence summary, modelling, rehearsal, a classroom commitment and a follow-up check.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [teacher, manager]
subject: [education-sector]
requires: [none]
inputs: [text, notes]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [inset, professional-development, deliberate-practice, instructional-coaching, school-leadership]
pairs_with:
  prompts: [write-lesson-observation-feedback]
  personas: [instructional-coach]
  workflows: [teacher-cpd-programme-track]
args:
  - name: focus
    description: The one teaching priority for the session, e.g. "cold calling with wait time", "checking for understanding with mini-whiteboards", "modelling extended writing".
    type: string
    required: true
  - name: minutes
    description: Length of the session in minutes.
    type: number
    default: 90
  - name: staff_context
    description: Optional. Phase and size of staff, what was done on this before, what observations show, departments, any support staff attending, and the room set-up.
    type: text
output_contract:
  format: markdown
  sections: [Session goal, Run of show, Evidence summary, Model and observation sheet, Rehearsal protocol, Subject examples, Commitment card and follow-up]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most training-day sessions change nothing in classrooms: a slide deck about research, a few nods, no practice, and no one checks a fortnight later. What changes practice is narrow and concrete: one technique, seen modelled well, broken into steps, rehearsed with colleagues under realistic conditions, committed to in a named lesson, and followed up. Staff are busy professionals; they want to know why it matters, see it work in their subject, and leave with something usable on Monday.

Focus: {{focus}}. Session length: {{minutes}} minutes.
</context>

<task>
{{#staff_context}}
<staff_context>
{{staff_context}}
</staff_context>
{{/staff_context}}

1. **Sharpen the focus:** restate {{focus}} as one observable technique with 3-5 steps a teacher actually does. If it is a broad theme ("feedback", "behaviour"), narrow it to one technique and say what was left for later sessions.
2. **Why it matters:** a five-minute evidence summary in plain language: the problem it solves in classrooms here, the core idea, and what the research does and does not claim. Name the general body of evidence (for example retrieval practice, formative assessment) without inventing citations or effect sizes; mark any statistic for the leader to source.
3. **Model:** a live or video model of the technique done well, then a deliberately weak version, with what staff watch for (a short observation sheet).
4. **Deconstruct:** the steps, common errors, and how it looks in different subjects and phases.
5. **Plan and rehearse:** staff in departments or pairs plan where it fits in a real lesson next week, then rehearse in rounds (teacher, pupils, observer), with one piece of feedback each round and a re-do. This is the largest block of time.
6. **Commit:** each teacher writes the lesson and moment they will use it, and what success will look like.
7. **Follow up:** what happens within two weeks (drop-ins focused only on this technique, a 10-minute department huddle to share, a short staff survey) and how leaders will see whether it stuck.
</task>

<constraints>
- At least half of {{minutes}} minutes goes to modelling, planning and rehearsal; input talk stays under 15 minutes in total.
- One technique only. Do not stack several priorities into one session.
- Make it subject-specific: provide examples for at least three contrasting subjects or phases from the context, or common ones if none were given.
- Rehearsal must be psychologically safe: low stakes, no public judging, colleagues choose to share.
- Follow-up drop-ins are developmental, not graded or linked to performance management.
- Never invent research findings, effect sizes or school data; mark gaps as [X].
- If {{focus}} is missing or vague and no context narrows it, propose two or three specific techniques and ask which to plan.
</constraints>

<output_format>
## Session goal
The technique in one sentence and its steps, numbered.
## Run of show
Table: Minutes | Segment | What the leader does | What staff do | Materials.
## Evidence summary
Five to eight bullets, ready to say aloud.
## Model and observation sheet
What the model shows and the watch-fors.
## Rehearsal protocol
Rounds, roles, timings, feedback prompts.
## Subject examples
Table: Subject or phase | What it looks like.
## Commitment card and follow-up
The card wording and a two-week follow-up checklist.
</output_format>
