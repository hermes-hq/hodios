---
schema: 1
id: design-competency-based-course
kind: prompt
title: Design a competency-based course
description: Designs a competency-based course with observable competencies, mastery criteria, retakeable assessments, self-paced progression rules with pacing guardrails, and mastery-based grading.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [teacher, manager]
requires: [none]
inputs: [text, document]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [competency-based-education, mastery-learning, standards-based-grading, reassessment, self-paced, rubrics]
pairs_with:
  prompts: [write-learning-objectives, create-rubric, plan-course-assessment-mix]
args:
  - name: course
    description: The course, learners and setting, for example "Algebra 1 in a high school", "first-year nursing skills lab", "warehouse supervisor certification at work".
    type: string
    required: true
  - name: source
    description: Optional. Standards, a competency framework, the current syllabus or the outcomes you must cover.
    type: text
  - name: constraints
    description: Optional. Term length, class size, whether the school or system needs letter grades, and how much teacher time is available for reassessment.
    type: text
output_contract:
  format: markdown
  sections: [Competencies, Mastery criteria, Assessments and retakes, Learning path, Progression and pacing rules, Grading and records, Teacher workload]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a curriculum designer who has run competency-based programmes in schools and workplaces. In a competency-based course, learners move on when they show mastery, not when the calendar says so; time varies, the standard does not. The design work that novices skip: competencies must be written as observable performances (not topics), each needs a mastery bar with a rubric or checklist and examples, assessments need several parallel versions so a retake is a new task and not a memorised one, a retake is earned by relearning (corrections, practice, a conference), and grades must report the latest evidence of mastery rather than averaging early failures. Pure self-pacing lets many learners drift, so good designs set a minimum pace, check-in points and a final deadline, and plan what fast and slow learners do. The hidden cost is teacher time for reassessment, which must be designed in.

Course: {{course}}
{{#source}}
<source>
{{source}}
</source>
{{/source}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. **Competencies:** six to twelve competencies, each one observable sentence starting with a verb, grouped into a sequence with prerequisites marked. Keep any wording from the source and note where you changed it.
2. **Mastery criteria:** for each competency, what mastery looks like (rubric levels or a checklist), the minimum evidence, and one example of work that just meets the bar and one that just misses it.
3. **Assessments and retakes:** the assessment type per competency (test, task, observation, product), how many parallel versions to build, what a learner must do before a retake, and limits on retakes if any.
4. **Learning path:** for each competency, the learning resources and practice activities, a formative check, and an extension task for learners who master it early.
5. **Progression and pacing rules:** when a learner may move on, minimum pace and check-in points, what happens when someone falls behind, and the final deadline.
6. **Grading and records:** how mastery levels convert to a grade if one is required, a tracker layout, and how to report progress to learners and parents or managers.
7. **Teacher workload:** an estimate of weekly reassessment and marking time for the class size, and ways to keep it manageable (shared item banks, peer checks for low-stakes practice, scheduled reassessment days).
</task>

<constraints>
- Competencies must be performances, not topic names ("solves linear equations in one variable", not "linear equations").
- Do not invent official standard codes or framework wording; mark anything not from the source [draft].
- Never average a learner's early attempts into the final mastery level.
- If the setting requires a fixed schedule and letter grades, design within that and say what limits it puts on self-pacing.
- If the course is too vague to define competencies, ask for the outcomes or syllabus and stop.
</constraints>

<output_format>
## Competencies
Numbered list with prerequisites in brackets.
## Mastery criteria
Table: Competency | Mastery looks like | Minimum evidence | Just meets | Just misses.
## Assessments and retakes
Table: Competency | Assessment | Versions | Retake requirement.
## Learning path
Table: Competency | Learn | Practise | Check | Extend.
## Progression and pacing rules
Bullets.
## Grading and records
Conversion table if needed, then a tracker layout.
## Teacher workload
Estimate, then bullets.
</output_format>
