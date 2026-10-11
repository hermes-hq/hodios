---
schema: 1
id: design-sales-candidate-roleplay
kind: prompt
title: Design a sales roleplay for hiring
description: Designs the sales roleplay exercise used to assess sales candidates - the candidate brief, the hidden buyer brief, interviewer script and objections, timing and a scoring rubric.
category: hiring
version: 1.0.0
status: incubating
stage: [design]
role: [manager, recruiter, sales-rep, founder]
requires: [none]
inputs: [job-posting, notes]
output: [script, table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sales-hiring, roleplay-exercise, work-sample, interview-rubric, discovery-call]
pairs_with:
  prompts: [design-interview-loop, build-interview-scorecard, practise-sales-roleplay-interview]
  personas: [recruiter]
args:
  - name: role
    description: The sales role and level (for example SDR, account executive, account manager), what they sell, to whom, and the typical deal size and cycle.
    type: text
    required: true
  - name: focus
    description: The part of the sale to test (cold call, discovery, demo, negotiation, renewal), and the time available. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Exercise design, Candidate brief, Buyer brief, Interviewer script, Rubric, Running it fairly]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sales leader who hires and trains sellers. Sales roleplays are the best work sample for sales roles, but they are often run badly: "sell me this pen" tests confidence and patter rather than the job; the interviewer improvises a buyer who is either a pushover or impossible; each candidate meets a different buyer; and scoring is "would I buy from them?". A good roleplay mirrors the real sale at the right stage, gives the candidate enough context to prepare, gives the interviewer a written buyer brief with information to reveal only when asked well, scripted objections, and a rubric that scores the behaviours that win deals: preparation, questioning and listening, tailoring value to the buyer's problem, handling objections, and a clear next step.

<role>
{{role}}
</role>
{{#focus}}
<focus>
{{focus}}
</focus>
{{/focus}}
</context>

<task>
1. Exercise design: the stage of the sale to test and why it fits this role, the length (assume 20 minutes of roleplay plus 10 of debrief if not given), the preparation time, and what the candidate receives in advance.
2. Candidate brief: the fictional company and buyer, what is known before the call, the goal of the call, and any materials, written so the candidate can prepare in under an hour.
3. Buyer brief: the buyer's role, situation, real pain, budget and timing, decision process, and the information to reveal only if asked a good question; the buyer's personality kept neutral and identical across candidates.
4. Interviewer script: the opening line, the three scripted objections and when to use them, how to respond to strong and weak questions, when to end, and a short debrief ("What went well? What would you do differently?") to test coachability.
5. Rubric: 1-4 anchored scores for preparation, discovery questions and listening, linking value to the buyer's needs, objection handling, closing for a next step, and coachability in the debrief, with what each score looks like for this level.
6. Running it fairly: same brief and buyer for every candidate, briefing all interviewers, noting evidence during the call, offering adjustments, and not penalising style differences that would not matter to buyers.
</task>

<constraints>
- Use a fictional buyer and company; do not use real customers' names or confidential data.
- Do not use "sell me this pen" or similar gimmicks; say why if asked.
- Keep the buyer realistic: neither a pushover nor hostile for its own sake.
- Score behaviours, not accent, appearance or similarity to the interviewer.
</constraints>

<output_format>
## Exercise design
## Candidate brief
## Buyer brief
## Interviewer script
## Rubric
Table: Dimension | 1 | 2 | 3 | 4.
## Running it fairly
</output_format>
