---
schema: 1
id: fit-study-around-shift-work
kind: prompt
title: Fit study around shift work
description: Builds a study rhythm for a learner on rotating or irregular shifts, matching tasks to energy by shift type, planning back from deadlines, with a minimum-viable week for bad weeks.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student, individual]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [shift-work, part-time-study, working-learners, energy-management]
pairs_with:
  prompts: [plan-semester-workload, review-study-week, create-study-plan]
  personas: [study-coach, mature-student-mentor]
args:
  - name: rota
    description: Your shift pattern or the next few weeks of the rota, e.g. "4 on 4 off, 7am-7pm days then nights" or a list of dated shifts. Include commute times and breaks if known.
    type: text
    required: true
  - name: course_and_deadlines
    description: What you are studying, how it is delivered (online, day release, evening classes) and upcoming deadlines or exams with dates.
    type: text
    required: true
  - name: hours_per_week
    description: Realistic study hours per week on an average week.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Your rota at a glance, Study by shift type, Week-by-week plan, Deadlines, Minimum viable week, Worth asking for]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Study plans usually assume free evenings at the same time every day. Rotating, night and long-day shifts break that: energy swings by shift type, the first day after nights is often lost, and one swapped shift wrecks a fixed timetable. A plan that works ties tasks to shift types rather than to weekdays, puts demanding tasks on rested days, uses short breaks for quick recall, protects sleep, and has a fallback for weeks when everything goes wrong.

Target: about {{hours_per_week}} hours a week on an average week.
</context>

<task>
<rota>
{{rota}}
</rota>

<course_and_deadlines>
{{course_and_deadlines}}
</course_and_deadlines>

1. Classify the days in the rota: early shift, late shift, night shift, long day, first day off after nights (recovery), other days off. Note the commute and any break long enough for 5 to 15 minutes of study.
2. Sort the study tasks into three types:
   - Deep (45 to 90 minutes, rested): new reading, writing assignments, hard problem sets.
   - Medium (20 to 40 minutes): practice questions, making notes, reviewing feedback.
   - Micro (5 to 15 minutes, any state): flashcards, a self-quiz, listening to a recording, planning the next session.
3. Match task types to day types. Rules of thumb: deep work on days off (not the first day after nights) and before a late shift; medium after an early shift once rested; micro only on long days and nights, during breaks or the commute if travelling as a passenger; nothing on the first day after nights except optional micro.
4. Fit about {{hours_per_week}} hours into a repeating template for each shift type. If the rota is dated, map it onto the actual weeks up to the next deadline; if it rotates, give a template per rotation cycle.
5. Plan back from each deadline: a draft or main revision block at least one rota cycle before the due date, landing on days off.
6. Write a minimum-viable week for bad weeks (overtime, illness, family): about a quarter of the normal time, made of micro and one medium session, so the habit and momentum survive.
7. List what is worth asking an employer or course provider for (study leave, shift swaps before deadlines, extensions process, recorded lectures), noting rules vary by employer and country.
</task>

<constraints>
- Never schedule study in place of the sleep window after a night shift, and do not suggest stimulants or cutting sleep to fit more in.
- Do not exceed the stated hours; if the deadlines cannot be met in that time, say so plainly and show the shortfall in hours, with options (more time on specific days off, an extension request, reducing scope).
- Use only the dates and shifts given. If the rota has no pattern at all ("it changes"), ask for the last two or three weeks of shifts or the typical mix of shift types and stop. If only a deadline date or today's date is missing or ambiguous ("due the 14th"), build the plan anyway with weeks labelled Week 1, Week 2 and so on, mark the gap as [X], and ask for it in one line at the end.
- Do not invent rights to study leave; say "ask your employer or check your contract".
</constraints>

<output_format>
## Your rota at a glance
Table: Day type | How often per cycle | Energy (high, medium, low) | Best study slot.

## Study by shift type
Table: Day type | Task type | Length | Example task from this course.

## Week-by-week plan
Table: Week or date | Shifts | Study sessions (task and length) | Hours. Up to the next deadline or 4 weeks.

## Deadlines
Bullets: each deadline, the back-planned milestones and the day off they land on.

## Minimum viable week
3 to 5 bullets.

## Worth asking for
Bullets.
</output_format>
