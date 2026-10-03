---
schema: 1
id: plan-gifted-enrichment
kind: prompt
title: Plan enrichment for an advanced learner
description: Plans enrichment and acceleration for an advanced learner in one subject, with pre-assessment and compacting, depth and complexity tasks, an independent project and how progress is shown.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, parent]
requires: [none]
inputs: [notes, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [gifted-and-talented, acceleration, curriculum-compacting, depth-and-complexity, independent-project, advanced-learners]
pairs_with:
  prompts: [differentiate-lesson, design-pbl-project, create-rubric]
  personas: [instructional-coach]
args:
  - name: student_profile
    description: What the student can already do in the subject (with evidence), interests, how they work, and anything relevant such as perfectionism, boredom, a learning difference or social needs.
    type: text
    required: true
  - name: subject
    description: The subject, e.g. "mathematics", "creative writing", "chemistry".
    type: string
    required: true
  - name: grade_level
    description: The student's current grade or year, e.g. "Grade 4", "Year 8".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Where the student is, Compacting plan, Enrichment tasks, Independent project, Acceleration options, Showing progress, Wellbeing and fit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Advanced learners are often given "more of the same": extra worksheets once they finish early, which teaches them that finishing fast is punished. Better practice starts by pre-assessing to find out what the student already knows, compacting the regular curriculum to skip what is mastered, and using the freed time for work with more depth (more detail, rules, patterns, evidence), complexity (connections across time, disciplines and perspectives) and authentic challenge, or for acceleration in the subject when the student is ready for content well beyond their grade. Advanced students still need to learn how to struggle, revise and fail safely; many are perfectionists, and their social and emotional development may not match their academic level.
</context>

<task>
Plan enrichment in **{{subject}}** for a **{{grade_level}}** student.

<student_profile>
{{student_profile}}
</student_profile>

1. If the profile gives no evidence of current attainment (only "very bright"), ask for it or propose a pre-assessment first and keep the rest of the plan provisional.
2. **Where the student is:** summarise the evidence, the likely next level of challenge, and any gaps (advanced students can have holes in fundamentals). Propose a short pre-assessment for the next unit if needed.
3. **Compacting plan:** for the next unit or term, which regular content the student can skip (with the evidence that shows mastery), which parts they still do, and how the freed time is used. Include a simple agreement the student and teacher sign (what they will work on, how they check in, expectations).
4. **Enrichment tasks:** 4 to 6 tasks tied to the regular curriculum topics that add depth or complexity, not volume: open problems with multiple solutions, real data or primary sources, connections across subjects, taking an expert's perspective, creating rather than consuming. Each with the time needed and the product.
5. **Independent project:** one longer project (4 to 8 weeks) built on the student's interests, with a driving question, milestones, a mentor or expert if possible, and a real audience for the outcome.
6. **Acceleration options:** whether subject acceleration, working with an older class, a competition or an external programme might fit, with the evidence that would justify it and the questions to discuss with the family and school. Do not decide this; set out the considerations.
7. **Showing progress:** how growth is shown when grade-level tests are at ceiling: a portfolio, a rubric that extends beyond grade level, above-level assessments, reflections on process and revision.
8. **Wellbeing and fit:** how to build tolerance for difficulty and mistakes, avoid isolation from peers, and adapt if the student has a learning difference alongside high ability (twice-exceptional).
</task>

<constraints>
- No busywork: every task must be more challenging in kind, not just more of it.
- Keep the student connected to class learning and peers; enrichment should not mean always working alone.
- Do not label or diagnose; describe needs and behaviours. Refer concerns about learning differences or wellbeing to the school's specialist staff.
- Tasks must be manageable for one teacher with a full class; note the preparation each needs.
- Content must be accurate and age-appropriate even when advanced.
</constraints>

<output_format>
## Where the student is
Bullets, plus the pre-assessment if needed.
## Compacting plan
Table: Regular content | Skip / still do | Evidence | Replacement. Then the agreement.
## Enrichment tasks
Table: Task | Depth or complexity angle | Time | Product | Teacher prep.
## Independent project
Driving question, milestones, mentor, audience, assessment.
## Acceleration options
Considerations and questions for the family and school.
## Showing progress
Bullets.
## Wellbeing and fit
Bullets.
</output_format>
