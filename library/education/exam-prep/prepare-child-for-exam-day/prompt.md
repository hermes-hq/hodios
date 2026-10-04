---
schema: 1
id: prepare-child-for-exam-day
kind: prompt
title: Prepare a child for exam day
description: Builds a parent's exam-week run sheet from the timetable, with a countdown, each morning's timings and journey, a bag list per paper, what to do if late or ill, and between-paper routines.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text]
output: [checklist, plan, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [exam-week, exam-timetable, morning-routine, exam-logistics, special-consideration]
pairs_with:
  prompts: [support-child-exam-stress, plan-exam-day-strategy, prepare-eleven-plus]
args:
  - name: age
    description: The child's age or school year, such as "10" or "Year 11".
    type: string
    required: true
  - name: exam
    description: Which exam and its shape, such as "Year 6 national tests, four mornings", "11+ entrance test on a Saturday at an unfamiliar school", "first GCSE series, 24 papers over five weeks".
    type: string
    required: true
  - name: timetable
    description: Optional dates, start times, venue and equipment notes from the exam timetable or entry letter. Paste it to get a dated run sheet.
    type: text
  - name: child_notes
    description: Optional notes about the child and the household - worries, sleep, access arrangements, how they get to school, siblings to drop off, parents' work hours.
    type: text
output_contract:
  format: markdown
  sections: [Countdown, Exam-day run sheet, Bag by paper, If something goes wrong, Between and after papers, When to get help]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A parent is organising the practical side of a child's exams. Learning is mostly done by exam week; what goes wrong now is logistics: a wrong start time or venue, a missing calculator on the one calculator paper, an entry letter left at home, a late bus, a child who wakes up ill and a parent who does not know the centre must be told before the paper starts, or a tired child after three papers in two days with no plan for the evening. Younger children need the parent to hold the plan; teenagers need a plan they can run themselves, with the parent as back-up. Ongoing exam stress and revision at home are a different job; this run sheet stays practical and keeps emotional advice to a few lines.

Child's age or year: {{age}}
Exam: {{exam}}
</context>

<task>
{{#timetable}}
<timetable>
{{timetable}}
</timetable>
{{/timetable}}
{{#child_notes}}
<child_notes>
{{child_notes}}
</child_notes>
{{/child_notes}}

1. Read the timetable if given. List every paper with date, start time, venue and any equipment named. If no timetable was pasted, build the run sheet with [date] and [start time] placeholders and say where to get the official timetable (school exams officer, entry letter, test centre).
2. Countdown: from about a week before the first paper, the few actions for each day: confirm times and venue, practice journey to any unfamiliar venue at the same time of day, check entry letters, ID or candidate numbers, buy spare equipment, agree the morning plan with the child, set bedtimes back to normal, lay out the bag the night before.
3. Exam-day run sheet: work back from the start time: arrival time (aim to arrive with a buffer of at least 20-30 minutes, or what the centre asks), leave time with a margin for traffic or a late bus, breakfast, wake time. Fit around the household (other children, work) from the notes. Give a one-line goodbye for the door suited to the child's age (calm, about effort or the plan, never "are you nervous?").
4. Bag by paper: the usual items (black pens and spares, pencil, eraser, ruler, clear pencil case, clear water bottle) plus paper-specific items (calculator only for calculator papers, protractor and compass for maths, set texts only if the exam is open book). Mark anything rule-dependent "check the centre's list": calculator models, watches, phones, food.
5. If something goes wrong: child ill on the morning (contact the school or centre before the paper starts, ask about the missed-exam or special consideration process and the evidence it needs, which usually has a deadline); running late (phone the centre, keep going: many centres have a late-arrival rule, to check); forgotten equipment (what the centre may lend, to check); refusal or panic at the door (a short script, then hand over to school staff); a paper that went badly before the next one.
6. Between and after papers: a short decompress, food, a walk, a set stop time for evening review on multi-paper days, no paper-by-paper inquest; one open question afterwards ("What was the best bit?"); a treat or rest planned after the last paper whatever the result.
7. Tailor every section to the child notes; for a teenager, write the run sheet so they can run it and the parent checks.
</task>

<constraints>
- Do not state exam rules (allowed equipment, start times, late-arrival limits, ID, special consideration rules) as fact; mark them to check with the school or centre.
- Never invent dates or times; use the pasted timetable or placeholders.
- Keep it practical and short; parents read this on a busy evening. Under 600 words unless the timetable has many papers.
- If the notes describe panic attacks, not eating or sleeping for days, self-harm or talk of not wanting to be alive, put that first, before any logistics: take it seriously, talk with the child calmly today, contact the child's doctor and the school soon, and local emergency services or a crisis line in their country if the child is in immediate danger. Keep the run sheet to a few lines after that.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Countdown
`- [ ]` items grouped by day (Day -7 ... Day -1, or dates).
## Exam-day run sheet
Table: Paper | Date | Start | Arrive by | Leave home | Wake | Notes. One row per paper (with more than eight papers, one row per exam day listing its papers); placeholders if no timetable. Then the goodbye line.
## Bag by paper
Table: Item | Every paper / Which papers | Check with centre?
## If something goes wrong
Table: Situation | What to do first | Who to contact.
## Between and after papers
Three to five bullets.
## When to get help
Three or four bullets naming signs and who to contact (teacher, school pastoral lead, doctor), and a pointer to support for ongoing exam stress.
</output_format>
