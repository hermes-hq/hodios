---
schema: 1
id: recover-from-failed-midterm
kind: prompt
title: Recover from a failed midterm
description: Builds a recovery plan after a bad midterm, with a calm diagnosis, the grade still reachable, an instructor conversation and changed study methods for the rest of term.
category: studying
version: 1.0.0
status: incubating
stage: [review, plan]
role: [student]
requires: [none]
inputs: [text, document]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [midterm, grade-recovery, office-hours, study-methods, exam-review]
pairs_with:
  prompts: [analyze-exam-mistakes, calculate-grade-needed-on-final, prepare-office-hours-questions, decide-whether-to-drop-course]
  personas: [study-coach]
args:
  - name: result
    description: The midterm score, its weight, the class average if known, and what went wrong in your view - topics, question types, timing, nerves, how you prepared and for how long.
    type: text
    required: true
  - name: course_info
    description: The rest of the course - remaining assessments with weights and dates, any grade replacement or drop rule, and your target grade.
    type: text
    required: true
  - name: weekly_hours
    description: Optional hours a week you can realistically give this course for the rest of term.
    type: number
output_contract:
  format: markdown
  sections: [First 48 hours, What went wrong, What is still possible, Talking to the instructor, Changed study plan, Checkpoints]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A bad midterm feels final but usually is not: most courses put more weight on the work still to come, and many have rules (a final that replaces the midterm, a dropped lowest score) that students never read. The students who recover do three things quickly: they go through the marked paper to find out whether the problem was knowledge, application, exam technique or time; they see the instructor or teaching assistant within a week or two with specific questions; and they change how they study, usually from rereading and highlighting to practice problems and self-testing under timed conditions. Students who do not recover tend to either avoid the course for weeks or simply study more of the same way.
</context>

<task>
Build a recovery plan.

<result>
{{result}}
</result>

<course_info>
{{course_info}}
</course_info>
{{#weekly_hours}}
Hours available per week: {{weekly_hours}}
{{/weekly_hours}}

1. First 48 hours: a short, calm list - get the marked paper or feedback, note the exact score and weight, check the syllabus for replacement or drop rules, book office hours. Keep it practical.
2. Diagnose what went wrong from the student's account, sorting causes into: did not know the content, knew it but could not apply it, exam technique (misread questions, poor time use, left blanks), and preparation method (rereading instead of practice, cramming). Say which questions to look at on the marked paper to confirm. If the student mentions illness, a crisis or anxiety that stopped them functioning, point them to the institution's support or extenuating circumstances process.
3. Work out what is still possible: the score needed on the remaining assessments for the target, for one grade lower, and to pass, showing the arithmetic, and the effect of any replacement rule.
4. Plan the instructor conversation: when to go, three or four specific questions (what full-mark answers did that mine did not, which topics to prioritise, whether any recovery options exist), and a short email to book it.
5. Build a changed study plan to the next assessment: weekly blocks within the available hours, practice problems and past questions instead of rereading, error log from the midterm, spaced review of weak topics, and one timed practice before the next test.
6. Set checkpoints: what should be true after two weeks and before the next assessment, the warning sign, and the action, including the drop or withdraw deadline as a decision point if the target is at risk.
</task>

<constraints>
- Do not invent grading rules, deadlines or weights; mark assumptions.
- Be honest if the target is no longer reachable, and give the best reachable outcome and options (a lower target, the drop deadline) without catastrophising.
- Do not suggest asking the instructor to change the midterm mark without a real marking error; point to a regrade request only for clear marking mistakes.
- Keep the tone steady and practical; no lectures about past effort.
- If the student describes hopelessness, being unable to cope, or any thought of self-harm, put that first: encourage them to contact a crisis line, a doctor, campus counselling or local emergency services if they are unsafe, before any grade planning.
</constraints>

<output_format>
## First 48 hours
## What went wrong
A table: Cause | Evidence | How to confirm on the paper.
## What is still possible
## Talking to the instructor
Questions, then the booking email.
## Changed study plan
A table: Week | Focus | Method | Hours.
## Checkpoints
A table: When | Should be true | Warning sign | Action.
</output_format>
