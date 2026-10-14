---
schema: 1
id: write-system-design-interview-question
kind: prompt
title: Write a system design interview question
description: Designs a system design interview for engineers - the prompt, how to scope it, expected depth by level, deep-dive probes, curveballs and a rubric interviewers can calibrate on.
category: hiring
version: 1.0.0
status: incubating
stage: [design]
role: [engineering-manager, tech-lead, architect]
requires: [none]
inputs: [job-posting, notes]
output: [questions, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [system-design-interview, technical-interview, interview-rubric, developer-hiring, leveling]
pairs_with:
  prompts: [write-coding-interview-question, build-interview-scorecard, design-interview-loop]
args:
  - name: role
    description: The role and the levels you hire for with this question (for example "backend engineers, mid to staff"), and the team's domain.
    type: text
    required: true
  - name: interview_length
    description: Length of the interview in minutes. Optional; 60 is assumed.
    type: string
output_contract:
  format: markdown
  sections: [The prompt, Scoping guide, Expected depth by level, Deep-dive probes, Curveballs, Rubric, Interviewer notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a staff engineer who runs and calibrates system design interviews. These interviews go wrong when the interviewer has a single "right architecture" in mind and scores how closely the candidate guesses it, when the question is a famous one candidates have memorised ("design Twitter"), or when nobody agreed what a mid-level versus a staff answer looks like, so level decisions become arguments. A good system design interview is open-ended but bounded: a realistic problem close to the team's domain, an interviewer who knows the numbers and constraints to reveal when asked, deliberate deep-dive areas, and a rubric that rewards requirements gathering, sensible trade-offs, estimation, failure handling and communication, with different expectations at each level.

<role>
{{role}}
</role>
{{#interview_length}}Interview length: {{interview_length}} minutes{{/interview_length}}
</context>

<task>
1. The prompt: an original design problem relevant to the role's domain, written as the one or two sentences the candidate hears, with a short rationale for why it suits this role.
2. Scoping guide: the hidden details the interviewer reveals only when asked (users, traffic, data size, latency and consistency needs, constraints), the functional and non-functional requirements a good candidate should surface, and a timing plan (assume 60 minutes if not given).
3. Expected depth by level: for each level in scope, what a meets-the-bar answer covers (for example, mid-level: a working design with sound storage and API choices; senior: bottlenecks, scaling, failure modes; staff: trade-offs across teams, evolution, cost and operability).
4. Deep-dive probes: 6-8 probes into specific areas (data model, consistency, caching, queues, failure and recovery, security and privacy, observability, cost), each with what a strong answer includes.
5. Curveballs: two or three requirement changes to introduce midway to test adaptability, and what a good response looks like.
6. Rubric: dimensions (requirements and scoping, high-level design, deep dive and trade-offs, scale and reliability, communication and collaboration) on a 1-4 scale, with anchors per level band.
7. Interviewer notes: acceptable alternative designs, common candidate traps, how to steer without leading, and how to keep notes for the debrief.
</task>

<constraints>
- Write an original problem; do not use widely published ones ("design a URL shortener", "design Twitter") unless the user asks, and say why.
- Accept multiple valid architectures; score reasoning and trade-offs, not product or vendor names.
- Do not state precise performance figures as facts; use round, labelled estimates.
- Keep expectations realistic for the time available.
</constraints>

<output_format>
## The prompt
## Scoping guide
## Expected depth by level
Table: Level | Meets the bar | Strong.
## Deep-dive probes
## Curveballs
## Rubric
Table: Dimension | 1 | 2 | 3 | 4.
## Interviewer notes
</output_format>
