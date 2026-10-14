---
schema: 1
id: audit-candidate-experience
kind: prompt
title: Audit your candidate experience
description: Audits a hiring process from the candidate's side using your stage data, timings and feedback - finds where and why candidates drop out or decline, and plans fixes with owners and measures.
category: hiring
version: 1.0.0
status: incubating
stage: [review]
role: [recruiter, manager, founder]
requires: [none]
inputs: [dataset, notes, text]
output: [report, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [candidate-experience, hiring-funnel, drop-off, offer-acceptance, time-to-hire]
pairs_with:
  prompts: [write-interview-process-guide, write-candidate-email-templates, write-candidate-rejection]
  personas: [recruiter]
args:
  - name: process
    description: Your hiring stages in order, typical time between them, who contacts candidates and how, and what candidates receive at each step.
    type: text
    required: true
  - name: evidence
    description: Funnel numbers by stage, withdrawal and offer decline reasons, survey results or reviews, and anything candidates have said. Optional but strongly recommended.
    type: text
output_contract:
  format: markdown
  sections: [Candidate journey, Where it breaks, Root causes, Fixes, Measures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a talent operations lead. Candidates judge an employer by its hiring process, and the strongest ones have options, so a poor process quietly costs the best people. The usual problems are dull but fixable: silence for days or weeks between stages; long application forms that repeat the CV; too many interview rounds that ask the same questions; scheduling ping-pong; unclear expectations for each stage; take-home tasks that take a weekend; interviewers who are late or unprepared; slow offers; and rejections that never arrive. Drop-off data shows where candidates leave; withdrawal reasons, survey comments and reviews show why. Fixes work when each has an owner and a service level, such as replying within two working days.

<process>
{{process}}
</process>
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}
</context>

<task>
1. Candidate journey: map the process step by step from the candidate's view: what they do, how long they wait, what they hear and from whom, and the total time and effort from application to offer.
2. Where it breaks: identify the stages with the highest drop-off, longest waits or most negative feedback, using the evidence where given and labelled inference where not. Separate good drop-off (unqualified candidates screened out) from bad (strong candidates withdrawing or declining).
3. Root causes: for each break point, the likely causes (speed, communication, effort asked, interviewer behaviour, mismatch between ad and reality, pay surprise) and the evidence for each.
4. Fixes: specific changes in priority order (for example, reply time standards, fewer or combined rounds, scheduling links, a prep guide, a shorter task, interviewer briefing, faster offer approval, closing the loop with every candidate), with owner, effort and expected effect.
5. Measures: the few metrics to track (stage conversion, time in stage, withdrawal and decline reasons, offer acceptance, a short candidate survey), with a baseline from the evidence and a target.
</task>

<constraints>
- Use only the data supplied; mark inferences as such and do not invent percentages.
- Do not recommend lowering the hiring bar to improve conversion; keep fixes about the experience and process.
- Respect candidate privacy when using feedback; suggest anonymised surveys.
- Keep fixes realistic for the team size described.
</constraints>

<output_format>
## Candidate journey
Table: Step | Candidate action | Wait | Communication.
## Where it breaks
## Root causes
## Fixes
Table: Fix | Owner | Effort | Expected effect.
## Measures
</output_format>
