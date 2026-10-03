---
schema: 1
id: plan-semester-workload
kind: prompt
title: Plan a semester workload
description: Plans a semester across all courses with a deadline map, workload peaks smoothed out, a weekly schedule and early-warning checkpoints. Use at the start of a term.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [semester-planning, deadlines, workload, backward-planning, early-warning]
pairs_with:
  prompts: [understand-assignment-brief, create-study-plan, plan-group-project]
  personas: [study-coach]
args:
  - name: courses_and_deadlines
    description: Each course with its credits or weight, weekly classes, and every assessment with its due date or week and its weight, pasted from the syllabi if possible. Include the semester start date.
    type: text
    required: true
  - name: other_commitments
    description: Optional fixed commitments with hours, such as a part-time job, sport, caring, commuting or religious observance.
    type: text
  - name: weeks
    description: Number of teaching weeks in the semester, including reading or exam weeks if deadlines fall in them.
    type: number
    default: 14
output_contract:
  format: markdown
  sections: [Assumptions, Deadline map, Peak weeks, Milestones, Weekly template, Checkpoints]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most semesters have a quiet start and two or three weeks where every course's deadlines land at once, usually around midterms and the last weeks. Students who plan course by course only see the crunch when they are in it. Seeing all the deadlines on one map shows the peaks early, so work on later assessments can start in the quiet weeks, and fixed checkpoints catch a course slipping before it is too late to recover.
</context>

<task>
Plan a {{weeks}}-week semester from these courses and deadlines.

<courses_and_deadlines>
{{courses_and_deadlines}}
</courses_and_deadlines>
{{#other_commitments}}
<other_commitments>
{{other_commitments}}
</other_commitments>
{{/other_commitments}}

1. List your assumptions: missing weights, estimated effort for each assessment, the independent-study rule of thumb used (commonly about 2 hours of independent study per hour of class, adjusted by credits), and anything to confirm. If a deadline has neither a date nor a week, ask for it rather than guessing.
2. Build the deadline map: every assessment by week, with its weight and an effort estimate in hours.
3. Find the peak weeks, where the estimated effort due is far above the average or several deadlines collide. For each peak, say which work to pull forward into which quieter weeks.
4. Break each assessment worth 15 percent or more into milestones planned back from its due date (research done, outline, draft, final check), with the week each must be done.
5. Build a weekly template: fixed commitments first, then study blocks per course in proportion to credits and current workload, with at least one buffer block and one full rest period. Show the total weekly hours and say plainly if they are unrealistic given the commitments.
6. Set early-warning checkpoints, about every 3 to 4 weeks: what should be true by then for each course, and the trigger and action if it is not (for example, more than a week behind on readings means cut to key readings and ask the lecturer which matter most; a milestone missed by more than 5 days means renegotiate the plan or ask about extensions early).
</task>

<constraints>
- Do not invent deadlines, weights or course rules; mark every estimate.
- If the total load is not achievable alongside the commitments, say so directly and give options (drop or defer a course, reduce work hours in peak weeks, ask about extensions early), rather than producing a schedule that cannot work.
- Keep sleep and rest in the plan; do not schedule study every evening and weekend.
- Use the semester start date to show real dates if given; otherwise use week numbers.
</constraints>

<output_format>
## Assumptions
## Deadline map
A table: Week | Course | Assessment | Weight | Effort (h). Peak weeks marked.
## Peak weeks
Each peak, why, and what moves earlier.
## Milestones
A table: Assessment | Milestone | Done by week.
## Weekly template
A table: Day | Fixed | Study blocks. Then weekly totals.
## Checkpoints
A table: Week | What should be true | Warning sign | Action.
</output_format>
