---
schema: 1
id: plan-multi-age-homeschool-week
kind: prompt
title: Plan a multi-age homeschool week
description: Plans a homeschool week for several children of different ages with shared family lessons, individual teaching blocks and independent work, scheduled so one parent can manage it.
category: course-design
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [homeschool, multi-age, family-learning, weekly-schedule, independent-work, morning-time]
pairs_with:
  prompts: [plan-homeschool-year, differentiate-lesson, invent-learning-game]
args:
  - name: children
    description: Each child's age, level in the main subjects, anything that helps or gets in the way (reads independently, needs movement, has a diagnosis, a toddler sibling at home).
    type: text
    required: true
  - name: subjects
    description: The subjects to cover this week and any current topics or curricula, e.g. "maths (each child's own book), reading, writing, history - Ancient Egypt, science - plants, art".
    type: text
    required: true
  - name: days
    description: Number of school days this week.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Week at a glance, Daily rhythm, Shared lessons, Individual plans, Independent work, Parent load, If the week goes sideways]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teaching several children of different ages works when the parent stops trying to run separate classes in parallel. Experienced homeschoolers combine everything they can (history, science, art, read-alouds, nature study, music) into family lessons where each child works at their own level, and keep separate time only for skills that are strictly sequential, mainly maths and early literacy. Separate time is staggered: while the parent teaches one child, the others do independent work they can actually complete alone. Younger children need short lessons and something to do while others work; older children can take on more independence and sometimes help teach. A realistic plan has slack, because illness, appointments and bad days happen.
</context>

<task>
Plan {{days}} homeschool days for:

<children>
{{children}}
</children>

<subjects>
{{subjects}}
</subjects>

1. If the children's ages or levels are missing, ask for them and stop. Otherwise, if daily hours or the parent's other commitments are unknown, assume a morning-focused school day with the afternoon for reading, play and projects, and say so.
2. **Sort subjects:** decide which subjects are taught together (shared) and which are individual (sequential skills), with a one-line reason.
3. **Daily rhythm:** a timetable for each day showing, for every child, what they are doing in every block. The parent teaches only one group or one child at a time. When the parent is with one child, the others have independent work, a practical activity or free play suited to their age. Lesson lengths match age (roughly 10 to 15 minutes of focused instruction for 5 to 7-year-olds, 20 to 30 for 8 to 11, 30 to 45 for teens).
4. **Shared lessons:** for each shared subject this week, the topic and activities, with tiered tasks: what the youngest, middle and oldest child does or produces from the same lesson.
5. **Individual plans:** for each child, the maths and literacy work per day (using their own curriculum or level), and one thing to watch for.
6. **Independent work:** a list per child of tasks they can do without help (with how to check them later), suitable for the staggered blocks, and a "when I'm done" list.
7. **Parent load:** total minutes of direct teaching per day and per child, and where the parent can sit down, prepare or deal with the house.
8. **If the week goes sideways:** a minimum-viable day (what must happen if everything else falls apart) and a flex day or catch-up slot.
</task>

<constraints>
- Use the family's own curricula and topics where given; do not replace them or recommend products.
- Keep total structured time realistic for the ages; younger children should not have more seat time than older ones.
- No child is left with nothing meaningful to do while the parent teaches another; "wait quietly" is not a plan.
- Respect stated needs (diagnoses, movement breaks, a toddler) in the schedule. Do not offer medical or diagnostic advice.
- Check local homeschool requirements (records, hours, subjects) are the parent's responsibility; mention record-keeping only briefly.
</constraints>

<output_format>
## Week at a glance
Table: Day | Shared lesson | Special event or outing | Notes.
## Daily rhythm
Table for a typical day: Time | Child 1 | Child 2 | Child 3 | Parent is…. Note any day that differs.
## Shared lessons
A `###` per shared subject with the tiered tasks.
## Individual plans
A `###` per child with daily maths and literacy and one thing to watch.
## Independent work
Per child: task list, how to check, "when I'm done" list.
## Parent load
Minutes per day and per child, plus breathing spaces.
## If the week goes sideways
Minimum-viable day and catch-up plan.
</output_format>
