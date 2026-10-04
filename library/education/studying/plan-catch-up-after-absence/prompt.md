---
schema: 1
id: plan-catch-up-after-absence
kind: prompt
title: Plan catching up after absence
description: Triages what a student missed during illness or absence into must-learn, skim and skip, with a paced catch-up schedule, who to ask for notes and a message to teachers about deadlines.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student, parent]
requires: [none]
inputs: [text, notes]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [missed-lessons, catch-up-plan, extensions, return-to-school]
pairs_with:
  prompts: [create-study-plan, plan-semester-workload]
args:
  - name: missed_content
    description: What was covered while you were away, per subject or module (topics, lessons, lectures, labs, homework, tests), as far as you know it. A course outline or class page list is fine.
    type: text
    required: true
  - name: weeks_missed
    description: Number of weeks missed.
    type: number
    default: 2
  - name: deadlines
    description: Optional. Upcoming tests, coursework or assignment deadlines, and anything you already missed (tests, submissions).
    type: text
  - name: level
    description: School or college/university, which changes who to contact and how extensions work.
    type: enum
    enum: [school, university]
    default: school
output_contract:
  format: markdown
  sections: [Triage, Catch-up schedule, Who to ask, Message to teachers, Deadlines and extensions, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student is back, or about to be back, after {{weeks_missed}} weeks away through illness or another absence ({{level}} level). The usual mistake is trying to redo everything while keeping up with new lessons, which leads to exhaustion and falling further behind. Experienced teachers triage: learn properly what upcoming work and assessments depend on, skim what will be revisited or is low weight, and let go of activities that cannot be recreated. They agree deadlines early instead of hoping to catch up, and they pace the catch-up, especially after illness.
</context>

<task>
<missed_content>
{{missed_content}}
</missed_content>
{{#deadlines}}
<deadlines>
{{deadlines}}
</deadlines>
{{/deadlines}}

1. Sort every missed item into:
   - Must-learn: prerequisites for what comes next, content in an upcoming test or assignment, core skills.
   - Skim: topics revisited later, background, lower-weight content (read notes or slides, do a few questions).
   - Skip or swap: practical activities, discussions or one-off tasks that cannot be recreated; ask the teacher what to do instead (a write-up, a demonstration video, data from classmates).
2. Order must-learn items by what is needed soonest.
3. Build a paced schedule: about 30-45 minutes a day extra at school level, 1-1.5 hours at university, on top of current work, for two to four weeks, with at least one lighter day a week. After illness, start lighter for the first days and follow any return-to-school or return-to-study advice from a doctor.
4. Who to ask: subject teachers or lecturers for what is essential and alternatives, a classmate for notes, the class or course page for slides and recordings, a form tutor, year head or personal tutor to coordinate across subjects.
5. Draft one short message to teachers or lecturers: dates away, what the student has already done, what they plan to do, a request to confirm must-learn content, and a request about any deadline or missed test.
6. Deadlines: list each and the realistic option (meet it, ask for an extension, ask for an alternative). At university level, mention the formal extension or extenuating-circumstances process and its time limits, to check in the handbook.
</task>

<constraints>
- Use only the content and deadlines given. If the missed content is unknown for a subject, say to ask the teacher and do not invent topics.
- Do not give medical advice or judge whether the student is well enough; defer to the student's doctor for return pacing.
- Do not state institution rules on extensions as fact; say where to check.
- If the absence relates to mental health, bullying, bereavement or something unsafe, be gentle, suggest involving a trusted teacher, pastoral or student support team, and keep the plan light. If the student mentions self-harm or being in danger, stop and point to local emergency services or a crisis line in their country.
- Keep the weekly extra load within the limits in step 3 and check the sums.
</constraints>

<output_format>
## Triage
Table: Subject | Item | Must-learn, skim or skip | Why | How (resource and minutes).

## Catch-up schedule
Table: Week | Day | Item | Minutes. Lighter days marked.

## Who to ask
Bullets: person, what to ask them for.

## Message to teachers
The message, under 150 words, with [placeholders] for unknown details.

## Deadlines and extensions
Table: Deadline | Date | Option | Who to contact.

## Questions
What to confirm.
</output_format>
