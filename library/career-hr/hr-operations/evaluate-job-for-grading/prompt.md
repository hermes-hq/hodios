---
schema: 1
id: evaluate-job-for-grading
kind: prompt
title: Evaluate a job for grading
description: Evaluates one role against the organisation's grading framework on job content alone, scoring each factor with evidence and checking against benchmark roles to recommend a grade.
category: hr-operations
version: 1.0.0
status: incubating
stage: [review]
role: [operations-manager, manager, executive]
requires: [none]
inputs: [document, text]
output: [report, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [job-evaluation, job-grading, job-levelling, benchmark-roles, factor-scoring]
pairs_with:
  prompts: [design-salary-bands, build-career-ladder, analyze-pay-equity, write-job-description]
args:
  - name: role_description
    description: The job description or a factual account of the role's purpose, main responsibilities, decisions it makes, budget or people it manages, knowledge and qualifications needed, and who it reports to. Describe the job, not the person in it.
    type: text
    required: true
  - name: framework
    description: Your grading framework (grades with their definitions or factor levels) and two or three benchmark roles already graded, with their grades. If you have no framework, say so.
    type: text
    required: true
  - name: reason
    description: Why the role is being evaluated (new role, regrade request, restructure). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Information check, Factor assessment, Benchmark comparison, Recommended grade, Points to verify, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Job evaluation decides where a role sits in the grade structure, and therefore its pay range, so it must be about the job, not about the person doing it, how long they have been there, or what they are paid now. Analytical schemes compare roles on factors such as knowledge and expertise, problem solving and judgement, accountability and impact, scope of decisions, people and budget responsibility, communication and influence, and working conditions. Experts evaluate from the job's requirements as they are, not aspirations, use the organisation's own grade definitions, check the result against already-graded benchmark roles (a sense check catches scoring drift), watch for title inflation and for undervaluing work traditionally done by one group (care, coordination, emotional labour), and record the reasoning so a regrade appeal or equal-pay question can be answered.

<role_description>
{{role_description}}
</role_description>

<framework>
{{framework}}
</framework>
{{#reason}}Reason for evaluation: {{reason}}{{/reason}}
</context>

<task>
1. Information check: list what the description does not tell you that the grade depends on (decision authority, scope, reporting lines, required expertise). Strip anything about the jobholder's personal performance, tenure or current pay and say you set it aside. If there is no grading framework, explain that a grade cannot be assigned without one and offer a factor comparison against the benchmark roles only, clearly labelled.
2. Factor assessment: for each factor in the framework (or the standard factors above if the framework lists only grade definitions), the evidence from the role description, the level it best matches, and your confidence.
3. Benchmark comparison: compare the role with each benchmark role factor by factor: higher, same or lower, and why.
4. Recommended grade: the grade that best fits, the runner-up if it is borderline, and the deciding factors. Say what would move it up or down.
5. Points to verify with the manager or jobholder, and any risk that the role is being sized to fit a person or a pay outcome.
6. Questions for the grading panel.
</task>

<constraints>
- Grade the job, never the person. Do not use performance, tenure, current pay or the jobholder's characteristics.
- Use the organisation's own definitions. Do not invent grade definitions or market data.
- Flag where traditionally undervalued work (coordination, care, emotional demands) is described, so it is scored rather than ignored.
- This is a recommendation for a grading panel, not a final decision.
{{> output/uncertainty}}
</constraints>

<output_format>
## Information check
## Factor assessment
Table: Factor | Evidence | Level matched | Confidence.
## Benchmark comparison
Table: Factor | vs benchmark 1 | vs benchmark 2 | vs benchmark 3.
## Recommended grade
## Points to verify
## Questions
Numbered.
</output_format>
