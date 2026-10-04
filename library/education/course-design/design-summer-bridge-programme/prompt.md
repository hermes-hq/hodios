---
schema: 1
id: design-summer-bridge-programme
kind: prompt
title: Design a summer bridge programme
description: Designs a summer bridge programme for students entering college or university that closes skill gaps and builds belonging, with a diagnostic, academic skills, refreshers and mentoring.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [teacher, manager]
subject: [education-sector]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [summer-bridge, widening-participation, transition, first-generation-students, belonging, peer-mentoring]
pairs_with:
  prompts: [design-course-outline, plan-course-pilot, evaluate-training-effectiveness]
args:
  - name: target_students
    description: Who it is for and why (e.g. first-generation university entrants, vocational-route entrants, international students, mature students, school leavers starting a college course), with known gaps, numbers, budget, residential or not, and any entry conditions.
    type: text
    required: true
  - name: weeks
    description: Length of the programme in weeks.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Goals and measures, Diagnostic, Programme schedule, Academic strand, Belonging strand, Mentoring and handover, Access and logistics, Evaluation]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Bridge programmes work when they do two jobs at once: build the specific academic habits and knowledge the next stage assumes (independent study, academic reading and writing, maths for the subject, using feedback), and make students feel they belong, know people, and know where to go for help. They fail when they feel remedial or labelled ("the catch-up group"), when content repeats school instead of previewing the new way of learning, when students who need it most cannot attend because of jobs, caring or cost, and when the support ends on the last day with no handover.

This entry is for students moving into further or higher education (age 16 and over). For younger pupils moving between schools, say that a school transition plan suits them better and adapt only if the user confirms.

Length: {{weeks}} weeks.
</context>

<task>
<target_students>
{{target_students}}
</target_students>

1. **Goals and measures:** three to five goals (for example confidence with academic writing, a peer network of at least three people, knowing how to use the support services), each with a measure taken at the start and end and at first-term follow-up.
2. **Diagnostic:** a short, low-stakes diagnostic in the first days (subject skills such as maths or reading, study habits, confidence) that sorts students into routes without labelling them, and how results are shared with each student.
3. **Programme schedule:** a week-by-week table for {{weeks}} weeks, and a typical day, balancing academic sessions, social and campus activities, and free time.
4. **Academic strand:** sessions that preview the real next stage: a taste lecture or class with a real tutor, note-making, academic reading, a short assignment with feedback and a resubmission, subject refreshers by diagnostic route, and study skills (time planning, using feedback, asking for help).
5. **Belonging strand:** small consistent groups, current-student mentors, campus or site navigation, meeting staff, how to use the library, wellbeing, careers and money services, and an activity where students bring their own experience as an asset.
6. **Mentoring and handover:** mentor recruitment and training, a contact plan into the first term, and what information passes to tutors (with the student's consent).
7. **Access and logistics:** removing barriers - stipend or lost-earnings support, travel, food, childcare or caring, accessibility, timing for working students, and an online option - each marked with the cost to check against the budget.
8. **Evaluation:** the measures above plus attendance, first-term continuation and early assessment results compared with a sensible comparison group, with limits stated.
</task>

<constraints>
- Frame the programme as a head start, not remediation; avoid deficit language in student-facing wording.
- Never make participation or diagnostic results a hidden condition of entry unless the user says it is, and then state it openly to students.
- Share data about students with tutors only with consent and the institution's data rules.
- Do not invent costs, bursary amounts, entry rules or outcome statistics; mark them [X] or [check].
- If the target students or the gaps they face are not described, ask and stop.
- If the target group is under 16 (for example primary-to-secondary movers), say this design assumes older students, suggest a school transition plan instead, and ask whether to continue.
- Signpost wellbeing and support services and say that any student in crisis is referred to the institution's support team or local emergency services.
</constraints>

<output_format>
## Goals and measures
Table: Goal | Measure | When measured.
## Diagnostic
Bullets.
## Programme schedule
Table: Week | Academic focus | Belonging focus | Key event. Then a typical day.
## Academic strand
Bullets.
## Belonging strand
Bullets.
## Mentoring and handover
Bullets.
## Access and logistics
Table: Barrier | Support | Cost to check.
## Evaluation
Bullets.
</output_format>
