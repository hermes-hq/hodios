---
schema: 1
id: design-mastery-tracker
kind: prompt
title: Design a mastery tracker
description: Designs a standards or skills mastery tracker for a class, with columns, a scoring scale, rules for what counts as evidence and a weekly routine for updating it and acting on it.
category: teaching
version: 1.0.0
status: incubating
stage: [design]
role: [teacher]
requires: [none]
inputs: [topic, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [mastery-tracking, standards-based-grading, assessment-data, progress-monitoring]
pairs_with:
  prompts: [analyze-class-assessment-results, design-formative-assessment, plan-intervention-group]
args:
  - name: skills
    description: The standards or skills to track this unit or term, as a list.
    type: text
    required: true
  - name: grade_level
    description: Grade, age or course.
    type: string
    required: true
  - name: class_size
    description: Number of students.
    type: number
    required: true
  - name: tool
    description: Where it will live, e.g. "Google Sheets", "Excel", "paper clipboard", "school gradebook with standards".
    type: string
    default: a spreadsheet
  - name: grading_rules
    description: Optional school rules, e.g. "4-point standards scale", "most recent evidence counts", "no zeros".
    type: text
output_contract:
  format: markdown
  sections: [Tracker layout, Scale and evidence rules, Setup steps, Weekly routine, Acting on the data]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Mastery trackers fail for two reasons: they take too long to update, so the teacher stops after week two, or they collect data nobody acts on. The useful ones track a manageable number of skills (often 5 to 10 per unit), use a short scale with clear descriptors, have explicit evidence rules (which assessments count, whether the most recent or the best evidence wins, how many pieces show mastery), make gaps visible at a glance with conditional colour, and are tied to a weekly routine that turns gaps into regrouping or reteaching. Averaging early attempts with later mastery punishes learning, which is why many standards-based systems use the most recent consistent evidence.
</context>

<task>
Design a mastery tracker for **{{grade_level}}**, {{class_size}} students, in {{tool}}.
<skills>
{{skills}}
</skills>
{{#grading_rules}}
School rules: {{grading_rules}}
{{/grading_rules}}

1. If there are more than about 10 skills, suggest which to track in detail and which to group, and say why.
2. Lay out the tracker: rows, columns (student, each skill with short code and full wording in a key, evidence date or source, overall), and a class summary row showing how many students are at each level per skill.
3. Define the scale (e.g. 1 to 4, or not yet / developing / secure / extending) with a one-line descriptor per level per skill type, and evidence rules: what counts, how many pieces show secure, whether the most recent or best evidence wins, how retakes are recorded. Follow the school rules if given.
4. Give setup steps for {{tool}}: data validation for the scale, conditional formatting colours, the summary formulas written out (for spreadsheets), or a printable layout (for paper).
5. Design a weekly routine of 15 minutes or less: when to enter evidence, what to look at, and the decisions to make (which skills to reteach to the class, which small groups to pull, who to stretch).
6. Explain how to share progress with students (self-tracking sheet) and families without publishing comparisons between students.
</task>

<constraints>
- Keep the update routine short enough to sustain weekly; if the design needs more time, simplify it.
- Spreadsheet formulas must be correct for the named tool; if unsure of a function's exact syntax, say so.
- Student data is personal: recommend storing the tracker in the school's approved system and not sharing class-wide views with students or families.
- Do not invent the school's grading policy; label suggested rules as suggestions.
</constraints>

<output_format>
## Tracker layout
A sample table with columns and three example rows, plus the summary row.
## Scale and evidence rules
Scale with descriptors; evidence rules.
## Setup steps
Numbered, with formulas.
## Weekly routine
A short checklist with times.
## Acting on the data
Decisions, student self-tracking and family sharing.
</output_format>
