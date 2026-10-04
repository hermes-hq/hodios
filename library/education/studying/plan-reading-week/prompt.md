---
schema: 1
id: plan-reading-week
kind: prompt
title: Plan a reading week
description: Plans a university reading week day by day with reading catch-up, assignment milestones, a revision block and real rest, plus an honest list of what will not get done. Use before the break starts.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [reading-week, time-blocking, deadlines, workload-triage, university]
pairs_with:
  prompts: [plan-semester-workload, create-study-plan, read-textbook-actively]
args:
  - name: courses_and_deadlines
    description: Each module or course with what is outstanding - unread chapters or papers, assignments with due dates and word counts, tests coming up after the break. Rough notes are fine.
    type: text
    required: true
  - name: commitments
    description: Optional fixed commitments during the week - shifts, travel home, caring, sport, social plans - with days and times.
    type: text
  - name: days
    description: Number of days in the reading week, counting weekends you will use.
    type: number
    default: 7
  - name: focus_hours
    description: Realistic hours of focused study per full day. Five or six is a strong day for most students.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [The week at a glance, Priorities, Day by day, Not this week, Daily shape, End-of-week check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A reading week (or mid-term break) is usually lost in one of three ways: the first two days drift because nothing is due tomorrow, the student tries to catch up on every unread item and finishes none properly, or it becomes either all work or all rest, so they return exhausted or further behind. A good plan triages before it schedules: work due soonest after the break and worth the most marks comes first, reading is cut to what the next assessments and seminars need, and rest is planned as deliberately as study. It also says out loud what will not be done, so the student stops carrying it.

The student has {{days}} days and about {{focus_hours}} focused hours on a full day.
</context>

<task>
<courses_and_deadlines>
{{courses_and_deadlines}}
</courses_and_deadlines>
{{#commitments}}
<commitments>
{{commitments}}
</commitments>
{{/commitments}}

1. List every outstanding item and estimate its time. Use rules of thumb and say so: careful academic reading 15-25 pages an hour, a 2,000-word essay 15-25 hours from start to finished draft, a problem sheet 3-5 hours. Ask the student to correct these.
2. Total the hours available: {{days}} days x {{focus_hours}} hours, minus the commitments, minus at least one full rest day (or two half days). Compare with the work estimate and show the gap.
3. Rank items by deadline after the break, then mark weight, then whether later work depends on it. Assignments due within two weeks of the break outrank reading.
4. Triage reading: keep what feeds the next assignment or seminar, skim what only gives background (introduction, conclusion, headings), and drop the rest for now.
5. For each assignment set a milestone this week, not "work on essay": question unpacked and reading list by day 2, outline by day 3, 1,000 words by day 5.
6. Place work: hardest thinking in the student's best hours, reading and admin in lower-energy slots, a short revision block (retrieval practice, not rereading) for any test after the break, and a light last day for planning the week back.
7. Write what is not getting done this week, and when it will be.
</task>

<constraints>
- Use only the courses, deadlines and commitments given. If no deadlines or outstanding work are listed, ask for them and stop.
- Never schedule more than {{focus_hours}} focused hours on a full day, and never zero rest. If the work does not fit, say so plainly and cut; do not quietly overload days.
- Keep the time estimates labelled as estimates.
- If the student says they are badly behind, unwell or struggling to cope, suggest talking to their personal tutor or student support about extensions or extenuating circumstances before squeezing harder.
- Non-judgemental tone about how they got here.
</constraints>

<output_format>
## The week at a glance
Hours available, hours of work estimated, the gap, in three lines.

## Priorities
Table: Item | Due | Weight | Estimated hours | This week's milestone.

## Day by day
Table: Day | Morning | Afternoon | Evening | Milestone done by end of day. Commitments and rest shown in the table.

## Not this week
Bullets: item, why it waits, when it will happen.

## Daily shape
A short routine: start time, focus blocks of 50-90 minutes with breaks, a stop time, a 10-minute plan for tomorrow.

## End-of-week check
Three yes or no questions to check the week worked, and what to carry into the next week.
</output_format>
