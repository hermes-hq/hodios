---
schema: 1
id: welcome-newly-arrived-student
kind: prompt
title: Welcome a newly arrived student
description: Plans the first six weeks for a newly arrived student with little of the school language, covering buddies, survival vocabulary, prior learning, family contact and inclusion in lessons.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [new-arrivals, multilingual-learners, induction, buddy-system, refugee-students, inclusion]
pairs_with:
  prompts: [create-language-supports-for-ell, write-parent-email, differentiate-lesson]
args:
  - name: home_language
    description: The student's home language or languages, e.g. "Dari", "Ukrainian and Russian", "Brazilian Portuguese".
    type: string
    required: true
  - name: age
    description: The student's age in years.
    type: number
    required: true
  - name: prior_schooling
    description: Optional. What is known about previous schooling, e.g. "attended school in Kharkiv until last spring, strong in maths", or "interrupted schooling for two years". Leave empty if unknown.
    type: text
  - name: school_language
    description: The language of instruction at the new school.
    type: string
    default: English
output_contract:
  format: markdown
  sections: [Before day one, Day one, Buddy system, Survival vocabulary, Finding out what they know, Working with the family, Inclusion in lessons, Six-week timeline, Wellbeing and safeguarding, Checking progress]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student who arrives mid-year with little or no {{school_language}} faces a new language, new routines and often a hard journey all at once. The first weeks decide whether they feel they belong. What helps is well researched: a warm, planned welcome; a trained buddy; survival language first; finding out what they already know in their strongest language instead of assuming a learning difficulty; family contact through qualified interpreters; and being included in real lessons with support from the first day rather than parked with worksheets.

Student: age {{age}}, home language {{home_language}}, school language {{school_language}}.
</context>

<task>
{{#prior_schooling}}
<prior_schooling>
{{prior_schooling}}
</prior_schooling>
{{/prior_schooling}}

Plan the first six weeks for this student:

1. **Before day one:** an induction meeting with the family and an interpreter (what to ask: name and how to pronounce it, languages spoken and read, schooling history, health and dietary needs, religious practices that affect school, interests, who to contact and how), a staff briefing, a visual timetable and a picture tour of the school, and labels in both languages for key places.
2. **Day one:** a timed outline of the first day, keeping it calm and predictable: a named adult to meet them, a tour, where to go at breaks and lunch, toilets, how to ask for help (a help card), and an early finish to the day if appropriate.
3. **Buddy system:** how to choose and brief two buddies (one sharing the home language if possible, one not), what buddies do and do not do, and how to rotate so friendships widen.
4. **Survival vocabulary:** about 30 high-priority words and phrases for the first fortnight in {{school_language}}, grouped (greetings and needs, classroom instructions, school places, feelings, help), with a column for {{home_language}} and a note that translations must be checked by a fluent speaker before use, and an idea for picture cards.
5. **Finding out what they know:** how to assess prior learning gently in the first two weeks: maths through mostly non-verbal tasks, literacy in {{home_language}} if they read it, subject knowledge through pictures and translated questions, and their {{school_language}} level with a simple scale. Stress that low {{school_language}} is not a special educational need; only explore additional needs if difficulties show up in the home language too, and over time.
6. **Working with the family:** qualified interpreters for meetings and key messages (never the student or a sibling for anything sensitive), translated or visual information about the school day, uniform, meals, trips and how to contact school, and a check-in call after the first week.
7. **Inclusion in lessons:** for core subjects at this age, practical supports: seating near a buddy, visuals, key vocabulary in advance, bilingual dictionaries or translation tools for single words, tasks with the same content but lower language demand, sentence frames, and letting them write in {{home_language}} at first. Name which lessons are easiest to include them in fully from day one.
8. **Six-week timeline:** a week-by-week table of goals and actions for the student, the class teacher and support staff.
9. **Wellbeing and safeguarding:** signs a student may be struggling (withdrawal, distress, tiredness, hunger), the possibility of trauma for refugee or asylum-seeking students without asking about their journey, a trusted adult and a quiet space, and the rule that any safeguarding concern goes to the designated safeguarding lead under school procedures.
10. **Checking progress:** what to review at the end of week six, and who to involve.
</task>

<constraints>
{{#prior_schooling}}
- Use what is known about prior schooling to set expectations and avoid re-teaching what the student already knows.
{{/prior_schooling}}
- Do not ask the student or family about traumatic experiences or immigration status. Follow school policy on what information is collected.
- Translations you produce are drafts. Mark them clearly for checking by a fluent speaker; do not use machine translation alone for medical, safeguarding or legal communications.
- Pitch the plan to age {{age}}: younger children need more play, pictures and routine; teenagers need dignity, privacy and subject-level challenge.
- Use the student's name as the family pronounces it; do not anglicise it unless the student chooses to.
- Do not stereotype by nationality or culture; individual families differ.
- Before finishing, check that the student is in real lessons from week one, and that family communication uses interpreters, not children.
</constraints>

<output_format>
## Before day one
Bullets, including the induction meeting questions.
## Day one
Table: Time | What happens | Who.
## Buddy system
Bullets.
## Survival vocabulary
Table: {{school_language}} | {{home_language}} (to be checked) | Picture idea, grouped by theme.
## Finding out what they know
Bullets by area.
## Working with the family
Bullets.
## Inclusion in lessons
Table: Subject | How to include | Support needed.
## Six-week timeline
Table: Week | Student goals | Teacher actions | Support staff actions.
## Wellbeing and safeguarding
Bullets.
## Checking progress
Bullets.
</output_format>
