---
schema: 1
id: write-internship-report
kind: prompt
title: Write an internship report
description: Helps a student write an internship or placement report to the school's required structure, covering tasks, skills, reflection and evidence, from their own notes.
category: business-writing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [student]
requires: [none]
inputs: [notes, text, document]
output: [outline, article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [internship-report, placement-report, work-placement, reflective-writing, academic-assessment]
pairs_with:
  prompts: [prepare-for-work-placement, write-internship-report-france, build-internship-final-presentation]
args:
  - name: placement_notes
    description: Your notes on the placement, such as the organisation and your team, tasks and projects, tools used, problems solved, feedback received, what you found hard, and examples.
    type: text
    required: true
  - name: requirements
    description: Your school's guidelines, including required sections, word count, assessment criteria, reflective model if any, and the deadline.
    type: text
    required: true
  - name: mode
    description: Whether you want a detailed plan to write from, or a full first draft to edit into your own words.
    type: enum
    enum: [plan, draft]
    default: plan
output_contract:
  format: markdown
  sections: [Report, Evidence to add, Before you submit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Internship and placement reports are graded on reflection and evidence, not on how impressive the company is. Tutors repeatedly mark down the same things: long company descriptions copied from the website, task lists with no explanation of what the student learned, claimed skills with no example, reflection that is purely positive, and ignoring the assessment criteria or required structure. Strong reports link specific tasks to skills and to course learning, use a reflective structure (what happened, what I thought, what I learned, what I will do differently), include evidence such as outputs and feedback, and respect confidentiality agreements with the host organisation. Many schools have rules on AI use, so the report must stay in the student's own voice and the student must check the school's policy.
</context>

<task>
Produce a {{mode}} for an internship report.

<requirements>
{{requirements}}
</requirements>

<placement_notes>
{{placement_notes}}
</placement_notes>

1. If the notes do not describe what the student did, ask up to three short questions and stop.
2. Follow the required sections and word count exactly. If none are given, use: introduction and objectives, the organisation (short), role and tasks, skills and learning, reflection, conclusion and recommendations, appendices.
3. Map each assessment criterion to the section and the evidence from the notes that will address it.
4. Organisation section: keep it to what is needed to understand the role, from the notes only; mark facts to check `[CHECK: …]`.
5. Tasks and learning: for each main task, what it was, how the student did it, the result, and the skill or course concept it relates to, with one concrete example.
6. Reflection: use the school's reflective model if named; otherwise a simple what, so what, now what. Include at least one difficulty or mistake and what the student learned from it.
7. For a plan: give each section's purpose, word budget, the points to make and the evidence to use. For a draft: write in the first person, plain and specific, at the stated length, leaving `[ADD: …]` where the student must supply detail only they know.
8. List evidence the student should add and anything that might breach confidentiality (client names, internal figures).
</task>

<constraints>
- Use only the student's notes. Never invent tasks, results, feedback, skills or company facts.
- Write in a student's register, not corporate marketing language; avoid inflated claims ("I revolutionised").
- Remind the student once to check the school's rules on AI assistance and to rewrite the draft in their own words.
- Keep word counts within 10 percent of the requirement.
</constraints>

<output_format>
## Report
For plan: a section-by-section plan with word budgets and criteria mapping. For draft: the full draft with headings.
## Evidence to add
Appendices and examples to collect, and any `[ADD: …]` or `[CHECK: …]`.
## Before you submit
Checks: criteria covered, word count, confidentiality, referencing style, AI-use policy.
</output_format>
