---
schema: 1
id: calculate-gpa-and-target
kind: prompt
title: Calculate GPA and a target GPA
description: Calculates a student's current GPA from courses, credits and grades on their own scale, and shows what grades next term would reach a target GPA, with honest feasibility.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [gpa, credit-hours, grade-calculation, target-grade, transcript]
pairs_with:
  prompts: [calculate-grade-needed-on-final, plan-courses-to-graduation, plan-scholarship-applications]
args:
  - name: courses
    description: Every course counted so far with its credits and final grade, and any repeated, pass/fail, withdrawn or transfer courses marked as such. Group by term if you can.
    type: text
    required: true
  - name: scale
    description: Your institution's grade-point scale, for example "4.0 scale, A=4.0, A-=3.7, B+=3.3" or a 5-point or 10-point scale. If you do not know it, say so.
    type: string
    required: true
  - name: target_gpa
    description: Optional GPA you are aiming for and by when, for example "3.5 cumulative by graduation" or "3.0 to keep my scholarship after next term".
    type: string
  - name: future_credits
    description: Optional credits you will take next term and in total until the target date.
    type: string
output_contract:
  format: markdown
  sections: [Scale and rules used, Current GPA, Target maths, Scenarios, Feasibility, What to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
GPA is a credit-weighted average, so a 4-credit C pulls harder than a 1-credit A, and the more credits already on the transcript, the less any single term can move it. Students routinely miscalculate by averaging letter grades without credits, counting pass/fail or withdrawn courses, double-counting a repeated course when the institution replaces the earlier grade (or replacing it when the institution averages both), or including transfer credits that do not carry grades. Scales also differ: 4.0 with or without plus and minus, 4.3 with A+, 5-point and 10-point scales. The useful answer shows the maths, the target grade average needed in the remaining credits, and an honest view of whether that is achievable.
</context>

<task>
Calculate the GPA on this scale: {{scale}}

<courses>
{{courses}}
</courses>
{{#target_gpa}}
Target: {{target_gpa}}
{{/target_gpa}}
{{#future_credits}}
Future credits: {{future_credits}}
{{/future_credits}}

1. State the scale and the counting rules used: which courses count, how repeats are treated, and that pass/fail, withdrawn and ungraded transfer credits are excluded unless the student says otherwise. Mark each as an assumption to confirm.
2. Compute quality points per course (grade points times credits), the total quality points, the total GPA credits and the GPA, in a table. Give term GPAs as well if terms were given.
3. If a target and future credits are given, solve for the GPA needed in the future credits: needed = (target × (current credits + future credits) - current quality points) / future credits. Show it.
4. Translate the needed GPA into realistic grade combinations for next term's courses (for example "three A and one B+ in four 3-credit courses").
5. Give scenarios: next term at the student's recent average, one step better, and all A grades, with the resulting cumulative GPA.
6. Judge feasibility honestly: if the target needs more than the maximum grade, say so and say when it could become reachable (after how many more credits) or what alternatives exist (a repeat-and-replace policy, if the institution has one, to confirm).
7. List what to confirm with the registrar or adviser.
</task>

<constraints>
- Do not invent the institution's scale or repeat policy; if the student does not know the scale, show the common 4.0 scale as a labelled assumption.
- Show every calculation; round the final GPA to two decimals only at the end.
- Do not convert between national grading systems as if exact; if asked, say conversions are institution-specific.
- The official transcript and the registrar are the authority.
</constraints>

<output_format>
## Scale and rules used
## Current GPA
A table: Course | Credits | Grade | Points | Quality points. Then totals.
## Target maths
## Scenarios
A table: Next term | Term GPA | Cumulative GPA.
## Feasibility
## What to confirm
</output_format>
