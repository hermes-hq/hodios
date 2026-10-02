---
schema: 1
id: write-course-syllabus
kind: prompt
title: Write a course syllabus
description: Writes a student-facing syllabus with description, outcomes, schedule, assessments and weights, policies and support resources. For instructors launching or revising a course.
category: course-design
version: 1.0.0
status: incubating
stage: [design, build]
role: [teacher]
requires: [none]
inputs: [notes, document, preferences]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [syllabus, course-policies, learner-centered, assessment-weights, ai-policy]
pairs_with:
  prompts: [design-course-outline, write-learning-objectives, create-rubric]
  workflows: [course-design-track]
args:
  - name: course
    description: Course name and code, level, credits, format (in person, online, hybrid), meeting times, instructor contact preferences, and your notes on content, outcomes and assessments.
    type: text
    required: true
  - name: schedule_constraints
    description: Optional term dates, holidays, exam period and any fixed dates, e.g. "15 weeks from 13 Jan; no class 17 Feb and spring break 10-14 Mar; final exam week 28 Apr".
    type: text
  - name: institution_policies
    description: Optional required syllabus statements or policies (academic integrity, accessibility, attendance, AI use, grading scale), pasted as they must appear.
    type: text
output_contract:
  format: markdown
  sections: [Welcome and course description, Learning outcomes, How the course works, Schedule, Assessments and grading, Course policies, Support and resources, Before you publish]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A syllabus is the first thing students read about a course and the document they return to all term. Learner-centred syllabi (welcoming tone, outcomes that say what students will be able to do, a clear schedule, transparent grading and policies explained with reasons) are read more and produce fewer disputes than rule lists. It is also a quasi-contract: dates, weights and policies must be accurate and consistent with the institution's rules.
</context>

<task>
Write a student-facing syllabus for this course.

<course>
{{course}}
</course>
{{#schedule_constraints}}
<schedule_constraints>
{{schedule_constraints}}
</schedule_constraints>
{{/schedule_constraints}}
{{#institution_policies}}
<institution_policies>
{{institution_policies}}
</institution_policies>
{{/institution_policies}}

1. **Welcome and course description:** a short welcome in the instructor's voice, what the course is about and why it matters, prerequisites, and how to contact the instructor and get a reply.
2. **Learning outcomes:** 4 to 7 outcomes, each starting "By the end of this course you will be able to" with one observable verb. Use the instructor's outcomes if given, improving the wording only.
3. **How the course works:** the weekly rhythm (what happens before, during and after class), expected hours per week, and required materials with cost-free options where they exist.
4. **Schedule:** week by week with dates if given, topic, preparation, and what is due. Respect every constraint{{#schedule_constraints}} listed above{{/schedule_constraints}}: no class or due date on a holiday, nothing due during a break, and spread major deadlines so they do not cluster.
5. **Assessments and grading:** each assessment with a short description, which outcomes it assesses, its weight and due date. Weights must add up to exactly 100 percent. Include the grading scale, and how and when feedback will be returned.
6. **Course policies:** late work, missed assessments, attendance and participation, academic integrity, use of AI tools (what is allowed, what must be disclosed), communication, and recording or materials sharing. State each with a brief reason. Insert required institutional statements verbatim.
7. **Support and resources:** accessibility and accommodations (how to request them, in a welcoming tone), tutoring or writing support, wellbeing and basic-needs support, and technical help, as placeholders for the institution's actual services.
8. **Before you publish:** a checklist of what the instructor must verify or fill in.
</task>

<constraints>
- Never invent institutional office names, URLs, phone numbers, policies or grading scales; use [placeholders] and list them in "Before you publish".
- Institutional policy text that was provided goes in verbatim; do not paraphrase required statements.
- Every assessment must map to at least one outcome, and every outcome must be assessed; flag any gap.
- If the notes conflict (for example, weights that do not add up, or a due date on a listed holiday), fix them only where the fix is obvious and flag every change.
- Plain, accessible language, second person ("you"), with headings and lists that work with screen readers.
- If essential information is missing (number of weeks, assessments), state the assumption you used.
</constraints>

<output_format>
Use the section headings from the output contract. Schedule as a table: Week | Dates | Topic | Prepare | Due. Assessments as a table: Assessment | Outcomes | Weight | Due, with a total row of 100%. "Before you publish" as a checklist.
</output_format>
