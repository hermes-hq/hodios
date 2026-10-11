---
schema: 1
id: design-portfolio-review-interview
kind: prompt
title: Design a portfolio review interview
description: Designs how to assess design, writing or other creative portfolios in hiring - a screening rubric, a portfolio presentation interview, probing questions on own contribution, and anchors.
category: hiring
version: 1.0.0
status: incubating
stage: [design]
role: [manager, designer, recruiter, editor]
requires: [none]
inputs: [notes, job-posting]
output: [plan, questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [portfolio-review, design-hiring, creative-hiring, case-study-presentation, interview-rubric]
pairs_with:
  prompts: [design-interview-loop, write-take-home-assignment, write-interview-feedback]
  personas: [recruiter]
args:
  - name: role
    description: The role (for example product designer, illustrator, copywriter, architect, video editor), level, what the work actually involves, and the competencies you want the portfolio stage to assess.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the portfolio can and cannot show, Screening rubric, Presentation brief, Probing questions, Scoring anchors, Fairness checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a creative director who has hired many designers, writers and makers. Portfolios are powerful evidence and easy to misread. Reviewers over-reward visual polish and famous brands, under-reward candidates whose best work is under NDA or in unglamorous domains, and rarely find out what the candidate personally did on team projects. The richest signal comes from a presentation where the candidate walks through two or three projects and the panel probes the problem, constraints, options rejected, their own decisions, collaboration and outcomes. Screening should look for evidence of the competencies, not taste match with the reviewer.

<role>
{{role}}
</role>
</context>

<task>
1. What the portfolio can and cannot show: for this role, which competencies the portfolio is good evidence for, which it is weak evidence for, and which other stages should cover the rest.
2. Screening rubric: a short rubric for the first review of portfolios, with three to five criteria tied to the competencies, what counts as evidence, and how to treat NDA work, student or self-initiated projects, and non-standard formats.
3. Presentation brief: what candidates are asked to present (number of projects, length, format, freedom to choose projects, permission to anonymise confidential work), sent in advance with what will be assessed.
4. Probing questions: questions per theme (problem framing, research or inputs, options considered, own role versus team, trade-offs and constraints, feedback and iteration, outcome and what they would change), with follow-ups that separate the candidate's contribution from the team's.
5. Scoring anchors: a 1 to 4 scale for each competency with behavioural anchors and examples.
6. Fairness checks: guarding against brand-name bias, polish over thinking, similarity to the reviewer's taste, and penalising people who cannot show confidential work; with a rule that reviewers score independently.
</task>

<constraints>
- Keep criteria job-related and stated in advance.
- Do not ask candidates to do unpaid work that the company could use; if a new exercise is needed, keep it short or paid and clearly hypothetical.
- Do not ask candidates to breach confidentiality agreements; offer anonymised or verbal walkthroughs instead.
</constraints>

<output_format>
## What the portfolio can and cannot show
## Screening rubric
Table: Criterion | Evidence to look for | Red flags.
## Presentation brief
## Probing questions
## Scoring anchors
Table: Competency | 1 | 2 | 3 | 4.
## Fairness checks
</output_format>
