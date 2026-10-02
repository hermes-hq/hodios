---
schema: 1
id: hiring-track
kind: workflow
title: Hiring track
description: Takes a hire from role definition to job description, sourcing plan, interview loop, scorecard debrief and offer, pausing for approval between steps. Use when running a search.
category: hiring
version: 1.0.0
status: incubating
stage: [discover, plan, design, build, review, ship]
role: [manager, engineering-manager, founder, recruiter]
requires: [none]
inputs: [spec, notes, text]
output: [plan, docs, table, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [intake-meeting, sourcing, structured-interview, scorecard, offer-letter, candidate-experience]
pairs_with:
  prompts: [write-job-description, design-interview-loop, screen-resumes, write-take-home-assignment, write-candidate-rejection]
  personas: [recruiter]
args:
  - name: role
    description: The role you are hiring for, its level, and why it exists now (new headcount, backfill, new capability). Rough notes are fine.
    type: text
    required: true
  - name: team_context
    description: The team and company - size, what the team does, who the hire reports to, location or remote terms, pay range or budget, and who decides on the hire.
    type: text
    required: true
  - name: timeline
    description: When you need the person to start, or the date you want an accepted offer by (for example "start by March" or "offer within 8 weeks").
    type: string
    default: not set
steps:
  - {id: define, file: steps/01-define-role.md, stage: discover, gate: approve, artifact: "hiring/01-role-definition.md"}
  - {id: describe, file: steps/02-job-description.md, stage: build, gate: approve, artifact: "hiring/02-job-description.md"}
  - {id: source, file: steps/03-sourcing-plan.md, stage: plan, gate: approve, artifact: "hiring/03-sourcing-plan.md"}
  - {id: loop, file: steps/04-interview-loop.md, stage: design, gate: approve, artifact: "hiring/04-interview-loop.md"}
  - {id: debrief, file: steps/05-debrief.md, stage: review, gate: approve, artifact: "hiring/05-debrief.md"}
  - {id: offer, file: steps/06-offer.md, stage: ship, gate: none, artifact: "hiring/06-offer.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one hire the way a strong recruiter and hiring manager would together: agree what success looks like, advertise honestly, reach the right people, assess everyone against the same job-related evidence, decide on that evidence, and close fairly. Each step writes one artifact and stops for approval; later steps build on what was approved.

<role>
{{role}}
</role>

<team_context>
{{team_context}}
</team_context>

Timeline: {{timeline}}

Rules for every step:
- Use only facts the hiring manager gave or confirmed. Ask for missing essentials (pay range, level, decision maker, location) and mark gaps as [X].
- Keep every requirement and question job-related. Never ask about or screen on age, family plans, health, disability, religion, nationality, sexual orientation or other protected characteristics, or proxies for them.
- Do not state market pay, candidate supply or legal rules as fact; say what to check, and refer contracts, visas and local law to HR or an employment lawyer.
- Give candidates honest information, reasonable time demands and a closed loop.
- End each artifact with open questions.
