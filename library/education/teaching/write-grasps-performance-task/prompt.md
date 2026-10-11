---
schema: 1
id: write-grasps-performance-task
kind: prompt
title: Write a GRASPS performance task
description: Writes an authentic performance assessment using GRASPS (goal, role, audience, situation, product, standards) with a student brief, checkpoints and a rubric outline tied to the outcomes.
category: teaching
version: 1.0.0
status: incubating
stage: [design]
role: [teacher]
requires: [none]
inputs: [topic, preferences]
output: [plan, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [performance-task, authentic-assessment, grasps, summative-assessment]
pairs_with:
  prompts: [design-unit-plan, create-rubric, design-pbl-project]
args:
  - name: outcomes
    description: The learning outcomes or standards the task must assess.
    type: text
    required: true
  - name: grade_level
    description: Grade, age or course.
    type: string
    required: true
  - name: time_available
    description: Time for the task, e.g. "3 lessons plus homework", "one 90-minute block".
    type: string
    required: true
  - name: constraints
    description: Optional limits, e.g. "individual work only", "no devices", "must produce a written component".
    type: text
output_contract:
  format: markdown
  sections: [GRASPS design, Student brief, Checkpoints and timeline, Rubric outline, Validity check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A performance task asks students to use what they learned in a realistic situation, which shows transfer better than a test. The GRASPS frame (Goal, Role, Audience, Situation, Product or performance, Standards for success) from Understanding by Design keeps it authentic. The common failure is a task that is engaging but does not actually require the outcomes: students make a beautiful poster that shows design skill rather than understanding of the science. Every element of the scenario should force use of the target knowledge, the product must make that knowledge visible, and the rubric must score the outcomes rather than neatness, length or effort.
</context>

<task>
Design a performance task for **{{grade_level}}** assessing these outcomes:
<outcomes>
{{outcomes}}
</outcomes>
Time: {{time_available}}.
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. Write each GRASPS element in one or two sentences, making the situation realistic and the product something a real person in that role would produce.
2. Map each outcome to the part of the product where it becomes visible.
3. Write the student brief in student language: the scenario, the task, what to submit, the deadline and checkpoints, and the success criteria.
4. Plan checkpoints across {{time_available}} (planning, draft, feedback, final) with what the teacher checks at each, plus a fair approach to group work if used (individual accountability).
5. Outline a rubric with one row per outcome and 3 or 4 performance levels with brief descriptors; keep presentation to at most one row.
6. Run a validity check: could a student succeed without the outcomes? Is anything rewarded that is not an outcome? Is the task accessible to students without home resources? Fix any issue found.
</task>

<constraints>
- Every rubric row must trace to an outcome; no rows for effort, neatness or length unless they are outcomes.
- The scenario must not require costs, travel or technology students may not have, unless provided in class.
- Use realistic but fictional organisations and people in the scenario; no real companies or individuals.
- Fit the time available.
</constraints>

<output_format>
## GRASPS design
Goal · Role · Audience · Situation · Product · Standards, then the outcome-to-product map.
## Student brief
Ready to hand out.
## Checkpoints and timeline
A table: Checkpoint | When | Students submit | Teacher checks.
## Rubric outline
A table: Criterion (outcome) | levels.
## Validity check
Findings and fixes.
</output_format>
