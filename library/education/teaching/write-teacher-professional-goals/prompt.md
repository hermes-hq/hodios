---
schema: 1
id: write-teacher-professional-goals
kind: prompt
title: Write teacher professional growth goals
description: Writes a teacher's annual professional growth goals for appraisal from their context and evidence, each with a rationale, actions, success measures and the evidence to collect.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes, preferences]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [teacher-appraisal, professional-growth, smart-goals, evidence-portfolio]
pairs_with:
  prompts: [prepare-for-formal-observation, analyze-class-assessment-results]
  personas: [instructional-coach]
args:
  - name: context
    description: Your role, subject and grade, years of experience, feedback from past observations or appraisals, and student data or priorities you are aware of.
    type: text
    required: true
  - name: requirements
    description: Optional school or district requirements, e.g. "one student-learning goal and one professional-practice goal", "link to school improvement priority on reading", "use the teaching standards".
    type: text
  - name: interests
    description: Optional areas you want to grow in, e.g. "questioning", "using data", "supporting multilingual learners".
    type: text
output_contract:
  format: markdown
  sections: [Goal options, Goal plans, Evidence log, Mid-year check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Appraisal goals are most useful when they are about a specific teaching practice with a clear link to student learning, and least useful when they are vague ("improve differentiation"), activity-based ("attend three trainings"), or set on outcomes the teacher does not control. Strong goals name a practice (e.g. "use hinge questions and act on them in every lesson with Year 9"), a group of students, a baseline, and a realistic measure of change, with evidence collected along the way rather than assembled at the end. Two goals done well beat four done on paper. They should also match what the school requires, such as one student-learning goal and one practice goal.
</context>

<task>
Help me write my professional growth goals for this year.
<context>
{{context}}
</context>
{{#requirements}}
Requirements: {{requirements}}
{{/requirements}}
{{#interests}}
Interests: {{interests}}
{{/interests}}

1. Offer 3 or 4 goal options grounded in the context given (observation feedback, data, school priorities, interests), each in one sentence with why it fits. Recommend two, matching any required goal types.
2. For each recommended goal write:
   - the goal in a SMART form that names the practice, the students and the timeframe;
   - the baseline from the context (or what to collect if there is none);
   - 3 to 5 actions with timing (reading, observing a colleague, trying the practice, coaching, collecting student work);
   - success measures for practice (what an observer would see) and for student learning (a measure the teacher can reasonably influence);
   - support needed from the school.
3. Build an evidence log template: date, action, evidence type, what it shows.
4. Plan a mid-year check: questions to ask, and how to adjust the goal if the data shows it is not working.
</task>

<constraints>
- Use only the context given; do not invent observation feedback, data or school priorities. If the context is thin, say what baseline to collect.
- No goals measured on outcomes the teacher cannot reasonably influence (e.g. whole-school results).
- Match any required format or standards named; do not invent the school's appraisal rules.
- Keep the language professional and plain, ready to paste into an appraisal form.
</constraints>

<output_format>
## Goal options
Numbered options with reasons; the recommended two marked.
## Goal plans
One subsection per recommended goal: Goal · Baseline · Actions (table: Action | When) · Success measures · Support needed.
## Evidence log
A table template.
## Mid-year check
Questions and adjustment rules.
</output_format>
