---
schema: 1
id: prepare-for-work-placement
kind: prompt
title: Prepare for a work placement
description: Prepares a student for a teaching, social work, engineering, business or other non-clinical placement with course-linked goals, first-week questions, a log template and supervision checks.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [work-placement, practicum, industrial-placement, teaching-practice, learning-goals]
pairs_with:
  prompts: [write-reflective-account, prepare-for-clinical-placement, log-apprenticeship-learning-hours]
  personas: [study-coach]
args:
  - name: placement_type
    description: The placement, course and setting, with its length, e.g. "PGCE primary, second placement in a Year 3 class, 10 weeks", "social work first placement in a youth offending team, 70 days", "engineering summer placement at a water company".
    type: string
    required: true
  - name: course_requirements
    description: Optional learning outcomes, competencies or proficiencies the placement must cover, the assessment documents involved, and any goals of your own.
    type: text
output_contract:
  format: markdown
  sections: [Learning goals, Before you start, First-week questions, Reflective log template, Supervision and assessment, If something goes wrong]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Placements are where teaching, social work, engineering, business, science and other students turn coursework into practice, and they are often assessed. Students lose value from them when they arrive without goals of their own, wait to be told what to do, leave the assessment paperwork until the last week, or are unclear who their supervisor is and what they may do unsupervised. A good start means a few specific goals tied to the course outcomes, questions ready for week one, a simple reflective log started on day one, and clarity on supervision, sign-off and what to do if something feels wrong.

Placement: {{placement_type}}.

Scope: this covers the non-clinical side of any placement. For a nursing, midwifery or allied health clinical placement, prepare only the general parts (goals, questions, log, supervision, concerns) and say that clinical skills and what the student may do with patients are set by their practice assessment document and practice assessor, not by this plan.
</context>

<task>
{{#course_requirements}}
<course_requirements>
{{course_requirements}}
</course_requirements>

{{/course_requirements}}
1. Write 3 to 5 learning goals, each specific, observable and achievable in the placement's length, and linked to a course outcome where given ("By week 4, plan and teach a 20-minute phonics session and get written feedback from my mentor; links to the teaching standard on planning, if that is in my list"). If outcomes are not given, base goals on typical expectations for this kind of placement and mark them [check against your placement handbook].
2. List what to sort out before day one: required checks, documents, uniform or dress, travel and shift times, contact details, reading the setting's key policies (confidentiality, safeguarding, health and safety), and the assessment paperwork.
3. Write first-week questions, grouped: about the setting (routines, who is who), about supervision (who signs off, how often we meet, how feedback is given), about scope (what I may do alone, under supervision, or not at all), and about assessment (which documents, deadlines, mid-point review).
4. Give a reflective log template for daily or weekly entries: what happened, what I did, what I learned, which goal or outcome it links to, what I will do next. Include a reminder to anonymise people.
5. Give a supervision and assessment checklist across the placement: week 1, mid-point, final weeks.
6. Explain what to do if something goes wrong: concerns about own competence, unsafe or poor practice seen, conflict with a supervisor, illness or absence, and who to contact (placement supervisor, university link tutor or placement office).
</task>

<constraints>
- Never encourage doing tasks beyond the student's competence or role; in school, social work, care and site settings, stress working within scope, safeguarding and health and safety policies, and never being left alone with responsibilities the setting has not authorised.
- Do not give clinical guidance on procedures, medicines or patient care.
- Do not invent the course's competencies, documents or deadlines; use what was given and mark the rest [check].
- Keep names and identifying details out of the log template examples.
- If the placement type is too vague (just "placement"), ask for the course, setting and length and stop. If the country matters for checks or documents (for example criminal record or background checks), name the assumption and say to confirm with the placement office.
</constraints>

<output_format>
## Learning goals
Numbered: goal, how I'll show it, linked outcome.

## Before you start
Checklist.

## First-week questions
Grouped bullets.

## Reflective log template
A fill-in template with the five prompts and an anonymisation reminder.

## Supervision and assessment
Table: When | What to do | Document or sign-off.

## If something goes wrong
Table: Situation | First step | Who to contact.
</output_format>
