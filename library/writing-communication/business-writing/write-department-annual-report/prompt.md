---
schema: 1
id: write-department-annual-report
kind: prompt
title: Write a department annual report
description: Writes a department's or team's year-in-review report with achievements against goals, key metrics, setbacks owned, lessons and next year's priorities, for leadership or the wider organisation.
category: business-writing
version: 1.0.0
status: incubating
stage: [review, build]
role: [manager, engineering-manager, operations-manager, executive]
requires: [none]
inputs: [dataset, notes, text, document]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [annual-review, year-in-review, team-report, goals-review, department-report]
pairs_with:
  prompts: [write-status-report, write-executive-summary, write-year-end-work-summary]
args:
  - name: year_material
    description: Last year's goals or plan, what was delivered, metrics with prior-year or target figures, setbacks, people changes, budget against actual, and notable feedback.
    type: text
    required: true
  - name: department_and_reader
    description: The department and who reads the report, for example "IT service desk, for the executive team" or "HR, for all staff".
    type: string
    required: true
  - name: next_year
    description: Priorities or plans for next year, if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Annual report, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A department's annual report shapes how leadership sees the team at budget and planning time. Readers want to know whether the department did what it said it would, what changed for the organisation as a result, and what it plans next. Weak reports list activity ("ran 14 projects"), cherry-pick metrics that went up, skip goals that were missed, and end with a wish list. Credible reports judge the year against the goals set at its start, show trends with comparisons, own setbacks with what was learned, credit people and other teams specifically, and link next year's priorities to what the year revealed and to the organisation's goals.
</context>

<task>
Write an annual report for: {{department_and_reader}}

<year_material>
{{year_material}}
</year_material>
{{#next_year}}
<next_year>
{{next_year}}
</next_year>
{{/next_year}}

1. If the material has no goals, results or metrics, ask in one short message and stop.
2. Year at a glance: four to six sentences on the department's purpose, the headline result against goals, the biggest achievement, the biggest setback, and next year's top priority.
3. Goals review: a table of each goal set for the year with status (achieved, partly, not achieved, dropped) and evidence. If no goals were set, say so and review against the department's main responsibilities.
4. Key metrics: current year against prior year or target, with a one-line explanation of each notable movement grounded in the material.
5. Highlights: three to five achievements, each with its effect on customers, colleagues or the business, not just the activity.
6. Setbacks and lessons: what did not go well, why if known, and what the department changed or will change.
7. People and partners: changes in the team and specific thanks to people or other teams named in the material.
8. Budget: spend against budget if given, with reasons for material variances.
9. Next year: priorities (from the input, or proposed from what the year showed and labelled "proposed"), each with a measurable goal, and what the department needs to deliver them.
</task>

<constraints>
- Use only the material. Never invent metrics, achievements, names or budget figures; mark gaps `[NEEDED: …]`.
- Report missed goals as plainly as achieved ones.
- Write for the stated reader: an executive version leads with outcomes and asks; an all-staff version explains terms and credits widely.
- Under about 1,500 words.
</constraints>

<output_format>
## Annual report
Year at a glance; Goals review (table: Goal · Status · Evidence); Key metrics (table: Metric · Last year · This year · Comment); Highlights; Setbacks and lessons; People and partners; Budget; Next year's priorities (table: Priority · Goal · What we need).
## Gaps to fill
Each `[NEEDED: …]`. "None" if none.
</output_format>
