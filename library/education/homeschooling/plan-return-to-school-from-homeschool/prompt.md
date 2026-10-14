---
schema: 1
id: plan-return-to-school-from-homeschool
kind: prompt
title: Plan a return to school after homeschooling
description: Plans a homeschooled child's move into school - records to gather, the conversation about year placement, closing likely gaps, preparing for school routines and friendships, and the first term.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, notes]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [school-entry, year-placement, transition, records-for-school, school-routines, first-term]
pairs_with:
  prompts: [build-homeschool-portfolio, write-homeschool-transcript, plan-homeschool-socialisation]
args:
  - name: child_profile
    description: Child's age, how long they have been homeschooled, levels in reading, writing and maths compared with their age, strengths and interests, any additional needs, and how they feel about going to school.
    type: text
    required: true
  - name: school_and_timing
    description: The school or type of school, the country or system, the intended start date, what the school has said so far about entry or placement, and why the family is choosing school now.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Records to gather, Placement conversation, Closing gaps, Getting ready for school life, First term]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families move children from home education into school. You know that academic gaps are usually smaller and easier to close than parents fear, and that the harder adjustments are often practical and social: getting up early, sitting through long lessons, handwriting speed, homework, timed tests, working to bells, changing for PE, navigating a large building, and joining friendship groups that formed years earlier. Schools vary in how they place a homeschooled child (by age, by assessment, or after a trial period), and admission rules and processes differ by country, region and school type, so the family needs to ask rather than assume. A short portfolio of recent work and a clear summary of what was covered helps teachers pitch work from day one.

Child: {{child_profile}}
School and timing: {{school_and_timing}}
</context>

<task>
1. Records to gather: a summary of what was studied by subject, recent dated work samples, reading list, any outside course or exam results, and any assessments or reports on additional needs. Keep it short enough for a busy teacher.
2. Placement conversation: questions to ask the school (how they place, whether they assess, whether there is a trial period, how they support new joiners mid-year, special educational needs support, uniform and equipment), and how the parent can present the child's strengths and gaps honestly. If the parent is considering asking for a different year group, list the pros and cons without assuming the school will agree.
3. Closing gaps: from the profile, the likely gaps for this school system (for example handwriting speed, specific curriculum topics, test technique) and a light plan for the weeks before the start, without cramming.
4. Getting ready for school life: a step-by-step shift of sleep and morning routine, practice with a timed task and homework-style tasks, visiting the school or route, what to say to classmates about having been homeschooled, and ways to start friendships (clubs, a buddy, inviting a classmate over).
5. First term: what to watch in the first weeks (tiredness, mood, friendships, work level), when and how to talk to the teacher, and signs that need more support.
</task>

<constraints>
- Do not state admissions or placement rules for any country or school; frame them as questions for the school or local authority.
- Do not diagnose; if additional needs are described, suggest sharing reports and asking about support.
- Keep the tone positive about both homeschooling and school; do not imply the family failed.
- Keep preparation light; the aim is a calm start, not catching up on everything beforehand.
</constraints>

<output_format>
## Records to gather
A checklist.
## Placement conversation
Questions for the school, then talking points.
## Closing gaps
## Getting ready for school life
A table: Weeks before start | What to do.
## First term
</output_format>
