---
schema: 1
id: prepare-for-university-start
kind: prompt
title: Prepare for starting university
description: Plans the move into first-year university, covering academic skills, routines, money basics, independence, where to get help and a first-week checklist, shaped by the student's worries.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [first-year, transition, independent-study, freshers, student-life]
pairs_with:
  prompts: [plan-semester-workload, convert-lecture-notes-to-cornell]
  personas: [study-coach]
args:
  - name: course
    description: Optional course and university type, for example "Computer Science at a large campus university", "Nursing", "Fine Art".
    type: string
  - name: living_situation
    description: Optional living situation, for example "halls with a shared kitchen", "private flat with two strangers", "living at home and commuting an hour".
    type: text
  - name: worries
    description: Optional worries in the student's words, for example "making friends", "running out of money", "keeping up with the maths".
    type: text
output_contract:
  format: markdown
  sections: [Your worries first, How university study is different, Routines, Money basics, Living independently, Where to get help, First-week checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The first weeks of university change several things at once: far fewer hours of teaching and far more independent study, nobody checking whether reading is done, a new place, money to manage, and often living away from home for the first time. Students who struggle are rarely the least able; they are the ones who did not build a routine early, did not know how university study works, or did not ask for help until problems piled up. Practical, specific preparation and knowing where help is make the biggest difference.
</context>

<task>
Prepare a student for their first year{{#course}} on {{course}}{{/course}}.
{{#living_situation}}Living situation: {{living_situation}}{{/living_situation}}
{{#worries}}
<worries>
{{worries}}
</worries>
{{/worries}}

1. If worries are given, address each one first with two or three concrete actions, not reassurance alone.
2. Explain how university study differs from school: independent study hours (commonly two or more hours per hour of teaching), reading lists and how to triage them, what lectures, seminars, tutorials and labs are each for, note-taking that is reviewed within a day, referencing and academic integrity, and using office hours and personal tutors. Tailor this to the course where you can (labs and problem sets for sciences, reading and seminars for humanities, placements for vocational courses, studio time for art and design).
3. Propose a weekly routine: fixed study blocks, sleep, meals, exercise, social time and one admin slot for laundry, shopping and money.
4. Cover money basics: when student funding or loan payments usually arrive and how to spread them, a simple weekly budget with the usual categories (rent, food, transport, course costs, social), cheap food habits, and where to go before money becomes a crisis (the university's money advice or hardship funds). Keep it to general budgeting; do not recommend financial products.
5. Cover living independently, adapted to the living situation: cooking a few cheap meals, laundry, shared-space agreements with flatmates, personal safety, and for commuters, how to use time on campus and join things despite not living there.
6. List where to get help and when to go to each: personal or academic tutor, the student support or wellbeing service, the disability or accessibility service, academic skills or library support, the students' union, and registering with a local doctor or health service. Say that names vary by university and to check the student handbook.
7. Write a first-week checklist.
</task>

<constraints>
- Do not invent university-specific details (service names, funding dates, fees). Describe what is typical and say what to check.
- Keep the tone practical and warm; do not catastrophise or promise that everything will be fine.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Your worries first
One subsection per worry, with actions. Omit the section if no worries were given.
## How university study is different
## Routines
A sample week as a table: Day | Morning | Afternoon | Evening.
## Money basics
A simple weekly budget table with categories and blanks to fill in, then 3 to 5 tips.
## Living independently
## Where to get help
A table: Service | Go here when | How to find it.
## First-week checklist
Checkboxes, including enrolment and registration, finding the timetable and learning platform, registering with a doctor, joining at least one society or group, and a first look at each module's reading list and assessment dates.
</output_format>
