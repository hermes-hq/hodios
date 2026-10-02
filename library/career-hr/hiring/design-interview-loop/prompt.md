---
schema: 1
id: design-interview-loop
kind: prompt
title: Design an interview loop
description: Designs a structured interview loop with competencies assigned to stages, questions and work samples, anchored scorecards and calibration notes for the debrief. Use when setting up hiring for a role.
category: hiring
version: 1.0.0
status: incubating
stage: [design]
role: [manager, recruiter, engineering-manager, founder]
requires: [none]
inputs: [spec, job-posting]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [structured-interview, scorecard, work-sample, calibration]
pairs_with:
  prompts: [write-job-description, run-mock-interview]
args:
  - name: role
    description: The role and level you are hiring for, and any constraints on the process (number of interviewers, time budget, remote or on-site).
    type: string
    required: true
  - name: competencies
    description: What the person must be good at, or the job description to derive them from. Rough lists are fine.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Competency model, Loop overview, Stage guides, Scorecard, Debrief and calibration, Candidate experience]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design hiring processes. Research on selection consistently finds that structured interviews (the same job-related questions for every candidate, scored against defined anchors) and work samples predict job performance much better than unstructured conversations, and reduce bias. Loops fail when every interviewer asks about the same things, when "culture fit" is a gut feeling, when interviewers score after hearing each other's opinions, and when the process wastes candidates' time.

Role: {{role}}

<competencies>
{{competencies}}
</competencies>
</context>

<task>
1. Build the competency model: 4-7 competencies, each with a one-line definition specific to this role and level, and what "meets the bar" looks like. Merge overlapping ones; if the input lists more than 7, say which you merged or dropped and why. Replace "culture fit" with defined, job-related behaviours (for example "gives and receives direct feedback").
2. Design the loop: 3-6 stages (for example recruiter screen, hiring manager interview, work sample or technical exercise, behavioural panel, team or stakeholder conversation). Assign each competency to one primary stage and, for the most important ones, a second stage. Give each stage its length and interviewer profile. Keep the total candidate time reasonable for the level and say what it is.
3. For each stage write an interviewer guide: purpose, competencies assessed, 2-4 main questions or the exercise brief, follow-up probes, what strong and weak answers include, and what not to ask.
4. Write a scorecard: for each competency, a 1-4 scale with behavioural anchors (1 = clear concern, 2 = below the bar, 3 = meets the bar, 4 = strong), plus space for evidence notes and an overall recommendation.
5. Write debrief and calibration rules: interviewers submit scores and evidence independently before discussion; the debrief goes competency by competency with evidence; the decision rule (for example no hire if any must-have scores 1); how to handle disagreement; and how to calibrate interviewers over the first few candidates.
6. Candidate experience: what to tell candidates in advance about each stage, the exercise time limit and whether it is paid if long, accommodations on request, and response time commitments.
</task>

<constraints>
- Every question must be job-related and asked of every candidate at that stage. Never include questions about age, family plans, health, religion, nationality or other protected characteristics, or proxies for them.
- Work samples should mirror real work and be scoped to a few hours at most; take-home tasks longer than that should be avoided or paid.
- Do not repeat the same competency in every stage; redundancy wastes candidate time without adding signal.
- If the competencies are too vague to design for, propose a concrete version and list your assumptions.
</constraints>

<output_format>
## Competency model
Table: Competency | Definition | Meets the bar looks like.
## Loop overview
Table: Stage | Length | Interviewer | Competencies (primary, secondary).
## Stage guides
One subsection per stage.
## Scorecard
Table: Competency | 1 | 2 | 3 | 4, with anchors.
## Debrief and calibration
## Candidate experience
</output_format>
