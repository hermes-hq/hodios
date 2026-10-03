---
schema: 1
id: review-course-for-udl
kind: prompt
title: Review a course for Universal Design for Learning
description: Reviews a course or lesson against the Universal Design for Learning guidelines and proposes concrete options for engagement, representation, and action and expression, keeping the goals firm.
category: course-design
version: 1.0.0
status: incubating
stage: [review]
role: [teacher, consultant]
requires: [none]
inputs: [document, notes]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [udl, inclusive-teaching, learner-variability, barriers, multiple-means]
pairs_with:
  prompts: [differentiate-lesson, convert-course-to-online, write-lesson-plan]
  personas: [special-education-advisor, instructional-designer]
args:
  - name: course_or_lesson
    description: The course outline, lesson plan or unit to review - goals, materials, activities and assessments.
    type: text
    required: true
  - name: learners
    description: Optional description of the learners and known variability, e.g. "Grade 8, 4 multilingual learners, 2 students with ADHD, one with low vision".
    type: text
output_contract:
  format: markdown
  sections: [Firm goals, Barriers found, Options by principle, Quick wins, Bigger changes, What to keep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Universal Design for Learning (UDL), developed by CAST, starts from the idea that learner variability is the norm, so barriers are in the design, not in the learner. It asks designers to keep goals firm and make the means flexible, across three principles: multiple means of engagement (the why of learning: interest, effort and self-regulation), representation (the what: how information is perceived and understood) and action and expression (the how: how learners act on and show what they know). The current version of the guidelines (3.0) also emphasises learner identity, belonging and reducing bias. UDL is not learning styles and not a separate plan for "those students"; it is about proactive options that help many learners, and it complements, rather than replaces, legal accessibility requirements and individual accommodations.
</context>

<task>
Review this course or lesson through a UDL lens.

<course_or_lesson>
{{course_or_lesson}}
</course_or_lesson>

{{#learners}}
<learners>
{{learners}}
</learners>
{{/learners}}

1. **Firm goals:** restate the learning goals and separate what must stay fixed (the skill or knowledge being assessed) from what can flex (the medium, the tools, the format of the product). If a goal unnecessarily bundles a means with the goal (for example "write an essay explaining" when the goal is the explanation, not essay writing), point it out.
2. **Barriers found:** go through the materials, activities and assessments and list specific barriers: a single text-only source, timed tasks that test speed rather than the goal, only one way to respond, unclear instructions, no choice or relevance, no scaffolds for executive function, inaccessible formats, content where learners do not see themselves. For each, say which learners it affects.
3. **Options by principle:** for each of engagement, representation, and action and expression, propose 3 to 5 concrete options tied to this course (not generic advice), each naming the barrier it removes and the effort to implement (low, medium, high).
4. **Quick wins:** the 3 to 5 lowest-effort, highest-impact changes to make this week.
5. **Bigger changes:** redesigns worth planning for next time (for example, an assessment with choice of product judged by the same rubric).
6. **What to keep:** what the design already does well from a UDL point of view.
7. Where a specific learner described may need an individual accommodation that UDL options do not cover (assistive technology, an access arrangement), note it briefly and refer to the school's or institution's support process.
</task>

<constraints>
- Do not frame options as matching "learning styles"; frame them as reducing barriers and offering choice for everyone.
- Keep the review specific to the supplied material; quote or reference the part of the design each point is about.
- Do not quote checkpoint numbers or guideline wording from memory as exact; describe the principle in plain words.
- Options must keep the assessment valid: flexibility in means must not lower the standard of the goal.
- If the material is too thin to review (only a topic title), ask for the plan, materials and assessment.
</constraints>

<output_format>
## Firm goals
Table: Goal | What stays firm | What can flex.
## Barriers found
Table: Where in the design | Barrier | Learners affected.
## Options by principle
### Engagement, ### Representation, ### Action and expression, each a table: Option | Barrier removed | Effort.
## Quick wins
Numbered.
## Bigger changes
Bullets.
## What to keep
Bullets.
</output_format>
