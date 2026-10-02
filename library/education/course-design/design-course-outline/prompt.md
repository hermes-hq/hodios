---
schema: 1
id: design-course-outline
kind: prompt
title: Design a course outline
description: Designs a course with backward design, moving from outcomes to assessments to a sequenced, paced module plan with an alignment matrix. Use when building a new course or workshop series.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [teacher, consultant]
requires: [none]
inputs: [topic, preferences]
output: [outline, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [backward-design, syllabus, constructive-alignment]
pairs_with:
  prompts: [write-learning-objectives, create-rubric]
  workflows: [course-design-track]
args:
  - name: subject
    description: What the course teaches, e.g. "introductory data visualisation with Python".
    type: string
    required: true
  - name: audience
    description: Who it is for and what they already know, e.g. "second-year biology undergraduates, no coding experience".
    type: string
    required: true
  - name: length
    description: Duration and rhythm, e.g. "8 weeks", "12 weeks, two 90-minute sessions a week", "a 3-day workshop".
    type: string
    default: 8 weeks
output_contract:
  format: markdown
  sections: [Course summary, Outcomes, Assessment plan, Module plan, Alignment matrix, Assumptions and open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Courses designed topic-first end up as a list of things to cover, with assessments bolted on at the end that test whatever was easiest to test. Backward design reverses the order: decide what learners must be able to do at the end, decide what evidence would show it, and only then plan the learning that leads there. Every module should exist because an outcome needs it, and every outcome should be assessed.
</context>

<task>
Design a course on **{{subject}}** for **{{audience}}**, lasting **{{length}}**.

1. Outcomes: write 4 to 6 course-level outcomes. Each starts with an observable verb, describes what the learner can do after the course, and is achievable in {{length}} for this audience. Include at least one outcome at the apply level or above and, where it fits, one about transfer to the learner's own context.
2. Evidence: plan the assessments.
   - One or two summative assessments that require performing the outcomes, preferably an authentic task (a project, a case, a portfolio, a performance), not only a test.
   - Formative checks in every module, low-stakes, with feedback.
   - Weightings that reflect the importance of each outcome.
3. Learning plan: break the course into modules or weeks that fit {{length}}.
   - Order them by prerequisites: what must be understood before what. Front-load the foundations, and revisit key ideas later (spiral).
   - For each module: a title, the outcomes it serves, key concepts, learning activities, the formative check, and the estimated learner hours (in session and independent).
   - Leave slack: a catch-up or consolidation point about two-thirds through, and time to work on the summative task.
4. Alignment: build a matrix of outcomes × modules × assessments and fix any outcome that is not taught or not assessed.
</task>

<constraints>
- Keep the workload realistic for the audience. State the assumed weekly hours; if {{length}} does not give the session pattern, assume one and say so.
- Do not recommend specific textbooks, courses or URLs unless you are confident they exist; describe the resource type instead ("an introductory open textbook chapter on…").
- If the subject is too broad for {{length}} ("all of physics in 4 weeks"), narrow the scope, say what you cut, and why.
- Make no claims about accreditation or institutional requirements; flag them as things to check.
</constraints>

<output_format>
## Course summary
Three or four sentences: who, what, how long, assumed weekly hours, and the summative task.
## Outcomes
Numbered O1, O2…
## Assessment plan
A table: Assessment | Type (summative / formative) | Outcomes | Weight | When.
## Module plan
A table: Week or module | Title | Outcomes | Key concepts | Activities | Formative check | Hours.
## Alignment matrix
A table with outcomes as rows and modules and assessments as columns, marked with ✓.
## Assumptions and open questions
Bullets.
</output_format>
